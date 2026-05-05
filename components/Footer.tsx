"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- CUSTOM SVG ICONS ---
const IconFacebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const IconTikTok = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
);

const IconWhatsApp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.4 8.38 8.38 0 0 1 3.9.9L22 4Z"/></svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* 1. MAIN FOOTER CONTENT */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
          
          {/* Logo Section - Disesuaikan dengan Header Baru */}
          <div className="flex flex-col items-center md:items-start gap-4">
             <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <Image 
                    src="/images/herbanos.png" 
                    alt="Logo Herbanos" 
                    fill 
                    className="object-contain brightness-0 invert" // Membuat logo menjadi putih agar kontras di BG gelap
                  />
                </div>
                <div className="flex items-baseline leading-none">
                  <span className="text-2xl font-black tracking-tight lowercase">
                    herba<span className="text-green-500">nos</span>
                  </span>
                  <span className="text-xl font-bold tracking-tight text-green-500/80 lowercase">
                    .id
                  </span>
                </div>
             </div>
             <p className="text-xs text-gray-400 mt-2 text-center md:text-left leading-relaxed">
               Pusat informasi kesehatan alami dan gaya hidup sehat terpercaya di Indonesia.
             </p>
          </div>

          {/* Tentang Kami Section */}
          <div>
            <h4 className="text-sm font-black mb-6 uppercase tracking-[0.2em] text-green-500">Tentang Kami</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              www.herbanos.id merupakan website resmi penjualan **Natura Oil Squa**. Kami berkomitmen menyajikan informasi kesehatan herbal yang terpercaya dan artikel bermanfaat untuk masyarakat.
            </p>
          </div>

          {/* Ikuti Kami Section */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-sm font-black mb-6 uppercase tracking-[0.2em] text-green-500">Ikuti Kami</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-[#262626] hover:bg-green-700 hover:text-white text-gray-400 transition-all duration-300 rounded-sm">
                <IconFacebook />
              </a>
              <a href="mailto:admin@herbanos.id" className="w-10 h-10 flex items-center justify-center bg-[#262626] hover:bg-green-700 hover:text-white text-gray-400 transition-all duration-300 rounded-sm">
                <IconMail />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-[#262626] hover:bg-green-700 hover:text-white text-gray-400 transition-all duration-300 rounded-sm">
                <IconTikTok />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-[#262626] hover:bg-green-700 hover:text-white text-gray-400 transition-all duration-300 rounded-sm">
                <IconWhatsApp />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 2. BOTTOM BAR */}
      <div className="bg-black py-6 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            © {currentYear} herbanos.id - All Rights Reserved
          </p>
          
          <nav className="flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-[0.15em] text-gray-400">
            <Link href="/" className="hover:text-green-500 transition-colors">Home</Link>
            <Link href="/kontak" className="hover:text-green-500 transition-colors">Kontak</Link>
            <Link href="/privacy-policy" className="hover:text-green-500 transition-colors">Privacy Policy</Link>
            <Link href="/produk" className="hover:text-green-500 transition-colors">Produk Utama</Link>
            <Link href="https://onislam.web.id" className="hover:text-green-500 transition-colors">Berita Islam</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}