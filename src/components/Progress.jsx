import React from 'react';
import { motion } from 'motion/react';
import { PROGRESS_STEPS } from '../data/projects';
import { CheckCircle2, ArrowDown, Sparkles, TrendingUp, Clock } from 'lucide-react';

export default function Progress({ theme }) {
  return (
    <section id="progress" className="py-16 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold bg-purple-500/10 border-purple-500/30 text-purple-400">
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
            <span>Curriculum Progress</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Learning Roadmap
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-normal">
            Step-by-step evolution of concepts mastered during the React Interns training.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative space-y-4">
          {PROGRESS_STEPS.map((item, index) => {
            const isLast = index === PROGRESS_STEPS.length - 1;

            return (
              <div key={item.step} className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`w-full max-w-xl p-5 rounded-2xl border transition-all duration-300 relative ${
                    item.completed
                      ? theme === 'dark'
                        ? 'bg-slate-900/90 border-slate-800 hover:border-blue-500/40 shadow-lg'
                        : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                      : 'bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-blue-900/30 border-purple-500/40 animate-pulse'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Step Number Badge */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-sm font-bold shadow ${
                        item.completed
                          ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
                          : 'bg-purple-600 text-white animate-bounce'
                      }`}>
                        {item.step}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            {item.title}
                          </h3>
                          {item.completed ? (
                            <span className="text-emerald-400 font-bold text-sm">✓</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-[10px] font-bold">
                              In Progress
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Status Icon */}
                    <div className="flex-shrink-0">
                      {item.completed ? (
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                          <Clock className="w-4 h-4 animate-spin" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Arrow Connector Down */}
                {!isLast && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    whileInView={{ opacity: 1, height: 'auto' }}
                    viewport={{ once: true }}
                    className="py-2 flex flex-col items-center"
                  >
                    <div className="w-0.5 h-4 bg-gradient-to-b from-blue-500 to-purple-500" />
                    <ArrowDown className="w-4 h-4 text-purple-400 -mt-1 animate-bounce" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
