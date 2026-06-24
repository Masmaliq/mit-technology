import AdminActionLink from "@/components/admin/AdminActionLink";
import { previewAccess } from "@/lib/admin-dashboard-data";

export default function PreviewAccess() {
  return (
    <section className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_54px_rgba(15,23,42,0.05)]">
      <h2 className="text-lg font-bold text-slate-950">Preview & Akses</h2>
      <p className="mt-1 text-sm text-slate-500">Mode preview untuk cek tampilan website.</p>
      <div className="mt-5 grid gap-3">
        {previewAccess.map((item, index) => (
          <AdminActionLink
            action={item}
            className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
              index === 0
                ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
            }`}
            key={item}
          >
            {item}
          </AdminActionLink>
        ))}
      </div>
    </section>
  );
}
