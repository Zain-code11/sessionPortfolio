import React from 'react';
import { Github, Mail, MapPin, Building2, Calendar, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#03050d] text-slate-400 py-12 border-t border-white/10 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[2px] shadow-lg">
              <div className="w-full h-full bg-[#050816] rounded-[10px] flex items-center justify-center font-black text-cyan-400 text-sm">
                ZH
              </div>
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Zain Hassan</h3>
              <p className="text-xs font-mono text-cyan-400">Frontend Developer • React JS Intern</p>
            </div>
          </div>

          {/* Org & Batch */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
              <Building2 className="w-3.5 h-3.5 text-purple-400" />
              <span>EnigmaticX Software House</span>
            </span>

            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Bahawalpur, Pakistan</span>
            </span>

            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-amber-300">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>React Internship Batch 2026</span>
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Zain-code11"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="mailto:zain.hassan.dev@example.com"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
              title="Email Zain Hassan"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-300 gap-2 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Zain Hassan. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>using React JS, Vite & Tailwind CSS</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
