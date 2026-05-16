import type { MediaItem } from "@/lib/db";

export type ThumbnailResult = {
  path: string | null;
  width: number | null;
  height: number | null;
};

export async function ensureThumbnail(mediaItem: MediaItem): Promise<ThumbnailResult> {
  void mediaItem;
  return { path: null, width: null, height: null };
}
