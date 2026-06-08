import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudyItem } from "@/lib/sanity/queries";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";

type CaseStudiesProps = {
  caseStudies?: CaseStudyItem[];
};

export function CaseStudies({ caseStudies }: CaseStudiesProps) {
  const items = caseStudies?.filter((item) => item.title && item.slug) ?? [];

  return (
    <section id="case-studies" aria-label="Case studies" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Case Studies
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl">
              Business outcomes shaped into digital systems.
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white shadow-glass-lg transition duration-300 hover:-translate-y-0.5 hover:bg-primary"
          >
            View Case Studies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {items.length > 0 ? (
            items.map((caseStudy) => (
              <CaseStudyCard caseStudy={caseStudy} key={caseStudy.slug || caseStudy.title} />
            ))
          ) : (
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 text-center text-slate-600 lg:col-span-3">
              Case study content is not available yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
