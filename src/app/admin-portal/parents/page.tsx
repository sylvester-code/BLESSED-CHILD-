'use client';

import React, { useState } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { Users, Phone, Mail, MapPin, GraduationCap, Plus, X } from 'lucide-react';

export default function ParentsAdminPage() {
  const { parents, students, addParent, settings } = useSchool();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    relationship: 'Father' as 'Father' | 'Mother' | 'Guardian',
    phone: '',
    email: '',
    occupation: '',
    address: '',
    city: 'Anaji, Takoradi',
    studentIds: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addParent(form);
    setModalOpen(false);
    setForm({
      fullName: '',
      relationship: 'Father',
      phone: '',
      email: '',
      occupation: '',
      address: '',
      city: 'Anaji, Takoradi',
      studentIds: []
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md inline-flex mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Parent Directory</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Parents & Guardians Registry
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Registered parents and linked pupil wards across {settings.schoolName}.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-school-navy-900 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add Parent Record</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {parents.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">No Parent Accounts in Database</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              All demo parent profiles have been cleared. Click &ldquo;Add Parent / Guardian&rdquo; to register new parents and link their wards.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-school-navy-900 text-white font-bold text-xs inline-flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Add Parent / Guardian</span>
            </button>
          </div>
        ) : (
          parents.map((p) => {
          const linkedWards = students.filter(s => s.parentId === p.id || p.studentIds?.includes(s.id));
          return (
            <div key={p.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{p.fullName}</h3>
                  <span className="text-[10px] font-bold text-amber-700 uppercase">{p.relationship}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                  {linkedWards.length} Wards
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 border-t border-b border-slate-100 py-3">
                <p><strong className="text-slate-800">Occupation:</strong> {p.occupation || 'N/A'}</p>
                <div className="flex items-center space-x-1.5 text-slate-700">
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  <span>{p.phone}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-slate-700">
                  <Mail className="w-3.5 h-3.5 text-amber-600" />
                  <span className="truncate">{p.email}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-slate-700 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span className="truncate">{p.address}, {p.city}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Enrolled Children:</span>
                <div className="space-y-1">
                  {linkedWards.length === 0 ? (
                    <span className="text-[11px] text-slate-400 italic">No students linked</span>
                  ) : (
                    linkedWards.map(w => (
                      <div key={w.id} className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                        <span className="font-bold text-slate-800">{w.firstName} {w.lastName}</span>
                        <span className="font-mono text-[10px] text-school-navy-900">{w.admissionNo}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border space-y-4">
            <h3 className="font-bold text-base text-slate-900">Add Parent / Guardian</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Parent / Guardian Full Name"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Relationship</label>
                  <select
                    value={form.relationship}
                    onChange={(e) => setForm({ ...form, relationship: e.target.value as any })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Guardian</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Occupation</label>
                <input
                  type="text"
                  placeholder="e.g. Petroleum Engineer"
                  value={form.occupation}
                  onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Home Address</label>
                <input
                  type="text"
                  placeholder="e.g. House 14, Anaji Estates"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
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
                  Save Parent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
