import React from 'react';
import {
  User,
  Github,
  Linkedin,
  Mail,
  FileText,
  Code2,
  Cpu,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Award,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

export const AboutPage = () => {
  const skills = [
    { name: 'React.js & Hooks', level: 92 },
    { name: 'JavaScript (ES6+)', level: 90 },
    { name: 'Tailwind CSS & Responsive UI', level: 95 },
    { name: 'RESTful APIs & Asynchronous JS', level: 88 },
    { name: 'Firebase & Firestore Sync', level: 85 },
    { name: 'State Management (Context/Redux)', level: 86 },
  ];

  const technologies = [
    'React JS',
    'Vite',
    'Tailwind CSS',
    'JavaScript',
    'HTML5 & CSS3',
    'Firebase',
    'REST API',
    'Node.js',
    'Express.js',
    'Git & GitHub',
    'Framer Motion',
    'Lucide Icons'
  ];

  const journeySteps = [
    {
      year: 'Phase 1: Foundation',
      title: 'HTML, CSS & Modern JavaScript',
      desc: 'Mastered Semantic HTML5, CSS Grid/Flexbox, ES6+ syntax, Async/Await patterns, and DOM manipulation.'
    },
    {
      year: 'Phase 2: Modern Frontend',
      title: 'React ecosystem & Tailwind CSS',
      desc: 'Built modular single page apps using React hooks, custom state management, component architecture, and utility-first Tailwind CSS styling.'
    },
    {
      year: 'Phase 3: Real Projects & Backend Sync',
      title: 'Full-Stack Integration & Deployment',
      desc: 'Integrated REST APIs, Firebase Firestore real-time databases, Vercel/Netlify CI/CD deployments, and production performance tuning.'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Profile Header Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="relative shrink-0">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-black text-4xl shadow-xl shadow-blue-500/20 border-4 border-white dark:border-slate-800">
            ZH
          </div>
          <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" title="Available for hire" />
        </div>

        <div className="space-y-4 text-center md:text-left flex-1">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Frontend Developer
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Zain Hassan
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Passionately building accessible, high-performance web applications and sleek UI components.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            I am a dedicated Frontend Web Developer specializing in crafting clean, responsive, and user-centric web applications. This Student Projects Showcase Portal highlights my hands-on portfolio of interactive web tools, API integrations, games, and responsive dashboards.
          </p>

          {/* Social Links & Resume Button */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            <a
              href="https://github.com/zainhassan"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Profile</span>
            </a>

            <a
              href="https://linkedin.com/in/zainhassan"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold flex items-center gap-2 transition-all shadow-sm shadow-blue-500/20"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn Profile</span>
            </a>

            <a
              href="mailto:zain11hhhhh@gmail.com"
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Email Me</span>
            </a>

            <a
              href="https://github.com/zainhassan"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>View Resume</span>
            </a>
          </div>
        </div>
      </div>

      {/* Skills & Technologies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Core Competencies */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Core Skills
          </h2>

          <div className="space-y-4">
            {skills.map((s) => (
              <div key={s.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">{s.name}</span>
                  <span className="text-blue-600 dark:text-blue-400">{s.level}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.level}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Technologies & Tools
          </h2>

          <div className="flex flex-wrap gap-2.5">
            {technologies.map((tech) => (
              <div
                key={tech}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Learning Journey Timeline */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Learning Journey & Milestones
        </h2>

        <div className="relative border-l-2 border-blue-100 dark:border-slate-800 ml-4 space-y-8 pl-6">
          {journeySteps.map((step, idx) => (
            <div key={idx} className="relative group">
              <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-white dark:ring-slate-900" />
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                {step.year}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AboutPage;
