import { defineType, defineField } from 'sanity'
import { TagIcon } from '@sanity/icons' // Pastikan sudah install @sanity/icons

export default defineType({
  name: 'category',
  title: 'Kategori',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nama Kategori',
      type: 'string',
      description: 'Contoh: Kesehatan, Bisnis Herbal, Lifestyle.',
      validation: (Rule) => Rule.required().min(3).max(50),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Digunakan untuk URL (misal: herbanos.id/category/kesehatan).',
      options: { 
        source: 'title', 
        maxLength: 96 
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Kategori',
      type: 'text',
      rows: 3,
      description: 'Penjelasan singkat tentang isi kategori ini untuk SEO.',
    }),
    defineField({
      name: 'color',
      title: 'Warna Label',
      type: 'string',
      description: 'Gunakan format Hex (Contoh: #15803d). Digunakan untuk aksen warna di UI.',
      // Menambahkan validasi agar format HEX benar
      validation: (Rule) => 
        Rule.custom((value) => {
          if (!value) return true;
          const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
          return hexRegex.test(value) ? true : 'Format warna harus Hex (contoh: #FFFFFF)';
        }),
    }),
  ],
  // Preview agar di daftar kategori Studio muncul warna labelnya
  preview: {
    select: {
      title: 'title',
      color: 'color',
    },
    prepare({ title, color }) {
      return {
        title: title,
        subtitle: color ? `Warna: ${color}` : 'Tidak ada warna set',
      }
    },
  },
})