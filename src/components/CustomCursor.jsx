import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CustomCursor = ({ theme }) => {
  const [isTouch, setIsTouch] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState({
    type: 'default', // 'default' | 'button' | 'project' | 'link' | 'image' | 'hero'
    label: '',
    isHovered: false,
  });
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [trail, setTrail] = useState([]);

  // Refs for requestAnimationFrame smooth lerp loop
  const targetPos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);
  const lastTrailTime = useRef(0);

  // Check if touch device on mount
  useEffect(() => {
    const touchCheck = () => {
      if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
        setIsTouch(true);
      }
    };
    touchCheck();
    window.addEventListener('resize', touchCheck);
    return () => window.removeEventListener('resize', touchCheck);
  }, []);

  // Set body class to hide default browser cursor on fine pointers
  useEffect(() => {
    if (isTouch) return;
    document.body.classList.add('custom-cursor-active');
    return () => {
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isTouch]);

  // Main Mouse Move & Event Listeners
  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });

      // Spawn trail particles over Hero section or during movement
      const now = performance.now();
      if (now - lastTrailTime.current > 30) {
        lastTrailTime.current = now;

        // Check if over Hero or anywhere smoothly
        const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
        const isHero = elementUnderCursor?.closest('#home, [data-hero]');

        setTrail((prev) => {
          const newParticle = {
            id: now + Math.random(),
            x: e.clientX,
            y: e.clientY,
            size: isHero ? 10 : 6,
            opacity: isHero ? 0.6 : 0.35,
          };
          // Keep maximum 10 trail points
          const updated = [newParticle, ...prev];
          return updated.slice(0, 10);
        });
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) return;

      // 1. Project Cards
      const projectCard = target.closest('[data-cursor="project"], .project-card, #projects .group');
      if (projectCard) {
        setCursorState({ type: 'project', label: 'View', isHovered: true });
        return;
      }

      // 2. Buttons & Submits
      const button = target.closest('button, [role="button"], .btn, input[type="submit"]');
      if (button) {
        setCursorState({ type: 'button', label: 'Click', isHovered: true });
        return;
      }

      // 3. Links
      const link = target.closest('a, [role="link"], [data-cursor="link"]');
      if (link) {
        setCursorState({ type: 'link', label: '', isHovered: true });
        return;
      }

      // 4. Images
      const img = target.closest('img, [data-cursor="image"]');
      if (img) {
        setCursorState({ type: 'image', label: 'Preview', isHovered: true });
        return;
      }

      // 5. Hero Section
      const hero = target.closest('#home, [data-hero]');
      if (hero) {
        setCursorState({ type: 'hero', label: '', isHovered: false });
        return;
      }

      // Default
      setCursorState({ type: 'default', label: '', isHovered: false });
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-3), newRipple]);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isTouch]);

  // RequestAnimationFrame lerp animation loop
  const [, setRenderTrigger] = useState(0);

  useEffect(() => {
    if (isTouch) return;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const updatePosition = () => {
      // Inner dot lerp (fast)
      dotPos.current.x = lerp(dotPos.current.x, targetPos.current.x, 0.35);
      dotPos.current.y = lerp(dotPos.current.y, targetPos.current.y, 0.35);

      // Outer ring lerp (smooth delay/lag)
      ringPos.current.x = lerp(ringPos.current.x, targetPos.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, targetPos.current.y, 0.12);

      // Trigger frame re-render for smooth 60fps
      setRenderTrigger((prev) => (prev + 1) % 1000);

      animFrameId.current = requestAnimationFrame(updatePosition);
    };

    animFrameId.current = requestAnimationFrame(updatePosition);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isTouch]);

  // Clean old ripples after animation
  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  // Decay trail opacity over time
  useEffect(() => {
    if (trail.length === 0) return;
    const interval = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.05, size: Math.max(0, p.size - 0.4) }))
          .filter((p) => p.opacity > 0.02)
      );
    }, 40);
    return () => clearInterval(interval);
  }, [trail.length]);

  // Magnetic Effect for Buttons & Cards
  useEffect(() => {
    if (isTouch) return;

    const handleMagneticMove = (e) => {
      const magneticElem = e.target.closest('[data-magnetic], button, .btn');
      if (magneticElem && magneticElem instanceof HTMLElement) {
        const rect = magneticElem.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Pull max 8px
        const pullX = Math.max(-8, Math.min(8, distanceX * 0.25));
        const pullY = Math.max(-8, Math.min(8, distanceY * 0.25));

        magneticElem.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
        magneticElem.style.transition = 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)';
      }
    };

    const handleMagneticLeave = (e) => {
      const magneticElem = e.target.closest('[data-magnetic], button, .btn');
      if (magneticElem && magneticElem instanceof HTMLElement) {
        magneticElem.style.transform = 'translate3d(0, 0, 0)';
        magneticElem.style.transition = 'transform 0.4s ease-out';
      }
    };

    window.addEventListener('mousemove', handleMagneticMove);
    window.addEventListener('mouseout', handleMagneticLeave);

    return () => {
      window.removeEventListener('mousemove', handleMagneticMove);
      window.removeEventListener('mouseout', handleMagneticLeave);
    };
  }, [isTouch]);

  if (isTouch) return null;

  // Derive styles based on cursorState & theme
  const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');

  // Ring dimension & shape configuration
  let ringSize = 36;
  let borderRadius = '9999px';
  let ringBorderClass = isDark
    ? 'border-cyan-400/60 bg-cyan-500/10 shadow-[0_0_20px_rgba(56,189,248,0.4)]'
    : 'border-blue-600/60 bg-blue-500/10 shadow-[0_0_15px_rgba(37,99,235,0.3)]';

  if (cursorState.type === 'button') {
    ringSize = 64;
    ringBorderClass = isDark
      ? 'border-cyan-300 bg-cyan-400/20 shadow-[0_0_25px_rgba(56,189,248,0.6)] animate-pulse'
      : 'border-blue-600 bg-blue-600/20 shadow-[0_0_20px_rgba(37,99,235,0.4)] animate-pulse';
  } else if (cursorState.type === 'project') {
    ringSize = 78;
    borderRadius = '16px'; // Rounded square for project cards
    ringBorderClass = isDark
      ? 'border-amber-400/80 bg-slate-900/80 backdrop-blur-md shadow-[0_0_30px_rgba(251,191,36,0.5)]'
      : 'border-amber-500/80 bg-white/90 backdrop-blur-md shadow-[0_0_25px_rgba(245,158,11,0.4)]';
  } else if (cursorState.type === 'link') {
    ringSize = 24;
    ringBorderClass = isDark
      ? 'border-purple-400 bg-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.7)]'
      : 'border-purple-600 bg-purple-600/20 shadow-[0_0_15px_rgba(147,51,234,0.5)]';
  } else if (cursorState.type === 'image') {
    ringSize = 72;
    ringBorderClass = isDark
      ? 'border-emerald-400/80 bg-emerald-500/15 shadow-[0_0_25px_rgba(52,211,153,0.5)]'
      : 'border-emerald-600/80 bg-emerald-600/15 shadow-[0_0_20px_rgba(52,211,153,0.4)]';
  }

  // Inner dot color based on theme
  const dotBgClass = isDark ? 'bg-white shadow-[0_0_10px_#ffffff]' : 'bg-slate-900 shadow-[0_0_8px_#0f172a]';

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden">
      
      {/* 1. Cursor Trail Particles */}
      {trail.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none transition-opacity duration-300"
          style={{
            transform: `translate3d(${p.x - p.size / 2}px, ${p.y - p.size / 2}px, 0)`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            backgroundColor: isDark ? 'rgba(56, 189, 248, 0.7)' : 'rgba(37, 99, 235, 0.6)',
            boxShadow: isDark ? '0 0 10px rgba(56, 189, 248, 0.8)' : '0 0 8px rgba(37, 99, 235, 0.5)',
          }}
        />
      ))}

      {/* 2. Click Ripples */}
      {ripples.map((rip) => (
        <motion.div
          key={rip.id}
          initial={{ scale: 0.2, opacity: 0.9 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="absolute rounded-full border border-cyan-400 pointer-events-none"
          style={{
            left: rip.x - 20,
            top: rip.y - 20,
            width: 40,
            height: 40,
            boxShadow: '0 0 15px rgba(56, 189, 248, 0.6)',
          }}
        />
      ))}

      {/* 3. Smooth Outer Lagging Ring */}
      <div
        className={`absolute pointer-events-none border backdrop-blur-[2px] transition-[width,height,border-radius,background-color,border-color,box-shadow] duration-300 ease-out flex items-center justify-center text-center font-mono text-[10px] font-black uppercase tracking-wider ${ringBorderClass}`}
        style={{
          transform: `translate3d(${ringPos.current.x - ringSize / 2}px, ${
            ringPos.current.y - ringSize / 2
          }px, 0) scale(${isClicking ? 0.85 : 1})`,
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          borderRadius: borderRadius,
        }}
      >
        {cursorState.label && (
          <span
            className={`animate-in fade-in zoom-in duration-200 ${
              isDark ? 'text-cyan-300' : 'text-slate-900 font-extrabold'
            }`}
          >
            {cursorState.label}
          </span>
        )}
      </div>

      {/* 4. Solid Center Dot */}
      <div
        className={`absolute w-2.5 h-2.5 rounded-full pointer-events-none transition-transform duration-100 ease-out ${dotBgClass}`}
        style={{
          transform: `translate3d(${dotPos.current.x - 5}px, ${dotPos.current.y - 5}px, 0) scale(${
            isClicking ? 0.6 : cursorState.isHovered ? 1.3 : 1
          })`,
        }}
      />

    </div>
  );
};

export default CustomCursor;
