import Link from "next/link";
import { stats } from "@/lib/admin-dashboard-data";

export type AdminStat = (typeof stats)[number];

const toneClasses: Record<string, string> = {
  blue: "from-blue-50 text-blue-700",
  violet: "from-violet-50 text-violet-700",
  emerald: "from-emerald-50 text-emerald-700",
  amber: "from-amber-50 text-amber-700",
};

const statRoutes: Array<[string, string]> = [
  ["Total Pages", "/admin/pages"],
  ["Active Sections", "/admin/sections"],
  ["Packages", "/admin/packages"],
  ["Case Studies", "/admin/case-studies"],
  ["Testimonials", "/admin/testimonials"],
  ["Footer Ready", "/admin/footer"],
  ["Hero Ready", "/admin/hero"],
  ["Hero Status", "/admin/hero"],
  ["SEO Score", "/admin/seo-health"],
  ["SEO Review", "/admin/seo-health"],
];

function getStatHref(label: string) {
  const normalizedLabel = label.toLowerCase();
  return statRoutes.find(([routeLabel]) => normalizedLabel.includes(routeLabel.toLowerCase()))?.[1];
}

export default function StatCards({ items = stats }: { items?: AdminStat[] }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((stat) => {
        const href = getStatHref(stat.label);
        const cardContent = (
          <>
          <div
            className={`mb-5 inline-flex rounded-2xl bg-gradient-to-br ${toneClasses[stat.tone]} to-white px-3 py-1 text-xs font-bold`}
          >
            {stat.label}
          </div>
          <div className="text-3xl font-bold tracking-tight text-slate-950">{stat.value}</div>
          <p className="mt-2 text-xs leading-5 text-slate-500">{stat.detail}</p>
          </>
        );

        return href ? (
          <Link
            aria-label={`Open ${stat.label}`}
            className="block rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_54px_rgba(15,23,42,0.05)] transition hover:border-blue-200 hover:shadow-[0_22px_64px_rgba(37,99,235,0.09)] focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            href={href}
            key={stat.label}
          >
            {cardContent}
          </Link>
        ) : (
          <article
            className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_54px_rgba(15,23,42,0.05)]"
            key={stat.label}
          >
            {cardContent}
          </article>
        );
      })}
    </section>
  );
}
