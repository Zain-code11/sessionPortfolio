import React from 'react';
import { ExternalLink, Github, CheckCircle2, Sparkles, Eye, Calendar } from 'lucide-react';

export const ProjectCard = ({ project, onOpenDetails }) => {
  return (
    <div data-cursor="project" className="h-full flex flex-col justify-between rounded-3xl p-5 sm:p-6 bg-slate-900/80 dark:bg-slate-900/80 light:bg-white backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-slate-300 shadow-xl hover:shadow-2xl hover:border-cyan-400/50 dark:hover:border-cyan-400/50 transition-all duration-500 group transform hover:-translate-y-1.5 relative overflow-hidden">
      
      {/* Background Accent Glow on Hover */}
      <div
        className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: project.glowColor || 'rgba(56, 189, 248, 0.2)' }}
      />

      <div className="space-y-4">
        
        {/* Screenshot Container */}
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950 border border-white/10 dark:border-white/10 light:border-slate-200">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 group-hover:opacity-40 transition-opacity" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-black/60 backdrop-blur-md text-cyan-300 border border-white/10">
              {project.number} / 04
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500 text-white shadow-md backdrop-blur-md">
              <CheckCircle2 className="w-3 h-3" />
              <span>{project.status || 'Completed'}</span>
            </span>
          </div>

          {/* Hover Details Button */}
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={() => onOpenDetails(project)}
              className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-105"
            >
              <Eye className="w-3.5 h-3.5 text-blue-600" />
              <span>View Details & Features</span>
            </button>
          </div>
        </div>

        {/* Title & Metadata */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 mb-1">
            <span>{project.subtitle}</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Calendar className="w-3 h-3 text-cyan-400" />
              <span>{project.completionDate || '2026'}</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white dark:text-white light:text-slate-900 group-hover:text-cyan-400 dark:group-hover:text-cyan-400 light:group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mt-2 line-clamp-3 font-normal">
            {project.description}
          </p>
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-medium bg-white/5 dark:bg-white/5 light:bg-slate-100 text-slate-200 dark:text-slate-200 light:text-slate-800 border border-white/10 dark:border-white/10 light:border-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

      </div>

      {/* Action Buttons */}
      <div className="pt-4 mt-4 border-t border-white/10 dark:border-white/10 light:border-slate-200 grid grid-cols-2 gap-2.5">
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 text-center hover:opacity-95"
          title="Open Live Project Demo"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Open Project</span>
        </a>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-slate-200 text-white dark:text-white light:text-slate-900 text-xs font-semibold border border-white/10 dark:border-white/10 light:border-slate-300 transition-all text-center"
          title="View GitHub Repository"
        >
          <Github className="w-3.5 h-3.5" />
          <span>GitHub Repo</span>
        </a>
      </div>

    </div>
  );
};

export default ProjectCard;
