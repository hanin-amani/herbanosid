import React from 'react';
import Image from 'next/image';

export const metadata = {
  title: 'Tentang Kami | Herbanos.id',
  description: 'Herbanos.id adalah pusat informasi dan konsultasi kesehatan herbal alami. Menyediakan solusi pemulihan dengan produk berkualitas seperti Natura Oil Squa.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pt-24 md:pt-32">
      
      {/* 1. HERO SECTION */}
      <section className="relative pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-8 tracking-tighter">
              Solusi <span className="text-green-700">Kesehatan Alami</span> <br />
              yang Terpercaya.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium max-w-2xl">
              Herbanos.id hadir sebagai mitra terpercaya dalam perjalanan kesehatan Anda, menggabungkan riset herbal modern dengan kekayaan alam nusantara.
            </p>
          </div>
        </div>
      </section>

      {/* 2. LAYANAN - Gambar Besar, Tengah, & Statis */}
      <section className="py-20 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Konsultasi Personal",
                desc: "Layanan konsultasi kesehatan alami yang disesuaikan dengan kebutuhan pemulihan fisik Anda secara mendalam.",
                img: "/images/dokter.png"
              },
              {
                title: "Produk Unggulan",
                desc: "Kami merekomendasikan produk herbal pilihan seperti Natura Oil Squa yang telah teruji kualitasnya.",
                img: "/images/produk.png"
              },
              {
                title: "Informasi Akurat",
                desc: "Edukasi berkelanjutan mengenai manfaat tanaman obat untuk mendukung gaya hidup sehat Anda.",
                img: "/images/cs.png"
              }
            ].map((feature, i) => (
              <div key={i} className="group flex flex-col items-center text-center p-10 border border-gray-100 rounded-[3rem] bg-gray-50/30 hover:bg-white hover:border-green-200 hover:shadow-2xl transition-all duration-500">
                
                {/* Container Gambar Besar & Tengah (Statis) */}
                <div 
                  className="relative w-48 h-48 md:w-60 md:h-60 mb-8 transition-transform duration-500"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle, black 50%, rgba(0, 0, 0, 0) 100%)',
                    maskImage: 'radial-gradient(circle, black 50%, rgba(0, 0, 0, 0) 100%)'
                  }}
                >
                  <Image 
                    src={feature.img} 
                    alt={feature.title}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>

                {/* Konten Teks di Bawah Gambar */}
                <div>
                  <h3 className="text-2xl font-black mb-4 text-gray-900 group-hover:text-green-700 transition-colors tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base font-medium">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRODUK FOKUS - Natura Oil Squa */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-8 tracking-tighter leading-tight">
                Fokus Pada Pemulihan <br />Jantung & Stroke.
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Kami memahami bahwa pemulihan penyakit degeneratif membutuhkan pendekatan yang sabar dan alami. 
                </p>
                <p>
                  <strong>Natura Oil Squa</strong> menjadi produk inti yang kami sediakan untuk membantu mengatasi <strong>stroke dan penyakit jantung koroner</strong> melalui pembersihan sirkulasi darah secara alami.
                </p>
                <div className="bg-white border-l-4 border-green-700 p-6 shadow-sm rounded-r-3xl">
                  <p className="text-gray-800 font-medium italic text-justify">
                    "Kesehatan adalah investasi jangka panjang. Memilih herbal yang tepat adalah langkah awal pemulihan yang aman."
                  </p>
                </div>
              </div>
            </div>

            {/* Gambar Utama Produk dengan Masking */}
            <div 
              className="order-1 lg:order-2 relative w-full aspect-square max-w-md mx-auto lg:max-w-none rounded-[3rem] overflow-hidden shadow-2xl bg-white border border-gray-200"
              style={{
                WebkitMaskImage: 'radial-gradient(circle, black 60%, rgba(0, 0, 0, 0) 100%)',
                maskImage: 'radial-gradient(circle, black 60%, rgba(0, 0, 0, 0) 100%)'
              }}
            >
               <Image 
                  src="/images/nos.jpg" 
                  alt="Natura Oil Squa Herbanos" 
                  fill 
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
               />
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA SECTION */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="bg-gray-950 text-white rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Butuh Konsultasi Sekarang?</h2>
              <p className="text-gray-400 mb-12 text-lg md:text-xl max-w-2xl mx-auto font-medium text-center">
                Jangan ragu untuk mendiskusikan keluhan kesehatan Anda dengan tim kami melalui WhatsApp.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a href="/produk" className="px-12 py-5 bg-green-700 text-white font-black rounded-2xl hover:bg-green-600 transition-all text-sm uppercase tracking-widest shadow-xl shadow-green-900/40">
                  Tentang Produk
                </a>
                <a href="https://wa.me/62895324383400" target="_blank" rel="noopener noreferrer" className="px-12 py-5 bg-white text-gray-900 font-black rounded-2xl hover:bg-gray-100 transition-all text-sm uppercase tracking-widest">
                  Hubungi WA
                </a>
              </div>
            </div>
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-green-900/20 rounded-full blur-[100px]"></div>
          </div>
        </div>
      </section>
    </main>
  );
}