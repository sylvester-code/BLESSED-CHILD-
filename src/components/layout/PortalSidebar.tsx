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
  const { currentUser, settings } = useSchool();

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
    <aside className="w-64 bg-school-navy-950 text-slate-300 flex flex-col flex-shrink-0 border-r border-school-navy-900 select-none min-h-screen">
      {/* Brand Logo Header */}
      <div className="h-16 flex items-center px-4 border-b border-school-navy-900">
        <Link href="/" className="flex items-center space-x-2.5 group min-w-0">
          <SchoolLogo size="sm" />
          <div className="min-w-0">
            <span className="font-extrabold text-white text-sm tracking-tight block truncate max-w-[155px]" title={settings.schoolName}>
              {settings.schoolName}
            </span>
            <span className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase block">
              School Portal
            </span>
          </div>
        </Link>
      </div>

      {/* Role Badge Container */}
      <div className="px-4 py-3 bg-school-navy-900/60 border-b border-school-navy-900 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Active Workspace</p>
          <p className="text-xs font-bold text-amber-300">{currentUser.role.replace('_', ' ')}</p>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="System Online"></span>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {group.group}
            </p>
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-school-navy-900'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${active ? 'text-slate-950' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {active && <ChevronRight className="w-3.5 h-3.5 text-slate-950" />}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-school-navy-900 bg-school-navy-950 text-[11px] text-slate-400">
        <div className="flex items-center justify-between">
          <span>{settings.city}, Ghana</span>
          <Link href="/" className="hover:text-amber-400 flex items-center">
            <LogOut className="w-3.5 h-3.5 mr-1" /> Public Site
          </Link>
        </div>
      </div>
    </aside>
  );
};
