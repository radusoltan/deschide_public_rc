import {NextResponse} from "next/server";

export const GET = async (request, { params: {locale} })=>{

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/homepage/categories?locale=${locale}`)
  const json = await response.json();

  return NextResponse.json(json)
}