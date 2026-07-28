import React from 'react';
import { useTheme } from '../context/ThemeContext';
import AnimatedCounter from '../components/AnimatedCounter';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Clock,
  TrendingUp,
  FileSpreadsheet,
  Globe,
  Github,
  Star,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

export const InstructorPortalPage = () => {
  const {
    projects,
    grades,
    updateGrade,
    updateRemark,
    calculateAcademicResults
  } = useTheme();

  const results = calculateAcademicResults();

  const gradeOptions = ['Pending', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'];

  const quickRemarks = [
    'Excellent Work',
    'Outstanding UI',
    'Good Project Structure',
    'Clean Code',
    'Needs Better Responsiveness',
    'Improve Performance',
    'Improve Accessibility',
    'Well Organized',
    'Excellent Problem Solving'
  ];

  // Progress metrics
  const totalCount = projects.length;
  const completedCount = projects.filter((p) => p.status === 'Completed').length;
  const pendingCount = projects.filter((p) => p.status !== 'Completed').length;
  const liveCount = projects.filter((p) => p.live).length;
  const githubCount = projects.filter((p) => p.github).length;
  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            Instructor Evaluation & Grading Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review submitted student projects, assign letter grades, provide structural feedback remarks, and view automatic GPA calculations.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-bold self-start md:self-auto">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>Real-Time GPA Calculator Active</span>
        </div>
      </div>

      {/* Academic Result Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" /> Academic Performance Summary
          </h2>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30">
            Overall Grade: <strong className="text-amber-400 text-sm ml-1">{results.overallGrade}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          {/* Overall Grade Card */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-[11px] font-medium text-slate-300">Overall Grade</p>
            <p className="text-3xl font-black text-amber-400 mt-1">{results.overallGrade}</p>
          </div>

          {/* Projects Completed */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-[11px] font-medium text-slate-300">Projects Completed</p>
            <p className="text-xl font-bold text-white mt-2">
              {completedCount} / {results.totalProjects}
            </p>
          </div>

          {/* Projects Evaluated */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-[11px] font-medium text-slate-300">Projects Evaluated</p>
            <p className="text-xl font-bold text-emerald-400 mt-2">
              {results.gradedProjects} / {results.totalProjects}
            </p>
          </div>

          {/* Completion */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-[11px] font-medium text-slate-300">Completion</p>
            <p className="text-xl font-bold text-blue-400 mt-2">
              <AnimatedCounter value={results.completionPercentage} suffix="%" />
            </p>
          </div>

          {/* Highest Grade */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-[11px] font-medium text-slate-300">Highest Grade</p>
            <p className="text-2xl font-black text-emerald-400 mt-1">{results.highestGrade}</p>
          </div>

          {/* Lowest Grade */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-[11px] font-medium text-slate-300">Lowest Grade</p>
            <p className="text-2xl font-black text-rose-400 mt-1">{results.lowestGrade}</p>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Progress & Deployment Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: 'Completed Projects', count: completedCount, icon: CheckCircle2, color: 'bg-emerald-500' },
            { label: 'Pending Projects', count: pendingCount, icon: Clock, color: 'bg-amber-500' },
            { label: 'Live Projects', count: liveCount, icon: Globe, color: 'bg-blue-600' },
            { label: 'GitHub Repositories', count: githubCount, icon: Github, color: 'bg-slate-700' },
            { label: 'Featured Projects', count: featuredCount, icon: Star, color: 'bg-purple-500' },
          ].map((item) => {
            const pct = totalCount > 0 ? Math.round((item.count / totalCount) * 100) : 0;
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span>{item.label}</span>
                  <Icon className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {item.count} <span className="text-xs font-normal text-slate-400">/ {totalCount}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8 }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Instructor Project Grading Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Project Evaluation Roster
          </h2>
          <span className="text-xs text-slate-500">
            Assign grades and select quick remarks to save feedback locally.
          </span>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4 min-w-[120px]">Grade</th>
                <th className="py-3 px-4 min-w-[260px]">Remarks & Comments</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {projects.map((p) => {
                const item = grades[p.id] || { grade: 'Pending', remark: '', status: 'Pending' };

                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                    {/* Project Thumbnail & Name */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-12 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-xs line-clamp-1">
                            {p.title}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                            <span className="font-semibold text-blue-600 dark:text-blue-400">{p.category}</span>
                            <span>•</span>
                            <span>{p.difficulty}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Grade Selector Dropdown */}
                    <td className="py-4 px-4">
                      <select
                        value={item.grade || 'Pending'}
                        onChange={(e) => updateGrade(p.id, e.target.value)}
                        className={`w-full py-1.5 px-3 rounded-xl font-extrabold text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                          item.grade === 'A+' || item.grade === 'A'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : item.grade === 'F'
                            ? 'text-rose-600 dark:text-rose-400'
                            : 'text-blue-600 dark:text-blue-400'
                        }`}
                      >
                        {gradeOptions.map((g) => (
                          <option key={g} value={g}>
                            {g === 'Pending' ? 'Select Grade...' : g}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Remarks Textarea & Quick Tags */}
                    <td className="py-4 px-4 space-y-2">
                      <textarea
                        value={item.remark || ''}
                        onChange={(e) => updateRemark(p.id, e.target.value)}
                        placeholder="Write instructor remarks or click quick templates below..."
                        rows={2}
                        className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />

                      {/* Quick Remark Buttons */}
                      <div className="flex flex-wrap gap-1">
                        {quickRemarks.slice(0, 4).map((qr) => (
                          <button
                            key={qr}
                            onClick={() => {
                              const existing = item.remark ? `${item.remark} ${qr}.` : `${qr}.`;
                              updateRemark(p.id, existing);
                            }}
                            className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
                          >
                            + {qr}
                          </button>
                        ))}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4 text-right">
                      {item.grade && item.grade !== 'Pending' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3 h-3" /> Graded
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InstructorPortalPage;
