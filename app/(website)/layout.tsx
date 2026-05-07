// app/(website)/layout.tsx
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// --- KONFIGURASI SEO & MEDIA SOSIAL TAK TERTANDINGI ---
export const metadata: Metadata = {
  // 1. Metadata Base (WAJIB agar URL gambar menjadi absolut)
  metadataBase: new URL("https://herbanos.id"),

  title: {
    default: "Herbanos - Solusi Kesehatan Alami & Herbal Premium",
    template: "%s | Herbanos"
  },
  description: "Pusat konsultasi kesehatan alami terpercaya. Menyediakan suplemen herbal premium seperti Natura Oil Squa untuk pemulihan jantung dan stroke.",
  
  // 2. Keyword Spesifik (Optimasi Pencarian)
  keywords: [
    "herbal", 
    "kesehatan alami", 
    "Natura Oil Squa", 
    "obat stroke herbal", 
    "herbal jantung koroner", 
    "suplemen kesehatan", 
    "konsultasi herbal online",
    "Herbanos Indonesia"
  ],

  authors: [{ name: "Herbanos Team", url: "https://herbanos.id" }],
  creator: "Herbanos",
  publisher: "Herbanos",

  // 3. Robot Crawler (Instruksi Mesin Pencari)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: "https://herbanos.id",
  },
  
  // 4. OPEN GRAPH (Pusat Kendali Gambar WhatsApp/FB)
  openGraph: {
    title: "Herbanos - Solusi Kesehatan Alami",
    description: "Dapatkan solusi pemulihan kesehatan dengan ramuan herbal pilihan dan konsultasi ahli.",
    url: "https://herbanos.id",
    siteName: "Herbanos",
    images: [
      {
        url: "/images/og-image.png", // FIX: Menggunakan path PNG sesuai lokasi file Bos
        width: 1200,
        height: 630,
        alt: "Herbanos - Solusi Kesehatan Alami & Herbal Premium",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  // 5. TWITTER CARD
  twitter: {
    card: "summary_large_image", 
    title: "Herbanos - Solusi Kesehatan Alami",
    description: "Suplemen herbal premium Natura Oil Squa untuk gaya hidup sehat.",
    images: ["/images/og-image.png"], // FIX: Path PNG
    creator: "@herbanos",
  },

  // 6. VERIFIKASI (Ganti kode verifikasi jika sudah ada dari Google Search Console)
  verification: {
    google: "kode-verifikasi-google-search-console-anda",
  },

  // 7. FAVICON & ICONS
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* pt-20 untuk memberi ruang bagi sticky header agar konten tidak tertutup */}
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}