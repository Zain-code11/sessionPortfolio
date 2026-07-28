import React, { useState, useEffect } from 'react';
import projects from '../data/projects';
import { Award, Star, CheckCircle, Save, RotateCcw, AlertCircle, BarChart3, Calculator, Edit3 } from 'lucide-react';

const GRADE_POINTS = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D': 1.0,
  'F': 0.0,
};

const GRADES_LIST = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'];

export const InstructorSection = () => {
  // Saved reviews state in LocalStorage
  const [evaluations, setEvaluations] = useState(() => {
    const saved = localStorage.getItem('instructor_evaluations');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      1: { grade: 'A+', remarks: 'Excellent performance and smooth canvas grid controls!' },
      2: { grade: 'A', remarks: 'Impressive physics collision detection and web audio integration.' },
      3: { grade: 'A', remarks: 'Clean mathematical parser and responsive keyboard bindings.' },
      4: { grade: 'A+', remarks: 'Great digital sound chiming and alarm time management.' },
    };
  });

  const [instructorName, setInstructorName] = useState(() => {
    return localStorage.getItem('instructor_name') || 'Sir __________';
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('instructor_evaluations', JSON.stringify(evaluations));
  }, [evaluations]);

  useEffect(() => {
    localStorage.setItem('instructor_name', instructorName);
  }, [instructorName]);

  const handleGradeChange = (projectId, grade) => {
    setEvaluations((prev) => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        grade,
      },
    }));
  };

  const handleRemarksChange = (projectId, remarks) => {
    setEvaluations((prev) => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        remarks,
      },
    }));
  };

  const handleSave = () => {
    localStorage.setItem('instructor_evaluations', JSON.stringify(evaluations));
    localStorage.setItem('instructor_name', instructorName);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all instructor grades and remarks?')) {
      const resetState = {
        1: { grade: '', remarks: '' },
        2: { grade: '', remarks: '' },
        3: { grade: '', remarks: '' },
        4: { grade: '', remarks: '' },
      };
      setEvaluations(resetState);
      localStorage.setItem('instructor_evaluations', JSON.stringify(resetState));
    }
  };

  // Compute Live Statistics
  const gradedList = Object.values(evaluations).filter((ev) => ev && ev.grade);
  const totalGraded = gradedList.length;
  const completionPercentage = Math.round((totalGraded / projects.length) * 100);

  let gpaSum = 0;
  let highestGrade = '-';
  let lowestGrade = '-';
  let highestPoints = -1;
  let lowestPoints = 99;

  gradedList.forEach((ev) => {
    const pts = GRADE_POINTS[ev.grade] ?? 0;
    gpaSum += pts;
    if (pts > highestPoints) {
      highestPoints = pts;
      highestGrade = ev.grade;
    }
    if (pts < lowestPoints) {
      lowestPoints = pts;
      lowestGrade = ev.grade;
    }
  });

  const avgGpa = totalGraded > 0 ? (gpaSum / totalGraded).toFixed(2) : '0.00';

  let overallGrade = 'Pending';
  if (totalGraded > 0) {
    if (avgGpa >= 3.8) overallGrade = 'A+ (Outstanding)';
    else if (avgGpa >= 3.5) overallGrade = 'A (Excellent)';
    else if (avgGpa >= 3.0) overallGrade = 'B+ (Very Good)';
    else if (avgGpa >= 2.5) overallGrade = 'B (Good)';
    else overallGrade = 'C / Needs Review';
  }

  return (
    <section id="instructor" className="relative py-20 sm:py-32 bg-[#050816] text-white selection:bg-cyan-500 selection:text-black border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-amber-500/10 via-purple-600/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>Instructor Portal & Grading Engine</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Instructor <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">Evaluation Dashboard</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Evaluation system for instructors to review Zain Hassan's 4 React JS internship projects, assign letter grades, provide feedback, and compute aggregate GPA results.
          </p>
        </div>

        {/* Live Summary Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          
          <div className="p-4 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-slate-300 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase">Projects Evaluated</span>
            <p className="text-2xl font-black text-white dark:text-white light:text-slate-900">
              {totalGraded} <span className="text-xs text-slate-400 font-normal">/ {projects.length}</span>
            </p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div className="bg-cyan-400 h-full transition-all duration-500" style={{ width: `${completionPercentage}%` }} />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-slate-300 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase">Average GPA</span>
            <p className="text-2xl font-black text-cyan-400 dark:text-cyan-400 light:text-blue-600">
              {avgGpa} <span className="text-xs text-slate-400 font-normal">/ 4.00</span>
            </p>
            <p className="text-[10px] font-mono text-emerald-400">Calculated Automatically</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-slate-300 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase">Highest Grade</span>
            <p className="text-2xl font-black text-emerald-400">
              {highestGrade}
            </p>
            <p className="text-[10px] font-mono text-slate-400">Peak Performance</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-slate-300 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase">Lowest Grade</span>
            <p className="text-2xl font-black text-amber-400">
              {lowestGrade}
            </p>
            <p className="text-[10px] font-mono text-slate-400">Floor Rating</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-slate-300 space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase">Overall Assessment</span>
            <p className="text-sm font-black text-amber-300 dark:text-amber-300 light:text-amber-700 truncate">
              {overallGrade}
            </p>
            <p className="text-[10px] font-mono text-slate-400">Internship Record</p>
          </div>

        </div>

        {/* Instructor Name Input & Controls */}
        <div className="p-6 rounded-3xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white backdrop-blur-xl border border-white/15 dark:border-white/15 light:border-slate-300 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Award className="w-6 h-6 text-amber-400 shrink-0" />
            <div className="w-full">
              <label className="text-[11px] font-mono text-slate-400 uppercase block">Instructor Name</label>
              <input
                type="text"
                value={instructorName}
                onChange={(e) => setInstructorName(e.target.value)}
                placeholder="Enter Instructor Name (e.g., Sir Alex)"
                className="bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-300 rounded-xl px-3 py-1.5 text-sm font-bold text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-amber-400 transition-colors w-full md:w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 text-xs font-mono font-bold border border-white/10 dark:border-white/10 light:border-slate-300 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Grades</span>
            </button>

            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:opacity-95 transition-all flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Evaluation</span>
            </button>
          </div>

        </div>

        {savedSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono text-center animate-in fade-in duration-300">
            ✓ Instructor evaluations & remarks saved successfully to LocalStorage!
          </div>
        )}

        {/* Evaluation Table / Cards */}
        <div className="space-y-4">
          {projects.map((proj) => {
            const currentEval = evaluations[proj.id] || { grade: '', remarks: '' };

            return (
              <div
                key={proj.id}
                className="p-5 sm:p-6 rounded-3xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-slate-300 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                
                {/* Project Info */}
                <div className="lg:col-span-5 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-950">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400">Assignment {proj.number}</span>
                    <h3 className="text-base font-black text-white dark:text-white light:text-slate-900">{proj.title}</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">{proj.subtitle}</p>
                  </div>
                </div>

                {/* Grade Selector */}
                <div className="lg:col-span-3">
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Select Grade</label>
                  <select
                    value={currentEval.grade}
                    onChange={(e) => handleGradeChange(proj.id, e.target.value)}
                    className="w-full bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-amber-300 dark:text-amber-300 light:text-amber-700 focus:outline-none focus:border-amber-400"
                  >
                    <option value="" className="bg-slate-900 text-slate-400">-- Select Letter Grade --</option>
                    {GRADES_LIST.map((g) => (
                      <option key={g} value={g} className="bg-slate-900 text-white">
                        Grade {g} ({GRADE_POINTS[g]} Points)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Instructor Remarks */}
                <div className="lg:col-span-4">
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Instructor Remarks</label>
                  <input
                    type="text"
                    value={currentEval.remarks}
                    onChange={(e) => handleRemarksChange(proj.id, e.target.value)}
                    placeholder="e.g. Excellent state handling & UI polish"
                    className="w-full bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-cyan-400"
                  />
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default InstructorSection;
