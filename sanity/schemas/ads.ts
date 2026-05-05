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
      name: 'bannerImage',
      title: 'Gambar Banner',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text (Deskripsi Gambar)' }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destinationUrl',
      title: 'Link Tujuan (Klik)',
      description: 'Alamat website tujuan ketika banner diklik.',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Posisi Iklan',
      type: 'string',
      options: {
        list: [
          { title: 'Header (Top)', value: 'header' },
          { title: 'Sidebar', value: 'sidebar' },
          { title: 'Bawah Artikel', value: 'bottom_post' },
          { title: 'Pop-up Beranda', value: 'popup' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Iklan Aktif?',
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
  },
})