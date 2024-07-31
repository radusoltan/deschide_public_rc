
export default async function sitemap() {



  return [
    {
      url: process.env.NEXT_PUBLIC_SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          ro: `${process.env.NEXT_PUBLIC_SITE_URL}/ro`,
          en: `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
          ru: `${process.env.NEXT_PUBLIC_SITE_URL}/ru`,
        },
      }
    },
  ]
}