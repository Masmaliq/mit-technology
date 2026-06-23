import { baseFeatures, packagePlans, premiumFeatures } from "@/lib/admin-dashboard-data";

function FeatureList({ features, premium = false }: { features: string[]; premium?: boolean }) {
  return (
    <ul className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
      {features.map((feature) => (
        <li className="flex gap-2" key={feature}>
          <span className={premium ? "text-violet-600" : "text-emerald-600"}>{premium ? "✦" : "✓"}</span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PackagePlanControl() {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
      <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 via-white to-violet-50 px-6 py-5 sm:px-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-950">Package / Plan Control</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Kelola struktur paket internal MIT Framework berdasarkan level fitur, kompleksitas visual, dan kebutuhan pengembangan website.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
              3 Paket Internal
            </span>
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
              Active: Premium
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-7">
        <div className="grid gap-4 lg:grid-cols-3">
          {packagePlans.map((plan) => (
            <article
              className={`flex h-full flex-col rounded-3xl border p-5 ${
                plan.active
                  ? "border-blue-200 bg-blue-50/50 shadow-[0_20px_60px_rgba(37,99,235,0.10)]"
                  : "border-slate-200 bg-white"
              }`}
              key={plan.name}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-bold uppercase tracking-[0.14em] text-slate-400">{plan.name}</div>
                  <div className="mt-2 whitespace-nowrap text-2xl font-bold tracking-tight text-slate-950">
                    {plan.price}
                  </div>
                </div>
                {plan.active ? (
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                    Current Active
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{plan.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-700">
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

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Base Features</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Fitur dasar yang menjadi standar MIT Framework dan tersedia sejak paket Starter.
            </p>
            <div className="mt-4">
              <FeatureList features={baseFeatures} />
            </div>
          </div>
          <div className="rounded-3xl border border-violet-100 bg-violet-50/70 p-5">
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-violet-700">
              Advanced / Premium Features
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Fitur lanjutan untuk paket Growth, Premium, atau custom project.
            </p>
            <div className="mt-4">
              <FeatureList features={premiumFeatures} premium />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
