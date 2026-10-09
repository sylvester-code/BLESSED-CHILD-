'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSchool, calculateGrade } from '@/context/SchoolContext';
import {
  Users,
  GraduationCap,
  Award,
  CheckSquare,
  FileCheck,
  Calendar,
  BookOpen,
  Plus,
  CheckCircle2,
  X,
  Save,
  AlertCircle,
  LogOut,
  ChevronDown,
  Sparkles,
  BarChart2,
  Info
} from 'lucide-react';

export default function TeacherPortalPage() {
  const router = useRouter();
  const {
    activeTeacher,
    logoutTeacher,
    currentUser,
    teachers,
    classes,
    subjects,
    students,
    settings,
    assessmentScores,
    saveAssessmentScore,
    markAttendance
  } = useSchool();

  // Find currently authenticated teacher
  const teacher = activeTeacher || teachers.find(t => t.id === currentUser.linkedTeacherId) || teachers[0];

  // Strictly filter classes & subjects allocated to this teacher by Super Admin
  const allocatedClasses = classes.filter(c => teacher?.classesAssigned?.includes(c.id));
  const allocatedSubjects = subjects.filter(s => teacher?.subjectsTaught?.includes(s.id));

  // Selection state
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [selectedTerm, setSelectedTerm] = useState<'Term 1' | 'Term 2' | 'Term 3'>(
    (settings.currentTerm as 'Term 1' | 'Term 2' | 'Term 3') || 'Term 2'
  );

  // Initialize selected class & subject on mount
  useEffect(() => {
    if (allocatedClasses.length > 0 && !selectedClassId) {
      setSelectedClassId(allocatedClasses[0].id);
    }
  }, [allocatedClasses, selectedClassId]);

  useEffect(() => {
    if (allocatedSubjects.length > 0 && !selectedSubjectId) {
      setSelectedSubjectId(allocatedSubjects[0].id);
    }
  }, [allocatedSubjects, selectedSubjectId]);

  // Students in selected class
  const classStudents = students.filter(s => s.classId === selectedClassId);

  // Local state for mark entry per student: { [studentId]: { classwork, homework, project, classTest, examScore, remark } }
  const [markEntries, setMarkEntries] = useState<Record<string, {
    classwork: number;
    homework: number;
    project: number;
    classTest: number;
    examScore: number;
    remark: string;
  }>>({});

  // Sync existing scores into local state when class, subject or term changes
  useEffect(() => {
    if (!selectedClassId || !selectedSubjectId) return;

    const initialEntries: Record<string, any> = {};
    classStudents.forEach(st => {
      const existing = assessmentScores.find(
        sc => sc.studentId === st.id &&
              sc.subjectId === selectedSubjectId &&
              sc.classId === selectedClassId &&
              sc.term === selectedTerm
      );

      if (existing) {
        initialEntries[st.id] = {
          classwork: existing.classwork || 0,
          homework: existing.homework || 0,
          project: existing.project || 0,
          classTest: existing.classTest || 0,
          examScore: existing.examScore || 0,
          remark: existing.teacherRemark || 'Satisfactory'
        };
      } else {
        initialEntries[st.id] = {
          classwork: 12,
          homework: 8,
          project: 8,
          classTest: 12,
          examScore: 40,
          remark: 'Good work and steady progress'
        };
      }
    });
    setMarkEntries(initialEntries);
  }, [selectedClassId, selectedSubjectId, selectedTerm, assessmentScores, classStudents.length]);

  // Feedback states
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'entry' | 'summary'>('entry');

  // Handle single student input update
  const handleMarkChange = (studentId: string, field: string, value: any) => {
    setMarkEntries(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value
      }
    }));
  };

  // Submit mark for single student
  const handleSaveStudentMark = (studentId: string) => {
    const entry = markEntries[studentId];
    if (!entry) return;

    const student = students.find(s => s.id === studentId);

    saveAssessmentScore({
      studentId,
      classId: selectedClassId,
      subjectId: selectedSubjectId,
      term: selectedTerm,
      academicYear: settings.academicYear,
      classwork: Number(entry.classwork) || 0,
      homework: Number(entry.homework) || 0,
      project: Number(entry.project) || 0,
      classTest: Number(entry.classTest) || 0,
      examScore: Number(entry.examScore) || 0,
      teacherRemark: entry.remark
    });

    setSaveSuccessMessage(`Mark saved for ${student?.firstName} ${student?.lastName}!`);
    setTimeout(() => setSaveSuccessMessage(''), 3000);
  };

  // Submit marks for all students in class
  const handleSaveAllMarks = () => {
    if (classStudents.length === 0) return;

    classStudents.forEach(st => {
      const entry = markEntries[st.id];
      if (entry) {
        saveAssessmentScore({
          studentId: st.id,
          classId: selectedClassId,
          subjectId: selectedSubjectId,
          term: selectedTerm,
          academicYear: settings.academicYear,
          classwork: Number(entry.classwork) || 0,
          homework: Number(entry.homework) || 0,
          project: Number(entry.project) || 0,
          classTest: Number(entry.classTest) || 0,
          examScore: Number(entry.examScore) || 0,
          teacherRemark: entry.remark
        });
      }
    });

    const targetClass = classes.find(c => c.id === selectedClassId);
    const targetSubject = subjects.find(s => s.id === selectedSubjectId);
    setSaveSuccessMessage(`All marks successfully saved for ${targetClass?.name} - ${targetSubject?.name} (${selectedTerm})!`);
    setTimeout(() => setSaveSuccessMessage(''), 4000);
  };

  const handleTeacherLogout = () => {
    logoutTeacher();
    router.push('/portal');
  };

  const currentClassObj = classes.find(c => c.id === selectedClassId);
  const currentSubjectObj = subjects.find(s => s.id === selectedSubjectId);

  // Existing scores for summary tab
  const recordedScores = assessmentScores.filter(
    s => s.classId === selectedClassId && s.subjectId === selectedSubjectId && s.term === selectedTerm
  );

  const averageScore = recordedScores.length > 0
    ? Math.round(recordedScores.reduce((acc, curr) => acc + curr.totalScore, 0) / recordedScores.length)
    : 0;

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-school-navy-950 via-[#0a1e45] to-school-navy-900 rounded-3xl p-6 sm:p-8 text-white shadow-luxury-lg flex flex-col md:flex-row md:items-center justify-between gap-4 border border-amber-400/30 relative overflow-hidden bg-grid-subtle">
        <div className="relative z-10">
          <div className="flex items-center space-x-2.5 mb-2">
            <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest bg-amber-400/20 border border-amber-400/40 px-3 py-0.5 rounded-full shadow-xs">
              Teacher &amp; Faculty Portal
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-slate-300 text-xs font-bold">
              {settings.currentTerm} ({settings.academicYear})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight text-white">
            Welcome, {teacher ? teacher.fullName : 'Faculty Member'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {teacher
              ? `Staff ID: ${teacher.staffId} • Specialization: ${teacher.specialization}`
              : 'Classroom Instructor'}
          </p>
        </div>

        <div className="flex items-center space-x-3 relative z-10">
          <button
            onClick={handleTeacherLogout}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs border border-white/20 transition-all flex items-center space-x-1.5 shadow-sm hover-lift"
          >
            <LogOut className="w-4 h-4 text-amber-400" />
            <span>Teacher Logout</span>
          </button>
        </div>
      </div>

      {/* ALLOCATION CHECK BANNER */}
      {allocatedClasses.length === 0 ? (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No Classes Allocated to Your Account</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            The Super Administrator has not yet allocated any academic classes or subjects to your faculty profile.
            Please inform the Super Administrator to open <strong>Faculty Management</strong> in the Admin Portal and check your assigned classes.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* CONTROL BAR: Select Class, Subject, and Term */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center">
                  <Award className="w-4 h-4 mr-2 text-amber-500" />
                  Marks Submission &amp; Continuous Assessment (SBA)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Enter and submit continuous assessment marks for your assigned classes.
                </p>
              </div>

              {/* Tab Selector */}
              <div className="flex p-1 bg-slate-100 rounded-xl space-x-1 self-start lg:self-auto">
                <button
                  onClick={() => setActiveTab('entry')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'entry'
                      ? 'bg-white text-school-navy-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Marks Entry Sheet
                </button>
                <button
                  onClick={() => setActiveTab('summary')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'summary'
                      ? 'bg-white text-school-navy-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Submitted Scores Overview ({recordedScores.length})
                </button>
              </div>
            </div>

            {/* Selector Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center">
                  <GraduationCap className="w-3.5 h-3.5 mr-1 text-school-navy-900" />
                  Allocated Class:
                </label>
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-slate-50 font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {allocatedClasses.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} (Section {cls.section})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center">
                  <BookOpen className="w-3.5 h-3.5 mr-1 text-school-navy-900" />
                  Allocated Subject:
                </label>
                <select
                  value={selectedSubjectId}
                  onChange={(e) => setSelectedSubjectId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-slate-50 font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {allocatedSubjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name} ({sub.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-school-navy-900" />
                  Academic Term:
                </label>
                <select
                  value={selectedTerm}
                  onChange={(e) => setSelectedTerm(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-xl bg-slate-50 font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="Term 1">Term 1</option>
                  <option value="Term 2">Term 2</option>
                  <option value="Term 3">Term 3</option>
                </select>
              </div>
            </div>
          </div>

          {/* Success Banner */}
          {saveSuccessMessage && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-2.5 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{saveSuccessMessage}</span>
            </div>
          )}

          {/* TAB 1: MARKS ENTRY SHEET */}
          {activeTab === 'entry' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    {currentClassObj?.name} &bull; {currentSubjectObj?.name} ({selectedTerm})
                  </h3>
                  <p className="text-xs text-slate-500">
                    SBA Breakdown: Classwork (15) + Homework (10) + Project (10) + Class Test (15) = 50% | Exam = 50%
                  </p>
                </div>

                {classStudents.length > 0 && (
                  <button
                    onClick={handleSaveAllMarks}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-md transition-all flex items-center space-x-1.5 self-start sm:self-auto"
                  >
                    <Save className="w-4 h-4 text-slate-950" />
                    <span>Save All Class Marks</span>
                  </button>
                )}
              </div>

              {classStudents.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <GraduationCap className="w-12 h-12 text-slate-300 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-700">No Students Enrolled in {currentClassObj?.name}</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    There are currently no students registered in this class. When the Super Administrator admits students to {currentClassObj?.name}, they will automatically appear here for marks entry.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-3">Student Name</th>
                        <th className="py-3 px-2 text-center" title="Max 15">CW (15)</th>
                        <th className="py-3 px-2 text-center" title="Max 10">HW (10)</th>
                        <th className="py-3 px-2 text-center" title="Max 10">PRJ (10)</th>
                        <th className="py-3 px-2 text-center" title="Max 15">TEST (15)</th>
                        <th className="py-3 px-2 text-center bg-blue-50/70 text-blue-900 font-black">SBA (50)</th>
                        <th className="py-3 px-2 text-center" title="Max 50">EXAM (50)</th>
                        <th className="py-3 px-2 text-center bg-amber-50 text-amber-950 font-black">TOT (100)</th>
                        <th className="py-3 px-2 text-center">GRADE</th>
                        <th className="py-3 px-3 min-w-[150px]">REMARK</th>
                        <th className="py-3 px-2 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {classStudents.map((st) => {
                        const entry = markEntries[st.id] || {
                          classwork: 0,
                          homework: 0,
                          project: 0,
                          classTest: 0,
                          examScore: 0,
                          remark: 'Satisfactory'
                        };

                        const sbaTotal = Number(entry.classwork || 0) + Number(entry.homework || 0) + Number(entry.project || 0) + Number(entry.classTest || 0);
                        const totalScore = sbaTotal + Number(entry.examScore || 0);
                        const { grade, remark } = calculateGrade(totalScore, settings.gradingScale);

                        return (
                          <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                            {/* Student Info */}
                            <td className="py-3 px-3">
                              <div className="font-bold text-slate-900">{st.firstName} {st.lastName}</div>
                              <span className="font-mono text-[10px] text-slate-400">{st.admissionNo}</span>
                            </td>

                            {/* Classwork (15) */}
                            <td className="py-2 px-1 text-center">
                              <input
                                type="number"
                                min={0}
                                max={15}
                                value={entry.classwork}
                                onChange={(e) => handleMarkChange(st.id, 'classwork', Number(e.target.value))}
                                className="w-12 text-center py-1 border rounded-lg bg-slate-50 focus:bg-white font-mono font-semibold"
                              />
                            </td>

                            {/* Homework (10) */}
                            <td className="py-2 px-1 text-center">
                              <input
                                type="number"
                                min={0}
                                max={10}
                                value={entry.homework}
                                onChange={(e) => handleMarkChange(st.id, 'homework', Number(e.target.value))}
                                className="w-12 text-center py-1 border rounded-lg bg-slate-50 focus:bg-white font-mono font-semibold"
                              />
                            </td>

                            {/* Project (10) */}
                            <td className="py-2 px-1 text-center">
                              <input
                                type="number"
                                min={0}
                                max={10}
                                value={entry.project}
                                onChange={(e) => handleMarkChange(st.id, 'project', Number(e.target.value))}
                                className="w-12 text-center py-1 border rounded-lg bg-slate-50 focus:bg-white font-mono font-semibold"
                              />
                            </td>

                            {/* Class Test (15) */}
                            <td className="py-2 px-1 text-center">
                              <input
                                type="number"
                                min={0}
                                max={15}
                                value={entry.classTest}
                                onChange={(e) => handleMarkChange(st.id, 'classTest', Number(e.target.value))}
                                className="w-12 text-center py-1 border rounded-lg bg-slate-50 focus:bg-white font-mono font-semibold"
                              />
                            </td>

                            {/* Continuous Assessment Total (50) */}
                            <td className="py-2 px-2 text-center bg-blue-50/50 font-black text-blue-900 font-mono text-sm">
                              {sbaTotal}
                            </td>

                            {/* Exam Score (50) */}
                            <td className="py-2 px-1 text-center">
                              <input
                                type="number"
                                min={0}
                                max={50}
                                value={entry.examScore}
                                onChange={(e) => handleMarkChange(st.id, 'examScore', Number(e.target.value))}
                                className="w-12 text-center py-1 border rounded-lg bg-slate-50 focus:bg-white font-mono font-semibold"
                              />
                            </td>

                            {/* Total (100) */}
                            <td className="py-2 px-2 text-center bg-amber-50 font-black text-amber-950 font-mono text-sm">
                              {totalScore}
                            </td>

                            {/* Grade */}
                            <td className="py-2 px-2 text-center">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                                totalScore >= 70 ? 'bg-emerald-100 text-emerald-800' :
                                totalScore >= 50 ? 'bg-blue-100 text-blue-800' :
                                'bg-rose-100 text-rose-800'
                              }`}>
                                {grade} ({remark.slice(0, 4)})
                              </span>
                            </td>

                            {/* Remark */}
                            <td className="py-2 px-2">
                              <input
                                type="text"
                                value={entry.remark}
                                onChange={(e) => handleMarkChange(st.id, 'remark', e.target.value)}
                                className="w-full py-1 px-2 border rounded-lg text-xs"
                                placeholder="Teacher remark"
                              />
                            </td>

                            {/* Single Save Action */}
                            <td className="py-2 px-2 text-right">
                              <button
                                onClick={() => handleSaveStudentMark(st.id)}
                                title="Save this student's mark"
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 transition-colors"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SUBMITTED SCORES OVERVIEW */}
          {activeTab === 'summary' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-5">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    Submitted Terminal Marks Summary
                  </h3>
                  <p className="text-xs text-slate-500">
                    {currentClassObj?.name} &bull; {currentSubjectObj?.name} &bull; {selectedTerm}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-amber-100 text-amber-900 font-extrabold px-3 py-1 rounded-xl text-xs">
                    Class Average: {averageScore}%
                  </div>
                </div>
              </div>

              {recordedScores.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <BarChart2 className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="text-sm font-bold text-slate-700">No marks recorded yet for this selection.</p>
                  <p className="text-xs text-slate-500">
                    Switch to &ldquo;Marks Entry Sheet&rdquo; above to input marks and click &ldquo;Save All Class Marks&rdquo;.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 border-b font-bold uppercase text-[10px]">
                        <th className="py-2.5 px-3">Student Name</th>
                        <th className="py-2.5 px-2 text-center">Continuous SBA (50)</th>
                        <th className="py-2.5 px-2 text-center">Exam Score (50)</th>
                        <th className="py-2.5 px-2 text-center">Total (100)</th>
                        <th className="py-2.5 px-2 text-center">Grade</th>
                        <th className="py-2.5 px-3">Remark</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {recordedScores.map((sc) => {
                        const st = students.find(s => s.id === sc.studentId);
                        return (
                          <tr key={sc.id} className="hover:bg-slate-50">
                            <td className="py-2.5 px-3 font-semibold text-slate-900">
                              {st ? `${st.firstName} ${st.lastName}` : sc.studentId}
                            </td>
                            <td className="py-2.5 px-2 text-center font-mono font-bold text-blue-900">
                              {sc.continuousAssessmentTotal}%
                            </td>
                            <td className="py-2.5 px-2 text-center font-mono font-bold">
                              {sc.examScore}%
                            </td>
                            <td className="py-2.5 px-2 text-center font-mono font-black text-amber-950 bg-amber-50">
                              {sc.totalScore}%
                            </td>
                            <td className="py-2.5 px-2 text-center font-bold">
                              {sc.grade} ({sc.gradeRemark})
                            </td>
                            <td className="py-2.5 px-3 text-slate-600 italic text-[11px]">
                              {sc.teacherRemark || 'Satisfactory'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Quick Info Banner for Teachers */}
          <div className="bg-blue-50 border border-blue-200 rounded-3xl p-5 flex items-start space-x-3 text-xs text-blue-900">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Ghana NaCCA Continuous Assessment (SBA) Guidelines:</p>
              <p className="text-[11px] text-blue-800 mt-0.5">
                Continuous assessment scores consist of 15% Classwork, 10% Homework, 10% Project work, and 15% Class Test.
                The terminal examination accounts for 50%. The cumulative 100% total automatically computes into the official NaCCA 9-Point terminal grade scale.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
