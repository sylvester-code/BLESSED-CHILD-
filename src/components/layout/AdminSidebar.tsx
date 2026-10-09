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
  ExternalLink
} from 'lucide-react';

export const AdminSidebar = () => {
  const pathname = usePathname();
  const { currentUser, settings } = useSchool();

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
    <aside className="w-64 bg-school-navy-950 text-slate-300 flex flex-col flex-shrink-0 border-r border-school-navy-900 select-none min-h-screen">
      {/* Brand Header */}
      <div className="p-4 border-b border-school-navy-900 bg-school-navy-900/50">
        <Link href="/admin-portal" className="flex items-center space-x-3 group">
          <SchoolLogo size="sm" className="group-hover:scale-105" />
          <div className="min-w-0">
            <span className="block font-black text-sm text-white tracking-tight leading-tight truncate">
              {settings.schoolName}
            </span>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
              Super Admin Console
            </span>
          </div>
        </Link>
      </div>

      {/* User Badge */}
      <div className="px-4 py-3 bg-school-navy-900/30 border-b border-school-navy-900/60 flex items-center space-x-3">
        <img
          src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
          alt={currentUser.name}
          className="w-8 h-8 rounded-lg object-cover border border-amber-400/40"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
          <div className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] text-amber-300 font-mono uppercase tracking-wider">
              {currentUser.role.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links Scrollable */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin scrollbar-thumb-school-navy-800">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {group.group}
            </p>
            <div className="space-y-0.5 pt-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-school-navy-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-slate-950' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {active && <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info & Quick Link */}
      <div className="p-3 border-t border-school-navy-900 bg-school-navy-900/40 text-[11px] text-slate-400 space-y-2">
        <div className="flex items-center justify-between">
          <span>Academic Year:</span>
          <span className="text-amber-400 font-bold">{settings.academicYear}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Active Term:</span>
          <span className="text-white font-bold">{settings.currentTerm}</span>
        </div>
        <Link
          href="/"
          className="w-full mt-2 py-1.5 px-3 rounded-md bg-school-navy-800 hover:bg-school-navy-700 text-slate-200 text-center block text-xs font-semibold transition-colors flex items-center justify-center space-x-1"
        >
          <span>View Public Website</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </aside>
  );
};
