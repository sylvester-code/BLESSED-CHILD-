'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSchool } from '@/context/SchoolContext';
import { SchoolLogo } from '@/components/common/SchoolLogo';
import {
  Users,
  Lock,
  ArrowRight,
  Shield,
  Eye,
  EyeOff,
  Home,
  AlertCircle,
  GraduationCap,
  BookOpen,
  DollarSign,
  UserCheck,
  KeyRound,
  Sparkles,
  Building2
} from 'lucide-react';

const ROLE_CARDS = [
  { icon: GraduationCap, label: 'Teachers & Faculty', color: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/30', text: 'text-blue-300', description: 'Class management, attendance & grades' },
  { icon: DollarSign, label: 'Accounts Office', color: 'from-emerald-500/20 to-emerald-600/10', border: 'border-emerald-500/30', text: 'text-emerald-300', description: 'Fee collection & financial records' },
  { icon: UserCheck, label: 'Admissions Officer', color: 'from-violet-500/20 to-violet-600/10', border: 'border-violet-500/30', text: 'text-violet-300', description: 'Applications & enrollment processing' },
  { icon: BookOpen, label: 'School Librarian', color: 'from-amber-500/20 to-amber-600/10', border: 'border-amber-500/30', text: 'text-amber-300', description: 'Library catalog & book management' },
  { icon: Shield, label: 'Headteacher', color: 'from-rose-500/20 to-rose-600/10', border: 'border-rose-500/30', text: 'text-rose-300', description: 'Academic oversight & administration' },
];

export default function PortalLoginPage() {
  const router = useRouter();
  const { loginPortalUser, settings } = useSchool();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handlePortalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = loginPortalUser(username, password);
      if (res.success && res.redirectUrl) {
        router.push(res.redirectUrl);
      } else {
        setError(res.error || 'Invalid credentials. Please verify your assigned username and password with the Super Administrator.');
        setLoading(false);
      }
    }, 350);
  };

  return (
    <div className="min-h-screen flex overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #020817 0%, #051329 40%, #0a1f4e 70%, #040e21 100%)' }}>
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', filter: 'blur(60px)' }} />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Left Panel — Role Cards Info */}
      <div className="hidden xl:flex flex-col justify-between w-[480px] flex-shrink-0 p-10 relative z-10">
        <div>
          {/* School Logo & Name */}
          <div className="flex items-center space-x-3 mb-12">
            <SchoolLogo size="md" className="shadow-2xl border-2 border-amber-400/40" />
            <div>
              <div className="text-white font-black text-lg leading-tight">{settings.schoolName}</div>
              <div className="text-amber-400/80 text-xs font-semibold uppercase tracking-widest">{settings.schoolMotto}</div>
            </div>
          </div>

          {/* Role Cards */}
          <div className="space-y-2 mb-8">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Staff Portal Access Roles</span>
            </p>
            {ROLE_CARDS.map((card, idx) => (
              <div
                key={idx}
                className={`flex items-center space-x-3.5 p-3.5 rounded-2xl bg-gradient-to-r ${card.color} border ${card.border} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.text} bg-white/10 flex-shrink-0`}>
                  <card.icon className="w-4.5 h-4.5" style={{ width: '18px', height: '18px' }} />
                </div>
                <div>
                  <div className={`text-sm font-bold ${card.text}`}>{card.label}</div>
                  <div className="text-slate-400 text-xs">{card.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom notice */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-start space-x-3">
            <KeyRound className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-slate-400 text-xs leading-relaxed">
              All staff accounts and portal access roles are exclusively provisioned and managed by the <strong className="text-amber-300">Super Administrator</strong>. Contact the administration desk for credential assistance.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className={`w-full max-w-md transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

          {/* Mobile: Show logo above form */}
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
            background: 'rgba(8, 26, 61, 0.85)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {/* Card Header */}
            <div className="p-8 pb-6 border-b border-white/10"
              style={{ background: 'linear-gradient(180deg, rgba(245,158,11,0.08) 0%, transparent 100%)' }}>
              <div className="flex items-center space-x-2 mb-3">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-[10px] font-extrabold uppercase tracking-widest">
                  <Shield className="w-3 h-3 text-amber-400" />
                  <span>Unified Staff Gateway</span>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Staff & Faculty Portal
              </h2>
              <p className="text-slate-400 text-xs mt-1.5">
                {settings.locationCity || 'Anaji-Mpatado'}, {settings.locationCountry || 'Ghana'} • Authorized Access Only
              </p>
            </div>

            {/* Form Body */}
            <div className="p-8 space-y-5">
              {error && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start space-x-2.5 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{error}</span>
                </div>
              )}

              <form onSubmit={handlePortalLogin} className="space-y-4">
                {/* Username Field */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    Staff Username / Email
                  </label>
                  <div className="relative group">
                    <Users className="w-4 h-4 text-slate-500 group-focus-within:text-amber-400 absolute left-3.5 top-3.5 transition-colors" />
                    <input
                      type="text"
                      required
                      autoComplete="username"
                      placeholder="Enter your assigned username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-white text-sm font-medium placeholder:text-slate-600 focus:outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                      }}
                      onFocus={(e) => { e.target.style.borderColor = '#f59e0b'; e.target.style.boxShadow = '0 0 0 2px rgba(245,158,11,0.15)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    Account Password
                  </label>
                  <div className="relative group">
                    <Lock className="w-4 h-4 text-slate-500 group-focus-within:text-amber-400 absolute left-3.5 top-3.5 transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="current-password"
                      placeholder="Enter your confidential password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-11 py-3 rounded-xl text-white text-sm font-medium placeholder:text-slate-600 focus:outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                      }}
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2.5 mt-2 group transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: loading ? '#b45309' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
                    color: '#020617',
                    boxShadow: '0 4px 20px rgba(245,158,11,0.3)'
                  }}
                  onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 28px rgba(245,158,11,0.5)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(245,158,11,0.3)'; }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      <span>Authenticating Role...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Workspace</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Role-based info notice */}
              <div className="p-3.5 rounded-2xl flex items-start space-x-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <KeyRound className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Your role and login credentials are provisioned by the <strong className="text-amber-300">Super Administrator</strong>. Each role grants access to its specific workspace.
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-8 py-5 border-t border-white/10 flex items-center justify-between" style={{ background: 'rgba(0,0,0,0.2)' }}>
              <Link
                href="/"
                className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Public Website</span>
              </Link>
              <Link
                href="/admin-portal"
                className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-amber-300 transition-colors group"
              >
                <Building2 className="w-3.5 h-3.5 text-amber-500/60 group-hover:text-amber-400 transition-colors" />
                <span>Super Admin Console</span>
              </Link>
            </div>
          </div>

          {/* Bottom copyright */}
          <p className="text-center text-slate-600 text-[10px] mt-6">
            © {new Date().getFullYear()} {settings.schoolName} • {settings.location || 'Anaji-Mpatado, Ghana'}<br />
            <span className="text-slate-700">All system access is logged and monitored.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
