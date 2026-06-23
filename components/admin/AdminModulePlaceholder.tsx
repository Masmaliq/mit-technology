import AdminShell from "./AdminShell";
import { adminModulePages } from "@/lib/admin-dashboard-data";

type AdminModuleKey = keyof typeof adminModulePages;

type AdminModulePlaceholderProps = {
  moduleKey: AdminModuleKey;
};

export default function AdminModulePlaceholder({ moduleKey }: AdminModulePlaceholderProps) {
  const page = adminModulePages[moduleKey];

  return (
    <AdminShell>
      <section className="space-y-6">
        <div className="overflow-hidden rounded-[2rem] border border-white bg-gradient-to-br from-white via-blue-50/60 to-violet-50 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-xs font-bold text-blue-700">
                {page.badge}
              </span>
              <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                {page.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                {page.description}
              </p>
            </div>

            <button
              className="w-fit rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
              type="button"
            >
              {page.action}
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 text-center shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-2xl">
            ✦
          </div>
          <h2 className="mt-5 text-xl font-bold text-slate-950">Module workspace coming soon</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Area ini sudah disiapkan sebagai halaman kerja admin. Koneksi data, form, dan workflow detail bisa
            ditambahkan pada tahap berikutnya tanpa mengubah dashboard utama.
          </p>
          <div className="mt-6 inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
            Ready for next module
          </div>
        </div>
      </section>
    </AdminShell>
  );
}
