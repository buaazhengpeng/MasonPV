import type { MediaItem } from "@/lib/db";

type MediaViewerProps = {
  item: MediaItem;
};

function formatFileSize(size: number) {
  return size < 1024 * 1024
    ? `${(size / 1024).toFixed(1)} KB`
    : `${(size / 1024 / 1024).toFixed(1)} MB`;
}

export function MediaViewer({ item }: MediaViewerProps) {
  const fileUrl = `/api/media/${item.id}/file`;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex min-h-80 items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
        {item.mediaType === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt={item.filename} className="max-h-[70vh] w-auto max-w-full" src={fileUrl} />
        ) : (
          <video className="max-h-[70vh] w-full" controls preload="metadata" src={fileUrl}>
            <track kind="captions" />
          </video>
        )}
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_22rem]">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">{item.filename}</h2>
          <p className="mt-2 break-all text-sm leading-6 text-slate-500">
            {item.rootName} / {item.relativePath}
          </p>
        </div>
        <dl className="grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">类型</dt>
            <dd className="font-medium text-slate-900">{item.mediaType}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">大小</dt>
            <dd className="font-medium text-slate-900">{formatFileSize(item.size)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">分辨率</dt>
            <dd className="font-medium text-slate-900">
              {item.width && item.height ? `${item.width} × ${item.height}` : "未读取"}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">更新时间</dt>
            <dd className="font-medium text-slate-900">
              {new Date(item.mtime).toLocaleString("zh-CN")}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
