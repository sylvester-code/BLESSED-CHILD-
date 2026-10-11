'use client';

import React, { useState } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { SchoolClass, Subject } from '@/types';
import {
  BookOpen,
  Plus,
  Trash2,
  Edit,
  GraduationCap,
  Layers,
  Calendar,
  X,
  CheckCircle2
} from 'lucide-react';

export default function AcademicsAdminPage() {
  const {
    classes,
    subjects,
    settings,
    addClass,
    updateClass,
    deleteClass,
    addSubject,
    updateSubject,
    deleteSubject
  } = useSchool();

  const [activeTab, setActiveTab] = useState<'classes' | 'subjects' | 'terms'>('classes');

  // Class Modal
  const [classModalOpen, setClassModalOpen] = useState(false);
  const [classForm, setClassForm] = useState({
    name: '',
    code: '',
    level: 'Primary' as SchoolClass['level'],
    capacity: 35,
    section: 'A',
    termTuitionFee: 1300
  });

  // Subject Modal
  const [subjectModalOpen, setSubjectModalOpen] = useState(false);
  const [subjectForm, setSubjectForm] = useState({
    name: '',
    code: '',
    department: 'Sciences' as Subject['department'],
    applicableLevels: ['Primary', 'JHS'] as any[]
  });

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    addClass({
      name: classForm.name,
      code: classForm.code,
      level: classForm.level,
      capacity: Number(classForm.capacity),
      section: classForm.section,
      termTuitionFee: Number(classForm.termTuitionFee)
    });
    setClassModalOpen(false);
    setClassForm({
      name: '',
      code: '',
      level: 'Primary',
      capacity: 35,
      section: 'A',
      termTuitionFee: 1300
    });
  };

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    addSubject({
      name: subjectForm.name,
      code: subjectForm.code,
      department: subjectForm.department,
      applicableLevels: subjectForm.applicableLevels
    });
    setSubjectModalOpen(false);
    setSubjectForm({
      name: '',
      code: '',
      department: 'Sciences',
      applicableLevels: ['Primary', 'JHS']
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md inline-flex mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Curriculum Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Classes, Sections & Subjects Architecture
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure school levels, add or rename classes, manage Ghana NaCCA subjects and academic calendars.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {activeTab === 'classes' ? (
            <button
              onClick={() => setClassModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-school-navy-900 text-white font-bold text-xs flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Add Academic Class</span>
            </button>
          ) : (
            <button
              onClick={() => setSubjectModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-school-navy-900 text-white font-bold text-xs flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Add Curriculum Subject</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex gap-2">
        <button
          onClick={() => setActiveTab('classes')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'classes'
              ? 'bg-school-navy-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Classes & Sections ({classes.length})
        </button>
        <button
          onClick={() => setActiveTab('subjects')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'subjects'
              ? 'bg-school-navy-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Curriculum Subjects ({subjects.length})
        </button>
        <button
          onClick={() => setActiveTab('terms')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'terms'
              ? 'bg-school-navy-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Academic Terms & Sessions
        </button>
      </div>

      {/* CLASSES TAB */}
      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((cls) => (
            <div key={cls.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-school-navy-100 text-school-navy-900 font-mono">
                  {cls.code}
                </span>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  {cls.level}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base">{cls.name}</h3>
                <p className="text-xs text-slate-500">Section: {cls.section} • Capacity: {cls.capacity} pupils</p>
                {cls.roomNumber && <p className="text-[11px] text-slate-400">Classroom: {cls.roomNumber}</p>}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500">Term Tuition: </span>
                  <span className="font-black text-slate-900">{settings.currencySymbol} {cls.termTuitionFee.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to permanently delete class '${cls.name}'?`)) {
                      deleteClass(cls.id);
                    }
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Class"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUBJECTS TAB */}
      {activeTab === 'subjects' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((sub) => (
            <div key={sub.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-school-navy-100 text-school-navy-900 font-mono">
                  {sub.code}
                </span>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  {sub.department}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base">{sub.name}</h3>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1">
                  {sub.applicableLevels.map((lvl) => (
                    <span key={lvl} className="text-[10px] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-600">
                      {lvl}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to permanently delete curriculum subject '${sub.name}'?`)) {
                      deleteSubject(sub.id);
                    }
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Subject"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TERMS TAB */}
      {activeTab === 'terms' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
          <h3 className="font-bold text-base text-slate-900">Current Academic Session Configuration</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border">
              <span className="text-slate-400 block font-bold text-[10px]">Academic Year</span>
              <span className="font-bold text-slate-900 text-sm">{settings.academicYear}</span>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-amber-800 block font-bold text-[10px]">Current Active Term</span>
              <span className="font-bold text-amber-950 text-sm">{settings.currentTerm}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border">
              <span className="text-slate-400 block font-bold text-[10px]">Evaluation Weighting</span>
              <span className="font-bold text-slate-900 text-sm">50% Continuous / 50% Exam</span>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD CLASS */}
      {classModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border space-y-4">
            <h3 className="font-bold text-base text-slate-900">Create Academic Class</h3>
            <form onSubmit={handleCreateClass} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Class Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Basic 4 or JHS 1"
                  value={classForm.name}
                  onChange={(e) => setClassForm({ ...classForm, name: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. B4"
                    value={classForm.code}
                    onChange={(e) => setClassForm({ ...classForm, code: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-lg uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Level *</label>
                  <select
                    value={classForm.level}
                    onChange={(e) => setClassForm({ ...classForm, level: e.target.value as any })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  >
                    <option value="Creche">Creche</option>
                    <option value="Nursery">Nursery</option>
                    <option value="Kindergarten">Kindergarten</option>
                    <option value="Primary">Primary</option>
                    <option value="JHS">JHS</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Section</label>
                  <input
                    type="text"
                    value={classForm.section}
                    onChange={(e) => setClassForm({ ...classForm, section: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Term Tuition ({settings.currencySymbol})</label>
                  <input
                    type="number"
                    value={classForm.termTuitionFee}
                    onChange={(e) => setClassForm({ ...classForm, termTuitionFee: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2 border rounded-lg font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setClassModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-school-navy-900 text-white rounded-xl"
                >
                  Save Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD SUBJECT */}
      {subjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border space-y-4">
            <h3 className="font-bold text-base text-slate-900">Add Curriculum Subject</h3>
            <form onSubmit={handleCreateSubject} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Integrated Science or French"
                  value={subjectForm.name}
                  onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SCI"
                    value={subjectForm.code}
                    onChange={(e) => setSubjectForm({ ...subjectForm, code: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-lg uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={subjectForm.department}
                    onChange={(e) => setSubjectForm({ ...subjectForm, department: e.target.value as any })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  >
                    <option value="Sciences">Sciences</option>
                    <option value="Languages">Languages</option>
                    <option value="Humanities">Humanities</option>
                    <option value="Creative Arts & Tech">Creative Arts & Tech</option>
                    <option value="Early Childhood">Early Childhood</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSubjectModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-school-navy-900 text-white rounded-xl"
                >
                  Save Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
