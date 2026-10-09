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
      <body className="min-h-screen bg-slate-50 text-slate-900 selection:bg-school-navy-900 selection:text-white antialiased font-sans">
        <SchoolProvider>
          {children}
        </SchoolProvider>
      </body>
    </html>
  );
}
