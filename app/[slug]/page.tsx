import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- CUSTOM SVG ICONS (Bebas Error Build & Ringan) ---
const IconChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);
const IconClock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);
const IconEye = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);
const IconMessage = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);

// --- DUMMY DATA ---
const post = {
  title: "Simak 4 Tips Memulai Bisnis Online di Tahun 2024",
  category: "Panduan Bisnis",
  author: { name: "Admin", avatar: "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" },
  date: "29 Agustus 2024",
  time: "10:00 WIB",
  readTime: "3 Min Read",
  views: 1157,
  comments: 0,
  image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
  content: `
    <p class="mb-4">Setiap tahun, lebih dari 5 juta pengusaha baru memulai perjalanan mereka dalam dunia kewirausahaan. Namun, banyak di antara mereka yang menghadapi kesulitan dalam mempertahankan bisnisnya.</p>
    <h3 class="text-xl font-bold mt-6 mb-2">1. Jangan Hanya Mengandalkan Google sebagai Sumber traffic</h3>
    <p class="mb-4">Meskipun 93 persen pengalaman online dimulai dengan mesin pencari, tren saat ini menunjukkan penurunan jumlah pengunjung yang diarahkan oleh mesin pencari ke situs web.</p>
    <h3 class="text-xl font-bold mt-6 mb-2">2. Mempekerjakan Tim Freelance atau Pekerja Jarak Jauh</h3>
    <p class="mb-4">Dalam ekonomi yang dinamis, memiliki tim penuh waktu di kantor bukan lagi keharusan. Banyak bisnis kini beralih ke pekerja lepas dan tim jarak jauh yang lebih hemat biaya.</p>
  `
};

const relatedPosts = [
  { title: "Mengapa Bisnis Online Makin Digemari Masyarakat?", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=400" },
  { title: "Rahasia Komisi Jutaan Dari Tiktok Affiliate", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400" }
];

const popularPosts = [
  { title: "Mengenal Lebih Jauh tentang Penyakit Diabetes", date: "29 Januari 2024", image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=150" },
  { title: "10 Makanan Super Sehat di Dapur Anda", date: "28 Januari 2024", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=150" },
  { title: "7 Buah untuk Kesehatan Mata Anda", date: "25 November 2023", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=150" },
];

export default function BlogPostDetail() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-10">
          
          <div className="w-full lg:w-2/3">
            <nav className="flex text-[11px] uppercase font-bold tracking-wider text-gray-400 mb-6 items-center">
              <Link href="/" className="hover:text-green-600">Beranda</Link>
              <span className="mx-2 text-gray-300"><IconChevronRight /></span>
              <Link href="#" className="hover:text-green-600">{post.category}</Link>
              <span className="mx-2 text-gray-300"><IconChevronRight /></span>
              <span className="truncate">{post.title}</span>
            </nav>

            <div className="bg-black text-white text-[10px] inline-block px-2 py-0.5 mb-4 font-bold uppercase tracking-widest">
              {post.category}
            </div>

            <h1 className="text-3xl md:text-5xl font-black mb-6 text-gray-900 leading-tight tracking-tighter">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center text-[11px] font-bold uppercase tracking-wide text-gray-400 gap-6 mb-8 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-2">
                <Image src={post.author.avatar} alt={post.author.name} width={28} height={28} className="rounded-full shadow-sm" />
                <span className="text-gray-900">Penulis: {post.author.name}</span>
              </div>
              <div className="flex items-center gap-1.5"><IconCalendar /> {post.date}</div>
              <div className="flex items-center gap-1.5"><IconClock /> {post.time}</div>
              <div className="flex items-center gap-1.5"><IconClock /> {post.readTime}</div>
              <div className="ml-auto flex items-center gap-4 hidden sm:flex">
                <div className="flex items-center gap-1.5"><IconEye /> {post.views}</div>
                <div className="flex items-center gap-1.5"><IconMessage /> {post.comments}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              <button className="bg-[#3b5998] text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm hover:opacity-90">Facebook</button>
              <button className="bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm hover:opacity-90">X</button>
              <button className="bg-[#bd081c] text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm hover:opacity-90">Pinterest</button>
              <button className="bg-[#25D366] text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm hover:opacity-90">Whatsapp</button>
              <button className="bg-[#0088cc] text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm hover:opacity-90">Telegram</button>
            </div>

            <div className="mb-8 relative w-full h-[300px] md:h-[450px] overflow-hidden rounded-sm">
              <Image src={post.image} alt={post.title} fill className="object-cover" priority />
            </div>

            <div 
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-12 text-justify"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />

            {/* Judul Artikel Terkait - Diubah menjadi tegak */}
            <div className="mb-12">
              <div className="border-b-2 border-green-700 mb-6 flex">
                <h3 className="bg-green-700 text-white px-4 py-1.5 font-bold text-xs uppercase">Artikel Terkait</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((related, idx) => (
                  <div key={idx} className="group cursor-pointer">
                    <div className="relative h-44 w-full mb-3 overflow-hidden rounded-sm">
                      <Image src={related.image} alt={related.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h4 className="font-bold text-sm leading-tight group-hover:text-green-700 transition-colors">{related.title}</h4>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-sm">
              <h3 className="font-black text-xl mb-6 uppercase tracking-tighter">Tinggalkan Komentar</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea placeholder="Pesan Anda..." rows={6} className="md:col-span-2 w-full border border-gray-200 p-4 text-sm focus:outline-none focus:border-green-600" />
                <input type="text" placeholder="Nama Lengkap *" className="w-full border border-gray-200 p-4 text-sm focus:outline-none focus:border-green-600" />
                <input type="email" placeholder="Email Anda *" className="w-full border border-gray-200 p-4 text-sm focus:outline-none focus:border-green-600" />
                <button type="submit" className="md:col-span-2 bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">Kirim Komentar</button>
              </form>
            </div>

          </div>

          <aside className="w-full lg:w-1/3 space-y-10">
            
            <div className="bg-blue-900 text-white aspect-[3/4] flex flex-col items-center justify-center p-8 rounded-sm text-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-black opacity-10"></div>
               <div className="z-10">
                  <span className="text-[10px] font-bold tracking-[0.3em] opacity-60 block mb-4 uppercase">Herbanos Ads</span>
                  <span className="text-3xl font-black block leading-none mb-2">SQUA</span>
                  <p className="text-xs opacity-80 mb-8 italic text-center">Suplemen Jantung No. 1 di Indonesia</p>
                  <button className="border-2 border-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-blue-900 transition-all">Pelajari Detail</button>
               </div>
            </div>

            {/* Judul Populer Post - Diubah menjadi tegak */}
            <div className="space-y-6">
              <div className="border-b-2 border-green-700 mb-6 flex">
                <h3 className="bg-green-700 text-white px-4 py-1.5 font-bold text-xs uppercase">Populer Post</h3>
              </div>
              <div className="flex flex-col gap-4">
                {popularPosts.map((pop, idx) => (
                  <div key={idx} className="flex gap-4 group cursor-pointer items-center border-b border-gray-50 pb-4 last:border-0">
                    <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-sm">
                      <Image src={pop.image} alt={pop.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold leading-tight group-hover:text-green-700 transition-colors mb-1">{pop.title}</h4>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{pop.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}