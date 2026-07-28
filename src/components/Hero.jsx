import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Github, FileText, Mail, MapPin, Building2, UserCheck, Calendar, ShieldCheck } from 'lucide-react';

export const Hero = ({ onOpenContact, onOpenResume }) => {
  return (
    <section id="home" className="relative min-h-[100dvh] w-full bg-[#050816] text-white selection:bg-cyan-500 selection:text-black flex flex-col justify-between pt-28 sm:pt-32 pb-16 overflow-hidden">
      
      {/* Animated Background Mesh & Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Cyan Glow Orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-cyan-400/15 rounded-full blur-[140px] animate-glow pointer-events-none" />
        
        {/* Purple Glow Orb */}
        <div className="absolute bottom-1/4 right-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-bl from-purple-600/15 via-fuchsia-600/15 to-blue-600/10 rounded-full blur-[150px] animate-glow-delayed pointer-events-none" />

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        {/* Floating Subtle Particles */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-12 left-10 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <div className="absolute top-1/3 right-16 w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
          <div className="absolute bottom-20 left-1/4 w-2 h-2 rounded-full bg-purple-400 animate-ping" />
        </div>
      </div>

      {/* Main Hero Content Box */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        {/* Left Column: Branding, Typography, Introduction & Actions */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          {/* Top Internship Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm font-mono shadow-2xl"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="font-semibold text-white">Zain Hassan</span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-300 font-semibold">React JS Intern</span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-1"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
              React JS Developer <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(56,189,248,0.4)]">
                Project Showcase
              </span>
            </h1>
          </motion.div>

          {/* Role & Org Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm font-mono text-slate-300"
          >
            <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 font-semibold">
              Frontend Developer
            </span>
            <span className="text-slate-600">•</span>
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 font-semibold">
              React JS Developer
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 font-mono">EnigmaticX Software House</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
          >
            Welcome to my project showcase. Here you can explore my 4 frontend React JS projects, open the live applications, and view the complete source code on GitHub.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>View Projects</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="https://github.com/Zain-code11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 transition-all backdrop-blur-md"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 transition-all backdrop-blur-md"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Download Resume</span>
            </button>

            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 transition-all backdrop-blur-md"
            >
              <Mail className="w-4 h-4 text-purple-400" />
              <span>Contact</span>
            </button>
          </motion.div>

        </div>

        {/* Right Column: Hero Information Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="lg:col-span-5"
        >
          <div className="relative rounded-3xl p-6 sm:p-7 bg-slate-900/80 dark:bg-slate-900/80 light:bg-white/90 backdrop-blur-2xl border border-white/15 dark:border-white/15 light:border-slate-300 shadow-2xl space-y-4">
            
            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-white/10 dark:border-white/10 light:border-slate-200 pb-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-bold text-white shadow-md text-sm">
                  ZH
                </div>
                <div>
                  <h3 className="font-extrabold text-white dark:text-white light:text-slate-900 text-sm">
                    Zain Hassan
                  </h3>
                  <p className="text-[11px] font-mono text-cyan-400 dark:text-cyan-400 light:text-blue-600">
                    Frontend Developer Profile
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Active</span>
              </div>
            </div>

            {/* Information Rows */}
            <div className="space-y-2.5 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 flex items-center justify-between">
                <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-blue-400" /> Current Role
                </span>
                <span className="font-bold text-white dark:text-white light:text-slate-900">Frontend Developer</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 flex items-center justify-between">
                <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-purple-400" /> Internship
                </span>
                <span className="font-bold text-cyan-300 dark:text-cyan-300 light:text-blue-600">React JS Intern</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 flex items-center justify-between">
                <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" /> Organization
                </span>
                <span className="font-bold text-white dark:text-white light:text-slate-900 text-right">EnigmaticX Software House</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 flex items-center justify-between">
                <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" /> Location
                </span>
                <span className="font-bold text-white dark:text-white light:text-slate-900">Bahawalpur, Pakistan</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 flex items-center justify-between">
                <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> Internship Batch
                </span>
                <span className="font-bold text-amber-300 dark:text-amber-300 light:text-amber-700">React Internship Batch 2026</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 flex items-center justify-between">
                <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> Mentor
                </span>
                <span className="font-bold text-slate-400 dark:text-slate-400 light:text-slate-600">Update Later</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Subtle Bottom Scroll Indicator */}
      <div className="relative z-10 pt-8 flex flex-col items-center gap-1.5 text-[11px] font-mono text-slate-400 opacity-80">
        <span>SCROLL TO EXPLORE SHOWCASE</span>
        <div className="w-5 h-8 rounded-full border-2 border-slate-600 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-1.5 h-2 bg-cyan-400 rounded-full"
          />
        </div>
      </div>

    </section>
  );
};

export default Hero;

