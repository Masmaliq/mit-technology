import Link from "next/link";
import { visualModes } from "@/lib/admin-dashboard-data";

const visualRoutes: Record<string, string> = {
  "Basic Hero": "/admin/hero",
  "Motion Effects": "/admin/motion-effects",
  "Cinematic Flow": "/admin/background-scene",
  "Product Parallax": "/admin/product-parallax",
};

export default function VisualStatus() {
  return (
    <section className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_54px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-950">Visual Experience Status</h2>
          <p className="mt-1 text-sm text-slate-500">Status modul visual utama website.</p>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">Live</span>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {visualModes.map((mode) => {
          const href = visualRoutes[mode.name];
          const content = (
            <>
            <span className="text-sm font-semibold text-slate-800">{mode.name}</span>
            <span className={`text-xs font-bold ${mode.active ? "text-emerald-600" : "text-slate-400"}`}>
              {mode.status}
            </span>
            </>
          );

          return href ? (
            <Link
              aria-label={`Open ${mode.name}`}
              className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 transition hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              href={href}
              key={mode.name}
            >
              {content}
            </Link>
          ) : (
            <div
              className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
              key={mode.name}
            >
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
