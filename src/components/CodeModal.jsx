import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Github, Code, Copy, Check, ExternalLink, FileCode } from 'lucide-react';

export default function CodeModal({ project, onClose, theme }) {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {project.title} - Code & Repository
                </h3>
                <p className="text-xs text-slate-400">{project.assignmentNumber} Source Code Sample</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
            
            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold text-slate-400">Technologies Used:</span>
              {project.technologies.map((t, i) => (
                <span key={i} className="px-2.5 py-0.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                  {t}
                </span>
              ))}
            </div>

            {/* Code Snippet Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-purple-400" />
                  Core Logic Implementation ({project.title}.js)
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-emerald-400 overflow-x-auto shadow-inner leading-relaxed">
                <code>{project.codeSnippet}</code>
              </pre>
            </div>

            {/* Repository Info Box */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Repository Structure & Commit Info</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                This project was created as part of the React Interns assignment track. Includes clean module separation, full responsive CSS, unit logic tests, and documented functions.
              </p>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">GitHub Repository URL:</span>
            <a
              href={project.githubRepoUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <Github className="w-4 h-4" />
              <span>Open Repository on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
