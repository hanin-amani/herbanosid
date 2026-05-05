// app/(website)/layout.tsx
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// --- KONFIGURASI SEO & MEDIA SOSIAL TAK TERTANDINGI ---
export const metadata: Metadata = {
  title: {
    default: "Herbanos - Solusi Kesehatan Alami & Herbal Premium",
    template: "%s | Herbanos"
  },
  description: "Temukan berbagai solusi kesehatan alami terpercaya dengan produk herbal berkualitas tinggi hanya di Herbanos. Alami, Aman, dan Berkhasiat.",
  keywords: ["herbal", "kesehatan alami", "obat tradisional", "suplemen herbal", "herbanos Indonesia"],
  metadataBase: new URL("https://herbanos.id"),
  alternates: {
    canonical: "/",
  },
  
  // OPEN GRAPH (Muncul di WhatsApp/FB)
  openGraph: {
    title: "Herbanos - Solusi Kesehatan Alami",
    description: "Solusi terbaik untuk kesehatan Anda dengan ramuan herbal pilihan.",
    url: "https://herbanos.id",
    siteName: "Herbanos",
    images: [
      {
        url: "/og-image.jpg", // Taruh file og-image.jpg di folder public
        width: 1200,
        height: 630,
        alt: "Herbanos Promo Banner",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  // TWITTER CARD (Gambar Besar)
  twitter: {
    card: "summary_large_image", 
    title: "Herbanos - Solusi Kesehatan Alami",
    description: "Ramuan herbal premium untuk gaya hidup sehat.",
    images: ["/og-image.jpg"],
  },

  // FAVICON & ICONS (Sesuai file image_f2ef9d.png Anda)
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
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}