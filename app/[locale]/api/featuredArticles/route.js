import {client} from "@/lib/elasticsearch";
import {NextResponse} from "next/server";
import axios from "axios";

export const GET = async (request, {params: {locale}}) =>{

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/public/homepage/featuredListArticle?locale=${locale}`)

  try {
    const articles = await client.mget({
      body: {
        docs: response.data.map(id=>({
          "_id": id,
          "_index": "articles"
        }))
      }
    })
    return NextResponse.json(articles.docs);
  } catch (e) {
    return NextResponse.json([])
  }
}