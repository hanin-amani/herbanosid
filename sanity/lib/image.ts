import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'
import { projectId, dataset } from '../env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlFor = (source: Image) => {
  return imageBuilder.image(source).auto('format').fit('max')
}