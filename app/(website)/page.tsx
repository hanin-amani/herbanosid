import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NewsTicker from '@/components/NewsTicker';
import FeaturedGrid from '@/components/FeaturedGrid';
import HybridSection from '@/components/HybridSection';
import { SocialWidget } from '@/components/SidebarWidgets';
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

// --- KOMPONEN INTERNAL: LATEST POST ---
const LatestPostSection = ({ 
  posts, 
  currentPage, 
  totalPages 
}: { 
  posts: any[], 
  currentPage: number, 
  totalPages: number 
}) => {
  
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
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
        <h2 className="bg-green-700 text-white px-4 py-1.5 font-bold text-sm uppercase tracking-tight">Postingan Terbaru</h2>
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
            <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-green-700 transition-colors leading-tight tracking-tight">
              {post.title}
            </h3>
            <div className="flex items-center gap-4 text-[11px] text-gray-400 mb-3 uppercase font-bold tracking-wider">
              <span className="text-green-700/80">{post.authorName || 'Admin'}</span>
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
              {post.excerpt || "Baca selengkapnya mengenai artikel kesehatan dan solusi alami hanya di herbanos.id."}
            </p>
          </div>
        </Link>
      ))}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
        {currentPage > 1 && (
          <Link href={`/?page=${currentPage - 1}`} className="px-4 py-2 bg-gray-900 text-white text-xs font-bold uppercase hover:bg-green-700 rounded-sm shadow-sm transition-colors">
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
                    ? 'bg-green-700 border-green-700 text-white shadow-md' 
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
          <Link href={`/?page=${currentPage + 1}`} className="px-4 py-2 bg-gray-900 text-white text-xs font-bold uppercase hover:bg-green-700 rounded-sm shadow-sm transition-colors">
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
      <h3 className="bg-green-700 text-white px-4 py-1 font-bold text-xs uppercase tracking-tight">Populer Post</h3>
    </div>
    {posts && posts.map((post) => (
      <Link href={`/${post.slug}`} key={post._id} className="flex gap-4 group cursor-pointer items-center border-b border-gray-50 pb-4 last:border-0">
        <div className="relative w-16 h-16 shrink-0 rounded-sm overflow-hidden bg-gray-100 border border-gray-100 shadow-sm">
          {post.mainImage && (
            <Image src={urlFor(post.mainImage).url()} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform" />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <h4 className="text-[13px] font-bold text-gray-900 leading-tight group-hover:text-green-700 transition-colors line-clamp-2 tracking-tight mb-1">
            {post.title}
          </h4>
          <div className="flex items-center gap-2 text-[9px] text-gray-400 font-bold uppercase">
             <span className="text-green-700/60">{post.authorName}</span>
             <span>•</span>
             <span>{new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
          </div>
        </div>
      </Link>
    ))}
  </section>
);

export default async function HomePage({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) {
  const resolvedParams = await searchParams;
  const postsPerPage = 5;
  const currentPage = Number(resolvedParams.page) || 1;

  const startIdx = 5 + (currentPage - 1) * postsPerPage;
  const endIdx = startIdx + postsPerPage;

  const query = `{
    "tickerItems": *[_type == "post"] | order(publishedAt desc)[0...5]{
       title, "slug": slug.current
    },
    "featuredPosts": *[_type == "post"] | order(publishedAt desc)[0...5]{
      _id, title, "slug": slug.current, mainImage, publishedAt, "category": categories[0]->title
    },
    "latestPosts": *[_type == "post"] | order(publishedAt desc)[${startIdx}...${endIdx}]{
      _id, title, "slug": slug.current, mainImage, publishedAt, excerpt, "authorName": author->name
    },
    "popularPosts": *[_type == "post"] | order(views desc)[0...5]{
      _id, title, "slug": slug.current, mainImage, publishedAt, "authorName": author->name
    },
    "adSidebar": *[_type == "ads" && position == "sidebar" && isActive == true][0]{ destinationUrl, bannerImage },
    "adHeader": *[_type == "ads" && position == "header" && isActive == true][0]{ destinationUrl, bannerImage },
    "totalPosts": count(*[_type == "post"])
  }`;

  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });

  const totalLatestPosts = Math.max(0, data.totalPosts - 5);
  const totalPages = Math.ceil(totalLatestPosts / postsPerPage);

  return (
    <main className="bg-white pt-5">
      
      <NewsTicker items={data.tickerItems || []} />
      
      <div className="container mx-auto px-4 py-6 max-w-6xl"> 
        
        {/* Iklan Header */}
        {data.adHeader?.bannerImage && (
          <div className="mb-8 flex justify-center">
            <a href={data.adHeader.destinationUrl} target="_blank" rel="nofollow">
              <div className="relative w-full max-w-[970px] aspect-[8/1] overflow-hidden rounded-sm shadow-sm border border-gray-100 bg-gray-50">
                <Image src={urlFor(data.adHeader.bannerImage).url()} alt="Iklan Banner" fill className="object-contain" priority />
              </div>
            </a>
          </div>
        )}

        <FeaturedGrid posts={data.featuredPosts || []} />
        
        <div className="flex flex-col lg:flex-row gap-10 mt-12">
          <div className="w-full lg:w-2/3 space-y-16">
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
          
          <aside className="w-full lg:w-1/3 space-y-12">
            <SocialWidget />

            <PopularSection posts={data.popularPosts || []} />

            {/* Iklan Sidebar - DIUBAH MENJADI NON-STICKY & DI TARUH DI BAWAH POPULAR */}
            {data.adSidebar?.bannerImage && (
              <div className="relative">
                <a href={data.adSidebar.destinationUrl} target="_blank" rel="nofollow" className="block group">
                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm border border-gray-100 shadow-md bg-gray-50">
                    <Image src={urlFor(data.adSidebar.bannerImage).url()} alt="Iklan Sidebar" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="text-[9px] text-gray-300 uppercase tracking-widest mt-3 text-center italic font-bold">Informasi Sponsor</p>
                </a>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}