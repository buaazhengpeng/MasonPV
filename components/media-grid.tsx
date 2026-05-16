import { MediaCard } from "@/components/media-card";

const placeholderMedia = [
  {
    title: "本地照片",
    type: "image" as const,
    description: "后续扫描本地目录后，这里会展示图片缩略图。",
  },
  {
    title: "本地视频",
    type: "video" as const,
    description: "视频封面和播放入口会在媒体处理阶段接入。",
  },
  {
    title: "最近媒体",
    type: "image" as const,
    description: "首页会按时间倒序展示最新图片和视频。",
  },
];

export function MediaGrid() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {placeholderMedia.map((item) => (
        <MediaCard
          description={item.description}
          key={item.title}
          title={item.title}
          type={item.type}
        />
      ))}
    </section>
  );
}
