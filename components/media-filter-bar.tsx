import type { MediaType } from "@/lib/db";

type MediaFilterBarProps = {
  search?: string;
  type?: MediaType | "all";
  total: number;
};

const filters: Array<{ label: string; value: MediaType | "all" }> = [
  { label: "全部", value: "all" },
  { label: "图片", value: "image" },
  { label: "视频", value: "video" },
];

export function MediaFilterBar({ search = "", type = "all", total }: MediaFilterBarProps) {
  return (
    <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">媒体浏览</h2>
          <p className="text-sm text-slate-500">已索引 {total} 个媒体文件</p>
        </div>
        <form className="flex flex-col gap-3 md:flex-row md:items-center" method="get">
          <input
            className="min-w-64 rounded-full border border-slate-200 px-4 py-2 text-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
            defaultValue={search}
            name="search"
            placeholder="按文件名搜索"
            type="search"
          />
          <select
            className="rounded-full border border-slate-200 px-4 py-2 text-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
            defaultValue={type}
            name="type"
          >
            {filters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
          <button
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            type="submit"
          >
            筛选
          </button>
        </form>
      </div>
    </section>
  );
}
