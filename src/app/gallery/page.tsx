'use client';

import React, { useState } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Image as ImageIcon, X, ZoomIn, Sparkles, Filter } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Academics' | 'STEM & Robotics' | 'Cultural Day' | 'Sports & Athletics' | 'Graduation';
  imageUrl: string;
  description: string;
  date: string;
}

export default function GalleryPage() {
  const { settings } = useSchool();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Academics', 'STEM & Robotics', 'Cultural Day', 'Sports & Athletics', 'Graduation'];

  const photos: GalleryItem[] = [
    {
      id: 'g-1',
      title: 'Robotics & Coding Workshop in ICT Lab',
      category: 'STEM & Robotics',
      imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80',
      description: 'JHS students programming microcontrollers and robotics models during the Friday STEM clinic.',
      date: 'February 2025'
    },
    {
      id: 'g-2',
      title: 'Morning School Assembly & Worship',
      category: 'Academics',
      imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      description: 'Pupils gathered for devotion, hymn singing, and national anthem recitation on the main campus pavilion.',
      date: 'January 2025'
    },
    {
      id: 'g-3',
      title: 'Ghana Cultural Heritage Day Celebration',
      category: 'Cultural Day',
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      description: 'Students proudly showcasing rich Ghanaian Kente and traditional cloths representing diverse ethnic groups.',
      date: 'March 2024'
    },
    {
      id: 'g-4',
      title: 'Inter-Houses Track & Field Championship',
      category: 'Sports & Athletics',
      imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
      description: 'House 1 (Gold) and House 2 (Blue) competing in the 4x100m sprint relay at Takoradi Sports Club.',
      date: 'November 2024'
    },
    {
      id: 'g-5',
      title: 'Speech & Prize-Giving Day Ceremony',
      category: 'Graduation',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      description: 'Distinguished students receiving academic plaques and certificates of honor in the presence of parents.',
      date: 'July 2024'
    },
    {
      id: 'g-6',
      title: 'Science Practical: Titration & Optics Lab',
      category: 'Academics',
      imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
      description: 'Basic 8 students examining plant specimen under optical microscopes in the refurbished science lab.',
      date: 'January 2025'
    },
    {
      id: 'g-7',
      title: 'Kindergarten Graduation & Parade',
      category: 'Graduation',
      imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      description: 'KG 2 pupils adorned in academic caps celebrating their transition into Basic 1 (Primary School).',
      date: 'July 2024'
    },
    {
      id: 'g-8',
      title: 'Inter-Class Football Tournament',
      category: 'Sports & Athletics',
      imageUrl: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80',
      description: 'Our boys team during the finals of the Anaji-Mpatado basic schools soccer gala.',
      date: 'October 2024'
    },
    {
      id: 'g-9',
      title: 'Computer Lab Typing & Web Literacy',
      category: 'STEM & Robotics',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      description: 'Basic 4 learners acquiring touch-typing accuracy and exploring safe educational websites.',
      date: 'February 2025'
    }
  ];

  const filteredPhotos = selectedCategory === 'All'
    ? photos
    : photos.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-gradient-to-r from-school-navy-950 via-school-navy-900 to-school-navy-950 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-amber-400 font-bold uppercase tracking-wider text-xs bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Campus Moments
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold mt-3 tracking-tight">
              Life at {settings.schoolName}
            </h1>
            <p className="text-slate-300 mt-2 text-base sm:text-lg max-w-3xl">
              Glimpses into our vibrant classrooms, STEM laboratories, athletic sports galas, and cultural heritage celebrations in {settings.locationCity || 'Anaji-Mpatado'}, {settings.locationCountry || 'Ghana'}.
            </p>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="py-6 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 overflow-x-auto pb-1">
              <Filter className="w-4 h-4 text-slate-500 mr-2 flex-shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
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
        </section>

        {/* Gallery Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setActivePhoto(photo)}
                  className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-school-navy-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                      <span className="text-white text-xs font-semibold flex items-center">
                        <ZoomIn className="w-4 h-4 mr-1 text-amber-400" />
                        Click to view larger
                      </span>
                    </div>
                  </div>

                  <div className="p-5 bg-white">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                      <span className="text-amber-700 font-bold uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded">
                        {photo.category}
                      </span>
                      <span>{photo.date}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-school-navy-900 transition-colors">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {photo.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-950 border border-slate-800 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 text-white"
            >
              <div className="relative h-80 sm:h-96 w-full bg-black">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-white hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="text-amber-400 font-bold uppercase">{activePhoto.category}</span>
                  <span>{activePhoto.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{activePhoto.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{activePhoto.description}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
