'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSchool } from '@/context/SchoolContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  Calendar,
  Search,
  Tag,
  Pin,
  Clock,
  ArrowRight,
  Bell,
  Sparkles
} from 'lucide-react';

export default function NewsPage() {
  const { announcements, settings } = useSchool();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeAnnouncementModal, setActiveAnnouncementModal] = useState<any | null>(null);

  const categories = ['All', 'Academic', 'PTA', 'General', 'Holiday', 'Exam'];

  const filtered = announcements.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-gradient-to-r from-school-navy-950 via-school-navy-900 to-school-navy-950 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-amber-400 font-bold uppercase tracking-wider text-xs bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Campus News & Bulletins
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold mt-3 tracking-tight">
              News, Announcements & Events
            </h1>
            <p className="text-slate-300 mt-2 text-base sm:text-lg max-w-3xl">
              Stay up-to-date with official memos, academic achievements, PTA meetings, and co-curricular programs at {settings.schoolName}.
            </p>
          </div>
        </section>

        {/* Search & Filter Toolbar */}
        <section className="py-8 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              
              {/* Search Bar */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search notices or events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs pl-9 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-school-navy-900 bg-white"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-school-navy-900 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Bulletins List */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 max-w-lg mx-auto">
                <Bell className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="font-bold text-slate-800 text-base">No announcements match your search</h3>
                <p className="text-xs text-slate-500 mt-1">Try clearing filters or search terms.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="mt-4 px-4 py-2 bg-school-navy-900 text-white text-xs font-semibold rounded-lg"
                >
                  Reset Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((item) => (
                  <article
                    key={item.id}
                    className={`rounded-2xl p-6 border transition-all flex flex-col justify-between hover:shadow-lg ${
                      item.isPinned
                        ? 'bg-amber-50/40 border-amber-300 shadow-sm'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-school-navy-100 text-school-navy-900">
                          {item.category}
                        </span>
                        <div className="flex items-center space-x-2 text-xs text-slate-400">
                          {item.isPinned && (
                            <span className="flex items-center text-amber-600 font-bold text-[11px]">
                              <Pin className="w-3 h-3 mr-0.5" /> Pinned
                            </span>
                          )}
                          <span className="flex items-center">
                            <Calendar className="w-3.5 h-3.5 mr-1" />
                            {item.datePosted}
                          </span>
                        </div>
                      </div>

                      <h3
                        onClick={() => setActiveAnnouncementModal(item)}
                        className="text-lg font-bold text-slate-900 leading-snug hover:text-school-navy-900 cursor-pointer transition-colors"
                      >
                        {item.title}
                      </h3>

                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-4">
                        {item.content}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">By {item.authorName}</span>
                      <button
                        onClick={() => setActiveAnnouncementModal(item)}
                        className="text-school-navy-900 font-bold hover:underline flex items-center"
                      >
                        <span>Full Memo</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Modal for Full Memo */}
        {activeAnnouncementModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                  {activeAnnouncementModal.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  {activeAnnouncementModal.datePosted}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {activeAnnouncementModal.title}
              </h2>

              <div className="text-xs text-slate-500">
                Issued by: <strong className="text-slate-800">{activeAnnouncementModal.authorName}</strong>
              </div>

              <div className="text-sm text-slate-700 leading-relaxed py-2 border-t border-b border-slate-100 whitespace-pre-line">
                {activeAnnouncementModal.content}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveAnnouncementModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-school-navy-900 text-white font-semibold text-xs hover:bg-school-navy-800"
                >
                  Close Notice
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
