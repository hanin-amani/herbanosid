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

  if (!posts || posts.length === 0) {
    const fallbackQuery = `*[_type == "post"] | order(publishedAt desc)[0...5]{
      _id, title, "slug": slug.current, mainImage, publishedAt, excerpt, "authorName": author->name
    }`;
    posts = await client.fetch(fallbackQuery, {}, { next: { revalidate: 60 } });
  }

  if (!posts || posts.length === 0) return null;

  const mainPost = posts[0];
  const sidePosts = posts.slice(1);

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
      {/* Header Section: Hapus 'uppercase' agar tidak kapital semua */}
      <div className="border-b-2 border-green-700 mb-6 flex">
        <h2 className="bg-green-700 text-white px-4 py-1.5 font-bold text-sm tracking-tight">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            <h3 className="text-xl font-bold mb-2 group-hover:text-green-700 transition-colors leading-tight line-clamp-2 tracking-tight text-gray-900">
              {mainPost.title}
            </h3>
          </Link>
          <div className="text-[11px] text-gray-400 mb-3 flex items-center gap-4 uppercase font-bold tracking-wider">
            <span className="text-green-700/80">{mainPost.authorName || 'Admin'}</span>
            <span>{formatDate(mainPost.publishedAt)}</span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3"/> 0
            </span>
          </div>
          {/* FIX: Hapus class 'italic' agar teks tegak/normal */}
          <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
            {mainPost.excerpt || "Baca selengkapnya mengenai informasi kesehatan bermanfaat dari Herbanos..."}
          </p>
        </div>

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
                 <h4 className="text-sm font-bold leading-tight group-hover:text-green-700 transition-colors line-clamp-2 mb-1 text-gray-900 tracking-tight">
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