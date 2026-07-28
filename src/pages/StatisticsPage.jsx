import React from 'react';
import { useTheme } from '../context/ThemeContext';
import AnimatedCounter from '../components/AnimatedCounter';
import {
  BarChart3,
  FolderKanban,
  Globe,
  Github,
  Code2,
  Flame,
  Layers,
  Gamepad2,
  UserCheck,
  Zap,
  PieChart
} from 'lucide-react';
import { motion } from 'motion/react';

export const StatisticsPage = () => {
  const { projects } = useTheme();

  const total = projects.length;
  const countByCat = (cat) => projects.filter((p) => p.category === cat || p.technologies.includes(cat)).length;

  const statsList = [
    { label: 'Total Projects', value: total, icon: FolderKanban, color: 'bg-blue-500' },
    { label: 'React Projects', value: countByCat('React'), icon: Code2, color: 'bg-indigo-500' },
    { label: 'JavaScript Projects', value: countByCat('JavaScript'), icon: Zap, color: 'bg-amber-500' },
    { label: 'Firebase Projects', value: countByCat('Firebase'), icon: Flame, color: 'bg-orange-500' },
    { label: 'MERN Projects', value: countByCat('MERN'), icon: Layers, color: 'bg-emerald-500' },
    { label: 'REST API Projects', value: countByCat('REST API'), icon: PieChart, color: 'bg-cyan-500' },
    { label: 'Games', value: countByCat('Games'), icon: Gamepad2, color: 'bg-purple-500' },
    { label: 'Portfolio Projects', value: countByCat('Portfolio'), icon: UserCheck, color: 'bg-rose-500' },
    { label: 'Mini Projects', value: countByCat('Mini Projects'), icon: Code2, color: 'bg-teal-500' },
    { label: 'Live Projects', value: projects.filter((p) => p.live).length, icon: Globe, color: 'bg-emerald-600' },
    { label: 'GitHub Repositories', value: projects.filter((p) => p.github).length, icon: Github, color: 'bg-slate-700' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          Technical Project Statistics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Comprehensive breakdown of technologies, frameworks, and deployment status across all showcase applications.
        </p>
      </div>

      {/* Grid of Animated Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {statsList.map((st, i) => {
          const Icon = st.icon;
          return (
            <motion.div
              key={st.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {st.label}
                </span>
                <div className={`p-2 rounded-xl text-white ${st.color} shadow-sm`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="text-3xl font-black text-slate-900 dark:text-white">
                <AnimatedCounter value={st.value} />
              </div>

              {/* Relative Percentage Bar */}
              <div className="space-y-1">
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${st.color}`}
                    style={{ width: `${Math.min(100, Math.round((st.value / Math.max(1, total)) * 100))}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 block text-right">
                  {total > 0 ? Math.round((st.value / total) * 100) : 0}% of total
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Distribution Bars */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Technology Distribution
        </h2>

        <div className="space-y-4">
          {[
            { cat: 'React', color: 'bg-blue-600' },
            { cat: 'JavaScript', color: 'bg-amber-500' },
            { cat: 'Tailwind CSS', color: 'bg-cyan-500' },
            { cat: 'Firebase', color: 'bg-orange-500' },
            { cat: 'REST API', color: 'bg-indigo-500' },
            { cat: 'MERN', color: 'bg-emerald-500' },
            { cat: 'Games', color: 'bg-purple-500' },
            { cat: 'Portfolio', color: 'bg-rose-500' },
            { cat: 'Mini Projects', color: 'bg-teal-500' },
          ].map((item) => {
            const count = countByCat(item.cat);
            const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div key={item.cat} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">{item.cat}</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {count} Projects ({percentage}%)
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
