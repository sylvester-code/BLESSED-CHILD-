'use client';

import React from 'react';
import Link from 'next/link';
import { useSchool } from '@/context/SchoolContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  GraduationCap,
  Target,
  Compass,
  Award,
  Users,
  ShieldCheck,
  HeartHandshake,
  Lightbulb,
  ArrowRight,
  BookOpen,
  MapPin
} from 'lucide-react';

export default function AboutPage() {
  const { settings, teachers } = useSchool();

  const coreValues = [
    {
      title: "Godliness & Moral Uprightness",
      desc: "Instilling deep spiritual values, prayer, reverence, and fear of God as the true foundation of wisdom.",
      icon: ShieldCheck
    },
    {
      title: "Academic Excellence",
      desc: "Setting the highest intellectual standards and nurturing analytical minds that lead in competitive national assessments.",
      icon: Award
    },
    {
      title: "Integrity & Honesty",
      desc: "Cultivating truthful, principled, and trustworthy young citizens for Ghana and the global community.",
      icon: HeartHandshake
    },
    {
      title: "Discipline & Diligence",
      desc: "Teaching self-mastery, punctual time consciousness, and an unwavering commitment to hard work and perseverance.",
      icon: Target
    },
    {
      title: "Innovation & Technology",
      desc: "Equipping learners with digital competencies, coding, and problem-solving skills to solve 21st-century challenges.",
      icon: Lightbulb
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-gradient-to-r from-school-navy-950 via-school-navy-900 to-school-navy-950 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-amber-400 font-bold uppercase tracking-wider text-xs bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              About Our Institution
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold mt-3 tracking-tight">
              Shaping Destiny with {settings.schoolMotto}
            </h1>
            <p className="text-slate-300 mt-2 text-base sm:text-lg max-w-3xl">
              Learn about the rich history, visionary mission, and dedicated academic leaders powering {settings.schoolName} in {settings.locationCity || 'Anaji-Mpatado'}, {settings.locationCountry || 'Ghana'}.
            </p>
          </div>
        </section>

        {/* History & Story */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold text-school-navy-800 uppercase tracking-widest bg-school-navy-50 px-3 py-1 rounded-md">
                  Our Founding Story
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                  Over {settings.yearsOfExcellence || '16'} Years of Academic Distinctions in {settings.locationCity || 'Anaji-Mpatado'}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Established with a profound vision to bridge the gap between quality education and authentic Christian moral training, {settings.schoolName} began its journey in the fast-growing community of {settings.locationCity || 'Anaji-Mpatado'}, Sekondi-Takoradi.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  From modest beginnings with just two nursery classes, the school has blossomed into an accredited, modern educational center boasting over {settings.studentCountDisplay || '850+'} pupils, an ultra-modern computer and robotics laboratory, a well-stocked library, and an enviable {settings.beceDistinctionRate || '100%'} distinction pass rate in the Basic Education Certificate Examination (BECE).
                </p>
                <div className="pt-2 flex items-center space-x-3 text-xs text-slate-500">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span>Located conveniently at {settings.address}</span>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80"
                    alt="School Building and Assembly Grounds"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-school-navy-950/80 via-transparent to-transparent flex items-end p-6">
                    <p className="text-white text-sm font-semibold">
                      Spacious, secure, and modern campus infrastructure designed for holistic growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Vision Card */}
              <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-amber-400 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  To be the preeminent basic academic institution in Ghana renowned for developing morally upright, intellectually disciplined, and technologically innovative future leaders who positively impact their communities and the nation.
                </p>
              </div>

              {/* Mission Card */}
              <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-school-navy-400 transition-all">
                <div className="w-12 h-12 rounded-xl bg-school-navy-100 text-school-navy-800 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  To provide a supportive, christ-centered educational environment that fosters creative thinking, computational literacy, and strong academic competencies through dedicated teaching, state-of-the-art resources, and robust continuous assessment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-md">
                Guiding Principles
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                Our Core Values
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                The bedrock values shaping the mindset of every pupil at {settings.schoolName}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {coreValues.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-lg transition-all text-center">
                    <div className="w-12 h-12 rounded-xl bg-school-navy-900 text-amber-400 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-2">{v.title}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* School Leadership */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-school-navy-800 uppercase tracking-wider bg-school-navy-100 px-3 py-1 rounded-md">
                Administration
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                School Leadership & Dedicated Faculty
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Experienced educators dedicated to the holistic mentorship and academic success of every child.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teachers.map((t) => (
                <div key={t.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <div className="h-56 bg-slate-100 relative">
                    <img
                      src={t.photoUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"}
                      alt={t.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {t.staffId}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mt-1">{t.fullName}</h3>
                    <p className="text-xs text-school-navy-900 font-semibold mt-0.5">{t.specialization}</p>
                    <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">{t.qualification}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/admissions"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-school-navy-900 text-white font-semibold text-sm hover:bg-school-navy-800 transition-colors shadow-md"
              >
                <span>Join our academic community</span>
                <ArrowRight className="w-4 h-4 ml-2 text-amber-400" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
