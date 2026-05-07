import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { client, urlFor } from '@/lib/sanity'; 
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import CommentSection from '@/components/CommentSection';
import ShareActions from '@/components/ShareActions';
import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function calculateReadingTime(content: any[]) {
  const wordsPerMinute = 200;
  const text = content?.map(block => 
    block.children?.map((child: any) => child.text).join('')
  ).join(' ') || '';
  const wordCount = text.split(/\s+/g).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// --- FIX METADATA: MENGGANTI HERBANOS PALING BELAKANG ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{title, excerpt, mainImage}`, { slug });
  
  if (!post) return { title: 'Not Found' };

  const ogImage = post.mainImage 
    ? urlFor(post.mainImage).width(1200).height(630).url() 
    : 'https://herbanos.id/images/og-image.png';

  return {
    title: `${post.title} - Herbanos.id | Solusi Kesehatan Alami`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} - Herbanos.id | Solusi Kesehatan Alami`,
      description: post.excerpt,
      url: `https://herbanos.id/${slug}`,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} - Herbanos.id | Solusi Kesehatan Alami`,
      images: [ogImage],
    },
  };
}

const SocialIcon = ({ platform }: { platform: string }) => {
  const normalizedPlatform = platform?.toLowerCase().replace(/\s+/g, '');
  switch (normalizedPlatform) {
    case 'facebook': return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
    case 'instagram': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
    case 'twitter':
    case 'x':
    case 'twitter/x': return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>;
    case 'linkedin': return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>;
    case 'tiktok': return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.42-.33-.23-.65-.5-1.02-.75V15.5c-.13 5.41-5.61 9.47-10.98 8.04-4.52-1.2-7.14-6.36-4.55-10.4 1.44-2.25 4.31-3.21 6.84-2.25V14.5c-1.89-.6-4.22.42-4.47 2.44-.31 2.5 2.1 4.79 4.54 4.13 1.95-.53 3.2-2.58 3.12-4.6V0z"/></svg>;
    case 'youtube': return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48L15.45 11.75z"/></svg>;
    default: return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
  }
};

const IconChevronRight = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;
const IconEye = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconClock = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconMessage = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;

const portableTextComponents = {
  block: {
    h2: ({ children }: any) => <h2 className="text-3xl font-black mt-12 mb-6 text-gray-900 tracking-tight">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-10 mb-5 text-gray-900 border-l-4 border-green-600 pl-4 tracking-tight">{children}</h3>,
    normal: ({ children }: any) => <p className="mb-6 text-gray-700 leading-relaxed text-lg text-justify">{children}</p>, 
  },
};

const SidebarSocialWidget = () => {
  const socials = [
    { name: 'facebook', url: 'https://www.facebook.com/herbanosid', color: 'hover:text-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_0_20px_rgba(24,119,242,0.4)]' },
    { name: 'instagram', url: 'https://www.instagram.com/dwi_rachmawa/', color: 'hover:text-[#E4405F] hover:border-[#E4405F] hover:shadow-[0_0_20px_rgba(228,64,95,0.4)]' },
    { name: 'x', url: 'https://x.com/herbanos', color: 'hover:text-[#000000] hover:border-[#000000] hover:shadow-[0_0_20px_rgba(0,0,0,0.4)]' },
    { name: 'youtube', url: 'https://youtube.com/herbanos', color: 'hover:text-[#FF0000] hover:border-[#FF0000] hover:shadow-[0_0_20px_rgba(255,0,0,0.4)]' },
  ];

  return (
    <div className="mb-10">
      <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-b-2 border-green-700 inline-block pb-1">Ikuti Kami</h3>
      <div className="grid grid-cols-4 gap-3">
        {socials.map((soc) => (
          <a
            key={soc.name}
            href={soc.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center aspect-square border border-gray-100 rounded-xl text-gray-400 transition-all duration-300 bg-white shadow-sm ${soc.color}`}
          >
            <SocialIcon platform={soc.name} />
          </a>
        ))}
      </div>
    </div>
  );
};

// --- FIX: GAMBAR PRODUK DENGAN GARIS PUTIH & DROP SHADOW ---
const SidebarProductWidget = () => (
  <div className="relative bg-gradient-to-br from-green-900 via-green-950 to-black p-8 rounded-3xl overflow-hidden shadow-2xl border border-green-800 group mb-12">
    <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/10 rounded-full blur-[100px] group-hover:bg-green-400/20 transition-all duration-700"></div>
    
    <div className="relative z-10 flex flex-col items-center text-center">
      {/* GARIS PUTIH & DROP SHADOW */}
      <div className="relative w-48 h-48 mb-6 overflow-hidden rounded-2xl border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500 group-hover:scale-105">
        <Image 
          src="/images/nos.jpg" 
          alt="Natura Oil Squa" 
          fill 
          className="object-cover"
        />
      </div>

      <div className="space-y-1 mb-8">
        <h2 className="text-3xl font-black text-white tracking-tighter leading-none">Herbanos</h2>
        <p className="text-[10px] text-green-400 font-bold uppercase tracking-[0.4em] opacity-80">Natura Oil Squa</p>
      </div>

      <Link 
        href="/category/product-knowledge/" 
        className="w-full py-4 bg-white text-green-950 text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-green-50 transition-all shadow-xl active:scale-95 border-b-4 border-gray-200"
      >
        Eksplor Produk
      </Link>
    </div>
  </div>
);

export default async function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const query = `{
    "post": *[_type == "post" && slug.current == $slug][0]{
      title, "slug": slug.current, publishedAt, mainImage, excerpt, content, views,
      "author": author->{ name, "avatar": image.asset->url, bio, socialLinks },
      "categories": categories[]->{title, "slug": slug.current},
      "nextPost": *[_type == "post" && publishedAt > ^.publishedAt] | order(publishedAt asc)[0]{title, "slug": slug.current},
      "prevPost": *[_type == "post" && publishedAt < ^.publishedAt] | order(publishedAt desc)[0]{title, "slug": slug.current},
      "popular": *[_type == "post"] | order(views desc)[0..4]{
        title, "slug": slug.current, publishedAt, mainImage, "authorName": author->name
      }
    },
    "adBawah": *[_type == "ads" && position == "bottom_post" && isActive == true][0]{ destinationUrl, bannerImage },
    "adSidebar": *[_type == "ads" && position == "sidebar" && isActive == true][0]{ destinationUrl, bannerImage }
  }`;

  try {
    const { post, adBawah, adSidebar } = await client.fetch(query, { slug });
    if (!post) notFound();

    const { count: commentCount } = await supabase.from('comments').select('*', { count: 'exact', head: true }).eq('post_slug', slug);

    const shareUrl = `https://herbanos.id/${post.slug}`;
    const readingTime = calculateReadingTime(post.content);
    const dateObj = new Date(post.publishedAt);

    return (
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-2/3">
              <nav className="flex text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-6 items-center">
                <Link href="/" className="hover:text-green-600">Beranda</Link>
                <span className="mx-2"><IconChevronRight /></span>
                <span className="text-green-700">{post.categories?.[0]?.title || 'Umum'}</span>
              </nav>

              <h1 className="text-3xl md:text-5xl font-black mb-6 text-gray-900 leading-tight tracking-tight">{post.title}</h1>

              <div className="flex flex-wrap items-center text-[11px] font-bold text-gray-500 gap-y-4 gap-x-6 mb-8 border-b border-gray-50 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 relative rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                    <Image src={post.author?.avatar || '/images/default-avatar.png'} alt={post.author?.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[9px] text-gray-400 font-medium">Penulis :</span>
                    <span className="text-[13px] font-bold text-gray-900 capitalize tracking-tight">{post.author?.name || 'Admin'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 border-l border-gray-200 pl-4">
                  <span>{dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} <span className="ml-2 font-medium opacity-60">{dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span></span>
                </div>
                <div className="flex items-center gap-5 ml-auto md:ml-0 border-l border-gray-200 pl-6 text-gray-400 font-black">
                  <div className="flex items-center gap-1.5"><IconClock /> {readingTime} Menit</div>
                  <div className="flex items-center gap-1.5"><IconEye /> {post.views || 0}</div>
                  <div className="flex items-center gap-1.5"><IconMessage /> {commentCount || 0}</div>
                </div>
              </div>

              <ShareActions url={shareUrl} title={post.title} />

              {post.mainImage && (
                <div className="mb-10 relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-sm shadow-sm">
                  <Image src={urlFor(post.mainImage).url()} alt={post.title} fill className="object-cover" priority />
                </div>
              )}

              <div className="prose prose-green max-w-none mb-12">
                <PortableText value={post.content} components={portableTextComponents} />
              </div>

              {adBawah?.bannerImage && (
                <div className="mb-12">
                  <a href={adBawah.destinationUrl} target="_blank" rel="nofollow">
                    <div className="relative w-full overflow-hidden rounded-sm shadow-lg border border-gray-100 bg-gray-50">
                      <div className="aspect-[16/5] relative w-full">
                        <Image 
                          src={urlFor(adBawah.bannerImage).url()} 
                          alt={adBawah.bannerImage.alt || "Iklan Herbanos"} 
                          fill 
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>
                  </a>
                  <p className="text-[9px] text-gray-300 uppercase tracking-widest mt-2 text-right italic font-bold">Informasi Produk Pilihan</p>
                </div>
              )}

              <ShareActions url={shareUrl} title={post.title} />

              <div className="bg-gray-50 p-8 flex gap-8 items-center mb-12 border border-gray-100 rounded-sm">
                <div className="w-24 h-24 shrink-0 relative overflow-hidden rounded-full border-4 border-white shadow-md">
                  <Image src={post.author?.avatar || '/images/default-avatar.png'} alt={post.author?.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-gray-900 uppercase text-lg mb-1 tracking-tight">{post.author?.name}</h4>
                  <p className="text-xs text-gray-600 italic leading-relaxed mb-4">{post.author?.bio}</p>
                  <div className="flex gap-3">
                    {post.author?.socialLinks?.map((item: any, idx: number) => (
                      <a key={idx} href={item.url} target="_blank" className="text-gray-400 hover:text-green-700 transition-colors bg-white p-2 rounded-full shadow-sm border border-gray-100 flex items-center justify-center">
                        <SocialIcon platform={item.platform} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <CommentSection postSlug={post.slug} />
            </div>

            {/* --- SIDEBAR STICKY --- */}
            <aside className="w-full lg:w-1/3">
              <div className="sticky top-24 space-y-12 self-start">
                {/* 1. Widget Ikuti Kami */}
                <SidebarSocialWidget />

                {/* 2. Populer Post (Sekarang di bawah widget sosial) */}
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-b-2 border-green-700 inline-block pb-1">Populer Post</h3>
                  <div className="space-y-6">
                    {post.popular?.map((pop: any) => (
                      <Link href={`/${pop.slug}`} key={pop.slug} className="flex gap-4 group">
                        <div className="relative w-20 h-20 shrink-0 overflow-hidden bg-gray-100 rounded-sm shadow-sm">
                          {pop.mainImage && <Image src={urlFor(pop.mainImage).url()} alt={pop.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />}
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="text-[11px] font-bold leading-tight group-hover:text-green-700 transition-colors line-clamp-2 tracking-tight mb-1.5 capitalize">{pop.title}</h4>
                          <div className="text-[9px] text-gray-400 font-bold flex items-center gap-2">
                              <span className="text-green-700/70 capitalize">{pop.authorName?.toLowerCase()}</span>
                              <span>•</span>
                              <span>{new Date(pop.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 3. Product Widget (NOS) */}
                <SidebarProductWidget />

                {/* 4. Ad Sidebar */}
                {adSidebar?.bannerImage && (
                  <div className="group">
                    <a href={adSidebar.destinationUrl} target="_blank" rel="nofollow">
                      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm shadow-md border border-gray-100">
                        <Image src={urlFor(adSidebar.bannerImage).url()} alt="Iklan Sidebar" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                      </div>
                    </a>
                    <p className="text-[9px] text-gray-300 uppercase tracking-widest mt-3 text-center italic font-bold">Informasi Sponsor</p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  } catch (e) {
    console.error(e);
    return notFound();
  }
}