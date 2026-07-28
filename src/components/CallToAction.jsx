import React from 'react';
import { Github, Mail, FileText, ArrowRight, Sparkles } from 'lucide-react';

export const CallToAction = ({ onOpenContact, onOpenResume }) => {
  return (
    <section id="cta" className="relative py-20 sm:py-28 bg-[#050816] text-white selection:bg-cyan-500 selection:text-black border-t border-white/10 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/15 via-indigo-600/20 to-cyan-500/15 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Connect & Collaborate</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          Interested in source code or <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            evaluating additional projects?
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Explore all open-source repositories on GitHub, review the instructor evaluation report, or reach out directly regarding React JS frontend development opportunities.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          
          <a
            href="https://github.com/Zain-code11"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 hover:opacity-95 transition-all transform hover:-translate-y-0.5"
          >
            <Github className="w-4 h-4" />
            <span>Visit GitHub Profile</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 transition-all backdrop-blur-md"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Download Resume</span>
          </button>

          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 transition-all backdrop-blur-md"
          >
            <Mail className="w-4 h-4 text-purple-400" />
            <span>Contact Candidate</span>
          </button>

        </div>

      </div>
    </section>
  );
};

export default CallToAction;
