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

// --- HELPER: DURASI BACA ---
function calculateReadingTime(content: any[]) {
  const wordsPerMinute = 200;
  const text = content?.map(block => 
    block.children?.map((child: any) => child.text).join('')
  ).join(' ') || '';
  const wordCount = text.split(/\s+/g).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// --- SEO METADATA ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{title, excerpt, mainImage}`, { slug });
  if (!post) return { title: 'Not Found' };
  return {
    title: `${post.title} - Herbanos.id`,
    description: post.excerpt,
    openGraph: { images: post.mainImage ? [urlFor(post.mainImage).url()] : [] }
  };
}

// --- ICONS MAPPING SOSMED PENULIS (FIXED CASE SENSITIVITY) ---
const SocialIcon = ({ platform }: { platform: string }) => {
  // Ubah ke lowercase dan hilangkan spasi untuk memastikan pencocokan string akurat
  const normalizedPlatform = platform?.toLowerCase().replace(/\s+/g, '');

  switch (normalizedPlatform) {
    case 'facebook': return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
    case 'instagram': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
    case 'twitter':
    case 'x':
    case 'twitter/x': return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>;
    case 'linkedin': return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>;
    case 'website': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
    // Icon default (link chain) jika platform tidak dikenali
    default: return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
  }
};

const IconChevronRight = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;
const IconEye = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconClock = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconMessage = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;

// --- FIXED: STYLING PORTABLE TEXT ---
// Menambahkan spasi bawah (mb-6) agar paragraf tidak saling menempel
const portableTextComponents = {
  block: {
    h2: ({ children }: any) => <h2 className="text-3xl font-black mt-12 mb-6 text-gray-900">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-10 mb-5 text-gray-900 border-l-4 border-green-600 pl-4 uppercase tracking-tighter">{children}</h3>,
    normal: ({ children }: any) => <p className="mb-6 text-gray-700 leading-relaxed text-lg text-justify">{children}</p>, // mb-6 adalah kunci jeda antar paragraf
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc ml-6 mb-8 space-y-2 text-gray-700 text-lg">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal ml-6 mb-8 space-y-2 text-gray-700 text-lg">{children}</ol>,
  },
};

// --- COMPONENT UTAMA ---
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
    "adBawah": *[_type == "ads" && posisi == "Bawah Artikel" && aktif == true][0]{
       linkTujuan, altText, gambarBanner
    }
  }`;

  try {
    const { post, adBawah } = await client.fetch(query, { slug });
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
              
              {/* Breadcrumbs */}
              <nav className="flex text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-6 items-center">
                <Link href="/" className="hover:text-green-600">Beranda</Link>
                <span className="mx-2"><IconChevronRight /></span>
                <span className="text-green-700">{post.categories?.[0]?.title || 'Umum'}</span>
              </nav>

              <h1 className="text-3xl md:text-5xl font-black mb-6 text-gray-900 leading-tight tracking-tighter uppercase">
                {post.title}
              </h1>

              {/* Metadata Bar (2 Baris Author) */}
              <div className="flex flex-wrap items-center text-[11px] font-bold text-gray-500 gap-y-4 gap-x-6 mb-8 border-b border-gray-50 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 relative rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                    <Image src={post.author?.avatar || '/images/default-avatar.png'} alt={post.author?.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[9px] text-gray-400 font-medium lowercase">Penulis :</span>
                    <span className="text-[13px] font-bold text-gray-900 capitalize tracking-tight">{post.author?.name || 'Admin'}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 border-l border-gray-200 pl-4">
                  <span>
                    {dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} 
                    <span className="ml-2 font-medium opacity-60">{dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                  </span>
                </div>

                <div className="flex items-center gap-5 ml-auto md:ml-0 border-l border-gray-200 pl-6 text-gray-400 font-black uppercase">
                  <div className="flex items-center gap-1.5"><IconClock /> {readingTime} Menit</div>
                  <div className="flex items-center gap-1.5"><IconEye /> {post.views || 0}</div>
                  <div className="flex items-center gap-1.5"><IconMessage /> {commentCount || 0}</div>
                </div>
              </div>

              <ShareActions url={shareUrl} title={post.title} />

              {/* Image */}
              {post.mainImage && (
                <div className="mb-10 relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-sm shadow-sm">
                  <Image src={urlFor(post.mainImage).url()} alt={post.title} fill className="object-cover" priority />
                </div>
              )}

              {/* Content (Dengan spasi paragraf) */}
              <div className="prose prose-green max-w-none mb-12">
                <PortableText value={post.content} components={portableTextComponents} />
              </div>

              {/* Iklan Bawah Artikel */}
              {adBawah?.gambarBanner && (
                <div className="mb-12">
                  <a href={adBawah.linkTujuan} target="_blank" rel="nofollow">
                    <div className="relative w-full aspect-[16/5] md:aspect-[16/3] overflow-hidden rounded-sm shadow-lg border border-gray-100 bg-gray-50">
                      <Image src={urlFor(adBawah.gambarBanner).url()} alt={adBawah.altText || "Iklan Promo"} fill className="object-cover hover:opacity-95" />
                    </div>
                  </a>
                  <p className="text-[9px] text-gray-300 uppercase tracking-widest mt-2 text-right italic font-bold">Informasi Produk Pilihan</p>
                </div>
              )}

              <ShareActions url={shareUrl} title={post.title} />

              {/* Navigasi */}
              <div className="flex flex-col md:flex-row justify-between border-t border-b border-gray-100 py-8 mb-12 gap-6">
                <div className="w-full md:w-1/2">
                  {post.prevPost && (
                    <Link href={`/${post.prevPost.slug}`} className="block group">
                      <span className="text-gray-400 text-[10px] font-black uppercase mb-1 block tracking-widest">Sebelumnya</span>
                      <span className="font-bold text-gray-800 group-hover:text-green-700 transition-colors block">{post.prevPost.title}</span>
                    </Link>
                  )}
                </div>
                <div className="w-full md:w-1/2 text-left md:text-right">
                  {post.nextPost && (
                    <Link href={`/${post.nextPost.slug}`} className="block group">
                      <span className="text-gray-400 text-[10px] font-black uppercase mb-1 block tracking-widest">Selanjutnya</span>
                      <span className="font-bold text-gray-800 group-hover:text-green-700 transition-colors block">{post.nextPost.title}</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Box Penulis dengan Sosmed Ikon Asli */}
              <div className="bg-gray-50 p-8 flex gap-8 items-center mb-12 border border-gray-100 rounded-sm">
                <div className="w-24 h-24 shrink-0 relative overflow-hidden rounded-full border-4 border-white shadow-md">
                  <Image src={post.author?.avatar || '/images/default-avatar.png'} alt={post.author?.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-gray-900 uppercase text-lg mb-1 tracking-tight">{post.author?.name}</h4>
                  <p className="text-xs text-gray-600 italic leading-relaxed mb-4">{post.author?.bio}</p>
                  <div className="flex gap-3">
                    {post.author?.socialLinks?.map((item: any, idx: number) => (
                      <a key={idx} href={item.url} target="_blank" title={item.platform} className="text-gray-400 hover:text-green-700 transition-colors bg-white p-2 rounded-full shadow-sm border border-gray-100 flex items-center justify-center">
                        <SocialIcon platform={item.platform} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <CommentSection postSlug={post.slug} />
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-1/3 space-y-12">
              <div className="bg-green-900 text-white p-10 rounded-sm text-center relative shadow-xl overflow-hidden">
                  <h2 className="text-4xl font-black block leading-none mb-4 uppercase tracking-tighter">HERBANOS</h2>
                  <Link href="/produk" className="inline-block border-2 border-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-green-900 transition-all">Eksplor Produk</Link>
              </div>

              <div>
                <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-b-2 border-green-700 inline-block pb-1">Populer Post</h3>
                <div className="space-y-6">
                  {post.popular?.map((pop: any) => (
                    <Link href={`/${pop.slug}`} key={pop.slug} className="flex gap-4 group">
                      <div className="relative w-20 h-20 shrink-0 overflow-hidden bg-gray-100 rounded-sm shadow-sm">
                        {pop.mainImage && <Image src={urlFor(pop.mainImage).url()} alt={pop.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />}
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-[11px] font-bold leading-tight group-hover:text-green-700 transition-colors line-clamp-2 uppercase tracking-tighter mb-1.5">{pop.title}</h4>
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
            </aside>
          </div>
        </div>
      </div>
    );
  } catch (e) {
    console.error("Build/Runtime Error:", e);
    return notFound();
  }
}