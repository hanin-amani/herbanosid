import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// --- KONFIGURASI SEO & MEDIA SOSIAL ---
export const metadata: Metadata = {
  title: {
    default: "Herbanos - Solusi Kesehatan Alami & Herbal Premium",
    template: "%s | Herbanos"
  },
  description: "Temukan berbagai solusi kesehatan alami terpercaya dengan produk herbal berkualitas tinggi hanya di Herbanos. Alami, Aman, dan Berkhasiat.",
  keywords: ["herbal", "kesehatan alami", "obat tradisional", "suplemen herbal", "herbanos Indonesia"],
  authors: [{ name: "Herbanos Team" }],
  metadataBase: new URL("https://herbanos.id"), // Ganti dengan domain asli Anda
  alternates: {
    canonical: "/",
  },
  
  // --- OPEN GRAPH (Facebook, WhatsApp, LinkedIn) ---
  openGraph: {
    title: "Herbanos - Solusi Kesehatan Alami",
    description: "Solusi terbaik untuk kesehatan Anda dengan ramuan herbal pilihan.",
    url: "https://herbanos.id",
    siteName: "Herbanos",
    images: [
      {
        url: "/og-image.jpg", // Pastikan file ini ada di folder public (ukuran ideal 1200x630)
        width: 1200,
        height: 630,
        alt: "Herbanos Promo Banner",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  // --- TWITTER CARD (Muncul Gambar Besar) ---
  twitter: {
    card: "summary_large_image", // Ini kuncinya agar gambar muncul besar
    title: "Herbanos - Solusi Kesehatan Alami",
    description: "Ramuan herbal premium untuk gaya hidup sehat.",
    images: ["/og-image.jpg"], // Gambar yang sama dengan OG
  },

  // --- ICONS (Hasil Download tadi) ---
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          {/* pt-20 disesuaikan dengan tinggi header agar konten tidak tertutup */}
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}