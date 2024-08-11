import {NextResponse} from "next/server";
import {client} from "@/lib/elasticsearch";


export const GET = async (request, {params: {locale}})=>{

  const {searchParams} = new URL(request.url);

  const page = searchParams.get("page")
  const size = searchParams.get("size")

  const from = (page -1) * size;
  const count = await client.count({
    query: {
      bool: {
        must: [
          { match: { "translations.locale": locale } }
        ]
      }
    }
  })

  const lastArticles = await client.search({
    query: {
      bool: {
        must: [
          { match: { "translations.locale": locale } },
          { match: { "translations.status": "P" } },
          { match: { "translations.is_video": false } }
        ]
      }
    },
    size: 12,
    from: 0,
    sort: [
      { "translations.published_at": {"order": "desc", "format": "strict_date_optional_time_nanos"} }
    ]
  })

  return NextResponse.json({
    articles: lastArticles.hits.hits,
    meta: {
      currentPage: page,
      total: count.count
    }
  })
}