import {NextResponse} from "next/server";
import {client} from "@/lib/elasticsearch";

export const GET = async (request, {params: {locale}})=>{
  const articles = await client.search({
    body: {
      query: {
        bool: {
          must: [
            { match: { "is_video": true } },
            { match: { "translations.locale": locale } },
            { match: { "translations.status": 'P' } }
          ]
        }
      },
      size: 10,
      sort: [
        { "translations.published_at": {order: "desc", "format": "strict_date_optional_time_nanos"} }
      ]
    }
  })
  return NextResponse.json(articles.hits.hits)
}