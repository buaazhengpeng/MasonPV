export const supportedImageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
export const supportedVideoExtensions = [".mp4", ".mov", ".mkv", ".webm"];

export function getMediaType(extension: string): "image" | "video" | null {
  const normalized = extension.toLowerCase();

  if (supportedImageExtensions.includes(normalized)) {
    return "image";
  }

  if (supportedVideoExtensions.includes(normalized)) {
    return "video";
  }

  return null;
}
