'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSchool } from '@/context/SchoolContext';
import { SchoolLogo } from '@/components/common/SchoolLogo';
import {
  GraduationCap,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';

export const Navbar = () => {
  const { settings } = useSchool();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Academics', href: '/academics' },
    { label: 'Admissions', href: '/admissions' },
    { label: 'News & Events', href: '/news' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      {/* Sleek Clean Contact & Portal Header (Ticker Removed) */}
      <div className="bg-school-navy-950 text-slate-300 text-xs py-2 px-4 border-b border-white/10 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6 text-xs text-slate-300">
            <a 
              href={`tel:${settings.primaryPhone}`} 
              className="hover:text-amber-300 flex items-center transition-colors font-medium group"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>{settings.primaryPhone}</span>
            </a>
            <span className="hidden md:inline-flex items-center text-slate-400">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              {settings.location || 'Anaji-Mpatado, Takoradi, Ghana'}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[11px] text-amber-300/80 font-medium italic hidden lg:inline">
              &ldquo;{settings.schoolMotto}&rdquo;
            </span>
            <Link 
              href="/admin-portal" 
              className="inline-flex items-center text-amber-300 hover:text-white transition-colors text-[11px] font-semibold bg-white/5 hover:bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/10"
            >
              <Lock className="w-2.5 h-2.5 mr-1.5" />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & School Name */}
          <Link href="/" className="flex items-center space-x-3.5 group">
            <SchoolLogo size="md" className="group-hover:scale-105 transition-transform duration-300 shadow-md" />
            <div>
              <span className="block font-heading font-extrabold text-lg sm:text-xl text-school-navy-950 tracking-tight leading-tight group-hover:text-school-navy-700 transition-colors">
                {settings.schoolName}
              </span>
              <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium mt-0.5">
                <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 text-[10px] tracking-wide">
                  {settings.location}
                </span>
                <span className="text-slate-300">•</span>
                <span className="italic text-slate-400 hidden sm:inline">&ldquo;{settings.schoolMotto}&rdquo;</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/60 backdrop-blur-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-school-navy-950 bg-white shadow-xs font-black border border-slate-200/80'
                    : 'text-slate-600 hover:text-school-navy-900 hover:bg-white/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              href="/admissions"
              className="btn-gold-glow inline-flex items-center px-5 py-2.5 text-xs font-black rounded-xl shadow-md transition-all duration-200 group"
            >
              <span>Apply Online</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 focus:outline-none transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-5 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="grid gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                  isActive(link.href)
                    ? 'bg-school-navy-50 text-school-navy-950 border border-school-navy-100 font-extrabold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <Link
              href="/admissions"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 px-4 rounded-xl btn-gold-glow font-black text-xs shadow-md block"
            >
              Apply for Admission
            </Link>
            <Link
              href="/admin-portal"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 block"
            >
              Staff & Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
