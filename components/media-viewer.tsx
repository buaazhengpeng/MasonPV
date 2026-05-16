type MediaViewerProps = {
  title: string;
};

export function MediaViewer({ title }: MediaViewerProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex aspect-video items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
        媒体预览占位
      </div>
      <h2 className="mt-5 text-xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        下一阶段会接入真实图片预览、视频播放和文件元信息。
      </p>
    </section>
  );
}
