import AdminActionLink from "@/components/admin/AdminActionLink";
import { dashboardHero } from "@/lib/admin-dashboard-data";

export default function DashboardHero() {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white bg-gradient-to-br from-white via-blue-50/70 to-violet-50 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {dashboardHero.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            {dashboardHero.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {dashboardHero.badges.map((badge, index) => (
              <span
                className={`rounded-full border px-3 py-1.5 text-xs font-bold ${
                  index === 2
                    ? "border-amber-100 bg-amber-50 text-amber-700"
                    : "border-white bg-white/80 text-slate-700"
                }`}
                key={badge}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <AdminActionLink action="Review Metadata" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50">
            {dashboardHero.actions[0]}
          </AdminActionLink>
          <AdminActionLink action={dashboardHero.actions[1]} className="rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700">
            {dashboardHero.actions[1]}
          </AdminActionLink>
        </div>
      </div>
    </section>
  );
}
