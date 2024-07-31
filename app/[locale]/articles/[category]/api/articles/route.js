import {NextResponse} from "next/server";
import {client} from "@/lib/elasticsearch";

export const GET = async (request, {params: {locale, category}})=>{

  const {searchParams} = new URL(request.url)

  const page = Number(searchParams.get('page'))
  const size = Number(searchParams.get('size'))
  const from = (page-1) * size

  const articles = await client.search({
    index: "articles",
    body: {
      query: {
        bool: {
          must: [
            { match: { "translations.locale": locale }},
            { match: { "translations.status": 'P' }},
            { match: { "category.translations.slug": category} }
          ]
        }
      },
      size,
      from,
      sort: [
        { "translations.published_at": {"order": "desc", "format": "strict_date_optional_time_nanos"} }
      ]
    }
  })

  const popularArticles = await client.search({
    index: "articles",
    body: {
      query: {
        bool: {
          must: [
            { match: { "translations.locale": locale }},
            { match: { "translations.status": 'P' }},
            { match: { "category.translations.slug": category} }
          ]
        }
      },
      size: 5,
      from: 0,
      sort: [
        { "visits": {"order": "desc"} }
      ]
    }
  })

  return NextResponse.json({
    articles: articles.hits.hits.map(hit=>hit._source),
    popularArticles: popularArticles.hits.hits.map(hit=>hit._source),
    total: articles.hits.total.value
  })
}