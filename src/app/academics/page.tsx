'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSchool } from '@/context/SchoolContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  BookOpen,
  Calendar,
  Award,
  CheckCircle2,
  Clock,
  Layers,
  GraduationCap,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function AcademicsPage() {
  const { settings, classes, subjects } = useSchool();
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const departments = [
    { name: 'All', desc: 'All Curriculum Offerings' },
    { name: 'Languages', desc: 'English, French & Ghanaian Language (Fante)' },
    { name: 'Sciences', desc: 'Integrated Science & Core Mathematics' },
    { name: 'Humanities', desc: 'Social Studies, Religious & Moral Education (RME)' },
    { name: 'Creative Arts & Tech', desc: 'ICT, Coding, Career Tech (BDT) & Design' },
  ];

  const filteredSubjects = selectedDept === 'All'
    ? subjects
    : subjects.filter(s => s.department === selectedDept);

  const academicTerms = [
    {
      term: 'Term 1',
      academicYear: '2024/2025',
      duration: 'September 2024 – December 2024',
      status: 'Completed',
      reopeningDate: 'Tuesday, 10th September 2024',
      midtermBreak: '24th – 28th October 2024',
      examsStart: '25th November 2024',
      vacation: 'Thursday, 12th December 2024',
      events: 'Orientation, Welcome Service, Inter-class Reading & Spelling Bee, Term 1 Assessments'
    },
    {
      term: 'Term 2',
      academicYear: '2024/2025',
      duration: 'January 2025 – April 2025',
      status: 'Current Term',
      reopeningDate: 'Tuesday, 7th January 2025',
      midtermBreak: '17th – 21st February 2025',
      examsStart: '17th March 2025',
      vacation: 'Thursday, 3rd April 2025',
      events: 'Independence Day Parade, Cultural Day, Annual Sports Championship, Term 2 Exams'
    },
    {
      term: 'Term 3',
      academicYear: '2024/2025',
      duration: 'May 2025 – July 2025',
      status: 'Upcoming',
      reopeningDate: 'Tuesday, 6th May 2025',
      midtermBreak: '12th – 16th June 2025',
      examsStart: '30th June 2025',
      vacation: 'Thursday, 24th July 2025',
      events: 'BECE Final Examinations, Speech & Prize-Giving Day, Graduation Ceremony'
    }
  ];

  const gradingBands = [
    { grade: '1', stanine: '80% - 100%', remark: 'Highest Distinction', desc: 'Exceptional, deep mastery of subject matter with analytical creativity.' },
    { grade: '2', stanine: '70% - 79%', remark: 'Higher Distinction', desc: 'Superior conceptual knowledge and very strong academic execution.' },
    { grade: '3', stanine: '65% - 69%', remark: 'High (Very Good)', desc: 'Above-average grasp of key learning indicators and reliable performance.' },
    { grade: '4', stanine: '60% - 64%', remark: 'Credit (Good)', desc: 'Satisfactory academic capability meeting syllabus expectations comfortably.' },
    { grade: '5', stanine: '55% - 59%', remark: 'Credit', desc: 'Good standard performance with minor areas requiring revision.' },
    { grade: '6', stanine: '50% - 54%', remark: 'Pass', desc: 'Basic competence in standard curriculum topics.' },
    { grade: '7', stanine: '45% - 49%', remark: 'Pass', desc: 'Adequate demonstration of minimal passing standards.' },
    { grade: '8', stanine: '40% - 44%', remark: 'Weak Pass', desc: 'Marginal achievement requiring targeted remediation.' },
    { grade: '9', stanine: '0% - 39%', remark: 'Fail', desc: 'Inadequate performance; candidate requires intensive teacher support.' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Navbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-gradient-to-r from-school-navy-950 via-school-navy-900 to-school-navy-950 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-amber-400 font-bold uppercase tracking-wider text-xs bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Academics & Curriculum
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold mt-3 tracking-tight">
              Rigorous Ghanaian Curriculum Elevated with Modern Technology
            </h1>
            <p className="text-slate-300 mt-2 text-base sm:text-lg max-w-3xl">
              Discover our comprehensive academic structure adhering to the Ghana National Council for Curriculum and Assessment (NaCCA) standard, enriched with robotics and digital literacy.
            </p>
          </div>
        </section>

        {/* Academic Levels */}
        <section className="py-20 bg-blended-section border-y border-slate-200/60 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-school-navy-800 uppercase tracking-wider bg-school-navy-100 px-3 py-1 rounded-md">
                Structure
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                Our Academic Divisions
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Well-paced developmental stages tailored for every age bracket from toddlerhood to teenage scholarship.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Early Childhood */}
              <div className="bg-blended-card rounded-2xl p-7 hover-lift space-y-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 uppercase">
                  Early Years
                </span>
                <h3 className="text-2xl font-bold text-slate-900">Creche, Nursery & KG</h3>
                <p className="text-xs text-slate-500 font-medium">Ages 6 months – 5 years</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Focuses on emotional security, perceptual development, phonics sound mastery, fine motor skills, numeracy games, and social collaboration.
                </p>
                <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" /> Jolly Phonics & Sound blends</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" /> Hands-on Montessori manipulatives</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" /> Nursery rhymes & storytelling hours</li>
                </ul>
              </div>

              {/* Primary */}
              <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-lg transition-all space-y-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-school-navy-100 text-school-navy-900 uppercase">
                  Basic 1 - Basic 6
                </span>
                <h3 className="text-2xl font-bold text-slate-900">Primary Education</h3>
                <p className="text-xs text-slate-500 font-medium">Ages 6 – 11 years</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Solidifies literacy, computational mathematics, scientific inquiry, citizenship education, and French. Pupils begin formal ICT and coding classes.
                </p>
                <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" /> Continuous weekly School-Based Assessment</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" /> Computer lab hands-on coding & typing</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" /> Creative arts, cultural drama & music</li>
                </ul>
              </div>

              {/* JHS */}
              <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-lg transition-all space-y-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 uppercase">
                  Basic 7 - Basic 9
                </span>
                <h3 className="text-2xl font-bold text-slate-900">Junior High School</h3>
                <p className="text-xs text-slate-500 font-medium">Ages 12 – 15 years</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Intensive preparation for the Basic Education Certificate Examination (BECE) administered by WAEC. Rigorous laboratory investigations and career guidance.
                </p>
                <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" /> Regular terminal mocks with WAEC standard marking</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" /> Science practicals & pre-technical workshops</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" /> 100% Single-digit BECE aggregate placement track record</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Subjects & Departments */}
        <section className="py-20 bg-transparent relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-md">
                  Subjects Taught
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                  Academic Curriculum Subjects
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Explore standard Ghana Education Service subjects taught by specialized teachers.
                </p>
              </div>

              {/* Department filter tabs */}
              <div className="flex flex-wrap gap-2">
                {departments.map((d) => (
                  <button
                    key={d.name}
                    onClick={() => setSelectedDept(d.name)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedDept === d.name
                        ? 'bg-school-navy-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubjects.map((sub) => (
                <div key={sub.id} className="p-5 rounded-xl border border-slate-200/90 hover:border-amber-400 bg-slate-50/50 hover:bg-white transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-school-navy-100 text-school-navy-900">
                      {sub.code}
                    </span>
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {sub.department}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mt-2.5">{sub.name}</h4>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {sub.applicableLevels.map((lvl) => (
                      <span key={lvl} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600">
                        {lvl}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Calendar for Year */}
        <section className="py-20 bg-blended-section-tint border-y border-slate-200/60 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-school-navy-800 uppercase tracking-wider bg-school-navy-100 px-3 py-1 rounded-md">
                Timelines & Terms
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                {settings.academicYear} Academic Year Calendar
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Official school term schedules, examination timetables, and vacation breaks for parents and students.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {academicTerms.map((t) => (
                <div
                  key={t.term}
                  className={`rounded-2xl p-6 border transition-all ${
                    t.status === 'Current Term'
                      ? 'bg-white border-2 border-amber-500 shadow-xl'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase ${
                      t.status === 'Current Term'
                        ? 'bg-amber-100 text-amber-900'
                        : t.status === 'Completed'
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      {t.status}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">{t.academicYear}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1">{t.term}</h3>
                  <p className="text-xs text-slate-500 font-medium mb-4">{t.duration}</p>

                  <div className="space-y-2.5 text-xs text-slate-700 border-t border-slate-100 pt-4">
                    <div className="flex items-start">
                      <Clock className="w-3.5 h-3.5 mr-2 text-school-navy-700 flex-shrink-0 mt-0.5" />
                      <div><strong className="text-slate-900">Reopening:</strong> {t.reopeningDate}</div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-3.5 h-3.5 mr-2 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div><strong className="text-slate-900">Mid-Term:</strong> {t.midtermBreak}</div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-3.5 h-3.5 mr-2 text-rose-600 flex-shrink-0 mt-0.5" />
                      <div><strong className="text-slate-900">Examinations:</strong> {t.examsStart}</div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-3.5 h-3.5 mr-2 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div><strong className="text-slate-900">Vacation:</strong> {t.vacation}</div>
                    </div>
                  </div>

                  <div className="mt-5 p-3 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                    <strong className="text-slate-800">Key Events:</strong> {t.events}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GRADING SYSTEM & ASSESSMENT ENGINE INFO */}
        <section className="py-20 bg-transparent relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-md">
                Assessment Standards
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                Ghana NaCCA 9-Point Grading System
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                The school utilizes the National Standardized Assessment Engine. Assessments are split 50% Continuous Assessment (Classwork, Homework, Tests, Projects) and 50% Terminal Examinations.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-school-navy-950 text-white text-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Grade</th>
                    <th className="py-3 px-4">Score Band</th>
                    <th className="py-3 px-4">Official Remark</th>
                    <th className="py-3 px-4">Performance Descriptor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {gradingBands.map((band) => (
                    <tr key={band.grade} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-black text-school-navy-900">{band.grade}</td>
                      <td className="py-3 px-4 font-semibold text-slate-700">{band.stanine}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                          parseInt(band.grade) <= 2
                            ? 'bg-emerald-100 text-emerald-800'
                            : parseInt(band.grade) <= 5
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {band.remark}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-600">{band.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-slate-900 text-base">Have questions about our academic curriculum or standards?</h4>
                <p className="text-slate-600 text-xs mt-0.5">Our academic counselors and admissions desk are available to guide you through our comprehensive syllabus.</p>
              </div>
              <Link
                href="/admissions"
                className="px-5 py-2.5 rounded-xl bg-school-navy-900 hover:bg-school-navy-800 text-white font-semibold text-xs flex items-center space-x-2 transition-colors whitespace-nowrap"
              >
                <span>Inquire About Admission</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
