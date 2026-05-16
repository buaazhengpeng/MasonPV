import { mkdirSync } from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

export type MediaType = "image" | "video";

export type MediaItem = {
  id: string;
  rootId: string;
  rootName: string;
  rootPath: string;
  relativePath: string;
  absolutePath: string;
  filename: string;
  extension: string;
  mediaType: MediaType;
  mimeType: string | null;
  size: number;
  width: number | null;
  height: number | null;
  duration: number | null;
  mtime: string;
  ctime: string;
  thumbnailPath: string | null;
  createdAt: string;
  updatedAt: string;
};

export type MediaListQuery = {
  search?: string;
  type?: MediaType | "all";
  limit?: number;
  offset?: number;
};

export type MediaRootRecord = {
  id: string;
  name: string;
  path: string;
  enabled: number;
  createdAt: string;
  updatedAt: string;
};

export type ScanJob = {
  id: string;
  status: string;
  startedAt: string;
  finishedAt: string | null;
  totalFiles: number;
  processedFiles: number;
  indexedFiles: number;
  skippedFiles: number;
  errorMessage: string | null;
};

const storageDir = path.join(process.cwd(), "storage");
const databasePath = path.join(storageDir, "masonpv.sqlite");

let db: Database.Database | null = null;

function toMediaItem(row: Record<string, unknown>): MediaItem {
  return {
    id: String(row.id),
    rootId: String(row.root_id),
    rootName: String(row.root_name),
    rootPath: String(row.root_path),
    relativePath: String(row.relative_path),
    absolutePath: String(row.absolute_path),
    filename: String(row.filename),
    extension: String(row.extension),
    mediaType: row.media_type as MediaType,
    mimeType: row.mime_type === null ? null : String(row.mime_type),
    size: Number(row.size),
    width: row.width === null ? null : Number(row.width),
    height: row.height === null ? null : Number(row.height),
    duration: row.duration === null ? null : Number(row.duration),
    mtime: String(row.mtime),
    ctime: String(row.ctime),
    thumbnailPath: row.thumbnail_path === null ? null : String(row.thumbnail_path),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function initializeDatabase(database: Database.Database) {
  database.pragma("journal_mode = WAL");
  database.pragma("foreign_keys = ON");
  database.exec(`
    CREATE TABLE IF NOT EXISTS media_roots (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      path TEXT NOT NULL UNIQUE,
      enabled INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS media_items (
      id TEXT PRIMARY KEY,
      root_id TEXT NOT NULL REFERENCES media_roots(id) ON DELETE CASCADE,
      relative_path TEXT NOT NULL,
      absolute_path TEXT NOT NULL,
      filename TEXT NOT NULL,
      extension TEXT NOT NULL,
      media_type TEXT NOT NULL CHECK(media_type IN ('image', 'video')),
      mime_type TEXT,
      size INTEGER NOT NULL,
      width INTEGER,
      height INTEGER,
      duration REAL,
      mtime TEXT NOT NULL,
      ctime TEXT NOT NULL,
      thumbnail_path TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(root_id, relative_path)
    );

    CREATE TABLE IF NOT EXISTS scan_jobs (
      id TEXT PRIMARY KEY,
      status TEXT NOT NULL,
      started_at TEXT NOT NULL,
      finished_at TEXT,
      total_files INTEGER NOT NULL DEFAULT 0,
      processed_files INTEGER NOT NULL DEFAULT 0,
      indexed_files INTEGER NOT NULL DEFAULT 0,
      skipped_files INTEGER NOT NULL DEFAULT 0,
      error_message TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_media_items_media_type ON media_items(media_type);
    CREATE INDEX IF NOT EXISTS idx_media_items_mtime ON media_items(mtime DESC);
    CREATE INDEX IF NOT EXISTS idx_media_items_filename ON media_items(filename);
  `);
}

export function getDb() {
  if (!db) {
    mkdirSync(storageDir, { recursive: true });
    db = new Database(databasePath);
    initializeDatabase(db);
  }

  return db;
}

export function getDatabasePath() {
  return databasePath;
}

export function upsertMediaRoot(root: { id: string; name: string; path: string }) {
  const now = new Date().toISOString();
  getDb()
    .prepare(
      `INSERT INTO media_roots (id, name, path, enabled, created_at, updated_at)
       VALUES (@id, @name, @path, 1, @now, @now)
       ON CONFLICT(path) DO UPDATE SET
         name = excluded.name,
         enabled = 1,
         updated_at = excluded.updated_at`,
    )
    .run({ ...root, now });
}

export function upsertMediaItem(item: Omit<MediaItem, "createdAt" | "updatedAt" | "rootName" | "rootPath">) {
  const now = new Date().toISOString();
  getDb()
    .prepare(
      `INSERT INTO media_items (
        id, root_id, relative_path, absolute_path, filename, extension, media_type, mime_type,
        size, width, height, duration, mtime, ctime, thumbnail_path, created_at, updated_at
      ) VALUES (
        @id, @rootId, @relativePath, @absolutePath, @filename, @extension, @mediaType, @mimeType,
        @size, @width, @height, @duration, @mtime, @ctime, @thumbnailPath, @now, @now
      )
      ON CONFLICT(root_id, relative_path) DO UPDATE SET
        absolute_path = excluded.absolute_path,
        filename = excluded.filename,
        extension = excluded.extension,
        media_type = excluded.media_type,
        mime_type = excluded.mime_type,
        size = excluded.size,
        width = excluded.width,
        height = excluded.height,
        duration = excluded.duration,
        mtime = excluded.mtime,
        ctime = excluded.ctime,
        thumbnail_path = excluded.thumbnail_path,
        updated_at = excluded.updated_at`,
    )
    .run({ ...item, now });
}

export function createScanJob(id: string) {
  const startedAt = new Date().toISOString();
  getDb()
    .prepare(
      `INSERT INTO scan_jobs (id, status, started_at)
       VALUES (@id, 'running', @startedAt)`,
    )
    .run({ id, startedAt });
}

export function finishScanJob(
  id: string,
  result: {
    status: "completed" | "failed";
    totalFiles: number;
    processedFiles: number;
    indexedFiles: number;
    skippedFiles: number;
    errorMessage?: string;
  },
) {
  getDb()
    .prepare(
      `UPDATE scan_jobs SET
        status = @status,
        finished_at = @finishedAt,
        total_files = @totalFiles,
        processed_files = @processedFiles,
        indexed_files = @indexedFiles,
        skipped_files = @skippedFiles,
        error_message = @errorMessage
       WHERE id = @id`,
    )
    .run({
      id,
      status: result.status,
      finishedAt: new Date().toISOString(),
      totalFiles: result.totalFiles,
      processedFiles: result.processedFiles,
      indexedFiles: result.indexedFiles,
      skippedFiles: result.skippedFiles,
      errorMessage: result.errorMessage ?? null,
    });
}

export function getLatestScanJob(): ScanJob | null {
  return (
    getDb()
      .prepare(
        `SELECT
          id, status, started_at AS startedAt, finished_at AS finishedAt, total_files AS totalFiles,
          processed_files AS processedFiles, indexed_files AS indexedFiles, skipped_files AS skippedFiles,
          error_message AS errorMessage
         FROM scan_jobs
         ORDER BY started_at DESC
         LIMIT 1`,
      )
      .get() as ScanJob | undefined
  ) ?? null;
}

export function listMediaItems(query: MediaListQuery = {}) {
  const limit = Math.min(Math.max(query.limit ?? 60, 1), 200);
  const offset = Math.max(query.offset ?? 0, 0);
  const where: string[] = [];
  const params: Record<string, unknown> = { limit, offset };

  if (query.type && query.type !== "all") {
    where.push("mi.media_type = @type");
    params.type = query.type;
  }

  if (query.search && query.search.trim().length > 0) {
    where.push("mi.filename LIKE @search");
    params.search = `%${query.search.trim()}%`;
  }

  const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";
  const rows = getDb()
    .prepare(
      `SELECT mi.*, mr.name AS root_name, mr.path AS root_path
       FROM media_items mi
       JOIN media_roots mr ON mr.id = mi.root_id
       ${whereClause}
       ORDER BY mi.mtime DESC
       LIMIT @limit OFFSET @offset`,
    )
    .all(params) as Array<Record<string, unknown>>;

  return rows.map(toMediaItem);
}

export function countMediaItems(query: Omit<MediaListQuery, "limit" | "offset"> = {}) {
  const where: string[] = [];
  const params: Record<string, unknown> = {};

  if (query.type && query.type !== "all") {
    where.push("media_type = @type");
    params.type = query.type;
  }

  if (query.search && query.search.trim().length > 0) {
    where.push("filename LIKE @search");
    params.search = `%${query.search.trim()}%`;
  }

  const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";
  const row = getDb().prepare(`SELECT COUNT(*) AS total FROM media_items ${whereClause}`).get(params) as {
    total: number;
  };

  return row.total;
}

export function getMediaItem(id: string) {
  const row = getDb()
    .prepare(
      `SELECT mi.*, mr.name AS root_name, mr.path AS root_path
       FROM media_items mi
       JOIN media_roots mr ON mr.id = mi.root_id
       WHERE mi.id = @id`,
    )
    .get({ id }) as Record<string, unknown> | undefined;

  return row ? toMediaItem(row) : null;
}

export function listMediaRoots() {
  return getDb()
    .prepare(
      `SELECT id, name, path, enabled, created_at AS createdAt, updated_at AS updatedAt
       FROM media_roots
       ORDER BY name ASC`,
    )
    .all() as MediaRootRecord[];
}
