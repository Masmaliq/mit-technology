export default function WelcomePanel() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-sky-50 via-purple-50 to-emerald-50 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            MIT Framework{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Control Center
            </span>
          </h1>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Ringkasan utama status website Anda dan akses cepat ke semua pengaturan penting dalam satu tampilan terpusat.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/60 px-3 py-1.5 text-xs font-medium text-slate-700 md:text-sm">
              ● Website Aktif
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/60 px-3 py-1.5 text-xs font-medium text-slate-700 md:text-sm">
              ● Plan: Rp 15jt+
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50/80 px-3 py-1.5 text-xs font-medium text-amber-700 md:text-sm">
              ● 2 Item Perlu Perhatian
            </span>
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-2 md:gap-3">
          <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium transition hover:bg-slate-50 md:px-4 md:text-sm">
            Lihat Log
          </button>
          <button className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 md:px-4 md:text-sm">
            Edit Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
