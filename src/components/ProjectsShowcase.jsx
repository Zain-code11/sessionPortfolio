import React, { useState } from 'react';
import projects from '../data/projects';
import ProjectCard from './ProjectCard';
import DetailsModal from './DetailsModal';
import { Layers, Sparkles } from 'lucide-react';

export const ProjectsShowcase = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="relative py-20 sm:py-32 bg-[#050816] text-white selection:bg-cyan-500 selection:text-black border-t border-white/10">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-blue-600/10 via-cyan-500/10 to-indigo-600/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            <span>Frontend Internship Assignments</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Featured <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">React Projects</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Showcase of 4 completed React JS applications built during my internship at EnigmaticX Software House.
          </p>
        </div>

        {/* 2x2 Responsive Grid Layout (Desktop & Tablet: 2 per row, Mobile: 1 per row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={(proj) => setSelectedProject(proj)}
            />
          ))}
        </div>

      </div>

      {/* Details Modal */}
      {selectedProject && (
        <DetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </section>
  );
};

export default ProjectsShowcase;
