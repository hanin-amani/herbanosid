import React from 'react';
import Image from 'next/image';
import NewsTicker from '@/components/NewsTicker';
import FeaturedGrid from '@/components/FeaturedGrid';
import HybridSection from '@/components/HybridSection';
import { AdsWidget, SocialWidget } from '@/components/SidebarWidgets';

// --- 1. DATA DUMMY LENGKAP ---
const dummyPosts = [
  { 
    title: "Mengapa Bisnis Online Makin Digemari Masyarakat?", 
    category: "PANDUAN BISNIS", 
    date: "29 Agustus 2024", 
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800" 
  },
  { 
    title: "Rahasia Komisi Jutaan Dari Tiktok Affiliate", 
    category: "PANDUAN BISNIS", 
    date: "29 Agustus 2024", 
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400" 
  },
  { 
    title: "4 Tips Memulai Bisnis Online 2024", 
    category: "PANDUAN BISNIS", 
    date: "29 Agustus 2024", 
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400" 
  },
  { 
    title: "Squalene Meningkatkan Tenaga dan Stamina", 
    category: "PRODUCT KNOWLEDGE", 
    date: "29 Agustus 2024", 
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=400" 
  },
  { 
    title: "Mekanisme Squalene Meningkatkan Antibodi", 
    category: "PRODUCT KNOWLEDGE", 
    date: "29 Agustus 2024", 
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=400" 
  },
];

const latestArticles = [
  {
    title: "Manfaat Luar Biasa Squalene untuk Kesehatan Jantung",
    excerpt: "Squalene dikenal sebagai senyawa yang mampu menjaga fleksibilitas pembuluh darah dan membantu mencegah penimbunan kolesterol jahat...",
    author: "Admin",
    date: "01 Mei 2026",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=400"
  },
  {
    title: "Strategi Digital Marketing untuk UMKM di Tahun 2026",
    excerpt: "Memasuki pertengahan tahun 2026, persaingan bisnis digital semakin ketat. Berikut adalah strategi yang wajib Anda terapkan...",
    author: "Admin",
    date: "28 April 2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400"
  },
  {
    title: "Tips Menjaga Kesehatan Mata bagi Pekerja IT",
    excerpt: "Menatap layar monitor selama lebih dari 8 jam sehari berisiko merusak kualitas penglihatan. Gunakan aturan 20-20-20...",
    author: "Admin",
    date: "25 April 2026",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400"
  }
];

// --- 2. KOMPONEN INTERNAL ---

const LatestPostSection = () => (
  <section className="flex flex-col gap-8">
    <div className="border-b-2 border-green-700 mb-2 flex">
      <h2 className="bg-green-700 text-white px-4 py-1.5 font-bold text-sm uppercase">Postingan Terbaru</h2>
    </div>
    {latestArticles.map((post, idx) => (
      <div key={idx} className="flex flex-col md:flex-row gap-6 group cursor-pointer border-b border-gray-100 pb-8 last:border-0">
        <div className="relative w-full md:w-1/3 h-48 shrink-0 overflow-hidden rounded shadow-sm">
          <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2 group-hover:text-green-700 transition-colors leading-tight">{post.title}</h3>
          <div className="flex items-center gap-4 text-[11px] text-gray-400 mb-3 uppercase font-bold tracking-wider">
            <span>{post.author}</span>
            <span>{post.date}</span>
          </div>
          <p className="text-sm text-gray-500 line-clamp-3 italic leading-relaxed">{post.excerpt}</p>
        </div>
      </div>
    ))}
  </section>
);

const PopularSection = () => (
  <section className="space-y-4">
    <div className="border-b-2 border-green-700 mb-6 flex">
     <h3 className="bg-green-700 text-white px-4 py-1 font-bold text-xs uppercase">Populer</h3>
    </div>
    {dummyPosts.slice(0, 4).map((post, idx) => (
      <div key={idx} className="flex gap-3 group cursor-pointer items-center border-b border-gray-50 pb-3 last:border-0">
        <div className="relative w-16 h-16 shrink-0 rounded overflow-hidden">
          <Image src={post.image} alt="pop" fill className="object-cover" />
        </div>
        <div>
          <h4 className="text-xs font-bold leading-tight group-hover:text-green-700 line-clamp-2 transition-colors">{post.title}</h4>
          <span className="text-[10px] text-gray-400 mt-1 block uppercase font-medium">{post.date}</span>
        </div>
      </div>
    ))}
  </section>
);

// --- 3. KOMPONEN UTAMA HOMEPAGE ---

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* NewsTicker dengan background putih */}
      <NewsTicker title="Squalene: Senyawa Ajaib untuk Produksi Antibodi dan Stamina Pria" />
      
      {/* Container utama dikurangi lebarnya menjadi max-w-6xl */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <FeaturedGrid posts={dummyPosts} />
        
        <div className="flex flex-col lg:flex-row gap-10 mt-10">
          {/* KOLOM KIRI: Konten Utama */}
          <div className="w-full lg:w-2/3 space-y-12">
            <HybridSection title="Artikel Kesehatan" />
            <LatestPostSection />
          </div>
          
          {/* KOLOM KANAN: Sidebar */}
          <aside className="w-full lg:w-1/3 space-y-10">
            <SocialWidget />
            <AdsWidget label="PROMO NATURA OIL SQUA" />
            <PopularSection />
          </aside>
        </div>
      </div>
    </main>
  );
}