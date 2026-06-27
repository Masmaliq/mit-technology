import AdminActionLink from "@/components/admin/AdminActionLink";
import { productParallaxControlPanel } from "@/lib/admin-dashboard-data";

const summaryTone: Record<string, string> = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
  violet: "border-violet-100 bg-violet-50 text-violet-700",
  amber: "border-amber-100 bg-amber-50 text-amber-700",
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

const parallaxOverview = [
  ["Sumber Data", "Blueprint placeholder"],
  ["Usage Area", "Homepage"],
  ["Product Layer", "1 Primary Asset"],
  ["Scene Asset", "Video Background"],
  ["Motion Mode", "Scroll Parallax"],
];

const productLayers = [
  {
    name: "Primary Product",
    status: "Uploaded",
    file: "botol-sabun.png",
    placement: "Center Right",
    motion: "Float + Scroll",
  },
  {
    name: "Mobile Fallback",
    status: "Missing",
    file: "Belum tersedia",
    placement: "Mobile Poster",
    motion: "Lightweight",
  },
];

function ProductLayerCard({
  file,
  motion,
  name,
  placement,
  status,
}: {
  file: string;
  motion: string;
  name: string;
  placement: string;
  status: string;
}) {
  const missing = status === "Missing";

  return (
    <article className={`rounded-[2rem] border p-5 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-6 ${
      missing ? "border-amber-100 bg-amber-50/65" : "border-blue-100 bg-blue-50/50"
    }`}>
      <div className={`flex h-32 items-center justify-center rounded-[1.5rem] border text-xs font-bold uppercase tracking-[0.16em] ${
        missing ? "border-amber-100 bg-white/70 text-amber-700" : "border-blue-100 bg-white/70 text-blue-700"
      }`}>
        {missing ? "Asset Placeholder" : "Product Asset"}
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-950">{name}</h3>
          <p className="mt-1 text-sm font-semibold text-slate-500">{file}</p>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${
          missing ? "bg-amber-100 text-amber-700" : "bg-emerald-50 text-emerald-700"
        }`}>
          {status}
        </span>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-white/75 px-4 py-3">
          <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Placement</div>
          <div className="mt-1 text-sm font-bold text-slate-900">{placement}</div>
        </div>
        <div className="rounded-2xl bg-white/75 px-4 py-3">
          <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Motion</div>
          <div className="mt-1 text-sm font-bold text-slate-900">{motion}</div>
        </div>
      </div>
    </article>
  );
}

export default function ProductParallaxControlPanel() {
  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] border border-white bg-gradient-to-br from-white via-blue-50/60 to-emerald-50 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-xs font-bold text-blue-700">
              {productParallaxControlPanel.header.badge}
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {productParallaxControlPanel.header.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              {productParallaxControlPanel.header.description}
            </p>
          </div>

          <AdminActionLink
            action="Edit Parallax Studio"
            className="w-fit rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
          >
            {productParallaxControlPanel.header.action}
          </AdminActionLink>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {productParallaxControlPanel.summary.map((item) => (
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
        <article className="rounded-[2rem] border border-blue-100 bg-blue-50/55 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Product Parallax Overview</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Ringkasan layer produk, scene visual, mode motion, dan area pemakaian showcase.
          </p>
          <div className="mt-6">
            <DetailList items={parallaxOverview} />
          </div>
        </article>

        <article className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="relative">
            <span className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
              Product Showcase
            </span>
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">Floating Product Scene</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Kelola layer produk, visual bergerak, dan efek parallax untuk membuat section produk terasa lebih hidup dan premium.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Product Anchor", "Video Scene", "Scroll Motion", "Mobile Fallback Review"].map((item) => (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {productLayers.map((layer) => (
          <ProductLayerCard key={layer.name} {...layer} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <article className="rounded-[2rem] border border-blue-100 bg-blue-50/50 p-6 shadow-[0_20px_70px_rgba(37,99,235,0.06)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Floating Product Assets</h2>
          <p className="mt-1 text-sm text-slate-500">Status aset produk, posisi anchor, dan skala visual.</p>
          <div className="mt-6">
            <DetailList items={productParallaxControlPanel.productAsset} />
          </div>
        </article>

        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Background / Scene Asset</h2>
          <p className="mt-1 text-sm text-slate-500">Scene video/image pendukung visual parallax.</p>
          <div className="mt-6">
            <DetailList items={productParallaxControlPanel.backgroundScene} />
          </div>
        </article>

        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Motion Behavior</h2>
          <p className="mt-1 text-sm text-slate-500">Konfigurasi behavior scroll dan fallback motion.</p>
          <div className="mt-6">
            <DetailList items={productParallaxControlPanel.motionBehavior} />
          </div>
        </article>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Preview / Usage Status</h2>
          <p className="mt-1 text-sm text-slate-500">Checklist pemakaian parallax sebelum tampil production.</p>
          <div className="mt-6">
            <DetailList items={productParallaxControlPanel.readiness} />
          </div>
        </article>

        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Aksi Cepat</h2>
          <p className="mt-1 text-sm text-slate-500">Akses cepat untuk product scene, asset, motion, dan preview parallax.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {productParallaxControlPanel.quickActions.map((action, index) => (
              <AdminActionLink
                action={action}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                  index === 0
                    ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                    : action === "Disable Parallax"
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
