import AdminActionLink from "@/components/admin/AdminActionLink";
import { baseFeatures, packagePlans, packagesControlPanel, premiumFeatures } from "@/lib/admin-dashboard-data";
import type { PackageItem } from "@/lib/sanity/queries";

const summaryTone: Record<string, string> = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
  violet: "border-violet-100 bg-violet-50 text-violet-700",
  amber: "border-amber-100 bg-amber-50 text-amber-700",
};

function DetailList({ items }: { items: string[][] }) {
  return (
    <div className="space-y-3">
      {items.map(([label, value]) => (
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3" key={label}>
          <span className="text-sm text-slate-500">{label}</span>
          <span className="max-w-[58%] break-words text-right text-sm font-bold text-slate-900">{value}</span>
        </div>
      ))}
    </div>
  );
}

function FeatureGroup({
  title,
  description,
  features,
  premium = false,
}: {
  title: string;
  description: string;
  features: string[];
  premium?: boolean;
}) {
  return (
    <article
      className={`rounded-[2rem] border p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-7 ${
        premium ? "border-violet-100 bg-violet-50/70" : "border-slate-200/80 bg-white"
      }`}
    >
      <h2 className={`text-sm font-bold uppercase tracking-[0.16em] ${premium ? "text-violet-700" : "text-slate-500"}`}>
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      <ul className="mt-5 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
        {features.map((feature) => (
          <li className="flex gap-2" key={feature}>
            <span className={premium ? "text-violet-600" : "text-emerald-600"}>{premium ? "✦" : "✓"}</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function normalizePackagePlans(packages?: PackageItem[]) {
  if (!packages?.length) {
    return packagePlans.map((plan) => ({
      ...plan,
      source: "Blueprint",
      status: plan.active ? "Default Package" : "Blueprint Ready",
    }));
  }

  const featuredPackage = packages.find((item) => item.featured);

  return packages.map((item, index) => ({
    name: item.title || `Package ${index + 1}`,
    price: item.startingPrice || "Custom",
    description: item.description || "Deskripsi paket belum diisi di Sanity.",
    features: item.features?.length ? item.features : ["Scope paket belum diisi"],
    active: Boolean(item.featured || (!featuredPackage && index === 0)),
    source: "Sanity",
    status: item.featured ? "Featured" : "Published",
  }));
}

function buildPackageSummary(packages?: PackageItem[]) {
  if (!packages?.length) {
    return packagesControlPanel.summary;
  }

  const featuredPackage = packages.find((item) => item.featured);
  const prices = packages.map((item) => item.startingPrice).filter(Boolean);

  return [
    { label: "Total Paket", value: `${packages.length}`, tone: "blue" },
    { label: "Paket Aktif", value: featuredPackage?.title || packages[0]?.title || "Siap", tone: "emerald" },
    { label: "Rentang Harga", value: prices.length ? prices.join(" · ") : "Custom", tone: "violet" },
    { label: "Featured Package", value: featuredPackage?.title || "Belum dipilih", tone: featuredPackage ? "emerald" : "amber" },
  ];
}

function buildPackageStatus(packages?: PackageItem[]) {
  if (!packages?.length) {
    return [
      ["Sumber Data", "Blueprint fallback"],
      ["Package Collection", "Review"],
      ["Pricing", "Blueprint Ready"],
      ["Featured Package", "Premium"],
      ["CTA Paket", "Buka Sanity"],
    ];
  }

  const featuredPackage = packages.find((item) => item.featured);
  const missingDescription = packages.filter((item) => !item.description).length;
  const missingFeatures = packages.filter((item) => !item.features?.length).length;

  return [
    ["Sumber Data", "Sanity Collection"],
    ["Package Collection", `${packages.length} Paket`],
    ["Pricing", packages.some((item) => item.startingPrice) ? "Siap" : "Review"],
    ["Featured Package", featuredPackage?.title || "Belum dipilih"],
    ["Review Konten", missingDescription || missingFeatures ? `${missingDescription + missingFeatures} item` : "Siap"],
  ];
}

export default function PackagesControlPanel({ packages }: { packages?: PackageItem[] }) {
  const packageCards = normalizePackagePlans(packages);
  const summaryCards = buildPackageSummary(packages);
  const packageStatus = buildPackageStatus(packages);
  const hasSanityPackages = Boolean(packages?.length);
  const featuredPackage = packageCards.find((plan) => plan.active) || packageCards[0];

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] border border-white bg-gradient-to-br from-white via-blue-50/60 to-violet-50 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-xs font-bold text-blue-700">
              {packagesControlPanel.header.badge}
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {packagesControlPanel.header.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              {packagesControlPanel.header.description}
            </p>
          </div>

          <AdminActionLink
            action={packagesControlPanel.header.action}
            className="w-fit rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
          >
            {packagesControlPanel.header.action}
          </AdminActionLink>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((item) => (
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

      {!hasSanityPackages ? (
        <article className="rounded-[2rem] border border-amber-100 bg-amber-50/70 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-bold text-amber-700">
                Empty State
              </span>
              <h2 className="mt-4 text-xl font-bold text-slate-950">Package collection belum berisi data aktif.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Panel menampilkan blueprint paket MIT sebagai preview aman. Tambahkan package di Sanity agar daftar ini membaca data real.
              </p>
            </div>
            <AdminActionLink
              action="Add Package"
              className="w-fit rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Add Package
            </AdminActionLink>
          </div>
        </article>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[2rem] border border-blue-100 bg-blue-50/55 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Package Overview</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Ringkasan sumber data, kesiapan pricing, dan status paket utama.
          </p>
          <div className="mt-6">
            <DetailList items={packageStatus} />
          </div>
        </article>

        <article className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <div className="absolute -right-14 -top-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="relative">
            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
              Featured Package
            </span>
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">{featuredPackage?.name || "Belum dipilih"}</h2>
            <p className="mt-2 text-sm font-bold text-blue-700">{featuredPackage?.price || "Custom"}</p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
              {featuredPackage?.description || "Pilih satu package unggulan agar website punya arah penawaran yang jelas."}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {(featuredPackage?.features || []).slice(0, 4).map((feature) => (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600" key={feature}>
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {packageCards.map((plan) => (
          <article
            className={`flex h-full flex-col rounded-[2rem] border p-5 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-6 ${
              plan.active
                ? "border-blue-200 bg-blue-50/50 shadow-[0_24px_80px_rgba(37,99,235,0.10)]"
                : "border-slate-200/80 bg-white"
            }`}
            key={plan.name}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="text-sm font-bold uppercase tracking-[0.14em] text-slate-400">{plan.name}</div>
                <div className="mt-2 whitespace-nowrap text-2xl font-bold tracking-tight text-slate-950">
                  {plan.price}
                </div>
                <div className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{plan.source}</div>
              </div>
              <span
                className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ${
                  plan.active ? "bg-blue-600 text-white" : "bg-emerald-50 text-emerald-700"
                }`}
              >
                {plan.active ? "Current Active" : plan.status}
              </span>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">{plan.description}</p>

            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              {plan.features.slice(0, 8).map((feature) => (
                <li className="flex gap-2" key={feature}>
                  <span className={plan.active ? "text-blue-600" : "text-emerald-600"}>✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            {plan.features.length > 8 ? (
              <div className="mt-3 text-xs font-bold text-slate-400">+{plan.features.length - 8} benefit tambahan</div>
            ) : null}
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <FeatureGroup
          description="Fitur dasar yang menjadi standar MIT Framework dan tersedia sejak paket Starter."
          features={baseFeatures}
          title="Base Features"
        />
        <FeatureGroup
          description="Fitur lanjutan untuk paket Growth, Premium, atau custom project."
          features={premiumFeatures}
          premium
          title="Premium Features"
        />
      </div>

      <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
        <h2 className="text-xl font-bold text-slate-950">Aksi Cepat</h2>
        <p className="mt-1 text-sm text-slate-500">Akses cepat untuk mengelola paket, pricing, dan preview modul.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {packagesControlPanel.quickActions.map((action, index) => (
            <AdminActionLink
              action={action}
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                index === 0
                  ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
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
