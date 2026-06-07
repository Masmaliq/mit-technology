import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import {
  getRelatedPackageCategory,
  type SolutionDivision
} from "@/data/solution-divisions";

type SolutionDivisionDetailProps = {
  division: SolutionDivision;
};

export function SolutionDivisionDetail({ division }: SolutionDivisionDetailProps) {
  const relatedPackage = getRelatedPackageCategory(division);

  return (
    <main className="bg-white">
      <section className="bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            MIT Solutions
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-navy md:text-7xl">
            {division.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{division.overview}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white shadow-glass-lg transition duration-300 hover:-translate-y-1 hover:bg-blue-700"
            >
              Discuss this division
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={division.packageHref}
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
              Built as a focused division, not a generic service list.
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              This division gives MIT clients a dedicated path from business goals to production
              systems, with services grouped around clear outcomes and scalable delivery.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {division.services.map((service) => (
              <div
                className="rounded-[1.25rem] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-glass-lg"
                key={service}
              >
                <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Check className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold text-navy">{service}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Structured for clarity, conversion, maintainability, and long-term business use.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Related Packages
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-navy">
                {relatedPackage.title}
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-slate-600">
                {relatedPackage.subtitle}
              </p>
            </div>
            <Link
              href={division.packageHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition duration-200 hover:text-blue-700"
            >
              See full package details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {relatedPackage.plans.slice(0, 3).map((plan) => (
              <article
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-glass-lg"
                key={plan.name}
              >
                <h3 className="text-2xl font-semibold text-navy">{plan.name}</h3>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-primary">
                  {plan.price}
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Annual Maintenance
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-700">{plan.maintenance}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.32),transparent_34%),linear-gradient(135deg,#0f172a_0%,#172554_100%)] p-8 text-white shadow-glass-lg md:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
                CTA
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                Build with the right MIT division.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Share your business goal and MIT will map the division, package, and implementation
                path that fits the next stage.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold text-navy transition duration-300 hover:-translate-y-1 hover:bg-blue-50"
            >
              Start consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
