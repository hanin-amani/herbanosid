import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import CommentSection from '@/components/CommentSection'; // Memanggil komponen komentar

// --- CUSTOM SVG ICONS ---
const IconChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);
const IconCalendar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);
const IconEye = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);
const IconShare = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
);
const IconLink = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
);

// --- SOCIAL SHARE ICONS ---
const IconFacebook = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const IconX = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const IconPinterest = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 4.3 2.7 8 6.5 9.5-.1-1-.2-2.5 0-3.6.2-1 .9-4.5.9-4.5s-.2-.5-.2-1.3c0-1.2.7-2.1 1.6-2.1.8 0 1.2.6 1.2 1.3 0 .8-.5 2-.8 3.1-.2.9.5 1.7 1.4 1.7 1.7 0 3-1.8 3-4 0-1.7-1.3-3-3.3-3-2.4 0-3.8 1.8-3.8 3.7 0 .8.3 1.6.7 2 .1.1.1.2.1.3-.1.4-.3 1-.3 1.1-.1.2-.2.2-.4.1-1.3-.6-2-2.5-2-4 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.4 2.6 6.4 6 0 3.6-2.2 6.5-5.3 6.5-1.1 0-2.1-.6-2.4-1.2 0 0-.5 2-.6 2.4-.2.8-.7 1.8-1 2.4 1.1.3 2.3.5 3.5.5 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>;
const IconWhatsApp = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.022-.967-.264-.099-.456-.149-.648.149-.192.297-.764.967-.936 1.165-.172.198-.344.223-.64.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.648-1.565-.888-2.143-.232-.564-.468-.488-.64-.497-.168-.009-.36-.011-.552-.011-.192 0-.504.074-.77.371-.264.298-1.008.985-1.008 2.4s1.032 2.775 1.176 2.969c.144.194 2.024 3.085 4.903 4.331.686.297 1.222.474 1.638.607.688.22 1.314.189 1.808.114.555-.084 1.706-.697 1.944-1.37.238-.673.238-1.25.168-1.37-.07-.12-.262-.194-.558-.343zM12 22c-1.644 0-3.255-.424-4.664-1.229l-.334-.19L3.486 21.5l1.01-3.418-.209-.333C3.487 16.326 3 14.218 3 12c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9z"/></svg>;
const IconTelegram = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.32.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>;

// Custom Components untuk PortableText
const portableTextComponents = {
  block: {
    h3: ({ children }: any) => <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">{children}</h3>,
    normal: ({ children }: any) => <p className="mb-5 text-gray-700 leading-relaxed text-justify">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc ml-6 mb-6 space-y-2 text-gray-700">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal ml-6 mb-6 space-y-2 text-gray-700">{children}</ol>,
  },
};

export default async function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Query GROQ
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    excerpt,
    content, 
    views,
    "author": author->{name, "avatar": image.asset->url, "bio": bio},
    "categories": categories[]->{title, "slug": slug.current},
    
    "nextPost": *[_type == "post" && publishedAt > ^.publishedAt] | order(publishedAt asc)[0]{
      title, "slug": slug.current
    },
    "prevPost": *[_type == "post" && publishedAt < ^.publishedAt] | order(publishedAt desc)[0]{
      title, "slug": slug.current
    },

    "related": *[_type == "post" && categories[0]._ref == ^.categories[0]._ref && slug.current != $slug] | order(publishedAt desc)[0..1]{
        title, "slug": slug.current, mainImage
    },
    "popular": *[_type == "post"] | order(views desc)[0..2]{
        title, "slug": slug.current, publishedAt, mainImage
    }
  }`;

  const post = await client.fetch(query, { slug });

  if (!post) {
    notFound();
  }

  const shareUrl = `https://herbanos.id/${post.slug}`;

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* --- MAIN CONTENT --- */}
          <div className="w-full lg:w-2/3">
            {/* Breadcrumb */}
            <nav className="flex text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-6 items-center">
              <Link href="/" className="hover:text-green-600">Beranda</Link>
              <span className="mx-2 text-gray-300"><IconChevronRight /></span>
              <span className="text-green-700">{post.categories?.[0]?.title || 'Umum'}</span>
              <span className="mx-2 text-gray-300"><IconChevronRight /></span>
              <span className="truncate text-gray-500 max-w-[200px]">{post.title}</span>
            </nav>

            <div className="bg-green-700 text-white text-[10px] inline-block px-2 py-0.5 mb-4 font-bold uppercase tracking-widest">
              {post.categories?.[0]?.title || 'Herbanos Update'}
            </div>

            <h1 className="text-3xl md:text-5xl font-black mb-6 text-gray-900 leading-tight tracking-tighter">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center text-[11px] font-bold tracking-wide text-gray-500 gap-4 mb-4">
              <span className="text-gray-900">Penulis <strong>{post.author?.name || 'Admin'}</strong></span>
              <span>-</span>
              <span>{new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <div className="ml-auto flex gap-4">
                 <div className="flex items-center gap-1.5"><IconEye /> {post.views || 0}</div>
                 <div className="flex items-center gap-1.5">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                   0
                 </div>
              </div>
            </div>

            {/* --- SHARE BUTTONS ATAS --- */}
            <div className="flex flex-wrap gap-2 mb-8">
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#3b5998] text-white px-3 py-1.5 text-xs rounded-sm hover:opacity-90 transition-opacity">
                <IconFacebook /> Facebook
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-black text-white px-3 py-1.5 text-xs rounded-sm hover:opacity-90 transition-opacity">
                <IconX /> <span className="uppercase px-1 border-l border-white/20 ml-1">x</span>
              </a>
              <a href={`https://pinterest.com/pin/create/button/?url=${shareUrl}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#bd081c] text-white px-3 py-1.5 text-xs rounded-sm hover:opacity-90 transition-opacity">
                <IconPinterest /> Pinterest
              </a>
              <a href={`https://api.whatsapp.com/send?text=${post.title} %0A%0A ${shareUrl}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#25D366] text-white px-3 py-1.5 text-xs rounded-sm hover:opacity-90 transition-opacity">
                <IconWhatsApp /> WhatsApp
              </a>
              <a href={`https://telegram.me/share/url?url=${shareUrl}&text=${post.title}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#0088cc] text-white px-3 py-1.5 text-xs rounded-sm hover:opacity-90 transition-opacity">
                <IconTelegram /> Telegram
              </a>
            </div>

            {/* Featured Image */}
            {post.mainImage && (
              <div className="mb-8 relative w-full h-[300px] md:h-[480px] overflow-hidden rounded-sm shadow-sm">
                <Image 
                  src={urlFor(post.mainImage).url()} 
                  alt={post.title} 
                  fill 
                  className="object-cover" 
                  priority 
                />
              </div>
            )}

            {/* Content Body */}
            <div className="prose prose-green max-w-none mb-12 border-b border-gray-100 pb-12">
              {post.content ? (
                <PortableText value={post.content} components={portableTextComponents} />
              ) : (
                <p className="text-gray-500 italic">Isi artikel tidak tersedia.</p>
              )}
            </div>

            {/* --- SHARE BUTTONS BAWAH --- */}
            <div className="flex flex-wrap items-center gap-0 mb-10">
              <div className="flex items-center border border-gray-200 py-1.5 px-3 mr-3 text-sm font-bold shadow-sm relative">
                 <IconShare className="mr-2" /> Bagikan
                 <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-t border-r border-gray-200 rotate-45"></div>
              </div>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} className="bg-[#3b5998] text-white w-9 h-9 flex items-center justify-center hover:opacity-90"><IconFacebook /></a>
              <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`} className="bg-black text-white w-9 h-9 flex items-center justify-center hover:opacity-90"><IconX /></a>
              <a href={`https://pinterest.com/pin/create/button/?url=${shareUrl}`} className="bg-[#bd081c] text-white w-9 h-9 flex items-center justify-center hover:opacity-90"><IconPinterest /></a>
              <a href={`https://api.whatsapp.com/send?text=${post.title} %0A%0A ${shareUrl}`} className="bg-[#25D366] text-white w-9 h-9 flex items-center justify-center hover:opacity-90"><IconWhatsApp /></a>
              <a href={`https://telegram.me/share/url?url=${shareUrl}&text=${post.title}`} className="bg-[#0088cc] text-white w-9 h-9 flex items-center justify-center hover:opacity-90"><IconTelegram /></a>
              <button className="bg-black text-white w-9 h-9 flex items-center justify-center hover:opacity-90"><IconLink /></button>
            </div>

            {/* --- NAVIGASI NEXT/PREV ARTICLE --- */}
            <div className="flex flex-col md:flex-row justify-between border-t border-b border-gray-100 py-6 mb-10 gap-6">
              <div className="w-full md:w-1/2">
                {post.prevPost && (
                  <Link href={`/${post.prevPost.slug}`} className="block group">
                    <span className="text-gray-400 text-xs mb-1 block">Artikel Sebelumnya</span>
                    <span className="font-medium text-gray-800 group-hover:text-green-700 transition-colors leading-tight block">{post.prevPost.title}</span>
                  </Link>
                )}
              </div>
              <div className="w-full md:w-1/2 text-left md:text-right">
                {post.nextPost && (
                  <Link href={`/${post.nextPost.slug}`} className="block group">
                    <span className="text-gray-400 text-xs mb-1 block">Artikel selanjutnya</span>
                    <span className="font-medium text-gray-800 group-hover:text-green-700 transition-colors leading-tight block">{post.nextPost.title}</span>
                  </Link>
                )}
              </div>
            </div>

            {/* --- AUTHOR BOX --- */}
            <div className="border border-gray-100 p-6 flex gap-6 items-center mb-12">
              <div className="w-24 h-24 bg-gray-200 shrink-0 relative overflow-hidden rounded-sm">
                {post.author?.avatar ? (
                  <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{post.author?.name || 'Admin'}</h3>
                {post.author?.bio && <p className="text-sm text-gray-600 leading-relaxed">{post.author.bio}</p>}
              </div>
            </div>

            {/* --- ARTIKEL TERKAIT --- */}
            {post.related && post.related.length > 0 && (
              <div className="mb-12">
                <div className="border-b-2 border-green-700 mb-6 flex">
                  <h3 className="bg-green-700 text-white px-4 py-1.5 font-bold text-xs uppercase">Artikel Terkait</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {post.related.map((related: any, idx: number) => (
                    <Link href={`/${related.slug}`} key={idx} className="group cursor-pointer">
                      <div className="relative h-44 w-full mb-3 overflow-hidden rounded-sm bg-gray-100 shadow-sm">
                        {related.mainImage ? (
                           <Image src={urlFor(related.mainImage).url()} alt={related.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-xs font-bold uppercase">No Image</div>
                        )}
                      </div>
                      <h4 className="font-bold text-sm leading-tight group-hover:text-green-700 transition-colors">{related.title}</h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* --- KOMENTAR --- */}
            <CommentSection />

          </div>

          {/* --- SIDEBAR --- */}
          <aside className="w-full lg:w-1/3 space-y-10">
            {/* Banner Produk */}
            <div className="bg-blue-900 text-white aspect-[3/4] flex flex-col items-center justify-center p-8 rounded-sm text-center relative overflow-hidden group shadow-md">
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-10 transition-opacity"></div>
                <div className="z-10">
                  <span className="text-[10px] font-bold tracking-[0.3em] opacity-60 block mb-4 uppercase">Herbanos Official</span>
                  <span className="text-4xl font-black block leading-none mb-2">HERBANOS</span>
                  <p className="text-xs opacity-80 mb-8 italic">Solusi Alami Kesehatan Keluarga</p>
                  <Link href="/produk" className="border-2 border-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-blue-900 transition-all">Lihat Produk</Link>
                </div>
            </div>

            {/* Popular Posts */}
            {post.popular && post.popular.length > 0 && (
              <div className="space-y-6">
                <div className="border-b-2 border-green-700 mb-6 flex">
                  <h3 className="bg-green-700 text-white px-4 py-1.5 font-bold text-xs uppercase">Populer Post</h3>
                </div>
                <div className="flex flex-col gap-4">
                  {post.popular.map((pop: any, idx: number) => (
                    <Link href={`/${pop.slug}`} key={idx} className="flex gap-4 group cursor-pointer items-center border-b border-gray-50 pb-4 last:border-0">
                      <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-sm bg-gray-100">
                        {pop.mainImage ? (
                          <Image src={urlFor(pop.mainImage).url()} alt={pop.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full bg-gray-200"></div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold leading-tight group-hover:text-green-700 transition-colors mb-1 line-clamp-2">{pop.title}</h4>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                          {new Date(pop.publishedAt).toLocaleDateString('id-ID')}
                        </span>
                      </div>
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