import React, { useState, useEffect } from 'react';
import projects from '../data/projects';
import { Award, Star, CheckCircle, Save, RotateCcw, AlertCircle, BarChart3, Calculator, Edit3, ArrowLeft, Sun, Moon, FileText, ExternalLink } from 'lucide-react';

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

export const InstructorDashboardPage = ({ onBack, theme, toggleTheme, onOpenResume }) => {
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
    window.scrollTo(0, 0);
  }, []);

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

  let overallGrade = 'Pending Evaluation';
  if (totalGraded > 0) {
    if (avgGpa >= 3.8) overallGrade = 'A+ (Outstanding)';
    else if (avgGpa >= 3.5) overallGrade = 'A (Excellent)';
    else if (avgGpa >= 3.0) overallGrade = 'B+ (Very Good)';
    else if (avgGpa >= 2.5) overallGrade = 'B (Good)';
    else overallGrade = 'C / Needs Review';
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white selection:bg-cyan-500 selection:text-black">
      
      {/* Top Standalone Header */}
      <header className="sticky top-0 z-40 bg-[#050816]/90 backdrop-blur-xl border-b border-white/10 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold border border-white/15 transition-all shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>Back to Showcase Landing Page</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenResume}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-mono font-semibold border border-white/10 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4 text-slate-900" /> : <Sun className="w-4 h-4 text-amber-300" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Banner Section */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-white/15 backdrop-blur-2xl shadow-2xl relative overflow-hidden space-y-4">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono w-fit">
            <Award className="w-3.5 h-3.5" />
            <span>Official Evaluation Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Instructor Evaluation <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">Dashboard</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Welcome to Zain Hassan's Instructor Evaluation Portal. As an instructor at EnigmaticX Software House, you can evaluate each of the 4 React JS projects, select letter grades, enter custom review feedback, and compute an aggregate GPA record saved to LocalStorage.
          </p>
        </div>

        {/* Live Summary Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          
          <div className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Projects Evaluated</span>
            <p className="text-2xl sm:text-3xl font-black text-white">
              {totalGraded} <span className="text-xs text-slate-400 font-normal">/ {projects.length}</span>
            </p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div className="bg-cyan-400 h-full transition-all duration-500" style={{ width: `${completionPercentage}%` }} />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Average GPA</span>
            <p className="text-2xl sm:text-3xl font-black text-cyan-400">
              {avgGpa} <span className="text-xs text-slate-400 font-normal">/ 4.00</span>
            </p>
            <p className="text-[10px] font-mono text-emerald-400">Calculated Automatically</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Highest Grade</span>
            <p className="text-2xl sm:text-3xl font-black text-emerald-400">
              {highestGrade}
            </p>
            <p className="text-[10px] font-mono text-slate-400">Peak Rating</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Lowest Grade</span>
            <p className="text-2xl sm:text-3xl font-black text-amber-400">
              {lowestGrade}
            </p>
            <p className="text-[10px] font-mono text-slate-400">Floor Rating</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Overall Assessment</span>
            <p className="text-sm font-black text-amber-300 truncate mt-1">
              {overallGrade}
            </p>
            <p className="text-[10px] font-mono text-slate-400">Internship Record</p>
          </div>

        </div>

        {/* Instructor Name Input & Controls */}
        <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/15 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Award className="w-6 h-6 text-amber-400 shrink-0" />
            <div className="w-full">
              <label className="text-[11px] font-mono text-slate-400 uppercase block">Instructor Name</label>
              <input
                type="text"
                value={instructorName}
                onChange={(e) => setInstructorName(e.target.value)}
                placeholder="Enter Instructor Name (e.g., Sir Alex)"
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-amber-400 transition-colors w-full md:w-72"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono font-bold border border-white/10 transition-all flex items-center gap-1.5"
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
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Project Evaluation Cards ({projects.length})</span>
          </h2>

          {projects.map((proj) => {
            const currentEval = evaluations[proj.id] || { grade: '', remarks: '' };

            return (
              <div
                key={proj.id}
                className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                
                {/* Project Info */}
                <div className="lg:col-span-5 flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-slate-950">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400">Assignment {proj.number}</span>
                    <h3 className="text-lg font-black text-white">{proj.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{proj.subtitle}</p>
                  </div>
                </div>

                {/* Grade Selector */}
                <div className="lg:col-span-3">
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Select Letter Grade</label>
                  <select
                    value={currentEval.grade}
                    onChange={(e) => handleGradeChange(proj.id, e.target.value)}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-amber-300 focus:outline-none focus:border-amber-400"
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
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Instructor Remarks & Feedback</label>
                  <input
                    type="text"
                    value={currentEval.remarks}
                    onChange={(e) => handleRemarksChange(proj.id, e.target.value)}
                    placeholder="e.g. Excellent state handling & UI polish"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

              </div>
            );
          })}
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs font-mono text-slate-400">
        <p>EnigmaticX Software House Evaluation Board • Candidate: Zain Hassan</p>
      </footer>

    </div>
  );
};

export default InstructorDashboardPage;
