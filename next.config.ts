import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. Mempertahankan format URL dengan slash di akhir */
  trailingSlash: true,

  /* 2. Mengizinkan kompilasi modul Sanity agar tidak error CSS/ESM */
  transpilePackages: ["sanity", "next-sanity"],

  /* 3. Konfigurasi Keamanan Gambar (Remote Patterns) */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
  },

  /* 4. Meneruskan Variabel Lingkungan ke Client jika diperlukan */
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
};

export default nextConfig;