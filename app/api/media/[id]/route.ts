import { getMediaItem } from "@/lib/db";
import { NextResponse } from "next/server";

type MediaDetailRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: MediaDetailRouteContext) {
  const { id } = await context.params;
  const item = getMediaItem(id);

  if (!item) {
    return NextResponse.json({ message: "Media item not found." }, { status: 404 });
  }

  return NextResponse.json({ item });
}
