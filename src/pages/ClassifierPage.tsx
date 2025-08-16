import React, { useState, useEffect } from 'react';
import { BookOpen, Feather, Sparkles, Brain, Zap, Shield, Award, PieChart as PieChartIcon, Star, Heart, Flame } from 'lucide-react';

interface ModelResult {
  model: string;
  type: 'prose' | 'poetry' | 'error';
  confidence: number;
  processingTime: number;
  errorMessage?: string;
}

const ClassifierPage: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<ModelResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [error, setError] = useState<string | null>(null);

  const sombertaModel = {
    id: 'somberta',
    name: 'SomBERTa Classifier',
    description: 'Advanced BERT model specialized for Somali language',
    icon: Shield,
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    color: 'pink'
  };

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 80; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 6 + 2,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  const classifyWithModel = async (inputText: string): Promise<ModelResult> => {
    try {
      // Call the SomBERTa model endpoint
      const response = await fetch(`http://localhost:8001/classify/somberta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Handle validation errors
        return {
          model: sombertaModel.name,
          type: 'error',
          confidence: 0,
          processingTime: data.processing_time || 0.1,
          errorMessage: data.detail || data.error_detail || 'Validation error'
        };
      }
      
      return {
        model: data.model,
        type: data.type.toLowerCase() as 'prose' | 'poetry',
        confidence: data.confidence,
        processingTime: data.processing_time || 0.1
      };
    } catch (error) {
      console.error(`Error calling SomBERTa model:`, error);
      
    
    }
    
    // This should never be reached, but TypeScript needs it for control flow analysis
    throw new Error('Unexpected code path in classifyWithModel');
  };

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Text input cannot be empty');
      return;
    }
    
    // Basic client-side validation
    if (/^\d+$/.test(text.replace(/\s/g, ''))) {
      setError('Input contains only numbers. Please enter text.');
      return;
    }
    
    // Check for emojis using a simple pattern
    const emojiPattern = /[\u{1F600}-\u{1F6FF}]/gu;
    if (emojiPattern.test(text)) {
      setError('Emojis are not allowed. Please remove them.');
      return;
    }
    
    setIsAnalyzing(true);
    setResult(null);
    setError(null);
    
    try {
      const singleResult = await classifyWithModel(text);
      setResult(singleResult);
      
      // If the backend returned an error, show it
      if (singleResult.type === 'error' && singleResult.errorMessage) {
        setError(singleResult.errorMessage);
      }
    } catch (error) {
      console.error('Classification error:', error);
      setError('Failed to analyze text. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Pie Chart Component
  const PieChart: React.FC<{ result: ModelResult }> = ({ result }) => {
    if (result.type === 'error') {
      return (
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold font-serif text-red-500 animate-pulse">
              !
            </div>
            <div className="text-white font-medium text-lg mt-2 font-serif">
              Error
            </div>
          </div>
        </div>
      );
    }
    
    const isPoetry = result.type === 'poetry';
    const confidence = result.confidence * 100;
    const processingTime = result.processingTime || 0; // Safeguard against undefined

    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = `${(confidence / 100) * circumference} ${circumference}`;
    
    return (
      <div className="relative w-48 h-48 mx-auto">
        <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={isPoetry ? "url(#poetryGradient)" : "url(#proseGradient)"}
            strokeWidth="8"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          {/* Gradients */}
          <defs>
            <linearGradient id="poetryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
            <linearGradient id="proseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-4xl font-bold font-serif ${isPoetry ? 'text-violet-300' : 'text-pink-300'} animate-pulse`}>
            {confidence.toFixed(1)}%
          </div>
          <div className="text-white font-medium text-lg mt-2 font-serif">
            {isPoetry ? 'Poetry' : 'Prose'}
          </div>
          <div className={`text-sm ${isPoetry ? 'text-violet-200' : 'text-pink-200'} mt-1 font-light`}>
            {processingTime.toFixed(3)}s
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden pt-16">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        {/* Floating Orbs */}
        <div className="absolute top-32 left-16 w-80 h-80 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-64 right-24 w-96 h-96 bg-gradient-to-r from-fuchsia-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-72 h-72 bg-gradient-to-r from-pink-500/25 to-rose-500/25 rounded-full blur-3xl animate-pulse delay-2000"></div>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-violet-400/20 to-fuchsia-400/20 animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.id * 0.1}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <div className="p-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 shadow-2xl shadow-pink-500/50 animate-pulse">
              <Shield className="w-12 h-12 text-white animate-pulse" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-300 via-rose-300 to-red-300 bg-clip-text text-transparent mb-4 font-serif animate-gradient-x">
            SomBERTa Classifier
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-light">
            Advanced Somali text classification using specialized BERT model
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-violet-400/30 hover:border-violet-400/50 transition-all duration-500">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center font-serif">
                  <Feather className="w-6 h-6 mr-3 text-grey animate-pulse" />
                  Enter Somali Text
                </h2>
                
                <textarea
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    setError(null);
                  }}
                  placeholder="Halkan ku qor qoraalkaaga si loo kala sooco haddii uu yahay Tix iyo Tiraab..."
                  className="w-full h-64 bg-gradient-to-br from-black/30 to-black/10 border border-violet-400/30 rounded-xl p-4 text-black placeholder-gray-500-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-400/60 resize-none backdrop-blur-sm transition-all duration-300 font-serif"
                />
                
                {error && (
                  <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded-xl text-red-200 animate-pulse">
                    {error}
                  </div>
                )}
                
                <button
                  onClick={handleAnalyze}
                  disabled={!text.trim() || isAnalyzing}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 hover:from-pink-700 hover:via-rose-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-semibold text-lg transition-all duration-500 shadow-2xl hover:shadow-pink-500/50 transform hover:-translate-y-2 hover:scale-105 font-serif"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Analyzing with SomBERTa...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Analyze Text
                    </div>
                  )}
                </button>
                
                <div className="mt-4 text-sm text-gray-300">
                  <p className="flex items-center mb-1">
                    <Zap className="w-4 h-4 mr-2 text-yellow-300" />
                    <span>Enter Somali text only (English will be rejected)</span>
                  </p>
                  <p className="flex items-center mb-1">
                    <Shield className="w-4 h-4 mr-2 text-blue-300" />
                    <span>No numbers only or emojis allowed</span>
                  </p>

                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {result && (
                <>
                  {/* Model Result with Pie Chart */}
                  <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-violet-400/30 hover:border-violet-400/50 transition-all duration-500">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center font-serif">
                      <PieChartIcon className="w-6 h-6 mr-3 text-pink-300 animate-spin" />
                      Classification Result
                    </h3>
                    
                    <PieChart result={result} />
                    
                    {result.type !== 'error' && (
                      <div className="mt-8 text-center">
                        <div className={`inline-flex items-center px-8 py-4 rounded-2xl text-2xl font-bold font-serif shadow-2xl animate-pulse ${
                          result.type === 'poetry' 
                            ? 'bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 shadow-violet-500/50' 
                            : 'bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 shadow-pink-500/50'
                        } shadow-2xl`}>
                          {result.type === 'poetry' ? (
                            <Feather className="w-8 h-8 mr-3 animate-bounce" />
                          ) : (
                            <BookOpen className="w-8 h-8 mr-3 animate-bounce" />
                          )}
                          {result.type === 'poetry' ? 'Tix' : 'Tiraab'}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Model Information */}
                  <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-violet-400/30 hover:border-violet-400/50 transition-all duration-500">
                    <h3 className="text-xl font-bold text-white mb-4 font-serif">Model Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-200 font-light">Model:</span>
                        <span className="text-white font-medium font-serif">{sombertaModel.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-200 font-light">Confidence:</span>
                        <span className="text-pink-300 font-bold font-serif animate-pulse">
                          {result.confidence ? (result.confidence * 100).toFixed(1) + '%' : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-200 font-light">Processing Time:</span>
                        <span className="text-pink-300 font-bold font-serif">
                          {result.processingTime ? result.processingTime.toFixed(3) + 's' : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-200 font-light">Classification:</span>
                        <span className={`font-bold font-serif ${
                          result.type === 'poetry' ? 'text-violet-300' : 
                          result.type === 'prose' ? 'text-pink-300' : 'text-red-300'
                        }`}>
                          {result.type === 'poetry' ? 'Poetry (Tix)' : 
                           result.type === 'prose' ? 'Prose (Tiraab)' : 'Error'}
                        </span>
                      </div>
                      {result.errorMessage && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-200 font-light">Error:</span>
                          <span className="text-red-300 font-medium">{result.errorMessage}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
              
              {!result && !isAnalyzing && (
                <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-violet-400/30 text-center group hover:border-violet-400/50 transition-all duration-500">
                  <div className="text-6xl mb-4 animate-bounce "></div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-serif group-hover:text-pink-200 transition-colors duration-300">Ready to Analyze</h3>
                  <p className="text-gray-200 font-light">
                    Enter Somali text to classify with SomBERTa model
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassifierPage;