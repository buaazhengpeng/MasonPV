import { AppShell } from "@/components/app-shell";
import { defaultIncludeExtensions } from "@/lib/config";

export default function SettingsPage() {
  return (
    <AppShell>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-blue-600">设置</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">本地媒体目录</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
          当前阶段提供配置入口占位。后续会从本地配置文件读取媒体目录，并在这里展示扫描状态。
        </p>
        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <h3 className="font-medium text-slate-900">默认支持格式</h3>
          <p className="mt-2 text-sm text-slate-500">
            {defaultIncludeExtensions.join(", ")}
          </p>
        </div>
      </section>
    </AppShell>
  );
}
