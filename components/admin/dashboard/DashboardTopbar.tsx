import Link from "next/link";

export default function DashboardTopbar() {
  return (
    <header className="top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-500">Dashboard</div>
          <div className="text-sm font-medium text-slate-700">/</div>
          <div className="text-sm text-slate-700">Control Center</div>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-sm text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500 block animate-pulse" /> Website Live
          </div>

          <Link className="btn btn-ghost btn-sm hidden md:inline-flex" href="/">↗ Preview</Link>
          <Link className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700" href="/admin/sections">+ Tambah Section</Link>
        </div>
      </div>
    </header>
  );
}
