import Link from "next/link";
import { AppShell } from "@/components/app-shell";

export default function DocsPage() {
  return (
    <AppShell>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-blue-600">开发策划</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">
          个人本地图片与视频网页
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
          详细技术栈、7 天开发计划和 agent 自动工作安排已整理在仓库文档中。
        </p>
        <Link
          className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          href="https://github.com/buaazhengpeng/MasonPV/blob/main/docs/local-media-web-plan.md"
        >
          查看策划文件
        </Link>
      </section>
    </AppShell>
  );
}
