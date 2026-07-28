import React, { useState } from 'react';
import { PROJECTS } from '../data/projects';
import ProjectCard from './ProjectCard';
import { Sparkles, Code2, Layers } from 'lucide-react';

export default function Projects({ onOpenDemo, onOpenCode, theme }) {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Utility', 'Gaming', 'Beginner', 'Intermediate'];

  const filteredProjects = PROJECTS.filter((project) => {
    if (filter === 'All') return true;
    if (filter === 'Utility' || filter === 'Gaming') return project.category === filter;
    if (filter === 'Beginner' || filter === 'Intermediate') return project.difficulty === filter;
    return true;
  });

  return (
    <section id="projects" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold bg-blue-500/10 border-blue-500/30 text-blue-400">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Assignment Review Collection</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Internship Projects
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Every assignment is built from scratch with interactive functionality, responsive layouts, clean code structure, and live playable demos for instructor evaluation.
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  filter === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : theme === 'dark'
                      ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                      : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDemo={onOpenDemo}
              onOpenCode={onOpenCode}
              theme={theme}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
