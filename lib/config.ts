export type MediaRootConfig = {
  name: string;
  path: string;
};

export type AppConfig = {
  mediaRoots: MediaRootConfig[];
  includeExtensions: string[];
  excludePatterns: string[];
  listenHost: string;
  listenPort: number;
};

export const defaultIncludeExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".mp4",
  ".mov",
  ".mkv",
  ".webm",
];
