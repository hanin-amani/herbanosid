"use client"

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config' // Menggunakan alias @/ yang sudah kita setting di tsconfig

export default function StudioPage() {
  return <NextStudio config={config} />
}