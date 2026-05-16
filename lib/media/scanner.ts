import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { lookup } from "mime-types";
import { loadAppConfig } from "@/lib/config";
import {
  createScanJob,
  finishScanJob,
  upsertMediaItem,
  upsertMediaRoot,
} from "@/lib/db";
import { readMediaMetadata } from "@/lib/media/metadata";
import {
  createStableId,
  getMediaType,
  shouldExcludePath,
  toRelativeMediaPath,
} from "@/lib/media/paths";

export type ScanSummary = {
  jobId: string;
  totalFiles: number;
  processedFiles: number;
  indexedFiles: number;
  skippedFiles: number;
  missingRoots: string[];
};

async function* walkMediaFiles(rootPath: string, excludePatterns: string[]): AsyncGenerator<string> {
  const entries = await readdir(rootPath, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(rootPath, entry.name);
    const relativePath = toRelativeMediaPath(rootPath, absolutePath);

    if (shouldExcludePath(relativePath, excludePatterns)) {
      continue;
    }

    if (entry.isDirectory()) {
      yield* walkMediaFiles(absolutePath, excludePatterns);
      continue;
    }

    if (entry.isFile()) {
      yield absolutePath;
    }
  }
}

export async function scanMediaRoots(): Promise<ScanSummary> {
  const config = await loadAppConfig();
  const jobId = createStableId("scan", new Date().toISOString());
  const summary: ScanSummary = {
    jobId,
    totalFiles: 0,
    processedFiles: 0,
    indexedFiles: 0,
    skippedFiles: 0,
    missingRoots: [],
  };

  createScanJob(jobId);

  try {
    for (const root of config.mediaRoots) {
      let rootStat;

      try {
        rootStat = await stat(root.path);
      } catch {
        summary.missingRoots.push(root.path);
        summary.skippedFiles += 1;
        continue;
      }

      if (!rootStat.isDirectory()) {
        summary.missingRoots.push(root.path);
        summary.skippedFiles += 1;
        continue;
      }

      const rootId = createStableId("root", root.path);
      upsertMediaRoot({ id: rootId, name: root.name, path: root.path });

      for await (const absolutePath of walkMediaFiles(root.path, config.excludePatterns)) {
        summary.totalFiles += 1;
        const extension = path.extname(absolutePath).toLowerCase();

        if (!config.includeExtensions.includes(extension)) {
          summary.skippedFiles += 1;
          continue;
        }

        const mediaType = getMediaType(extension);

        if (!mediaType) {
          summary.skippedFiles += 1;
          continue;
        }

        const fileStat = await stat(absolutePath);
        const relativePath = toRelativeMediaPath(root.path, absolutePath);
        const metadata = await readMediaMetadata(absolutePath, mediaType);
        const mimeType = lookup(absolutePath) || metadata.mimeType;

        upsertMediaItem({
          id: createStableId(rootId, relativePath),
          rootId,
          relativePath,
          absolutePath,
          filename: path.basename(absolutePath),
          extension,
          mediaType,
          mimeType: mimeType || null,
          size: fileStat.size,
          width: metadata.width,
          height: metadata.height,
          duration: metadata.duration,
          mtime: fileStat.mtime.toISOString(),
          ctime: fileStat.ctime.toISOString(),
          thumbnailPath: null,
        });

        summary.processedFiles += 1;
        summary.indexedFiles += 1;
      }
    }

    finishScanJob(jobId, { status: "completed", ...summary });
    return summary;
  } catch (error) {
    finishScanJob(jobId, {
      status: "failed",
      ...summary,
      errorMessage: error instanceof Error ? error.message : "Unknown scan error",
    });
    throw error;
  }
}
