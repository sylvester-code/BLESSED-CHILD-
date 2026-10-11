'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSchool, THEME_PALETTES } from '@/context/SchoolContext';
import { SchoolLogo } from '@/components/common/SchoolLogo';
import {
  Palette,
  Shield,
  Globe,
  MapPin,
  Share2,
  Award,
  Lock,
  Eye,
  Sparkles,
  Check,
  CheckCircle2,
  AlertCircle,
  Upload,
  RotateCcw,
  Save,
  DollarSign,
  Bell,
  User,
  GraduationCap,
  Layout,
  Phone,
  Mail,
  Sliders,
  KeyRound,
  ExternalLink,
  MessageCircle
} from 'lucide-react';

export default function SettingsAdminPage() {
  const {
    settings,
    updateSettings,
    adminCreds,
    updateAdminCredentials,
    resetToDemo,
    logAuditEvent
  } = useSchool();

  const [activeTab, setActiveTab] = useState<'theme' | 'identity' | 'website' | 'contact' | 'academic' | 'security'>('theme');
  const [formData, setFormData] = useState({ ...settings });
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Admin credentials state
  const [adminUsername, setAdminUsername] = useState(adminCreds.username);
  const [adminPassword, setAdminPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [credError, setCredError] = useState('');
  const [credSuccess, setCredSuccess] = useState('');

  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const headmasterPhotoInputRef = useRef<HTMLInputElement>(null);

  // Sync formData when settings change externally
  useEffect(() => {
    setFormData({ ...settings });
  }, [settings]);

  useEffect(() => {
    setAdminUsername(adminCreds.username);
  }, [adminCreds.username]);

  // Curated Royal Crest Presets
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
    },
    {
      name: 'Golden Laurels & Crown',
      url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=250&q=80',
      description: 'Prestige, honor and academic triumph'
    },
    {
      name: 'Wisdom Tree of Growth',
      url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=250&q=80',
      description: 'Nurturing foundational development'
    }
  ];

  // Theme presets list
  const themeOptions = [
    {
      id: 'navy-gold',
      name: 'Classic Royal Navy & Gold',
      desc: 'Collegiate, authoritative & traditional Ghanaian excellence',
      primaryBg: '#0b1c3d',
      accentBg: '#d4a712',
      badge: 'Default Theme'
    },
    {
      id: 'emerald-gold',
      name: 'Majestic Emerald & Gold',
      desc: 'Nurturing, vibrant, prestigious forest green theme',
      primaryBg: '#042316',
      accentBg: '#f59e0b',
      badge: 'Popular'
    },
    {
      id: 'burgundy-gold',
      name: 'Imperial Burgundy & Champagne',
      desc: 'Rich crimson velvet, stately heritage & leadership',
      primaryBg: '#270711',
      accentBg: '#f59e0b',
      badge: 'Heritage'
    },
    {
      id: 'sapphire-amber',
      name: 'Electric Sapphire & Amber',
      desc: 'Vibrant modern cobalt, high-tech STEM & innovation',
      primaryBg: '#031738',
      accentBg: '#f59e0b',
      badge: 'STEM Focused'
    },
    {
      id: 'amethyst-gold',
      name: 'Regal Royal Purple & Gold',
      desc: 'Distinguished wisdom, nobility & artistic distinction',
      primaryBg: '#1a052e',
      accentBg: '#f59e0b',
      badge: 'Executive'
    },
    {
      id: 'obsidian-cyan',
      name: 'Modern Obsidian & Cyan',
      desc: 'Clean ultra-modern dark slate with vibrant cyan accents',
      primaryBg: '#020617',
      accentBg: '#06b6d4',
      badge: 'Modern'
    }
  ];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image file is too large. Please select an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, logoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeadmasterPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image file is too large. Please select an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, headmasterPhotoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateSettings(formData);
    logAuditEvent('Settings', `Super Admin updated platform settings, identity (${formData.schoolName}) and interface theme (${formData.themePreset || 'default'})`);
    setSuccessMessage('System configuration, school identity, motto, and interface updated successfully!');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setCredError('');
    setCredSuccess('');

    if (adminPassword && adminPassword !== confirmPassword) {
      setCredError('New password and confirmation do not match.');
      return;
    }

    const res = updateAdminCredentials(adminUsername, adminPassword ? adminPassword : undefined);
    if (!res.success) {
      setCredError(res.error || 'Failed to update admin credentials.');
      return;
    }

    setCredSuccess('Super Administrator username and credentials updated successfully!');
    setAdminPassword('');
    setConfirmPassword('');
    setTimeout(() => setCredSuccess(''), 4000);
  };

  // Preview colors for simulated live components
  const activePalette = THEME_PALETTES[formData.themePreset || 'navy-gold'] || THEME_PALETTES['navy-gold'];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md inline-flex mb-1 border border-amber-200/60">
            <Sliders className="w-3.5 h-3.5 text-amber-600" />
            <span>Super Administrator Control Center</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            System Interface, Identity &amp; Platform Settings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Full control over the system interface, theme palette, school name, motto, crest, content, and master access.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center space-x-1.5 transition-colors border border-slate-200"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </Link>

          <button
            onClick={() => handleSaveSettings()}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-school-navy-950 to-school-navy-900 hover:from-school-navy-900 hover:to-school-navy-800 text-white font-black text-xs flex items-center space-x-2 shadow-md hover:shadow-lg transition-all border border-amber-400/20"
          >
            <Save className="w-4 h-4 text-amber-400" />
            <span>Save &amp; Apply Changes</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center space-x-2.5 animate-in fade-in shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Real-Time Live System Preview Strip */}
      <div className="bg-slate-900 text-white p-5 rounded-3xl border border-slate-800 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              Real-Time Interface Simulation Preview
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            Active Theme: {activePalette.name}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Simulated Navbar Header */}
          <div className="bg-white text-slate-900 p-3 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-2.5 min-w-0">
            <div
              style={{ backgroundColor: activePalette.navy950 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center p-1 flex-shrink-0 overflow-hidden border border-amber-400/40"
            >
              {formData.logoUrl ? (
                <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-contain" />
              ) : (
                <GraduationCap className="w-4 h-4 text-amber-400" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-bold text-xs text-slate-950 block truncate">
                {formData.schoolName || 'School Name'}
              </span>
              <span className="text-[10px] text-amber-700 italic block truncate">
                &ldquo;{formData.schoolMotto || 'Official Motto'}&rdquo;
              </span>
            </div>
            <span className="text-[9px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded uppercase flex-shrink-0">
              Navbar
            </span>
          </div>

          {/* Simulated Admin Sidebar Header */}
          <div
            style={{ backgroundColor: activePalette.navy950 }}
            className="text-white p-3 rounded-xl border border-slate-800 shadow-xs flex items-center space-x-2.5 min-w-0"
          >
            <div
              style={{ backgroundColor: activePalette.navy900 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center p-1 flex-shrink-0 overflow-hidden border border-amber-400/40"
            >
              {formData.logoUrl ? (
                <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-contain" />
              ) : (
                <GraduationCap className="w-4 h-4 text-amber-400" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-bold text-xs text-white block truncate">
                {formData.shortName || formData.schoolName || 'Portal'}
              </span>
              <span className="text-[10px] text-amber-400 font-mono block truncate">
                Super Admin Console
              </span>
            </div>
            <span className="text-[9px] bg-white/10 text-amber-300 font-bold px-1.5 py-0.5 rounded uppercase flex-shrink-0">
              Admin
            </span>
          </div>

          {/* Simulated Terminal Report Card Banner */}
          <div className="bg-amber-50/70 border border-amber-200 text-slate-900 p-3 rounded-xl shadow-xs flex items-center space-x-2.5 min-w-0">
            <Award className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="font-extrabold text-[11px] text-slate-900 block truncate">
                Terminal Report Header
              </span>
              <span className="text-[10px] text-slate-600 block truncate">
                {formData.schoolName} • {formData.academicYear}
              </span>
            </div>
            <span className="text-[9px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded uppercase flex-shrink-0">
              Reports
            </span>
          </div>
        </div>
      </div>

      {/* Tab Navigation Pill Bar */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <button
          type="button"
          onClick={() => setActiveTab('theme')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'theme'
              ? 'bg-school-navy-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Interface &amp; Theme Engine</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('identity')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'identity'
              ? 'bg-school-navy-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>School Identity &amp; Motto</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('website')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'website'
              ? 'bg-school-navy-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Website Showcase &amp; Leadership</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('contact')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'contact'
              ? 'bg-school-navy-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Location &amp; Contacts</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('academic')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'academic'
              ? 'bg-school-navy-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Academic &amp; Financial</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'security'
              ? 'bg-school-navy-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Super Admin Account</span>
        </button>
      </div>

      {/* TAB 1: INTERFACE & THEME ENGINE */}
      {activeTab === 'theme' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Theme Palette Selection */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div>
              <h3 className="font-black text-slate-900 text-base flex items-center">
                <Palette className="w-5 h-5 mr-2 text-amber-500" />
                1. System Theme &amp; Color Scheme
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Choose the color palette of the entire application. Buttons, headers, sidebars, navigation bars, and terminal reports will immediately adapt.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {themeOptions.map((opt) => {
                const isSelected = (formData.themePreset || 'navy-gold') === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, themePreset: opt.id as any })}
                    className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                      isSelected
                        ? 'border-amber-500 ring-2 ring-amber-400 bg-amber-50/30 shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span
                          className="w-6 h-6 rounded-lg shadow-sm border"
                          style={{ backgroundColor: opt.primaryBg }}
                        ></span>
                        <span
                          className="w-6 h-6 rounded-lg shadow-sm border"
                          style={{ backgroundColor: opt.accentBg }}
                        ></span>
                      </div>
                      {isSelected ? (
                        <span className="flex items-center space-x-1 text-[11px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-bold px-1.5 py-0.5 bg-slate-100 rounded">
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p className="font-extrabold text-xs text-slate-900">{opt.name}</p>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Announcement Ticker Configuration */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-base flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-amber-500" />
                  2. Top Announcement Marquee Ticker
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Display an urgent notice, admissions alert, or school news marquee along the very top of every page.
                </p>
              </div>

              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.showAnnouncementTicker !== false}
                  onChange={(e) => setFormData({ ...formData, showAnnouncementTicker: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                />
                <span className="text-xs font-bold text-slate-700">Enable Ticker</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Announcement Notice Content
              </label>
              <textarea
                rows={2}
                value={formData.announcementTicker}
                onChange={(e) => setFormData({ ...formData, announcementTicker: e.target.value })}
                placeholder="e.g. Admissions ongoing for 2024/2025 Academic Year • Blessed Child achieves 100% BECE Distinction rate..."
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-medium text-slate-900"
              />
            </div>
          </div>

          {/* Interface Feature Visibility Toggles */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-black text-slate-900 text-base border-b pb-3 flex items-center">
              <Layout className="w-5 h-5 mr-2 text-school-navy-900" />
              3. Interface Feature &amp; Component Toggles
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <label className="p-4 rounded-2xl border border-slate-200 hover:bg-slate-50/80 cursor-pointer flex items-start space-x-3 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.showAdmissionsBanner !== false}
                  onChange={(e) => setFormData({ ...formData, showAdmissionsBanner: e.target.checked })}
                  className="w-4 h-4 text-school-navy-900 rounded mt-0.5 focus:ring-school-navy-900"
                />
                <div>
                  <span className="font-extrabold text-xs text-slate-900 block">Show Admissions Hero Floating Badge</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Displays &ldquo;Admissions Open for {formData.academicYear}&rdquo; badge on hero headline.</span>
                </div>
              </label>

              <label className="p-4 rounded-2xl border border-slate-200 hover:bg-slate-50/80 cursor-pointer flex items-start space-x-3 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.showStatsCounter !== false}
                  onChange={(e) => setFormData({ ...formData, showStatsCounter: e.target.checked })}
                  className="w-4 h-4 text-school-navy-900 rounded mt-0.5 focus:ring-school-navy-900"
                />
                <div>
                  <span className="font-extrabold text-xs text-slate-900 block">Show Homepage Statistics Grid</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Shows BECE pass rate, student count, teacher count, and years of excellence counters.</span>
                </div>
              </label>

              <label className="p-4 rounded-2xl border border-slate-200 hover:bg-slate-50/80 cursor-pointer flex items-start space-x-3 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.showHeadmasterSection !== false}
                  onChange={(e) => setFormData({ ...formData, showHeadmasterSection: e.target.checked })}
                  className="w-4 h-4 text-school-navy-900 rounded mt-0.5 focus:ring-school-navy-900"
                />
                <div>
                  <span className="font-extrabold text-xs text-slate-900 block">Show Headmaster Address Section</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Displays principal portrait, official credentials, and welcome address on homepage.</span>
                </div>
              </label>

              <label className="p-4 rounded-2xl border border-slate-200 hover:bg-slate-50/80 cursor-pointer flex items-start space-x-3 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.showWhatsAppFloating !== false}
                  onChange={(e) => setFormData({ ...formData, showWhatsAppFloating: e.target.checked })}
                  className="w-4 h-4 text-school-navy-900 rounded mt-0.5 focus:ring-school-navy-900"
                />
                <div>
                  <span className="font-extrabold text-xs text-slate-900 block">Show Floating WhatsApp Quick Inquiries</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Enables a modern floating WhatsApp chat bubble in the bottom right corner.</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SCHOOL IDENTITY & BRAND (NAME, MOTTO, CREST) */}
      {activeTab === 'identity' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Core Name & Motto */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <h3 className="font-black text-slate-900 text-base border-b pb-3 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-school-navy-900" />
              1. Official Name, Short Name &amp; Motto
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Official School Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  placeholder="e.g. Blessed Child School Complex"
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-bold text-slate-900"
                />
                <p className="text-[10px] text-slate-400 mt-1">Appears across all banners, portal headers, official reports, and diplomas.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Short Name / Acronym
                </label>
                <input
                  type="text"
                  value={formData.shortName || ''}
                  onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                  placeholder="e.g. Blessed Child or BCS"
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-bold text-slate-900"
                />
                <p className="text-[10px] text-slate-400 mt-1">Used in compact mobile headers and sidebar logos.</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Official School Motto *
              </label>
              <input
                type="text"
                required
                value={formData.schoolMotto}
                onChange={(e) => setFormData({ ...formData, schoolMotto: e.target.value })}
                placeholder="e.g. Knowledge, Integrity and Excellence"
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl italic font-semibold text-slate-900"
              />
              <p className="text-[10px] text-slate-400 mt-1">Displays on navbar, footer, terminal report cards, and official letterheads.</p>
            </div>
          </div>

          {/* School Crest & Logo */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="border-b pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-black text-slate-900 text-base flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-amber-500" />
                  2. Official School Crest &amp; Emblem Logo
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Upload your school crest or select from curated royal emblems. Persists across the entire web application and report printouts.
                </p>
              </div>

              {formData.logoUrl && (
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, logoUrl: '' }))}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl transition-colors flex items-center space-x-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Revert to Default Crest</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Current Logo Preview */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block text-center">
                  Active Crest Preview
                </span>

                <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div
                    style={{ backgroundColor: activePalette.navy950 }}
                    className="w-24 h-24 rounded-2xl flex items-center justify-center p-2 border-2 border-amber-400/50 shadow-lg overflow-hidden"
                  >
                    {formData.logoUrl ? (
                      <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <GraduationCap className="w-12 h-12 text-amber-400" />
                    )}
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-black text-slate-900 block truncate max-w-[200px]">
                      {formData.schoolName}
                    </span>
                    <span className="text-[10px] text-amber-600 font-bold block truncate max-w-[200px]">
                      {formData.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Upload & Image URL */}
              <div className="lg:col-span-2 space-y-5">
                <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                      <Upload className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Upload Logo from Your Computer / Phone</h4>
                      <p className="text-[11px] text-slate-600">Supports PNG, SVG, JPG, WebP with transparent or white background.</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 pt-1">
                    <input
                      type="file"
                      ref={logoFileInputRef}
                      onChange={handleLogoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => logoFileInputRef.current?.click()}
                      className="px-4 py-2 bg-school-navy-950 hover:bg-school-navy-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center space-x-1.5"
                    >
                      <Upload className="w-3.5 h-3.5 text-amber-400" />
                      <span>Choose File from Device...</span>
                    </button>
                    <span className="text-[11px] text-slate-500">Max size 2MB</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Or Enter Hosted Web Logo Image URL:
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/crest.png"
                    value={formData.logoUrl || ''}
                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-mono text-slate-800"
                  />
                </div>

                {/* 1-Click Emblem Presets */}
                <div className="space-y-2 pt-2 border-t">
                  <label className="block text-xs font-bold text-slate-700">
                    Or Choose from 1-Click Curated Royal Emblems:
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
                              ? 'bg-amber-50 border-amber-400 ring-1 ring-amber-400 shadow-xs'
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
        </div>
      )}

      {/* TAB 3: WEBSITE SHOWCASE & LEADERSHIP */}
      {activeTab === 'website' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Hero Headlines */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-black text-slate-900 text-base border-b pb-3 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-amber-500" />
              1. Homepage Hero Showcase Headlines
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hero Main Headline (H1) *
              </label>
              <input
                type="text"
                required
                value={formData.heroTitle}
                onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hero Subtitle / Narrative Description *
              </label>
              <textarea
                rows={2}
                required
                value={formData.heroSubtitle}
                onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">BECE Distinction %</label>
                <input
                  type="text"
                  value={formData.beceDistinctionRate}
                  onChange={(e) => setFormData({ ...formData, beceDistinctionRate: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-xl font-bold text-center"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Student Enrollment</label>
                <input
                  type="text"
                  value={formData.studentCountDisplay}
                  onChange={(e) => setFormData({ ...formData, studentCountDisplay: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-xl font-bold text-center"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Faculty Count</label>
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

          {/* Welcome Message */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-black text-slate-900 text-base border-b pb-3 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-school-navy-900" />
              2. Welcome Message
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Welcome Section Heading</label>
              <input
                type="text"
                value={formData.welcomeMessageTitle}
                onChange={(e) => setFormData({ ...formData, welcomeMessageTitle: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Welcome Message Narrative</label>
              <textarea
                rows={3}
                value={formData.welcomeMessageBody}
                onChange={(e) => setFormData({ ...formData, welcomeMessageBody: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl leading-relaxed text-slate-800"
              />
            </div>
          </div>

          {/* Headmaster / Principal's Profile & Address */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-black text-slate-900 text-base border-b pb-3 flex items-center">
              <User className="w-5 h-5 mr-2 text-school-navy-900" />
              3. Headmaster / Principal&apos;s Profile &amp; Welcome Speech
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Headmaster / Director Name *</label>
                <input
                  type="text"
                  required
                  value={formData.headmasterName}
                  onChange={(e) => setFormData({ ...formData, headmasterName: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Academic Title *</label>
                <input
                  type="text"
                  required
                  value={formData.headmasterTitle}
                  onChange={(e) => setFormData({ ...formData, headmasterTitle: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Headmaster Portrait Photo URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formData.headmasterPhotoUrl || ''}
                  onChange={(e) => setFormData({ ...formData, headmasterPhotoUrl: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-mono text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Or Upload Photo</label>
                <input
                  type="file"
                  ref={headmasterPhotoInputRef}
                  onChange={handleHeadmasterPhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => headmasterPhotoInputRef.current?.click()}
                  className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-slate-600" />
                  <span>Choose Photo...</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Headmaster&apos;s Welcome Speech *</label>
              <textarea
                rows={3}
                required
                value={formData.headmasterMessage}
                onChange={(e) => setFormData({ ...formData, headmasterMessage: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl italic leading-relaxed text-slate-800"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LOCATION & CONTACTS */}
      {activeTab === 'contact' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Campus Location */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-black text-slate-900 text-base border-b pb-3 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-school-navy-900" />
              1. Physical Campus Location &amp; Addresses
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Campus Suburb / Town *</label>
                <input
                  type="text"
                  required
                  value={formData.locationCity || formData.city}
                  onChange={(e) => setFormData({ ...formData, locationCity: e.target.value, city: e.target.value })}
                  placeholder="e.g. Anaji-Mpatado"
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Metropolis / Region *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Sekondi-Takoradi, Ghana"
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Country *</label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value, locationCountry: e.target.value })}
                  placeholder="e.g. Ghana"
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-bold"
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
                placeholder="Plot 42, Off Anaji Highway, P.O. Box AX 1420..."
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl"
              />
            </div>
          </div>

          {/* Contact Numbers & Inquiries */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-black text-slate-900 text-base border-b pb-3 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-school-navy-900" />
              2. Direct Telephones, WhatsApp &amp; Inquiries
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Primary Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.primaryPhone}
                  onChange={(e) => setFormData({ ...formData, primaryPhone: e.target.value })}
                  placeholder="+233 24 456 7890"
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Secondary / Admissions Line</label>
                <input
                  type="tel"
                  value={formData.secondaryPhone}
                  onChange={(e) => setFormData({ ...formData, secondaryPhone: e.target.value })}
                  placeholder="+233 50 123 4567"
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Business Number</label>
                <input
                  type="tel"
                  value={formData.whatsappNumber || ''}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  placeholder="+233 24 456 7890"
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">General Inquiries Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="info@blessedchildschool.edu.gh"
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Admissions Desk Email</label>
                <input
                  type="email"
                  value={formData.admissionsEmail}
                  onChange={(e) => setFormData({ ...formData, admissionsEmail: e.target.value })}
                  placeholder="admissions@blessedchildschool.edu.gh"
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Website URL</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://blessedchildschool.edu.gh"
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-semibold font-mono"
                />
              </div>
            </div>
          </div>

          {/* Social Channels */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-black text-slate-900 text-base border-b pb-3 flex items-center">
              <Share2 className="w-5 h-5 mr-2 text-school-navy-900" />
              3. Social Media Presence
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Facebook Page URL</label>
                <input
                  type="url"
                  value={formData.facebookUrl || ''}
                  onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                  placeholder="https://facebook.com/..."
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Instagram Profile URL</label>
                <input
                  type="url"
                  value={formData.instagramUrl || ''}
                  onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                  placeholder="https://instagram.com/..."
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">YouTube Channel URL</label>
                <input
                  type="url"
                  value={formData.youtubeUrl || ''}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  placeholder="https://youtube.com/@..."
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ACADEMIC & FINANCIAL ENGINE */}
      {activeTab === 'academic' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Academic Calendar */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-black text-slate-900 text-base border-b pb-3 flex items-center">
              <Award className="w-5 h-5 mr-2 text-school-navy-900" />
              1. Academic Session &amp; National Evaluation Scale
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Active Academic Year</label>
                <input
                  type="text"
                  value={formData.academicYear}
                  onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                  placeholder="e.g. 2024/2025"
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Term</label>
                <select
                  value={formData.currentTerm}
                  onChange={(e) => setFormData({ ...formData, currentTerm: e.target.value as any })}
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-bold bg-white"
                >
                  <option value="Term 1">Term 1</option>
                  <option value="Term 2">Term 2</option>
                  <option value="Term 3">Term 3</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">National Grading Scale</label>
                <select
                  value={formData.gradingScale}
                  onChange={(e) => setFormData({ ...formData, gradingScale: e.target.value as any })}
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-bold bg-white"
                >
                  <option value="NaCCA_9_POINT">Ghana NaCCA 9-Point Scale (1 - 9)</option>
                  <option value="LETTER_GRADE_AF">Letter Grade Scale (A1 - F9)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Currency & Finance */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-black text-slate-900 text-base border-b pb-3 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-emerald-600" />
              2. Financial Currency Settings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Currency Symbol</label>
                <input
                  type="text"
                  value={formData.currencySymbol}
                  onChange={(e) => setFormData({ ...formData, currencySymbol: e.target.value })}
                  placeholder="e.g. GH₵"
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Currency Code</label>
                <input
                  type="text"
                  value={formData.currencyCode}
                  onChange={(e) => setFormData({ ...formData, currencyCode: e.target.value })}
                  placeholder="e.g. GHS"
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-bold text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* SMS & Messaging Provider */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-black text-slate-900 text-base border-b pb-3 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-amber-600" />
              3. Parent SMS Broadcasting Gateway
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">SMS Gateway Engine</label>
                <select
                  value={formData.smsGateway || 'Hubtel'}
                  onChange={(e) => setFormData({ ...formData, smsGateway: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-bold bg-white"
                >
                  <option value="Hubtel">Hubtel Ghana SMS Gateway</option>
                  <option value="Arkesel">Arkesel SMS Gateway (Ghana)</option>
                  <option value="Twilio">Twilio Global SMS</option>
                  <option value="Simulation">Built-in Simulation Engine (Active)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Alpha-Numeric Sender ID</label>
                <input
                  type="text"
                  value={formData.smsSenderId || 'BLESSED-SCH'}
                  onChange={(e) => setFormData({ ...formData, smsSenderId: e.target.value })}
                  placeholder="e.g. BLESSED-SCH"
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-bold"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: SUPER ADMIN CREDENTIALS */}
      {activeTab === 'security' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div>
              <h3 className="font-black text-slate-900 text-base flex items-center">
                <Lock className="w-5 h-5 mr-2 text-amber-600" />
                Super Administrator Master Access Management
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Change your Super Admin username and master password. These credentials unlock the admin security gate.
              </p>
            </div>

            {credSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{credSuccess}</span>
              </div>
            )}

            {credError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-bold flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{credError}</span>
              </div>
            )}

            {/* Currently Active Credentials Badge */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                  Currently Active Master Login Credentials
                </span>
                <p className="text-xs text-slate-300 mt-0.5">
                  Username: <strong className="text-white font-mono">{adminCreds.username}</strong> • Password: <strong className="text-white font-mono">••••••••</strong>
                </p>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full font-bold self-start sm:self-auto">
                Security Active
              </span>
            </div>

            <form onSubmit={handleUpdateCredentials} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Super Administrator Username *
                </label>
                <input
                  type="text"
                  required
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="e.g. BLESSED"
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    New Master Password (Leave blank to keep current)
                  </label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirm New Master Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full text-xs px-3.5 py-2.5 border rounded-xl font-semibold"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-sm transition-all flex items-center space-x-1.5"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Update Super Admin Credentials</span>
                </button>
              </div>
            </form>
          </div>

          {/* Demo Reset */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-rose-600 text-sm">System Maintenance &amp; Demo Reset</h3>
            <p className="text-xs text-slate-600">
              Need to restore student records, test scores, or financial transactions to the default demo state?
            </p>
            <button
              type="button"
              onClick={() => {
                if (confirm('Are you sure you want to reset all mock students, fees, and scores to default demo values?')) {
                  resetToDemo();
                }
              }}
              className="px-4 py-2.5 bg-rose-50 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 hover:bg-rose-100 transition-colors"
            >
              Reset All Student &amp; Academic Data to Demo Defaults
            </button>
          </div>
        </div>
      )}

      {/* Persistent Bottom Save Bar */}
      <div className="sticky bottom-4 z-30 p-4 bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200 shadow-xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">
              Auto-persisted to system memory &amp; local storage
            </span>
            <span className="text-[11px] text-slate-500 block">
              Click save to publish updates immediately across all public pages, portals, and printouts.
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleSaveSettings()}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-school-navy-950 to-school-navy-900 hover:from-school-navy-900 hover:to-school-navy-800 text-white font-black text-sm shadow-xl flex items-center space-x-2 border border-amber-400/30 transition-all hover:scale-102"
        >
          <Save className="w-5 h-5 text-amber-400" />
          <span>Save &amp; Apply All Changes</span>
        </button>
      </div>
    </div>
  );
}
