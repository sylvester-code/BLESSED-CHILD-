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
  AlertCircle,
  Database,
  Settings,
  Users,
  ShieldCheck
} from 'lucide-react';

const ADMIN_FEATURES = [
  { icon: Users, label: 'Role & User Management', desc: 'Create, assign and manage all staff roles' },
  { icon: Database, label: 'Full Data Control', desc: 'Students, teachers, fees and academics' },
  { icon: Settings, label: 'System Configuration', desc: 'Site settings, CMS and portal setup' },
  { icon: ShieldCheck, label: 'Security Audit Trail', desc: 'Cryptographic activity logging' },
];

export default function AdminPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdminAuthenticated, loginAdmin, settings, adminCreds } = useSchool();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Admin login form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const result = loginAdmin(username, password);
      if (!result.success) {
        setError(result.error || 'Authentication failed. Please verify your master credentials.');
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
        window.location.href = '/admin-portal';
      }
    }, 600);
  };

  // If not authenticated, show Super Admin Login Gateway
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen flex overflow-y-auto relative" style={{ background: 'linear-gradient(135deg, #020817 0%, #040e21 40%, #07142e 70%, #020817 100%)' }}>
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute -bottom-60 -right-60 w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #1d4ed8 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Left Feature Panel */}
        <div className="hidden xl:flex flex-col justify-between w-[480px] flex-shrink-0 p-10 relative z-10">
          <div>
            <div className="flex items-center space-x-3 mb-12">
              <SchoolLogo size="md" className="shadow-2xl border-2 border-amber-400/40" />
              <div>
                <div className="text-white font-black text-lg leading-tight">{settings.schoolName}</div>
                <div className="text-amber-400/80 text-xs font-semibold uppercase tracking-widest">{settings.schoolMotto}</div>
              </div>
            </div>

            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full mb-5" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-300 text-[10px] font-extrabold uppercase tracking-widest">Super Admin Console</span>
              </div>
              <h2 className="text-3xl font-black text-white mb-2 leading-tight">Master Control<br />Command Center</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                The highest-privilege access tier for managing the entire school information system — staff, academics, finance, and system configuration.
              </p>
            </div>

            <div className="space-y-2.5">
              {ADMIN_FEATURES.map((feat, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 rounded-2xl transition-all hover:scale-[1.01]"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.2)' }}>
                    <feat.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold">{feat.label}</div>
                    <div className="text-slate-400 text-xs">{feat.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-start space-x-3">
              <Shield className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-400 text-xs leading-relaxed">
                Super Administrative access is restricted to authorized personnel only. All login attempts are cryptographically logged in the security audit trail.
              </p>
            </div>
          </div>
        </div>

        {/* Right Login Panel */}
        <div className="flex-1 flex items-start justify-center px-4 py-8 sm:py-12 relative z-10 min-h-screen">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="xl:hidden text-center mb-8 space-y-3">
              <div className="flex justify-center">
                <SchoolLogo size="lg" className="shadow-2xl border-2 border-amber-400/40" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">{settings.schoolName}</h1>
                <p className="text-amber-400/80 text-xs font-semibold uppercase tracking-widest mt-1">{settings.schoolMotto}</p>
              </div>
            </div>

            {/* Login Card */}
            <div className="rounded-3xl overflow-hidden shadow-2xl" style={{
              background: 'rgba(5, 15, 40, 0.90)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              {/* Card Header */}
              <div className="p-8 pb-6 border-b border-white/10" style={{ background: 'linear-gradient(180deg, rgba(245,158,11,0.06) 0%, transparent 100%)' }}>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-[10px] font-extrabold uppercase tracking-widest">
                    <Lock className="w-3 h-3 text-red-400" />
                    <span>Master Security Gate</span>
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Super Admin Console</h2>
                <p className="text-slate-400 text-xs mt-1.5">{settings.locationCity || 'Anaji-Mpatado'}, {settings.locationCountry || 'Ghana'} • Highest Privilege Access</p>
              </div>

              <div className="p-8 space-y-5">
                {error && (
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start space-x-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{error}</span>
                  </div>
                )}

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                      Admin Username
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        autoComplete="username"
                        placeholder="e.g. BLESSED"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-white text-sm font-medium placeholder:text-slate-600 focus:outline-none transition-all"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}
                        onFocus={(e) => { e.target.style.borderColor = '#f59e0b'; e.target.style.boxShadow = '0 0 0 2px rgba(245,158,11,0.15)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                      Master Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        autoComplete="current-password"
                        placeholder="Enter master password (2026)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-11 py-3 rounded-xl text-white text-sm font-medium placeholder:text-slate-600 focus:outline-none transition-all"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}
                        onFocus={(e) => { e.target.style.borderColor = '#f59e0b'; e.target.style.boxShadow = '0 0 0 2px rgba(245,158,11,0.15)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none'; }}
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
                    className="w-full py-3.5 px-6 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2.5 mt-2 group transition-all duration-200 disabled:opacity-60"
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
                      color: '#020617',
                      boxShadow: '0 4px 20px rgba(245,158,11,0.3)'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        <span>Verifying Authorization...</span>
                      </>
                    ) : (
                      <>
                        <span>Unlock Control Console</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                <div className="p-3.5 rounded-2xl flex items-start space-x-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Shield className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Master Credentials: Username: <strong className="text-amber-300 font-mono">BLESSED</strong> • Password: <strong className="text-amber-300 font-mono">2026</strong>. All console activity is cryptographically logged.
                  </p>
                </div>
              </div>

              <div className="px-8 py-5 border-t border-white/10 flex items-center justify-between" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <Link
                  href="/"
                  className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>School Website</span>
                </Link>
                <Link
                  href="/portal"
                  className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-amber-300 transition-colors"
                >
                  <Users className="w-3.5 h-3.5 text-amber-500/60" />
                  <span>Staff Portal Login</span>
                </Link>
              </div>
            </div>

            <p className="text-center text-slate-600 text-[10px] mt-6">
              © {new Date().getFullYear()} {settings.schoolName} • Authorized Personnel Only
            </p>
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
          <div className="relative z-10 w-72 bg-school-navy-950 flex flex-col h-full overflow-y-auto">
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
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
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

        <main className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
