import { createClient } from 'next-sanity'

// Jika Anda menggunakan file env.ts di atas:
import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
})