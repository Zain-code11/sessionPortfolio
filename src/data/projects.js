const projects = [
  {
    id: 1,
    number: "01",
    title: "🐍 Snake Game",
    subtitle: "Classic Arcade Reimagined",
    description: "A high-performance modern rendition of the iconic Nokia Snake Game. Built with smooth grid physics, instant collision detection, high-score local persistence, and fluid touch control overlays for mobile players.",
    technologies: ["React JS", "JavaScript ES6+", "Tailwind CSS", "HTML5 Canvas"],
    features: [
      "Smooth 60 FPS Canvas-based movement grid",
      "Dynamic speed scaling with food multipliers",
      "Persistent High-Score storage in LocalStorage",
      "Touch gesture swipe controls & responsive directional pad"
    ],
    image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=1200&q=80",
    live: "https://react-snake-game-demo.vercel.app",
    github: "https://github.com/zainhassan/react-snake-game",
    status: "Completed",
    completionDate: "Jan 2026",
    accent: "from-emerald-500 via-teal-400 to-cyan-500",
    glowColor: "rgba(16, 185, 129, 0.25)",
    tagline: "Retro Arcade • React State • Local Persistence"
  },
  {
    id: 2,
    number: "02",
    title: "🐉 Dragon Game",
    subtitle: "Endless Runner Platformer",
    description: "An exhilarating endless runner platformer inspired by Chrome Dino. Features dynamic jump mechanics, obstacle randomization, increasing velocity, hit-box collision physics, and custom sound effects.",
    technologies: ["React JS", "JavaScript ES6+", "Tailwind CSS", "Web Audio API"],
    features: [
      "Physics-based gravity jump and variable velocity",
      "Procedurally generated dragon obstacles & speed multiplier",
      "Real-time collision detection matrix",
      "Immersive score tracking with level progression"
    ],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    live: "https://dragon-runner-game.netlify.app",
    github: "https://github.com/zainhassan/dragon-runner-game",
    status: "Completed",
    completionDate: "Feb 2026",
    accent: "from-purple-500 via-fuchsia-500 to-indigo-500",
    glowColor: "rgba(168, 85, 247, 0.25)",
    tagline: "2D Game Engine • Physics Collision • Web Audio"
  },
  {
    id: 3,
    number: "03",
    title: "🧮 Scientific Calculator",
    subtitle: "Precision Engineering Utility",
    description: "An elegant, feature-rich scientific calculator engineered for mathematical precision. Computes complex trigonometric equations, logarithms, roots, powers, parentheses expressions, and maintains a tape calculation log.",
    technologies: ["JavaScript ES6+", "HTML5 Math", "CSS3 Grid", "Tailwind CSS"],
    features: [
      "Advanced trigonometric (Sin, Cos, Tan), Log, and Exp functions",
      "Live calculation tape history with tap-to-reuse memory",
      "Error handling for zero division and invalid syntax",
      "Full keyboard support with reactive keypress highlights"
    ],
    image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=1200&q=80",
    live: "https://scientific-calculator-app.netlify.app",
    github: "https://github.com/zainhassan/scientific-calculator",
    status: "Completed",
    completionDate: "Feb 2026",
    accent: "from-cyan-400 via-blue-500 to-indigo-600",
    glowColor: "rgba(6, 182, 212, 0.25)",
    tagline: "Mathematical Parser • Keyboard Bindings • History Memory"
  },
  {
    id: 4,
    number: "04",
    title: "⏰ Alarm Clock",
    subtitle: "Real-time Time Management Engine",
    description: "An interactive digital alarm clock and timer application featuring real-time time synchronization, customizable chime notifications, snooze controls, digital sound synthesis, and multiple simultaneous alarms.",
    technologies: ["JavaScript ES6+", "HTML5 Audio", "CSS Animations", "Tailwind CSS"],
    features: [
      "Millisecond precision digital clock display with 12/24hr format",
      "Multiple alarm queues with custom sound chiming & snooze logic",
      "Visual pulsing countdown timer and interactive analog face",
      "Browser notifications API support for active alarm alerts"
    ],
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=1200&q=80",
    live: "https://digital-alarm-clock-app.netlify.app",
    github: "https://github.com/zainhassan/alarm-clock-app",
    status: "Completed",
    completionDate: "Mar 2026",
    accent: "from-amber-400 via-orange-500 to-rose-500",
    glowColor: "rgba(245, 158, 11, 0.25)",
    tagline: "Web Audio Sync • Local Storage Alarms • Real-time Clock"
  }
];

export default projects;
