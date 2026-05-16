export type MediaMetadata = {
  width?: number;
  height?: number;
  duration?: number;
  mimeType?: string;
};

export async function readMediaMetadata(): Promise<MediaMetadata> {
  throw new Error("Media metadata extraction will be implemented in the next milestone.");
}
