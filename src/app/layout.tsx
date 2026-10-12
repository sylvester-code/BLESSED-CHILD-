import type { Metadata } from 'next';
import './globals.css';
import { SchoolProvider } from '@/context/SchoolContext';

export const metadata: Metadata = {
  title: 'Blessed Child School Complex | Anaji-Mpatado, Ghana',
  description: 'A premier private academic institution in Anaji-Mpatado, Sekondi-Takoradi, Ghana offering excellence in Early Childhood, Primary, and Junior High School education.',
  keywords: [
    'Blessed Child School Complex',
    'Schools in Takoradi',
    'Anaji-Mpatado Schools',
    'Best JHS in Western Region',
    'Ghana Basic Education',
    'BECE Distinction',
    'Private School Takoradi'
  ],
  authors: [{ name: 'Blessed Child School Complex' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen text-slate-900 selection:bg-school-navy-900 selection:text-white antialiased font-sans relative">
        {/* Ambient Blended Atmospheric Glow Elements */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          {/* Top-Right Warm Golden Glow */}
          <div className="absolute -top-40 -right-40 w-[620px] h-[620px] rounded-full bg-gradient-to-br from-amber-400/20 via-yellow-200/10 to-transparent blur-[130px] transform-gpu" />

          {/* Top-Left Royal Navy Bloom */}
          <div className="absolute top-[8%] -left-52 w-[720px] h-[720px] rounded-full bg-gradient-to-tr from-school-navy-700/14 via-school-navy-500/8 to-transparent blur-[140px] transform-gpu" />

          {/* Mid-Page Celestial Sky / Indigo Accent */}
          <div className="absolute top-[42%] -right-32 w-[680px] h-[680px] rounded-full bg-gradient-to-bl from-sky-400/14 via-blue-600/8 to-transparent blur-[130px] transform-gpu" />

          {/* Lower Page Warm Amber Glow */}
          <div className="absolute top-[68%] -left-40 w-[640px] h-[640px] rounded-full bg-gradient-to-br from-amber-500/16 via-yellow-300/10 to-transparent blur-[130px] transform-gpu" />

          {/* Deep Navy Grounding Glow */}
          <div className="absolute -bottom-48 right-[10%] w-[720px] h-[720px] rounded-full bg-gradient-to-t from-school-navy-950/12 via-school-navy-800/8 to-transparent blur-[140px] transform-gpu" />

          {/* Subtle Fine Mesh Dot Grid */}
          <div className="absolute inset-0 bg-dots-subtle opacity-30" />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <SchoolProvider>
            {children}
          </SchoolProvider>
        </div>
      </body>
    </html>
  );
}
