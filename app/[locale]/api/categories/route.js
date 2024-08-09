import {NextResponse} from "next/server";

export const GET = async (request, { params: {locale} })=>{

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/categories?locale=${locale}`,{ next: { revalidate: 60 }})
  const json = await response.json();

  return NextResponse.json(json)
}