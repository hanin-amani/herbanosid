import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas' 

export default defineConfig({
  name: 'default',
  title: 'Herbanos Studio',

  // Mengambil ID dari .env agar tidak terjadi error karakter terlarang
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'expn5kpa', 
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  // Memastikan Studio terbuka di URL herbanos.id/studio
  basePath: '/studio', 

  // Jika @sanity/vision menyebabkan error 'Module not found', 
  // jalankan 'npm install @sanity/vision' atau hapus dari array plugins di bawah.
  plugins: [
    deskTool(), 
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})