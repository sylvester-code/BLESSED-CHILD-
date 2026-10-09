'use client';

import React, { useState } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { SchoolLogo } from '@/components/common/SchoolLogo';
import {
  FileText,
  Printer,
  Download,
  Filter,
  GraduationCap,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function ReportCardsAdminPage() {
  const {
    settings,
    classes,
    students,
    subjects,
    assessmentScores,
    generateTerminalReport
  } = useSchool();

  const [selectedClassId, setSelectedClassId] = useState<string>(classes[12]?.id || classes[0]?.id || 'cls-jhs2');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [selectedTerm, setSelectedTerm] = useState<'Term 1' | 'Term 2' | 'Term 3'>(settings.currentTerm);

  const classStudents = students.filter(s => s.classId === selectedClassId);

  // Set default student when class changes
  const activeStudentId = selectedStudentId && classStudents.some(s => s.id === selectedStudentId)
    ? selectedStudentId
    : (classStudents[0]?.id || '');

  const activeStudent = students.find(s => s.id === activeStudentId);
  const activeClass = classes.find(c => c.id === selectedClassId);

  const report = activeStudentId ? generateTerminalReport(activeStudentId, selectedTerm) : null;

  // Student scores for this term
  const studentScores = activeStudentId
    ? assessmentScores.filter(s => s.studentId === activeStudentId && s.term === selectedTerm)
    : [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Controls (Hidden on Print) */}
      <div className="no-print bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md inline-flex mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Terminal Report Card Generator</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Official Terminal Academic Report Sheets
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Generates standardized Ghanaian terminal report cards ready for parent review or physical printing.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-school-navy-900 hover:bg-school-navy-800 text-white font-bold text-xs flex items-center space-x-2 shadow-md transition-colors"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Print Report Card (PDF)</span>
          </button>
        </div>
      </div>

      {/* Selectors Toolbar (Hidden on Print) */}
      <div className="no-print bg-white p-4 rounded-xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">1. Select Class</label>
          <select
            value={selectedClassId}
            onChange={(e) => {
              setSelectedClassId(e.target.value);
              setSelectedStudentId('');
            }}
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold"
          >
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.level})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">2. Select Pupil</label>
          <select
            value={activeStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold"
          >
            {classStudents.map(s => (
              <option key={s.id} value={s.id}>
                {s.firstName} {s.lastName} ({s.admissionNo})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">3. Academic Term</label>
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value as any)}
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold"
          >
            <option value="Term 1">Term 1 ({settings.academicYear})</option>
            <option value="Term 2">Term 2 ({settings.academicYear})</option>
            <option value="Term 3">Term 3 ({settings.academicYear})</option>
          </select>
        </div>
      </div>

      {/* REPORT CARD DISPLAY CONTAINER */}
      {!activeStudent ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-400">
          No student selected or available in this class.
        </div>
      ) : (
        <div className="report-card-container bg-white rounded-2xl border-2 border-school-navy-900 p-8 sm:p-12 shadow-xl space-y-6 max-w-4xl mx-auto">
          {/* REPORT CARD HEADER */}
          <div className="border-b-2 border-school-navy-900 pb-6 text-center space-y-2 relative">
            <div className="flex items-center justify-between">
              {/* Crest Logo */}
              <div className="flex-shrink-0">
                <SchoolLogo size="lg" />
              </div>

              {/* Central Title */}
              <div className="flex-1 px-4">
                <h2 className="text-2xl sm:text-3xl font-black text-school-navy-950 uppercase tracking-tight">
                  {settings.schoolName}
                </h2>
                <p className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                  &ldquo;{settings.schoolMotto}&rdquo;
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  {settings.address} • Tel: {settings.primaryPhone} • {settings.email}
                </p>
                <div className="inline-block mt-2 bg-school-navy-900 text-white font-extrabold text-xs px-4 py-1 rounded-full uppercase tracking-wider">
                  Terminal Academic Performance Report — {selectedTerm}, {settings.academicYear}
                </div>
              </div>

              {/* Student Photo */}
              <div className="w-20 h-24 rounded-lg overflow-hidden border-2 border-slate-300 flex-shrink-0">
                <img
                  src={activeStudent.photoUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80"}
                  alt={activeStudent.firstName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* STUDENT BIO INFO GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Pupil&apos;s Name</span>
              <span className="font-bold text-slate-900 text-sm">
                {activeStudent.firstName} {activeStudent.middleName ? `${activeStudent.middleName} ` : ''}{activeStudent.lastName}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Admission Number</span>
              <span className="font-mono font-bold text-school-navy-900">{activeStudent.admissionNo}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Class Level</span>
              <span className="font-bold text-slate-900">{activeClass?.name} (Section {activeStudent.section})</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Class Attendance</span>
              <span className="font-bold text-emerald-700">58 out of 60 days (96.7%)</span>
            </div>
          </div>

          {/* SUBJECT MARKS TABLE */}
          <div>
            <table className="w-full text-left text-xs border-collapse border border-slate-300">
              <thead className="bg-school-navy-950 text-white text-[10px] uppercase">
                <tr>
                  <th className="border border-slate-400 py-2.5 px-3">Subject</th>
                  <th className="border border-slate-400 py-2.5 px-2 text-center">Class SBA (50%)</th>
                  <th className="border border-slate-400 py-2.5 px-2 text-center">Exam Score (50%)</th>
                  <th className="border border-slate-400 py-2.5 px-2 text-center font-bold">Total (100%)</th>
                  <th className="border border-slate-400 py-2.5 px-2 text-center">Grade</th>
                  <th className="border border-slate-400 py-2.5 px-2 text-center">Position</th>
                  <th className="border border-slate-400 py-2.5 px-3">Subject Teacher Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {studentScores.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-slate-400 border border-slate-300">
                      No assessment marks entered yet for this term. (Enter marks in the Assessment Engine).
                    </td>
                  </tr>
                ) : (
                  studentScores.map((sc) => {
                    const subj = subjects.find(s => s.id === sc.subjectId);
                    return (
                      <tr key={sc.id} className="hover:bg-slate-50">
                        <td className="border border-slate-300 py-2 px-3 font-bold text-slate-900">
                          {subj?.name || sc.subjectId}
                        </td>
                        <td className="border border-slate-300 py-2 px-2 text-center">
                          {sc.continuousAssessmentTotal}
                        </td>
                        <td className="border border-slate-300 py-2 px-2 text-center">
                          {sc.examScore}
                        </td>
                        <td className="border border-slate-300 py-2 px-2 text-center font-black text-slate-950 bg-amber-50/50">
                          {sc.totalScore}%
                        </td>
                        <td className="border border-slate-300 py-2 px-2 text-center font-bold">
                          {sc.grade}
                        </td>
                        <td className="border border-slate-300 py-2 px-2 text-center text-slate-600 font-semibold">
                          {sc.positionInSubject ? `${sc.positionInSubject}st` : '1st'}
                        </td>
                        <td className="border border-slate-300 py-2 px-3 text-slate-700 italic text-[11px]">
                          {sc.teacherRemark || sc.gradeRemark}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* ACADEMIC SUMMARY & RANKINGS */}
          {report && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-amber-50/50 p-4 rounded-xl border border-amber-200 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] font-bold uppercase">Aggregate Total Score</span>
                <span className="font-black text-base text-slate-900">{report.totalScore} marks</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] font-bold uppercase">Terminal Average</span>
                <span className="font-black text-base text-school-navy-950">{report.averageScore}%</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] font-bold uppercase">Position in Class</span>
                <span className="font-black text-base text-emerald-700">
                  {report.overallPosition} out of {report.totalStudentsInClass} pupils
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] font-bold uppercase">Promotion Status</span>
                <span className="font-black text-base text-indigo-900">Recommended for Next Grade</span>
              </div>
            </div>
          )}

          {/* TEACHER & HEADMASTER REMARKS */}
          <div className="space-y-4 pt-2">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs">
              <span className="font-bold text-slate-900 block mb-1">Class Teacher&apos;s Remarks:</span>
              <p className="italic text-slate-700">
                &ldquo;{report?.classTeacherRemark || 'A satisfactory performance.'}&rdquo;
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs">
              <span className="font-bold text-slate-900 block mb-1">Headmaster&apos;s Remarks & Endorsement:</span>
              <p className="italic text-slate-700">
                &ldquo;{report?.headmasterRemark || 'Promising potential. Keep it up.'}&rdquo;
              </p>
            </div>
          </div>

          {/* DATES & OFFICIAL SIGNATURE SEAL */}
          <div className="pt-6 border-t-2 border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs items-end">
            <div>
              <p className="text-slate-500 text-[11px]">Next Term Resumes:</p>
              <p className="font-bold text-slate-900 text-xs">{report?.nextTermBegins}</p>
              <p className="text-[10px] text-slate-400 mt-1">Outstanding Bill: {settings.currencySymbol} {activeStudent.balance.toLocaleString()}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-school-navy-900 flex items-center justify-center mx-auto text-[10px] font-extrabold text-school-navy-950 uppercase rotate-12">
                Official School Seal
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="border-b border-slate-800 w-44 ml-auto pb-1 text-center font-serif italic text-sm text-school-navy-900">
                Samuel K. Arthur
              </div>
              <p className="font-bold text-slate-800 text-[11px]">{settings.headmasterName}</p>
              <p className="text-[10px] text-slate-400">Headmaster / Academic Director</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
