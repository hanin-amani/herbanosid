export const metadata = {
  title: 'Sanity Studio - Herbanos',
  description: 'Panel Manajemen Konten herbanos.id',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Menggunakan div minimalis untuk memastikan Studio memenuhi layar
    // tanpa ada gangguan CSS dari layout website utama.
    <div className="min-h-screen bg-white">
      {children}
    </div>
  )
}