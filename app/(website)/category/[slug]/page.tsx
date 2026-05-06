import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image'; 
import { notFound } from 'next/navigation';
import { SocialWidget } from '@/components/SidebarWidgets';
import NewsTicker from '@/components/NewsTicker';

// --- HELPER: Format Tanggal ---
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export default async function CategoryPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ page?: string }>
}) {
  const { slug } = await params;
  const resolvedParams = await searchParams;
  
  // Konfigurasi 10 Postingan per halaman
  const postsPerPage = 10;
  const currentPage = Number(resolvedParams.page) || 1;
  const startIdx = (currentPage - 1) * postsPerPage;
  const endIdx = startIdx + postsPerPage;

  const query = `{
    "category": *[_type == "category" && slug.current == $slug][0]{ title, description },
    "posts": *[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc)[${startIdx}...${endIdx}]{
      _id, title, "slug": slug.current, mainImage, publishedAt, excerpt,
      "authorName": author->name
    },
    "totalPosts": count(*[_type == "post" && $slug in categories[]->slug.current]),
    "tickerItems": *[_type == "post"] | order(publishedAt desc)[0...5]{ title, "slug": slug.current },
    "popularPosts": *[_type == "post"] | order(views desc)[0...5]{ 
      _id, title, "slug": slug.current, mainImage, publishedAt 
    },
    "adSidebar": *[_type == "ads" && position == "sidebar" && isActive == true][0]{ destinationUrl, bannerImage }
  }`;

  const data = await client.fetch(query, { slug }, { next: { revalidate: 60 } });

  if (!data.category) return notFound();

  const totalPages = Math.ceil(data.totalPosts / postsPerPage);
  const featuredPost = data.posts[0];
  const listPosts = data.posts.slice(1);

  return (
    <main className="bg-white pt-6 min-h-screen">
      <NewsTicker items={data.tickerItems || []} />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* KOLOM KIRI: KONTEN UTAMA */}
          <div className="w-full lg:w-2/3">
            <div className="mb-10 border-b-4 border-green-700 pb-4">
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                Kategori: {data.category.title}
              </h1>
              {data.category.description && (
                <p className="text-gray-600 mt-3 leading-relaxed">{data.category.description}</p>
              )}
            </div>

            {data.posts && data.posts.length > 0 ? (
              <div className="flex flex-col gap-12">
                
                {/* 1. FEATURED POST (THUMBNAIL BESAR) */}
                {featuredPost && (
                  <Link href={`/${featuredPost.slug}`} className="group block border-b border-gray-100 pb-10">
                    <div className="relative w-full h-[300px] md:h-[450px] mb-6 overflow-hidden rounded-sm shadow-md bg-gray-100">
                      {featuredPost.mainImage && (
                        <Image 
                          src={urlFor(featuredPost.mainImage).url()} 
                          alt={featuredPost.title} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-105" 
                          priority
                        />
                      )}
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black text-gray-900 group-hover:text-green-700 transition-colors leading-tight mb-4 tracking-tight">
                      {featuredPost.title}
                    </h2>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-bold uppercase">
                      <span className="text-green-700">{featuredPost.authorName}</span>
                      <span>{formatDate(featuredPost.publishedAt)}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </Link>
                )}

                {/* 2. LIST 9 POSTINGAN */}
                <div className="flex flex-col gap-10">
                  {listPosts.map((post: any) => (
                    <Link href={`/${post.slug}`} key={post._id} className="flex flex-col md:flex-row gap-6 group border-b border-gray-50 pb-8 last:border-0">
                      <div className="relative w-full md:w-56 h-40 shrink-0 overflow-hidden rounded shadow-sm bg-gray-100">
                        {post.mainImage && (
                          <Image src={urlFor(post.mainImage).url()} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-green-700 transition-colors tracking-tight">
                          {post.title}
                        </h3>
                        <div className="text-[11px] text-gray-400 mb-3 font-bold uppercase">
                          {formatDate(post.publishedAt)}
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <Link
                        key={pageNum}
                        href={`/category/${slug}?page=${pageNum}`}
                        className={`w-10 h-10 flex items-center justify-center font-bold rounded-sm border transition-all ${
                          currentPage === pageNum 
                          ? 'bg-green-700 border-green-700 text-white shadow-lg' 
                          : 'bg-white border-gray-200 text-gray-600 hover:border-green-700 hover:text-green-700'
                        }`}
                      >
                        {pageNum}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded border border-dashed border-gray-200">
                <p className="text-gray-400 font-bold">Belum ada artikel di kategori ini.</p>
              </div>
            )}
          </div>

          {/* KOLOM KANAN: SIDEBAR STICKY */}
          <aside className="w-full lg:w-1/3 self-start">
            <div className="sticky top-6 space-y-12">
              <SocialWidget />

              {/* WIDGET TERPOPULER */}
              <div className="bg-white border border-gray-100 p-5 rounded-sm shadow-sm">
                <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-b-2 border-green-700 inline-block pb-1 text-gray-900">
                  Terpopuler
                </h3>
                <div className="space-y-6">
                  {data.popularPosts?.map((pop: any) => (
                    <Link href={`/${pop.slug}`} key={pop._id} className="flex gap-4 group">
                      <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-sm bg-gray-50">
                        {pop.mainImage && <Image src={urlFor(pop.mainImage).url()} alt={pop.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />}
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-[13px] font-bold text-gray-900 leading-tight group-hover:text-green-700 transition-colors line-clamp-2 tracking-tight">
                          {pop.title}
                        </h4>
                        <span className="text-[9px] text-gray-400 font-bold uppercase mt-1">{formatDate(pop.publishedAt)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Iklan Sidebar */}
              {data.adSidebar?.bannerImage && (
                <div className="group">
                  <a href={data.adSidebar.destinationUrl} target="_blank" rel="nofollow" className="block">
                    <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm border border-gray-100 shadow-md">
                      <Image src={urlFor(data.adSidebar.bannerImage).url()} alt="Sponsor" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <p className="text-[9px] text-gray-300 uppercase tracking-widest mt-3 text-center italic font-bold">Informasi Sponsor</p>
                  </a>
                </div>
              )}
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}