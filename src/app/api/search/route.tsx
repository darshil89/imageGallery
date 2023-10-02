import { UnplashSearchResponse } from "@/models/unplash-image";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }
  

  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNPLASH_ACCESS_KEY}`
  );

 
//   console.log("response = ", response);

  const { results }: UnplashSearchResponse = await response.json();

  return NextResponse.json(results);
}