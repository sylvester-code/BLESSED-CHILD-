'use client';

import React, { useState } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { AdmissionApplication } from '@/types';
import confetti from 'canvas-confetti';
import {
  UserPlus,
  CheckCircle2,
  Clock,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ArrowRight,
  Filter,
  UserCheck,
  XCircle,
  HelpCircle,
  Trash2
} from 'lucide-react';

export default function AdmissionsAdminPage() {
  const {
    admissions,
    classes,
    updateAdmissionStatus,
    convertAdmissionToStudent,
    deleteAdmission
  } = useSchool();

  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeApp, setActiveApp] = useState<AdmissionApplication | null>(null);
  const [interviewModalOpen, setInterviewModalOpen] = useState(false);
  const [interviewDate, setInterviewDate] = useState('2025-03-10 10:00 AM');
  const [conversionSuccess, setConversionSuccess] = useState<string | null>(null);

  const filtered = selectedStatus === 'All'
    ? admissions
    : admissions.filter(a => a.status === selectedStatus);

  const handleEnrollStudent = (app: AdmissionApplication) => {
    try {
      const newStudent = convertAdmissionToStudent(app.id, app.applyingForClass);
      setConversionSuccess(`Applicant ${newStudent.firstName} ${newStudent.lastName} successfully enrolled as Student (${newStudent.admissionNo}) into class ${classes.find(c => c.id === newStudent.classId)?.name}!`);

      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      setTimeout(() => {
        setConversionSuccess(null);
      }, 5000);
    } catch (err: any) {
      alert(err.message || 'Error converting student');
    }
  };

  const handleScheduleInterview = () => {
    if (!activeApp) return;
    updateAdmissionStatus(activeApp.id, 'Interview Scheduled', interviewDate, `Placement assessment scheduled for ${interviewDate}`);
    setInterviewModalOpen(false);
    setActiveApp(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md inline-flex mb-1">
            <UserPlus className="w-3.5 h-3.5" />
            <span>Admissions Desk & Conversion Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Online Applications & Enrollment Pipeline
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage incoming online applications, schedule placement interviews, and convert accepted candidates directly into enrolled active students.
          </p>
        </div>
      </div>

      {conversionSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-400 text-emerald-900 text-xs flex items-center space-x-3 shadow-md animate-in fade-in">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
          <div className="flex-1">
            <strong className="block text-sm">Enrollment Complete!</strong>
            <span>{conversionSuccess}</span>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {['All', 'Submitted', 'Under Review', 'Interview Scheduled', 'Accepted', 'Enrolled'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedStatus === st
                  ? 'bg-school-navy-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st} ({st === 'All' ? admissions.length : admissions.filter(a => a.status === st).length})
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b">
              <tr>
                <th className="py-3 px-4">Applicant</th>
                <th className="py-3 px-4">Application Code</th>
                <th className="py-3 px-4">Target Class</th>
                <th className="py-3 px-4">Parent Details</th>
                <th className="py-3 px-4">Submitted Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Workflow Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    No applications currently match this status filter.
                  </td>
                </tr>
              ) : (
                filtered.map((app) => {
                  const targetClass = classes.find(c => c.id === app.applyingForClass);
                  return (
                    <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 block">
                          {app.applicantFirstName} {app.applicantLastName}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {app.gender} • DOB: {app.dob}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-mono font-bold text-school-navy-900">
                        {app.applicationNo}
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-800">
                          {targetClass?.name || app.applyingForClass}
                        </span>
                        {app.previousSchool && (
                          <span className="text-[10px] text-slate-400 block line-clamp-1">
                            Prev: {app.previousSchool}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-800 block">{app.parentName}</span>
                        <span className="text-[10px] text-slate-500">{app.parentPhone}</span>
                      </td>

                      <td className="py-3 px-4 text-slate-500">{app.submissionDate}</td>

                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          app.status === 'Enrolled'
                            ? 'bg-purple-100 text-purple-900 border border-purple-200'
                            : app.status === 'Accepted'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : app.status === 'Interview Scheduled'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}>
                          {app.status}
                        </span>
                        {app.interviewDate && (
                          <span className="block text-[10px] text-amber-700 font-medium mt-0.5">
                            Interview: {app.interviewDate}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          {app.status !== 'Enrolled' && (
                            <>
                              <button
                                onClick={() => {
                                  setActiveApp(app);
                                  setInterviewModalOpen(true);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs"
                              >
                                Schedule Interview
                              </button>

                              <button
                                onClick={() => handleEnrollStudent(app)}
                                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1 shadow-xs"
                              >
                                <UserCheck className="w-3.5 h-3.5" />
                                <span>Convert to Student</span>
                              </button>
                            </>
                          )}

                          {app.status === 'Enrolled' && (
                            <span className="text-xs text-purple-700 font-bold flex items-center">
                              <CheckCircle2 className="w-4 h-4 mr-1 text-purple-600" />
                              Active Student
                            </span>
                          )}

                          <button
                            onClick={() => {
                              if (confirm(`Delete application for ${app.applicantFirstName} ${app.applicantLastName} (${app.applicationNo})?`)) {
                                deleteAdmission(app.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete application"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: SCHEDULE INTERVIEW */}
      {interviewModalOpen && activeApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border space-y-4">
            <h3 className="font-extrabold text-base text-slate-900">
              Schedule Placement Interview: {activeApp.applicantFirstName} {activeApp.applicantLastName}
            </h3>
            <p className="text-xs text-slate-600">
              Target Class: <strong>{classes.find(c => c.id === activeApp.applyingForClass)?.name}</strong>
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Interview Date & Time</label>
              <input
                type="text"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                placeholder="e.g. Monday, 17th March 2025 at 10:00 AM"
                className="w-full text-xs px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setInterviewModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleInterview}
                className="px-4 py-2 text-xs font-bold bg-school-navy-900 text-white rounded-xl"
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
