import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Award, Code2, Flame, TrendingUp } from 'lucide-react';
import { STUDENT_INFO } from '../data/projects';

export default function Stats({ theme }) {
  const statsList = [
    {
      id: 1,
      title: "Completed Projects",
      value: "4",
      subtext: "Assignments 01 to 04",
      icon: CheckCircle2,
      gradient: "from-blue-500 to-cyan-500",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    },
    {
      id: 2,
      title: "Internship Batch",
      value: "React Interns",
      subtext: "Frontend Development",
      icon: Award,
      gradient: "from-purple-500 to-indigo-500",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20"
    },
    {
      id: 3,
      title: "Technology",
      value: "React JS",
      subtext: "Vite + Tailwind CSS",
      icon: Code2,
      gradient: "from-cyan-500 to-teal-500",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
    },
    {
      id: 4,
      title: "Status",
      value: "Active Learning",
      subtext: "Building Real Apps",
      icon: Flame,
      gradient: "from-amber-500 to-orange-500",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
    }
  ];

  return (
    <section className="py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statsList.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`relative p-6 rounded-3xl border transition-all duration-300 overflow-hidden group ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-slate-800 shadow-xl shadow-black/20 hover:border-slate-700 hover:shadow-2xl'
                    : 'bg-white border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300'
                }`}
              >
                {/* Background Glow Accent */}
                <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-linear-to-br ${card.gradient} opacity-10 group-hover:opacity-20 blur-2xl transition-opacity pointer-events-none`} />

                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-linear-to-br ${card.gradient} text-white shadow-lg shadow-black/10`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full border ${card.badgeColor}`}>
                    Metric #{card.id}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {card.title}
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {card.value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium pt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                    <span>{card.subtext}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
