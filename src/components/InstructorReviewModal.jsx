import React from 'react';
import { X, Award } from 'lucide-react';
import InstructorSection from './InstructorSection';

export const InstructorReviewModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#050816] p-6 sm:p-8 border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 text-slate-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <InstructorSection />

      </div>

    </div>
  );
};

export default InstructorReviewModal;
