import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// 1. Konfigurasi Client Sanity
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-05-06', 
  useCdn: false, // 'false' untuk menjamin data sitemap selalu terbaru
});

// 2. Konfigurasi Image Helper
const builder = imageUrlBuilder(client);

/**
 * Fungsi urlFor digunakan untuk memproses gambar dari Sanity.
 * Sangat penting untuk SEO Gambar dan kecepatan load (LCP).
 * Contoh pakai: urlFor(post.mainImage).width(800).url()
 */
export function urlFor(source: any) {
  return builder.image(source);
}