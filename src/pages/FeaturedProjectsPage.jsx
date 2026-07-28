import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import ProjectCard from '../components/ProjectCard';
import DetailsModal from '../components/DetailsModal';
import { Star, Award } from 'lucide-react';

export const FeaturedProjectsPage = () => {
  const { projects } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter only featured: true
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
            Featured Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Highlighted top-tier projects demonstrating exceptional UI polish, performance, and technical architecture.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900 text-xs font-bold self-start md:self-auto">
          <Award className="w-4 h-4 text-amber-500" />
          <span>{featuredProjects.length} Highlighted Showcase Items</span>
        </div>
      </div>

      {/* Featured Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((proj) => (
          <ProjectCard
            key={proj.id}
            project={proj}
            onOpenDetails={(p) => setSelectedProject(p)}
          />
        ))}
      </div>

      {/* Details Modal */}
      {selectedProject && (
        <DetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default FeaturedProjectsPage;
