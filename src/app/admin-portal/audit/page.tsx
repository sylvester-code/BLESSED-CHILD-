'use client';

import React, { useState } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { History, Search, Shield, Filter, CheckCircle2 } from 'lucide-react';

export default function AuditAdminPage() {
  const { auditLogs } = useSchool();
  const [search, setSearch] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('All');

  const modules = ['All', 'Assessments', 'Students', 'Fees', 'Admissions', 'Academics', 'Users & Roles', 'CMS', 'Settings'];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(search.toLowerCase()) ||
                          log.userName.toLowerCase().includes(search.toLowerCase());
    const matchesMod = selectedModule === 'All' || log.module === selectedModule;
    return matchesSearch && matchesMod;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md inline-flex mb-1">
            <History className="w-3.5 h-3.5" />
            <span>Security Compliance & Tracking</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            System Administrative Audit Logs
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Every critical administrative, assessment, fee collection, and enrollment action is securely logged.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search actions or staff names..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1">
          {modules.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedModule(m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedModule === m
                  ? 'bg-school-navy-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b">
              <tr>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4">Action Description</th>
                <th className="py-3 px-4">Record Affected</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">{log.userName}</td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
                      {log.userRole.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-school-navy-900">{log.module}</td>
                  <td className="py-3 px-4 text-slate-700 max-w-xs">{log.action}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{log.recordAffected || '—'}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
