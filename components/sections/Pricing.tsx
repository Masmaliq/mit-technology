import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { PackageItem } from "@/lib/sanity/queries";

type PricingProps = {
  packages?: PackageItem[];
};

export function Pricing({ packages }: PricingProps) {
  const items = packages?.filter((item) => item.title) ?? [];

  return (
    <section id="pricing" aria-label="Pricing" className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#9A7B38]">
              PACKAGES
            </p>
            <h2 className="mt-5 max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 md:text-6xl">
              Flexible engagements for serious digital growth.
            </h2>
          </div>
          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-lg leading-8 text-slate-600">
              Choose the right scope for your company’s current stage, from essential digital
              presence to custom enterprise systems.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(15,23,42,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1c1c1c]"
            >
              Start Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {items.length > 0 ? (
            items.map((item) => {
              const features = item.features?.filter(Boolean) ?? [];
              const previewFeatures = features.slice(0, 6);

              return (
                <article
                  className={`group flex min-h-full flex-col rounded-[1.75rem] border bg-white p-7 shadow-[0_22px_80px_rgba(15,23,42,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_100px_rgba(15,23,42,0.09)] ${
                    item.featured
                      ? "border-[#9A7B38]/35 ring-1 ring-[#9A7B38]/15"
                      : "border-slate-200"
                  }`}
                  key={item.slug || item.title}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9A7B38]">
                        {item.featured ? "Preferred Engagement" : "Engagement"}
                      </p>
                      <h3 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
                        {item.title}
                      </h3>
                    </div>
                    {item.featured ? (
                      <span className="rounded-full border border-[#9A7B38]/30 bg-[#FBF8EF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7C642E]">
                        Featured
                      </span>
                    ) : null}
                  </div>

                  {item.description ? (
                    <p className="mt-5 max-w-2xl leading-7 text-slate-600">{item.description}</p>
                  ) : null}

                  <div className="mt-8 border-y border-slate-200 py-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Starting from
                    </p>
                    <p className="mt-3 text-5xl font-semibold tracking-tight text-slate-950">
                      {item.startingPrice || "Custom"}
                    </p>
                  </div>

                  <div className="mt-7">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-semibold text-slate-950">Included scope</p>
                      <p className="text-sm text-slate-500">{features.length} items</p>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {previewFeatures.map((feature) => (
                        <div
                          className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 px-4 py-3"
                          key={`${item.title}-${feature}`}
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[#9A7B38] shadow-[0_6px_18px_rgba(15,23,42,0.08)]">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          <span className="text-sm font-medium leading-6 text-slate-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    {features.length > previewFeatures.length ? (
                      <p className="mt-4 text-sm font-medium text-slate-500">
                        +{features.length - previewFeatures.length} additional scope items
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-auto pt-8">
                    <Link
                      href="/contact"
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-semibold transition duration-300 ${
                        item.featured
                          ? "bg-slate-950 text-white hover:-translate-y-0.5 hover:bg-[#1c1c1c]"
                          : "border border-slate-300 bg-white text-slate-950 hover:-translate-y-0.5 hover:border-slate-950"
                      }`}
                    >
                      Start Consultation
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600 lg:col-span-2">
              Package content is not available yet.
            </div>
          )}
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-[#FBFAF7] px-6 py-6 sm:px-8">
          <div className="grid gap-4 text-sm text-slate-600 md:grid-cols-3">
            <p>
              <span className="font-semibold text-slate-950">Compare clearly.</span> Each package
              starts from a defined scope and can be expanded after consultation.
            </p>
            <p>
              <span className="font-semibold text-slate-950">Build deliberately.</span> MIT aligns
              strategy, content, design, and engineering before production begins.
            </p>
            <p>
              <span className="font-semibold text-slate-950">Scale cleanly.</span> Packages are
              structured to support future CMS, automation, commerce, and AI layers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
