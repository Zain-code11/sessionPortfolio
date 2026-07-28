import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Sparkles, CheckCircle2 } from 'lucide-react';
import ScientificCalculator from './demos/ScientificCalculator';
import AlarmClock from './demos/AlarmClock';
import SnakeGame from './demos/SnakeGame';
import DragonRunner from './demos/DragonRunner';

export default function DemoModal({ project, onClose, theme }) {
  if (!project) return null;

  const renderDemoContent = () => {
    switch (project.demoType) {
      case 'calculator':
        return <ScientificCalculator />;
      case 'alarm':
        return <AlarmClock />;
      case 'snake':
        return <SnakeGame />;
      case 'dragon':
        return <DragonRunner />;
      default:
        return <div className="p-6 text-center text-slate-400">Demo component not found</div>;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden z-10 my-8 ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold">
                {project.assignmentNumber}
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {project.title} - Live Interactive Demo
                </h3>
                <p className="text-xs text-slate-400">Playable submission for instructor evaluation</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Demo Body */}
          <div className="p-6 overflow-y-auto max-h-[80vh]">
            <div className="mb-6 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white mb-0.5">Interactive Demo Instructions:</strong>
                {project.longDescription}
              </div>
            </div>

            {/* Embedded Live Demo Engine */}
            <div className="flex justify-center my-2">
              {renderDemoContent()}
            </div>
          </div>

          {/* Footer Bar */}
          <div className="p-4 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Status: Fully Tested & Working</span>
            </div>
            <a
              href={project.githubRepoUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5 transition"
            >
              <Github className="w-3.5 h-3.5" />
              <span>View Source Code</span>
            </a>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
