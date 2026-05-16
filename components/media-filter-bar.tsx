const filters = ["全部", "图片", "视频", "最近更新"];

export function MediaFilterBar() {
  return (
    <section className="mb-6 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-slate-950">媒体浏览</h2>
        <p className="text-sm text-slate-500">框架已就绪，扫描功能将在下一阶段接入。</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            key={filter}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>
    </section>
  );
}
