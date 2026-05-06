import React from 'react';
import Image from 'next/image';

export const metadata = {
  title: 'Tentang Kami | Herbanos.id',
  description: 'Mengenal lebih dekat Herbanos.id, dedikasi kami dalam menghadirkan solusi kesehatan herbal alami berkualitas tinggi.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative py-20 overflow-hidden bg-gray-50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
              Dedikasi untuk <span className="text-green-700">Kesehatan Alami</span> Masa Depan.
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Herbanos.id lahir dari keinginan untuk menghubungkan kearifan lokal herbal Indonesia dengan standar kualitas modern yang presisi dan transparan.
            </p>
          </div>
        </div>
        {/* Dekorasi BG */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-green-50/50 -skew-x-12 transform translate-x-20 z-0 hidden lg:block"></div>
      </section>

      {/* VISION & MISSION */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
               {/* Placeholder untuk Image Produk atau Lab */}
               <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest italic">
                 [High Definition Visual Assets]
               </div>
            </div>
            
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-4 border-l-4 border-green-700 pl-4">Visi Kami</h2>
                <p className="text-gray-600 leading-relaxed">
                  Menjadi pusat rujukan kesehatan herbal yang terintegrasi, mengedepankan riset, teknologi digital, dan edukasi yang jujur bagi masyarakat global.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-4 border-l-4 border-green-700 pl-4">Misi Kami</h2>
                <ul className="space-y-4">
                  {[
                    "Menghadirkan produk herbal dengan ekstraksi terbaik dan kualitas super HD dalam setiap detailnya.",
                    "Memberdayakan potensi lokal Central Java sebagai hub pengembangan herbal nasional.",
                    "Mengoptimalkan teknologi web modern untuk transparansi informasi produk kepada konsumen."
                  ].map((item, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY & QUALITY */}
      <section className="py-24 bg-gray-900 text-white rounded-t-[3rem] md:rounded-t-[5rem]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-16 tracking-tight">
            Kenapa Memilih <span className="text-green-500">Herbanos.id</span>?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Kualitas Presisi",
                desc: "Setiap takaran dan bahan baku melewati kurasi ketat untuk memastikan efikasi maksimal."
              },
              {
                title: "Inovasi Digital",
                desc: "Kami menggunakan infrastruktur teknologi modern untuk memastikan akses informasi yang cepat dan aman."
              },
              {
                title: "Akar Budaya",
                desc: "Berbasis di Jawa Tengah, kami menjaga keaslian ramuan nusantara yang telah terbukti turun-temurun."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 border border-gray-800 rounded-2xl hover:border-green-700 transition-colors group">
                <h3 className="text-xl font-bold mb-4 group-hover:text-green-500 transition-colors">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto bg-green-50 p-12 rounded-[2rem] border border-green-100">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Mulai Hidup Sehat Alami Hari Ini</h2>
            <p className="text-gray-600 mb-8 font-medium">
              Temukan berbagai artikel edukasi dan solusi produk herbal terbaik kami.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/kategori/artikel" className="px-8 py-4 bg-green-700 text-white font-bold rounded-full hover:bg-green-800 transition-all shadow-lg hover:shadow-green-200">
                Baca Artikel
              </a>
              <a href="/kontak" className="px-8 py-4 bg-white text-green-700 border border-green-200 font-bold rounded-full hover:bg-gray-50 transition-all">
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}