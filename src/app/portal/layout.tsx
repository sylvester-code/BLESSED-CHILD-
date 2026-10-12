'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSchool } from '@/context/SchoolContext';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { PortalHeader } from '@/components/layout/PortalHeader';
import { SchoolLogo } from '@/components/common/SchoolLogo';
import { Menu, X, ArrowRight, Lock } from 'lucide-react';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settings, isPortalAuthenticated } = useSchool();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // The portal root (/portal) is the login page — render it WITHOUT the sidebar/header shell
  if (pathname === '/portal') {
    return <>{children}</>;
  }

  // Prevent flash during mount
  if (!mounted) {
    return null;
  }

  // Auth Guard: If user is not authenticated or left the system, require login
  if (!isPortalAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative" style={{ background: 'linear-gradient(135deg, #020817 0%, #051329 40%, #0a1f4e 70%, #040e21 100%)' }}>
        <div className="max-w-md w-full bg-slate-900/90 border border-white/10 p-8 rounded-3xl text-center space-y-5 shadow-2xl backdrop-blur-xl">
          <div className="flex justify-center">
            <SchoolLogo size="lg" className="shadow-2xl border-2 border-amber-400/40" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase tracking-widest mb-3">
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Authentication Required</span>
            </div>
            <h2 className="text-2xl font-black text-white">Staff Session Expired</h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              When you leave the system, your session is automatically locked for security. Please re-enter your username and password.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/portal"
              className="w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:from-amber-300 hover:to-amber-400 transition-all"
            >
              <span>Unlock Staff Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/30 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <PortalSidebar />
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
            <PortalSidebar />
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
          <span className="font-bold text-xs text-school-navy-950 truncate max-w-[200px]">
            {settings.schoolName} Portal
          </span>
          <div className="w-5"></div>
        </div>

        <PortalHeader />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
