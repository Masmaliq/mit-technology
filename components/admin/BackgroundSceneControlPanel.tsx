import AdminActionLink from "@/components/admin/AdminActionLink";
import { backgroundSceneControlPanel } from "@/lib/admin-dashboard-data";

const summaryTone: Record<string, string> = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
  violet: "border-violet-100 bg-violet-50 text-violet-700",
  amber: "border-amber-100 bg-amber-50 text-amber-700",
};

const layerStatusTone: Record<string, string> = {
  Active: "border-emerald-100 bg-emerald-50 text-emerald-700",
  Ready: "border-emerald-100 bg-emerald-50 text-emerald-700",
  Review: "border-amber-100 bg-amber-50 text-amber-700",
  Optional: "border-slate-200 bg-slate-50 text-slate-600",
};

function DetailList({ items }: { items: string[][] }) {
  return (
    <div className="space-y-3">
      {items.map(([label, value]) => {
        const warning = value === "Missing" || value === "Pending";

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

function SceneCard({
  title,
  description,
  items,
  accent = "white",
}: {
  title: string;
  description: string;
  items: string[][];
  accent?: "white" | "blue" | "violet";
}) {
  const accentClass = {
    white: "border-slate-200/80 bg-white",
    blue: "border-blue-100 bg-blue-50/50",
    violet: "border-violet-100 bg-violet-50/60",
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

function SceneLayerCard({
  area,
  asset,
  name,
  note,
  source,
  status,
}: {
  area: string;
  asset: string;
  name: string;
  note: string;
  source: string;
  status: string;
}) {
  return (
    <article className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_54px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{area}</p>
          <h3 className="mt-2 text-base font-bold text-slate-950">{name}</h3>
        </div>
        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-bold ${
            layerStatusTone[status] ?? layerStatusTone.Optional
          }`}
        >
          {status}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500">{note}</p>

      <div className="mt-5 grid gap-2 text-xs font-semibold text-slate-500 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 px-3 py-2">
          <span className="block text-slate-400">Asset</span>
          <span className="mt-1 block text-slate-800">{asset}</span>
        </div>
        <div className="rounded-2xl bg-slate-50 px-3 py-2">
          <span className="block text-slate-400">Source</span>
          <span className="mt-1 block text-slate-800">{source}</span>
        </div>
      </div>
    </article>
  );
}

export default function BackgroundSceneControlPanel() {
  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] border border-white bg-gradient-to-br from-white via-blue-50/60 to-violet-50 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-xs font-bold text-blue-700">
              {backgroundSceneControlPanel.header.badge}
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {backgroundSceneControlPanel.header.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              {backgroundSceneControlPanel.header.description}
            </p>
          </div>

          <AdminActionLink
            action={backgroundSceneControlPanel.header.action}
            className="w-fit rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
          >
            {backgroundSceneControlPanel.header.action}
          </AdminActionLink>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {backgroundSceneControlPanel.summary.map((item) => (
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
        <SceneCard
          accent="blue"
          description="Ringkasan scene visual, area penggunaan, dan mode background yang sedang disiapkan."
          items={backgroundSceneControlPanel.overview}
          title="Background Scene Overview"
        />

        <article className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.14)] sm:p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(96,165,250,0.38),transparent_32%),radial-gradient(circle_at_76%_70%,rgba(139,92,246,0.3),transparent_34%)]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="relative">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-blue-100">
              Scene Preview
            </span>
            <h2 className="mt-5 max-w-xl text-2xl font-bold">Atmosphere layer siap menjadi latar cinematic.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100/80">
              Preview ini adalah placeholder admin untuk night sky, glow, poster fallback, dan overlay. Asset publik tidak
              diubah dari panel ini.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {["Night Sky", "Glow Layer", "Poster Fallback"].map((label) => (
                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold text-white/90" key={label}>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>

      <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-950">Atmosphere Layer</h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Elemen visual utama untuk night sky, stars, glow, stupa layer, video, poster, dan overlay.
            </p>
          </div>
          <span className="w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600">
            Static Blueprint
          </span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {backgroundSceneControlPanel.sceneLayers.map((layer) => (
            <SceneLayerCard {...layer} key={layer.name} />
          ))}
        </div>
      </article>

      <div className="grid gap-6 xl:grid-cols-3">
        <SceneCard
          accent="blue"
          description="Status file scene utama dan poster pendukung."
          items={backgroundSceneControlPanel.sceneAsset}
          title="Background Image / Video"
        />
        <SceneCard
          accent="violet"
          description="Konfigurasi overlay agar scene tetap aman untuk teks."
          items={backgroundSceneControlPanel.visualOverlay}
          title="Gradient / Glow Layer"
        />
        <SceneCard
          description="Area halaman yang menggunakan background scene."
          items={backgroundSceneControlPanel.sceneUsage}
          title="Active Scene Status"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SceneCard
          accent="violet"
          description="Pemakaian scene pada hero dan layer pembuka website."
          items={backgroundSceneControlPanel.heroUsage}
          title="Hero Scene Usage"
        />
        <SceneCard
          description="Pemakaian scene pada section lanjutan dan transisi visual."
          items={backgroundSceneControlPanel.sectionUsage}
          title="Section Scene Usage"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Poster Image & Performance</h2>
          <p className="mt-1 text-sm text-slate-500">Kesiapan poster, fallback, dan performa scene untuk production.</p>
          <div className="mt-6">
            <DetailList items={backgroundSceneControlPanel.performanceReadiness} />
          </div>
        </article>

        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Aksi Cepat</h2>
          <p className="mt-1 text-sm text-slate-500">Akses aman untuk mengelola asset scene, overlay, dan preview background.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {backgroundSceneControlPanel.quickActions.map((action, index) => (
              <AdminActionLink
                action={action}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                  index === 0
                    ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                    : action === "Disable Scene"
                      ? "border-rose-100 bg-rose-50 text-rose-700 hover:bg-rose-100"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
                key={action}
              >
                {action}
              </AdminActionLink>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
