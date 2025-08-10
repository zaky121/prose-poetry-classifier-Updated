import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Brain, Sparkles, Heart, Star, Zap, Globe, Users, TrendingUp, Award } from 'lucide-react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ClassifierPage from './pages/ClassifierPage';
import ProsePage from './pages/ProsePage';
import PoetryPage from './pages/PoetryPage';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/classifier" element={<ClassifierPage />} />
          <Route path="/prose" element={<ProsePage />} />
          <Route path="/poetry" element={<PoetryPage />} />
          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-900/80 via-pink-900/80 to-rose-900/80 backdrop-blur-xl border-t border-white/20 mt-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 animate-gradient-x"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6 group">
              <div className="p-3 rounded-xl bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 shadow-2xl group-hover:shadow-violet-500/50 transition-all duration-500 group-hover:scale-110">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent font-serif">
                Somali Text AI
              </span>
            </div>
            <p className="text-gray-200 leading-relaxed mb-6 max-w-md text-lg font-light">
              Advanced artificial intelligence for Somali text classification. Experience the future of natural language processing with our cutting-edge models.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-gradient-to-r from-violet-500/20 to-purple-500/20 hover:from-violet-500/40 hover:to-purple-500/40 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-violet-400/30">
                <svg className="w-5 h-5 text-violet-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="p-3 bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 hover:from-fuchsia-500/40 hover:to-pink-500/40 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-fuchsia-400/30">
                <svg className="w-5 h-5 text-fuchsia-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="p-3 bg-gradient-to-r from-pink-500/20 to-rose-500/20 hover:from-pink-500/40 hover:to-rose-500/40 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-pink-400/30">
                <svg className="w-5 h-5 text-pink-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 font-serif">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-200 hover:text-violet-300 transition-all duration-300 hover:translate-x-2 flex items-center group"><Sparkles className="w-4 h-4 mr-2 group-hover:animate-spin" />Home</a></li>
              <li><a href="/classifier" className="text-gray-200 hover:text-fuchsia-300 transition-all duration-300 hover:translate-x-2 flex items-center group"><Brain className="w-4 h-4 mr-2 group-hover:animate-pulse" />AI Classifier</a></li>
              <li><a href="/prose" className="text-gray-200 hover:text-pink-300 transition-all duration-300 hover:translate-x-2 flex items-center group"><Heart className="w-4 h-4 mr-2 group-hover:animate-bounce" />Somali Prose</a></li>
              <li><a href="/poetry" className="text-gray-200 hover:text-rose-300 transition-all duration-300 hover:translate-x-2 flex items-center group"><Star className="w-4 h-4 mr-2 group-hover:animate-spin" />Somali Poetry</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 font-serif">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-200 hover:text-violet-300 transition-all duration-300 hover:translate-x-2 flex items-center group"><Globe className="w-4 h-4 mr-2 group-hover:animate-spin" />Documentation</a></li>
              <li><a href="#" className="text-gray-200 hover:text-fuchsia-300 transition-all duration-300 hover:translate-x-2 flex items-center group"><Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />API Reference</a></li>
              <li><a href="#" className="text-gray-200 hover:text-pink-300 transition-all duration-300 hover:translate-x-2 flex items-center group"><Award className="w-4 h-4 mr-2 group-hover:animate-bounce" />Research Papers</a></li>
              <li><a href="#" className="text-gray-200 hover:text-rose-300 transition-all duration-300 hover:translate-x-2 flex items-center group"><Users className="w-4 h-4 mr-2 group-hover:animate-pulse" />Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm font-light">
              © 2024 Somali Text AI. All rights reserved. Built with advanced NLP technology.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-violet-300 text-sm transition-all duration-300 hover:scale-110">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-fuchsia-300 text-sm transition-all duration-300 hover:scale-110">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-pink-300 text-sm transition-all duration-300 hover:scale-110">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default App;