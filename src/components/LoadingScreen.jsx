import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2 } from 'lucide-react';

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scrolling while loader is active
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    let animationFrame;
    const startTime = Date.now();
    const duration = 1800; // 1.8 seconds

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(current);

      if (current < 100) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 150);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrame);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%', transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100dvh',
        zIndex: 9999,
      }}
      className="flex flex-col justify-between p-6 sm:p-12 bg-[#050816] text-white selection:bg-cyan-500 selection:text-black transform-gpu translate-z-0 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span>Zain Hassan • EnigmaticX Software House</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-slate-400">
          <Code2 className="w-4 h-4 text-cyan-400" />
          <span>React Internship Batch 2026</span>
        </div>
      </div>

      {/* Center Cinematic Display */}
      <div className="my-auto max-w-2xl w-full mx-auto space-y-6 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-mono">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>Loading Showcase Experience</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
          PROJECT <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">SHOWCASE</span>
        </h1>

        <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
          Loading...
        </p>

        {/* Big Counter Display */}
        <div className="py-2">
          <span className="text-6xl sm:text-8xl font-black font-mono tracking-tighter text-white">
            {progress < 10 ? `0${progress}` : progress}
            <span className="text-3xl text-cyan-400 font-sans">%</span>
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-500">
        <span>Bahawalpur, Pakistan</span>
        <span>Awwwards Inspired Design</span>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
