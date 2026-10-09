'use client';

import React, { useState } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { TimetableSlot } from '@/types';
import {
  Calendar,
  Clock,
  Plus,
  AlertTriangle,
  CheckCircle2,
  X,
  BookOpen,
  Users
} from 'lucide-react';

export default function TimetableAdminPage() {
  const { timetable, classes, subjects, teachers, addTimetableSlot } = useSchool();
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[12]?.id || classes[0]?.id || 'cls-jhs2');
  const [modalOpen, setModalOpen] = useState(false);
  const [conflictError, setConflictError] = useState<string | null>(null);

  const days: TimetableSlot['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const periods = [1, 2, 3, 4, 5, 6, 7, 8];

  const periodTimes: { [p: number]: { start: string; end: string } } = {
    1: { start: '08:00', end: '08:50' },
    2: { start: '08:50', end: '09:40' },
    3: { start: '10:00', end: '10:50' },
    4: { start: '10:50', end: '11:40' },
    5: { start: '11:40', end: '12:30' },
    6: { start: '01:15', end: '02:00' },
    7: { start: '02:00', end: '02:45' },
    8: { start: '02:45', end: '03:30' },
  };

  const [form, setForm] = useState({
    day: 'Monday' as TimetableSlot['day'],
    period: 1,
    subjectId: subjects[0]?.id || 'sub-math',
    teacherId: teachers[0]?.id || 'tch-1',
    room: 'Room J2'
  });

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    setConflictError(null);

    const result = addTimetableSlot({
      classId: selectedClassId,
      day: form.day,
      period: Number(form.period),
      startTime: periodTimes[Number(form.period)]?.start || '08:00',
      endTime: periodTimes[Number(form.period)]?.end || '08:50',
      subjectId: form.subjectId,
      teacherId: form.teacherId,
      room: form.room
    });

    if (result.success) {
      setModalOpen(false);
    } else {
      setConflictError(result.error || 'Conflict detected in schedule.');
    }
  };

  const classSchedule = timetable.filter(t => t.classId === selectedClassId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md inline-flex mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Timetable & Scheduling Matrix</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Class Weekly Schedules & Conflict Prevention
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Engine automatically detects and prevents teacher double-booking and room clashes.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setConflictError(null);
              setModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-school-navy-900 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Class Period</span>
          </button>
        </div>
      </div>

      {/* Class Selector Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-700">Display Schedule For:</span>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
          >
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.level})</option>
            ))}
          </select>
        </div>
        <span className="text-xs text-slate-500 hidden sm:inline">
          {classSchedule.length} periods scheduled this week
        </span>
      </div>

      {/* Timetable Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-xs">
        <table className="w-full text-left text-xs min-w-[700px]">
          <thead className="bg-school-navy-950 text-white text-[10px] uppercase">
            <tr>
              <th className="py-3 px-3 w-28">Period / Time</th>
              {days.map(d => (
                <th key={d} className="py-3 px-3 text-center">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {periods.map(period => (
              <tr key={period} className="hover:bg-slate-50">
                <td className="py-3 px-3 bg-slate-50 font-bold border-r border-slate-200">
                  <span className="text-slate-900 block text-xs">Period {period}</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    {periodTimes[period].start} – {periodTimes[period].end}
                  </span>
                </td>

                {days.map(day => {
                  const slot = classSchedule.find(s => s.day === day && s.period === period);
                  const subj = subjects.find(s => s.id === slot?.subjectId);
                  const teacher = teachers.find(t => t.id === slot?.teacherId);

                  return (
                    <td key={day} className="py-2 px-2 text-center border-r border-slate-100 last:border-r-0">
                      {slot ? (
                        <div className="p-2 rounded-lg bg-school-navy-50 border border-school-navy-200 text-left space-y-0.5">
                          <span className="font-bold text-school-navy-950 text-xs block leading-tight">
                            {subj?.name || slot.subjectId}
                          </span>
                          <span className="text-[10px] text-slate-600 block line-clamp-1">
                            {teacher?.fullName}
                          </span>
                          <span className="text-[9px] text-amber-700 font-semibold block">
                            {slot.room}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-300 italic">— Free —</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL: ADD SLOT */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">Schedule Class Subject Period</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {conflictError && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{conflictError}</span>
              </div>
            )}

            <form onSubmit={handleAddSlot} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Day of Week *</label>
                  <select
                    value={form.day}
                    onChange={(e) => setForm({ ...form, day: e.target.value as any })}
                    className="w-full text-xs px-3 py-2 border rounded-lg font-semibold"
                  >
                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Period (1 to 8) *</label>
                  <select
                    value={form.period}
                    onChange={(e) => setForm({ ...form, period: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2 border rounded-lg font-semibold"
                  >
                    {periods.map(p => (
                      <option key={p} value={p}>Period {p} ({periodTimes[p].start})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
                <select
                  value={form.subjectId}
                  onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg font-semibold"
                >
                  {subjects.map(s => <option key={s.id} value={s.id}>{s.name} ({s.code})</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Teacher *</label>
                <select
                  value={form.teacherId}
                  onChange={(e) => setForm({ ...form, teacherId: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg font-semibold"
                >
                  {teachers.map(t => <option key={t.id} value={t.id}>{t.fullName} ({t.specialization})</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Room / Venue</label>
                <input
                  type="text"
                  value={form.room}
                  onChange={(e) => setForm({ ...form, room: e.target.value })}
                  placeholder="e.g. Science Lab or Room J2"
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
                  Confirm Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
