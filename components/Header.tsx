"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// --- CUSTOM SVG ICONS ---
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
  const router = useRouter();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  // WARNA HIJAU DIPERTEBAL: Menggunakan bg-green-100 dan border-b-green-200
  const headerClass = !mounted 
    ? "bg-green-100/50 py-6 border-b border-transparent" 
    : isScrolled 
      ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-gray-100" 
      : "bg-green-100/90 py-6 border-b border-green-200/50";

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${headerClass}`}>
      <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between">
        
        {/* 1. LOGO AREA */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex-shrink-0 transition-transform duration-300 group-hover:rotate-3">
              <img
                src="/images/herbanos.png" 
                alt="Logo Herbanos"
                className="w-10 h-10 object-contain md:w-11 md:h-11"
              />
            </div>
            
            <div className="flex items-baseline leading-none">
              <span className="text-2xl font-black tracking-tight text-gray-900 lowercase">
                herba<span className="text-green-700">nos</span>
              </span>
              <span className="text-xl font-bold tracking-tight text-green-700/80 lowercase">
                .id
              </span>
            </div>
          </Link>
        </div>

        {/* 2. DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-bold text-gray-700 hover:text-green-700 transition-colors uppercase tracking-widest"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* 3. RIGHT SECTION */}
        <div className="flex items-center gap-5">
          <div className="relative hidden md:block">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
              className="p-2 text-gray-700 hover:text-green-700 transition-colors"
            >
              <IconSearch />
            </button>

            <AnimatePresence>
              {isSearchOpen && (
                <motion.form
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  onSubmit={handleSearch}
                  className="absolute top-full right-0 mt-4 w-72 bg-white shadow-2xl border border-gray-100 p-3 rounded-sm flex gap-2"
                >
                  <input 
                    type="text"
                    placeholder="Cari artikel..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 rounded-sm"
                    autoFocus
                  />
                  <button type="submit" className="bg-green-700 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-green-800 transition-colors">
                    Cari
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
          
          <a 
            href="https://wa.me/628xxxx" 
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block bg-green-700 text-white px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wide hover:bg-green-800 transition-all shadow-md active:scale-95"
          >
            Konsultasi WA
          </a>

          <button 
            className="lg:hidden p-2 text-gray-900 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-t border-green-100 shadow-2xl lg:hidden overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-bold text-gray-800 border-b border-gray-50 pb-3 active:text-green-700"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 flex flex-col gap-4">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Cari artikel herbanos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 border border-gray-300 p-3 text-sm focus:outline-none focus:border-green-600 rounded-sm"
                  />
                  <button type="submit" className="bg-gray-900 text-white px-4 flex items-center justify-center rounded-sm hover:bg-black transition-colors">
                    <IconSearch />
                  </button>
                </form>

                <a 
                  href="https://wa.me/628xxxx" 
                  className="bg-green-700 text-white text-center py-3.5 font-bold text-sm uppercase tracking-widest rounded-sm shadow-sm"
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