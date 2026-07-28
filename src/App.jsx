import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Internship from './components/Internship';
import Roadmap from './components/Roadmap';
import ProjectsShowcase from './components/ProjectsShowcase';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

import InstructorDashboardPage from './pages/InstructorDashboardPage';

import ContactModal from './components/ContactModal';
import ResumeModal from './components/ResumeModal';
import InstructorReviewModal from './components/InstructorReviewModal';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'instructor'
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);

  // Theme state saved in localStorage (defaults to dark for award-winning feel)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Lenis Smooth Scroll Initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
      ScrollTrigger.refresh();
    });
  };

  if (currentView === 'instructor') {
    return (
      <div className={`min-h-screen min-h-[100dvh] w-full overflow-x-hidden transition-colors duration-300 font-sans selection:bg-cyan-500 selection:text-black ${
        theme === 'dark' ? 'bg-[#050816] text-white dark' : 'bg-[#f8fafc] text-slate-900 light'
      }`}>
        <CustomCursor theme={theme} />
        <InstructorDashboardPage
          onBack={() => setCurrentView('home')}
          theme={theme}
          toggleTheme={toggleTheme}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen min-h-[100dvh] w-full overflow-x-hidden transition-colors duration-300 font-sans selection:bg-cyan-500 selection:text-black ${
      theme === 'dark' ? 'bg-[#050816] text-white dark' : 'bg-[#f8fafc] text-slate-900 light'
    }`}>
      <CustomCursor theme={theme} />
      
      {/* Loading Screen */}
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Sticky Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenInstructor={() => setCurrentView('instructor')}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      <main>
        {/* Responsive Hero Section */}
        <Hero
          onOpenContact={() => setIsContactOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Internship Overview Section */}
        <Internship />

        {/* Skills & Tech Roadmap Timeline Section */}
        <Roadmap />

        {/* 4 Projects Showcase Section */}
        <ProjectsShowcase />

        {/* Call To Action */}
        <CallToAction
          onOpenContact={() => setIsContactOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <InstructorReviewModal
        isOpen={isInstructorModalOpen}
        onClose={() => setIsInstructorModalOpen(false)}
      />

    </div>
  );
}

export default App;
