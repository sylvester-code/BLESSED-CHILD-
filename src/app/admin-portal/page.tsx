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
  ShieldAlert,
  ArrowUpRight,
  Sparkles
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

  // Metrics
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalClasses = classes.length;
  const pendingAdmissions = admissions.filter(a => a.status === 'Submitted' || a.status === 'Under Review').length;

  const totalFeesCollected = feePayments.reduce((acc, p) => acc + p.amountPaid, 0);
  const totalOutstandingArrears = students.reduce((acc, s) => acc + s.balance, 0);

  // Today attendance
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(a => a.date === today);
  const presentCount = todayAttendance.filter(a => a.status === 'Present').length;
  const attendanceRate = todayAttendance.length > 0 ? Math.round((presentCount / todayAttendance.length) * 100) : 94;

  const metricCards = [
    {
      title: 'Total Enrolled Students',
      value: totalStudents,
      subtext: `${classes.length} active class levels`,
      icon: GraduationCap,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      iconBg: 'bg-blue-600 text-white',
      link: '/admin-portal/students'
    },
    {
      title: 'Certified Faculty & Staff',
      value: totalTeachers,
      subtext: 'Academic & Non-Teaching',
      icon: Users,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      iconBg: 'bg-indigo-600 text-white',
      link: '/admin-portal/teachers'
    },
    {
      title: 'Fee Collections (Term 2)',
      value: `${settings.currencySymbol} ${totalFeesCollected.toLocaleString()}`,
      subtext: `Arrears: ${settings.currencySymbol} ${totalOutstandingArrears.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      iconBg: 'bg-emerald-600 text-white',
      link: '/admin-portal/fees'
    },
    {
      title: 'Pending Admissions',
      value: pendingAdmissions,
      subtext: 'Applications requiring review',
      icon: UserPlus,
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      iconBg: 'bg-amber-600 text-white',
      link: '/admin-portal/admissions'
    },
    {
      title: "Today's Attendance Rate",
      value: `${attendanceRate}%`,
      subtext: 'Average campus presence',
      icon: CheckSquare,
      color: 'bg-purple-50 text-purple-800 border-purple-200',
      iconBg: 'bg-purple-600 text-white',
      link: '/admin-portal/attendance'
    },
    {
      title: 'Current Term',
      value: settings.currentTerm,
      subtext: `Year: ${settings.academicYear}`,
      icon: Calendar,
      color: 'bg-slate-50 text-slate-800 border-slate-200',
      iconBg: 'bg-slate-700 text-white',
      link: '/admin-portal/academics'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-school-navy-950 via-school-navy-900 to-school-navy-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Super Admin Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Welcome, {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Platform status for {settings.schoolName} ({settings.location}). You have complete administrative control over academics, assessments, finances, admissions, and website CMS.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/admin-portal/admissions"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-colors flex items-center space-x-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Review Admissions ({pendingAdmissions})</span>
            </Link>
            <Link
              href="/admin-portal/assessments"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors flex items-center space-x-1.5"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>SBA Score Matrix</span>
            </Link>
          </div>
        </div>
      </div>

      {/* METRIC STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {metricCards.map((m, idx) => {
          const Icon = m.icon;
          return (
            <Link
              key={idx}
              href={m.link}
              className={`p-5 rounded-2xl border ${m.color} bg-white shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-between group`}
            >
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-500">{m.title}</p>
                <p className="text-2xl font-black text-slate-900 group-hover:text-school-navy-900 transition-colors">
                  {m.value}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">{m.subtext}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${m.iconBg} flex items-center justify-center shadow-sm flex-shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* QUICK WORKFLOW SHORTCUTS */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
          Quick Workflow Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            href="/admin-portal/students"
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-school-navy-50 border border-slate-200 text-center space-y-2 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-school-navy-900 text-amber-400 flex items-center justify-center mx-auto shadow-xs">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="block text-xs font-bold text-slate-800 group-hover:text-school-navy-900">Add Student</span>
          </Link>

          <Link
            href="/admin-portal/fees"
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-center space-y-2 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xs">
              <DollarSign className="w-4 h-4" />
            </div>
            <span className="block text-xs font-bold text-slate-800 group-hover:text-emerald-900">Record Fee</span>
          </Link>

          <Link
            href="/admin-portal/assessments"
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 text-center space-y-2 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-xs">
              <Award className="w-4 h-4" />
            </div>
            <span className="block text-xs font-bold text-slate-800 group-hover:text-amber-900">Enter SBA Marks</span>
          </Link>

          <Link
            href="/admin-portal/report-cards"
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 text-center space-y-2 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-xs">
              <FileText className="w-4 h-4" />
            </div>
            <span className="block text-xs font-bold text-slate-800 group-hover:text-indigo-900">Report Cards</span>
          </Link>

          <Link
            href="/admin-portal/attendance"
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200 text-center space-y-2 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center mx-auto shadow-xs">
              <CheckSquare className="w-4 h-4" />
            </div>
            <span className="block text-xs font-bold text-slate-800 group-hover:text-purple-900">Mark Register</span>
          </Link>

          <Link
            href="/admin-portal/cms"
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 text-center space-y-2 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center mx-auto shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="block text-xs font-bold text-slate-800 group-hover:text-rose-900">Manage CMS</span>
          </Link>
        </div>
      </div>

      {/* TWO COLUMN GRID: RECENT AUDIT LOGS & PENDING ADMISSIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Recent Audit Trail */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Recent Audit Activities</h3>
              <p className="text-xs text-slate-500">Live operational log of administrative actions</p>
            </div>
            <Link
              href="/admin-portal/audit"
              className="text-xs font-bold text-school-navy-900 hover:underline flex items-center"
            >
              <span>View Full Trail</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="space-y-3">
            {auditLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-start justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-800">{log.userName}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-school-navy-100 text-school-navy-800 font-semibold">
                      {log.module}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{log.action}</p>
                </div>
                <span className="text-[10px] text-slate-400 whitespace-nowrap pl-2">{log.timestamp.substring(11, 16)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Pending Admissions & Enrollment Queue */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Admissions Queue</h3>
                <p className="text-xs text-slate-500">Online applications submitted</p>
              </div>
              <Link
                href="/admin-portal/admissions"
                className="text-xs font-bold text-school-navy-900 hover:underline"
              >
                Manage All →
              </Link>
            </div>

            <div className="space-y-3">
              {admissions.slice(0, 4).map((app) => (
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
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <Link
              href="/admin-portal/admissions"
              className="w-full py-2 px-3 rounded-xl bg-school-navy-900 hover:bg-school-navy-800 text-white font-bold text-xs flex items-center justify-center space-x-1 transition-colors"
            >
              <span>1-Click Convert & Enroll Applicants</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
