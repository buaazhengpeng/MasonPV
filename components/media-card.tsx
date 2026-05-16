type MediaCardProps = {
  title: string;
  type: "image" | "video";
  description: string;
};

export function MediaCard({ title, type, description }: MediaCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex aspect-video items-center justify-center bg-slate-100 text-4xl">
        {type === "image" ? "IMG" : "VID"}
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold text-slate-950">{title}</h3>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase text-slate-500">
            {type}
          </span>
        </div>
        <p className="text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </article>
  );
}
