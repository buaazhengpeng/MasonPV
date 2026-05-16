import type { MediaType } from "@/lib/db";
import { countMediaItems, listMediaItems } from "@/lib/db";
import { NextResponse } from "next/server";

function parseMediaType(value: string | null): MediaType | "all" {
  return value === "image" || value === "video" ? value : "all";
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search") ?? "";
  const type = parseMediaType(url.searchParams.get("type"));
  const limit = Number(url.searchParams.get("limit") ?? 60);
  const offset = Number(url.searchParams.get("offset") ?? 0);
  const query = { search, type, limit, offset };

  return NextResponse.json({
    items: listMediaItems(query),
    total: countMediaItems(query),
    limit,
    offset,
  });
}
