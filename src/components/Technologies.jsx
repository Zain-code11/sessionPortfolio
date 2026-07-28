import React from 'react';
import { motion } from 'motion/react';
import { TECHNOLOGIES } from '../data/projects';
import { Cpu, Code2, Sparkles, Terminal, FileCode, Palette, Wind, GitBranch, Github } from 'lucide-react';

export default function Technologies({ theme }) {
  // Map icon names
  const getTechIcon = (name) => {
    switch (name) {
      case 'React': return Cpu;
      case 'JavaScript': return Code2;
      case 'HTML5': return FileCode;
      case 'CSS3': return Palette;
      case 'Tailwind CSS': return Wind;
      case 'Git': return GitBranch;
      case 'GitHub': return Github;
      case 'VS Code': return Terminal;
      case 'Framer Motion': return Sparkles;
      default: return Code2;
    }
  };

  return (
    <section id="technologies" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold bg-cyan-500/10 border-cyan-500/30 text-cyan-400">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tech Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Tools & Technologies
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-normal">
            Core libraries, languages, and developer tools utilized throughout the assignments.
          </p>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {TECHNOLOGIES.map((tech, index) => {
            const IconComponent = getTechIcon(tech.name);

            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.2 } }}
                className={`p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 group cursor-default ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-slate-800 shadow-md hover:border-slate-700 hover:shadow-xl'
                    : 'bg-white border-slate-200 shadow-sm hover:shadow-lg'
                }`}
              >
                <div className={`p-3 rounded-xl border ${tech.color} flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform`}>
                  <IconComponent className="w-6 h-6" />
                </div>

                <div className="overflow-hidden">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                    {tech.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <span>{tech.category}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    <span className="text-blue-400 font-semibold">{tech.level}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
