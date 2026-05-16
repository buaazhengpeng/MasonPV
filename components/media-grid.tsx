import type { MediaItem } from "@/lib/db";
import { MediaCard } from "@/components/media-card";

type MediaGridProps = {
  items: MediaItem[];
};

export function MediaGrid({ items }: MediaGridProps) {
  if (items.length === 0) {
    return (
      <section className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center">
        <h2 className="text-xl font-semibold text-slate-950">还没有媒体索引</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          复制 config.example.json 为 config.local.json，填写本地媒体目录，然后调用扫描接口或在后续设置页触发扫描。
        </p>
      </section>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <MediaCard item={item} key={item.id} />
      ))}
    </section>
  );
}
