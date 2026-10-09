'use client';

import React, { useState, useRef } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { SchoolPrefect } from '@/types';
import {
  Award,
  Plus,
  Trash2,
  Edit3,
  Camera,
  Upload,
  RotateCcw,
  Search,
  X,
  Sparkles,
  GraduationCap,
  Quote,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const COMMON_PREFECT_ROLES = [
  'Senior Boy Prefect (Head Boy)',
  'Senior Girl Prefect (Head Girl)',
  'Assistant Senior Boy Prefect',
  'Assistant Senior Girl Prefect',
  'Chapel & Devotion Prefect',
  'Compound & Environmental Health Prefect',
  'Sports & Physical Education Prefect',
  'Library & Academic Protocol Prefect',
  'Entertainment & Cultural Affairs Prefect',
  'Dining Hall & Welfare Prefect',
  'ICT & Robotics Lab Prefect',
  'Timekeeper & Punctuality Prefect'
];

export default function PrefectsAdminPage() {
  const { prefects, classes, addPrefect, updatePrefect, deletePrefect } = useSchool();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('ALL');

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editPrefectId, setEditPrefectId] = useState<string | null>(null);

  // File input refs
  const addPhotoInputRef = useRef<HTMLInputElement>(null);
  const editPhotoInputRef = useRef<HTMLInputElement>(null);
  const quickPhotoInputRef = useRef<HTMLInputElement>(null);
  const [quickPrefectId, setQuickPrefectId] = useState<string | null>(null);

  // Add form state
  const [form, setForm] = useState({
    fullName: '',
    gender: 'Male' as 'Male' | 'Female',
    role: 'Senior Boy Prefect (Head Boy)',
    className: 'JHS 3',
    photoUrl: '',
    academicYear: '2024/2025',
    quote: '',
    badgeNumber: ''
  });

  // Edit form state
  const [editForm, setEditForm] = useState({
    fullName: '',
    gender: 'Male' as 'Male' | 'Female',
    role: '',
    className: '',
    photoUrl: '',
    academicYear: '',
    quote: '',
    badgeNumber: ''
  });

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
      } else if (mode === 'quick' && quickPrefectId) {
        updatePrefect(quickPrefectId, { photoUrl: dataUrl });
        setQuickPrefectId(null);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleQuickUploadClick = (prefectId: string) => {
    setQuickPrefectId(prefectId);
    quickPhotoInputRef.current?.click();
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim()) {
      alert('Please enter student full name.');
      return;
    }

    const defaultBadge = `PRF-${String(prefects.length + 1).padStart(2, '0')}`;

    addPrefect({
      fullName: form.fullName.trim(),
      gender: form.gender,
      role: form.role,
      className: form.className,
      photoUrl: form.photoUrl.trim() || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
      academicYear: form.academicYear,
      quote: form.quote.trim(),
      badgeNumber: form.badgeNumber.trim() || defaultBadge
    });

    setModalOpen(false);
    setForm({
      fullName: '',
      gender: 'Male',
      role: 'Senior Boy Prefect (Head Boy)',
      className: 'JHS 3',
      photoUrl: '',
      academicYear: '2024/2025',
      quote: '',
      badgeNumber: ''
    });
  };

  const openEditModal = (p: SchoolPrefect) => {
    setEditPrefectId(p.id);
    setEditForm({
      fullName: p.fullName,
      gender: p.gender,
      role: p.role,
      className: p.className,
      photoUrl: p.photoUrl || '',
      academicYear: p.academicYear,
      quote: p.quote || '',
      badgeNumber: p.badgeNumber || ''
    });
    setEditModalOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPrefectId) return;

    updatePrefect(editPrefectId, {
      fullName: editForm.fullName.trim(),
      gender: editForm.gender,
      role: editForm.role,
      className: editForm.className,
      photoUrl: editForm.photoUrl.trim() || undefined,
      academicYear: editForm.academicYear,
      quote: editForm.quote.trim(),
      badgeNumber: editForm.badgeNumber.trim()
    });

    setEditModalOpen(false);
    setEditPrefectId(null);
  };

  const filteredPrefects = prefects.filter(p => {
    const matchesSearch =
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.badgeNumber && p.badgeNumber.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesClass = filterClass === 'ALL' || p.className === filterClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      {/* Hidden file input for quick card photo upload */}
      <input
        type="file"
        ref={quickPhotoInputRef}
        onChange={(e) => handlePhotoUpload(e, 'quick')}
        accept="image/*"
        className="hidden"
      />

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md inline-flex mb-1 border border-amber-200/50">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Pupil Leadership Council</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            School Prefects &amp; Student Leaders
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage student prefect appointments, upload their portraits from your device, and configure leadership portfolios shown across the school portal and public website.
          </p>
        </div>

        <button
          onClick={() => {
            setForm({
              fullName: '',
              gender: 'Male',
              role: COMMON_PREFECT_ROLES[0],
              className: 'JHS 3',
              photoUrl: '',
              academicYear: '2024/2025',
              quote: '',
              badgeNumber: `PRF-${String(prefects.length + 1).padStart(2, '0')}`
            });
            setModalOpen(true);
          }}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-school-navy-950 to-school-navy-900 text-white font-bold text-xs flex items-center space-x-2 shadow-md hover:from-school-navy-900 hover:to-school-navy-800 transition-all border border-amber-400/20"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Appoint New Prefect</span>
        </button>
      </div>

      {/* Controls & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by student name, role, or badge..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-xl text-xs bg-slate-50 focus:bg-white"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-600">Class:</span>
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="px-3 py-2 border rounded-xl text-xs bg-white text-slate-800 font-medium"
          >
            <option value="ALL">All Classes</option>
            <option value="JHS 3">JHS 3</option>
            <option value="JHS 2">JHS 2</option>
            <option value="JHS 1">JHS 1</option>
            <option value="Basic 6">Basic 6</option>
          </select>

          <span className="text-xs font-black text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
            {filteredPrefects.length} {filteredPrefects.length === 1 ? 'Prefect' : 'Prefects'}
          </span>
        </div>
      </div>

      {/* Prefects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPrefects.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 mx-auto flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">No Prefects Found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                {searchQuery || filterClass !== 'ALL'
                  ? 'No prefect records match your filter criteria.'
                  : 'No student prefects have been appointed yet. Click "Appoint New Prefect" above to create pupil leadership records.'}
              </p>
            </div>
          </div>
        ) : (
          filteredPrefects.map((p) => {
            return (
              <div
                key={p.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div>
                  {/* Photo Banner with Badges */}
                  <div className="relative h-56 bg-slate-100 overflow-hidden">
                    <img
                      src={p.photoUrl}
                      alt={p.fullName}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 shadow-sm border border-amber-300">
                        {p.badgeNumber || 'PREFECT'}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-slate-900 backdrop-blur-xs shadow-sm">
                        {p.className}
                      </span>
                    </div>

                    {/* Quick Photo Upload Button */}
                    <button
                      type="button"
                      onClick={() => handleQuickUploadClick(p.id)}
                      title="Upload or Change Photo from Device"
                      className="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl bg-school-navy-950/90 hover:bg-amber-500 text-white hover:text-slate-950 text-[10px] font-bold flex items-center space-x-1 shadow-lg transition-colors border border-white/20"
                    >
                      <Camera className="w-3 h-3" />
                      <span>Change Photo</span>
                    </button>

                    {/* Bottom Info on Image */}
                    <div className="absolute bottom-3 left-3 right-24 text-white">
                      <span className="text-[10px] text-amber-300 font-extrabold block uppercase tracking-wider">
                        {p.academicYear}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base leading-tight">{p.fullName}</h3>
                      <p className="text-xs font-bold text-amber-700 mt-1 flex items-center">
                        <Award className="w-3.5 h-3.5 mr-1 flex-shrink-0 text-amber-600" />
                        <span>{p.role}</span>
                      </p>
                    </div>

                    {p.quote && (
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-600 text-[11px] italic relative leading-relaxed">
                        <Quote className="w-3 h-3 text-amber-400 absolute top-2.5 left-2 opacity-50" />
                        <span className="pl-3.5 block">&ldquo;{p.quote}&rdquo;</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Bottom Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => openEditModal(p)}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 inline-flex items-center space-x-1.5 transition-colors shadow-xs"
                  >
                    <Edit3 className="w-3 h-3 text-slate-600" />
                    <span>Edit Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Are you sure you want to remove ${p.fullName} from the prefect leadership body?`)) {
                        deletePrefect(p.id);
                      }
                    }}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove Prefect"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL: ADD PREFECT */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 my-8 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-black text-lg text-slate-900 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-amber-500" />
                  Appoint School Prefect
                </h3>
                <p className="text-xs text-slate-500">
                  Assign student to an official leadership portfolio with photo and badge.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              {/* Photo Upload Section */}
              <div className="space-y-3 p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 text-[11px] flex items-center">
                    <Camera className="w-3.5 h-3.5 mr-1 text-amber-700" />
                    Prefect Portrait Photo *
                  </label>
                  {form.photoUrl && (
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, photoUrl: '' }))}
                      className="text-[11px] font-bold text-rose-600 hover:text-rose-800 flex items-center space-x-1"
                    >
                      <RotateCcw className="w-3 h-3 mr-0.5" />
                      <span>Clear</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-20 h-24 rounded-2xl border-2 border-amber-300 overflow-hidden flex items-center justify-center bg-white shadow-xs flex-shrink-0">
                    {form.photoUrl ? (
                      <img src={form.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Award className="w-8 h-8 text-amber-400" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
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
                        className="px-3.5 py-2 rounded-xl bg-school-navy-950 hover:bg-school-navy-900 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>Upload from Device...</span>
                      </button>
                      <span className="text-[10px] text-slate-500">Max size 2MB</span>
                    </div>

                    <input
                      type="url"
                      placeholder="Or enter hosted photo URL (https://...)"
                      value={form.photoUrl}
                      onChange={(e) => setForm(prev => ({ ...prev, photoUrl: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Student Name & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Full Student Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master Emmanuel K. Mensah"
                    value={form.fullName}
                    onChange={(e) => setForm(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-3.5 py-2 border rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gender *</label>
                  <select
                    value={form.gender}
                    onChange={(e) => setForm(prev => ({ ...prev, gender: e.target.value as any }))}
                    className="w-full px-3.5 py-2 border rounded-xl bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              {/* Role & Class */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Leadership Role / Portfolio *</label>
                  <input
                    type="text"
                    required
                    list="prefect-roles"
                    placeholder="Select or enter role"
                    value={form.role}
                    onChange={(e) => setForm(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-3.5 py-2 border rounded-xl"
                  />
                  <datalist id="prefect-roles">
                    {COMMON_PREFECT_ROLES.map((r, i) => (
                      <option key={i} value={r} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Academic Class *</label>
                  <select
                    value={form.className}
                    onChange={(e) => setForm(prev => ({ ...prev, className: e.target.value }))}
                    className="w-full px-3.5 py-2 border rounded-xl bg-white font-semibold"
                  >
                    <option value="JHS 3">JHS 3 (Basic 9)</option>
                    <option value="JHS 2">JHS 2 (Basic 8)</option>
                    <option value="JHS 1">JHS 1 (Basic 7)</option>
                    <option value="Basic 6">Basic 6 (Primary 6)</option>
                    <option value="Basic 5">Basic 5 (Primary 5)</option>
                  </select>
                </div>
              </div>

              {/* Badge & Academic Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Badge ID / Code</label>
                  <input
                    type="text"
                    placeholder="e.g. PRF-01"
                    value={form.badgeNumber}
                    onChange={(e) => setForm(prev => ({ ...prev, badgeNumber: e.target.value }))}
                    className="w-full px-3.5 py-2 border rounded-xl font-mono uppercase"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Academic Year</label>
                  <input
                    type="text"
                    value={form.academicYear}
                    onChange={(e) => setForm(prev => ({ ...prev, academicYear: e.target.value }))}
                    className="w-full px-3.5 py-2 border rounded-xl"
                  />
                </div>
              </div>

              {/* Leadership Motto / Quote */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Leadership Motto / Quote</label>
                <textarea
                  rows={2}
                  placeholder="e.g. True leadership is service, discipline, and inspiring your peers..."
                  value={form.quote}
                  onChange={(e) => setForm(prev => ({ ...prev, quote: e.target.value }))}
                  className="w-full px-3.5 py-2 border rounded-xl italic leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-school-navy-950 hover:bg-school-navy-900 text-white font-bold rounded-xl transition-colors shadow-sm flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Save &amp; Appoint Prefect</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PREFECT */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 my-8 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-black text-lg text-slate-900 flex items-center">
                  <Edit3 className="w-5 h-5 mr-2 text-school-navy-900" />
                  Edit Prefect Profile
                </h3>
                <p className="text-xs text-slate-500">
                  Update student portfolio details and portrait photo.
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
              {/* Photo Upload Section */}
              <div className="space-y-3 p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 text-[11px] flex items-center">
                    <Camera className="w-3.5 h-3.5 mr-1 text-amber-700" />
                    Prefect Portrait Photo
                  </label>
                  {editForm.photoUrl && (
                    <button
                      type="button"
                      onClick={() => setEditForm(prev => ({ ...prev, photoUrl: '' }))}
                      className="text-[11px] font-bold text-rose-600 hover:text-rose-800 flex items-center space-x-1"
                    >
                      <RotateCcw className="w-3 h-3 mr-0.5" />
                      <span>Clear</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-20 h-24 rounded-2xl border-2 border-amber-300 overflow-hidden flex items-center justify-center bg-white shadow-xs flex-shrink-0">
                    {editForm.photoUrl ? (
                      <img src={editForm.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Award className="w-8 h-8 text-amber-400" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
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
                        className="px-3.5 py-2 rounded-xl bg-school-navy-950 hover:bg-school-navy-900 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>Upload from Device...</span>
                      </button>
                      <span className="text-[10px] text-slate-500">Max size 2MB</span>
                    </div>

                    <input
                      type="url"
                      placeholder="Or enter hosted photo URL (https://...)"
                      value={editForm.photoUrl}
                      onChange={(e) => setEditForm(prev => ({ ...prev, photoUrl: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Student Name & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Full Student Name *</label>
                  <input
                    type="text"
                    required
                    value={editForm.fullName}
                    onChange={(e) => setEditForm(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-3.5 py-2 border rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gender *</label>
                  <select
                    value={editForm.gender}
                    onChange={(e) => setEditForm(prev => ({ ...prev, gender: e.target.value as any }))}
                    className="w-full px-3.5 py-2 border rounded-xl bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              {/* Role & Class */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Leadership Role / Portfolio *</label>
                  <input
                    type="text"
                    required
                    list="prefect-roles-edit"
                    value={editForm.role}
                    onChange={(e) => setEditForm(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-3.5 py-2 border rounded-xl"
                  />
                  <datalist id="prefect-roles-edit">
                    {COMMON_PREFECT_ROLES.map((r, i) => (
                      <option key={i} value={r} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Academic Class *</label>
                  <select
                    value={editForm.className}
                    onChange={(e) => setEditForm(prev => ({ ...prev, className: e.target.value }))}
                    className="w-full px-3.5 py-2 border rounded-xl bg-white font-semibold"
                  >
                    <option value="JHS 3">JHS 3 (Basic 9)</option>
                    <option value="JHS 2">JHS 2 (Basic 8)</option>
                    <option value="JHS 1">JHS 1 (Basic 7)</option>
                    <option value="Basic 6">Basic 6 (Primary 6)</option>
                    <option value="Basic 5">Basic 5 (Primary 5)</option>
                  </select>
                </div>
              </div>

              {/* Badge & Academic Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Badge ID / Code</label>
                  <input
                    type="text"
                    value={editForm.badgeNumber}
                    onChange={(e) => setEditForm(prev => ({ ...prev, badgeNumber: e.target.value }))}
                    className="w-full px-3.5 py-2 border rounded-xl font-mono uppercase"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Academic Year</label>
                  <input
                    type="text"
                    value={editForm.academicYear}
                    onChange={(e) => setEditForm(prev => ({ ...prev, academicYear: e.target.value }))}
                    className="w-full px-3.5 py-2 border rounded-xl"
                  />
                </div>
              </div>

              {/* Leadership Motto / Quote */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Leadership Motto / Quote</label>
                <textarea
                  rows={2}
                  value={editForm.quote}
                  onChange={(e) => setEditForm(prev => ({ ...prev, quote: e.target.value }))}
                  className="w-full px-3.5 py-2 border rounded-xl italic leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-school-navy-950 hover:bg-school-navy-900 text-white font-bold rounded-xl transition-colors shadow-sm flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Update Prefect</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
