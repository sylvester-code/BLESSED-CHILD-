'use client';

import React, { useState } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { Student } from '@/types';
import {
  GraduationCap,
  Plus,
  Search,
  Filter,
  Download,
  Trash2,
  Edit,
  ArrowUpRight,
  Eye,
  CheckCircle2,
  X,
  Phone,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react';

export default function StudentsAdminPage() {
  const { students, classes, parents, addStudent, updateStudent, deleteStudent, promoteStudent, settings } = useSchool();

  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Modals
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [viewStudent, setViewStudent] = useState<Student | null>(null);
  const [promoteTarget, setPromoteTarget] = useState<Student | null>(null);
  const [targetClassId, setTargetClassId] = useState<string>('');

  // Form State
  const [newStudentForm, setNewStudentForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: 'Male' as 'Male' | 'Female',
    dob: '2012-06-15',
    classId: classes[0]?.id || 'cls-b1',
    section: 'A',
    address: 'Anaji, Takoradi',
    city: 'Anaji-Mpatado',
    parentId: parents[0]?.id || '',
    guardianName: '',
    guardianPhone: '',
    balance: 0
  });

  const filteredStudents = students.filter(s => {
    const query = search.toLowerCase();
    const fullName = `${s.firstName} ${s.middleName || ''} ${s.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(query) || s.admissionNo.toLowerCase().includes(query);
    const matchesClass = selectedClass === 'All' || s.classId === selectedClass;
    const matchesStatus = selectedStatus === 'All' || s.status === selectedStatus;
    return matchesSearch && matchesClass && matchesStatus;
  });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    addStudent({
      firstName: newStudentForm.firstName,
      middleName: newStudentForm.middleName,
      lastName: newStudentForm.lastName,
      gender: newStudentForm.gender,
      dob: newStudentForm.dob,
      classId: newStudentForm.classId,
      section: newStudentForm.section,
      academicYear: settings.academicYear,
      admissionDate: new Date().toISOString().split('T')[0],
      photoUrl: newStudentForm.gender === 'Female'
        ? 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80'
        : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
      address: newStudentForm.address,
      city: newStudentForm.city,
      parentId: newStudentForm.parentId,
      emergencyContact: {
        name: newStudentForm.guardianName,
        relationship: 'Guardian',
        phone: newStudentForm.guardianPhone
      },
      status: 'Active',
      balance: Number(newStudentForm.balance) || 0
    });

    setAddModalOpen(false);
    setNewStudentForm({
      firstName: '',
      middleName: '',
      lastName: '',
      gender: 'Male',
      dob: '2012-06-15',
      classId: classes[0]?.id || 'cls-b1',
      section: 'A',
      address: 'Anaji, Takoradi',
      city: 'Anaji-Mpatado',
      parentId: parents[0]?.id || '',
      guardianName: '',
      guardianPhone: '',
      balance: 0
    });
  };

  const handleExportCSV = () => {
    const headers = "AdmissionNo,FirstName,LastName,Gender,Class,Section,ParentPhone,Balance\n";
    const rows = filteredStudents.map(s => {
      const clsName = classes.find(c => c.id === s.classId)?.name || s.classId;
      return `${s.admissionNo},${s.firstName},${s.lastName},${s.gender},${clsName},${s.section},${s.emergencyContact.phone},${s.balance}`;
    }).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Blessed_Child_Students_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePromoteConfirm = () => {
    if (!promoteTarget || !targetClassId) return;
    promoteStudent(promoteTarget.id, targetClassId);
    setPromoteTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Header and Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Student Information System (SIS)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Total active learners enrolled across Creche to JHS 3: <strong>{students.length} pupils</strong>
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center space-x-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-school-navy-900 hover:bg-school-navy-800 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Admit New Student</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name or admission no..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-school-navy-900"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center space-x-1 text-xs">
            <span className="text-slate-500 font-medium">Class:</span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold"
            >
              <option value="All">All Classes</option>
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-1 text-xs">
            <span className="text-slate-500 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Graduated">Graduated</option>
              <option value="Transferred">Transferred</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Admission No.</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Gender</th>
                <th className="py-3 px-4">Parent / Contact</th>
                <th className="py-3 px-4">Fee Balance</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-500">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <GraduationCap className="w-8 h-8 text-slate-300" />
                      <p className="font-bold text-slate-700 text-sm">No Student Records Found</p>
                      <p className="text-xs text-slate-400 max-w-sm">
                        All student names have been cleared. Click &ldquo;Admit New Student&rdquo; above to enroll new learners.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => {
                  const studentClass = classes.find(c => c.id === s.classId);
                  return (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={s.photoUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"}
                            alt={s.firstName}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">
                              {s.firstName} {s.middleName ? `${s.middleName} ` : ''}{s.lastName}
                            </span>
                            <span className="text-[10px] text-slate-400">DOB: {s.dob}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono font-bold text-school-navy-900">
                        {s.admissionNo}
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-800">
                          {studentClass?.name || s.classId}
                        </span>
                        <span className="text-[10px] text-slate-400 block">Sec {s.section}</span>
                      </td>

                      <td className="py-3 px-4">{s.gender}</td>

                      <td className="py-3 px-4">
                        <span className="block font-medium text-slate-800">{s.emergencyContact.name}</span>
                        <span className="text-[10px] text-slate-500">{s.emergencyContact.phone}</span>
                      </td>

                      <td className="py-3 px-4">
                        {s.balance > 0 ? (
                          <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                            {settings.currencySymbol} {s.balance.toLocaleString()}
                          </span>
                        ) : (
                          <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                            Cleared
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          s.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : s.status === 'Graduated'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {s.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            onClick={() => setViewStudent(s)}
                            title="View Full 360° Profile"
                            className="p-1.5 rounded-lg text-slate-600 hover:text-school-navy-900 hover:bg-slate-100"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              setPromoteTarget(s);
                              setTargetClassId(classes[0]?.id || '');
                            }}
                            title="Promote Student"
                            className="p-1.5 rounded-lg text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to remove student ${s.firstName} ${s.lastName}?`)) {
                                deleteStudent(s.id);
                              }
                            }}
                            title="Archive / Remove"
                            className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50"
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

      {/* MODAL: ADD STUDENT */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">
                Enroll New Student (SIS)
              </h3>
              <button onClick={() => setAddModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={newStudentForm.firstName}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, firstName: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Middle Name</label>
                  <input
                    type="text"
                    value={newStudentForm.middleName}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, middleName: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={newStudentForm.lastName}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, lastName: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gender *</label>
                  <select
                    value={newStudentForm.gender}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, gender: e.target.value as 'Male' | 'Female' })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={newStudentForm.dob}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, dob: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class Assigned *</label>
                  <select
                    value={newStudentForm.classId}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, classId: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-lg font-semibold"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Guardian Name *</label>
                  <input
                    type="text"
                    required
                    value={newStudentForm.guardianName}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, guardianName: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Guardian Phone *</label>
                  <input
                    type="text"
                    required
                    value={newStudentForm.guardianPhone}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, guardianPhone: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Residential Address</label>
                  <input
                    type="text"
                    value={newStudentForm.address}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, address: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Initial Fee Balance ({settings.currencySymbol})</label>
                  <input
                    type="number"
                    value={newStudentForm.balance}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, balance: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2 border rounded-lg font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-school-navy-900 text-white font-bold text-xs hover:bg-school-navy-800"
                >
                  Admit Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PROMOTE STUDENT */}
      {promoteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-extrabold text-base text-slate-900">
              Promote Student: {promoteTarget.firstName} {promoteTarget.lastName}
            </h3>
            <p className="text-xs text-slate-600">
              Current Class: <strong>{classes.find(c => c.id === promoteTarget.classId)?.name}</strong>
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Promote to Class:</label>
              <select
                value={targetClassId}
                onChange={(e) => setTargetClassId(e.target.value)}
                className="w-full text-xs px-3 py-2 border rounded-lg font-semibold"
              >
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setPromoteTarget(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handlePromoteConfirm}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-600"
              >
                Confirm Promotion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VIEW STUDENT 360° PROFILE */}
      {viewStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={viewStudent.photoUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"}
                  alt={viewStudent.firstName}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    {viewStudent.firstName} {viewStudent.lastName}
                  </h3>
                  <p className="text-xs text-school-navy-900 font-mono font-bold">{viewStudent.admissionNo}</p>
                </div>
              </div>
              <button onClick={() => setViewStudent(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Class</span>
                <span className="font-bold text-slate-800">{classes.find(c => c.id === viewStudent.classId)?.name}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Gender</span>
                <span className="font-bold text-slate-800">{viewStudent.gender}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Date of Birth</span>
                <span className="font-bold text-slate-800">{viewStudent.dob}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Fee Status</span>
                <span className="font-bold text-rose-600">{settings.currencySymbol} {viewStudent.balance.toLocaleString()} Owed</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border text-xs space-y-1">
              <p className="font-bold text-slate-900">Parent / Guardian Contact</p>
              <p className="text-slate-700">Name: {viewStudent.emergencyContact.name}</p>
              <p className="text-slate-700">Phone: {viewStudent.emergencyContact.phone}</p>
              <p className="text-slate-700">Residence: {viewStudent.address}, {viewStudent.city}</p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setViewStudent(null)}
                className="px-4 py-2 bg-school-navy-900 text-white text-xs font-bold rounded-xl"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
