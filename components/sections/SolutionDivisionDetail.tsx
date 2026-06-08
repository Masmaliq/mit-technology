import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import type { SolutionItem } from "@/lib/sanity/queries";

type SolutionDivisionDetailProps = {
  solution: SolutionItem;
};

export function SolutionDivisionDetail({ solution }: SolutionDivisionDetailProps) {
  const features = solution.features?.filter(Boolean) ?? [];
  const benefits = solution.benefits?.filter(Boolean) ?? [];
  const process = solution.process?.filter((item) => item.title || item.description) ?? [];

  return (
    <main className="bg-white">
      <section className="bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            MIT Solutions
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-navy md:text-7xl">
            {solution.title}
          </h1>
          {solution.fullDescription || solution.shortDescription ? (
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              {solution.fullDescription || solution.shortDescription}
            </p>
          ) : null}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href={solution.ctaHref || "/contact"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white shadow-glass-lg transition duration-300 hover:-translate-y-1 hover:bg-blue-700"
            >
              {solution.ctaLabel || "Discuss this solution"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/packages"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 px-6 py-4 text-sm font-semibold text-navy transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:text-primary"
            >
              View related packages
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Overview
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy">
              {solution.shortDescription || "Built as a focused solution system."}
            </h2>
            {solution.fullDescription ? (
              <p className="mt-5 leading-8 text-slate-600">{solution.fullDescription}</p>
            ) : null}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.length > 0 ? (
              features.map((feature) => (
                <div
                  className="rounded-[1.25rem] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-glass-lg"
                  key={feature}
                >
                  <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-navy">{feature}</h3>
                </div>
              ))
            ) : (
              <div className="rounded-[1.25rem] border border-slate-200 bg-white p-5 text-slate-600 sm:col-span-2">
                Feature content is not available yet.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Benefits
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-navy">
              Business outcomes this solution supports.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {benefits.length > 0 ? (
              benefits.map((benefit) => (
                <article
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-glass-lg"
                  key={benefit}
                >
                  <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Benefit
                  </div>
                  <h3 className="text-2xl font-semibold text-navy">{benefit}</h3>
                </article>
              ))
            ) : (
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 text-center text-slate-600 lg:col-span-3">
                Benefit content is not available yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {process.length > 0 ? (
        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Process
            </p>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {process.map((step, index) => (
                <article
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
                  key={`${step.title}-${index}`}
                >
                  <span className="text-sm font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold text-navy">{step.title}</h3>
                  {step.description ? (
                    <p className="mt-3 leading-7 text-slate-600">{step.description}</p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.32),transparent_34%),linear-gradient(135deg,#0f172a_0%,#172554_100%)] p-8 text-white shadow-glass-lg md:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
                CTA
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                {solution.ctaTitle || "Build with the right MIT solution."}
              </h2>
              {solution.ctaDescription ? (
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                  {solution.ctaDescription}
                </p>
              ) : null}
            </div>
            <Link
              href={solution.ctaHref || "/contact"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold text-navy transition duration-300 hover:-translate-y-1 hover:bg-blue-50"
            >
              {solution.ctaLabel || "Start consultation"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
