import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NewsTicker from '@/components/NewsTicker';
import FeaturedGrid from '@/components/FeaturedGrid';
import HybridSection from '@/components/HybridSection';
import { AdsWidget, SocialWidget } from '@/components/SidebarWidgets';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

// --- HELPER: Format Tanggal Indonesia ---
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

// --- KOMPONEN INTERNAL: LATEST POST DENGAN SMART PAGINATION ---
const LatestPostSection = ({ 
  posts, 
  currentPage, 
  totalPages 
}: { 
  posts: any[], 
  currentPage: number, 
  totalPages: number 
}) => {
  
  // Logika untuk menentukan rentang halaman yang ditampilkan
  const getPageNumbers = () => {
    const delta = 2; // Jumlah angka di kiri & kanan halaman aktif
    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) range.unshift("...");
    range.unshift(1);
    if (currentPage + delta < totalPages - 1) range.push("...");
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  return (
    <section className="flex flex-col gap-8">
      <div className="border-b-2 border-green-700 mb-2 flex">
        <h2 className="bg-green-700 text-white px-4 py-1.5 font-bold text-sm uppercase">Postingan Terbaru</h2>
      </div>
      
      {posts && posts.map((post) => (
        <Link href={`/${post.slug}`} key={post._id} className="flex flex-col md:flex-row gap-6 group cursor-pointer border-b border-gray-100 pb-8 last:border-0">
          <div className="relative w-full md:w-1/3 h-48 shrink-0 overflow-hidden rounded shadow-sm bg-gray-100">
            {post.mainImage && (
              <Image 
                src={urlFor(post.mainImage).url()} 
                alt={post.title} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 group-hover:text-green-700 transition-colors leading-tight">{post.title}</h3>
            <div className="flex items-center gap-4 text-[11px] text-gray-400 mb-3 uppercase font-bold tracking-wider">
              <span>{post.authorName || 'Admin'}</span>
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <p className="text-sm text-gray-500 line-clamp-3 italic leading-relaxed">
              {post.excerpt || (post.content && post.content[0]?.children?.[0]?.text)}
            </p>
          </div>
        </Link>
      ))}

      {/* --- SMART PAGINATION UI --- */}
      <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
        {currentPage > 1 && (
          <Link 
            href={`/?page=${currentPage - 1}`}
            className="px-4 py-2 bg-gray-900 text-white text-xs font-bold uppercase hover:bg-green-700 transition-colors rounded-sm shadow-sm"
          >
            Kembali
          </Link>
        )}
        
        <div className="flex gap-1 items-center">
          {getPageNumbers().map((pageNum, i) => (
            <React.Fragment key={i}>
              {pageNum === "..." ? (
                <span className="px-2 text-gray-400">...</span>
              ) : (
                <Link
                  href={`/?page=${pageNum}`}
                  className={`w-9 h-9 flex items-center justify-center text-xs font-bold rounded-sm transition-all border ${
                    currentPage === pageNum 
                    ? 'bg-green-700 border-green-700 text-white shadow-md scale-105' 
                    : 'bg-white border-gray-200 text-gray-600 hover:border-green-700 hover:text-green-700'
                  }`}
                >
                  {pageNum}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>

        {currentPage < totalPages && (
          <Link 
            href={`/?page=${currentPage + 1}`}
            className="px-4 py-2 bg-gray-900 text-white text-xs font-bold uppercase hover:bg-green-700 transition-colors rounded-sm shadow-sm"
          >
            Selanjutnya
          </Link>
        )}
      </div>
    </section>
  );
};

const PopularSection = ({ posts }: { posts: any[] }) => (
  <section className="space-y-4">
    <div className="border-b-2 border-green-700 mb-6 flex">
      <h3 className="bg-green-700 text-white px-4 py-1 font-bold text-xs uppercase">Populer</h3>
    </div>
    {posts && posts.map((post) => (
      <Link href={`/${post.slug}`} key={post._id} className="flex gap-3 group cursor-pointer items-center border-b border-gray-50 pb-3 last:border-0">
        <div className="relative w-16 h-16 shrink-0 rounded overflow-hidden bg-gray-100 border border-gray-100">
          {post.mainImage && (
            <Image src={urlFor(post.mainImage).url()} alt={post.title} fill className="object-cover" />
          )}
        </div>
        <div>
          <h4 className="text-xs font-bold leading-tight group-hover:text-green-700 line-clamp-2 transition-colors">{post.title}</h4>
          <span className="text-[10px] text-gray-400 mt-1 block uppercase font-medium">{formatDate(post.publishedAt)}</span>
        </div>
      </Link>
    ))}
  </section>
);

// --- KOMPONEN UTAMA HOMEPAGE ---
export default async function HomePage({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) {
  const resolvedParams = await searchParams;
  const postsPerPage = 5;
  const currentPage = Number(resolvedParams.page) || 1;

  // Offset awal untuk LatestPost adalah 5 (karena 5 pertama dipakai FeaturedGrid)
  const startIdx = 5 + (currentPage - 1) * postsPerPage;
  const endIdx = startIdx + postsPerPage;

  const query = `{
    "tickerItems": *[_type == "post"] | order(publishedAt desc)[0...5].title,
    "featuredPosts": *[_type == "post"] | order(publishedAt desc)[0...5]{
      _id, title, "slug": slug.current, mainImage, publishedAt, "category": categories[0]->title
    },
    "latestPosts": *[_type == "post"] | order(publishedAt desc)[${startIdx}...${endIdx}]{
      _id, title, "slug": slug.current, mainImage, publishedAt, excerpt, content, "authorName": author->name
    },
    "popularPosts": *[_type == "post"] | order(views desc)[0...5]{
      _id, title, "slug": slug.current, mainImage, publishedAt
    },
    "totalPosts": count(*[_type == "post"])
  }`;

  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });

  // Total halaman berdasarkan sisa post setelah Featured
  const totalLatestPosts = Math.max(0, data.totalPosts - 5);
  const totalPages = Math.ceil(totalLatestPosts / postsPerPage);

  return (
    <main className="bg-white pt-[30px] md:pt-[45px] transition-all duration-300">
      <NewsTicker 
        items={data.tickerItems && data.tickerItems.length > 0 
          ? data.tickerItems 
          : ["Memuat berita terbaru..."]} 
      />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* FeaturedGrid (Selalu tampil di halaman manapun agar header tetap konsisten) */}
        <FeaturedGrid posts={data.featuredPosts || []} />
        
        <div className="flex flex-col lg:flex-row gap-10 mt-10">
          <div className="w-full lg:w-2/3 space-y-12">
            {/* Hanya tampilkan HybridSection di Halaman 1 agar user tidak jenuh */}
            {currentPage === 1 && (
              <>
                <HybridSection title="Artikel Kesehatan" categorySlug="kesehatan" />
                <HybridSection title="Panduan Bisnis" categorySlug="bisnis" />
              </>
            )}
            
            <LatestPostSection 
              posts={data.latestPosts || []} 
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
          
          <aside className="w-full lg:w-1/3 space-y-10">
            <SocialWidget />
            <AdsWidget label="IKLAN SPONSOR" />
            <PopularSection posts={data.popularPosts || []} />
          </aside>
        </div>
      </div>
    </main>
  );
}