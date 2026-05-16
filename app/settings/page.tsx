import { getConfigSource, loadAppConfig } from "@/lib/config";
import { getDatabasePath, getLatestScanJob, listMediaRoots } from "@/lib/db";
import { AppShell } from "@/components/app-shell";
import { runMediaScan } from "@/app/settings/actions";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const config = await loadAppConfig();
  const roots = listMediaRoots();
  const latestJob = getLatestScanJob();

  return (
    <AppShell>
      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-medium text-blue-600">设置</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">本地媒体目录</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            当前读取 {getConfigSource()}。如需扫描真实文件，请复制 config.example.json 为
            config.local.json，并填写本机媒体路径。
          </p>
        </div>

        <form action={runMediaScan}>
          <button
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            type="submit"
          >
            立即扫描媒体目录
          </button>
        </form>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <h3 className="font-medium text-slate-900">配置目录</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {config.mediaRoots.length > 0 ? (
                config.mediaRoots.map((root) => (
                  <li className="break-all" key={root.path}>
                    {root.name}: {root.path}
                  </li>
                ))
              ) : (
                <li>尚未配置媒体目录。</li>
              )}
            </ul>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <h3 className="font-medium text-slate-900">扫描状态</h3>
            <p className="mt-3 text-sm text-slate-600">
              {latestJob ? `最近任务：${latestJob.status}` : "尚未执行扫描。"}
            </p>
            <p className="mt-2 break-all text-xs text-slate-400">数据库：{getDatabasePath()}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <h3 className="font-medium text-slate-900">已入库目录</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {roots.length > 0 ? (
              roots.map((root) => (
                <li className="break-all" key={root.id}>
                  {root.name}: {root.path}
                </li>
              ))
            ) : (
              <li>还没有扫描入库的目录。</li>
            )}
          </ul>
        </div>
      </section>
    </AppShell>
  );
}
