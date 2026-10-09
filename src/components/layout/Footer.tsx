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
  Youtube
} from 'lucide-react';

export const Footer = () => {
  const { settings } = useSchool();

  return (
    <footer className="bg-school-navy-950 text-slate-300 pt-16 pb-10 border-t-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <SchoolLogo size="md" />
              <div>
                <h3 className="text-white font-bold text-lg leading-tight tracking-tight">
                  {settings.schoolName}
                </h3>
                <p className="text-amber-400 text-xs font-semibold">{settings.city}, Ghana</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              &ldquo;{settings.schoolMotto}&rdquo; — An exceptional educational sanctuary dedicated to academic rigor, Christian character, and modern technological competencies for the Ghanaian child.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={settings.facebookUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition-colors text-slate-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings.instagramUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition-colors text-slate-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.youtubeUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition-colors text-slate-300"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-amber-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-amber-400/80" />
                  About Our Heritage & Values
                </Link>
              </li>
              <li>
                <Link href="/academics" className="hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-amber-400/80" />
                  Academic Curriculum & Calender
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-amber-400/80" />
                  Online Admissions & Fees
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-amber-400/80" />
                  School News & Announcements
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-amber-400/80" />
                  Campus Life Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-amber-400/80" />
                  Contact Administration & Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic Divisions & Portals */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-amber-400">
              Academic Divisions
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2"></span>
                Creche & Daycare (Ages 3m - 2 yrs)
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2"></span>
                Nursery & Kindergarten (KG 1 - KG 2)
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2"></span>
                Primary School (Basic 1 - Basic 6)
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2"></span>
                Junior High School (JHS 1 - JHS 3)
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2"></span>
                STEM & Robotics Lab Program
              </li>
            </ul>

            <div className="mt-5 p-3 rounded-lg bg-school-navy-900 border border-slate-800 text-xs text-slate-400">
              <p className="text-amber-400 font-semibold uppercase tracking-wider text-[11px] mb-1">
                Admissions Ongoing
              </p>
              <p className="text-[11px] text-slate-300">
                Enrollment is currently open across Creche, Primary & JHS. Contact administration for prospectus.
              </p>
            </div>
          </div>

          {/* Column 4: Location & Contact */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-amber-400">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div>
                  <a href={`tel:${settings.primaryPhone}`} className="hover:text-white block">{settings.primaryPhone}</a>
                  <a href={`tel:${settings.secondaryPhone}`} className="hover:text-white block text-xs text-slate-400">{settings.secondaryPhone}</a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white truncate">{settings.email}</a>
              </div>
              <div className="flex items-center space-x-3 text-xs text-slate-400 pt-1">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Mon – Fri: 7:00 AM – 4:30 PM GMT</span>
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-2 text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>Registered & Accredited by Ghana Education Service (GES)</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {settings.schoolName}. All rights reserved.</p>
          <p className="flex items-center">
            Designed for Academic Excellence in Anaji-Mpatado, Western Region, Ghana
          </p>
          <div className="flex items-center space-x-4">
            <Link href="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-400">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
