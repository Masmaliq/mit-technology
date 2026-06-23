import { quickActions } from "@/lib/admin-dashboard-data";

export default function QuickActions() {
  return (
    <section className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_54px_rgba(15,23,42,0.05)]">
      <h2 className="text-lg font-bold text-slate-950">Quick Actions</h2>
      <p className="mt-1 text-sm text-slate-500">Akses cepat untuk konten utama.</p>
      <div className="mt-5 grid gap-3">
        {quickActions.map((action) => (
          <button
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            key={action}
          >
            {action}
          </button>
        ))}
      </div>
    </section>
  );
}
