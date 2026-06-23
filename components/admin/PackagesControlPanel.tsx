import { baseFeatures, packagePlans, packagesControlPanel, premiumFeatures } from "@/lib/admin-dashboard-data";

const summaryTone: Record<string, string> = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
  violet: "border-violet-100 bg-violet-50 text-violet-700",
};

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

export default function PackagesControlPanel() {
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

          <button
            className="w-fit rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
            type="button"
          >
            {packagesControlPanel.header.action}
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {packagesControlPanel.summary.map((item) => (
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

      <div className="grid gap-4 xl:grid-cols-3">
        {packagePlans.map((plan) => (
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
              </div>
              <span
                className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ${
                  plan.active ? "bg-blue-600 text-white" : "bg-emerald-50 text-emerald-700"
                }`}
              >
                {plan.active ? "Current Active" : "Active"}
              </span>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">{plan.description}</p>

            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              {plan.features.map((feature) => (
                <li className="flex gap-2" key={feature}>
                  <span className={plan.active ? "text-blue-600" : "text-emerald-600"}>✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
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
        <h2 className="text-xl font-bold text-slate-950">Quick Actions</h2>
        <p className="mt-1 text-sm text-slate-500">Akses cepat untuk workflow package dan pricing.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {packagesControlPanel.quickActions.map((action, index) => (
            <button
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                index === 0
                  ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
              key={action}
              type="button"
            >
              {action}
            </button>
          ))}
        </div>
      </article>
    </section>
  );
}
