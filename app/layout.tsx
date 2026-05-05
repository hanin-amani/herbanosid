import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Pastikan path benar

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
      {/* Root Layout HANYA boleh punya satu body dan tidak ada Header/Footer di sini */}
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}