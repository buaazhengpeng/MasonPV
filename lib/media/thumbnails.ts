export type ThumbnailResult = {
  path: string;
  width: number;
  height: number;
};

export async function ensureThumbnail(): Promise<ThumbnailResult> {
  throw new Error("Thumbnail generation will be implemented in the next milestone.");
}
