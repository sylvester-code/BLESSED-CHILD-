'use client';

import React, { useState } from 'react';
import { Shield, Check, Lock, Users, Key } from 'lucide-react';
import { UserRole } from '@/types';

export default function RolesAdminPage() {
  const roles: { role: UserRole; name: string; usersCount: number; color: string }[] = [
    { role: 'SUPER_ADMIN', name: 'Super Administrator', usersCount: 1, color: 'bg-purple-600' },
    { role: 'SCHOOL_ADMIN', name: 'School Administrator', usersCount: 2, color: 'bg-blue-600' },
    { role: 'HEADTEACHER', name: 'Headmaster / Principal', usersCount: 1, color: 'bg-indigo-600' },
    { role: 'TEACHER', name: 'Teacher / Faculty', usersCount: 48, color: 'bg-emerald-600' },
    { role: 'ACCOUNTANT', name: 'Bursar / Accountant', usersCount: 2, color: 'bg-teal-600' },
    { role: 'ADMISSIONS_OFFICER', name: 'Admissions Officer', usersCount: 2, color: 'bg-rose-600' },
    { role: 'PARENT', name: 'Parent / Guardian', usersCount: 650, color: 'bg-amber-600' },
    { role: 'STUDENT', name: 'Student / Learner', usersCount: 850, color: 'bg-cyan-600' },
    { role: 'LIBRARIAN', name: 'Librarian', usersCount: 2, color: 'bg-slate-600' },
  ];

  const permissionModules = [
    {
      module: 'Student Information System',
      permissions: ['View Students', 'Add Students', 'Edit Student Profiles', 'Archive / Delete', 'Promote to Next Grade']
    },
    {
      module: 'School-Based Assessments & Exams',
      permissions: ['Enter SBA Scores', 'Modify Exam Marks', 'Approve Results', 'Generate Terminal Report Cards', 'Create Online CBT Quizzes']
    },
    {
      module: 'Fees & Financial Administration',
      permissions: ['View Fee Balances', 'Issue Payment Receipts', 'Configure Fee Levies', 'Log Operating Expenses', 'Export Debtor List']
    },
    {
      module: 'Admissions & Enrollment',
      permissions: ['Review Applications', 'Schedule Interviews', 'Convert Applicant to Student', 'Reject Application']
    },
    {
      module: 'System Settings & CMS',
      permissions: ['Manage Website CMS', 'Audit Trail Inspection', 'Modify Grading Scale', 'Manage Roles & Permissions']
    }
  ];

  const [selectedRole, setSelectedRole] = useState<UserRole>('SUPER_ADMIN');

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md inline-flex mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Access Control & Security</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Role-Based Access Control (RBAC) & Permissions
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure granular functional permissions across each administrative and student portal role.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Roles list */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Available System Roles</p>
          {roles.map((r) => (
            <button
              key={r.role}
              onClick={() => setSelectedRole(r.role)}
              className={`w-full p-3 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all ${
                selectedRole === r.role
                  ? 'bg-school-navy-900 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <span className={`w-3 h-3 rounded-full ${r.color}`}></span>
                <span>{r.name}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${selectedRole === r.role ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                {r.usersCount} users
              </span>
            </button>
          ))}
        </div>

        {/* Permissions Matrix */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Permissions for {roles.find(r => r.role === selectedRole)?.name}
              </h3>
              <p className="text-xs text-slate-500">Enable or restrict capabilities for this role.</p>
            </div>
            <button
              onClick={() => alert(`Permissions updated for ${selectedRole}`)}
              className="px-4 py-2 bg-school-navy-900 text-white font-bold text-xs rounded-xl"
            >
              Save Permissions
            </button>
          </div>

          <div className="space-y-6">
            {permissionModules.map((pm, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-xs font-bold text-school-navy-950 uppercase tracking-wider">
                  {pm.module}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pm.permissions.map((pName, pIdx) => {
                    const isSuper = selectedRole === 'SUPER_ADMIN';
                    const isTeacherAllowed = (selectedRole === 'TEACHER' || selectedRole === 'HEADTEACHER') && (pName.includes('SBA') || pName.includes('Report') || pName.includes('View Students'));
                    const isAccAllowed = selectedRole === 'ACCOUNTANT' && pName.includes('Fee');
                    const isAdmAllowed = selectedRole === 'ADMISSIONS_OFFICER' && pName.includes('Admission');

                    const checked = isSuper || isTeacherAllowed || isAccAllowed || isAdmAllowed;

                    return (
                      <label key={pIdx} className="flex items-center space-x-2.5 p-2 rounded-lg bg-slate-50 border text-xs cursor-pointer hover:bg-slate-100">
                        <input
                          type="checkbox"
                          defaultChecked={checked}
                          disabled={selectedRole === 'SUPER_ADMIN'}
                          className="rounded text-school-navy-900"
                        />
                        <span className="text-slate-800 font-medium">{pName}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
