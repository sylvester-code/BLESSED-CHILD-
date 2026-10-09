'use client';

import React from 'react';
import Link from 'next/link';
import { useSchool } from '@/context/SchoolContext';
import { SchoolLogo } from '@/components/common/SchoolLogo';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ChevronRight,
  Heart,
  Facebook,
  Instagram,
  Youtube,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const Footer = () => {
  const { settings } = useSchool();

  return (
    <footer className="bg-gradient-to-b from-school-navy-950 via-[#061430] to-[#030a17] text-slate-300 pt-20 pb-12 border-t-2 border-amber-500/80 relative overflow-hidden">
      {/* Decorative ambient background blur */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-school-navy-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          {/* Column 1: School Identity */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3.5">
              <SchoolLogo size="md" className="shadow-lg border border-amber-400/40" />
              <div>
                <h3 className="text-white font-heading font-extrabold text-lg leading-tight tracking-tight">
                  {settings.schoolName}
                </h3>
                <p className="text-amber-400 text-xs font-bold tracking-wide mt-0.5">{settings.city || 'Takoradi'}, Ghana</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              &ldquo;{settings.schoolMotto}&rdquo; — An exceptional academic sanctuary dedicated to godly discipline, standard-based STEM curricula, and moral grooming for the Ghanaian child.
            </p>

            <div className="flex items-center space-x-2.5 pt-1">
              <a
                href={settings.facebookUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-slate-950 border border-white/10 flex items-center justify-center transition-all duration-200 text-slate-300 shadow-sm"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings.instagramUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-slate-950 border border-white/10 flex items-center justify-center transition-all duration-200 text-slate-300 shadow-sm"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.youtubeUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-slate-950 border border-white/10 flex items-center justify-center transition-all duration-200 text-slate-300 shadow-sm"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-heading font-bold text-sm uppercase tracking-wider mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-amber-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-amber-300 transition-colors flex items-center text-slate-400 hover:translate-x-1 duration-150">
                  <ChevronRight className="w-3.5 h-3.5 mr-1.5 text-amber-400/70" />
                  About Our Heritage & Values
                </Link>
              </li>
              <li>
                <Link href="/academics" className="hover:text-amber-300 transition-colors flex items-center text-slate-400 hover:translate-x-1 duration-150">
                  <ChevronRight className="w-3.5 h-3.5 mr-1.5 text-amber-400/70" />
                  Academic Curriculum & Calender
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-amber-300 transition-colors flex items-center text-slate-400 hover:translate-x-1 duration-150">
                  <ChevronRight className="w-3.5 h-3.5 mr-1.5 text-amber-400/70" />
                  Online Admissions & Enquiries
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-amber-300 transition-colors flex items-center text-slate-400 hover:translate-x-1 duration-150">
                  <ChevronRight className="w-3.5 h-3.5 mr-1.5 text-amber-400/70" />
                  Latest Bulletins & Calendar
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-300 transition-colors flex items-center text-slate-400 hover:translate-x-1 duration-150">
                  <ChevronRight className="w-3.5 h-3.5 mr-1.5 text-amber-400/70" />
                  Campus Life & Photo Archive
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors flex items-center text-slate-400 hover:translate-x-1 duration-150">
                  <ChevronRight className="w-3.5 h-3.5 mr-1.5 text-amber-400/70" />
                  Locate Campus & Direction Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-white font-heading font-bold text-sm uppercase tracking-wider mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-amber-400">
              Campus Contact Desk
            </h4>
            <div className="space-y-3.5 text-xs text-slate-400">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {settings.address || 'Anaji-Mpatado Road'}, {settings.locationCity || settings.city || 'Sekondi-Takoradi'}, Western Region, Ghana
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`tel:${settings.primaryPhone}`} className="hover:text-amber-300 font-medium transition-colors">
                  {settings.primaryPhone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`mailto:${settings.email || settings.admissionsEmail || 'info@blessedchildschool.edu.gh'}`} className="hover:text-amber-300 transition-colors">
                  {settings.email || settings.admissionsEmail || 'info@blessedchildschool.edu.gh'}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Mon – Fri: 7:00 AM – 4:30 PM (Creche to JHS)</span>
              </div>
            </div>
          </div>

          {/* Column 4: Portals & Accreditation */}
          <div className="space-y-4">
            <h4 className="text-white font-heading font-bold text-sm uppercase tracking-wider mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-amber-400">
              Staff & Parent Portals
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Authorized digital access for teachers, administrative directors, accountants, and admissions desk.
            </p>

            <div className="space-y-2 pt-1">
              <Link
                href="/admin-portal"
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all group"
              >
                <span>Administrative Console</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portal/teacher"
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all group"
              >
                <span>Teacher Grading Workspace</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="pt-2 flex items-center space-x-2 text-[11px] text-amber-300/90 font-semibold bg-amber-400/10 p-2.5 rounded-xl border border-amber-400/20">
              <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Registered with Ghana Education Service (GES)</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {settings.schoolName}. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Code of Conduct</Link>
            <span>•</span>
            <span className="text-slate-400 font-medium">Anaji-Mpatado, Sekondi-Takoradi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
