'use client';

import React, { useState } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { Teacher } from '@/types';
import {
  Users,
  Plus,
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  X,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  Trash2,
  Edit3,
  CheckSquare,
  Square,
  Upload,
  Camera,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function TeachersAdminPage() {
  const { teachers, classes, subjects, addTeacher, updateTeacher, deleteTeacher } = useSchool();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [revealedPasswords, setRevealedPasswords] = useState<Record<string, boolean>>({});

  // Add teacher form
  const [form, setForm] = useState({
    fullName: '',
    gender: 'Male' as 'Male' | 'Female',
    phone: '',
    email: '',
    photoUrl: '',
    qualification: 'B.Ed. Basic Education (University of Cape Coast)',
    specialization: 'Mathematics & Integrated Science',
    classesAssigned: [] as string[],
    subjectsTaught: [] as string[],
    username: '',
    password: '',
    employmentDate: new Date().toISOString().split('T')[0],
    status: 'Active' as Teacher['status']
  });

  // Edit teacher form
  const [editTeacherId, setEditTeacherId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    photoUrl: '',
    specialization: '',
    qualification: '',
    classesAssigned: [] as string[],
    subjectsTaught: [] as string[],
    username: '',
    password: ''
  });

  const toggleFormClass = (cId: string) => {
    setForm(prev => ({
      ...prev,
      classesAssigned: prev.classesAssigned.includes(cId)
        ? prev.classesAssigned.filter(id => id !== cId)
        : [...prev.classesAssigned, cId]
    }));
  };

  const toggleFormSubject = (sId: string) => {
    setForm(prev => ({
      ...prev,
      subjectsTaught: prev.subjectsTaught.includes(sId)
        ? prev.subjectsTaught.filter(id => id !== sId)
        : [...prev.subjectsTaught, sId]
    }));
  };

  const toggleEditClass = (cId: string) => {
    setEditForm(prev => ({
      ...prev,
      classesAssigned: prev.classesAssigned.includes(cId)
        ? prev.classesAssigned.filter(id => id !== cId)
        : [...prev.classesAssigned, cId]
    }));
  };

  const toggleEditSubject = (sId: string) => {
    setEditForm(prev => ({
      ...prev,
      subjectsTaught: prev.subjectsTaught.includes(sId)
        ? prev.subjectsTaught.filter(id => id !== sId)
        : [...prev.subjectsTaught, sId]
    }));
  };

  const handleNameChange = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    setForm(prev => ({
      ...prev,
      fullName: name,
      username: slug ? `teacher.${slug}` : prev.username,
      password: prev.password || 'teacher123'
    }));
  };

  const addPhotoInputRef = React.useRef<HTMLInputElement>(null);
  const editPhotoInputRef = React.useRef<HTMLInputElement>(null);
  const quickPhotoInputRef = React.useRef<HTMLInputElement>(null);
  const [quickTeacherId, setQuickTeacherId] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, mode: 'add' | 'edit' | 'quick') => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Photo file size should not exceed 2MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      if (mode === 'add') {
        setForm(prev => ({ ...prev, photoUrl: dataUrl }));
      } else if (mode === 'edit') {
        setEditForm(prev => ({ ...prev, photoUrl: dataUrl }));
      } else if (mode === 'quick' && quickTeacherId) {
        updateTeacher(quickTeacherId, { photoUrl: dataUrl });
        setQuickTeacherId(null);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleQuickUploadClick = (teacherId: string) => {
    setQuickTeacherId(teacherId);
    quickPhotoInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.classesAssigned.length === 0) {
      alert('Please allocate at least one class to this teacher so they can submit marks for their class.');
      return;
    }
    if (form.subjectsTaught.length === 0) {
      alert('Please allocate at least one subject to this teacher.');
      return;
    }

    addTeacher({
      fullName: form.fullName,
      gender: form.gender,
      phone: form.phone,
      email: form.email || `${form.username}@blessedchildschool.edu.gh`,
      photoUrl: form.photoUrl || undefined,
      qualification: form.qualification,
      specialization: form.specialization,
      classesAssigned: form.classesAssigned,
      subjectsTaught: form.subjectsTaught,
      username: form.username || `teacher.${form.fullName.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      password: form.password || 'teacher123',
      employmentDate: form.employmentDate,
      status: form.status
    });

    setModalOpen(false);
    setForm({
      fullName: '',
      gender: 'Male',
      phone: '',
      email: '',
      photoUrl: '',
      qualification: 'B.Ed. Basic Education (University of Cape Coast)',
      specialization: 'Mathematics & Integrated Science',
      classesAssigned: [],
      subjectsTaught: [],
      username: '',
      password: '',
      employmentDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    });
  };

  const openEditModal = (t: Teacher) => {
    setEditTeacherId(t.id);
    setEditForm({
      fullName: t.fullName,
      phone: t.phone,
      email: t.email,
      photoUrl: t.photoUrl || '',
      specialization: t.specialization,
      qualification: t.qualification,
      classesAssigned: [...t.classesAssigned],
      subjectsTaught: [...t.subjectsTaught],
      username: t.username || `teacher.${t.fullName.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      password: t.password || 'teacher123'
    });
    setEditModalOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTeacherId) return;

    updateTeacher(editTeacherId, {
      fullName: editForm.fullName,
      phone: editForm.phone,
      email: editForm.email,
      photoUrl: editForm.photoUrl || undefined,
      specialization: editForm.specialization,
      qualification: editForm.qualification,
      classesAssigned: editForm.classesAssigned,
      subjectsTaught: editForm.subjectsTaught,
      username: editForm.username,
      password: editForm.password
    });

    setEditModalOpen(false);
    setEditTeacherId(null);
  };

  const togglePasswordReveal = (tId: string) => {
    setRevealedPasswords(prev => ({
      ...prev,
      [tId]: !prev[tId]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md inline-flex mb-1 border border-amber-200/50">
            <Users className="w-3.5 h-3.5 text-amber-600" />
            <span>Faculty & Academic Instructors</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Teachers & Class Allocation Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Register teachers, create their portal passwords, and allocate classes & subjects for SBA mark entry.
          </p>
        </div>

        <button
          onClick={() => {
            // Pre-select first 2 classes and 2 subjects as default convenience
            setForm(prev => ({
              ...prev,
              classesAssigned: classes.slice(5, 7).map(c => c.id),
              subjectsTaught: subjects.slice(0, 3).map(s => s.id),
              password: 'teacher123'
            }));
            setModalOpen(true);
          }}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-school-navy-950 to-school-navy-900 text-white font-bold text-xs flex items-center space-x-2 shadow-md hover:from-school-navy-900 hover:to-school-navy-800 transition-all border border-amber-400/20"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add Teacher & Create Login</span>
        </button>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 mx-auto flex items-center justify-center">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">No Teacher Records Registered</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                The database is clean. Click &ldquo;Add Teacher &amp; Create Login&rdquo; above to register instructors, allocate classes and subjects, and create their portal passwords.
              </p>
            </div>
            <button
              onClick={() => {
                setForm(prev => ({
                  ...prev,
                  classesAssigned: classes.slice(5, 7).map(c => c.id),
                  subjectsTaught: subjects.slice(0, 3).map(s => s.id),
                  password: 'teacher123'
                }));
                setModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-school-navy-900 text-white font-bold text-xs inline-flex items-center space-x-1.5 shadow-sm hover:bg-school-navy-800"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Add First Teacher</span>
            </button>
          </div>
        ) : (
          teachers.map((t) => {
            const isRevealed = revealedPasswords[t.id];
            return (
              <div key={t.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  {/* Top: Photo & Staff Info */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative group">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 border-2 border-slate-200 overflow-hidden flex items-center justify-center font-bold text-school-navy-900 text-sm shadow-xs">
                          {t.photoUrl ? (
                            <img src={t.photoUrl} alt={t.fullName} className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-extrabold text-base text-school-navy-900">
                              {t.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleQuickUploadClick(t.id)}
                          title="Upload or Change Teacher Photo"
                          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-school-navy-950 hover:bg-amber-500 text-white hover:text-slate-950 flex items-center justify-center shadow-md transition-colors border-2 border-white cursor-pointer"
                        >
                          <Camera className="w-3 h-3" />
                        </button>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{t.fullName}</h3>
                        <span className="font-mono text-[10px] text-amber-600 font-extrabold block">
                          {t.staffId}
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {t.status}
                    </span>
                  </div>

                  {/* Profile info */}
                  <div className="space-y-1.5 text-xs text-slate-600 border-t border-b border-slate-100 py-2.5">
                    <p><strong className="text-slate-800">Specialization:</strong> {t.specialization}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1"><strong className="text-slate-800">Degree:</strong> {t.qualification}</p>
                    <div className="flex items-center space-x-1 text-slate-700 pt-0.5">
                      <Phone className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span>{t.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-slate-700">
                      <Mail className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span className="truncate">{t.email}</span>
                    </div>
                  </div>

                  {/* Allocated Classes */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] flex items-center">
                        <GraduationCap className="w-3 h-3 text-school-navy-900 mr-1" />
                        Allocated Classes ({t.classesAssigned?.length || 0})
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {t.classesAssigned && t.classesAssigned.length > 0 ? (
                        t.classesAssigned.map((cId) => {
                          const cls = classes.find(c => c.id === cId);
                          return (
                            <span key={cId} className="px-2 py-0.5 bg-blue-50 text-blue-900 border border-blue-200/60 text-[10px] font-bold rounded-md">
                              {cls?.name || cId}
                            </span>
                          );
                        })
                      ) : (
                        <span className="text-[10px] text-rose-500 italic">No classes allocated</span>
                      )}
                    </div>
                  </div>

                  {/* Allocated Subjects */}
                  <div className="space-y-1">
                    <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] flex items-center">
                      <BookOpen className="w-3 h-3 text-school-navy-900 mr-1" />
                      Allocated Subjects ({t.subjectsTaught?.length || 0})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {t.subjectsTaught && t.subjectsTaught.length > 0 ? (
                        t.subjectsTaught.map((sId) => {
                          const sub = subjects.find(s => s.id === sId);
                          return (
                            <span key={sId} className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold rounded-md">
                              {sub?.name || sId}
                            </span>
                          );
                        })
                      ) : (
                        <span className="text-[10px] text-rose-500 italic">No subjects allocated</span>
                      )}
                    </div>
                  </div>

                  {/* Portal Credentials Badge */}
                  <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-2xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 flex items-center">
                        <KeyRound className="w-3 h-3 mr-1 text-amber-700" />
                        Teacher Portal Login
                      </span>
                      <button
                        type="button"
                        onClick={() => togglePasswordReveal(t.id)}
                        className="text-[10px] font-bold text-amber-800 hover:text-amber-950 flex items-center space-x-1"
                      >
                        {isRevealed ? <EyeOff className="w-3 h-3 mr-0.5" /> : <Eye className="w-3 h-3 mr-0.5" />}
                        <span>{isRevealed ? 'Hide' : 'Reveal'}</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Username:</span>
                        <span className="font-mono font-bold text-slate-900 select-all">{t.username || 'teacher'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Password:</span>
                        <span className="font-mono font-bold text-slate-900 select-all">
                          {isRevealed ? (t.password || 'teacher123') : '••••••••'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions Bottom Bar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => openEditModal(t)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center space-x-1 transition-colors"
                  >
                    <Edit3 className="w-3 h-3 text-slate-600" />
                    <span>Edit &amp; Allocate</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete teacher record for ${t.fullName}? This will revoke their portal access.`)) {
                        deleteTeacher(t.id);
                      }
                    }}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove Teacher Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Hidden file input for quick teacher card photo upload */}
      <input
        type="file"
        ref={quickPhotoInputRef}
        onChange={(e) => handlePhotoUpload(e, 'quick')}
        accept="image/*"
        className="hidden"
      />

      {/* MODAL: ADD FACULTY MEMBER & CREATE PASSWORD */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 my-8 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-black text-lg text-slate-900">Add Faculty Member &amp; Set Login</h3>
                <p className="text-xs text-slate-500">
                  Assign classroom allocations, upload photo, and create portal login for this teacher.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Personal Details */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center">
                  <Users className="w-3.5 h-3.5 mr-1 text-school-navy-900" />
                  1. Teacher Personal Information
                </h4>

                {/* Photo Upload Section */}
                <div className="space-y-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800 text-[11px] flex items-center">
                      <Camera className="w-3.5 h-3.5 mr-1 text-school-navy-900" />
                      Teacher Portrait Photo
                    </label>
                    {form.photoUrl && (
                      <button
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, photoUrl: '' }))}
                        className="text-[11px] font-bold text-rose-600 hover:text-rose-800 flex items-center space-x-1"
                      >
                        <RotateCcw className="w-3 h-3 mr-0.5" />
                        <span>Remove Photo</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center space-x-3.5">
                    <div className="w-16 h-16 rounded-2xl border-2 border-slate-200 overflow-hidden flex items-center justify-center bg-white shadow-xs flex-shrink-0">
                      {form.photoUrl ? (
                        <img src={form.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Users className="w-7 h-7 text-slate-300" />
                      )}
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <input
                          type="file"
                          ref={addPhotoInputRef}
                          onChange={(e) => handlePhotoUpload(e, 'add')}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => addPhotoInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-xl bg-school-navy-900 hover:bg-school-navy-800 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors shadow-xs"
                        >
                          <Upload className="w-3.5 h-3.5 text-amber-400" />
                          <span>Upload from Device...</span>
                        </button>
                        <span className="text-[10px] text-slate-400">JPG, PNG, WebP (Max 2MB)</span>
                      </div>
                      <input
                        type="url"
                        placeholder="Or enter image URL (https://...)"
                        value={form.photoUrl}
                        onChange={(e) => setForm(prev => ({ ...prev, photoUrl: e.target.value }))}
                        className="w-full px-3 py-1.5 border rounded-xl text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mr. Emmanuel Mensah"
                      value={form.fullName}
                      onChange={(e) => handleNameChange(e.target.value)}
                      className="w-full px-3.5 py-2 border rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Gender *</label>
                    <select
                      value={form.gender}
                      onChange={(e) => setForm({ ...form, gender: e.target.value as any })}
                      className="w-full px-3.5 py-2 border rounded-xl bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+233 24 000 0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. teacher@blessedchildschool.edu.gh"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2 border rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Specialization *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mathematics &amp; Science"
                      value={form.specialization}
                      onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                      className="w-full px-3.5 py-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Qualification</label>
                    <input
                      type="text"
                      placeholder="e.g. B.Ed. Basic Education"
                      value={form.qualification}
                      onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                      className="w-full px-3.5 py-2 border rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Class Allocations */}
              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center">
                    <GraduationCap className="w-3.5 h-3.5 mr-1 text-school-navy-900" />
                    2. Allocate Classes to Teacher *
                  </h4>
                  <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">
                    {form.classesAssigned.length} selected
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Select which classes this teacher will teach. Only students from these classes will appear in their marks submission portal.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-2xl border">
                  {classes.map((c) => {
                    const isSelected = form.classesAssigned.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => toggleFormClass(c.id)}
                        className={`p-2 rounded-xl text-left border flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 font-bold'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate text-[11px]">{c.name}</span>
                        {isSelected ? (
                          <CheckSquare className="w-3.5 h-3.5 text-white flex-shrink-0 ml-1" />
                        ) : (
                          <Square className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subject Allocations */}
              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center">
                    <BookOpen className="w-3.5 h-3.5 mr-1 text-school-navy-900" />
                    3. Allocate Subjects to Teacher *
                  </h4>
                  <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">
                    {form.subjectsTaught.length} selected
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Select curriculum subjects this teacher will submit marks for.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-2xl border">
                  {subjects.map((s) => {
                    const isSelected = form.subjectsTaught.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleFormSubject(s.id)}
                        className={`p-2 rounded-xl text-left border flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate text-[11px]">{s.name}</span>
                        {isSelected ? (
                          <CheckSquare className="w-3.5 h-3.5 text-slate-950 flex-shrink-0 ml-1" />
                        ) : (
                          <Square className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Teacher Portal Credentials Created by Super Admin */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-3">
                <h4 className="font-bold text-amber-950 uppercase tracking-wider text-[11px] flex items-center">
                  <KeyRound className="w-3.5 h-3.5 mr-1 text-amber-700" />
                  4. Create Teacher Portal Login Credentials
                </h4>
                <p className="text-[11px] text-amber-800">
                  The teacher will use these credentials to log into the Teacher Portal and enter marks for their allocated classes.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Teacher Username *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. teacher.kwame"
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      className="w-full px-3.5 py-2 border rounded-xl font-mono bg-white font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Teacher Password *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. teacher123"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full px-3.5 py-2 border rounded-xl font-mono bg-white font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold bg-school-navy-950 text-white rounded-xl shadow-md hover:bg-school-navy-900"
                >
                  Save Teacher &amp; Enable Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT ALLOCATIONS & CHANGE TEACHER PASSWORD */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 my-8 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-black text-lg text-slate-900">Edit Allocations &amp; Credentials</h3>
                <p className="text-xs text-slate-500">
                  Update class allocations, subject assignments, or change the login password for {editForm.fullName}.
                </p>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editForm.fullName}
                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl"
                  />
                </div>
              </div>

              {/* Photo Upload Section */}
              <div className="space-y-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 text-[11px] flex items-center">
                    <Camera className="w-3.5 h-3.5 mr-1 text-school-navy-900" />
                    Teacher Portrait Photo
                  </label>
                  {editForm.photoUrl && (
                    <button
                      type="button"
                      onClick={() => setEditForm(prev => ({ ...prev, photoUrl: '' }))}
                      className="text-[11px] font-bold text-rose-600 hover:text-rose-800 flex items-center space-x-1"
                    >
                      <RotateCcw className="w-3 h-3 mr-0.5" />
                      <span>Remove Photo</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center space-x-3.5">
                  <div className="w-16 h-16 rounded-2xl border-2 border-slate-200 overflow-hidden flex items-center justify-center bg-white shadow-xs flex-shrink-0">
                    {editForm.photoUrl ? (
                      <img src={editForm.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-7 h-7 text-slate-300" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        ref={editPhotoInputRef}
                        onChange={(e) => handlePhotoUpload(e, 'edit')}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => editPhotoInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-xl bg-school-navy-900 hover:bg-school-navy-800 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>Upload from Device...</span>
                      </button>
                      <span className="text-[10px] text-slate-400">JPG, PNG, WebP (Max 2MB)</span>
                    </div>
                    <input
                      type="url"
                      placeholder="Or enter image URL (https://...)"
                      value={editForm.photoUrl}
                      onChange={(e) => setEditForm(prev => ({ ...prev, photoUrl: e.target.value }))}
                      className="w-full px-3.5 py-2 border rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Class Allocations Edit */}
              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center">
                    <GraduationCap className="w-3.5 h-3.5 mr-1 text-school-navy-900" />
                    Allocated Classes ({editForm.classesAssigned.length})
                  </h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-2xl border">
                  {classes.map((c) => {
                    const isSelected = editForm.classesAssigned.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => toggleEditClass(c.id)}
                        className={`p-2 rounded-xl text-left border flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 font-bold'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate text-[11px]">{c.name}</span>
                        {isSelected ? (
                          <CheckSquare className="w-3.5 h-3.5 text-white flex-shrink-0 ml-1" />
                        ) : (
                          <Square className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subject Allocations Edit */}
              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center">
                    <BookOpen className="w-3.5 h-3.5 mr-1 text-school-navy-900" />
                    Allocated Subjects ({editForm.subjectsTaught.length})
                  </h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-2xl border">
                  {subjects.map((s) => {
                    const isSelected = editForm.subjectsTaught.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleEditSubject(s.id)}
                        className={`p-2 rounded-xl text-left border flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate text-[11px]">{s.name}</span>
                        {isSelected ? (
                          <CheckSquare className="w-3.5 h-3.5 text-slate-950 flex-shrink-0 ml-1" />
                        ) : (
                          <Square className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Edit Portal Credentials */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-3">
                <h4 className="font-bold text-amber-950 uppercase tracking-wider text-[11px] flex items-center">
                  <KeyRound className="w-3.5 h-3.5 mr-1 text-amber-700" />
                  Teacher Login Credentials
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Username *</label>
                    <input
                      type="text"
                      required
                      value={editForm.username}
                      onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                      className="w-full px-3.5 py-2 border rounded-xl font-mono bg-white font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Reset Password *</label>
                    <input
                      type="text"
                      required
                      value={editForm.password}
                      onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                      className="w-full px-3.5 py-2 border rounded-xl font-mono bg-white font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold bg-school-navy-950 text-white rounded-xl shadow-md hover:bg-school-navy-900"
                >
                  Save Allocations &amp; Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
