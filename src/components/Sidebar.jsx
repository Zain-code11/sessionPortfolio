import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Star,
  BarChart3,
  GraduationCap,
  User,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'All Projects', path: '/projects', icon: FolderKanban },
    { name: 'Featured Projects', path: '/featured', icon: Star },
    { name: 'Statistics', path: '/statistics', icon: BarChart3 },
    { name: 'Instructor Portal', path: '/instructor-portal', icon: GraduationCap },
    { name: 'About', path: '/about', icon: User },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full py-6 px-4">
      {/* Menu Header */}
      <div className="px-3 mb-6">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Navigation
        </p>
      </div>

      {/* Nav Links */}
      <nav className="space-y-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Student Badge Card */}
      <div className="mt-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
            ZH
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Zain Hassan</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Frontend Developer</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> All Work Verified
          </span>
          <span className="bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded text-[10px] font-semibold">
            Ready
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-[calc(100vh-4rem)]">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileOpen(false)}
        >
          <div
            className="w-64 bg-white dark:bg-slate-900 h-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
