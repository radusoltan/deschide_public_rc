import {NextResponse} from "next/server";

export const GET = async (request, { params: {locale} })=>{

  const response = await fetch(`http://deschide.api/api/public/homepage/categories?locale=${locale}`)
  const json = await response.json();

  return NextResponse.json(json)
}