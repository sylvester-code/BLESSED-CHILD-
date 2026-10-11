'use client';

import React from 'react';
import { useSchool } from '@/context/SchoolContext';
import { LogOut, Calendar, ShieldCheck } from 'lucide-react';

export const AdminHeader = () => {
  const { logoutAdmin, settings } = useSchool();

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 h-14 flex items-center justify-between px-6 sticky top-0 z-30 transition-all">
      {/* Left: Clean School Name */}
      <div className="flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
        <h1 className="text-sm font-bold text-slate-800 tracking-tight">
          {settings.schoolName}
        </h1>
      </div>

      {/* Right: Date Indicator & Minimal Logout */}
      <div className="flex items-center space-x-5">
        <div className="hidden md:flex items-center space-x-1.5 text-xs font-medium text-slate-400">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{formattedDate}</span>
        </div>

        <div className="h-4 w-px bg-slate-200 hidden md:block"></div>

        <button
          onClick={logoutAdmin}
          title="Sign Out of Console"
          className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};
