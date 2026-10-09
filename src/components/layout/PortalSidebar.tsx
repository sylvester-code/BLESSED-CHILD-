'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSchool } from '@/context/SchoolContext';
import { SchoolLogo } from '@/components/common/SchoolLogo';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Award,
  FileText,
  DollarSign,
  UserPlus,
  Calendar,
  CheckSquare,
  HelpCircle,
  FileCheck,
  ChevronRight,
  LogOut,
  FolderOpen
} from 'lucide-react';

export const PortalSidebar = () => {
  const pathname = usePathname();
  const { currentUser, settings, logoutTeacher } = useSchool();

  const getNavLinks = () => {
    switch (currentUser.role) {
      case 'TEACHER':
        return [
          { group: 'Teacher Workspace', items: [
            { label: 'Teacher Dashboard', href: '/portal/teacher', icon: LayoutDashboard },
            { label: 'Assigned Classes', href: '/portal/teacher', icon: GraduationCap },
            { label: 'Subject Syllabus', href: '/portal/teacher', icon: BookOpen },
            { label: 'Continuous Assessment (SBA)', href: '/portal/teacher', icon: Award },
          ]}
        ];

      case 'ACCOUNTANT':
        return [
          { group: 'Finance & Accounts', items: [
            { label: 'Accounts Dashboard', href: '/portal/accountant', icon: LayoutDashboard },
            { label: 'Fee Payments & Invoicing', href: '/portal/accountant', icon: DollarSign },
            { label: 'Expenditure Logs', href: '/portal/accountant', icon: FileText },
          ]}
        ];

      case 'ADMISSIONS_OFFICER':
        return [
          { group: 'Admissions Desk', items: [
            { label: 'Admissions Pipeline', href: '/portal/admissions-officer', icon: UserPlus },
            { label: 'Review Applicants', href: '/portal/admissions-officer', icon: GraduationCap },
          ]}
        ];

      default:
        return [
          { group: 'Portal Workspace', items: [
            { label: 'Portal Home', href: '/portal', icon: LayoutDashboard },
          ]}
        ];
    }
  };

  const navGroups = getNavLinks();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-school-navy-950 via-[#0a1e45] to-school-navy-950 text-slate-300 flex flex-col flex-shrink-0 border-r border-white/10 select-none min-h-screen shadow-2xl">
      {/* Brand Logo Header */}
      <div className="h-16 flex items-center px-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <Link href="/" className="flex items-center space-x-2.5 group min-w-0">
          <SchoolLogo size="sm" className="shadow-md border border-amber-400/40" />
          <div className="min-w-0">
            <span className="font-heading font-extrabold text-white text-xs tracking-tight block truncate max-w-[155px]" title={settings.schoolName}>
              {settings.schoolName}
            </span>
            <span className="text-[10px] text-amber-400 font-extrabold tracking-wider uppercase block mt-0.5">
              Staff Portal
            </span>
          </div>
        </Link>
      </div>

      {/* Role Badge Container */}
      <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
        <div>
          <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">Active Workspace</p>
          <p className="text-xs font-bold text-amber-300">{currentUser.role.replace('_', ' ')}</p>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm" title="System Online"></span>
      </div>

      {/* Navigation Group Items */}
      <div className="flex-1 overflow-y-auto py-4 px-2.5 space-y-4">
        {navGroups.map((group) => (
          <div key={group.group}>
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400/80 mb-2">
              {group.group}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                      active
                        ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30 font-bold shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                        active ? 'text-amber-400' : 'text-slate-400 group-hover:text-amber-300'
                      }`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-gold-glow flex-shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-3 border-t border-white/10 bg-black/20 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-extrabold text-xs shadow-xs">
              {currentUser.username ? currentUser.username[0].toUpperCase() : 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{currentUser.name || currentUser.username || 'Authorized Staff'}</p>
              <p className="text-[10px] text-amber-300/80 truncate">Verified Session</p>
            </div>
          </div>
          <button
            onClick={logoutTeacher}
            title="Log Out of Portal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
