import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* JANGAN gunakan <html> atau <body> lagi di sini */
    <div className="flex flex-col min-h-screen">
      {/* Header muncul di semua halaman website kecuali Studio */}
      <Header />

      <main className="flex-grow pt-20">
        {children}
      </main>

      <Footer />
    </div>
  );
}