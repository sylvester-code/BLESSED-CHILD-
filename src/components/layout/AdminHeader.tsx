'use client';

import React from 'react';
import { useSchool } from '@/context/SchoolContext';
import { LogOut } from 'lucide-react';

export const AdminHeader = () => {
  const { logoutAdmin, settings } = useSchool();

  return (
    <header className="bg-white border-b border-slate-200 h-14 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-sm font-semibold text-slate-800">
          {settings.schoolName} &mdash; Admin Console
        </h1>
      </div>

      <div className="flex items-center">
        <button
          onClick={logoutAdmin}
          title="Log Out"
          className="flex items-center space-x-1.5 text-xs font-medium text-slate-600 hover:text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};
