import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { featuredPortfolioProjects } from "@/data/portfolio";

export function Portfolio() {
  return (
    <section id="portfolio" aria-label="Portfolio" className="bg-navy py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">
              Selected Work
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Digital Systems Built For Real Business Needs
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Explore selected concepts and platforms across corporate websites, ecommerce, web
              applications, and AI ecosystems.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50"
          >
            View Portfolio
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {featuredPortfolioProjects.map((project, index) => (
            <PortfolioCard dark index={index} key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
