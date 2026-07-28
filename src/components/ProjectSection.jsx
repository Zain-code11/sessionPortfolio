import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, CheckCircle2, Sparkles, ChevronRight, Layers } from 'lucide-react';

export const ProjectSection = ({ project, index }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.25 });

  const isEven = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full py-20 lg:py-32 flex items-center justify-center overflow-hidden border-b border-white/5 dark:border-white/5 light:border-slate-200/80"
    >
      {/* Dynamic Background Glow for each project */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at ${isEven ? '20%' : '80%'} 50%, ${project.glowColor}, transparent 70%)`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Main Grid Container (Alternating Image / Content) */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
          isEven ? '' : 'lg:flex-row-reverse'
        }`}>

          {/* Project Screenshot Container */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -60 : 60, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: isEven ? -60 : 60, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <div className="relative group rounded-3xl p-2.5 sm:p-3 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-white/10 dark:via-white/5 light:from-slate-200 light:to-slate-100 border border-white/15 dark:border-white/15 light:border-slate-300 shadow-2xl backdrop-blur-xl overflow-hidden">
              
              {/* Outer Image Box */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 group-hover:opacity-60 transition-opacity" />

                {/* Project Tagline Bar (Overlay Top) */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-black/60 backdrop-blur-md text-slate-200 border border-white/10">
                    {project.tagline}
                  </span>
                  
                  {/* Status Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/90 text-white shadow-lg backdrop-blur-md">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{project.status}</span>
                  </span>
                </div>

                {/* Number Watermark */}
                <div className="absolute bottom-4 right-6 font-mono text-6xl sm:text-8xl font-black text-white/10 select-none pointer-events-none">
                  {project.number}
                </div>

                {/* Hover Quick Action Overlay */}
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-105"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Demo</span>
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-slate-900/90 text-white font-bold text-xs border border-white/20 shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                </div>

              </div>

            </div>
          </motion.div>

          {/* Project Details Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
          >
            {/* Top Indicator */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {project.number} / 04
              </span>
              <div className="w-12 h-px bg-white/20 dark:bg-white/20 light:bg-slate-300" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-400 light:text-slate-500">
                {project.subtitle}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white dark:text-white light:text-slate-900 leading-tight">
              {project.title}
            </h2>

            {/* Description */}
            <p className="text-base text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed font-normal">
              {project.description}
            </p>

            {/* Feature Bullets */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 dark:text-cyan-400 light:text-blue-600 font-bold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Key Features</span>
              </h4>
              <ul className="space-y-2">
                {project.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700"
                  >
                    <ChevronRight className="w-4 h-4 text-cyan-400 dark:text-cyan-400 light:text-blue-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies Pills */}
            <div className="pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500 font-bold mb-3">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-xl text-xs font-mono font-medium bg-white/5 dark:bg-white/5 light:bg-slate-100 text-slate-200 dark:text-slate-200 light:text-slate-800 border border-white/10 dark:border-white/10 light:border-slate-300 hover:border-cyan-400/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Live Project</span>
              </a>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 dark:bg-white/10 light:bg-slate-100 hover:bg-white/20 dark:hover:bg-white/20 light:hover:bg-slate-200 text-white dark:text-white light:text-slate-900 font-bold text-sm border border-white/15 dark:border-white/15 light:border-slate-300 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ProjectSection;
