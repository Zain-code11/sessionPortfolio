import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';

export const Internship = () => {
  return (
    <section id="internship" className="relative py-20 sm:py-28 bg-[#050816] text-white selection:bg-cyan-500 selection:text-black border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-purple-600/10 via-blue-600/15 to-cyan-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>Official Internship Overview</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            React JS <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">Internship Details</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Enrolled in the official React Internship Batch 2026 at EnigmaticX Software House in Bahawalpur, Pakistan.
          </p>
        </div>

        {/* Internship Main Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white backdrop-blur-xl border border-white/15 dark:border-white/15 light:border-slate-300 shadow-2xl space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10 dark:border-white/10 light:border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[2px] shadow-lg shrink-0">
                <div className="w-full h-full bg-[#050816] rounded-[14px] flex items-center justify-center font-black text-cyan-400 text-xl">
                  EX
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white dark:text-white light:text-slate-900">
                  EnigmaticX Software House
                </h3>
                <p className="text-xs font-mono text-cyan-400 dark:text-cyan-400 light:text-blue-600">
                  Software Development Company • Bahawalpur, Pakistan
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold self-start md:self-auto">
              <ShieldCheck className="w-4 h-4" />
              <span>Active React JS Intern</span>
            </div>
          </div>

          <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed max-w-3xl">
            As a React JS Intern, I build frontend applications focused on interactive UI engineering, responsive design, component architecture, and modern JavaScript standards.
          </p>

          {/* Grid Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 text-xs font-mono">
            <div className="p-3.5 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200">
              <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 text-[10px] uppercase block">Candidate</span>
              <p className="text-white dark:text-white light:text-slate-900 font-extrabold mt-1 truncate">Zain Hassan</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200">
              <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 text-[10px] uppercase block">Role</span>
              <p className="text-cyan-300 dark:text-cyan-300 light:text-blue-600 font-extrabold mt-1 truncate">React JS Intern</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200">
              <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 text-[10px] uppercase block">Batch</span>
              <p className="text-amber-300 dark:text-amber-300 light:text-amber-700 font-extrabold mt-1 truncate">Batch 2026</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200">
              <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 text-[10px] uppercase block">Location</span>
              <p className="text-white dark:text-white light:text-slate-900 font-extrabold mt-1 truncate">Bahawalpur</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200">
              <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 text-[10px] uppercase block">Mentor</span>
              <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 font-semibold mt-1 truncate">Update Later</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200">
              <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 text-[10px] uppercase block">Status</span>
              <p className="text-emerald-400 font-extrabold mt-1 truncate">In Progress</p>
            </div>
          </div>

          <div className="pt-2 text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 text-center border-t border-white/5 dark:border-white/5 light:border-slate-200">
            Verified Record • EnigmaticX Software House Evaluation Board
          </div>

        </div>

      </div>
    </section>
  );
};

export default Internship;
