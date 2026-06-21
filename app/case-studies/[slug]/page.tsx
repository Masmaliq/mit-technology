import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, Quote } from "lucide-react";
import { createCmsMetadata } from "@/lib/sanity/metadata";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/sanity/fetch";
import type { SanityImageValue } from "@/lib/sanity/queries";
import { getCaseStudyUrlSlug } from "@/lib/routing/slug";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { CaseStudyGallery } from "@/components/sections/CaseStudyGallery";
import { VisualCmsLayer } from "@/components/visual/VisualCmsLayer";
import { hasHeroVisualImage } from "@/lib/visual";
import { urlFor } from "@/sanity/lib/image";

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getCaseStudyImageUrl(image?: SanityImageValue) {
  if (!image) {
    return "";
  }

  try {
    const imageUrl = urlFor(image)
      .width(1400)
      .height(900)
      .fit("crop")
      .quality(85)
      .auto("format")
      .url();

    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }
  } catch {
    // Fall through to the resolved asset URL from the Sanity query.
  }

  if (image.url?.startsWith("http")) {
    return image.url;
  }

  return image.asset?.url?.startsWith("http") ? image.asset.url : "";
}

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();

  return caseStudies
    .map((caseStudy) => getCaseStudyUrlSlug(caseStudy))
    .filter(Boolean)
    .map((caseStudy) => ({
      slug: caseStudy,
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

  if (!caseStudy?.title) {
    notFound();
  }

  const title = caseStudy.title;
  const visualPage = caseStudy.visualSettings?.pageSettings;
  const hasCmsHeroVisual = hasHeroVisualImage(caseStudy.visualSettings);
  const featuredImageUrl = getCaseStudyImageUrl(caseStudy.featuredImage);
  const gallery = (caseStudy.gallery ?? [])
    .map((image) => ({
      src: getCaseStudyImageUrl(image),
      alt: image.alt || title,
      caption: image.caption,
    }))
    .filter((image) => image.src);

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section
          className={`relative isolate overflow-hidden px-6 py-20 lg:px-8 ${
            hasCmsHeroVisual ? "bg-slate-950 text-white" : "bg-white text-navy"
          }`}
        >
          <VisualCmsLayer settings={caseStudy.visualSettings} variant="hero" />
          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.86fr] lg:items-center">
            <div>
              <p className={`text-sm font-semibold uppercase tracking-[0.24em] ${hasCmsHeroVisual ? "text-blue-200" : "text-primary"}`}>
                {visualPage?.heroEyebrowText || caseStudy.industry || "Case Study"}
              </p>
              <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
                {visualPage?.heroTitle || title}
              </h1>
              {visualPage?.heroDescription || caseStudy.client ? (
                <p className={`mt-6 text-lg font-semibold ${hasCmsHeroVisual ? "text-slate-200" : "text-slate-600"}`}>
                  {visualPage?.heroDescription || caseStudy.client}
                </p>
              ) : null}
            </div>
            <div className="relative min-h-80 overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 shadow-glass-lg backdrop-blur-xl">
              {featuredImageUrl ? (
                <Image
                  src={featuredImageUrl}
                  alt={caseStudy.featuredImage?.alt || title}
                  fill
                  priority
                  unoptimized
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_24%,rgba(37,99,235,0.2),transparent_32%),linear-gradient(135deg,#f8fbff_0%,#e8f0ff_100%)]" />
              )}
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

        <CaseStudyGallery images={gallery} />
      </main>
      <Footer />
    </>
  );
}
