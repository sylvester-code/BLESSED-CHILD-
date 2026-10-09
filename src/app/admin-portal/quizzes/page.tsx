'use client';

import React, { useState } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { OnlineQuiz } from '@/types';
import {
  HelpCircle,
  Plus,
  Clock,
  Award,
  CheckCircle2,
  Calendar,
  X,
  Play,
  FileCheck
} from 'lucide-react';

export default function QuizzesAdminPage() {
  const { quizzes, classes, subjects, addQuiz, quizAttempts, students } = useSchool();
  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [form, setForm] = useState({
    title: '',
    subjectId: subjects[0]?.id || 'sub-sci',
    classId: classes[12]?.id || classes[0]?.id || 'cls-jhs2',
    durationMinutes: 20,
    totalMarks: 20,
    instructions: 'Answer all questions within the allocated time.',
    startDate: '2025-02-01',
    endDate: '2025-03-31',
    status: 'Active' as OnlineQuiz['status'],
    q1_text: 'What is the powerhouse of the human cell?',
    q1_opt1: 'Mitochondria',
    q1_opt2: 'Ribosome',
    q1_opt3: 'Nucleus',
    q1_opt4: 'Cytoplasm',
    q1_correct: 'Mitochondria',
    q2_text: 'True or False: Pure water has a neutral pH value of 7.',
    q2_correct: 'True'
  });

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    addQuiz({
      title: form.title,
      subjectId: form.subjectId,
      classId: form.classId,
      durationMinutes: Number(form.durationMinutes),
      totalMarks: Number(form.totalMarks),
      instructions: form.instructions,
      startDate: form.startDate,
      endDate: form.endDate,
      status: form.status,
      questions: [
        {
          id: `q-${Date.now()}-1`,
          questionText: form.q1_text,
          type: 'MCQ',
          options: [form.q1_opt1, form.q1_opt2, form.q1_opt3, form.q1_opt4],
          correctAnswer: form.q1_correct,
          points: 10
        },
        {
          id: `q-${Date.now()}-2`,
          questionText: form.q2_text,
          type: 'TrueFalse',
          options: ['True', 'False'],
          correctAnswer: form.q2_correct,
          points: 10
        }
      ]
    });

    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md inline-flex mb-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Online Assessment Hub (CBT)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Computer-Based Examinations & Quizzes
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create automated objective tests with time limits, auto-scoring, and immediate performance analytics.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-school-navy-900 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Create New Online Test</span>
        </button>
      </div>

      {/* Quizzes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((q) => {
          const cls = classes.find(c => c.id === q.classId);
          const subj = subjects.find(s => s.id === q.subjectId);
          const attempts = quizAttempts.filter(a => a.quizId === q.id);

          return (
            <div key={q.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                    {q.status}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    {q.durationMinutes} Minutes Duration
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base">{q.title}</h3>

                <div className="flex items-center space-x-2 text-xs text-slate-600">
                  <span className="font-semibold text-school-navy-900">{cls?.name}</span>
                  <span>•</span>
                  <span>{subj?.name}</span>
                  <span>•</span>
                  <span className="font-bold text-amber-700">{q.totalMarks} Total Marks</span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {q.instructions}
                </p>

                <div className="text-[11px] text-slate-400">
                  Available: {q.startDate} to {q.endDate} • {q.questions.length} Questions configured
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">
                  {attempts.length} Student Submission(s)
                </span>
                <span className="text-emerald-600 font-bold">
                  Auto-Marking Active
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-base text-slate-900">Create Online Examination / Quiz</h3>
            <form onSubmit={handleCreateQuiz} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assessment Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. JHS 2 Science: Digestive System"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class</label>
                  <select
                    value={form.classId}
                    onChange={(e) => setForm({ ...form, classId: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  >
                    {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <select
                    value={form.subjectId}
                    onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  >
                    {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={form.durationMinutes}
                    onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2 border rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total Marks</label>
                  <input
                    type="number"
                    value={form.totalMarks}
                    onChange={(e) => setForm({ ...form, totalMarks: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2 border rounded-lg font-bold"
                  />
                </div>
              </div>

              {/* Sample Question 1 */}
              <div className="p-3 rounded-xl bg-slate-50 border space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Question 1 (Multiple Choice)</span>
                <input
                  type="text"
                  placeholder="Question text"
                  value={form.q1_text}
                  onChange={(e) => setForm({ ...form, q1_text: e.target.value })}
                  className="w-full text-xs px-3 py-1.5 border rounded-lg"
                />
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <input type="text" value={form.q1_opt1} onChange={(e) => setForm({ ...form, q1_opt1: e.target.value })} className="px-2 py-1 border rounded" />
                  <input type="text" value={form.q1_opt2} onChange={(e) => setForm({ ...form, q1_opt2: e.target.value })} className="px-2 py-1 border rounded" />
                  <input type="text" value={form.q1_opt3} onChange={(e) => setForm({ ...form, q1_opt3: e.target.value })} className="px-2 py-1 border rounded" />
                  <input type="text" value={form.q1_opt4} onChange={(e) => setForm({ ...form, q1_opt4: e.target.value })} className="px-2 py-1 border rounded" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700">Correct Answer:</label>
                  <input
                    type="text"
                    value={form.q1_correct}
                    onChange={(e) => setForm({ ...form, q1_correct: e.target.value })}
                    className="w-full text-xs px-2 py-1 border rounded font-semibold text-emerald-700 mt-0.5"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-school-navy-900 text-white rounded-xl"
                >
                  Publish Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
