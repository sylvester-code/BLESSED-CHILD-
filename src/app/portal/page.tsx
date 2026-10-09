'use client';

import React, { useState } from 'react';
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
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  BookOpen
} from 'lucide-react';

export default function PortalLoginPage() {
  const router = useRouter();
  const { loginTeacher, teachers, settings } = useSchool();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = loginTeacher(username, password);
    if (res.success) {
      router.push('/portal/teacher');
    } else {
      setError(res.error || 'Invalid teacher username or password.');
      setLoading(false);
    }
  };

  const handleQuickTeacherSelect = (tchUsername: string, tchPass: string) => {
    setUsername(tchUsername);
    setPassword(tchPass);
    setError('');
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 flex flex-col justify-center items-center bg-gradient-to-b from-slate-900 via-school-navy-950 to-slate-950 text-slate-100 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <SchoolLogo size="lg" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full inline-block">
              Faculty &amp; Instruction Gateway
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
              Teacher Portal Login
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

          <form onSubmit={handleTeacherLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Teacher Username
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. teacher.mensah"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-semibold placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Teacher Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your assigned password"
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
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:shadow-xl transition-all flex items-center justify-center space-x-2 mt-2 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Teacher Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Super Admin Notice / Registered Teacher Hints */}
          <div className="pt-4 border-t border-slate-800 text-center">
            {teachers.length === 0 ? (
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-400 space-y-1">
                <p className="font-semibold text-amber-300 flex items-center justify-center space-x-1">
                  <Shield className="w-3.5 h-3.5 mr-1 text-amber-400" />
                  Account Setup Required
                </p>
                <p>
                  No teachers are currently registered. The <strong>Super Administrator</strong> must add teachers and create their passwords in the Admin Portal.
                </p>
              </div>
            ) : (
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-400 space-y-2">
                <p className="font-semibold text-amber-300 flex items-center justify-center space-x-1">
                  <Users className="w-3.5 h-3.5 mr-1" />
                  Registered Teachers ({teachers.length})
                </p>
                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {teachers.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleQuickTeacherSelect(t.username || 'teacher', t.password || 'teacher123')}
                      className="w-full text-left p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] flex items-center justify-between text-slate-300 transition-colors"
                    >
                      <div className="truncate">
                        <span className="font-bold text-white block truncate">{t.fullName}</span>
                        <span className="text-slate-500 font-mono">User: {t.username || 'teacher'}</span>
                      </div>
                      <span className="text-amber-400 font-semibold text-[10px] flex items-center">
                        Auto-fill →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
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
