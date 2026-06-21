import { createCmsMetadata } from "@/lib/sanity/metadata";
import { getCaseStudies, getCaseStudiesPageSettings, getInnerPage } from "@/lib/sanity/fetch";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/Motion";
import { Footer } from "@/components/sections/Footer";
import { InnerPageCmsSections, InnerPageFooterCta, InnerPageHero } from "@/components/sections/InnerPage";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";

const caseStudiesFallback = {
  eyebrow: "",
  title: "Case Studies",
  description: "",
};

export async function generateMetadata() {
  const settings = await getCaseStudiesPageSettings();

  return createCmsMetadata({
    page: "case-studies",
    path: "/case-studies",
    seoTitle: settings.seoTitle,
    seoDescription: settings.seoDescription,
    seoImage: settings.seoImage,
    title: settings.pageTitle || caseStudiesFallback.title,
    description: settings.pageDescription || caseStudiesFallback.description,
  });
}

export default async function CaseStudiesPage() {
  const [caseStudies, settings, innerPage] = await Promise.all([
    getCaseStudies(),
    getCaseStudiesPageSettings(),
    getInnerPage("case-studies"),
  ]);
  const heroPage = {
    heroEyebrow: settings.pageEyebrow,
    heroTitle: settings.pageTitle,
    heroDescription: settings.pageDescription,
    heroBackgroundImage: settings.heroBackgroundImage,
    heroMotionVideoMp4: settings.heroBackgroundVideo,
    heroOverlayOpacity: settings.heroOverlayOpacity,
  };

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <InnerPageHero page={heroPage} fallback={caseStudiesFallback} />
        <InnerPageCmsSections page={innerPage} />

        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {(innerPage.listingEyebrow || innerPage.listingTitle || innerPage.listingDescription) ? (
              <div className="mb-10 max-w-3xl">
                {innerPage.listingEyebrow ? (
                  <Reveal direction="down">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                      {innerPage.listingEyebrow}
                    </p>
                  </Reveal>
                ) : null}
                {innerPage.listingTitle ? (
                  <Reveal direction="up">
                    <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl">
                      {innerPage.listingTitle}
                    </h2>
                  </Reveal>
                ) : null}
                {innerPage.listingDescription ? (
                  <Reveal direction="up">
                    <p className="mt-5 text-lg leading-8 text-slate-600">
                      {innerPage.listingDescription}
                    </p>
                  </Reveal>
                ) : null}
              </div>
            ) : null}
          <StaggerContainer className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {caseStudies.length > 0 ? (
              caseStudies.map((caseStudy) => (
                <StaggerItem key={caseStudy.slug || caseStudy.title}>
                  <CaseStudyCard
                    caseStudy={caseStudy}
                    ctaLabel={innerPage.listingCtaLabel}
                  />
                </StaggerItem>
              ))
            ) : (
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 text-center text-slate-600 md:col-span-2 xl:col-span-3">
                {innerPage.emptyStateText || "Content is not available."}
              </div>
            )}
          </StaggerContainer>
          </div>
        </section>
        <InnerPageFooterCta page={innerPage} />
      </main>
      <Footer />
    </>
  );
}
