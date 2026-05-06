import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ads',
  title: 'Manajemen Iklan',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nama Iklan / Kampanye',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Posisi Iklan',
      description: 'Pilih lokasi iklan. Pastikan Anda mengunggah ukuran banner yang sesuai dengan posisi yang dipilih.',
      type: 'string',
      options: {
        list: [
          { title: 'Bawah Artikel (Rasio Memanjang)', value: 'bottom_post' },
          { title: 'Sidebar (Rasio Berdiri/Vertikal)', value: 'sidebar' },
          { title: 'Header / Top (Beranda)', value: 'header' },
          { title: 'Pop-up Beranda', value: 'popup' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bannerImage',
      title: 'Gambar Banner',
      description: '📌 PANDUAN UKURAN:\n- Bawah Artikel: 800 x 250 px (atau rasio 16:5)\n- Sidebar: 400 x 500 px (atau rasio 4:5)\n- Header/Pop-up: Gunakan ukuran proporsional yang standar.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { 
          name: 'alt', 
          type: 'string', 
          title: 'Alt Text (Deskripsi Gambar)',
          description: 'Penting untuk SEO dan jika gambar gagal dimuat.' 
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destinationUrl',
      title: 'Link Tujuan (URL)',
      description: 'Alamat website tujuan ketika banner diklik (Misal: https://herbanos.id/produk/item).',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Status Iklan Aktif?',
      description: 'Matikan (OFF) jika kampanye iklan sudah selesai tanpa harus menghapus datanya.',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'position',
      media: 'bannerImage',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      const positionMap: Record<string, string> = {
        bottom_post: 'Bawah Artikel',
        sidebar: 'Sidebar',
        header: 'Header',
        popup: 'Pop-up'
      };
      
      return {
        title: title,
        subtitle: `Posisi: ${positionMap[subtitle as string] || subtitle}`,
        media: media,
      }
    }
  },
})