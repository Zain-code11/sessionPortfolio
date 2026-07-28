import React, { useState } from 'react';
import { X, Mail, Github, MapPin, Copy, Check, Send, Sparkles } from 'lucide-react';

export const ContactModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const email = 'zain.hassan.dev@example.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900/95 dark:bg-slate-900/95 light:bg-white p-6 sm:p-8 border border-white/20 dark:border-white/20 light:border-slate-300 shadow-2xl space-y-6 text-white dark:text-white light:text-slate-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 dark:bg-white/10 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors"
          aria-label="Close contact modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>

          <h3 className="text-2xl font-black text-white dark:text-white light:text-slate-900">
            Contact Zain Hassan
          </h3>

          <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
            Frontend Developer & React JS Intern at EnigmaticX Software House, Bahawalpur, Pakistan.
          </p>
        </div>

        {/* Info list */}
        <div className="space-y-3 font-mono text-xs">
          
          <div className="p-3.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-purple-400" />
              <span className="text-slate-200 dark:text-slate-200 light:text-slate-800">{email}</span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-1.5 rounded-lg bg-white/10 dark:bg-white/10 light:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white transition-colors"
              title="Copy Email Address"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span className="text-slate-200 dark:text-slate-200 light:text-slate-800">Bahawalpur, Pakistan</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 flex items-center gap-2.5">
            <Github className="w-4 h-4 text-cyan-400" />
            <a href="https://github.com/zainhassan" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">
              https://github.com/zainhassan
            </a>
          </div>

        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <a
            href={`mailto:${email}?subject=Inquiry regarding React JS Internship Projects`}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-500/20"
          >
            <Send className="w-4 h-4" />
            <span>Send Direct Email</span>
          </a>
        </div>

      </div>

    </div>
  );
};

export default ContactModal;
