import React, { useState, useEffect } from 'react';
import { Sun, Moon, Github, Code2, Menu, X, FileText, Award, Map, Layers, Mail } from 'lucide-react';

export const Navbar = ({ theme, toggleTheme, onOpenContact, onOpenInstructor, onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', icon: Code2 },
    { name: 'Skills', href: '#skills', icon: Map },
    { name: 'Projects', href: '#projects', icon: Layers, badge: '04' },
    { name: 'Internship', href: '#internship', icon: Award },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transform-gpu translate-z-0 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050816]/90 dark:bg-[#050816]/90 light:bg-white/90 backdrop-blur-xl border-b border-white/10 dark:border-white/10 light:border-slate-200/80 shadow-2xl py-3'
          : 'bg-[#050816]/85 dark:bg-[#050816]/85 light:bg-white/85 backdrop-blur-md border-b border-white/10 dark:border-white/10 light:border-slate-200/60 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Modern Minimal ZH Logo */}
        <a
          href="#home"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[2px] shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/50 transition-all duration-300 transform group-hover:scale-105">
            <div className="w-full h-full bg-[#050816] dark:bg-[#050816] light:bg-white rounded-[10px] flex items-center justify-center">
              <span className="font-black text-sm tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                ZH
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-black tracking-tight text-base sm:text-lg text-white dark:text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors">
              Zain Hassan
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 dark:text-slate-400 light:text-slate-500 -mt-1">
              Frontend Dev • React JS Intern
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-mono uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-cyan-400 dark:hover:text-cyan-400 light:hover:text-blue-600 transition-colors flex items-center gap-1.5"
              >
                <Icon className="w-3.5 h-3.5 opacity-70" />
                <span>{link.name}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                    {link.badge}
                  </span>
                )}
              </a>
            );
          })}

          {/* Instructor Evaluation Button */}
          <button
            onClick={onOpenInstructor}
            className="text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20"
            title="Instructor Evaluation Dashboard"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Instructor Evaluation</span>
          </button>
        </nav>

        {/* Desktop Right Side Actions */}
        <div className="hidden lg:flex items-center gap-3">
          
          {/* Resume Modal Trigger */}
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 text-xs font-mono font-semibold border border-white/10 dark:border-white/10 light:border-slate-300 transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Resume</span>
          </button>

          {/* GitHub External */}
          <a
            href="https://github.com/Zain-code11"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 text-xs font-mono font-semibold border border-white/10 dark:border-white/10 light:border-slate-300 transition-all"
            title="GitHub Profile"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-white/10 dark:bg-white/10 light:bg-slate-100 hover:bg-white/20 dark:hover:bg-white/20 light:hover:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 border border-white/15 dark:border-white/15 light:border-slate-300 transition-all"
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-slate-800" />
            ) : (
              <Sun className="w-4 h-4 text-amber-300 animate-spin-slow" />
            )}
          </button>

        </div>

        {/* Mobile Menu Controls */}
        <div className="flex lg:hidden items-center gap-2 relative z-50">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-white/10 dark:bg-white/10 light:bg-slate-100 text-slate-200 dark:text-slate-200 light:text-slate-800 border border-white/10 dark:border-white/10 light:border-slate-300 transition-all flex items-center justify-center shrink-0"
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Moon className="w-4 h-4 text-slate-800" /> : <Sun className="w-4 h-4 text-amber-300 animate-spin-slow" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-white/10 dark:bg-white/10 light:bg-slate-100 text-white dark:text-white light:text-slate-900 border border-white/10 dark:border-white/10 light:border-slate-300 focus:outline-none transition-all flex items-center justify-center shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#050816]/95 dark:bg-[#050816]/95 light:bg-white/95 backdrop-blur-2xl border-b border-white/10 dark:border-white/10 light:border-slate-200 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-300">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-mono uppercase text-slate-200 dark:text-slate-200 light:text-slate-800 hover:text-cyan-400"
          >
            🏠 Home
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-mono uppercase text-slate-200 dark:text-slate-200 light:text-slate-800 hover:text-cyan-400"
          >
            ⚡ Skills & Roadmap
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-mono uppercase text-slate-200 dark:text-slate-200 light:text-slate-800 hover:text-cyan-400"
          >
            🚀 View 4 Projects
          </a>
          <a
            href="#internship"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-mono uppercase text-slate-200 dark:text-slate-200 light:text-slate-800 hover:text-cyan-400"
          >
            💼 Internship Info
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenInstructor();
            }}
            className="block w-full text-left text-sm font-mono uppercase text-amber-400 hover:text-amber-300"
          >
            🎓 Instructor Evaluation
          </button>

          <div className="pt-2 border-t border-white/10 dark:border-white/10 light:border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex items-center gap-2 py-2 px-3 rounded-lg bg-white/5 text-xs font-mono text-cyan-300"
            >
              <FileText className="w-4 h-4" />
              <span>Download / View Resume</span>
            </button>
            <a
              href="https://github.com/Zain-code11"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 px-3 rounded-lg bg-white/5 text-xs font-mono text-slate-300"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Profile</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
