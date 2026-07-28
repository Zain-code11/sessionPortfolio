import React from 'react';
import { X, Download, FileText, CheckCircle2, Building2, MapPin, Mail, Github, Sparkles } from 'lucide-react';

export const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    // Generate text/markdown downloadable representation or trigger print
    const element = document.createElement('a');
    const file = new Blob([
`==================================================
ZAIN HASSAN - FRONTEND DEVELOPER & REACT JS INTERN
==================================================
Location: Bahawalpur, Pakistan
Organization: EnigmaticX Software House
Batch: React Internship Batch 2026
GitHub: https://github.com/zainhassan

SUMMARY:
Passionate Frontend Developer and React JS Intern specializing in building responsive, modern, interactive web applications using React JS, JavaScript (ES6+), Tailwind CSS, Framer Motion, and GSAP.

FEATURED INTERNSHIP PROJECTS:
1. Snake Game (React JS, HTML5 Canvas, Tailwind CSS)
2. Dragon Game Runner (React JS, Web Audio API, Tailwind CSS)
3. Scientific Calculator (JavaScript ES6+, Math Engine, Tailwind CSS)
4. Alarm Clock & Timer (React JS, Local Storage, Web Audio API)

TECHNICAL SKILLS:
- Languages: HTML5, CSS3, JavaScript (ES6+), React JSX
- Styling: Tailwind CSS, CSS Grid/Flexbox, Glassmorphism
- Libraries: Framer Motion, GSAP, Lenis Scroll, Lucide Icons
- Tools & Cloud: Git, GitHub, Vite, Firebase Firestore
`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Zain_Hassan_Frontend_Resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900/95 dark:bg-slate-900/95 light:bg-white p-6 sm:p-8 border border-white/20 dark:border-white/20 light:border-slate-300 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto text-white dark:text-white light:text-slate-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 dark:bg-white/10 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/10 dark:border-white/10 light:border-slate-200 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[2px] shadow-lg">
            <div className="w-full h-full bg-[#050816] rounded-[14px] flex items-center justify-center font-black text-cyan-400 text-lg">
              ZH
            </div>
          </div>
          <div>
            <h3 className="text-xl font-black text-white dark:text-white light:text-slate-900">
              Zain Hassan
            </h3>
            <p className="text-xs font-mono text-cyan-400 dark:text-cyan-400 light:text-blue-600">
              Frontend Developer • React JS Intern
            </p>
          </div>
        </div>

        {/* Content Details */}
        <div className="space-y-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-slate-300 dark:text-slate-300 light:text-slate-700">
              <span>Organization:</span>
              <span className="font-bold text-white dark:text-white light:text-slate-900">EnigmaticX Software House</span>
            </div>
            <div className="flex items-center justify-between text-slate-300 dark:text-slate-300 light:text-slate-700">
              <span>Batch:</span>
              <span className="font-bold text-cyan-300 dark:text-cyan-300 light:text-blue-600">React Internship Batch 2026</span>
            </div>
            <div className="flex items-center justify-between text-slate-300 dark:text-slate-300 light:text-slate-700">
              <span>Location:</span>
              <span className="font-bold text-white dark:text-white light:text-slate-900">Bahawalpur, Pakistan</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Core Technical Stack</h4>
            <div className="flex flex-wrap gap-2">
              {['React JS (JSX)', 'JavaScript ES6+', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'HTML5 & CSS3', 'REST APIs', 'Git & GitHub'].map((skill) => (
                <span key={skill} className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-cyan-300 border border-blue-500/20 text-[11px]">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Featured Internship Projects</h4>
            <ul className="space-y-1.5 text-slate-300 dark:text-slate-300 light:text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>🐍 Snake Game — Canvas physics & local persistence</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>🐉 Dragon Runner Game — 2D Collision engine & web audio</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>🧮 Scientific Calculator — Complex math parser & memory tape</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>⏰ Alarm Clock App — Real-time clock & sound synthesis</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-white/10 dark:border-white/10 light:border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 hover:opacity-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume (.TXT)</span>
          </button>
        </div>

      </div>

    </div>
  );
};

export default ResumeModal;
