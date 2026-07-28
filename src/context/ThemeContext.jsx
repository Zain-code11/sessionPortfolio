import React, { createContext, useContext, useState, useEffect } from 'react';
import projectsData from '../data/projects.json';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Theme state stored in localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'light';
  });

  // Search & Filter state shared across pages
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Instructor grades and remarks stored in localStorage
  const [grades, setGrades] = useState(() => {
    const saved = localStorage.getItem('instructor-grades');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    // Default initial grades for demonstration
    const initial = {};
    projectsData.forEach((p, idx) => {
      initial[p.id] = {
        grade: idx < 8 ? (idx % 2 === 0 ? 'A+' : 'A') : (idx === 8 ? 'A-' : 'Pending'),
        remark: idx < 8 ? 'Outstanding UI structure, clean components & responsive design.' : '',
        status: idx < 9 ? 'Graded' : 'Pending'
      };
    });
    return initial;
  });

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('instructor-grades', JSON.stringify(grades));
  }, [grades]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const updateGrade = (projectId, newGrade) => {
    setGrades((prev) => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        grade: newGrade,
        status: newGrade === 'Pending' ? 'Pending' : 'Graded'
      }
    }));
  };

  const updateRemark = (projectId, newRemark) => {
    setGrades((prev) => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        remark: newRemark
      }
    }));
  };

  // Grade point mapping for overall result calculation
  const gradePoints = {
    'A+': 4.0,
    'A': 3.9,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D': 1.0,
    'F': 0.0
  };

  const calculateAcademicResults = () => {
    const totalProjects = projectsData.length;
    let gradedCount = 0;
    let pendingCount = 0;
    let totalScore = 0;
    let highestVal = -1;
    let highestGrade = 'N/A';
    let lowestVal = 99;
    let lowestGrade = 'N/A';

    projectsData.forEach((p) => {
      const item = grades[p.id];
      if (item && item.grade && item.grade !== 'Pending') {
        gradedCount++;
        const pts = gradePoints[item.grade] ?? 3.0;
        totalScore += pts;

        if (pts > highestVal) {
          highestVal = pts;
          highestGrade = item.grade;
        }
        if (pts < lowestVal) {
          lowestVal = pts;
          lowestGrade = item.grade;
        }
      } else {
        pendingCount++;
      }
    });

    const completionPercentage = totalProjects > 0 ? Math.round((gradedCount / totalProjects) * 100) : 0;
    
    // Convert average score back to letter grade
    let overallGrade = 'N/A';
    if (gradedCount > 0) {
      const avg = totalScore / gradedCount;
      if (avg >= 3.9) overallGrade = 'A+';
      else if (avg >= 3.8) overallGrade = 'A';
      else if (avg >= 3.5) overallGrade = 'A-';
      else if (avg >= 3.1) overallGrade = 'B+';
      else if (avg >= 2.8) overallGrade = 'B';
      else if (avg >= 2.5) overallGrade = 'B-';
      else if (avg >= 2.1) overallGrade = 'C+';
      else if (avg >= 1.8) overallGrade = 'C';
      else if (avg >= 1.0) overallGrade = 'D';
      else overallGrade = 'F';
    }

    return {
      totalProjects,
      gradedProjects: gradedCount,
      pendingEvaluation: pendingCount,
      highestGrade,
      lowestGrade,
      overallGrade,
      completionPercentage
    };
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        searchTerm,
        setSearchTerm,
        activeCategory,
        setActiveCategory,
        grades,
        updateGrade,
        updateRemark,
        calculateAcademicResults,
        projects: projectsData
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
