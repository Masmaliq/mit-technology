import AdminActionLink from "@/components/admin/AdminActionLink";
import { seoHealthControlPanel } from "@/lib/admin-dashboard-data";

const summaryTone: Record<string, string> = {
  emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
  violet: "border-violet-100 bg-violet-50 text-violet-700",
  amber: "border-amber-100 bg-amber-50 text-amber-700",
};

const pageStatusTone: Record<string, string> = {
  Ready: "border-emerald-100 bg-emerald-50 text-emerald-700",
  Connected: "border-emerald-100 bg-emerald-50 text-emerald-700",
  "Needs Review": "border-amber-100 bg-amber-50 text-amber-700",
  Review: "border-amber-100 bg-amber-50 text-amber-700",
  "Missing Data": "border-rose-100 bg-rose-50 text-rose-700",
};

function DetailList({ items }: { items: string[][] }) {
  return (
    <div className="space-y-3">
      {items.map(([label, value]) => {
        const warning =
          value === "Review" ||
          value === "Needs Review" ||
          value === "Missing Data" ||
          value === "1" ||
          value === "2" ||
          value === "3";

        return (
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3" key={label}>
            <span className="text-sm text-slate-500">{label}</span>
            <span className={`max-w-[58%] break-words text-right text-sm font-bold ${warning ? "text-amber-700" : "text-slate-900"}`}>
              {value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function HealthCard({
  title,
  description,
  items,
  accent = "white",
}: {
  title: string;
  description: string;
  items: string[][];
  accent?: "white" | "blue" | "emerald";
}) {
  const accentClass = {
    white: "border-slate-200/80 bg-white",
    blue: "border-blue-100 bg-blue-50/50",
    emerald: "border-emerald-100 bg-emerald-50/50",
  }[accent];

  return (
    <article className={`rounded-[2rem] border p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-7 ${accentClass}`}>
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
      <div className="mt-6">
        <DetailList items={items} />
      </div>
    </article>
  );
}

function PageSeoCard({
  description,
  image,
  page,
  route,
  source,
  status,
  title,
}: {
  description: string;
  image: string;
  page: string;
  route: string;
  source: string;
  status: string;
  title: string;
}) {
  return (
    <article className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_54px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{route}</p>
          <h3 className="mt-2 text-base font-bold text-slate-950">{page}</h3>
        </div>
        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-bold ${
            pageStatusTone[status] ?? pageStatusTone.Review
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mt-5 grid gap-2 text-xs font-semibold text-slate-500 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 px-3 py-2">
          <span className="block text-slate-400">Title</span>
          <span className="mt-1 block text-slate-800">{title}</span>
        </div>
        <div className="rounded-2xl bg-slate-50 px-3 py-2">
          <span className="block text-slate-400">Description</span>
          <span className="mt-1 block text-slate-800">{description}</span>
        </div>
        <div className="rounded-2xl bg-slate-50 px-3 py-2">
          <span className="block text-slate-400">OG Image</span>
          <span className="mt-1 block text-slate-800">{image}</span>
        </div>
        <div className="rounded-2xl bg-slate-50 px-3 py-2">
          <span className="block text-slate-400">Source</span>
          <span className="mt-1 block text-slate-800">{source}</span>
        </div>
      </div>
    </article>
  );
}

export default function SeoHealthControlPanel() {
  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] border border-white bg-gradient-to-br from-white via-blue-50/60 to-amber-50 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-amber-100 bg-white/80 px-3 py-1.5 text-xs font-bold text-amber-700">
              {seoHealthControlPanel.header.badge}
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {seoHealthControlPanel.header.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              {seoHealthControlPanel.header.description}
            </p>
          </div>

          <AdminActionLink
            action={seoHealthControlPanel.header.action}
            className="w-fit rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
          >
            {seoHealthControlPanel.header.action}
          </AdminActionLink>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {seoHealthControlPanel.summary.map((item) => (
          <article
            className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_54px_rgba(15,23,42,0.05)]"
            key={item.label}
          >
            <div className="text-sm font-bold text-slate-950">{item.label}</div>
            <div className={`mt-5 inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${summaryTone[item.tone]}`}>
              {item.value}
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <HealthCard
          accent="blue"
          description="Ringkasan metadata default, social preview, dan sumber pengecekan SEO."
          items={seoHealthControlPanel.overview}
          title="SEO Overview"
        />

        <article className="overflow-hidden rounded-[2rem] border border-amber-100 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.14)] sm:p-7">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-amber-100">
            Honest SEO Check
          </span>
          <h2 className="mt-5 max-w-xl text-2xl font-bold">Panel ini adalah checklist readiness, bukan crawler otomatis.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-amber-100/80">
            Status SEO dipakai untuk membaca kesiapan metadata dasar, image, dan route penting. Item yang belum terhubung
            ditandai Review agar tidak memberi klaim berlebihan.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {["Ready", "Needs Review", "Missing Data"].map((label) => (
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold text-white/90" key={label}>
                {label}
              </div>
            ))}
          </div>
        </article>
      </div>

      <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-950">Page SEO Status</h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Kesiapan title, description, Open Graph image, dan sumber konten untuk halaman utama.
            </p>
          </div>
          <span className="w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600">
            Static Checklist
          </span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {seoHealthControlPanel.pageSeoStatus.map((page) => (
            <PageSeoCard {...page} key={page.page} />
          ))}
        </div>
      </article>

      <div className="grid gap-6 xl:grid-cols-3">
        <HealthCard
          accent="blue"
          description="Status metadata teknis yang dibutuhkan mesin pencari dan social preview."
          items={seoHealthControlPanel.seoStatus}
          title="Global SEO Status"
        />
        <HealthCard
          description="Checklist metadata yang perlu dipantau sebelum production handoff."
          items={seoHealthControlPanel.metadataChecklist}
          title="Metadata Checklist"
        />
        <HealthCard
          accent="emerald"
          description="Status Open Graph dan social preview untuk halaman yang dibagikan."
          items={seoHealthControlPanel.socialPreviewStatus}
          title="Open Graph / Social Preview"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <HealthCard
          description="Status sitemap, robots, canonical, dan dynamic slug readiness."
          items={seoHealthControlPanel.sitemapRobotsStatus}
          title="Sitemap / Robots Status"
        />
        <HealthCard
          accent="blue"
          description="Status alt text dan fallback image untuk asset utama."
          items={seoHealthControlPanel.imageAltStatus}
          title="Image Alt Text Status"
        />
        <HealthCard
          accent="emerald"
          description="Catatan performa yang berpengaruh pada SEO teknis dan pengalaman mobile."
          items={seoHealthControlPanel.performanceStatus}
          title="Performance Note"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[2rem] border border-amber-100 bg-amber-50/65 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Issue List</h2>
          <p className="mt-1 text-sm text-slate-600">Issue ringan yang perlu dilihat sebelum deployment final.</p>
          <div className="mt-6 space-y-3">
            {seoHealthControlPanel.issues.map((issue) => (
              <div className="rounded-2xl border border-amber-100 bg-white/75 px-4 py-3 text-sm font-bold text-amber-800" key={issue}>
                {issue}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Launch Checklist</h2>
          <p className="mt-1 text-sm text-slate-500">Ringkasan kesiapan section dan halaman utama.</p>
          <div className="mt-6">
            <DetailList items={seoHealthControlPanel.launchChecklist} />
          </div>
        </article>
      </div>

      <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
        <h2 className="text-xl font-bold text-slate-950">Aksi Cepat</h2>
        <p className="mt-1 text-sm text-slate-500">Akses aman untuk audit SEO, metadata, preview, dan performance.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {seoHealthControlPanel.quickActions.map((action, index) => (
            <AdminActionLink
              action={action === "Review Metadata" ? "Review Metadata Studio" : action}
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                index === 0
                  ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                  : action === "Fix Missing Copy"
                    ? "border-amber-100 bg-amber-50 text-amber-700 hover:bg-amber-100"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
              key={action}
            >
              {action}
            </AdminActionLink>
          ))}
        </div>
      </article>
    </section>
  );
}
