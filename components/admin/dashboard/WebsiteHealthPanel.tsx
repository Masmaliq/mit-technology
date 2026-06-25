import AdminActionLink from "@/components/admin/AdminActionLink";
import Link from "next/link";

const healthItems = [
  { label: "SEO Status", badge: "Score: 74", badgeClass: "bg-amber-100 text-amber-700" },
  { label: "Missing Images", badge: "Lengkap", badgeClass: "bg-emerald-100 text-emerald-700" },
  { label: "Missing CTA", badge: "Lengkap", badgeClass: "bg-emerald-100 text-emerald-700" },
  { label: "Draft Content", badge: "3 Draft", badgeClass: "bg-amber-100 text-amber-700" },
  { label: "Product Asset", badge: "Uploaded", badgeClass: "bg-emerald-100 text-emerald-700" },
  { label: "Poster Image", badge: "Uploaded", badgeClass: "bg-emerald-100 text-emerald-700" },
  { label: "Mobile Fallback", badge: "Missing", badgeClass: "bg-red-100 text-red-700" },
];

const healthRoutes: Array<[string, string]> = [
  ["SEO", "/admin/seo-health"],
  ["Missing Images", "/admin/sections"],
  ["Missing CTA", "/admin/sections"],
  ["Draft Content", "/admin/pages"],
  ["Product Asset", "/admin/product-parallax"],
  ["Poster Image", "/admin/background-scene"],
  ["Mobile Fallback", "/admin/product-parallax"],
];

function getHealthHref(label: string) {
  return healthRoutes.find(([routeLabel]) => label.toLowerCase().includes(routeLabel.toLowerCase()))?.[1];
}

export default function WebsiteHealthPanel() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Website Health</h3>
          <span className="inline-flex items-center gap-1 rounded-lg bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
            2 Issue
          </span>
        </div>
      </div>

      <div className="space-y-3 p-6">
        {healthItems.map((item) => (
          <Link
            aria-label={`Open website health item: ${item.label}`}
            className="flex cursor-pointer items-center justify-between rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            href={getHealthHref(item.label) ?? "/admin/seo-health"}
            key={item.label}
          >
            <span className="text-sm text-slate-700">{item.label}</span>
            <span className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold ${item.badgeClass}`}>
              {item.badge}
            </span>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-3">
        <span className="text-xs text-slate-500">2 item perlu diperbaiki</span>
        <AdminActionLink action="SEO Audit" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
          Fix Issues →
        </AdminActionLink>
      </div>
    </div>
  );
}
