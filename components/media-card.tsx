import Link from "next/link";
import type { MediaItem } from "@/lib/db";

type MediaCardProps = {
  item: MediaItem;
};

function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

export function MediaCard({ item }: MediaCardProps) {
  const fileUrl = `/api/media/${item.id}/file`;

  return (
    <Link
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      href={`/media/${item.id}`}
    >
      <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-slate-100 text-sm font-medium text-slate-500">
        {item.mediaType === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={item.filename}
            className="h-full w-full object-cover transition group-hover:scale-105"
            loading="lazy"
            src={fileUrl}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-900 text-white">
            VIDEO
          </div>
        )}
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="truncate font-semibold text-slate-950" title={item.filename}>
            {item.filename}
          </h3>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase text-slate-500">
            {item.mediaType}
          </span>
        </div>
        <p className="truncate text-sm text-slate-500" title={item.relativePath}>
          {item.rootName} / {item.relativePath}
        </p>
        <p className="text-xs text-slate-400">
          {formatFileSize(item.size)} · {new Date(item.mtime).toLocaleString("zh-CN")}
        </p>
      </div>
    </Link>
  );
}
