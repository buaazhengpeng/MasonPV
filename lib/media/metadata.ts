import { readFile } from "node:fs/promises";
import { imageSize } from "image-size";
import type { MediaType } from "@/lib/db";

export type MediaMetadata = {
  width: number | null;
  height: number | null;
  duration: number | null;
  mimeType: string | null;
};

export async function readMediaMetadata(filePath: string, mediaType: MediaType): Promise<MediaMetadata> {
  if (mediaType === "video") {
    return { width: null, height: null, duration: null, mimeType: null };
  }

  try {
    const buffer = await readFile(filePath);
    const size = imageSize(buffer);

    return {
      width: size.width ?? null,
      height: size.height ?? null,
      duration: null,
      mimeType: null,
    };
  } catch {
    return { width: null, height: null, duration: null, mimeType: null };
  }
}
