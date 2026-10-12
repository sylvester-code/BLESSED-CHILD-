'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSchool } from '@/context/SchoolContext';
import { SchoolLogo } from '@/components/common/SchoolLogo';
import { UserRole } from '@/types';
import {
  Bell,
  Search,
  LogOut,
  ChevronDown,
  Sparkles,
  Shield,
  User,
  GraduationCap,
  Home,
  Check
} from 'lucide-react';

export const PortalHeader = () => {
  const { currentUser, switchRole, settings, announcements, resetToDemo, logoutPortalUser } = useSchool();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const availableRoles: { role: UserRole; label: string; desc: string }[] = [
    { role: 'TEACHER', label: 'Teacher', desc: 'Attendance, SBA scores, marks entry' },
    { role: 'ACCOUNTANT', label: 'Accountant', desc: 'Fee collections, receipts & expenses' },
    { role: 'ADMISSIONS_OFFICER', label: 'Admissions Officer', desc: 'Review apps & student enrollment' },
    { role: 'LIBRARIAN', label: 'Librarian', desc: 'Books, borrow & returns' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs h-16 flex items-center justify-between px-4 sm:px-6">
      {/* Left: School Logo, Term indicator & Breadcrumb */}
      <div className="flex items-center space-x-3">
        <SchoolLogo size="sm" />
        <div className="flex items-center space-x-2 text-xs">
          <span className="font-extrabold text-school-navy-950 tracking-tight text-sm">
            {settings.schoolName}
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="hidden sm:inline-block bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full text-[11px]">
            {settings.currentTerm} ({settings.academicYear})
          </span>
        </div>
      </div>

      {/* Right: Actions, Demo Role Switcher & User Profile */}
      <div className="flex items-center space-x-3">
        
        {/* Quick Demo Reset / Info Button */}
        <button
          onClick={resetToDemo}
          title="Reset demo data"
          className="hidden md:inline-flex items-center text-[11px] font-semibold text-slate-500 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors"
        >
          Reset Demo Data
        </button>

        {/* Website Link */}
        <Link
          href="/"
          className="text-xs text-slate-600 hover:text-school-navy-900 flex items-center bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg font-medium transition-colors"
        >
          <Home className="w-3.5 h-3.5 mr-1" />
          <span className="hidden sm:inline">Public Site</span>
        </Link>

        {/* DEMO ROLE SWITCHER (SUPER HANDY FOR TESTERS!) */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-school-navy-900 to-school-navy-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs hover:from-school-navy-800 hover:to-school-navy-700 transition-all border border-amber-400/30"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Role:</span>
            <span className="text-amber-300">{currentUser.role.replace('_', ' ')}</span>
            <ChevronDown className="w-3.5 h-3.5 ml-0.5 text-slate-300" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 border-b border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Test Any Portal Instantly (1-Click)
                </p>
              </div>
              <div className="max-h-80 overflow-y-auto py-1">
                {availableRoles.map((item) => (
                  <button
                    key={item.role}
                    onClick={() => {
                      switchRole(item.role);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-start justify-between hover:bg-slate-50 transition-colors ${
                      currentUser.role === item.role ? 'bg-amber-50/70 font-semibold text-school-navy-950' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-1.5 font-bold">
                        <span>{item.label}</span>
                        {currentUser.role === item.role && (
                          <span className="text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded font-extrabold">Active</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 font-normal">{item.desc}</p>
                    </div>
                    {currentUser.role === item.role && (
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
            className="p-2 text-slate-600 hover:text-school-navy-900 rounded-lg hover:bg-slate-100 relative focus:outline-none"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
          </button>

          {notifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800">Notifications ({announcements.length})</span>
                <span className="text-[10px] text-school-navy-900 font-semibold cursor-pointer">Mark all read</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {announcements.map((a) => (
                  <div key={a.id} className="py-2.5 text-xs">
                    <p className="font-semibold text-slate-900 line-clamp-1">{a.title}</p>
                    <p className="text-slate-500 text-[11px] line-clamp-2 mt-0.5">{a.content}</p>
                    <span className="text-[10px] text-amber-600 font-medium mt-1 block">{a.datePosted}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Mini Profile */}
        <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
          <img
            src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-300"
          />
          <div className="hidden lg:block text-left text-xs leading-tight">
            <span className="font-bold text-slate-900 block truncate max-w-[120px]">{currentUser.name}</span>
            <span className="text-[10px] text-slate-500">{currentUser.role.replace('_', ' ')}</span>
          </div>
        </div>

        <button
          onClick={logoutPortalUser}
          title="Sign out of portal"
          className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition-colors ml-1"
        >
          <LogOut className="w-3.5 h-3.5 text-rose-500" />
          <span className="hidden sm:inline">Logout</span>
        </button>

      </div>
    </header>
  );
};
