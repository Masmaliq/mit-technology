import { pagesControlPanel } from "@/lib/admin-dashboard-data";

const summaryTone: Record<string, string> = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
  violet: "border-violet-100 bg-violet-50 text-violet-700",
  amber: "border-amber-100 bg-amber-50 text-amber-700",
};

function DetailList({ items }: { items: string[][] }) {
  return (
    <div className="space-y-3">
      {items.map(([label, value]) => {
        const warning = value === "Review" || value === "Planned";
        const ready = value === "Ready";

        return (
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3" key={label}>
            <span className="text-sm text-slate-500">{label}</span>
            <span className={`text-sm font-bold ${warning ? "text-amber-700" : ready ? "text-emerald-700" : "text-slate-900"}`}>
              {value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function PagesControlPanel() {
  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] border border-white bg-gradient-to-br from-white via-blue-50/60 to-violet-50 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-xs font-bold text-blue-700">
              {pagesControlPanel.header.badge}
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {pagesControlPanel.header.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              {pagesControlPanel.header.description}
            </p>
          </div>

          <button
            className="w-fit rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
            type="button"
          >
            {pagesControlPanel.header.action}
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {pagesControlPanel.summary.map((item) => (
          <article
            className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_54px_rgba(15,23,42,0.05)]"
            key={item.label}
          >
            <div className="text-sm font-bold text-slate-950">{item.label}</div>
            <div className={`mt-5 inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${summaryTone[item.tone]}`}>
              {item.value}
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {pagesControlPanel.pages.map((page) => (
          <article
            className={`rounded-[2rem] border p-5 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-6 ${
              page.status === "Review"
                ? "border-amber-100 bg-amber-50/55"
                : page.status === "Draft"
                  ? "border-violet-100 bg-violet-50/55"
                  : "border-slate-200/80 bg-white"
            }`}
            key={page.title}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{page.type}</div>
                <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-950">{page.title}</h2>
              </div>
              <span
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                  page.status === "Review"
                    ? "bg-amber-100 text-amber-700"
                    : page.status === "Draft"
                      ? "bg-violet-100 text-violet-700"
                      : "bg-emerald-50 text-emerald-700"
                }`}
              >
                {page.status}
              </span>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">Visibility</span>
                <span className="text-sm font-bold text-slate-900">{page.visibility}</span>
              </div>
              <button className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-left text-sm font-bold text-blue-700 transition hover:bg-blue-100" type="button">
                {page.action}
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Page Readiness</h2>
          <p className="mt-1 text-sm text-slate-500">Kesiapan struktur halaman sebelum publish.</p>
          <div className="mt-6">
            <DetailList items={pagesControlPanel.readiness} />
          </div>
        </article>

        <article className="rounded-[2rem] border border-blue-100 bg-blue-50/50 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">SEO Coverage</h2>
          <p className="mt-1 text-sm text-slate-500">Status metadata dan coverage SEO per halaman.</p>
          <div className="mt-6">
            <DetailList items={pagesControlPanel.seoCoverage} />
          </div>
        </article>
      </div>

      <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
        <h2 className="text-xl font-bold text-slate-950">Quick Actions</h2>
        <p className="mt-1 text-sm text-slate-500">Akses cepat untuk page workflow dan publish readiness.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {pagesControlPanel.quickActions.map((action, index) => (
            <button
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                index === 0
                  ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                  : action === "Review Drafts"
                    ? "border-amber-100 bg-amber-50 text-amber-700 hover:bg-amber-100"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
              key={action}
              type="button"
            >
              {action}
            </button>
          ))}
        </div>
      </article>
    </section>
  );
}
