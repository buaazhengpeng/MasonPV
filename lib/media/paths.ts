import crypto from "node:crypto";
import path from "node:path";

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

export function createStableId(...parts: string[]) {
  return crypto.createHash("sha256").update(parts.join("\0")).digest("hex").slice(0, 24);
}

export function toRelativeMediaPath(rootPath: string, absolutePath: string) {
  return path.relative(rootPath, absolutePath).split(path.sep).join("/");
}

export function isPathInsideRoot(rootPath: string, candidatePath: string) {
  const relativePath = path.relative(rootPath, candidatePath);
  return Boolean(relativePath) && !relativePath.startsWith("..") && !path.isAbsolute(relativePath);
}

export function shouldExcludePath(relativePath: string, excludePatterns: string[]) {
  const normalized = relativePath.split(path.sep).join("/");
  const segments = normalized.split("/");

  if (segments.some((segment) => segment.startsWith(".") && segment !== ".")) {
    return true;
  }

  return excludePatterns.some((pattern) => {
    if (pattern.includes("node_modules") && segments.includes("node_modules")) {
      return true;
    }

    if (pattern.includes(".cache") && segments.includes(".cache")) {
      return true;
    }

    if (pattern.includes(".git") && segments.includes(".git")) {
      return true;
    }

    if (pattern.endsWith(".DS_Store") && normalized.endsWith(".DS_Store")) {
      return true;
    }

    return normalized === pattern;
  });
}
