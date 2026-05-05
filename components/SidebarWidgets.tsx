import React from 'react';

// --- CUSTOM SVG ICONS (Bebas Error Build & Ringan) ---
const IconFacebook = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const IconInstagram = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const IconYoutube = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 69.44 69.44 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 69.44 69.44 0 0 1-15 0 2 2 0 0 1-2-2Z"/><path d="m10 15 5-3-5-3z"/></svg>
);

const IconX = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16H20L8.267 4H4z"/><path d="M4 20l6.768-6.768m2.46-2.46L20 4"/></svg>
);

/**
 * Komponen Iklan (Ads Widget)
 */
export function AdsWidget({ label = "ADVERTISEMENT" }) {
  return (
    <div className="mb-10 w-full bg-blue-900 text-white h-[350px] flex flex-col items-center justify-center text-center p-6 rounded-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10 pointer-events-none"></div>
      <div className="z-10">
        <span className="text-xs font-bold tracking-widest opacity-50 block mb-2">{label}</span>
        <span className="text-2xl font-bold block leading-tight">NATURA OIL SQUA</span>
        <p className="text-sm mt-2 opacity-90">Cegah Stroke & Jantung Koroner</p>
        <button className="mt-6 bg-yellow-500 text-black px-6 py-2.5 rounded-sm font-bold text-xs uppercase hover:bg-yellow-400 transition-colors shadow-lg">
          Beli Sekarang
        </button>
      </div>
    </div>
  );
}

/**
 * Komponen Media Sosial (Social Widget)
 */
export function SocialWidget() {
  const socialItems = [
    { name: 'Facebook', count: '22,000 Fans', color: 'bg-[#3b5998]', icon: <IconFacebook className="w-4 h-4" />, action: 'Suka' },
    { name: 'X', count: '150 Pengikut', color: 'bg-black', icon: <IconX className="w-4 h-4" />, action: 'Ikuti' },
    { name: 'Youtube', count: '124,000 Pelanggan', color: 'bg-[#dd4b39]', icon: <IconYoutube className="w-4 h-4" />, action: 'Subscribe' },
    { name: 'Instagram', count: '15,000 Pengikut', color: 'bg-[#e4405f]', icon: <IconInstagram className="w-4 h-4" />, action: 'Ikuti' },
  ];

  return (
    <div className="mb-10">
      <div className="border-b-2 border-green-700 mb-4 flex">
        {/* Judul Section: Tegak (Tanpa Italic) */}
        <h3 className="bg-green-700 text-white px-4 py-1.5 font-bold text-xs uppercase">
          Follow Us
        </h3>
      </div>
      <div className="flex flex-col gap-2">
        {socialItems.map((item, i) => (
          <div key={i} className={`${item.color} text-white flex items-center text-[11px] font-bold group cursor-pointer`}>
            <div className="p-3 bg-black/10 group-hover:bg-black/20 transition-colors">{item.icon}</div>
            <span className="px-3">{item.count}</span>
            <span className="ml-auto px-4 border-l border-white/10 py-3 uppercase hover:bg-white/10 transition-colors">{item.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}