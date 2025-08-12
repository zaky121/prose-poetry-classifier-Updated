import time 

import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import re
import torch
import unicodedata
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import logging
from datetime import datetime
from typing import Dict, Any

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Somali Text AI Classifier - SomBERTa",
    description="API for Somali text classification using the SomBERTa model",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class TextInput(BaseModel):
    text: str

class ClassificationResponse(BaseModel):
    model: str
    type: str
    confidence: float
    processing_time: float
    accuracy: str
    speed: str

# Constants
SOMALI_ALPHABET = (
    "aA" "bB" "cC" "dD" "eE" "fF" "gG" "hH" "iI" "jJ" "kK" "lL" "mM" "nN"
    "oO" "qQ" "rR" "sS" "tT" "uU" "wW" "xX" "yY"
)
ALLOWED_CHARS = SOMALI_ALPHABET + " ,.!?()-'"

# Global model variables
somberta_model = None
somberta_tokenizer = None

# Add device configuration at the top
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

def load_somberta():
    """Load SomBERTa model"""
    global somberta_model, somberta_tokenizer
    try:
        model_path = r"C:\Users\zakim\OneDrive\Desktop\ALL MODELS\LLMs models\poetry_prose_somberta_model"
        somberta_model = AutoModelForSequenceClassification.from_pretrained(model_path)
        somberta_tokenizer = AutoTokenizer.from_pretrained(model_path)
        logger.info("✅ SomBERTa model loaded successfully!")
        return True
    except Exception as e:
        logger.error(f"❌ Error loading SomBERTa: {str(e)}")
        return False

# ================================
# TEXT PREPROCESSING FUNCTION
# ================================

def preprocessor_somberta(text: str) -> str:
    """SomBERTa text preprocessing"""
    text = unicodedata.normalize("NFKD", text)
    text = ''.join([char for char in text if not unicodedata.combining(char)])
    text = text.lower()
    text = ''.join([char for char in text if char in ALLOWED_CHARS.lower()])
    text = re.sub(r'\s+', ' ', text).strip()
    text = re.sub(r'([,.!?()-])\1+', r'\1', text)
    
    # Remove repeated words (3 or more)
    text = re.sub(r'\b(\w+)( \1){2,}\b', r'\1 \1', text)
    
    # Remove repeated phrase chunks (3+)
    text = re.sub(r'(\b.+?\b)( \1){2,}', r'\1', text)
    
    # Remove repeated sentences
    lines = re.split(r'(?<=[.!?])\s+|\n+', text)
    seen = set()
    filtered_lines = []
    for line in lines:
        line = line.strip()
        if line and line not in seen:
            seen.add(line)
            filtered_lines.append(line)
    return ' '.join(filtered_lines)

# ================================
# PREDICTION FUNCTION
# ================================

def predict_somberta(text: str) -> Dict[str, Any]:
    """SomBERTa prediction"""
    if not somberta_model or not somberta_tokenizer:
        raise HTTPException(status_code=503, detail="SomBERTa model not loaded")
    
    start_time = time.time()
    
    try:
        processed_text = preprocessor_somberta(text)
        
        # Basic length checks
        if len(processed_text.strip()) < 30 or len(processed_text.strip().split()) < 5:
            processing_time = time.time() - start_time
            
        # Tokenization and prediction
        inputs = somberta_tokenizer(
            processed_text,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=512
        )
        
        somberta_model.eval()
        with torch.no_grad():
            outputs = somberta_model(**inputs)
            logits = outputs.logits
            probabilities = torch.softmax(logits, dim=1).numpy()[0]
            predicted_class = torch.argmax(logits, dim=1).item()
            confidence = float(probabilities[predicted_class])
        
        
    except Exception as e:
        logger.error(f"SomBERTa prediction error: {str(e)}")
     
# ================================
# API ENDPOINTS
# ================================

@app.on_event("startup")
async def startup_event():
    """Load model on startup"""
    logger.info("🚀 Starting Somali Text AI Classifier...")
    logger.info("📦 Loading SomBERTa model...")
    
    # Load model
    somberta_loaded = load_somberta()
    
    if somberta_loaded:
        logger.info("✅ SomBERTa model loaded successfully")
    else:
        logger.error("❌ Failed to load SomBERTa model")
    
    logger.info("🌐 API server ready at http://localhost:8000")

@app.get("/")
async def root():
    return {
        "message": "Somali Text AI Classifier - SomBERTa Model",
        "model": "SomBERTa",
        "version": "1.0.0",
        "endpoint": "/classify/somberta"
    }

@app.post("/classify/somberta", response_model=ClassificationResponse)
async def classify_with_somberta(input_data: TextInput):
    """Classify text using SomBERTa model (94.8% accuracy)"""
    try:
        if not input_data.text.strip():
            raise HTTPException(status_code=400, detail="Text input cannot be empty")
        
        result = predict_somberta(input_data.text)
        return ClassificationResponse(**result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"SomBERTa classification error: {str(e)}")

@app.get("/model")
async def get_model():
    """Get information about the model"""
    return {
        "model": {
            "endpoint": "/classify/somberta",
            "loaded": somberta_model is not None
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy" if somberta_model is not None else "degraded",
        "model_loaded": somberta_model is not None,
        "timestamp": datetime.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app, 
        host="0.0.0.0", 
        port=8000,
        log_level="info"
    )