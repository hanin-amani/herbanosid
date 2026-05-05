import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity'; // Pastikan jalur impor ini benar sesuai folder lib Anda

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://herbanos.id';

  // Menarik data berdasarkan tipe 'post' yang ada di folder schemas Anda
  const query = `*[_type == "post"] {
    "slug": slug.current,
    "updatedAt": _updatedAt
  }`;
  
  const posts = await client.fetch(query);

  const postUrls = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/katalog-herbal`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...postUrls,
  ];
}