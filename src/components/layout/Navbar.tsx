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
  Sparkles
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all">
      {/* Top Banner Bar */}
      {settings.showAnnouncementTicker !== false && (
        <div className="bg-school-navy-950 text-slate-200 text-xs py-2 px-4 border-b border-school-navy-900 transition-all">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center space-x-4 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="inline-flex items-center text-amber-400 font-semibold uppercase tracking-wider text-[10px] bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                <Sparkles className="w-3 h-3 mr-1" />
                Notice
              </span>
              <span className="truncate text-slate-300">
                {settings.announcementTicker}
              </span>
            </div>

            <div className="flex items-center space-x-6 text-slate-300">
              <a href={`tel:${settings.primaryPhone}`} className="hover:text-amber-400 flex items-center transition-colors">
                <Phone className="w-3 h-3 mr-1 text-amber-400" />
                <span>{settings.primaryPhone}</span>
              </a>
              <span className="hidden md:inline-flex items-center text-slate-400">
                <MapPin className="w-3 h-3 mr-1 text-amber-400" />
                {settings.city || settings.locationCity || 'Ghana'}, {settings.country || 'Ghana'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & School Name */}
          <Link href="/" className="flex items-center space-x-3 group">
            <SchoolLogo size="md" className="group-hover:scale-105" />
            <div>
              <span className="block font-bold text-lg sm:text-xl text-school-navy-950 tracking-tight leading-tight group-hover:text-school-navy-700 transition-colors">
                {settings.schoolName}
              </span>
              <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
                <span className="text-amber-700 font-semibold">{settings.location}</span>
                <span>•</span>
                <span className="italic text-slate-400 hidden sm:inline">&ldquo;{settings.schoolMotto}&rdquo;</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? 'text-school-navy-900 bg-school-navy-50 font-semibold'
                    : 'text-slate-600 hover:text-school-navy-900 hover:bg-slate-100/70'
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
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm shadow-amber-500/20 hover:shadow transition-all"
            >
              Apply Online
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="grid gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive(link.href)
                    ? 'bg-school-navy-50 text-school-navy-900 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Link
              href="/admissions"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-sm shadow-sm block"
            >
              Apply for Admission
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
