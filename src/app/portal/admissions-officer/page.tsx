'use client';

import React from 'react';
import Link from 'next/link';
import { useSchool } from '@/context/SchoolContext';
import { UserPlus, CheckCircle2, Clock, Calendar, ArrowRight, UserCheck } from 'lucide-react';

export default function AdmissionsOfficerPortalPage() {
  const { currentUser, settings, admissions, classes, convertAdmissionToStudent } = useSchool();

  const pending = admissions.filter(a => a.status === 'Submitted' || a.status === 'Under Review');
  const scheduled = admissions.filter(a => a.status === 'Interview Scheduled');
  const accepted = admissions.filter(a => a.status === 'Accepted');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-school-navy-950 via-school-navy-900 to-school-navy-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
            Admissions Desk
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {currentUser.name}
          </h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Admissions Officer • Managing Applicant Screening & Enrollment Conversion for {settings.schoolName}
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center space-x-1.5">
          <UserPlus className="w-4 h-4 text-amber-400" />
          <span>{admissions.length} Total Applications Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">New Applications Awaiting Review</p>
          <p className="text-2xl font-black text-amber-600 mt-1">{pending.length}</p>
          <span className="text-[11px] text-slate-400">Online submissions</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Placement Interviews Scheduled</p>
          <p className="text-2xl font-black text-blue-600 mt-1">{scheduled.length}</p>
          <span className="text-[11px] text-slate-400">Diagnostic evaluations</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Ready for Student Enrollment</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">{accepted.length}</p>
          <span className="text-[11px] text-slate-400">Accepted applicants</span>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="font-bold text-slate-900 text-sm">Incoming Admissions Applications</h3>
          <span className="text-xs text-slate-500">Live Intake Queue</span>
        </div>

        <div className="space-y-3">
          {admissions.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">
              No admissions applications in queue. Prospective parents can submit online applications via the public website.
            </p>
          ) : (
            admissions.map((app) => (
              <div key={app.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-sm">{app.applicantFirstName} {app.applicantLastName}</span>
                    <span className="font-mono text-school-navy-900 font-bold text-[11px]">({app.applicationNo})</span>
                  </div>
                  <p className="text-slate-500 mt-0.5">
                    Class: <strong>{classes.find(c => c.id === app.applyingForClass)?.name || app.applyingForClass}</strong> • Parent: {app.parentName} ({app.parentPhone})
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                    app.status === 'Accepted' || app.status === 'Enrolled'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {app.status}
                  </span>

                  {app.status !== 'Enrolled' && (
                    <button
                      onClick={() => {
                        convertAdmissionToStudent(app.id, app.applyingForClass);
                        alert(`Enrolled ${app.applicantFirstName} ${app.applicantLastName} as active student!`);
                      }}
                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1 shadow-xs"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Enroll as Student</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
