import { stats } from "@/lib/admin-dashboard-data";

export type AdminStat = (typeof stats)[number];

const toneClasses: Record<string, string> = {
  blue: "from-blue-50 text-blue-700",
  violet: "from-violet-50 text-violet-700",
  emerald: "from-emerald-50 text-emerald-700",
  amber: "from-amber-50 text-amber-700",
};

export default function StatCards({ items = stats }: { items?: AdminStat[] }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((stat) => (
        <article
          className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_54px_rgba(15,23,42,0.05)]"
          key={stat.label}
        >
          <div
            className={`mb-5 inline-flex rounded-2xl bg-gradient-to-br ${toneClasses[stat.tone]} to-white px-3 py-1 text-xs font-bold`}
          >
            {stat.label}
          </div>
          <div className="text-3xl font-bold tracking-tight text-slate-950">{stat.value}</div>
          <p className="mt-2 text-xs leading-5 text-slate-500">{stat.detail}</p>
        </article>
      ))}
    </section>
  );
}
