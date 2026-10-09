'use client';

import React, { useState } from 'react';
import { useSchool, calculateGrade } from '@/context/SchoolContext';
import { AssessmentScore } from '@/types';
import {
  Award,
  BookOpen,
  Calendar,
  Save,
  CheckCircle2,
  Sliders,
  Filter,
  Users,
  TrendingUp,
  Sparkles,
  Printer
} from 'lucide-react';

export default function AssessmentAdminPage() {
  const {
    settings,
    classes,
    subjects,
    students,
    assessmentScores,
    saveAssessmentScore,
    updateSettings
  } = useSchool();

  // Selection Matrix
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[12]?.id || classes[0]?.id || 'cls-jhs2'); // default to JHS 2
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[1]?.id || 'sub-math'); // Mathematics
  const [selectedTerm, setSelectedTerm] = useState<'Term 1' | 'Term 2' | 'Term 3'>(settings.currentTerm);

  // Grading Scale configuration state
  const [scaleConfigModalOpen, setScaleConfigModalOpen] = useState(false);
  const [tempScale, setTempScale] = useState<'NaCCA_9_POINT' | 'LETTER_GRADE_AF'>(settings.gradingScale);

  // Local scores state for active matrix
  const classStudents = students.filter(s => s.classId === selectedClassId);

  // Initial matrix scores
  const getStudentScore = (studentId: string) => {
    return assessmentScores.find(
      s => s.studentId === studentId &&
           s.subjectId === selectedSubjectId &&
           s.term === selectedTerm &&
           s.academicYear === settings.academicYear
    );
  };

  const [inputScores, setInputScores] = useState<{
    [studentId: string]: {
      classwork: number;
      homework: number;
      project: number;
      classTest: number;
      examScore: number;
      teacherRemark?: string;
    };
  }>({});

  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // Initialize or fetch current values
  const getScoreValue = (studentId: string, field: 'classwork' | 'homework' | 'project' | 'classTest' | 'examScore') => {
    if (inputScores[studentId] && inputScores[studentId][field] !== undefined) {
      return inputScores[studentId][field];
    }
    const saved = getStudentScore(studentId);
    if (saved) return saved[field];
    return 0;
  };

  const handleScoreChange = (
    studentId: string,
    field: 'classwork' | 'homework' | 'project' | 'classTest' | 'examScore',
    value: number
  ) => {
    setInputScores(prev => {
      const current = prev[studentId] || {
        classwork: getScoreValue(studentId, 'classwork'),
        homework: getScoreValue(studentId, 'homework'),
        project: getScoreValue(studentId, 'project'),
        classTest: getScoreValue(studentId, 'classTest'),
        examScore: getScoreValue(studentId, 'examScore'),
      };
      return {
        ...prev,
        [studentId]: {
          ...current,
          [field]: Number(value) || 0
        }
      };
    });
  };

  const handleSaveAll = () => {
    classStudents.forEach(student => {
      const cw = getScoreValue(student.id, 'classwork');
      const hw = getScoreValue(student.id, 'homework');
      const pr = getScoreValue(student.id, 'project');
      const ct = getScoreValue(student.id, 'classTest');
      const ex = getScoreValue(student.id, 'examScore');

      saveAssessmentScore({
        studentId: student.id,
        subjectId: selectedSubjectId,
        classId: selectedClassId,
        academicYear: settings.academicYear,
        term: selectedTerm,
        classwork: cw,
        homework: hw,
        project: pr,
        classTest: ct,
        examScore: ex,
        teacherRemark: `Good performance in ${subjects.find(s => s.id === selectedSubjectId)?.name || 'subject'}.`
      });
    });

    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 3000);
  };

  const currentClass = classes.find(c => c.id === selectedClassId);
  const currentSubject = subjects.find(s => s.id === selectedSubjectId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md inline-flex mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>School-Based Assessment (SBA) Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Continuous Assessment & Terminal Score Matrix
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configurable 50% Continuous Assessment (Classwork, Homework, Project, Class Tests) + 50% End of Term Examination.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setScaleConfigModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center space-x-1.5 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Configure Grading Scale</span>
          </button>

          <button
            onClick={handleSaveAll}
            className="px-4 py-2 rounded-xl bg-school-navy-900 hover:bg-school-navy-800 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-colors"
          >
            <Save className="w-4 h-4 text-amber-400" />
            <span>Commit & Calculate All Marks</span>
          </button>
        </div>
      </div>

      {saveSuccessNotice && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>
            <strong>Marks Saved & Recalculated!</strong> Student totals, percentages, stanine grades, positions, and teacher remarks have been updated across portals.
          </span>
        </div>
      )}

      {/* FILTER MATRIX SELECTOR */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Select Class Level</label>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold"
          >
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.level})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Select Subject</label>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold"
          >
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Term & Academic Year</label>
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value as any)}
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold"
          >
            <option value="Term 1">Term 1 ({settings.academicYear})</option>
            <option value="Term 2">Term 2 ({settings.academicYear}) - Current</option>
            <option value="Term 3">Term 3 ({settings.academicYear})</option>
          </select>
        </div>
      </div>

      {/* SCORE MATRIX TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xs text-school-navy-950">
              {currentClass?.name} • {currentSubject?.name} • {selectedTerm}
            </span>
            <span className="text-[11px] text-slate-500">
              ({classStudents.length} Students in Register)
            </span>
          </div>
          <div className="text-xs text-slate-500">
            Grading Scale: <strong className="text-slate-800">{settings.gradingScale === 'NaCCA_9_POINT' ? 'NaCCA 9-Point Scale' : 'A-F Letter Grades'}</strong>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-school-navy-950 text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-3">Student Name</th>
                <th className="py-3 px-2 text-center">Classwork (20)</th>
                <th className="py-3 px-2 text-center">Homework (10)</th>
                <th className="py-3 px-2 text-center">Project (10)</th>
                <th className="py-3 px-2 text-center">Test (10)</th>
                <th className="py-3 px-2 text-center bg-school-navy-900 text-amber-300">SBA Total (50)</th>
                <th className="py-3 px-2 text-center">Exam Score (50)</th>
                <th className="py-3 px-3 text-center bg-amber-500 text-slate-950 font-black">Overall (100)</th>
                <th className="py-3 px-2 text-center">Grade</th>
                <th className="py-3 px-3">Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classStudents.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-slate-400">
                    No students currently enrolled in this class. Admitting a student will populate this matrix automatically.
                  </td>
                </tr>
              ) : (
                classStudents.map((st) => {
                  const cw = getScoreValue(st.id, 'classwork');
                  const hw = getScoreValue(st.id, 'homework');
                  const pr = getScoreValue(st.id, 'project');
                  const ct = getScoreValue(st.id, 'classTest');
                  const ex = getScoreValue(st.id, 'examScore');

                  const sbaTotal = cw + hw + pr + ct;
                  const overall = sbaTotal + ex;
                  const { grade, remark } = calculateGrade(overall, settings.gradingScale);

                  return (
                    <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        {st.firstName} {st.lastName}
                        <span className="text-[10px] text-slate-400 block font-mono">{st.admissionNo}</span>
                      </td>

                      <td className="py-2 px-2 text-center">
                        <input
                          type="number"
                          min={0}
                          max={20}
                          value={cw}
                          onChange={(e) => handleScoreChange(st.id, 'classwork', Number(e.target.value))}
                          className="w-14 text-center px-1.5 py-1 border rounded font-semibold text-xs focus:ring-1 focus:ring-school-navy-900"
                        />
                      </td>

                      <td className="py-2 px-2 text-center">
                        <input
                          type="number"
                          min={0}
                          max={10}
                          value={hw}
                          onChange={(e) => handleScoreChange(st.id, 'homework', Number(e.target.value))}
                          className="w-14 text-center px-1.5 py-1 border rounded font-semibold text-xs focus:ring-1 focus:ring-school-navy-900"
                        />
                      </td>

                      <td className="py-2 px-2 text-center">
                        <input
                          type="number"
                          min={0}
                          max={10}
                          value={pr}
                          onChange={(e) => handleScoreChange(st.id, 'project', Number(e.target.value))}
                          className="w-14 text-center px-1.5 py-1 border rounded font-semibold text-xs focus:ring-1 focus:ring-school-navy-900"
                        />
                      </td>

                      <td className="py-2 px-2 text-center">
                        <input
                          type="number"
                          min={0}
                          max={10}
                          value={ct}
                          onChange={(e) => handleScoreChange(st.id, 'classTest', Number(e.target.value))}
                          className="w-14 text-center px-1.5 py-1 border rounded font-semibold text-xs focus:ring-1 focus:ring-school-navy-900"
                        />
                      </td>

                      <td className="py-2 px-2 text-center font-bold bg-amber-50/50 text-school-navy-950">
                        {sbaTotal}
                      </td>

                      <td className="py-2 px-2 text-center">
                        <input
                          type="number"
                          min={0}
                          max={50}
                          value={ex}
                          onChange={(e) => handleScoreChange(st.id, 'examScore', Number(e.target.value))}
                          className="w-16 text-center px-1.5 py-1 border rounded font-bold text-xs focus:ring-1 focus:ring-school-navy-900"
                        />
                      </td>

                      <td className="py-2 px-3 text-center font-black bg-amber-100/70 text-slate-950 text-sm">
                        {overall}%
                      </td>

                      <td className="py-2 px-2 text-center">
                        <span className={`px-2 py-0.5 rounded font-black text-xs ${
                          overall >= 80
                            ? 'bg-emerald-100 text-emerald-900'
                            : overall >= 60
                            ? 'bg-blue-100 text-blue-900'
                            : overall >= 50
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-rose-100 text-rose-900'
                        }`}>
                          {grade}
                        </span>
                      </td>

                      <td className="py-2 px-3 text-slate-700 font-medium">
                        {remark}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={handleSaveAll}
            className="px-6 py-2.5 rounded-xl bg-school-navy-900 hover:bg-school-navy-800 text-white font-bold text-xs flex items-center space-x-2 shadow-sm transition-colors"
          >
            <Save className="w-4 h-4 text-amber-400" />
            <span>Save All Scores for {currentSubject?.name}</span>
          </button>
        </div>
      </div>

      {/* CONFIG MODAL */}
      {scaleConfigModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-extrabold text-base text-slate-900">
              Configure School Grading Scale
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Super Admin can change how student marks are converted into terminal grades without hardcoding.
            </p>

            <div className="space-y-3">
              <label className="flex items-start space-x-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="scale"
                  checked={tempScale === 'NaCCA_9_POINT'}
                  onChange={() => setTempScale('NaCCA_9_POINT')}
                  className="mt-1"
                />
                <div>
                  <span className="font-bold text-xs text-slate-900 block">Ghana NaCCA 9-Point Stanine Scale</span>
                  <span className="text-[11px] text-slate-500">
                    Grade 1 (80-100% Highest Distinction) down to Grade 9 (Fail). Standard for BECE.
                  </span>
                </div>
              </label>

              <label className="flex items-start space-x-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="scale"
                  checked={tempScale === 'LETTER_GRADE_AF'}
                  onChange={() => setTempScale('LETTER_GRADE_AF')}
                  className="mt-1"
                />
                <div>
                  <span className="font-bold text-xs text-slate-900 block">Letter Grade Scale (A1 - F9)</span>
                  <span className="text-[11px] text-slate-500">
                    A1, B2, B3, C4, C5, C6, D7, E8, F9.
                  </span>
                </div>
              </label>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t">
              <button
                onClick={() => setScaleConfigModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateSettings({ gradingScale: tempScale });
                  setScaleConfigModalOpen(false);
                }}
                className="px-5 py-2 text-xs font-bold bg-school-navy-900 text-white rounded-xl hover:bg-school-navy-800"
              >
                Apply Grading Scale
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
