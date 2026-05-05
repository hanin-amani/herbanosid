import React from 'react';

// --- CUSTOM SVG ICONS (Bebas Error Build & Ringan) ---
const IconChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);

const IconChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

export default function NewsTicker({ title }: { title: string }) {
  return (
    /* Background putih bersih dengan border bawah yang sangat tipis */
    <div className="bg-white border-b border-gray-100 py-3">
      
      {/* 
        PENTING: max-w-6xl digunakan agar lebar News Ticker konsisten 
        dengan Header, Footer, dan area konten utama.
      */}
      <div className="container mx-auto px-4 max-w-6xl flex items-center gap-4 text-[11px]">
        
        {/* Label News - Tetap menggunakan aksen hijau khas Herbanos */}
        <span className="bg-green-700 text-white px-2 py-0.5 font-bold italic shrink-0 tracking-wider">
          NEWS
        </span>
        
        {/* Judul Berita - Menggunakan font semi-bold dan warna abu-abu gelap profesional */}
        <p className="truncate text-gray-600 font-semibold uppercase tracking-tight flex-grow">
          {title}
        </p>
        
        {/* Navigasi Kanan - Tombol navigasi minimalis */}
        <div className="flex gap-1 shrink-0">
           <button className="border border-gray-200 bg-white p-1.5 hover:bg-gray-50 text-gray-500 transition-all rounded-sm">
              <IconChevronLeft />
           </button>
           <button className="border border-gray-200 bg-white p-1.5 hover:bg-gray-50 text-gray-500 transition-all rounded-sm">
              <IconChevronRight />
           </button>
        </div>
        
      </div>
    </div>
  );
}