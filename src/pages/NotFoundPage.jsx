import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle, LayoutDashboard } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="text-center max-w-md space-y-5 bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center font-bold">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div>
          <span className="text-4xl font-black text-slate-900 dark:text-white block">404</span>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Page Not Found
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            The page or route you are looking for does not exist in the Student Projects Showcase Portal.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/20 w-full"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
