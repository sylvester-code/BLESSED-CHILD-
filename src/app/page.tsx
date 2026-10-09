'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSchool } from '@/context/SchoolContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  GraduationCap,
  Award,
  BookOpen,
  Users,
  ShieldCheck,
  Cpu,
  Bus,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Quote,
  MapPin,
  Clock,
  Phone,
  Mail,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';

export default function HomePage() {
  const { settings, announcements } = useSchool();
  const [activeTab, setActiveTab] = useState<'all' | 'early' | 'primary' | 'jhs'>('all');

  const highlights = [
    {
      icon: Award,
      title: "100% BECE Distinction Rate",
      desc: "Consistently producing single-digit aggregate candidates securing placements in premier Ghanaian Senior High Schools."
    },
    {
      icon: Cpu,
      title: "Modern STEM & Coding Lab",
      desc: "Hands-on robotics, computer literacy, and introductory programming integrated into our core Basic school curriculum."
    },
    {
      icon: ShieldCheck,
      title: "Solid Christian & Moral Upbringing",
      desc: "Instilling divine discipline, integrity, respect, and servant leadership in every child right from early childhood."
    },
    {
      icon: Users,
      title: "Dedicated & Certified Faculty",
      desc: "Professional teachers trained in child psychology, modern pedagogy, and continuous Ghana NaCCA standards."
    },
    {
      icon: Bus,
      title: "Safe Air-Conditioned Transport",
      desc: "Comprehensive school bus routes covering Anaji, Mpatado, Effia-Kwesimintsim, Airport Ridge, and Takoradi metropolis."
    },
    {
      icon: BookOpen,
      title: "School-Based Assessment (SBA)",
      desc: "Transparent continuous evaluation, homework tracking, and online digital report card access for parents."
    }
  ];

  const programs = [
    {
      id: 'early',
      category: 'Early Childhood',
      title: 'Creche, Nursery & Kindergarten',
      ages: 'Ages 6 months to 5 years',
      desc: 'Nurturing discovery through sensory play, early phonics, numeracy readiness, creative art, and loving pastoral care.',
      features: ['Montessori-inspired learning aids', 'Phonics & early literacy', 'Clean, child-safe nap and play arena', 'Nutritious meal option'],
      badge: 'Foundation Stage'
    },
    {
      id: 'primary',
      category: 'Primary School',
      title: 'Basic 1 to Basic 6 (Primary)',
      ages: 'Ages 6 to 11 years',
      desc: 'Developing deep competencies in English, Mathematics, Science, Computing, Ghanaian Languages (Fante), French, and Social Studies.',
      features: ['NaCCA Standards-Based Curriculum', 'Weekly ICT practical sessions', 'Spelling Bee & Math Olympiad clubs', 'Personalized academic counseling'],
      badge: 'Core Basic'
    },
    {
      id: 'jhs',
      category: 'Junior High School',
      title: 'JHS 1 to JHS 3 (BECE Candidates)',
      ages: 'Ages 12 to 15 years',
      desc: 'Rigorous academic preparation tailored for superior BECE results, career guidance, leadership formation, and secondary school transition.',
      features: ['Intensive mock examinations & clinics', 'Science lab practical investigations', 'Pre-technical & Career Technology workshops', 'High-profile school placements'],
      badge: 'Excellence Stage'
    }
  ];

  const testimonials = [
    {
      quote: "Blessed Child School Complex has been a God-sent blessing to my family. Both my children read fluently at age 4 and their performance in the recent BECE was aggregate 7 and 8. The discipline and moral training are unmatched in Sekondi-Takoradi.",
      author: "Dr. K. Mensah",
      role: "PTA Executive & Parent of 2 Wards",
      location: "Anaji Estates, Takoradi"
    },
    {
      quote: "The teachers here genuinely care about every child. With their online portals, I can check my child's terminal report card, attendance, and fees directly from my smartphone even when traveling for work.",
      author: "Mrs. Gertrude Ofori",
      role: "Parent & School Patron",
      location: "Mpatado Ridge"
    },
    {
      quote: "The practical ICT and robotics sessions in JHS gave me the foundation to top my class in computer science at Mfantsipim School. Blessed Child taught me to aim for perfection with Godliness.",
      author: "K. Mensah",
      role: "Alumnus (Class of 2023 - Wesley Girls / Mfantsipim Candidate)",
      location: "Now at UCC / KNUST"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-school-navy-950 via-school-navy-900 to-school-navy-950 text-white py-20 lg:py-28">
          {/* Subtle Grid and Glow Overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-10 right-0 w-96 h-96 bg-school-navy-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {settings.showAdmissionsBanner !== false && (
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs sm:text-sm font-medium">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Admissions Open for {settings.academicYear} Academic Year</span>
                  </div>
                )}

                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-serif">
                  {settings.heroTitle}
                </h1>

                <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                  {settings.heroSubtitle}
                </p>

                {/* Call to actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    href="/admissions"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-base shadow-lg shadow-amber-500/25 hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Apply for Admission</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <Link
                    href="/about"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-base transition-all flex items-center justify-center space-x-2 backdrop-blur-sm"
                  >
                    <BookOpen className="w-5 h-5 text-amber-400" />
                    <span>Explore Academic Programs</span>
                  </Link>

                  <Link
                    href="/about"
                    className="w-full sm:w-auto px-6 py-3.5 text-slate-300 hover:text-white font-medium text-sm text-center flex items-center justify-center"
                  >
                    Learn More →
                  </Link>
                </div>

                {/* Key Metrics Chips */}
                {settings.showStatsCounter !== false && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10">
                    <div className="bg-white/5 backdrop-blur-sm p-3.5 rounded-xl border border-white/10 text-center lg:text-left">
                      <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">{settings.beceDistinctionRate}</p>
                      <p className="text-xs text-slate-400 font-medium">BECE Distinction</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-3.5 rounded-xl border border-white/10 text-center lg:text-left">
                      <p className="text-2xl sm:text-3xl font-extrabold text-white">{settings.studentCountDisplay}</p>
                      <p className="text-xs text-slate-400 font-medium">Happy Students</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-3.5 rounded-xl border border-white/10 text-center lg:text-left">
                      <p className="text-2xl sm:text-3xl font-extrabold text-white">{settings.teacherCountDisplay}</p>
                      <p className="text-xs text-slate-400 font-medium">Certified Faculty</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-3.5 rounded-xl border border-white/10 text-center lg:text-left">
                      <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">{settings.yearsOfExcellence}+</p>
                      <p className="text-xs text-slate-400 font-medium">Years in {settings.locationCity || 'Anaji'}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Visual Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Decorative Frame */}
                  <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-amber-500 to-school-navy-500 opacity-30 blur-lg"></div>

                  <div className="relative rounded-2xl bg-slate-900 border border-white/15 overflow-hidden shadow-2xl">
                    <div className="relative h-64 sm:h-72 bg-gradient-to-t from-slate-950 via-slate-900 to-school-navy-900 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                        alt="Blessed Child School Complex students learning"
                        className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 text-xs font-bold tracking-wide uppercase">
                          Excellence in Anaji-Mpatado
                        </span>
                        <h3 className="text-white font-bold text-lg mt-1">
                          Nurturing Every Potential
                        </h3>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
                        <span className="flex items-center">
                          <MapPin className="w-3.5 h-3.5 mr-1 text-amber-400" />
                          Western Region, Ghana
                        </span>
                        <span className="flex items-center text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                          GES / NaCCA Accredited
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-300">Curriculum</span>
                          <span className="text-white font-semibold">Ghana NaCCA + Modern STEM</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-300">Levels Offered</span>
                          <span className="text-white font-semibold">Creche to JHS 3</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-300">Assessment System</span>
                          <span className="text-white font-semibold">Integrated SBA + Online Portals</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Link
                          href="/admissions"
                          className="w-full py-2.5 px-4 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-semibold text-sm flex items-center justify-center space-x-2 transition-colors"
                        >
                          <span>Start Online Application</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* WELCOME MESSAGE & HEADMASTER SECTION */}
        {settings.showHeadmasterSection !== false && (
          <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-5">
                  <div className="relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                      <img
                        src={settings.headmasterPhotoUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80"}
                        alt={settings.headmasterName}
                        className="w-full h-96 object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-school-navy-950 via-transparent to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <p className="font-bold text-xl">{settings.headmasterName}</p>
                        <p className="text-amber-400 text-xs font-medium">{settings.headmasterTitle}</p>
                        <p className="text-slate-300 text-xs mt-1">{settings.schoolName}, {settings.locationCity || 'Anaji-Mpatado'}</p>
                      </div>
                    </div>
                    {/* Decorative badge */}
                    <div className="absolute -bottom-5 -right-5 bg-school-navy-900 text-amber-400 p-4 rounded-2xl shadow-xl border border-amber-400/20 text-center">
                      <p className="font-black text-2xl">{settings.yearsOfExcellence || '16'}+</p>
                      <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Years of Leadership</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-school-navy-100 text-school-navy-800 text-xs font-semibold uppercase tracking-wider">
                    <GraduationCap className="w-3.5 h-3.5 text-school-navy-700" />
                    <span>Headmaster&apos;s Welcome</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {settings.welcomeMessageTitle}
                  </h2>

                  <p className="text-slate-600 leading-relaxed text-base">
                    {settings.welcomeMessageBody}
                  </p>

                  <blockquote className="border-l-4 border-amber-500 pl-4 py-1 italic text-slate-700 bg-amber-50/50 rounded-r-lg">
                    &ldquo;{settings.headmasterMessage}&rdquo;
                  </blockquote>

                  <div className="pt-2 flex flex-wrap gap-4 items-center">
                    <div className="flex items-center space-x-2 text-sm font-semibold text-school-navy-900">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Holistic Character Formation</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm font-semibold text-school-navy-900">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Individualized Learning Attention</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm font-semibold text-school-navy-900">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Christian Ethical Foundation</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link
                      href="/about"
                      className="inline-flex items-center text-sm font-bold text-school-navy-900 hover:text-amber-600 transition-colors"
                    >
                      <span>Read about our heritage and school leadership</span>
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* WHY CHOOSE BLESSED CHILD - 6 PILLARS */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider">
                Our Distinct Pillars
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-school-navy-950 tracking-tight">
                Why {settings.schoolName}?
              </h2>
              <p className="text-slate-600 text-base">
                We combine academic discipline, cutting-edge digital learning, and high moral standards to nurture pupils who stand out in Ghana and across the globe.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {highlights.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-8 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400/80 hover:shadow-xl hover:-translate-y-1 transition-all group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-school-navy-50 group-hover:bg-amber-500 text-school-navy-900 group-hover:text-slate-950 flex items-center justify-center mb-6 transition-colors shadow-sm">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-school-navy-900 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ACADEMIC PROGRAMS SHOWCASE */}
        <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-white/10 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                Academic Curriculum
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Comprehensive Academic Pathways
              </h2>
              <p className="text-slate-300 text-base">
                From early childhood foundations to Junior High School WAEC preparation, our structured curriculum equips students for every milestone.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {programs.map((prog) => (
                <div
                  key={prog.id}
                  className="rounded-2xl bg-slate-800/80 border border-slate-700/80 p-8 flex flex-col justify-between hover:border-amber-400/60 transition-all hover:bg-slate-800 group shadow-lg"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                        {prog.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{prog.ages}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {prog.title}
                    </h3>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      {prog.desc}
                    </p>

                    <div className="pt-4 border-t border-slate-700 space-y-2.5">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Highlights:</p>
                      {prog.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center space-x-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8">
                    <Link
                      href="/academics"
                      className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-amber-500 hover:text-slate-950 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-all"
                    >
                      <span>Explore Curriculum & Subjects</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LATEST ANNOUNCEMENTS & NEWS */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-school-navy-100 text-school-navy-800 text-xs font-semibold uppercase tracking-wider">
                  Campus Bulletins
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                  Latest News & Announcements
                </h2>
              </div>
              <Link
                href="/news"
                className="inline-flex items-center text-sm font-bold text-school-navy-900 hover:text-amber-600 transition-colors"
              >
                <span>View all bulletins & events</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {announcements.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {item.datePosted}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-snug hover:text-school-navy-900 cursor-pointer">
                      {item.title}
                    </h3>

                    <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                      {item.content}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>By {item.authorName}</span>
                    <Link href="/news" className="text-school-navy-900 font-semibold hover:underline">
                      Read more →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider">
                Voices of Satisfaction
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-school-navy-950">
                What Parents & Alumni Say
              </h2>
              <p className="text-slate-600 text-sm">
                Hear directly from the community that has entrusted their wards to {settings.schoolName}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 relative flex flex-col justify-between shadow-sm"
                >
                  <Quote className="w-10 h-10 text-amber-400/50 absolute top-6 right-6 pointer-events-none" />
                  
                  <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="pt-4 border-t border-slate-200">
                    <p className="font-bold text-slate-900 text-sm">{t.author}</p>
                    <p className="text-amber-700 text-xs font-medium">{t.role}</p>
                    <p className="text-slate-400 text-xs">{t.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ADMISSIONS CTA BANNER */}
        <section className="py-16 bg-gradient-to-r from-school-navy-900 via-school-navy-950 to-school-navy-900 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Enroll Your Child Today</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
              Give Your Ward the Blessed Academic Advantage
            </h2>

            <p className="text-slate-300 text-base max-w-2xl mx-auto">
              Applications are ongoing for Creche, Nursery, Kindergarten, Primary, and JHS levels. Apply online or schedule a physical campus tour in Anaji-Mpatado.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/admissions"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-base shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center space-x-2"
              >
                <span>Complete Admission Application</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-base transition-all flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Admissions: {settings.primaryPhone}</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Floating WhatsApp Quick Contact Button */}
      {settings.showWhatsAppFloating !== false && (settings.whatsappNumber || settings.primaryPhone) && (
        <a
          href={`https://wa.me/${(settings.whatsappNumber || settings.primaryPhone).replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center border-2 border-white group"
        >
          <Phone className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out group-hover:ml-2 font-bold text-xs">
            WhatsApp Desk
          </span>
        </a>
      )}

      <Footer />
    </div>
  );
}
