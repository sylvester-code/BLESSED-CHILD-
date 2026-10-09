'use client';

import React, { useState } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { BookCheck, BookOpen, Plus, Search, CheckCircle2 } from 'lucide-react';

export default function LibraryAdminPage() {
  const { libraryBooks, borrowBook, returnBook, students } = useSchool();
  const [search, setSearch] = useState('');

  const filteredBooks = libraryBooks.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase()) ||
    b.isbn.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md inline-flex mb-1">
            <BookCheck className="w-3.5 h-3.5" />
            <span>Campus Library</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Library Catalog & Circulation
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage textbooks, African literature readers, encyclopedias, student borrowing, and returns.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 border rounded-lg"
          />
        </div>
        <span className="text-xs text-slate-500 hidden sm:inline">
          {libraryBooks.length} titles in collection
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBooks.map((b) => (
          <div key={b.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-school-navy-900 bg-school-navy-50 px-2 py-0.5 rounded uppercase">
                  {b.category}
                </span>
                <span className="text-xs font-mono text-slate-400">{b.shelfLocation}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm leading-snug">{b.title}</h3>
              <p className="text-xs text-slate-600">By <strong>{b.author}</strong></p>
              <p className="text-[11px] font-mono text-slate-400">ISBN: {b.isbn}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className={`font-bold ${b.availableCopies > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                {b.availableCopies} of {b.totalCopies} available
              </span>
              <button
                onClick={() => {
                  if (b.availableCopies > 0) {
                    borrowBook(b.id, students[0]?.id || 'std-1');
                    alert(`Issued 1 copy of "${b.title}" to student.`);
                  } else {
                    returnBook(b.id);
                    alert(`Returned 1 copy of "${b.title}" to library shelf.`);
                  }
                }}
                className={`px-3 py-1 rounded-lg font-bold text-xs ${
                  b.availableCopies > 0
                    ? 'bg-school-navy-900 text-white hover:bg-school-navy-800'
                    : 'bg-amber-500 text-slate-950 hover:bg-amber-600'
                }`}
              >
                {b.availableCopies > 0 ? 'Issue Book' : 'Return Copy'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
