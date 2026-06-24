import AdminActionLink from "@/components/admin/AdminActionLink";
import { packageSummary } from "@/lib/admin-dashboard-data";

export default function PackageSummary() {
  return (
    <section className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_54px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-950">Internal Package Summary</h2>
          <p className="mt-1 text-sm text-slate-500">Ringkasan paket internal framework.</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
          Active
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {packageSummary.map(([label, value]) => (
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3" key={label}>
            <span className="text-sm text-slate-500">{label}</span>
            <span className="text-sm font-bold text-slate-900">{value}</span>
          </div>
        ))}
      </div>
      <AdminActionLink action="Edit Packages" className="mt-5 text-sm font-bold text-blue-600 transition hover:text-blue-700">
        Kelola Paket →
      </AdminActionLink>
    </section>
  );
}
