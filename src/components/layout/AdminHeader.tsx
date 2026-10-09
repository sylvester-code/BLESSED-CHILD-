'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSchool } from '@/context/SchoolContext';
import { SchoolLogo } from '@/components/common/SchoolLogo';
import {
  Bell,
  Search,
  Shield,
  Settings,
  History,
  Home,
  ChevronDown,
  RotateCcw,
  Check,
  KeyRound,
  LogOut,
  X,
  Lock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const AdminHeader = () => {
  const { currentUser, switchRole, settings, auditLogs, resetToDemo, logoutAdmin, changeAdminPassword, adminCreds } = useSchool();
  const [adminRoleOpen, setAdminRoleOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  // Change password states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const adminRoles = [
    { role: 'SUPER_ADMIN' as const, label: 'Super Administrator', desc: 'Unrestricted full access' },
    { role: 'HEADTEACHER' as const, label: 'Headmaster / Academic Director', desc: 'Academic supervision & reports' },
  ];

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    if (newPassword.length < 3) {
      setPasswordError('New password must be at least 3 characters long.');
      return;
    }

    const res = changeAdminPassword(currentPassword, newPassword);
    if (!res.success) {
      setPasswordError(res.error || 'Failed to update password.');
      return;
    }

    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setPasswordModalOpen(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1500);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs h-16 flex items-center justify-between px-4 sm:px-6">
      {/* Left: Indicator */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2.5 text-xs">
          <span className="font-heading font-extrabold text-school-navy-950 tracking-tight text-sm flex items-center">
            <SchoolLogo size="sm" className="w-6 h-6 mr-2 rounded-lg shadow-xs" />
            <span className="hidden sm:inline">{settings.schoolName} —</span> Admin Console
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="bg-amber-400/15 border border-amber-400/30 text-amber-900 font-extrabold px-3 py-0.5 rounded-full text-[11px] shadow-xs">
            {settings.currentTerm} • {settings.academicYear}
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Change Admin Password */}
        <button
          onClick={() => {
            setPasswordModalOpen(true);
            setPasswordError('');
            setPasswordSuccess(false);
          }}
          title="Change Master Admin Password"
          className="inline-flex items-center text-xs font-bold text-amber-950 bg-amber-50 hover:bg-amber-100/80 border border-amber-300/80 px-3 py-1.5 rounded-xl transition-all shadow-xs"
        >
          <KeyRound className="w-3.5 h-3.5 text-amber-600 sm:mr-1.5" />
          <span className="hidden sm:inline">Change Password</span>
        </button>

        {/* Reset Demo Data */}
        <button
          onClick={resetToDemo}
          title="Reset to clean baseline data"
          className="hidden xl:inline-flex items-center text-[11px] font-semibold text-slate-500 hover:text-rose-600 bg-slate-100/80 hover:bg-rose-50 px-2.5 py-1.5 rounded-xl border border-slate-200 transition-colors"
        >
          <RotateCcw className="w-3 h-3 mr-1" />
          Reset Baseline
        </button>

        {/* Audit Log Shortcut */}
        <Link
          href="/admin-portal/audit"
          title="View Security & Audit Logs"
          className="relative p-2 text-slate-600 hover:text-school-navy-900 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors border border-slate-200/60"
        >
          <History className="w-4 h-4" />
          {auditLogs.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 font-black text-[9px] rounded-full flex items-center justify-center shadow-xs">
              {auditLogs.length > 9 ? '9+' : auditLogs.length}
            </span>
          )}
        </Link>

        {/* Settings Shortcut */}
        <Link
          href="/admin-portal/settings"
          title="System Settings"
          className="p-2 text-slate-600 hover:text-school-navy-900 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors hidden sm:block border border-slate-200/60"
        >
          <Settings className="w-4 h-4" />
        </Link>

        {/* Public Site */}
        <Link
          href="/"
          className="text-xs text-slate-700 hover:text-school-navy-900 flex items-center bg-slate-100/90 hover:bg-slate-200 px-3 py-1.5 rounded-xl font-bold transition-colors border border-slate-200/60"
        >
          <Home className="w-3.5 h-3.5 mr-1 text-slate-500" />
          <span className="hidden md:inline">Public Site</span>
        </Link>

        {/* Admin Role Switcher (Super Admin vs Headmaster) */}
        <div className="relative">
          <button
            onClick={() => setAdminRoleOpen(!adminRoleOpen)}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-school-navy-950 to-school-navy-900 text-white px-3.5 py-1.5 rounded-xl text-xs font-black shadow-md hover:from-school-navy-900 hover:to-school-navy-800 transition-all border border-amber-400/40"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Role:</span>
            <span className="text-amber-300">{currentUser.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Headteacher'}</span>
            <ChevronDown className="w-3.5 h-3.5 ml-0.5 text-slate-300" />
          </button>

          {adminRoleOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 border-b border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Administrative Privilege
                </p>
              </div>
              <div className="py-1">
                {adminRoles.map((item) => (
                  <button
                    key={item.role}
                    onClick={() => {
                      switchRole(item.role);
                      setAdminRoleOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-start justify-between hover:bg-slate-50 transition-colors ${
                      currentUser.role === item.role ? 'bg-amber-50/70 font-semibold text-school-navy-950' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold">{item.label}</p>
                      <p className="text-[10px] text-slate-500">{item.desc}</p>
                    </div>
                    {currentUser.role === item.role && (
                      <Check className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Master Admin Logout Button */}
        <button
          onClick={logoutAdmin}
          title="Lock Console & Log Out"
          className="p-2 text-slate-500 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 rounded-lg border border-slate-200 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* CHANGE PASSWORD MODAL */}
      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm">Change Super Admin Password</h3>
                  <p className="text-[11px] text-slate-500">Update your master security login key</p>
                </div>
              </div>
              <button
                onClick={() => setPasswordModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {passwordSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="font-semibold">Master password updated successfully! Persisted to system.</span>
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="space-y-3.5 text-xs">
                {passwordError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    <span>{passwordError}</span>
                  </div>
                )}

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Current Master Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter current password (default: 4040)"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    New Master Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter new master password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Confirm New Master Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Repeat new master password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 border rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2 border-t">
                  <button
                    type="button"
                    onClick={() => setPasswordModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-xl shadow-sm hover:from-amber-600 hover:to-amber-700 transition-all"
                  >
                    Save New Password
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
