import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { Readable } from "node:stream";
import { lookup } from "mime-types";
import { getMediaItem } from "@/lib/db";
import { isPathInsideRoot } from "@/lib/media/paths";
import { NextResponse } from "next/server";

type MediaFileRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: Request, context: MediaFileRouteContext) {
  const { id } = await context.params;
  const item = getMediaItem(id);

  if (!item || !isPathInsideRoot(item.rootPath, item.absolutePath)) {
    return NextResponse.json({ message: "Media file not found." }, { status: 404 });
  }

  const fileStat = await stat(item.absolutePath);
  const contentType = item.mimeType || lookup(item.absolutePath) || "application/octet-stream";
  const range = request.headers.get("range");

  if (range) {
    const match = /bytes=(\d*)-(\d*)/.exec(range);

    if (match) {
      const start = match[1] ? Number(match[1]) : 0;
      const end = match[2] ? Number(match[2]) : fileStat.size - 1;
      const chunkSize = end - start + 1;
      const stream = createReadStream(item.absolutePath, { start, end });

      return new Response(Readable.toWeb(stream) as ReadableStream, {
        status: 206,
        headers: {
          "Accept-Ranges": "bytes",
          "Content-Length": String(chunkSize),
          "Content-Range": `bytes ${start}-${end}/${fileStat.size}`,
          "Content-Type": contentType,
        },
      });
    }
  }

  const stream = createReadStream(item.absolutePath);

  return new Response(Readable.toWeb(stream) as ReadableStream, {
    headers: {
      "Accept-Ranges": "bytes",
      "Content-Length": String(fileStat.size),
      "Content-Type": contentType,
    },
  });
}
