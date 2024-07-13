import { NextResponse } from "next/server";

async function getData(title: string) {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  if (!API_KEY) {
    throw new Error("API key is not defined");
  }
  title = title + " trailer";
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${title}%trailer&key=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  if (!title) {
    return NextResponse.json(
      { error: 'Missing "name" query parameter' },
      { status: 400 }
    );
  }

  try {
    const data = await getData(title);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}