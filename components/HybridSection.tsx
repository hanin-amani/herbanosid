import Image from 'next/image';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

interface HybridSectionProps {
  title: string;
  categorySlug?: string;
}

export default async function HybridSection({ title, categorySlug }: HybridSectionProps) {
  // 1. Query Utama: Coba cari berdasarkan kategori
  const primaryQuery = `*[_type == "post" ${
    categorySlug 
      ? `&& "${categorySlug}" in categories[]->slug.current` 
      : ""
  }] | order(publishedAt desc)[0...5]{
    _id,
    title,
    "slug": slug.current,
    mainImage,
    publishedAt,
    excerpt,
    "authorName": author->name
  }`;

  let posts = await client.fetch(primaryQuery, {}, { next: { revalidate: 60 } });

  // 2. FALLBACK (SISTEM CADANGAN)
  // Jika artikel di kategori tersebut kosong (karena kategori belum dibuat di Sanity),
  // abaikan filter kategori dan ambil 5 artikel terbaru secara umum.
  if (!posts || posts.length === 0) {
    const fallbackQuery = `*[_type == "post"] | order(publishedAt desc)[0...5]{
      _id,
      title,
      "slug": slug.current,
      mainImage,
      publishedAt,
      excerpt,
      "authorName": author->name
    }`;
    posts = await client.fetch(fallbackQuery, {}, { next: { revalidate: 60 } });
  }

  // Jika memang database benar-benar kosong, baru jangan render
  if (!posts || posts.length === 0) return null;

  const mainPost = posts[0];
  const sidePosts = posts.slice(1);

  // Helper format tanggal Indonesia
  const formatDate = (dateString: string) => {
    if (!dateString) return "Tanggal tidak diketahui";
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <section className="mb-12">
      {/* Header Section dengan Aksen Hijau Herbanos */}
      <div className="border-b-2 border-green-700 mb-6 flex">
        <h2 className="bg-green-700 text-white px-4 py-1.5 font-bold text-sm uppercase">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* KOLOM KIRI: Post Utama (Besar) */}
        <div className="flex flex-col">
          <Link href={`/${mainPost.slug}`} className="group block">
            <div className="relative h-64 mb-4 overflow-hidden rounded-sm shadow-sm bg-gray-100">
              {mainPost.mainImage ? (
                <Image 
                  src={urlFor(mainPost.mainImage).url()} 
                  alt={mainPost.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 font-bold uppercase text-xs">No Image</div>
              )}
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-green-700 transition-colors leading-tight line-clamp-2">
              {mainPost.title}
            </h3>
          </Link>
          <div className="text-[11px] text-gray-400 mb-3 flex items-center gap-4 uppercase font-bold tracking-wider">
            <span>{mainPost.authorName || 'Admin'} - {formatDate(mainPost.publishedAt)}</span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3"/> 0
            </span>
          </div>
          <p className="text-sm text-gray-500 italic line-clamp-3 leading-relaxed">
            {mainPost.excerpt || "Baca selengkapnya mengenai informasi kesehatan bermanfaat dari Herbanos..."}
          </p>
        </div>

        {/* KOLOM KANAN: Daftar 4 Post (Kecil) */}
        <div className="flex flex-col gap-5">
          {sidePosts.map((post: any) => (
            <Link 
              key={post._id} 
              href={`/${post.slug}`} 
              className="flex gap-4 items-start group cursor-pointer border-b border-gray-50 pb-4 last:border-0 last:pb-0"
            >
               <div className="relative w-28 h-20 shrink-0 overflow-hidden rounded-sm bg-gray-100 shadow-sm">
                 {post.mainImage ? (
                   <Image 
                     src={urlFor(post.mainImage).url()} 
                     alt={post.title} 
                     fill 
                     className="object-cover transition-transform duration-500 group-hover:scale-110" 
                   />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-[9px] uppercase font-bold">No Img</div>
                 )}
               </div>
               <div className="flex-1">
                 <h4 className="text-sm font-bold leading-tight group-hover:text-green-700 transition-colors line-clamp-2 mb-1">
                   {post.title}
                 </h4>
                 <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
                   {formatDate(post.publishedAt)}
                 </p>
               </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}