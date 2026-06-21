export type QuickStat = {
  label: string;
  value: string;
  sub: string;
  icon: string;
  color?: string;
};

type QuickStatsGridProps = {
  stats: QuickStat[];
};

export default function QuickStatsGrid({ stats }: QuickStatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="relative rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
        >
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            {stat.label}
          </div>
          <div className={`text-3xl font-bold ${stat.color || "text-slate-900"}`}>{stat.value}</div>
          <div className="mt-2 text-xs text-slate-500">{stat.sub}</div>
          <div className="absolute right-4 top-4 text-2xl opacity-20">{stat.icon}</div>
        </div>
      ))}
    </div>
  );
}
