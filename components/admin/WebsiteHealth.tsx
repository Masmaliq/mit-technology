import { websiteHealth } from "@/lib/admin-dashboard-data";

export default function WebsiteHealth() {
  return (
    <section className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_54px_rgba(15,23,42,0.05)]">
      <h2 className="text-lg font-bold text-slate-950">Website Health</h2>
      <p className="mt-1 text-sm text-slate-500">Status readiness dan kualitas website.</p>
      <div className="mt-5 space-y-3">
        {websiteHealth.map(([label, value]) => (
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3" key={label}>
            <span className="text-sm text-slate-500">{label}</span>
            <span className="text-sm font-bold text-slate-900">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
