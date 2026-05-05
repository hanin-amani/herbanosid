import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons' // Opsional: Tambahkan ikon jika sudah install @sanity/icons

export default defineType({
  name: 'post',
  title: 'Postingan Blog',
  type: 'document',
  icon: DocumentIcon,
  // Mengelompokkan field agar tampilan Studio lebih rapi
  fieldsets: [
    { name: 'seo', title: 'Optimasi SEO', options: { collapsible: true, collapsed: false } },
    { name: 'metadata', title: 'Informasi Tambahan', options: { columns: 2 } },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Utama',
      type: 'string',
      description: 'Gunakan judul yang menarik dan mengandung kata kunci.',
      validation: (Rule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Deskripsi Singkat (SEO)',
      type: 'text',
      fieldset: 'seo',
      rows: 3,
      description: 'Muncul di hasil pencarian Google dan kartu media sosial (Max 160 karakter).',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Tanggal Publikasi',
      type: 'datetime',
      fieldset: 'metadata',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Penulis',
      type: 'reference',
      fieldset: 'metadata',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Kategori',
      type: 'array',
      fieldset: 'metadata',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'mainImage',
      title: 'Gambar Utama',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { 
          name: 'alt', 
          type: 'string', 
          title: 'Alt Text', 
          description: 'Penting untuk aksesibilitas dan SEO gambar.',
          validation: (Rule) => Rule.required() 
        },
        { name: 'caption', type: 'string', title: 'Caption' }
      ],
    }),
    defineField({
      name: 'content',
      title: 'Isi Konten',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            // Menambahkan fitur Link di dalam teks (Sangat krusial untuk SEO)
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: (Rule) => Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' }
          ]
        },
        {
          type: 'object',
          name: 'relatedPost',
          title: 'Baca Juga (Related Post)',
          fields: [
            {
              name: 'reference',
              type: 'reference',
              title: 'Pilih Artikel',
              to: [{ type: 'post' }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'URL Video YouTube',
      type: 'url',
      fieldset: 'seo',
    }),
    defineField({
      name: 'views',
      title: 'Views',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    }),
  ],
  // Konfigurasi tampilan list di Sanity Studio
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author ? `oleh ${author}` : '' }
    },
  },
})