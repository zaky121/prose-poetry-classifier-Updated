import time 
import os
import sys
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
from contextlib import asynccontextmanager

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global model variables
somberta_model = None
somberta_tokenizer = None

# Add device configuration
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan handler for model loading"""
    logger.info("🚀 Starting Somali Text AI Classifier...")
    logger.info("📦 Loading SomBERTa model...")
    
    # Load model
    somberta_loaded = load_somberta()
    
    if somberta_loaded:
        logger.info("✅ SomBERTa model loaded successfully")
    else:
        logger.error("❌ Failed to load SomBERTa model")
    
    yield
    # Cleanup on shutdown
    logger.info("🔴 Shutting down application")

# Initialize FastAPI app with lifespan
app = FastAPI(
    title="Somali Text AI Classifier - SomBERTa",
    description="API for Somali text classification using the SomBERTa model",
    version="1.0.0",
    lifespan=lifespan
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
ALLOWED_CHARS = SOMALI_ALPHABET + " ,.!?()-'0123456789"
EMOJI_PATTERN = re.compile(
    "["
    "\U0001F600-\U0001F64F"  # emoticons
    "\U0001F300-\U0001F5FF"  # symbols & pictographs
    "\U0001F680-\U0001F6FF"  # transport & map symbols
    "\U0001F1E0-\U0001F1FF"  # flags (iOS)
    "\U00002500-\U00002BEF"  # Chinese char
    "\U00002702-\U000027B0"
    "\U00002702-\U000027B0"
    "\U000024C2-\U0001F251"
    "\U0001f926-\U0001f937"
    "\U00010000-\U0010ffff"
    "\u2640-\u2642" 
    "\u2600-\u2B55"
    "\u200d"
    "\u23cf"
    "\u23e9"
    "\u231a"
    "\ufe0f"  # dingbats
    "\u3030"
    "]+",
    flags=re.UNICODE
)

def load_somberta():
    """Load SomBERTa model"""
    global somberta_model, somberta_tokenizer
    try:
        model_path = r"C:\Users\zakim\OneDrive\Desktop\ALL MODELS\LLMs models\poetry_prose_somberta_model"
        somberta_model = AutoModelForSequenceClassification.from_pretrained(model_path).to(device)
        somberta_tokenizer = AutoTokenizer.from_pretrained(model_path)
        logger.info("✅ SomBERTa model loaded successfully!")
        return True
    except Exception as e:
        logger.error(f"❌ Error loading SomBERTa: {str(e)}")
        return False

# ================================
# TEXT VALIDATION FUNCTIONS
# ================================

def is_somali(text: str) -> bool:
    """Check if text is in Somali language"""
    try:
        # Skip detection for very short texts
        if len(text.split()) < 3 or len(text) < 10:
            return True  # Assume valid for short texts
            
        # Try to import langdetect dynamically
        try:
            from langdetect import detect, DetectorFactory
            DetectorFactory.seed = 0
            language = detect(text)
            return language == 'so'
        except ImportError:
            logger.warning("langdetect package not installed. Skipping language detection.")
            return True
        except Exception:
            return False
    except Exception:
        return False

def validate_input(text: str) -> None:
    """Validate user input against various constraints"""
    # 1. Check for empty input
    if not text.strip():
        raise HTTPException(status_code=400, detail="Text input cannot be empty")
    
    # 2. Check for numbers only
    if text.strip().replace(' ', '').isdigit():
        raise HTTPException(status_code=400, detail="Input contains only numbers. Please enter text.")
    
    # 3. Check for emojis
    if EMOJI_PATTERN.search(text):
        raise HTTPException(status_code=400, detail="Emojis are not allowed. Please remove them.")
    
    # 4. Check for non-Somali characters
    disallowed_chars = set()
    for char in text:
        if char.isspace():
            continue
        if char not in ALLOWED_CHARS and not char.isdigit():
            disallowed_chars.add(char)
    
    if disallowed_chars:
        sample = ''.join(list(disallowed_chars)[:5])
        if len(disallowed_chars) > 5:
            sample += "..."
        raise HTTPException(
            status_code=400,
            detail=f"Input contains disallowed characters: {sample}"
        )
    
    # 5. Check if text is English
    if not is_somali(text):
        raise HTTPException(status_code=400, detail="The text is not in Somali.")

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
            return {
                "model": "SomBERTa",
                "type": "Insufficient Input",
                "confidence": 0.0,
                "processing_time": processing_time,
                "accuracy": "N/A",
                "speed": f"{processing_time:.3f}s"
            }
        
        # Tokenization and prediction
        inputs = somberta_tokenizer(
            processed_text,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=512
        ).to(device)
        
        somberta_model.eval()
        with torch.no_grad():
            outputs = somberta_model(**inputs)
            logits = outputs.logits
            probabilities = torch.softmax(logits, dim=1).cpu().numpy()[0]
            predicted_class = torch.argmax(logits, dim=1).item()
            confidence = float(probabilities[predicted_class])
        
        # Map class index to label
        class_label = "Poetry" if predicted_class == 1 else "Prose"
        
        processing_time = time.time() - start_time
        
        return {
            "model": "SomBERTa",
            "type": class_label,
            "confidence": confidence,
            "processing_time": processing_time,
            "accuracy": "94.8%",
            "speed": f"{processing_time:.3f}s"
        }
        
    except Exception as e:
        logger.error(f"SomBERTa prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

# ================================
# API ENDPOINTS
# ================================

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
        # Validate input against all constraints
        validate_input(input_data.text)
        
        # Process and classify
        result = predict_somberta(input_data.text)
        return ClassificationResponse(**result)
    
    except HTTPException as he:
        # Re-raise validation exceptions
        raise he
    except Exception as e:
        logger.exception("Classification error")
        raise HTTPException(status_code=500, detail=f"Classification error: {str(e)}")

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
        port=8001,  # Changed port to 8001
        log_level="info"
    )