import Link from "next/link";
import { ArrowRight, Bot, Building2, Check, ShoppingCart, Workflow } from "lucide-react";
import { solutionDivisions } from "@/data/solution-divisions";

const icons = [Building2, ShoppingCart, Workflow, Bot];

export function Solutions() {
  return (
    <section id="solutions" aria-label="Solutions" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Solutions Division
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl">
              Four focused divisions for enterprise digital growth.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              MIT organizes strategy, design, engineering, commerce, applications, and AI into
              clear solution divisions that match how modern companies scale.
            </p>
          </div>
          <Link
            href="/solutions"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white shadow-glass-lg transition duration-300 hover:-translate-y-0.5 hover:bg-primary"
          >
            View Solutions
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {solutionDivisions.map((division, index) => {
            const Icon = icons[index];

            return (
              <Link
                href={division.href}
                className="group flex min-h-full flex-col rounded-[1.5rem] border border-white bg-white/85 p-6 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-glass-lg"
                key={division.slug}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary transition duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-400 transition duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {division.label}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-navy">
                  {division.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{division.overview}</p>
                <div className="mt-6 space-y-3">
                  {division.services.map((service) => (
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-600" key={service}>
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {service}
                    </div>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
