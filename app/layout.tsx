import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Herbanos.id - Solusi Kesehatan Herbal Modern",
  description: "Website resmi penjualan Natura Oil Squa dan portal informasi kesehatan terpercaya.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        {/* 1. Header muncul di paling atas semua halaman */}
        <Header />

        {/* 
          2. Konten utama (dari page.tsx) masuk ke sini.
          Kita beri 'flex-grow' agar footer tetap di bawah meski konten sedikit.
          Kita beri 'pt-20' (padding top) agar konten tidak tertutup header yang posisinya 'fixed'.
        */}
        <main className="flex-grow pt-20">
          {children}
        </main>

        {/* 3. Footer muncul di paling bawah semua halaman */}
        <Footer />
      </body>
    </html>
  );
}