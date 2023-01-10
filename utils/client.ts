import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
  projectId: '0q60uq0p',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: true,
  token:'skshte6MHglMI8ccWFfZUU2v4IhUpoGhR4JjxfTEp3Tphe5GaNIFttX8d1xOgLLFxac1Xay8yoNjw9JubMPZOzBgdtMrkbQUOPBrt9ZrhXUHKsNBzZDCqImYfJ8sHDjODHXkdf2LSUEZf8y3vMyCnXS4pKRukWwjdcfkfw99m76L0N6MIxPS'
  // token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})

const builder = imageUrlBuilder(client)
export const urlFor = (source : any) => builder.image(source)