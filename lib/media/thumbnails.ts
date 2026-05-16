import sharp from "sharp";
import { execFile } from "child_process";
import { promisify } from "util";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { createHash } from "crypto";

const execFileAsync = promisify(execFile);

const THUMBNAIL_SIZE = 300;
const CACHE_DIR = join(process.cwd(), "storage", "thumbnails");

function ensureCacheDir() {
  if (!existsSync(CACHE_DIR)) {
    mkdirSync(CACHE_DIR, { recursive: true });
  }
}

function getThumbnailPath(filePath: string): string {
  const hash = createHash("md5").update(filePath).digest("hex");
  return join(CACHE_DIR, `${hash}.webp`);
}

export async function generateImageThumbnail(
  filePath: string
): Promise<string | null> {
  ensureCacheDir();
  const thumbPath = getThumbnailPath(filePath);

  if (existsSync(thumbPath)) return thumbPath;

  try {
    await sharp(filePath)
      .resize(THUMBNAIL_SIZE, THUMBNAIL_SIZE, { fit: "cover" })
      .webp({ quality: 80 })
      .toFile(thumbPath);
    return thumbPath;
  } catch {
    return null;
  }
}

export async function generateVideoThumbnail(
  filePath: string
): Promise<string | null> {
  ensureCacheDir();
  const thumbPath = getThumbnailPath(filePath);

  if (existsSync(thumbPath)) return thumbPath;

  const rawPath = thumbPath.replace(".webp", "_raw.png");

  try {
    await execFileAsync("ffmpeg", [
      "-i",
      filePath,
      "-ss",
      "00:00:01",
      "-vframes",
      "1",
      "-y",
      rawPath,
    ]);

    await sharp(rawPath)
      .resize(THUMBNAIL_SIZE, THUMBNAIL_SIZE, { fit: "cover" })
      .webp({ quality: 80 })
      .toFile(thumbPath);

    return thumbPath;
  } catch {
    return null;
  }
}
