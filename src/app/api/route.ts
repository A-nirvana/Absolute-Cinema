// app/api/route.ts

import { fetchMovies } from "@/lib/apis";
import { NextRequest, NextResponse } from 'next/server';

// Handler for GET requests
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const movie = searchParams.get('movie');
  const page = searchParams.get('page');

  console.log(movie, page);

  try {
    if (movie && page) {
      const response = await fetchMovies(movie.toString(), Number(page));
      const data = await response;

      // Send back the response data
      return NextResponse.json({ data });
    } else {
      throw new Error('Missing query parameters');
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
