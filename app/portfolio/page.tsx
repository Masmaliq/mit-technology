import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { portfolioProjects } from "@/data/portfolio";

export default function PortfolioPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Portfolio
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-navy md:text-7xl">
              Digital Systems Built For Real Business Needs
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Explore selected concepts and platforms across corporate websites, ecommerce, web
              applications, and AI ecosystems.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
            {portfolioProjects.map((project, index) => (
              <PortfolioCard index={index} key={project.title} project={project} />
            ))}
          </div>
        </section>

        <section className="px-6 pb-24 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.32),transparent_34%),linear-gradient(135deg,#0f172a_0%,#172554_100%)] p-8 text-white shadow-glass-lg md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
                  Have a project in mind?
                </p>
                <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
                  Let's design a digital system that fits your business model, workflow, and growth
                  target.
                </h2>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold text-navy transition duration-300 hover:-translate-y-1 hover:bg-blue-50"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
