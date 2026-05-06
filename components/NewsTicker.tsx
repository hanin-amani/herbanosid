"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const IconChevronLeft = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>;
const IconChevronRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;

export default function NewsTicker({ items }: { items: any[] }) {
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
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [items, currentIndex]);

  if (!items || items.length === 0) return null;

  const currentItem = items[currentIndex];
  
  // LOGIKA PENGAMAN: Cek apakah item itu objek atau cuma string
  const displayTitle = typeof currentItem === 'object' ? currentItem.title : currentItem;
  const displayLink = typeof currentItem === 'object' ? `/${currentItem.slug}` : '#';

  return (
    <div className="bg-white border-b border-gray-100 py-3.5">
      <div className="container mx-auto px-4 max-w-6xl flex items-center gap-5">
        <span className="bg-[#e3000f] text-white px-3 py-1 text-[12px] font-black italic shrink-0 tracking-[0.1em] rounded-sm shadow-sm">
          NEWS
        </span>
        
        <div className="flex-grow overflow-hidden">
          {/* Link: Tanpa Uppercase & Warna Biru Gelap */}
          <Link 
            href={displayLink}
            className={`block truncate text-[#0f3b68] hover:text-[#e3000f] text-sm font-bold tracking-tight transition-all duration-300 ${isFading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}
          >
            {displayTitle}
          </Link>
        </div>
        
        <div className="flex gap-1.5 shrink-0">
           <button onClick={prevSlide} className="border border-gray-200 bg-white p-2 hover:bg-gray-50 text-gray-500 rounded-sm shadow-sm"><IconChevronLeft /></button>
           <button onClick={nextSlide} className="border border-gray-200 bg-white p-2 hover:bg-gray-50 text-gray-500 rounded-sm shadow-sm"><IconChevronRight /></button>
        </div>
      </div>
    </div>
  );
}