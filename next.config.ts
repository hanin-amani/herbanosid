/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mempertahankan struktur URL WordPress (Opsi A)
  trailingSlash: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // Persiapan untuk aset dari Sanity
      },
    ],
  },
};

module.exports = nextConfig;