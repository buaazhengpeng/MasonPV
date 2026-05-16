import sharp from "sharp";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
}

export interface VideoMetadata {
  width: number;
  height: number;
  duration: number;
  codec: string;
}

export async function getImageMetadata(
  filePath: string
): Promise<ImageMetadata | null> {
  try {
    const meta = await sharp(filePath).metadata();
    return {
      width: meta.width ?? 0,
      height: meta.height ?? 0,
      format: meta.format ?? "unknown",
    };
  } catch {
    return null;
  }
}

export async function getVideoMetadata(
  filePath: string
): Promise<VideoMetadata | null> {
  try {
    const { stdout } = await execFileAsync("ffprobe", [
      "-v",
      "quiet",
      "-print_format",
      "json",
      "-show_format",
      "-show_streams",
      filePath,
    ]);
    const data = JSON.parse(stdout);
    const videoStream = data.streams?.find(
      (s: { codec_type: string }) => s.codec_type === "video"
    );
    return {
      width: videoStream?.width ?? 0,
      height: videoStream?.height ?? 0,
      duration: parseFloat(data.format?.duration ?? "0"),
      codec: videoStream?.codec_name ?? "unknown",
    };
  } catch {
    return null;
  }
}
