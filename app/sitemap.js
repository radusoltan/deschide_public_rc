import {client} from "@/lib/elasticsearch";


const getArticles = async ()=> {

  const articles = await client.search({
    body: {
      query: {
        bool: {
          must: [
            { match: {"translations.status": "P"} }
          ]
        }
      },
      sort: [
        { "translations.published_at": {"order": "desc", "format": "strict_date_optional_time_nanos"} }
      ]
    }
  })
}

const getCategories = async ()=> {

  const categories = await fetch(`http://deschide.api/api/public-categories`)
  return categories.json()

}

export default async function sitemap() {

  const categories = await getCategories()

  const cats = categories.map(category=>{
    return {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/ro/${category.translations.find(t=>t.locale==='ro')?.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
      alternates: {
        languages: {
          ro: `${process.env.NEXT_PUBLIC_SITE_URL}/ro/${category.translations.find(t=>t.locale==='ro')?.slug}`,
          en: `${process.env.NEXT_PUBLIC_SITE_URL}/ro/${category.translations.find(t=>t.locale==='en')?.slug}`,
          ru: `${process.env.NEXT_PUBLIC_SITE_URL}/ro/${category.translations.find(t=>t.locale==='ru')?.slug}`,
        },
      }
    }
  })

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
    ...cats
  ]
}