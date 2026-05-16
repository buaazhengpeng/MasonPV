import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "媒体库" },
  { href: "/settings", label: "设置" },
  { href: "/docs", label: "开发策划" },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-5">
      <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">MasonPV</p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
            本地图片与视频网页
          </h1>
        </div>
        <nav className="flex flex-wrap gap-2 text-sm font-medium text-slate-600">
          {navItems.map((item) => (
            <Link
              className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-950"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
