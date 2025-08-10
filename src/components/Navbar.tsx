import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Feather, Home, Brain, Sparkles } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/classifier', label: 'Classifier', icon: Brain },
    { path: '/prose', label: 'Prose', icon: BookOpen },
    { path: '/poetry', label: 'Poetry', icon: Feather },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="relative z-50 bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-rose-900/30 backdrop-blur-xl border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-xl bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 group-hover:from-violet-600 group-hover:via-purple-600 group-hover:to-fuchsia-600 transition-all duration-500 shadow-2xl group-hover:shadow-violet-500/50 group-hover:scale-110">
              <Brain className="w-6 h-6 text-white" />
              <Sparkles className="w-3 h-3 text-white/70 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent font-serif group-hover:scale-105 transition-transform duration-300">
              Somali Text AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-500 group ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 text-white border border-violet-400/50 shadow-lg'
                      : 'text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 hover:scale-105'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive(item.path) ? 'animate-pulse' : 'group-hover:animate-bounce'}`} />
                  <span className="font-medium font-serif">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-violet-500/20 hover:to-purple-500/20 transition-all duration-300 hover:scale-110"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/20 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-lg">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-500 group ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 text-white border border-violet-400/50'
                        : 'text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
