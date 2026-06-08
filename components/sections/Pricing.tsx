import Link from "next/link";
import { ArrowRight, Bot, Building2, Check, ShoppingCart, Workflow } from "lucide-react";
import type { PackageItem } from "@/lib/sanity/queries";

const icons = [Building2, ShoppingCart, Workflow, Bot];

type PricingProps = {
  packages?: PackageItem[];
};

export function Pricing({ packages }: PricingProps) {
  const items = packages?.filter((item) => item.title) ?? [];

  return (
    <section
      id="pricing"
      aria-label="Pricing"
      className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Packages
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-6xl">
            Built For Every Stage Of Growth
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            From corporate websites to AI ecosystems, choose the solution that fits your business
            today and scales with you tomorrow.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {items.length > 0 ? (
            items.map((item, index) => {
            const Icon = icons[index % icons.length];
            const features = item.features?.filter(Boolean) ?? [];

            return (
              <article
                className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glass-lg"
                key={item.slug || item.title}
              >
                <div className="absolute right-0 top-0 h-36 w-36 translate-x-10 -translate-y-10 rounded-full bg-primary/10 blur-3xl transition duration-300 group-hover:bg-primary/20" />

                <div className="relative flex items-start justify-between gap-6">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary transition duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <Link
                    href="/packages"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition duration-300 group-hover:border-primary/40 group-hover:text-primary"
                    aria-label={`View ${item.title} details`}
                  >
                    <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </div>

                <div className="relative mt-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    {item.featured ? "Featured Package" : "Package"}
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-tight text-navy">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
                  ) : null}
                  <div className="mt-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Starting From
                    </p>
                    <p className="mt-2 text-5xl font-semibold tracking-tight text-navy">
                      {item.startingPrice || "Custom"}
                    </p>
                  </div>
                </div>

                <div className="relative mt-7 grid gap-3 sm:grid-cols-3">
                  {features.slice(0, 3).map((feature) => (
                    <div
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
                      key={feature}
                    >
                      <span className="mb-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="relative mt-7 rounded-2xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                    <span className="text-sm font-semibold text-navy">{features.length} features</span>
                    {item.featured ? (
                      <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                        Most Popular
                      </span>
                    ) : null}
                  </div>
                  <div className="divide-y divide-slate-200">
                    {features.map((feature) => (
                      <div
                        className="flex items-center justify-between gap-4 px-4 py-4"
                        key={`${item.title}-${feature}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-navy">{feature}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="relative mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-primary"
                >
                  View Details
                  <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                </Link>
              </article>
            );
          })
          ) : (
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 text-center text-slate-600 lg:col-span-2">
              Package content is not available yet.
            </div>
          )}
        </div>

        <div className="mt-16 overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.32),transparent_34%),linear-gradient(135deg,#0f172a_0%,#172554_100%)] p-8 text-white shadow-glass-lg md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
                Need Something Custom?
              </p>
              <h3 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
                Every business is unique.
              </h3>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                We can design a custom solution tailored to your workflow, team structure, and
                growth goals.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold text-navy transition duration-300 hover:-translate-y-1 hover:bg-blue-50"
            >
              Discuss Your Project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
