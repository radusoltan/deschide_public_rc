import axios from "@/lib/axios";



const categories = async ()=>{
  const ro_response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/public/homepage/categories?locale=ro`)
  const en_response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/public/homepage/categories?locale=en`)
  const ru_response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/public/homepage/categories?locale=ru`)
  return [
    ...ro_response.data.data.map(category=>({url: `/${process.env.NEXT_PUBLIC_SITE_URL}/ro/articles/${category.slug}`, lastModified: new Date()})),
    ...en_response.data.data.map(category=>({url: `/${process.env.NEXT_PUBLIC_SITE_URL}/en/articles/${category.slug}`, lastModified: new Date()})),
    ...ru_response.data.data.map(category=>({url: `/${process.env.NEXT_PUBLIC_SITE_URL}/ru/articles/${category.slug}`, lastModified: new Date()})),
  ]
}

export default async function sitemap() {

  const data = await categories()

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
    ...data
  ]
}