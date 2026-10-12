'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSchool } from '@/context/SchoolContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import confetti from 'canvas-confetti';
import {
  FileText,
  Search,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  User,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Printer
} from 'lucide-react';
import { AdmissionApplication } from '@/types';

export default function AdmissionsPage() {
  const { settings, classes, admissions, submitAdmissionApplication } = useSchool();

  // Form State
  const [formData, setFormData] = useState({
    applicantFirstName: '',
    applicantLastName: '',
    gender: 'Male' as 'Male' | 'Female',
    dob: '',
    applyingForClass: 'cls-b1',
    previousSchool: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    homeAddress: '',
  });

  const [submittedApp, setSubmittedApp] = useState<AdmissionApplication | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Status Search State
  const [searchCode, setSearchCode] = useState('');
  const [searchedApp, setSearchedApp] = useState<AdmissionApplication | null>(null);
  const [searchError, setSearchError] = useState('');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newApp = submitAdmissionApplication({
        applicantFirstName: formData.applicantFirstName,
        applicantLastName: formData.applicantLastName,
        gender: formData.gender,
        dob: formData.dob || '2018-05-15',
        applyingForClass: formData.applyingForClass,
        previousSchool: formData.previousSchool || 'None / First Time',
        parentName: formData.parentName,
        parentPhone: formData.parentPhone,
        parentEmail: formData.parentEmail,
        homeAddress: formData.homeAddress,
        notes: 'Submitted via Public Online Portal'
      });

      setSubmittedApp(newApp);
      setIsSubmitting(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }, 600);
  };

  const handleTrackStatus = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    setSearchedApp(null);

    const trimmed = searchCode.trim().toUpperCase();
    if (!trimmed) return;

    const found = admissions.find(
      a => a.applicationNo.toUpperCase() === trimmed || a.id.toUpperCase() === trimmed
    );

    if (found) {
      setSearchedApp(found);
    } else {
      setSearchError(`No application record found for code "${trimmed}". Please double-check your code (e.g. BCS-ADM-2025-001) or call our Admissions office.`);
    }
  };

  const faqs = [
    {
      q: "What is the age requirement for Creche and Kindergarten admission?",
      a: "Children can enter our Creche from 6 months to 2 years. Nursery 1 starts at age 3, Nursery 2 at age 4, Kindergarten 1 (KG 1) at age 4-5, and Kindergarten 2 at age 5."
    },
    {
      q: "Are students required to write an entrance assessment?",
      a: "Yes. For Basic 1 through JHS 2, applicants sit for an informal diagnostic placement assessment in English Language and Mathematics to help our academic team accurately place them at their optimum grade level."
    },
    {
      q: "What documents must be submitted with the admission form?",
      a: "Parents should present: (1) Photocopy of Child's Birth Certificate or Weighing Card, (2) Two recent passport-size photographs, (3) Terminal Report Card from previous school (for Primary & JHS transfers), and (4) Medical/immunization card."
    },
    {
      q: "Does the school provide bus transport across the metropolis?",
      a: `Yes! Our school operates a fleet of air-conditioned school buses with designated pickup and drop-off points covering the metropolis.`
    },
    {
      q: "What are the payment options for school fees?",
      a: "Fees are payable per term via MTN Mobile Money, Telecel Cash, direct bank deposit into our GCB Bank account, or cash at the accounts office."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Navbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-gradient-to-r from-school-navy-950 via-school-navy-900 to-school-navy-950 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-amber-400 font-bold uppercase tracking-wider text-xs bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Admissions Portal
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold mt-3 tracking-tight">
              Join the {settings.schoolName} Family
            </h1>
            <p className="text-slate-300 mt-2 text-base sm:text-lg max-w-3xl">
              Enroll your ward for the {settings.academicYear} academic session. Complete the online admission form below or track an existing application status.
            </p>
          </div>
        </section>

        {/* STEP-BY-STEP ADMISSION PROCESS */}
        <section className="py-14 bg-blended-section border-b border-slate-200/60 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">
              4 Simple Steps to Admission
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blended-card p-5 rounded-xl hover-lift relative">
                <span className="w-8 h-8 rounded-full bg-school-navy-900 text-amber-400 font-bold text-sm flex items-center justify-center mb-3">1</span>
                <h4 className="font-bold text-slate-900 text-sm">Submit Online Form</h4>
                <p className="text-slate-600 text-xs mt-1">Complete applicant and parent details below to receive your reference number.</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
                <span className="w-8 h-8 rounded-full bg-school-navy-900 text-amber-400 font-bold text-sm flex items-center justify-center mb-3">2</span>
                <h4 className="font-bold text-slate-900 text-sm">Placement Evaluation</h4>
                <p className="text-slate-600 text-xs mt-1">Short interactive test for Primary & JHS applicants to ensure proper grade alignment.</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
                <span className="w-8 h-8 rounded-full bg-school-navy-900 text-amber-400 font-bold text-sm flex items-center justify-center mb-3">3</span>
                <h4 className="font-bold text-slate-900 text-sm">Parent Interaction</h4>
                <p className="text-slate-600 text-xs mt-1">Brief physical or phone discussion with the Headmaster to discuss expectations.</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
                <span className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center mb-3">4</span>
                <h4 className="font-bold text-slate-900 text-sm">Offer & Enrollment</h4>
                <p className="text-slate-600 text-xs mt-1">Receive official admission letter, pay tuition fees, collect uniforms, and start classes!</p>
              </div>
            </div>
          </div>
        </section>

        {/* APPLICATION FORM & STATUS TRACKER SPLIT */}
        <section className="py-16 bg-transparent relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* LEFT: ONLINE APPLICATION FORM */}
              <div className="lg:col-span-7">
                <div className="bg-blended-card rounded-2xl p-6 sm:p-8">
                  <div className="mb-6">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase">
                      New Enrollment
                    </span>
                    <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                      Online Admission Application
                    </h2>
                    <p className="text-slate-600 text-xs mt-1">
                      Please enter accurate details. Our Admissions Desk will follow up within 24 hours.
                    </p>
                  </div>

                  {submittedApp ? (
                    <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-8 text-center space-y-4 animate-in fade-in zoom-in-95">
                      <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-black text-emerald-950">
                        Application Submitted Successfully!
                      </h3>
                      <p className="text-slate-700 text-sm max-w-md mx-auto">
                        Thank you for applying to {settings.schoolName}. Your official application reference code is:
                      </p>
                      
                      <div className="bg-white border-2 border-dashed border-emerald-400 p-4 rounded-xl inline-block">
                        <p className="text-xs text-slate-500 font-bold uppercase">Application Reference Code</p>
                        <p className="text-2xl sm:text-3xl font-black text-school-navy-950 tracking-wider">
                          {submittedApp.applicationNo}
                        </p>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1">
                        <p><strong>Applicant:</strong> {submittedApp.applicantFirstName} {submittedApp.applicantLastName}</p>
                        <p><strong>Class:</strong> {classes.find(c => c.id === submittedApp.applyingForClass)?.name || submittedApp.applyingForClass}</p>
                        <p><strong>Parent Contact:</strong> {submittedApp.parentPhone}</p>
                      </div>

                      <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                        <button
                          onClick={() => window.print()}
                          className="px-5 py-2.5 rounded-xl bg-school-navy-900 hover:bg-school-navy-800 text-white font-semibold text-xs flex items-center justify-center space-x-2"
                        >
                          <Printer className="w-4 h-4" />
                          <span>Print Slip</span>
                        </button>
                        <button
                          onClick={() => {
                            setSubmittedApp(null);
                            setFormData({
                              applicantFirstName: '',
                              applicantLastName: '',
                              gender: 'Male',
                              dob: '',
                              applyingForClass: 'cls-b1',
                              previousSchool: '',
                              parentName: '',
                              parentPhone: '',
                              parentEmail: '',
                              homeAddress: '',
                            });
                          }}
                          className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs"
                        >
                          Submit Another Application
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      <div className="border-b border-slate-200 pb-3">
                        <h4 className="font-bold text-slate-900 text-sm flex items-center">
                          <User className="w-4 h-4 mr-2 text-school-navy-900" />
                          Applicant (Pupil) Details
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Samuel"
                            value={formData.applicantFirstName}
                            onChange={(e) => setFormData({ ...formData, applicantFirstName: e.target.value })}
                            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-school-navy-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name / Surname *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Mensah"
                            value={formData.applicantLastName}
                            onChange={(e) => setFormData({ ...formData, applicantLastName: e.target.value })}
                            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-school-navy-900 bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Gender *</label>
                          <select
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'Male' | 'Female' })}
                            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-school-navy-900 bg-white"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth *</label>
                          <input
                            type="date"
                            required
                            value={formData.dob}
                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-school-navy-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Class Applying For *</label>
                          <select
                            value={formData.applyingForClass}
                            onChange={(e) => setFormData({ ...formData, applyingForClass: e.target.value })}
                            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-school-navy-900 bg-white font-medium"
                          >
                            {classes.map(c => (
                              <option key={c.id} value={c.id}>
                                {c.name} ({c.level})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Previous School Attended (If applicable)</label>
                        <input
                          type="text"
                          placeholder="e.g. St. Peter's Preparatory, Sekondi (or leave blank if first time)"
                          value={formData.previousSchool}
                          onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                          className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-school-navy-900 bg-white"
                        />
                      </div>

                      <div className="border-b border-slate-200 pb-3 pt-3">
                        <h4 className="font-bold text-slate-900 text-sm flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-school-navy-900" />
                          Parent / Guardian Information
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Parent/Guardian Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Mrs. Vivian Mensah"
                            value={formData.parentName}
                            onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-school-navy-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (WhatsApp Active) *</label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. +233 24 123 4567"
                            value={formData.parentPhone}
                            onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-school-navy-900 bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                          <input
                            type="email"
                            placeholder="parent@example.com"
                            value={formData.parentEmail}
                            onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-school-navy-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Residential Address in Takoradi *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. House 24, Anaji-Mpatado Ridge"
                            value={formData.homeAddress}
                            onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
                            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-school-navy-900 bg-white"
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                        >
                          {isSubmitting ? (
                            <span>Submitting Application...</span>
                          ) : (
                            <>
                              <span>Submit Admission Application</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* RIGHT: TRACK APPLICATION STATUS & FAQS */}
              <div className="lg:col-span-5 space-y-8">
                
                {/* STATUS TRACKER BOX */}
                <div className="bg-school-navy-950 text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-school-navy-800">
                  <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <Search className="w-4 h-4" />
                    <span>Real-Time Status Tracker</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Track Existing Application
                  </h3>
                  <p className="text-slate-300 text-xs mb-4">
                    Already applied? Enter your Application Reference Code below (e.g., <code className="text-amber-300">BCS-ADM-2025-001</code>) to check your review status.
                  </p>

                  <form onSubmit={handleTrackStatus} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. BCS-ADM-2025-001"
                      value={searchCode}
                      onChange={(e) => setSearchCode(e.target.value)}
                      className="flex-1 bg-school-navy-900 border border-slate-700 text-white text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-amber-400 placeholder-slate-500 uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs whitespace-nowrap transition-colors"
                    >
                      Check Status
                    </button>
                  </form>

                  {/* Status Error Message */}
                  {searchError && (
                    <div className="mt-4 p-3 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{searchError}</span>
                    </div>
                  )}

                  {/* Search Result Card */}
                  {searchedApp && (
                    <div className="mt-5 p-4 rounded-xl bg-school-navy-900 border border-slate-700 space-y-3 animate-in fade-in">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="font-mono text-xs text-amber-400 font-bold">{searchedApp.applicationNo}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          searchedApp.status === 'Accepted' || searchedApp.status === 'Enrolled'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : searchedApp.status === 'Interview Scheduled'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                          {searchedApp.status}
                        </span>
                      </div>

                      <div className="text-xs space-y-1 text-slate-300">
                        <p><strong className="text-white">Applicant:</strong> {searchedApp.applicantFirstName} {searchedApp.applicantLastName}</p>
                        <p><strong className="text-white">Class:</strong> {classes.find(c => c.id === searchedApp.applyingForClass)?.name || searchedApp.applyingForClass}</p>
                        <p><strong className="text-white">Submitted:</strong> {searchedApp.submissionDate}</p>
                        {searchedApp.interviewDate && (
                          <p className="text-amber-300 font-semibold">
                            <strong>Interview Date:</strong> {searchedApp.interviewDate}
                          </p>
                        )}
                        {searchedApp.notes && (
                          <p className="text-[11px] text-slate-400 italic">
                            &ldquo;{searchedApp.notes}&rdquo;
                          </p>
                        )}
                      </div>

                      {/* Progress steps */}
                      <div className="pt-2 border-t border-slate-800 grid grid-cols-4 gap-1 text-[9px] text-center text-slate-400">
                        <div className="text-amber-400 font-bold">1. Submitted</div>
                        <div className={searchedApp.status !== 'Submitted' ? 'text-amber-400 font-bold' : ''}>2. Review</div>
                        <div className={searchedApp.status === 'Interview Scheduled' || searchedApp.status === 'Accepted' || searchedApp.status === 'Enrolled' ? 'text-amber-400 font-bold' : ''}>3. Interview</div>
                        <div className={searchedApp.status === 'Accepted' || searchedApp.status === 'Enrolled' ? 'text-emerald-400 font-bold' : ''}>4. Offered</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* ADMISSIONS FAQS ACCORDION */}
                <div className="bg-blended-card rounded-2xl p-6">
                  <div className="flex items-center space-x-2 text-school-navy-900 font-bold text-base mb-4">
                    <HelpCircle className="w-5 h-5 text-amber-600" />
                    <span>Frequently Asked Questions</span>
                  </div>

                  <div className="space-y-3">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="border border-slate-200 rounded-xl bg-white overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                          className="w-full p-3.5 text-left text-xs font-bold text-slate-900 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                          <span>{faq.q}</span>
                          {openFaq === idx ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                        </button>
                        {openFaq === idx && (
                          <div className="px-3.5 pb-3.5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
