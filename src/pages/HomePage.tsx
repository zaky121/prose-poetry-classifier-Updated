import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, BookOpen, Feather, Sparkles, ArrowRight, Globe, Users, TrendingUp, Zap, Shield, Award, Star, Heart, Flame } from 'lucide-react';

const HomePage: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 100; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          delay: Math.random() * 5,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  const aiModels = [
    {
      name: 'RNN Classifier',
      description: 'Recurrent Neural Network optimized for sequential text analysis with fast processing capabilities.',
      icon: Zap,
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
      features: ['Sequential Analysis', 'Fast Processing', 'Memory Efficient']
    },
    {
      name: 'LSTM Classifier',
      description: 'Long Short-Term Memory network that captures long-range dependencies in Somali text patterns.',
      icon: Brain,
      gradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
      features: ['Long-term Memory', 'Pattern Recognition', 'Context Aware']
    },
    {
      name: 'SomBERTa',
      description: 'Specialized BERT model fine-tuned specifically for Somali language understanding and classification.',
      icon: Shield,
      gradient: 'from-rose-500 via-pink-500 to-red-500',
      features: ['Somali Optimized', 'High Accuracy', 'Cultural Context']
    },
    {
      name: 'AfriBERTa',
      description: 'Pan-African BERT model trained on multiple African languages including advanced Somali processing.',
      icon: Award,
      gradient: 'from-red-500 via-rose-500 to-pink-500',
      features: ['Multi-lingual', 'African Languages', 'Cross-cultural']
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Models',
      description: 'Four cutting-edge machine learning models SomBERTa for superior text classification.',
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      icon: BookOpen,
      title: 'Authentic Somali Content',
      description: 'Explore genuine Somali articles and literary works from renowned authors and contemporary writers.',
      gradient: 'from-fuchsia-500 to-pink-600'
    },
    {
      icon: Feather,
      title: 'Poetry Archive',
      description: 'Discover the rich tradition of Somali poetry featuring works from legendary poets like Abwaan Hadraawi.',
      gradient: 'from-pink-500 to-rose-600'
    }
  ];

  const stats = [
    { icon: Globe, value: '50,000+', label: 'Texts Analyzed' },
    { icon: Users, value: '2,500+', label: 'Active Users' },
    { icon: TrendingUp, value: '99.99%', label: 'Best Accuracy' },
    { icon: Zap, value: '0.12s', label: 'Fastest Model' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-rose-900/20"></div>
          {/* Floating Orbs */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-violet-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-80 h-80 bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-gradient-to-r from-pink-500/25 to-rose-500/25 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-violet-400/30 to-fuchsia-400/30 animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-32 px-4">
          <div className="max-w-8xl mx-auto text-center">
            <div className="mb-12">
              <div className="inline-flex items-center justify-center p-6 rounded-full bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 backdrop-blur-sm border border-violet-400/50 mb-8 animate-pulse shadow-2xl shadow-violet-500/25">
                <Sparkles className="w-12 h-12 text-violet-300 animate-spin" />
              </div>
              <h1 className="text-7xl md:text-9xl font-bold mb-8 leading-tight font-serif animate-fade-in">
                <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent animate-gradient-x">
                  Somali Text
                </span>
                <br />
                <span className="bg-gradient-to-r from-fuchsia-300 via-pink-300 to-rose-300 bg-clip-text text-transparent animate-gradient-x">
                  Classification
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-100 max-w-5xl mx-auto leading-relaxed font-light mb-8 animate-fade-in-up"> 
                <span className="text-violet-300 font-medium animate-pulse">SomBERTa</span>
              </p>
              <p className="text-lg text-gray-200 max-w-3xl mx-auto animate-fade-in-up delay-300">
                Cutting-edge natural language processing meets the rich tradition of Somali prose and poetry
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Link
                to="/classifier"
                className="group px-10 py-5 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 rounded-2xl text-white font-bold text-xl transition-all duration-500 shadow-2xl hover:shadow-violet-500/50 transform hover:-translate-y-3 hover:scale-105 flex items-center space-x-4 animate-bounce-slow"
              >
                <Brain className="w-7 h-7 group-hover:animate-pulse" />
                <span className="font-serif">Try Our AI Model</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-300" />
              </Link>
              
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center group hover:scale-110 transition-transform duration-500">
                    <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 backdrop-blur-sm border border-violet-400/50 mb-4 group-hover:shadow-lg group-hover:shadow-violet-500/25">
                      <Icon className="w-8 h-8 text-violet-300 group-hover:animate-bounce" />
                    </div>
                    <div className="text-4xl font-bold text-white mb-2 font-serif">{stat.value}</div>
                    <div className="text-gray-200 font-light">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI Models Showcase */}
        <section className="py-24 px-4">
          <div className="max-w-8xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-8 animate-fade-in">
                Advanced AI Models
              </h2>
              <p className="text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in-up">
                Four state-of-the-art machine learning models working together to provide unparalleled text analysis
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {aiModels.map((model, index) => {
                const Icon = model.icon;
                return (
                  <div
                    key={index}
                    className="group p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-violet-400/30 hover:border-violet-400/60 hover:bg-gradient-to-br hover:from-white/20 hover:to-white/10 transition-all duration-700 hover:transform hover:-translate-y-4 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/30"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className={`inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-r ${model.gradient} group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 font-serif group-hover:text-violet-200 transition-colors duration-300">{model.name}</h3>
                    <p className="text-gray-200 leading-relaxed mb-6 font-light">{model.description}</p>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-yellow-300 group-hover:animate-pulse" />
                    
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {model.features.map((feature, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-violet-200 rounded-full text-sm border border-violet-400/40 group-hover:scale-105 transition-transform duration-300">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4">
          <div className="max-w-8xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-8 animate-fade-in">
                Powerful Features
              </h2>
              <p className="text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in-up">
                Experience the future of Somali text analysis with our comprehensive platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group p-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-violet-400/30 hover:border-violet-400/60 hover:bg-gradient-to-br hover:from-white/20 hover:to-white/10 transition-all duration-700 hover:transform hover:-translate-y-5 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/30"
                  >
                    <div className={`inline-flex items-center justify-center p-5 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-8 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-6 font-serif group-hover:text-violet-200 transition-colors duration-300">{feature.title}</h3>
                    <p className="text-gray-100 leading-relaxed text-lg font-light">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-pink-500/20 backdrop-blur-lg rounded-3xl border border-violet-400/40 p-16 hover:shadow-2xl hover:shadow-violet-500/25 transition-all duration-700 group">
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-8 group-hover:scale-105 transition-transform duration-500">
                Ready to Explore?
              </h2>
              <p className="text-2xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                Join thousands of users discovering the beauty of Somali literature through advanced AI analysis
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/signup"
                  className="px-10 py-5 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 rounded-2xl text-white font-bold text-xl transition-all duration-500 shadow-2xl hover:shadow-violet-500/50 transform hover:-translate-y-3 hover:scale-105 font-serif"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/prose"
                  className="px-10 py-5 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 backdrop-blur-sm border border-violet-400/50 rounded-2xl text-white font-bold text-xl transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/25 transform hover:-translate-y-3 hover:scale-105 font-serif"
                >
                  Browse Content
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;