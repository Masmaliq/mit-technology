import Link from "next/link";
import { ArrowRight, Bot, Building2, Check, ShoppingCart, Workflow } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/motion/Motion";
import type { SolutionItem } from "@/lib/sanity/queries";

const iconMap = {
  ai: Bot,
  application: Workflow,
  bot: Bot,
  building: Building2,
  cart: ShoppingCart,
  corporate: Building2,
  ecommerce: ShoppingCart,
  workflow: Workflow,
};

function getIcon(icon?: string, index = 0) {
  const fallbackIcons = [Building2, ShoppingCart, Workflow, Bot];
  const key = icon?.toLowerCase() as keyof typeof iconMap | undefined;

  return key && iconMap[key] ? iconMap[key] : fallbackIcons[index % fallbackIcons.length];
}

type SolutionsProps = {
  solutions?: SolutionItem[];
};

export function Solutions({ solutions }: SolutionsProps) {
  const items = solutions?.filter((item) => item.title && item.slug) ?? [];

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

        <StaggerContainer className="mt-12 grid gap-5 lg:grid-cols-4">
          {items.length > 0 ? (
            items.map((solution, index) => {
              const Icon = getIcon(solution.icon, index);
              const features = solution.features?.filter(Boolean) ?? [];

              return (
                <StaggerItem className="h-full" key={solution.slug}>
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="group flex min-h-full flex-col rounded-[1.5rem] border border-white bg-white/85 p-6 shadow-sm backdrop-blur transition duration-[350ms] ease-out hover:-translate-y-2.5 hover:scale-[1.015] hover:border-primary/35 hover:shadow-glass-lg"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="rounded-2xl bg-primary/10 p-3 text-primary transition duration-300 group-hover:bg-primary group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-400 transition duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      {solution.featured ? "Featured solution" : "Solution"}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-navy">
                      {solution.title}
                    </h3>
                    {solution.shortDescription ? (
                      <p className="mt-3 leading-7 text-slate-600">{solution.shortDescription}</p>
                    ) : null}
                    <div className="mt-6 space-y-3">
                      {features.slice(0, 5).map((feature) => (
                        <div
                          className="flex items-center gap-3 text-sm font-medium text-slate-600"
                          key={feature}
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </Link>
                </StaggerItem>
              );
            })
          ) : (
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 text-center text-slate-600 lg:col-span-4">
              Solution content is not available yet.
            </div>
          )}
        </StaggerContainer>
      </div>
    </section>
  );
}
