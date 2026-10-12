'use client';

import React, { useState } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

export default function ContactPage() {
  const { settings } = useSchool();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // In real life, sends to admissions/admin email
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Navbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-gradient-to-r from-school-navy-950 via-school-navy-900 to-school-navy-950 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-amber-400 font-bold uppercase tracking-wider text-xs bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Reach Our Administration
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold mt-3 tracking-tight">
              Contact & Campus Location
            </h1>
            <p className="text-slate-300 mt-2 text-base sm:text-lg max-w-3xl">
              We welcome prospective parents, transfers, visitors, and educational partners. Visit our campus in {settings.locationCity || 'Anaji-Mpatado'} or drop us a line below.
            </p>
          </div>
        </section>

        {/* Contact Information & Form Grid */}
        <section className="py-20 bg-transparent relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Contact Cards */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-bold text-school-navy-800 uppercase tracking-widest bg-school-navy-100 px-3 py-1 rounded-md">
                    Direct Contacts
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                    {settings.schoolName}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {settings.address}, {settings.locationCountry || 'Ghana'}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-blended-card hover-lift flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-school-navy-50 text-school-navy-900 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Physical Campus Address</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{settings.address}</p>
                      <p className="text-[11px] text-amber-700 font-semibold mt-1">Landmark: Along Anaji-Mpatado Bypass Highway</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-blended-card hover-lift flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-school-navy-50 text-school-navy-900 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Telephone & WhatsApp</h4>
                      <p className="text-xs text-slate-700 mt-0.5 font-medium">{settings.primaryPhone} (Main Office)</p>
                      <p className="text-xs text-slate-600 font-medium">{settings.secondaryPhone} (Admissions Desk)</p>
                      <p className="text-[11px] text-slate-400 mt-1">Available Mon - Fri, 7:00 AM - 4:30 PM GMT</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-blended-card hover-lift flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-school-navy-50 text-school-navy-900 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Email Inquiries</h4>
                      <p className="text-xs text-slate-700 mt-0.5">{settings.email}</p>
                      <p className="text-xs text-slate-600">{settings.admissionsEmail}</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-blended-card hover-lift flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-school-navy-50 text-school-navy-900 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Official Working Hours</h4>
                      <p className="text-xs text-slate-600 mt-0.5">Monday to Friday: 7:00 AM – 4:30 PM</p>
                      <p className="text-xs text-slate-600">Saturday: 9:00 AM – 1:00 PM (Admissions Desk Only)</p>
                      <p className="text-xs text-rose-600 mt-0.5">Sunday: Closed for Worship & Rest</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Inquiry Form */}
              <div className="lg:col-span-7">
                <div className="bg-blended-card rounded-2xl p-6 sm:p-8">
                  <div className="mb-6">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase">
                      Direct Message
                    </span>
                    <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                      Send an Inquiry
                    </h2>
                    <p className="text-slate-600 text-xs mt-1">
                      Have questions regarding admissions, transfer placement, or school transport? Fill out this quick form.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-8 text-center space-y-4 animate-in fade-in">
                      <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-emerald-950">Thank You For Reaching Out!</h3>
                      <p className="text-xs text-slate-700 max-w-md mx-auto">
                        Your message has been received by our Head of Administration. We will contact you at <strong>{form.email || form.phone}</strong> promptly.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                        }}
                        className="px-5 py-2.5 rounded-xl bg-school-navy-900 text-white text-xs font-semibold hover:bg-school-navy-800"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Samuel K. Mensah"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-school-navy-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. +233 24 123 4567"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-school-navy-900"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                          <input
                            type="email"
                            placeholder="parent@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-school-navy-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry Subject *</label>
                          <select
                            value={form.subject}
                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                            className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-school-navy-900"
                          >
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Admissions & Placement">Admissions & Placement</option>
                            <option value="Fees & Payment Schedules">Fees & Payment Schedules</option>
                            <option value="School Bus Transport">School Bus Transport</option>
                            <option value="Academic Counseling">Academic Counseling</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message or Question *</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="How can we assist you and your child today?"
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-school-navy-900"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-school-navy-900 hover:bg-school-navy-800 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center space-x-2"
                      >
                        <Send className="w-4 h-4 text-amber-400" />
                        <span>Submit Message to Office</span>
                      </button>
                    </form>
                  )}

                  {/* Campus Map Placeholder */}
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <h4 className="font-bold text-slate-900 text-xs mb-3 flex items-center">
                      <Building className="w-4 h-4 mr-1.5 text-school-navy-900" />
                      {settings.locationCity || 'Anaji-Mpatado'} Campus Map & Directions
                    </h4>
                    <div className="rounded-xl overflow-hidden border border-slate-300 h-48 bg-slate-200 relative flex items-center justify-center text-center p-4">
                      <div className="space-y-1">
                        <MapPin className="w-8 h-8 text-rose-600 mx-auto animate-bounce" />
                        <p className="font-bold text-xs text-slate-900">{settings.schoolName} Campus</p>
                        <p className="text-[11px] text-slate-600">{settings.address}</p>
                        <span className="inline-block mt-1 text-[10px] bg-white px-2 py-0.5 rounded shadow text-slate-700">
                          GPS Coordinates: 4.9351° N, 1.7682° W
                        </span>
                      </div>
                    </div>
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
