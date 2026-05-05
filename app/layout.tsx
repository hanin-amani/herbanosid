// app/layout.tsx
import "./globals.css"; // CSS diimpor di sini satu kali saja
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {/* Tidak ada Header/Footer di sini agar Studio tetap bersih */}
        {children}
      </body>
    </html>
  );
}