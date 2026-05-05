"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link"; // Perbaikan import Link
import { motion, AnimatePresence } from "framer-motion";

// --- CUSTOM SVG ICONS (Bebas Error Build) ---
const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);

const IconX = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Panduan Bisnis", href: "/category/bisnis" },
  { name: "Kesehatan", href: "/category/kesehatan" },
  { name: "Produk", href: "/category/produk" },
  { name: "Tentang Kami", href: "/about" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efek shadow saat scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white py-4"
      }`}
    >
      {/* Container diubah menjadi max-w-6xl agar sejajar dengan News Ticker & Konten */}
      <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between">
        
        {/* 1. LOGO AREA */}
        <div className="flex items-center gap-2">
          <Link href="/" className="text-2xl font-black tracking-tighter text-gray-900 flex items-center">
            HERBA<span className="text-green-700">NOS</span>
            <div className="w-1.5 h-1.5 bg-green-700 rounded-full ml-1"></div>
          </Link>
        </div>

        {/* 2. DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-bold text-gray-700 hover:text-green-700 transition-colors uppercase tracking-wide"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* 3. RIGHT SECTION (Search & Mobile Toggle) */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors hidden md:block">
            <IconSearch />
          </button>
          
          <a 
            href="https://wa.me/628xxxx" 
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block bg-green-700 text-white px-5 py-2 rounded-sm text-xs font-bold uppercase hover:bg-green-800 transition-colors"
          >
            Konsultasi WA
          </a>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-gray-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* 4. MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl lg:hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-bold text-gray-800 border-b border-gray-50 pb-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <button className="flex items-center justify-center gap-2 border border-gray-200 py-3 font-bold text-sm">
                  <IconSearch /> CARI ARTIKEL
                </button>
                <a 
                  href="https://wa.me/628xxxx" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-700 text-white text-center py-3 font-bold text-sm"
                >
                  CHAT WHATSAPP
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}