'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSchool } from '@/context/SchoolContext';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { SchoolLogo } from '@/components/common/SchoolLogo';
import {
  Menu,
  X,
  Shield,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Home,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function AdminPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdminAuthenticated, loginAdmin, settings, adminCreds } = useSchool();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Admin login form states
  const [username, setUsername] = useState(adminCreds.username || 'BLESSED CHILD');
  const [password, setPassword] = useState(adminCreds.password || '4040');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (adminCreds) {
      setUsername(adminCreds.username);
      setPassword(adminCreds.password);
    }
  }, [adminCreds.username, adminCreds.password]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = loginAdmin(username, password);
    if (!result.success) {
      setError(result.error || 'Authentication failed. Please verify your master credentials.');
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      window.location.href = '/admin-portal'; // Force redirect to dashboard to ensure state syncs fully
    }
  };

  // If not authenticated, show Super Admin Login Gateway
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
        {/* Background decorative glowing orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-md w-full relative z-10 space-y-6">
          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <SchoolLogo size="lg" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full inline-block">
                Master Security Gate
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
                Super Admin Console
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                {settings.schoolName} • {settings.locationCity || 'Anaji-Mpatado'}, {settings.locationCountry || 'Ghana'}
              </p>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start space-x-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Super Admin Username
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder={`Enter ${adminCreds.username}`}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-semibold placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Master Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter Master Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-semibold placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:shadow-xl transition-all flex items-center justify-center space-x-2 mt-2 disabled:opacity-50"
              >
                <span>Unlock Control Center</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick credentials hint for easy access */}
            <div className="pt-4 border-t border-slate-800 text-center">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-400 space-y-1">
                <p className="font-semibold text-amber-300 flex items-center justify-center space-x-1">
                  <Shield className="w-3.5 h-3.5 mr-1" />
                  Master Access Credentials
                </p>
                <p>Username: <strong className="text-white font-mono">{adminCreds.username}</strong></p>
                <p>Password: <strong className="text-white font-mono">{adminCreds.password}</strong></p>
              </div>
            </div>
          </div>

          {/* Back to Public Website */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Return to School Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Super Admin Layout
  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          ></div>
          <div className="relative z-10 w-64 bg-school-navy-950 flex flex-col">
            <div className="absolute top-3 right-3">
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded-lg text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <AdminSidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header with Mobile Hamburger toggle */}
        <div className="flex items-center bg-white border-b border-slate-200 lg:hidden px-4 h-14 justify-between">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-bold text-xs text-school-navy-950">
            Super Admin Control Center
          </span>
          <div className="w-5"></div>
        </div>

        <AdminHeader />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
