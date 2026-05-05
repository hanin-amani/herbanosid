import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

interface Post {
  _id: string;
  title: string;
  slug: string;
  mainImage?: any;
  category?: string;
  publishedAt?: string;
}

export default function FeaturedGrid({ posts }: { posts: Post[] }) {
  // Guard clause: Jika data belum ada, jangan render apa pun atau tampilkan loading
  if (!posts || posts.length === 0) return null;

  // Fungsi helper untuk mendapatkan URL gambar dengan aman
  const getImageUrl = (post: Post) => {
    if (!post.mainImage || !post.mainImage.asset) {
      return '/images/placeholder.jpg'; // Pastikan Anda punya file ini di folder public
    }
    return urlFor(post.mainImage).url();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-auto lg:h-[500px]">
      {/* Utama (Kiri) - Post ke-0 */}
      <Link 
        href={`/${posts[0].slug}`}
        className="lg:col-span-2 relative group overflow-hidden cursor-pointer h-[300px] lg:h-full rounded-sm shadow-sm"
      >
        <Image 
          src={getImageUrl(posts[0])} 
          alt={posts[0].title} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent p-6 flex flex-col justify-end">
          <span className="bg-green-700 text-white text-[10px] px-2 py-0.5 w-fit mb-2 font-bold uppercase">
            {posts[0].category || 'Update'}
          </span>
          <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight group-hover:underline">
            {posts[0].title}
          </h2>
        </div>
      </Link>

      {/* Samping (Kanan) - Post ke-1 dan ke-2 */}
      <div className="grid grid-rows-2 gap-4 h-full">
        {posts.slice(1, 3).map((post) => (
          <Link 
            key={post._id}
            href={`/${post.slug}`}
            className="relative group overflow-hidden cursor-pointer rounded-sm shadow-sm"
          >
            <Image 
              src={getImageUrl(post)} 
              alt={post.title} 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent p-4 flex flex-col justify-end">
              <span className="bg-green-700 text-white text-[9px] px-2 py-0.5 w-fit mb-1 font-bold uppercase">
                {post.category || 'Info'}
              </span>
              <h3 className="text-white text-sm font-bold leading-tight line-clamp-2 group-hover:underline">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}