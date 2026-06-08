import { createCmsMetadata } from "@/lib/sanity/metadata";
import { getCaseStudies } from "@/lib/sanity/fetch";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";

export function generateMetadata() {
  return createCmsMetadata({
    title: "Case Studies",
    description: "Explore MIT case studies and business outcomes.",
    path: "/case-studies",
  });
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Case Studies
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-navy md:text-7xl">
              Digital systems measured by business outcomes.
            </h1>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
            {caseStudies.length > 0 ? (
              caseStudies.map((caseStudy) => (
                <CaseStudyCard caseStudy={caseStudy} key={caseStudy.slug || caseStudy.title} />
              ))
            ) : (
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 text-center text-slate-600 md:col-span-2 xl:col-span-3">
                Case study content is not available yet.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
