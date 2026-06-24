import AdminActionLink from "@/components/admin/AdminActionLink";
import { parallaxStatus } from "@/lib/admin-dashboard-data";

export default function ProductParallaxStatus() {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
      <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-white to-blue-50 px-6 py-5 sm:px-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-950">Product Parallax Status</h2>
            <p className="mt-1 text-sm text-slate-500">Kontrol visual product parallax dan motion range.</p>
          </div>
          <span className="w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
            Product Parallax ON
          </span>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-2">
        <div className="border-b border-slate-100 p-6 lg:border-b-0 lg:border-r">
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Status Utama</h3>
          <div className="mt-4 space-y-3">
            {parallaxStatus.main.map(([label, value]) => (
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3" key={label}>
                <span className="text-sm text-slate-500">{label}</span>
                <span className="text-sm font-bold text-slate-900">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Motion Status</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {parallaxStatus.motion.map(([label, value]) => (
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4" key={label}>
                <div className="text-xs text-slate-500">{label}</div>
                <div className="mt-1 text-sm font-bold text-slate-950">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-4">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Scroll Range</span>
        <span className="ml-3 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
          {parallaxStatus.range}
        </span>
      </div>

      <div className="border-t border-slate-100 p-6">
        <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Quick Actions Parallax</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {parallaxStatus.actions.map((action) => (
            <AdminActionLink
              action={action}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              key={action}
            >
              {action}
            </AdminActionLink>
          ))}
        </div>
      </div>
    </section>
  );
}
