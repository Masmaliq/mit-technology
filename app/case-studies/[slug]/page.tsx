import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, Quote } from "lucide-react";
import { createCmsMetadata } from "@/lib/sanity/metadata";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/sanity/fetch";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/sections/Footer";

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();

  return caseStudies
    .filter((caseStudy) => caseStudy.slug)
    .map((caseStudy) => ({
      slug: caseStudy.slug as string,
    }));
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  return createCmsMetadata({
    title: caseStudy?.title,
    description: caseStudy?.result || caseStudy?.solution || caseStudy?.challenge,
    path: `/case-studies/${slug}`,
    seoTitle: caseStudy?.seoTitle,
    seoDescription: caseStudy?.seoDescription,
    seoImage: caseStudy?.seoImage || caseStudy?.featuredImage,
    seoKeywords: caseStudy?.seoKeywords,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  const gallery = caseStudy?.gallery?.filter((image) => image.url) ?? [];

  if (!caseStudy?.title) {
    notFound();
  }

  const title = caseStudy.title;

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-6 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.86fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                {caseStudy.industry || "Case Study"}
              </p>
              <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-navy md:text-7xl">
                {title}
              </h1>
              {caseStudy.client ? (
                <p className="mt-6 text-lg font-semibold text-slate-600">{caseStudy.client}</p>
              ) : null}
            </div>
            <div className="relative min-h-80 overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 shadow-glass-lg backdrop-blur-xl">
              {caseStudy.featuredImage?.url ? (
                <Image
                  src={caseStudy.featuredImage.url}
                  alt={caseStudy.featuredImage.alt || title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              ) : null}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
            {[
              ["Challenge", caseStudy.challenge],
              ["Solution", caseStudy.solution],
              ["Result", caseStudy.result],
            ].map(([label, value]) => (
              <article
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
                key={label}
              >
                <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                  {label}
                </div>
                <p className="leading-8 text-slate-600">{value || "Content is not available yet."}</p>
              </article>
            ))}
          </div>
        </section>

        {caseStudy.testimonial ? (
          <section className="bg-navy px-6 py-20 text-white lg:px-8">
            <div className="mx-auto max-w-5xl text-center">
              <Quote className="mx-auto h-8 w-8 text-blue-200" />
              <p className="mt-8 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                {caseStudy.testimonial}
              </p>
            </div>
          </section>
        ) : null}

        {gallery.length > 0 ? (
          <section className="px-6 py-20 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
              {gallery.map((image) => (
                <div
                  className="relative min-h-80 overflow-hidden rounded-[1.5rem] border border-slate-200"
                  key={image.url}
                >
                  <Image
                    src={image.url as string}
                    alt={image.alt || title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
