'use client';

import React, { useState, useRef } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { SchoolLogo } from '@/components/common/SchoolLogo';
import {
  Globe,
  Save,
  CheckCircle2,
  Sparkles,
  Image as ImageIcon,
  Phone,
  Mail,
  MapPin,
  FileText,
  Eye,
  Upload,
  RotateCcw,
  Shield,
  GraduationCap,
  Award,
  Link as LinkIcon,
  Check,
  User,
  Share2,
  Palette
} from 'lucide-react';
import Link from 'next/link';

export default function CMSAdminPage() {
  const { settings, updateSettings, logAuditEvent } = useSchool();
  const [formData, setFormData] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Preset logo options for 1-click professional school emblems
  const logoPresets = [
    {
      name: 'Royal Gold & Navy Shield',
      url: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=250&q=80',
      description: 'Classic collegiate heraldry with golden laurels'
    },
    {
      name: 'Torch of Knowledge',
      url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=250&q=80',
      description: 'Enlightenment beacon with open book & motto'
    },
    {
      name: 'Christian Cross & Dove',
      url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=250&q=80',
      description: 'Faith, integrity and moral foundation'
    },
    {
      name: 'STEM & Robotics Emblem',
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=250&q=80',
      description: 'Modern innovation and future technology'
    }
  ];

  // Handle local file upload (converts to base64 Data URL so it saves in localStorage)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image file is too large. Please select an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData(prev => ({ ...prev, logoUrl: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeadmasterPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, headmasterPhotoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    logAuditEvent('CMS', 'Super Admin updated school brand logo and website content');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md inline-flex mb-1 border border-amber-200/60">
            <Globe className="w-3.5 h-3.5 text-amber-600" />
            <span>Website CMS &amp; Branding Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            School Logo &amp; Website Customizer
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Change the school logo, motto, contact numbers, campus addresses, hero headlines, and headmaster speech.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            href="/admin-portal/settings"
            className="px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 font-bold text-xs flex items-center space-x-1.5 transition-colors shadow-xs"
          >
            <Palette className="w-3.5 h-3.5 text-amber-600" />
            <span>Theme &amp; Interface Engine</span>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center space-x-1.5 transition-colors border border-slate-200"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Public Site</span>
          </Link>

          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-school-navy-950 to-school-navy-900 hover:from-school-navy-900 hover:to-school-navy-800 text-white font-black text-xs flex items-center space-x-2 shadow-md transition-all border border-amber-400/20"
          >
            <Save className="w-4 h-4 text-amber-400" />
            <span>Save &amp; Publish Live</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center space-x-2.5 animate-in fade-in shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>School branding, logo, and website details updated successfully! Changes are live across the entire system.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECTION 1: SCHOOL LOGO & BRAND CREST (KEY USER REQUIREMENT) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="border-b pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-black text-slate-900 text-base flex items-center">
                <ImageIcon className="w-5 h-5 mr-2 text-amber-500" />
                1. School Crest &amp; Brand Logo
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload your school&apos;s official logo or choose a royal crest. It will appear on the website navbar, footer, terminal report cards, fee receipts, and portal headers.
              </p>
            </div>
            {formData.logoUrl && (
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, logoUrl: '' }))}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl transition-colors self-start sm:self-auto flex items-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Revert to Default Crest</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left: Live Logo Previews */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Live Logo Preview
              </span>

              <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 shadow-inner space-y-3">
                <div className="w-24 h-24 rounded-2xl bg-slate-950 flex items-center justify-center p-2 border-2 border-amber-400/50 shadow-lg overflow-hidden">
                  {formData.logoUrl ? (
                    <img src={formData.logoUrl} alt="Logo Preview" className="w-full h-full object-contain" />
                  ) : (
                    <GraduationCap className="w-12 h-12 text-amber-400" />
                  )}
                </div>

                <div className="text-center">
                  <span className="text-xs font-black text-slate-900 block truncate max-w-[200px]">
                    {formData.schoolName}
                  </span>
                  <span className="text-[10px] text-amber-600 font-bold block">
                    {formData.location}
                  </span>
                </div>
              </div>

              {/* Multi-context preview */}
              <div className="space-y-2 pt-2 border-t text-[11px] text-slate-600">
                <span className="font-bold text-slate-700 block">Preview in System Contexts:</span>
                
                {/* Navbar Context Simulation */}
                <div className="p-2.5 rounded-xl bg-slate-900 text-white flex items-center space-x-2 text-[10px]">
                  <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center overflow-hidden border border-amber-400/40">
                    {formData.logoUrl ? (
                      <img src={formData.logoUrl} alt="" className="w-full h-full object-contain" />
                    ) : (
                      <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                    )}
                  </div>
                  <span className="font-bold truncate">{formData.schoolName}</span>
                </div>

                {/* Report Card Header Simulation */}
                <div className="p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 flex items-center space-x-2 text-[10px]">
                  <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-300">
                    {formData.logoUrl ? (
                      <img src={formData.logoUrl} alt="" className="w-full h-full object-contain" />
                    ) : (
                      <GraduationCap className="w-3.5 h-3.5 text-slate-700" />
                    )}
                  </div>
                  <div>
                    <span className="font-bold block truncate leading-tight">Official Terminal Report</span>
                    <span className="text-[9px] text-slate-500 font-mono">BCS-ACC-2025</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle & Right: Upload & Options */}
            <div className="lg:col-span-2 space-y-5">
              {/* Option A: Upload from computer */}
              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Upload Image File from Your Device</h4>
                    <p className="text-[11px] text-slate-600">Supports PNG, JPG, SVG, WebP with transparent or white background.</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-school-navy-950 hover:bg-school-navy-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center space-x-1.5"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>Choose Image File...</span>
                  </button>
                  <span className="text-[11px] text-slate-500">Max size 2MB</span>
                </div>
              </div>

              {/* Option B: Enter Logo Image URL */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 flex items-center">
                  <LinkIcon className="w-3.5 h-3.5 mr-1 text-slate-500" />
                  Or Paste Hosted Image URL:
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/logo.png"
                  value={formData.logoUrl || ''}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-mono focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Option C: 1-Click Curated Presets */}
              <div className="space-y-2 pt-2 border-t">
                <label className="block text-xs font-bold text-slate-700">
                  Or Select a Royal School Crest Preset:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {logoPresets.map((preset, idx) => {
                    const isSelected = formData.logoUrl === preset.url;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, logoUrl: preset.url })}
                        className={`p-2.5 rounded-xl border text-left flex items-center space-x-3 transition-all ${
                          isSelected
                            ? 'bg-amber-50 border-amber-400 ring-1 ring-amber-400'
                            : 'bg-white hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <img src={preset.url} alt={preset.name} className="w-10 h-10 rounded-lg object-cover border" />
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-xs text-slate-900 truncate">{preset.name}</p>
                          <p className="text-[10px] text-slate-500 truncate">{preset.description}</p>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-amber-600 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: CORE SCHOOL IDENTITY */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-black text-slate-900 text-base border-b pb-3 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-school-navy-900" />
            2. Core School Details &amp; Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Official School Name *</label>
              <input
                type="text"
                required
                value={formData.schoolName}
                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Official School Motto *</label>
              <input
                type="text"
                required
                value={formData.schoolMotto}
                onChange={(e) => setFormData({ ...formData, schoolMotto: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl italic font-semibold text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Campus Location / Town *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">City / Region *</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Country *</label>
              <input
                type="text"
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Postal &amp; Physical Address *</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full text-xs px-3.5 py-2.5 border rounded-xl"
            />
          </div>
        </div>

        {/* SECTION 3: HOMEPAGE HERO SHOWCASE */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-black text-slate-900 text-base border-b pb-3 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-amber-500" />
            3. Homepage Showcase &amp; Statistics
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Hero Main Title / Headline *</label>
            <input
              type="text"
              required
              value={formData.heroTitle}
              onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
              className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-extrabold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Hero Subtitle / Description *</label>
            <textarea
              rows={2}
              required
              value={formData.heroSubtitle}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
              className="w-full text-xs px-3.5 py-2.5 border rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Top Announcement Ticker Banner</label>
            <input
              type="text"
              value={formData.announcementTicker}
              onChange={(e) => setFormData({ ...formData, announcementTicker: e.target.value })}
              className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-semibold text-amber-900 bg-amber-50/70"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">BECE Distinction Rate</label>
              <input
                type="text"
                value={formData.beceDistinctionRate}
                onChange={(e) => setFormData({ ...formData, beceDistinctionRate: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl font-bold text-center"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Student Enrollment Display</label>
              <input
                type="text"
                value={formData.studentCountDisplay}
                onChange={(e) => setFormData({ ...formData, studentCountDisplay: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl font-bold text-center"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Faculty Count Display</label>
              <input
                type="text"
                value={formData.teacherCountDisplay}
                onChange={(e) => setFormData({ ...formData, teacherCountDisplay: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl font-bold text-center"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Years of Excellence</label>
              <input
                type="text"
                value={formData.yearsOfExcellence}
                onChange={(e) => setFormData({ ...formData, yearsOfExcellence: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl font-bold text-center"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: HEADMASTER'S PROFILE & SPEECH */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-black text-slate-900 text-base border-b pb-3 flex items-center">
            <User className="w-5 h-5 mr-2 text-school-navy-900" />
            4. Headmaster / Principal&apos;s Welcome
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Headmaster / Director Name *</label>
              <input
                type="text"
                required
                value={formData.headmasterName}
                onChange={(e) => setFormData({ ...formData, headmasterName: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Official Academic Title *</label>
              <input
                type="text"
                required
                value={formData.headmasterTitle}
                onChange={(e) => setFormData({ ...formData, headmasterTitle: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Headmaster Photo URL</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              value={formData.headmasterPhotoUrl || ''}
              onChange={(e) => setFormData({ ...formData, headmasterPhotoUrl: e.target.value })}
              className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Headmaster&apos;s Welcome Speech *</label>
            <textarea
              rows={3}
              required
              value={formData.headmasterMessage}
              onChange={(e) => setFormData({ ...formData, headmasterMessage: e.target.value })}
              className="w-full text-xs px-3.5 py-2.5 border rounded-xl italic leading-relaxed"
            />
          </div>
        </div>

        {/* SECTION 5: CONTACT CHANNELS */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-black text-slate-900 text-base border-b pb-3 flex items-center">
            <Phone className="w-5 h-5 mr-2 text-school-navy-900" />
            5. Contact Numbers &amp; Inquiries
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Primary Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.primaryPhone}
                onChange={(e) => setFormData({ ...formData, primaryPhone: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Secondary / WhatsApp Line</label>
              <input
                type="tel"
                value={formData.secondaryPhone}
                onChange={(e) => setFormData({ ...formData, secondaryPhone: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">General Inquiries Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Admissions Desk Email</label>
              <input
                type="email"
                value={formData.admissionsEmail}
                onChange={(e) => setFormData({ ...formData, admissionsEmail: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-semibold"
              />
            </div>
          </div>
        </div>

        {/* SECTION 6: ACADEMIC CALENDAR & GRADING */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-black text-slate-900 text-base border-b pb-3 flex items-center">
            <Award className="w-5 h-5 mr-2 text-school-navy-900" />
            6. Academic Term &amp; National Grading Scale
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Academic Year</label>
              <input
                type="text"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Current Term</label>
              <select
                value={formData.currentTerm}
                onChange={(e) => setFormData({ ...formData, currentTerm: e.target.value as any })}
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl bg-white font-semibold"
              >
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
                <option value="Term 3">Term 3</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Official Grading Scale</label>
              <select
                value={formData.gradingScale}
                onChange={(e) => setFormData({ ...formData, gradingScale: e.target.value as any })}
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl bg-white font-semibold"
              >
                <option value="NaCCA_9_POINT">Ghana NaCCA 9-Point Scale (1 - 9)</option>
                <option value="LETTER_GRADE_AF">Letter Grade Scale (A1 - F9)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bottom Save Action Button */}
        <div className="flex justify-end p-4 bg-white rounded-3xl border border-slate-200 shadow-xs">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-school-navy-950 to-school-navy-900 hover:from-school-navy-900 hover:to-school-navy-800 text-white font-black text-sm shadow-xl flex items-center space-x-2 border border-amber-400/30 transition-all"
          >
            <Save className="w-5 h-5 text-amber-400" />
            <span>Publish All Changes to System</span>
          </button>
        </div>
      </form>
    </div>
  );
}
