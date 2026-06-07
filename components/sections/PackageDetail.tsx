import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import type { PackageCategory } from "@/data/packages";

type PackageDetailProps = {
  category: PackageCategory;
};

export function PackageDetail({ category }: PackageDetailProps) {
  return (
    <main className="bg-white">
      <section className="bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            MIT Technology Packages
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-navy md:text-7xl">
            {category.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{category.subtitle}</p>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {category.plans.map((plan) => (
            <article
              className={`flex rounded-[1.5rem] border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glass-lg ${
                plan.featured
                  ? "border-primary bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] shadow-glass-lg"
                  : "border-slate-200 bg-white"
              }`}
              key={`${category.title}-${plan.name}`}
            >
              <div className="flex w-full flex-col">
                <div>
                  {plan.featured ? (
                    <span className="mb-5 inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                      Recommended
                    </span>
                  ) : null}
                  <h2 className="text-2xl font-semibold text-navy">{plan.name}</h2>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-navy">
                    {plan.price}
                  </p>
                  {plan.suitableFor ? (
                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      <span className="font-semibold text-navy">Cocok untuk: </span>
                      {plan.suitableFor}
                    </p>
                  ) : null}
                  {plan.includes ? (
                    <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
                      {plan.includes}
                    </p>
                  ) : null}
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      className="flex items-start gap-3 text-sm font-medium leading-6 text-slate-600"
                      key={feature}
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.addOns?.length ? (
                  <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Add-On
                    </p>
                    <div className="mt-3 space-y-2">
                      {plan.addOns.map((addOn) => (
                        <p className="text-sm font-semibold text-slate-700" key={addOn}>
                          {addOn}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="mt-auto pt-6">
                  <div className="rounded-2xl bg-navy p-4 text-white">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
                      <ShieldCheck className="h-4 w-4" />
                      Annual Maintenance
                    </div>
                    <p className="mt-2 text-lg font-semibold">{plan.maintenance}</p>
                  </div>
                  <Link
                    href="/contact"
                    className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 ${
                      plan.featured
                        ? "bg-primary text-white hover:bg-blue-700"
                        : "border border-slate-200 text-navy hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    Discuss {plan.name}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
