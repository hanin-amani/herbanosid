"use client";

import React, { useState, useEffect } from 'react';

// --- CUSTOM SVG ICONS ---
const IconChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);

const IconChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

interface NewsTickerProps {
  items: string[];
}

export default function NewsTicker({ items }: NewsTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const nextSlide = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
      setIsFading(false);
    }, 300);
  };

  const prevSlide = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
      setIsFading(false);
    }, 300);
  };

  useEffect(() => {
    if (!items || items.length <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [items, currentIndex]);

  if (!items || items.length === 0) return null;

  return (
    <div className="bg-white border-b border-gray-100 py-3.5">
      <div className="container mx-auto px-4 max-w-6xl flex items-center gap-5">
        
        {/* Label News - Warna Merah & Font Lebih Besar */}
        <span className="bg-red-600 text-white px-3 py-1 text-[12px] font-black italic shrink-0 tracking-[0.1em] select-none rounded-sm shadow-sm">
          NEWS
        </span>
        
        {/* Judul Berita - Font diperbesar ke text-sm (14px) */}
        <div className="flex-grow overflow-hidden">
          <p className={`truncate text-gray-700 text-sm font-bold uppercase tracking-tight transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            {items[currentIndex]}
          </p>
        </div>
        
        {/* Navigasi Kanan */}
        <div className="flex gap-1.5 shrink-0">
           <button 
            onClick={prevSlide}
            className="border border-gray-200 bg-white p-2 hover:bg-gray-50 text-gray-500 transition-all rounded-sm active:scale-95 shadow-sm"
            aria-label="Previous news"
           >
              <IconChevronLeft />
           </button>
           <button 
            onClick={nextSlide}
            className="border border-gray-200 bg-white p-2 hover:bg-gray-50 text-gray-500 transition-all rounded-sm active:scale-95 shadow-sm"
            aria-label="Next news"
           >
              <IconChevronRight />
           </button>
        </div>
        
      </div>
    </div>
  );
}