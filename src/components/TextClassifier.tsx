import React, { useState, useEffect } from 'react';
import { BookOpen, Feather, Sparkles, Brain, TrendingUp, Clock } from 'lucide-react';

interface ClassificationResult {
  type: 'prose' | 'poetry';
  confidence: number;
  features: {
    lineBreaks: number;
    avgLineLength: number;
    rhymeScore: number;
    rhythmScore: number;
    repetitionScore: number;
    metaphorScore: number;
  };
  analysis: string[];
}

const TextClassifier: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);

  // Generate floating particles for background animation
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  // Advanced NLP Classification Algorithm
  const classifyText = async (inputText: string): Promise<ClassificationResult> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lines = inputText.split('\n').filter(line => line.trim());
        const words = inputText.toLowerCase().split(/\s+/).filter(word => word.length > 0);
        
        // Feature extraction
        const lineBreaks = lines.length;
        const avgLineLength = lines.reduce((acc, line) => acc + line.length, 0) / lines.length || 0;
        
        // Rhyme detection (simplified)
        const rhymeScore = calculateRhymeScore(lines);
        
        // Rhythm analysis
        const rhythmScore = calculateRhythmScore(inputText);
        
        // Repetition analysis
        const repetitionScore = calculateRepetitionScore(words);
        
        // Metaphor and figurative language detection
        const metaphorScore = calculateMetaphorScore(words);
        
        // Classification logic
        const poetryIndicators = [
          lineBreaks > 1 && avgLineLength < 80 ? 0.3 : 0,
          rhymeScore * 0.25,
          rhythmScore * 0.2,
          repetitionScore * 0.15,
          metaphorScore * 0.1
        ];
        
        const poetryScore = poetryIndicators.reduce((a, b) => a + b, 0);
        const isPoetry = poetryScore > 0.4;
        
        const features = {
          lineBreaks,
          avgLineLength,
          rhymeScore,
          rhythmScore,
          repetitionScore,
          metaphorScore
        };
        
        const analysis = generateAnalysis(features, isPoetry);
        
        resolve({
          type: isPoetry ? 'poetry' : 'prose',
          confidence: isPoetry ? poetryScore : 1 - poetryScore,
          features,
          analysis
        });
      }, 1500);
    });
  };

  const calculateRhymeScore = (lines: string[]): number => {
    if (lines.length < 2) return 0;
    
    const getLastWord = (line: string) => {
      const words = line.trim().split(/\s+/);
      return words[words.length - 1]?.toLowerCase().replace(/[^a-z]/g, '') || '';
    };
    
    const endWords = lines.map(getLastWord);
    let rhymeCount = 0;
    
    for (let i = 0; i < endWords.length; i++) {
      for (let j = i + 1; j < endWords.length; j++) {
        if (endWords[i] && endWords[j] && 
            (endWords[i].endsWith(endWords[j].slice(-2)) || 
             endWords[j].endsWith(endWords[i].slice(-2)))) {
          rhymeCount++;
        }
      }
    }
    
    return Math.min(rhymeCount / (lines.length / 2), 1);
  };

  const calculateRhythmScore = (text: string): number => {
    const rhythmWords = ['the', 'and', 'of', 'to', 'in', 'a', 'is', 'that', 'it', 'with'];
    const words = text.toLowerCase().split(/\s+/);
    const rhythmCount = words.filter(word => rhythmWords.includes(word)).length;
    return Math.min(rhythmCount / words.length * 2, 1);
  };

  const calculateRepetitionScore = (words: string[]): number => {
    const wordCount = new Map<string, number>();
    words.forEach(word => {
      if (word.length > 3) {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
      }
    });
    
    let repetitions = 0;
    wordCount.forEach(count => {
      if (count > 1) repetitions += count - 1;
    });
    
    return Math.min(repetitions / words.length, 1);
  };

  const calculateMetaphorScore = (words: string[]): number => {
    const metaphorWords = ['like', 'as', 'than', 'seems', 'appears', 'resembles', 'becomes', 'transforms'];
    const poeticWords = ['soul', 'heart', 'dream', 'love', 'beauty', 'moon', 'star', 'light', 'shadow', 'whisper'];
    
    const metaphorCount = words.filter(word => metaphorWords.includes(word)).length;
    const poeticCount = words.filter(word => poeticWords.includes(word)).length;
    
    return Math.min((metaphorCount + poeticCount) / words.length * 3, 1);
  };

  const generateAnalysis = (features: ClassificationResult['features'], isPoetry: boolean): string[] => {
    const analysis: string[] = [];
    
    if (isPoetry) {
      analysis.push('✨ Poetry characteristics detected');
      if (features.lineBreaks > 1) analysis.push(`📝 Multiple line breaks suggest verse structure`);
      if (features.rhymeScore > 0.3) analysis.push(`🎵 Strong rhyme patterns identified`);
      if (features.rhythmScore > 0.4) analysis.push(`🎼 Rhythmic flow patterns detected`);
      if (features.repetitionScore > 0.2) analysis.push(`🔄 Repetitive elements for emphasis`);
      if (features.metaphorScore > 0.1) analysis.push(`🎭 Figurative language present`);
    } else {
      analysis.push('📖 Prose characteristics detected');
      if (features.avgLineLength > 60) analysis.push(`📏 Long continuous lines typical of prose`);
      if (features.rhymeScore < 0.2) analysis.push(`💭 Minimal rhyme structure`);
      if (features.lineBreaks === 1) analysis.push(`📄 Single paragraph format`);
    }
    
    return analysis;
  };

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);
    
    try {
      const classification = await classifyText(text);
      setResult(classification);
    } catch (error) {
      console.error('Classification error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const exampleTexts = {
    poetry: `Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;`,
    prose: `It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness.`
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white/10 animate-pulse"
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
            <div className="p-4 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 shadow-2xl">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-violet-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent mb-4">
            Poetry & Prose Classifier
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Advanced NLP-powered text analysis to distinguish between poetic verse and prose writing
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Feather className="w-6 h-6 mr-3 text-violet-400" />
                  Enter Your Text
                </h2>
                
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your text here to analyze whether it's poetry or prose..."
                  className="w-full h-64 bg-black/20 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none backdrop-blur-sm"
                  style={{ fontFamily: 'Georgia, serif' }}
                />
                
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    onClick={() => setText(exampleTexts.poetry)}
                    className="px-4 py-2 bg-violet-600/50 hover:bg-violet-600/70 rounded-lg text-white text-sm transition-all duration-200 border border-violet-500/50"
                  >
                    Try Poetry Example
                  </button>
                  <button
                    onClick={() => setText(exampleTexts.prose)}
                    className="px-4 py-2 bg-pink-600/50 hover:bg-pink-600/70 rounded-lg text-white text-sm transition-all duration-200 border border-pink-500/50"
                  >
                    Try Prose Example
                  </button>
                </div>
                
                <button
                  onClick={handleAnalyze}
                  disabled={!text.trim() || isAnalyzing}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Analyzing Text...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Analyze Text
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {result && (
                <>
                  {/* Classification Result */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                      {result.type === 'poetry' ? (
                        <Feather className="w-6 h-6 mr-3 text-violet-400" />
                      ) : (
                        <BookOpen className="w-6 h-6 mr-3 text-pink-400" />
                      )}
                      Classification Result
                    </h3>
                    
                    <div className="text-center mb-6">
                      <div className={`inline-flex items-center px-6 py-3 rounded-full text-xl font-bold ${
                        result.type === 'poetry' 
                          ? 'bg-gradient-to-r from-violet-500 to-purple-500' 
                          : 'bg-gradient-to-r from-pink-500 to-rose-500'
                      }`}>
                        {result.type === 'poetry' ? (
                          <Feather className="w-6 h-6 mr-2" />
                        ) : (
                          <BookOpen className="w-6 h-6 mr-2" />
                        )}
                        {result.type.toUpperCase()}
                      </div>
                      
                      <div className="mt-4">
                        <div className="text-sm text-gray-300 mb-2">Confidence Score</div>
                        <div className="w-full bg-black/20 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-1000 ${
                              result.type === 'poetry' 
                                ? 'bg-gradient-to-r from-violet-500 to-purple-500' 
                                : 'bg-gradient-to-r from-pink-500 to-rose-500'
                            }`}
                            style={{ width: `${result.confidence * 100}%` }}
                          />
                        </div>
                        <div className="text-right text-sm text-gray-300 mt-1">
                          {(result.confidence * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Analysis Details */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-3 text-indigo-400" />
                      Analysis Details
                    </h3>
                    
                    <div className="space-y-4">
                      {result.analysis.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-violet-400 to-pink-400 rounded-full mt-2"></div>
                          <span className="text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Features */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <Clock className="w-6 h-6 mr-3 text-green-400" />
                      Technical Analysis
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-black/20 rounded-lg">
                        <div className="text-2xl font-bold text-violet-400">{result.features.lineBreaks}</div>
                        <div className="text-sm text-gray-400">Line Breaks</div>
                      </div>
                      <div className="text-center p-3 bg-black/20 rounded-lg">
                        <div className="text-2xl font-bold text-pink-400">{result.features.avgLineLength.toFixed(0)}</div>
                        <div className="text-sm text-gray-400">Avg Line Length</div>
                      </div>
                      <div className="text-center p-3 bg-black/20 rounded-lg">
                        <div className="text-2xl font-bold text-indigo-400">{(result.features.rhymeScore * 100).toFixed(0)}%</div>
                        <div className="text-sm text-gray-400">Rhyme Score</div>
                      </div>
                      <div className="text-center p-3 bg-black/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">{(result.features.rhythmScore * 100).toFixed(0)}%</div>
                        <div className="text-sm text-gray-400">Rhythm Score</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {!result && !isAnalyzing && (
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 text-center">
                  <div className="text-6xl mb-4">🎭</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Ready to Analyze</h3>
                  <p className="text-gray-300">Enter your text and click analyze to see the classification results</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextClassifier;