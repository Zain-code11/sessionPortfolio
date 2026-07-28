import React, { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import ProjectCard from '../components/ProjectCard';
import DetailsModal from '../components/DetailsModal';
import AnimatedCounter from '../components/AnimatedCounter';
import {
  FolderKanban,
  Globe,
  Github,
  CheckCircle2,
  Star,
  Search,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

export const DashboardPage = () => {
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

  // Calculate Metrics
  const totalProjects = projects.length;
  const liveProjects = projects.filter((p) => p.live).length;
  const githubProjects = projects.filter((p) => p.github).length;
  const completedProjects = projects.filter((p) => p.status === 'Completed').length;
  const featuredProjects = projects.filter((p) => p.featured).length;

  // Filtered list
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Category check
      const matchesCategory =
        activeCategory === 'All' ||
        p.category === activeCategory ||
        p.technologies.some((t) => t.toLowerCase() === activeCategory.toLowerCase());

      // Search term check
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
      
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white p-6 sm:p-8 overflow-hidden shadow-xl shadow-blue-500/10">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic & Recruiter Portfolio Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Student Projects Showcase Dashboard
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
            Welcome! Explore Zain Hassan's complete collection of frontend & full-stack web applications, real deployed websites, source code repositories, and instructor evaluation logs.
          </p>
        </div>
      </div>

      {/* Summary Cards with Animated Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Projects */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xl shrink-0">
            <FolderKanban className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Projects</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              <AnimatedCounter value={totalProjects} />
            </p>
          </div>
        </div>

        {/* Live Projects */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xl shrink-0">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Live Projects</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              <AnimatedCounter value={liveProjects} />
            </p>
          </div>
        </div>

        {/* GitHub Repositories */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center font-bold text-xl shrink-0">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">GitHub Repos</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              <AnimatedCounter value={githubProjects} />
            </p>
          </div>
        </div>

        {/* Completed Projects */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xl shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Completed</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              <AnimatedCounter value={completedProjects} />
            </p>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="col-span-2 lg:col-span-1 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xl shrink-0">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Featured</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              <AnimatedCounter value={featuredProjects} />
            </p>
          </div>
        </div>
      </div>

      {/* Search & Quick Category Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Filter & Search Projects
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Showing {filteredProjects.length} of {totalProjects} projects
            </p>
          </div>

          {/* Quick Clear Filter if active */}
          {(activeCategory !== 'All' || searchTerm) && (
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchTerm('');
              }}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline self-start sm:self-auto"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Category Buttons Bar */}
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

      {/* Project Cards Grid */}
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
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No Projects Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No projects matched your criteria "{searchTerm}" under "{activeCategory}". Try resetting search or filter tags.
          </p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setSearchTerm('');
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all"
          >
            Clear Search & Filters
          </button>
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

export default DashboardPage;
