import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Code2, Sparkles } from 'lucide-react';

export const DetailsModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      
      <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900/95 dark:bg-slate-900/95 light:bg-white p-6 sm:p-8 border border-white/20 dark:border-white/20 light:border-slate-300 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 dark:bg-white/10 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Assignment {project.number}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white dark:text-white light:text-slate-900">
            {project.title}
          </h3>

          <p className="text-xs font-mono text-cyan-400 dark:text-cyan-400 light:text-blue-600">
            {project.subtitle}
          </p>
        </div>

        {/* Image banner */}
        <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 dark:border-white/10 light:border-slate-200">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900 uppercase font-mono tracking-wider">
            Project Overview
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900 uppercase font-mono tracking-wider">
            Key Engineering Features
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.features && project.features.map((feat, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 flex items-start gap-2.5 text-xs text-slate-200 dark:text-slate-200 light:text-slate-800"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900 uppercase font-mono tracking-wider">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-xl bg-blue-500/10 text-cyan-300 border border-blue-500/20 text-xs font-mono font-semibold"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-white/10 dark:border-white/10 light:border-slate-200 flex flex-wrap items-center justify-end gap-3">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Live App</span>
          </a>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 dark:bg-white/10 light:bg-slate-100 text-white dark:text-white light:text-slate-900 font-bold text-xs border border-white/15 dark:border-white/15 light:border-slate-300"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Source Code</span>
          </a>
        </div>

      </div>

    </div>
  );
};

export default DetailsModal;
