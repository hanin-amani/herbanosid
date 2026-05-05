import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons' // Membutuhkan @sanity/icons

export default defineType({
  name: 'author',
  title: 'Penulis',
  type: 'document',
  icon: UserIcon,
  fieldsets: [
    { name: 'social', title: 'Media Sosial', options: { collapsible: true, collapsed: false } }
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Penulis',
      type: 'string',
      description: 'Nama lengkap atau nama pena penulis.',
      validation: (Rule) => Rule.required().min(3).max(50),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { 
        source: 'name', 
        maxLength: 96 
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Foto Profil',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { 
          name: 'alt', 
          type: 'string', 
          title: 'Alt Text',
          description: 'Penting untuk aksesibilitas (misal: Foto profil [Nama Penulis]).',
          validation: (Rule) => Rule.required()
        }
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Biodata Singkat',
      type: 'text',
      rows: 3,
      description: 'Jelaskan singkat keahlian atau latar belakang penulis.',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Tautan Media Sosial',
      type: 'array',
      fieldset: 'social',
      of: [
        {
          type: 'object',
          name: 'socialItem',
          title: 'Media Sosial',
          fields: [
            { 
              name: 'platform', 
              title: 'Platform', 
              type: 'string', 
              options: { 
                list: [
                  'Facebook', 
                  'Instagram', 
                  'Twitter/X', 
                  'LinkedIn', 
                  'TikTok', 
                  'Website'
                ] 
              } 
            },
            { 
              name: 'url', 
              title: 'URL Profil', 
              type: 'url',
              validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] })
            }
          ],
          // Preview untuk item di dalam array
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url'
            }
          }
        }
      ]
    }),
  ],
  // Preview agar di daftar Penulis Studio muncul foto dan namanya
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})