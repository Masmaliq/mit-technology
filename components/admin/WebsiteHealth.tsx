import Link from "next/link";
import { websiteHealth } from "@/lib/admin-dashboard-data";

const healthRoutes: Array<[string, string]> = [
  ["SEO", "/admin/seo-health"],
  ["Missing Images", "/admin/sections"],
  ["Missing CTA", "/admin/sections"],
  ["Draft Content", "/admin/pages"],
  ["Product Asset", "/admin/product-parallax"],
  ["Poster Image", "/admin/background-scene"],
  ["Mobile Fallback", "/admin/background-scene"],
  ["Hero Status", "/admin/hero"],
  ["Footer Status", "/admin/footer"],
];

function getHealthHref(label: string) {
  return healthRoutes.find(([routeLabel]) => label.toLowerCase().includes(routeLabel.toLowerCase()))?.[1];
}

export default function WebsiteHealth({ items = websiteHealth }: { items?: string[][] }) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_54px_rgba(15,23,42,0.05)]">
      <h2 className="text-lg font-bold text-slate-950">Website Health</h2>
      <p className="mt-1 text-sm text-slate-500">Status readiness dan kualitas website.</p>
      <div className="mt-5 space-y-3">
        {items.map(([label, value]) => {
          const href = getHealthHref(label);
          const content = (
            <>
            <span className="text-sm text-slate-500">{label}</span>
            <span className="text-sm font-bold text-slate-900">{value}</span>
            </>
          );

          return href ? (
            <Link
              aria-label={`Open ${label}`}
              className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              href={href}
              key={label}
            >
              {content}
            </Link>
          ) : (
            <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3" key={label}>
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
