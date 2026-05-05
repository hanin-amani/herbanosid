import React from 'react';

// --- CUSTOM SVG ICONS (Bebas Error Build & Ringan) ---
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
      {/* Lebar disesuaikan ke max-w-6xl agar sejajar lurus dari atas ke bawah */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          {/* Logo Section */}
          <div className="flex items-center justify-center md:justify-start">
             <div className="flex items-center gap-3">
                {/* Daun Hijau SVG */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C12 2 15 5 15 9C15 13 12 17 12 17C12 17 9 13 9 9C9 5 12 2 12 2Z" fill="#4ade80"/>
                  <path d="M12 2C7 2 3 7 3 12C3 17 7 22 12 22C17 22 21 17 21 12C21 7 17 22 12 2Z" stroke="#4ade80" strokeWidth="1" strokeLinecap="round"/>
                </svg>
                <span className="text-3xl font-bold tracking-tighter italic">herbanos.id</span>
             </div>
          </div>

          {/* Tentang Kami Section */}
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">Tentang Kami</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              www.herbanos.id merupakan website resmi penjualan Natura Oil Squa. Kami berkomitmen menyajikan informasi kesehatan herbal yang terpercaya.
            </p>
          </div>

          {/* Ikuti Kami Section */}
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">Ikuti Kami</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-[#262626] hover:bg-green-700 transition-all duration-300 rounded-sm">
                <IconFacebook />
              </a>
              <a href="mailto:admin@herbanos.id" className="w-10 h-10 flex items-center justify-center bg-[#262626] hover:bg-green-700 transition-all duration-300 rounded-sm">
                <IconMail />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-[#262626] hover:bg-green-700 transition-all duration-300 rounded-sm">
                <IconTikTok />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-[#262626] hover:bg-green-700 transition-all duration-300 rounded-sm">
                <IconWhatsApp />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 2. BOTTOM BAR */}
      <div className="bg-black py-4">
        {/* Lebar disesuaikan ke max-w-6xl */}
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-gray-500 font-medium">
            © {currentYear} HERBANOS.ID - ALL RIGHTS RESERVED
          </p>
          
          <nav className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <a href="/" className="hover:text-green-500 transition-colors">Home</a>
            <a href="/kontak" className="hover:text-green-500 transition-colors">Kontak</a>
            <a href="/privacy-policy" className="hover:text-green-500 transition-colors">Privacy Policy</a>
            <a href="/produk" className="hover:text-green-500 transition-colors">Produk Utama</a>
            <a href="/berita-islam" className="hover:text-green-500 transition-colors">Berita Islam Terkini</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}