import React, { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import ProjectCard from '../components/ProjectCard';
import DetailsModal from '../components/DetailsModal';
import { FolderKanban, Search, SlidersHorizontal } from 'lucide-react';

export const AllProjectsPage = () => {
  const { projects, searchTerm, setSearchTerm, activeCategory, setActiveCategory } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    'All',
    'React',
    'JavaScript',
    'Tailwind CSS',
    'Firebase',
    'REST API',
    'MERN',
    'Games',
    'Portfolio',
    'Mini Projects'
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        activeCategory === 'All' ||
        p.category === activeCategory ||
        p.technologies.some((t) => t.toLowerCase() === activeCategory.toLowerCase());

      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.technologies.some((t) => t.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchTerm]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <FolderKanban className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            All Showcase Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse through all completed web applications, single page apps, games, and API services.
          </p>
        </div>
        <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 self-start md:self-auto">
          {filteredProjects.length} Projects Available
        </div>
      </div>

      {/* Filter Buttons Bar */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onOpenDetails={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No Projects Match</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria or category filters to find projects.
          </p>
        </div>
      )}

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

export default AllProjectsPage;
