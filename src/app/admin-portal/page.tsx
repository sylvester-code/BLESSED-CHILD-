'use client';

import React from 'react';
import Link from 'next/link';
import { useSchool } from '@/context/SchoolContext';
import {
  GraduationCap,
  Users,
  Award,
  DollarSign,
  UserPlus,
  CheckSquare,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  FileText,
  Calendar,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  BookOpen,
  Package,
  Globe,
  Settings,
  HelpCircle,
  Activity,
  Layers
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    currentUser,
    settings,
    students,
    teachers,
    classes,
    feePayments,
    admissions,
    attendance,
    auditLogs
  } = useSchool();

  // Metrics calculation
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalClasses = classes.length;
  const pendingAdmissions = admissions.filter(a => a.status === 'Submitted' || a.status === 'Under Review').length;

  const totalFeesCollected = feePayments.reduce((acc, p) => acc + p.amountPaid, 0);
  const totalOutstandingArrears = students.reduce((acc, s) => acc + s.balance, 0);

  // Today attendance calculation
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(a => a.date === today);
  const presentCount = todayAttendance.filter(a => a.status === 'Present').length;
  const attendanceRate = todayAttendance.length > 0 ? Math.round((presentCount / todayAttendance.length) * 100) : 94;

  const metricCards = [
    {
      title: 'Total Enrolled Students',
      value: totalStudents,
      subtext: `${totalClasses} active class levels`,
      icon: GraduationCap,
      color: 'border-blue-100 hover:border-blue-300',
      iconBg: 'bg-blue-600 text-white shadow-blue-500/20',
      badge: 'Active SIS',
      link: '/admin-portal/students'
    },
    {
      title: 'Faculty & Certified Staff',
      value: totalTeachers,
      subtext: 'Academic & Non-Teaching',
      icon: Users,
      color: 'border-indigo-100 hover:border-indigo-300',
      iconBg: 'bg-indigo-600 text-white shadow-indigo-500/20',
      badge: 'Faculty',
      link: '/admin-portal/teachers'
    },
    {
      title: `Fee Collections (${settings.currentTerm})`,
      value: `${settings.currencySymbol} ${totalFeesCollected.toLocaleString()}`,
      subtext: `Arrears: ${settings.currencySymbol} ${totalOutstandingArrears.toLocaleString()}`,
      icon: DollarSign,
      color: 'border-emerald-100 hover:border-emerald-300',
      iconBg: 'bg-emerald-600 text-white shadow-emerald-500/20',
      badge: 'Finance',
      link: '/admin-portal/fees'
    },
    {
      title: 'Pending Admissions',
      value: pendingAdmissions,
      subtext: 'Applications under review',
      icon: UserPlus,
      color: 'border-amber-100 hover:border-amber-300',
      iconBg: 'bg-amber-600 text-white shadow-amber-500/20',
      badge: 'Admissions',
      link: '/admin-portal/admissions'
    },
    {
      title: "Today's Attendance Rate",
      value: `${attendanceRate}%`,
      subtext: 'Campus presence average',
      icon: CheckSquare,
      color: 'border-purple-100 hover:border-purple-300',
      iconBg: 'bg-purple-600 text-white shadow-purple-500/20',
      badge: 'Attendance',
      link: '/admin-portal/attendance'
    },
    {
      title: 'Current Academic Term',
      value: settings.currentTerm,
      subtext: `Year: ${settings.academicYear}`,
      icon: Calendar,
      color: 'border-slate-200 hover:border-slate-300',
      iconBg: 'bg-slate-800 text-white shadow-slate-700/20',
      badge: 'Academic',
      link: '/admin-portal/academics'
    }
  ];

  const quickModules = [
    { label: 'Register Student', desc: 'Add new enrolled student', href: '/admin-portal/students', icon: GraduationCap, color: 'text-blue-600 bg-blue-50' },
    { label: 'Record Fee Payment', desc: 'Issue receipt & update balance', href: '/admin-portal/fees', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Enter SBA Marks', desc: 'Continuous assessment grades', href: '/admin-portal/assessments', icon: Award, color: 'text-amber-600 bg-amber-50' },
    { label: 'Generate Reports', desc: 'Terminal academic cards', href: '/admin-portal/report-cards', icon: FileText, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Daily Attendance', desc: 'Mark class attendance', href: '/admin-portal/attendance', icon: CheckSquare, color: 'text-purple-600 bg-purple-50' },
    { label: 'Website CMS', desc: 'Public page announcements', href: '/admin-portal/cms', icon: Globe, color: 'text-rose-600 bg-rose-50' },
    { label: 'Review Applicants', desc: 'Enroll online applicants', href: '/admin-portal/admissions', icon: UserPlus, color: 'text-teal-600 bg-teal-50' },
    { label: 'System Settings', desc: 'Branding & preferences', href: '/admin-portal/settings', icon: Settings, color: 'text-slate-600 bg-slate-100' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Executive Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#07132e] via-[#0d2252] to-[#07132e] text-white p-6 sm:p-8 shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-300 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Super Administrator Command Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome, {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Administrative management system for <strong className="text-white">{settings.schoolName}</strong> ({settings.location}). You have complete real-time authority across academics, student records, finances, and system configurations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin-portal/admissions"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center space-x-2 hover:scale-[1.02]"
            >
              <UserPlus className="w-4 h-4" />
              <span>Review Admissions ({pendingAdmissions})</span>
            </Link>
            <Link
              href="/admin-portal/fees"
              className="px-4 py-2.5 rounded-xl bg-emerald-500/90 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center space-x-2 hover:scale-[1.02]"
            >
              <DollarSign className="w-4 h-4" />
              <span>Record Fee</span>
            </Link>
            <Link
              href="/admin-portal/assessments"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center space-x-2"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>SBA Engine</span>
            </Link>
          </div>
        </div>
      </div>

      {/* METRIC STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {metricCards.map((m, idx) => {
          const Icon = m.icon;
          return (
            <Link
              key={idx}
              href={m.link}
              className={`p-5 rounded-2xl border ${m.color} bg-white shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-between group`}
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-xs font-semibold text-slate-500">{m.title}</p>
                </div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-school-navy-900 transition-colors tracking-tight">
                  {m.value}
                </p>
                <p className="text-[11px] text-slate-400 font-medium truncate">{m.subtext}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl ${m.iconBg} flex items-center justify-center shadow-md flex-shrink-0 ml-3 transition-transform group-hover:scale-105`}>
                <Icon className="w-6 h-6" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* QUICK WORKFLOW SHORTCUTS */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Quick Management Modules</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Direct shortcuts to frequent administrative operations</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
          {quickModules.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="p-4 rounded-2xl bg-slate-50/70 hover:bg-slate-100/90 border border-slate-200/80 transition-all hover:-translate-y-0.5 hover:shadow-sm group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center shadow-xs transition-transform group-hover:scale-110`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-900 group-hover:text-school-navy-900">
                    {item.label}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-0.5 truncate">
                    {item.desc}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* TWO COLUMN GRID: AUDIT LOGS & ADMISSIONS QUEUE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Recent Audit Trail */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Real-Time Audit Trail</span>
                </h3>
                <p className="text-xs text-slate-500">Live operational log of administrative actions</p>
              </div>
              <Link
                href="/admin-portal/audit"
                className="text-xs font-bold text-school-navy-900 hover:text-amber-600 transition-colors flex items-center space-x-1"
              >
                <span>View Full Trail</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {auditLogs.length === 0 ? (
                <div className="p-6 text-center text-slate-400 text-xs">
                  No activity recorded yet. System ready for action.
                </div>
              ) : (
                auditLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-start justify-between">
                    <div className="space-y-0.5 min-w-0 pr-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-800">{log.userName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 font-semibold">
                          {log.module}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed truncate">{log.action}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap pl-2">
                      {log.timestamp ? log.timestamp.substring(11, 16) : 'Now'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>All mutations synced to live database</span>
            </span>
            <Link href="/admin-portal/audit" className="font-semibold text-slate-700 hover:underline">
              Inspect logs
            </Link>
          </div>
        </div>

        {/* Right Column: Pending Admissions & Enrollment Queue */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                  <UserPlus className="w-4 h-4 text-amber-500" />
                  <span>Admissions Pipeline</span>
                </h3>
                <p className="text-xs text-slate-500">Submitted online applications</p>
              </div>
              <Link
                href="/admin-portal/admissions"
                className="text-xs font-bold text-school-navy-900 hover:text-amber-600 transition-colors"
              >
                Manage All →
              </Link>
            </div>

            <div className="space-y-2.5">
              {admissions.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-xs font-semibold text-slate-600">No applicants in queue</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Online applications submitted by parents appear here</p>
                </div>
              ) : (
                admissions.slice(0, 4).map((app) => (
                  <div key={app.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">
                        {app.applicantFirstName} {app.applicantLastName}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Class: {classes.find(c => c.id === app.applyingForClass)?.name || app.applyingForClass}
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      app.status === 'Accepted' || app.status === 'Enrolled'
                        ? 'bg-emerald-100 text-emerald-800'
                        : app.status === 'Interview Scheduled'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <Link
              href="/admin-portal/admissions"
              className="w-full py-2.5 px-3 rounded-xl bg-school-navy-950 hover:bg-school-navy-900 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-sm"
            >
              <span>Manage Admissions &amp; Enrolment</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
