type AdminTopbarProps = {
  onOpenMenu: () => void;
};

export default function AdminTopbar({ onOpenMenu }: AdminTopbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-slate-50/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            aria-label="Buka menu admin"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
            onClick={onOpenMenu}
            type="button"
          >
            ☰
          </button>
          <div className="hidden text-sm text-slate-500 sm:block">
            Dashboard <span className="mx-2 text-slate-300">/</span>
            <span className="font-semibold text-slate-700">Control Center</span>
          </div>
          <div className="truncate text-sm font-bold text-slate-950 sm:hidden">MIT Control Center</div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <span className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 sm:inline-flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Website Live
          </span>
          <button className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:px-4">
            Preview
          </button>
          <button className="hidden rounded-full bg-blue-600 px-3 py-2 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:inline-flex sm:px-4">
            Tambah Section
          </button>
        </div>
      </div>
    </header>
  );
}
