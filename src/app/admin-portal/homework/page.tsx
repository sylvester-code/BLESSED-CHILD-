'use client';

import React, { useState } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { HomeworkAssignment, LearningMaterial } from '@/types';
import {
  FileCheck,
  Plus,
  FolderOpen,
  Calendar,
  CheckCircle2,
  Download,
  BookOpen,
  X,
  FileText
} from 'lucide-react';

export default function HomeworkAdminPage() {
  const {
    homework,
    learningMaterials,
    classes,
    subjects,
    teachers,
    addHomework,
    addLearningMaterial,
    homeworkSubmissions,
    students
  } = useSchool();

  const [activeTab, setActiveTab] = useState<'homework' | 'materials'>('homework');
  const [hwModalOpen, setHwModalOpen] = useState(false);
  const [matModalOpen, setMatModalOpen] = useState(false);

  // Homework Form
  const [hwForm, setHwForm] = useState({
    title: '',
    subjectId: subjects[0]?.id || 'sub-math',
    classId: classes[12]?.id || classes[0]?.id || 'cls-jhs2',
    dueDate: '2025-03-15',
    instructions: '',
    totalMarks: 20,
    teacherId: teachers[0]?.id || 'tch-1'
  });

  // Material Form
  const [matForm, setMatForm] = useState({
    title: '',
    subjectId: subjects[0]?.id || 'sub-sci',
    classId: classes[12]?.id || classes[0]?.id || 'cls-jhs2',
    category: 'Lesson Notes' as LearningMaterial['category'],
    description: '',
    fileName: 'lesson_notes_week5.pdf',
    fileUrl: '/docs/sample.pdf',
    uploadedBy: 'ICT & Science Dept'
  });

  const handleCreateHw = (e: React.FormEvent) => {
    e.preventDefault();
    addHomework({
      title: hwForm.title,
      subjectId: hwForm.subjectId,
      classId: hwForm.classId,
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: hwForm.dueDate,
      instructions: hwForm.instructions,
      totalMarks: Number(hwForm.totalMarks),
      teacherId: hwForm.teacherId
    });
    setHwModalOpen(false);
  };

  const handleCreateMat = (e: React.FormEvent) => {
    e.preventDefault();
    addLearningMaterial(matForm);
    setMatModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md inline-flex mb-1">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Digital Curriculum Hub</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Homework Assignments & Learning Materials
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Post weekly homework tasks, track online student submissions, and upload lesson syllabus guides.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {activeTab === 'homework' ? (
            <button
              onClick={() => setHwModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-school-navy-900 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Create Assignment</span>
            </button>
          ) : (
            <button
              onClick={() => setMatModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-school-navy-900 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Upload Material</span>
            </button>
          )}
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex gap-2">
        <button
          onClick={() => setActiveTab('homework')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'homework'
              ? 'bg-school-navy-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Assignments & Homework ({homework.length})
        </button>
        <button
          onClick={() => setActiveTab('materials')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'materials'
              ? 'bg-school-navy-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Learning Resources Repository ({learningMaterials.length})
        </button>
      </div>

      {activeTab === 'homework' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {homework.map((hw) => {
            const cls = classes.find(c => c.id === hw.classId);
            const subj = subjects.find(s => s.id === hw.subjectId);
            const subs = homeworkSubmissions.filter(s => s.assignmentId === hw.id);

            return (
              <div key={hw.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-school-navy-900">{cls?.name} • {subj?.name}</span>
                    <span className="text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full font-bold">
                      Max: {hw.totalMarks} Marks
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">{hw.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {hw.instructions}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    Due: {hw.dueDate}
                  </span>
                  <span className="font-bold text-emerald-700">
                    {subs.length} Student Submission(s)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'materials' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {learningMaterials.map((lm) => {
            const cls = classes.find(c => c.id === lm.classId);
            const subj = subjects.find(s => s.id === lm.subjectId);

            return (
              <div key={lm.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-school-navy-900 bg-school-navy-50 px-2 py-0.5 rounded uppercase">
                    {lm.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">{lm.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{lm.description}</p>
                  <p className="text-[11px] text-amber-700 font-semibold">{cls?.name} • {subj?.name}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">By {lm.uploadedBy}</span>
                  <button
                    onClick={() => alert(`Downloading ${lm.fileName}...`)}
                    className="text-school-navy-900 font-bold hover:underline flex items-center"
                  >
                    <Download className="w-3.5 h-3.5 mr-1" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL: CREATE HOMEWORK */}
      {hwModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border space-y-4">
            <h3 className="font-bold text-base text-slate-900">Post Homework Assignment</h3>
            <form onSubmit={handleCreateHw} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assignment Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science Experiment Write-up"
                  value={hwForm.title}
                  onChange={(e) => setHwForm({ ...hwForm, title: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class</label>
                  <select
                    value={hwForm.classId}
                    onChange={(e) => setHwForm({ ...hwForm, classId: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  >
                    {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <select
                    value={hwForm.subjectId}
                    onChange={(e) => setHwForm({ ...hwForm, subjectId: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  >
                    {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    required
                    value={hwForm.dueDate}
                    onChange={(e) => setHwForm({ ...hwForm, dueDate: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Max Marks</label>
                  <input
                    type="number"
                    value={hwForm.totalMarks}
                    onChange={(e) => setHwForm({ ...hwForm, totalMarks: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Instructions</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Task instructions and submission guidelines..."
                  value={hwForm.instructions}
                  onChange={(e) => setHwForm({ ...hwForm, instructions: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setHwModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-school-navy-900 text-white rounded-xl"
                >
                  Post Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: UPLOAD MATERIAL */}
      {matModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border space-y-4">
            <h3 className="font-bold text-base text-slate-900">Upload Learning Resource</h3>
            <form onSubmit={handleCreateMat} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={matForm.title}
                  onChange={(e) => setMatForm({ ...matForm, title: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={matForm.category}
                    onChange={(e) => setMatForm({ ...matForm, category: e.target.value as any })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  >
                    <option value="Lesson Notes">Lesson Notes</option>
                    <option value="Past Questions & Answers">Past Questions & Answers</option>
                    <option value="Syllabus Guide">Syllabus Guide</option>
                    <option value="Worksheet">Worksheet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class</label>
                  <select
                    value={matForm.classId}
                    onChange={(e) => setMatForm({ ...matForm, classId: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  >
                    {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={matForm.description}
                  onChange={(e) => setMatForm({ ...matForm, description: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setMatModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-school-navy-900 text-white rounded-xl"
                >
                  Save Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
