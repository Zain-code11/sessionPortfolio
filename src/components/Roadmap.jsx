import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Code, CheckCircle, Sparkles, BookOpen, Layers } from 'lucide-react';

export const Roadmap = () => {
  const roadmapRef = useRef(null);

  const steps = [
    { name: 'HTML5 & Semantic Web', status: 'Mastered', desc: 'Semantic tags, accessible DOM structure, SEO best practices & web standards.', category: 'Core Web' },
    { name: 'CSS3, Flexbox & Grid', status: 'Mastered', desc: 'Responsive grid layouts, flex alignment, custom animations & glassmorphism.', category: 'Styling' },
    { name: 'JavaScript ES6+', status: 'Mastered', desc: 'Async/await, Promises, closures, array methods, DOM manipulation & ES Modules.', category: 'Core Logic' },
    { name: 'React JS Framework', status: 'Mastered', desc: 'JSX, hooks (useState, useEffect), custom hooks, component state & Virtual DOM.', category: 'Frontend' },
    { name: 'Tailwind CSS Engine', status: 'Mastered', desc: 'Utility-first styling, responsive breakpoints, dark mode themes & UI design.', category: 'UI Styling' },
    { name: 'REST APIs & Fetch/Axios', status: 'Mastered', desc: 'HTTP requests, JSON parsing, API integration, loading states & error handling.', category: 'Data Fetch' },
    { name: 'Firebase & Cloud Services', status: 'Mastered', desc: 'Firestore NoSQL database, authentication, security rules & cloud deployment.', category: 'Cloud DB' },
    { name: 'Node.js & Express Basics', status: 'Learning', desc: 'Express server routing, API endpoints, NPM environment & server middleware.', category: 'Backend' },
    { name: 'Full-Stack MERN Architecture', status: 'Learning', desc: 'MongoDB, Express, React & Node.js end-to-end full stack application development.', category: 'Full Stack' },
  ];

  return (
    <section id="skills" ref={roadmapRef} className="relative py-20 sm:py-28 bg-[#050816] text-white selection:bg-cyan-500 selection:text-black border-t border-white/10">
      <span id="roadmap" className="absolute -top-24" />
      
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/10 via-cyan-500/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            <span>Developer Growth Journey</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Frontend & Full-Stack <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">Roadmap</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            A concise, to-the-point progression of technologies mastered and current learning goals.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative pt-4">
          
          {/* Vertical Connecting Center Line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-600 via-cyan-400 to-purple-600 shadow-[0_0_15px_rgba(56,189,248,0.5)]" />

          <div className="space-y-6 sm:space-y-8">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const isLearning = step.status === 'Learning';

              return (
                <motion.div
                  key={step.name}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={`relative flex items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Timeline Dot Indicator */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#050816] border-2 border-cyan-400 flex items-center justify-center z-20 shadow-[0_0_12px_rgba(56,189,248,0.6)]">
                    <div className={`w-2 h-2 rounded-full ${isLearning ? 'bg-amber-400 animate-ping' : 'bg-cyan-400'}`} />
                  </div>

                  {/* Card Box */}
                  <div className="pl-12 sm:pl-0 sm:w-1/2 sm:px-6">
                    <div className={`p-4 sm:p-5 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white backdrop-blur-xl border ${
                      isLearning
                        ? 'border-amber-500/30 dark:border-amber-500/30 light:border-amber-300'
                        : 'border-white/10 dark:border-white/10 light:border-slate-300'
                    } shadow-xl hover:border-cyan-400/50 transition-all duration-300 space-y-2`}>
                      
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                          {step.category}
                        </span>

                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          isLearning
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {step.status}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-extrabold text-white dark:text-white light:text-slate-900 flex items-center gap-2">
                        <span>{step.name}</span>
                      </h3>

                      <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                        {step.desc}
                      </p>

                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Roadmap;
