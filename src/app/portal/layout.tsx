'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSchool } from '@/context/SchoolContext';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { PortalHeader } from '@/components/layout/PortalHeader';
import { Menu, X } from 'lucide-react';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settings } = useSchool();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  // The portal root (/portal) is the login page — render it WITHOUT the sidebar/header shell
  if (pathname === '/portal') {
    return <>{children}</>;
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
