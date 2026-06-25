import Link from "next/link";

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

const quickStatRoutes: Array<[string, string]> = [
  ["Total Pages", "/admin/pages"],
  ["Active Sections", "/admin/sections"],
  ["Packages", "/admin/packages"],
  ["Case Studies", "/admin/case-studies"],
  ["Testimonials", "/admin/testimonials"],
  ["Parallax", "/admin/product-parallax"],
  ["Page Speed", "/admin/seo-health"],
  ["SEO Score", "/admin/seo-health"],
];

function getQuickStatHref(label: string) {
  return quickStatRoutes.find(([routeLabel]) => label.toLowerCase().includes(routeLabel.toLowerCase()))?.[1];
}

export default function QuickStatsGrid({ stats }: QuickStatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const href = getQuickStatHref(stat.label);
        const content = (
          <>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {stat.label}
            </div>
            <div className={`text-3xl font-bold ${stat.color || "text-slate-900"}`}>{stat.value}</div>
            <div className="mt-2 text-xs text-slate-500">{stat.sub}</div>
            <div className="absolute right-4 top-4 text-2xl opacity-20">{stat.icon}</div>
          </>
        );

        return href ? (
          <Link
            aria-label={`Open ${stat.label}`}
            className="relative cursor-pointer rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            href={href}
            key={stat.label}
          >
            {content}
          </Link>
        ) : (
          <div
            className="relative rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
            key={stat.label}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
