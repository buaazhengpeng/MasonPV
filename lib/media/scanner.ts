import { readdir, stat } from "fs/promises";
import { join, extname } from "path";

export interface ScannedFile {
  absolutePath: string;
  relativePath: string;
  filename: string;
  extension: string;
  size: number;
  mtime: Date;
  ctime: Date;
  mediaType: "image" | "video";
}

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".mkv", ".webm"]);

function getMediaType(ext: string): "image" | "video" | null {
  const lower = ext.toLowerCase();
  if (IMAGE_EXTENSIONS.has(lower)) return "image";
  if (VIDEO_EXTENSIONS.has(lower)) return "video";
  return null;
}

export async function scanDirectory(
  rootPath: string,
  includeExtensions: string[],
  excludePatterns: string[] = []
): Promise<ScannedFile[]> {
  const results: ScannedFile[] = [];
  const extSet = new Set(includeExtensions.map((e) => e.toLowerCase()));

  async function walk(dir: string) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.name.startsWith(".")) continue;

      const shouldExclude = excludePatterns.some((pattern) =>
        fullPath.includes(pattern.replace(/\*\*/g, ""))
      );
      if (shouldExclude) continue;

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase();
        if (!extSet.has(ext)) continue;

        const mediaType = getMediaType(ext);
        if (!mediaType) continue;

        const stats = await stat(fullPath);
        results.push({
          absolutePath: fullPath,
          relativePath: fullPath.replace(rootPath + "/", ""),
          filename: entry.name,
          extension: ext,
          size: stats.size,
          mtime: stats.mtime,
          ctime: stats.ctime,
          mediaType,
        });
      }
    }
  }

  await walk(rootPath);
  return results;
}
