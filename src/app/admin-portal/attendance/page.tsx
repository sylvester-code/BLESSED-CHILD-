'use client';

import React, { useState } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { CheckSquare, Calendar, CheckCircle2, Save, Users, Clock, AlertCircle } from 'lucide-react';

export default function AttendanceAdminPage() {
  const { classes, students, attendance, markAttendance } = useSchool();
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[12]?.id || classes[0]?.id || 'cls-jhs2');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const classStudents = students.filter(s => s.classId === selectedClassId);

  // Status mapping
  const [currentStatuses, setCurrentStatuses] = useState<{ [studentId: string]: 'Present' | 'Absent' | 'Late' | 'Excused' }>({});
  const [savedNotice, setSavedNotice] = useState(false);

  const getStatus = (studentId: string): 'Present' | 'Absent' | 'Late' | 'Excused' => {
    if (currentStatuses[studentId]) return currentStatuses[studentId];
    const existing = attendance.find(a => a.studentId === studentId && a.date === selectedDate && a.classId === selectedClassId);
    if (existing) return existing.status;
    return 'Present';
  };

  const handleStatusChange = (studentId: string, status: 'Present' | 'Absent' | 'Late' | 'Excused') => {
    setCurrentStatuses(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSaveAttendance = () => {
    const records = classStudents.map(s => ({
      studentId: s.id,
      status: getStatus(s.id)
    }));

    markAttendance(selectedClassId, selectedDate, records);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const presentCount = classStudents.filter(s => getStatus(s.id) === 'Present').length;
  const absentCount = classStudents.filter(s => getStatus(s.id) === 'Absent').length;
  const lateCount = classStudents.filter(s => getStatus(s.id) === 'Late').length;
  const excusedCount = classStudents.filter(s => getStatus(s.id) === 'Excused').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md inline-flex mb-1">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Attendance Registry</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Daily Class Attendance & Roll Call
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Mark daily student presence, track late entries, and generate automated parental attendance warnings.
          </p>
        </div>

        <button
          onClick={handleSaveAttendance}
          className="px-5 py-2.5 rounded-xl bg-school-navy-900 hover:bg-school-navy-800 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs"
        >
          <Save className="w-4 h-4 text-amber-400" />
          <span>Save Today&apos;s Roll Call</span>
        </button>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Attendance register saved successfully for {selectedDate}. Records updated on parent portal.</span>
        </div>
      )}

      {/* Selector & Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Class</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold"
            >
              {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold"
            />
          </div>
        </div>

        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-4 gap-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-[10px] font-bold text-emerald-700 block uppercase">Present</span>
            <span className="text-xl font-black text-emerald-950">{presentCount}</span>
          </div>
          <div className="p-2 rounded-xl bg-rose-50 border border-rose-200">
            <span className="text-[10px] font-bold text-rose-700 block uppercase">Absent</span>
            <span className="text-xl font-black text-rose-950">{absentCount}</span>
          </div>
          <div className="p-2 rounded-xl bg-amber-50 border border-amber-200">
            <span className="text-[10px] font-bold text-amber-700 block uppercase">Late</span>
            <span className="text-xl font-black text-amber-950">{lateCount}</span>
          </div>
          <div className="p-2 rounded-xl bg-blue-50 border border-blue-200">
            <span className="text-[10px] font-bold text-blue-700 block uppercase">Excused</span>
            <span className="text-xl font-black text-blue-950">{excusedCount}</span>
          </div>
        </div>
      </div>

      {/* Student Attendance List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Admission No.</th>
                <th className="py-3 px-4">Mark Status</th>
                <th className="py-3 px-4">Guardian Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classStudents.map((st) => {
                const status = getStatus(st.id);
                return (
                  <tr key={st.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {st.firstName} {st.lastName}
                    </td>
                    <td className="py-3 px-4 font-mono">{st.admissionNo}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        {(['Present', 'Absent', 'Late', 'Excused'] as const).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => handleStatusChange(st.id, s)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              status === s
                                ? s === 'Present'
                                  ? 'bg-emerald-600 text-white'
                                  : s === 'Absent'
                                  ? 'bg-rose-600 text-white'
                                  : s === 'Late'
                                  ? 'bg-amber-500 text-slate-950'
                                  : 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {st.emergencyContact.phone} ({st.emergencyContact.name})
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t flex justify-end">
          <button
            onClick={handleSaveAttendance}
            className="px-6 py-2.5 rounded-xl bg-school-navy-900 text-white font-bold text-xs hover:bg-school-navy-800"
          >
            Save Attendance
          </button>
        </div>
      </div>
    </div>
  );
}
