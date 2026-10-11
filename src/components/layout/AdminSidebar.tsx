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
  Package,
  MessageSquare,
  Globe,
  Shield,
  History,
  Settings,
  BookCheck,
  LogOut,
  ChevronRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const AdminSidebar = () => {
  const pathname = usePathname();
  const { currentUser, settings, logoutAdmin } = useSchool();

  const navGroups = [
    {
      group: 'Control Center',
      items: [
        { label: 'Admin Dashboard', href: '/admin-portal', icon: LayoutDashboard },
        { label: 'Students (SIS)', href: '/admin-portal/students', icon: GraduationCap },
        { label: 'Teachers & Faculty', href: '/admin-portal/teachers', icon: Users },
        { label: 'School Prefects', href: '/admin-portal/prefects', icon: Award },
        { label: 'Parents & Guardians', href: '/admin-portal/parents', icon: Users },
      ]
    },
    {
      group: 'Academics & Evaluation',
      items: [
        { label: 'Classes & Subjects', href: '/admin-portal/academics', icon: BookOpen },
        { label: 'Assessment Engine (SBA)', href: '/admin-portal/assessments', icon: Award },
        { label: 'Terminal Report Cards', href: '/admin-portal/report-cards', icon: FileText },
        { label: 'Timetable Scheduler', href: '/admin-portal/timetable', icon: Calendar },
        { label: 'Daily Attendance', href: '/admin-portal/attendance', icon: CheckSquare },
      ]
    },
    {
      group: 'Finance & Admissions',
      items: [
        { label: 'Fees, Billing & Receipts', href: '/admin-portal/fees', icon: DollarSign },
        { label: 'Admissions Pipeline', href: '/admin-portal/admissions', icon: UserPlus },
      ]
    },
    {
      group: 'E-Learning & Resources',
      items: [
        { label: 'Online Quizzes (CBT)', href: '/admin-portal/quizzes', icon: HelpCircle },
        { label: 'Homework & Materials', href: '/admin-portal/homework', icon: FileCheck },
        { label: 'Library Catalog', href: '/admin-portal/library', icon: BookCheck },
        { label: 'Assets & Inventory', href: '/admin-portal/inventory', icon: Package },
      ]
    },
    {
      group: 'Administration & System',
      items: [
        { label: 'Broadcast Messaging', href: '/admin-portal/communication', icon: MessageSquare },
        { label: 'Website CMS Manager', href: '/admin-portal/cms', icon: Globe },
        { label: 'Roles & Permissions', href: '/admin-portal/roles', icon: Shield },
        { label: 'Audit Trail Logs', href: '/admin-portal/audit', icon: History },
        { label: 'System Settings', href: '/admin-portal/settings', icon: Settings },
      ]
    }
  ];

  const isActive = (href: string) => {
    if (href === '/admin-portal' && pathname === '/admin-portal') return true;
    if (href !== '/admin-portal' && pathname === href) return true;
    return false;
  };

  return (
    <aside className="w-full bg-gradient-to-b from-school-navy-950 via-[#0a1e45] to-school-navy-950 text-slate-300 flex flex-col flex-shrink-0 border-r border-white/10 select-none shadow-2xl">
      {/* Brand Header */}
      <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <Link href="/admin-portal" className="flex items-center space-x-3 group">
          <SchoolLogo size="sm" className="group-hover:scale-105 transition-transform shadow-md border border-amber-400/40" />
          <div className="min-w-0">
            <span className="block font-heading font-extrabold text-xs text-white tracking-tight leading-tight truncate" title={settings.schoolName}>
              {settings.schoolName}
            </span>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <span className="text-[10px] text-amber-400 font-extrabold tracking-wider uppercase">
                Admin Console
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation Group Items */}
      <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-4 custom-scrollbar">
        {navGroups.map((group) => (
          <div key={group.group}>
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400/80 mb-1.5">
              {group.group}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 group ${
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

      {/* User Footer Profile & Logout */}
      <div className="p-3 border-t border-white/10 bg-black/20 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-extrabold text-xs shadow-md">
              {currentUser.username ? currentUser.username[0].toUpperCase() : 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">
                {currentUser.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Headteacher'}
              </p>
              <p className="text-[10px] text-amber-300/80 truncate">Executive Access</p>
            </div>
          </div>
          <button
            onClick={logoutAdmin}
            title="Log out of console"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
