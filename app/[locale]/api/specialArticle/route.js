import {NextResponse} from "next/server";
import {client} from "@/lib/elasticsearch";

export const GET = async (request, {params: {locale}})=>{

  try {
    const specialArticle = await client.search({
      index: 'articles',
      body: {
        query: {
          bool: {
            must: [
              { match: { "translations.locale": locale} },
              { match: { "translations.status": 'P' } }
            ],
            should: [
              { match: { "translations.is_breaking": true } },
              { match: { "translations.is_alert": true } },
              { match: { "translations.is_flash": true } },
            ],
            minimum_should_match: 1
          }
        }
      }
    })
    return NextResponse.json(specialArticle.hits.hits);
  } catch (e) {
    return NextResponse.json([]);
  }

}