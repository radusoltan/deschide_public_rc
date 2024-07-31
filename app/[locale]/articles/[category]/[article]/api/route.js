import {NextResponse} from "next/server";
import {client} from "@/lib/elasticsearch";
import axios from "@/lib/axios";


export const GET = async (request, {params: {locale,article}})=>{
  const indexId = await axios.get(`api/public/homepage/articles/${article}?locale=${locale}`)

  const response = await client.get(({ index: 'articles', id: indexId.data }));

  return NextResponse.json(response._source);
}