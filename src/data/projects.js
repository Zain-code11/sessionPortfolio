import snakeImg from '../assets/images/snake_game_preview_1785239884119.jpg';
import dragonImg from '../assets/images/dragon_dash_preview_1785239904124.jpg';
import calcImg from '../assets/images/scientific_calc_preview_1785239868225.jpg';
import alarmImg from '../assets/images/chrono_alarm_preview_1785239850447.jpg';

const projects = [
  {
    id: 1,
    number: "01",
    title: "🐍 Snake Game",
    subtitle: "Nokia 3310 Arcade Edition",
    description: "A high-performance modern rendition of the iconic Nokia Snake Game revived with responsive portrait gameplay, multiple food tiers, customizable speed modes, and real-time score analytics.",
    technologies: ["React JS", "JavaScript ES6+", "Tailwind CSS", "HTML5 Canvas"],
    features: [
      "Smooth 60 FPS Canvas-based movement grid",
      "Dynamic speed scaling with food multipliers",
      "Persistent High-Score storage in LocalStorage",
      "Touch gesture swipe controls & responsive directional pad"
    ],
    image: snakeImg,
    live: "https://snake-game-chi-dusky.vercel.app/",
    github: "https://github.com/Zain-code11/snake_Game",
    status: "Completed",
    completionDate: "Jan 2026",
    accent: "from-emerald-500 via-teal-400 to-cyan-500",
    glowColor: "rgba(16, 185, 129, 0.25)",
    tagline: "Retro Arcade • React State • Local Persistence"
  },
  {
    id: 2,
    number: "02",
    title: "🐉 Dragon Dash Game",
    subtitle: "Endless Runner Platformer",
    description: "An exhilarating 100% offline-capable endless runner platformer featuring Emerald Dragon runner, Day/Night cycles, 5 power-ups (Shields, Coin Magnets, Slow Motion, Fire Breath), double jumps, and obstacle destruction.",
    technologies: ["React JS", "JavaScript ES6+", "Tailwind CSS", "Web Audio API"],
    features: [
      "Physics-based gravity jump and variable velocity",
      "Procedurally generated dragon obstacles & speed multiplier",
      "Real-time collision detection matrix & Day/Night transition",
      "Immersive score tracking with level progression & leaderboards"
    ],
    image: dragonImg,
    live: "https://dragon-game-puce.vercel.app/",
    github: "https://github.com/Zain-code11/Dragon_game",
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
    description: "An elegant, feature-rich scientific calculator engineered for mathematical precision with DEG/RAD modes, trigonometric functions, square roots, factorials, logarithms, and tape memory history.",
    technologies: ["React JS", "JavaScript ES6+", "CSS3 Grid", "Tailwind CSS"],
    features: [
      "Advanced trigonometric (Sin, Cos, Tan), Log, and Exp functions",
      "Live calculation tape history with tap-to-reuse memory",
      "Error handling for zero division and invalid syntax",
      "Full keyboard support with reactive keypress highlights"
    ],
    image: calcImg,
    live: "https://scientific-calculator-steel-psi.vercel.app/",
    github: "https://github.com/Zain-code11/scientific_Calculator",
    status: "Completed",
    completionDate: "Feb 2026",
    accent: "from-cyan-400 via-blue-500 to-indigo-600",
    glowColor: "rgba(6, 182, 212, 0.25)",
    tagline: "Mathematical Parser • Keyboard Bindings • History Memory"
  },
  {
    id: 4,
    number: "04",
    title: "⏰ Alarm Clock (ChronoAlarm)",
    subtitle: "Real-time Time Management Engine",
    description: "An interactive digital alarm clock and timer application featuring synchronized system time, digital/analog live clock, multiple active alarms with custom chimes, and set new alarm controls.",
    technologies: ["React JS", "JavaScript ES6+", "HTML5 Audio", "Tailwind CSS"],
    features: [
      "Millisecond precision digital clock display with 12/24hr format",
      "Multiple alarm queues with custom sound chiming & snooze logic",
      "Visual pulsing countdown timer and interactive analog face",
      "Browser notifications API support for active alarm alerts"
    ],
    image: alarmImg,
    live: "https://alaram-clock-neon.vercel.app/",
    github: "https://github.com/Zain-code11/alaram_Clock",
    status: "Completed",
    completionDate: "Mar 2026",
    accent: "from-amber-400 via-orange-500 to-rose-500",
    glowColor: "rgba(245, 158, 11, 0.25)",
    tagline: "Web Audio Sync • Local Storage Alarms • Real-time Clock"
  }
];

export default projects;
