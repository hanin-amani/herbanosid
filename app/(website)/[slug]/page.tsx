import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { client, urlFor } from '@/lib/sanity'; // Gunakan import yang baru kita buat
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import CommentSection from '@/components/CommentSection';
import { Metadata } from 'next';

// --- SEO DYNAMIC METADATA ---
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{title, excerpt}`, { slug: params.slug });
  if (!post) return { title: 'Not Found' };
  return {
    title: `${post.title} - Herbanos.id`,
    description: post.excerpt,
    openGraph: { images: [urlFor(post.mainImage).url()] }
  };
}

// --- ICON COMPONENTS (Simplified for brevity, keep yours as is) ---
const IconChevronRight = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;
const IconEye = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconShare = ({ className }: { className?: string }) => <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;

const portableTextComponents = {
  block: {
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-10 mb-5 text-gray-900 border-l-4 border-green-600 pl-4">{children}</h3>,
    normal: ({ children }: any) => <p className="mb-6 text-gray-700 leading-relaxed text-lg text-justify">{children}</p>,
  },
};

export default async function BlogPostDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // QUERY UPDATE: Menambahkan pencarian Iklan Aktif
  const query = `{
    "post": *[_type == "post" && slug.current == $slug][0]{
      title, "slug": slug.current, publishedAt, mainImage, excerpt, content, views,
      "author": author->{name, "avatar": image.asset->url, "bio": bio},
      "categories": categories[]->{title, "slug": slug.current},
      "nextPost": *[_type == "post" && publishedAt > ^.publishedAt] | order(publishedAt asc)[0]{title, "slug": slug.current},
      "prevPost": *[_type == "post" && publishedAt < ^.publishedAt] | order(publishedAt desc)[0]{title, "slug": slug.current},
      "related": *[_type == "post" && categories[0]._ref == ^.categories[0]._ref && slug.current != $slug] | order(publishedAt desc)[0..1]{title, "slug": slug.current, mainImage},
      "popular": *[_type == "post"] | order(views desc)[0..2]{title, "slug": slug.current, publishedAt, mainImage}
    },
    "adBawah": *[_type == "ads" && posisi == "Bawah Artikel" && aktif == true][0]
  }`;

  const { post, adBawah } = await client.fetch(query, { slug });

  if (!post) notFound();

  const shareUrl = `https://herbanos.id/${post.slug}`;

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="w-full lg:w-2/3">
            {/* Breadcrumbs */}
            <nav className="flex text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-6 items-center">
              <Link href="/" className="hover:text-green-600">Beranda</Link>
              <span className="mx-2"><IconChevronRight /></span>
              <span className="text-green-700">{post.categories?.[0]?.title || 'Umum'}</span>
            </nav>

            <h1 className="text-3xl md:text-5xl font-black mb-6 text-gray-900 leading-tight tracking-tighter">
              {post.title}
            </h1>

            {/* Metadata Bar */}
            <div className="flex items-center text-[11px] font-bold text-gray-500 gap-4 mb-8 border-b border-gray-50 pb-4">
              <span className="text-gray-900 uppercase">Oleh {post.author?.name || 'Admin'}</span>
              <span>•</span>
              <span>{new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <div className="ml-auto flex items-center gap-1.5"><IconEye /> {post.views || 0}</div>
            </div>

            {/* Main Image */}
            {post.mainImage && (
              <div className="mb-10 relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-sm shadow-sm group">
                <Image src={urlFor(post.mainImage).url()} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" priority />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-green max-w-none mb-12">
              <PortableText value={post.content} components={portableTextComponents} />
            </div>

            {/* --- IKLAN DINAMIS (Bawah Artikel) --- */}
            {adBawah && (
              <div className="mb-12">
                <a href={adBawah.linkTujuan} target="_blank" rel="nofollow">
                  <div className="relative w-full aspect-[16/5] md:aspect-[16/3] overflow-hidden rounded-sm shadow-lg border border-gray-100">
                    <Image 
                      src={urlFor(adBawah.gambarBanner).url()} 
                      alt={adBawah.altText || "Iklan Herbanos"} 
                      fill 
                      className="object-cover hover:opacity-90 transition-opacity"
                    />
                  </div>
                </a>
                <p className="text-[9px] text-gray-300 uppercase tracking-widest mt-2 text-right italic">Informasi Produk Pilihan</p>
              </div>
            )}

            {/* Share Buttons */}
            <div className="flex flex-wrap items-center gap-0 mb-12">
              <div className="flex items-center border border-gray-200 py-2 px-4 mr-3 text-sm font-bold shadow-sm relative bg-gray-50">
                <IconShare className="mr-2" /> Bagikan
              </div>
              {/* Tambahkan button share Facebook, WA, dll di sini */}
            </div>

            {/* Comment Section: SEKARANG DENGAN SLUG */}
            <CommentSection postSlug={post.slug} />

          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/3 space-y-12">
            <div className="bg-green-900 text-white p-10 rounded-sm text-center relative overflow-hidden shadow-xl group">
                <div className="z-10 relative">
                  <span className="text-[10px] font-bold tracking-[0.4em] opacity-70 block mb-4 uppercase">Herbanos Official</span>
                  <h2 className="text-4xl font-black block leading-none mb-4">HERBANOS</h2>
                  <p className="text-sm opacity-90 mb-8 italic leading-relaxed">Rahasia Herbal Nusantara untuk Vitalitas Modern</p>
                  <Link href="/produk" className="inline-block border-2 border-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-green-900 transition-all">Eksplor Produk</Link>
                </div>
            </div>

            {/* Popular Posts */}
            {post.popular && (
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-b-2 border-green-700 inline-block pb-1">Populer</h3>
                <div className="space-y-6">
                  {post.popular.map((pop: any) => (
                    <Link href={`/${pop.slug}`} key={pop.slug} className="flex gap-4 group">
                      <div className="relative w-20 h-20 shrink-0 overflow-hidden bg-gray-100 rounded-sm">
                        {pop.mainImage && <Image src={urlFor(pop.mainImage).url()} alt={pop.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />}
                      </div>
                      <h4 className="text-xs font-bold leading-tight group-hover:text-green-700 transition-colors line-clamp-2">{pop.title}</h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>

        </div>
      </div>
    </div>
  );
}