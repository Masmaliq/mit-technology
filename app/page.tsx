import { SiteHeader } from "@/components/layout/SiteHeader";
import { FadeUp } from "@/components/motion/Motion";
import { CTA } from "@/components/sections/CTA";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { CinematicFlow } from "@/components/sections/CinematicFlow";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { ImpactMetrics } from "@/components/sections/ImpactMetrics";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { Solutions } from "@/components/sections/Solutions";
import { Testimonials } from "@/components/sections/Testimonials";
import { Trust } from "@/components/sections/Trust";
import {
  getHomepage,
  getClientLogos,
  getPackages,
  getProcesses,
  getSolutions,
  getTestimonials,
} from "@/lib/sanity/fetch";
import { createCmsMetadata } from "@/lib/sanity/metadata";

export const revalidate = 10;

export async function generateMetadata() {
  const homepage = await getHomepage();

  return createCmsMetadata({
    page: "homepage",
    path: "/",
    seoTitle: homepage.seoTitle,
    seoDescription: homepage.seoDescription,
    seoImage: homepage.seoImage,
    seoKeywords: homepage.seoKeywords,
    title: homepage.heroTitle,
    description: homepage.heroDescription,
  });
}

export default async function HomePage() {
  const [homepage, packages, solutions, clientLogos, processes, testimonials] =
    await Promise.all([
      getHomepage(),
      getPackages(),
      getSolutions(),
      getClientLogos(),
      getProcesses(),
      getTestimonials(),
    ]);
  const cinematicFlowEnabled = Boolean(homepage?.enableCinematicFlow);

  return (
    <>
      <SiteHeader overlay />
      <main className="overflow-hidden bg-white">
        <CinematicFlow settings={homepage}>
          <Hero
            title={homepage?.heroTitle}
            subtitle={homepage?.heroEyebrow}
            description={homepage?.heroDescription}
            heroImage={homepage?.heroMainImage}
            heroBackgroundImage={cinematicFlowEnabled ? undefined : homepage?.heroBackgroundImage}
            heroSliderImages={cinematicFlowEnabled ? undefined : homepage?.heroSliderImages}
            backgroundType={cinematicFlowEnabled ? undefined : homepage?.backgroundType}
            backgroundVideoMp4={cinematicFlowEnabled ? undefined : homepage?.heroBackgroundVideoMp4}
            backgroundPosterImage={cinematicFlowEnabled ? undefined : homepage?.backgroundPosterImage}
            heroMediaType={homepage?.heroMediaType}
            heroGif={homepage?.heroGif}
            heroVideoMp4={homepage?.heroVideoMp4}
            heroVideoPosterImage={homepage?.heroPosterImage}
            heroMotionType={homepage?.heroMotionType}
            heroMotionGif={homepage?.heroMotionGif}
            heroMotionVideoMp4={homepage?.heroMotionVideoMp4}
            heroMotionPosterImage={homepage?.heroMotionPosterImage}
            heroMotionPosition={homepage?.heroMotionPosition}
            heroMotionSize={homepage?.heroMotionSize}
            heroMotionOpacity={homepage?.heroMotionOpacity}
            heroMotionSpeed={homepage?.heroMotionSpeed}
            enableMotionOnMobile={homepage?.enableMotionOnMobile}
            visualSettings={cinematicFlowEnabled ? undefined : homepage?.visualSettings}
            primaryCtaLabel={homepage?.heroPrimaryCtaLabel}
            primaryCtaHref={homepage?.heroPrimaryCtaUrl}
            secondaryCtaLabel={homepage?.heroSecondaryCtaLabel}
            secondaryCtaHref={homepage?.heroSecondaryCtaUrl}
            externalBackground={cinematicFlowEnabled}
          />
          <FadeUp>
            <ClientLogos
              description={homepage?.clientLogosDescription}
              eyebrow={homepage?.clientLogosEyebrow}
              logos={clientLogos}
              title={homepage?.clientLogosTitle}
            />
          </FadeUp>
          <FadeUp>
            <Trust
              description={homepage?.trustDescription}
              eyebrow={homepage?.trustEyebrow}
              items={homepage?.trustCards}
              title={homepage?.trustTitle}
            />
          </FadeUp>
          <FadeUp variant="slide-up">
            <Solutions
              introDescription={homepage?.solutionsPreviewDescription}
              introEyebrow={homepage?.solutionsPreviewEyebrow}
              introTitle={homepage?.solutionsPreviewTitle}
              previewImage={homepage?.solutionsPreviewImage}
              previewRows={homepage?.solutionsPreviewRows}
              previewVisualEyebrow={homepage?.solutionsPreviewVisualEyebrow}
              previewVisualTitle={homepage?.solutionsPreviewVisualTitle}
              solutions={solutions}
              variant="preview"
            />
          </FadeUp>
          <FadeUp>
            <CaseStudies
              backgroundImage={homepage?.featuredBannerBackgroundImage}
              backgroundOverlayOpacity={homepage?.featuredBannerOverlayOpacity}
              backgroundPosition={homepage?.featuredBannerBackgroundPosition}
              enableGlow={homepage?.enableFeaturedBannerGlow}
              enableGridPattern={homepage?.enableFeaturedBannerGridPattern}
              enableOrbitLines={homepage?.enableFeaturedBannerOrbitLines}
              enableWorldMap={homepage?.enableFeaturedBannerWorldMap}
              cinematicFlowEnabled={cinematicFlowEnabled}
              ctaHref={homepage?.caseStudiesPreviewCtaUrl}
              ctaLabel={homepage?.caseStudiesPreviewCtaLabel}
              description={homepage?.caseStudiesPreviewDescription}
              eyebrow={homepage?.caseStudiesPreviewEyebrow}
              title={homepage?.caseStudiesPreviewTitle}
            />
          </FadeUp>
        </CinematicFlow>
        <FadeUp>
          <Process
            description={homepage?.processDescription}
            eyebrow={homepage?.processEyebrow}
            processes={processes}
            title={homepage?.processTitle}
          />
        </FadeUp>
        <FadeUp variant="fade">
          <ImpactMetrics
            description={homepage?.impactMetricsDescription}
            eyebrow={homepage?.impactMetricsEyebrow}
            metrics={homepage?.impactMetricsItems}
            title={homepage?.impactMetricsTitle}
          />
        </FadeUp>
        <FadeUp subtle>
          <Testimonials
            description={homepage?.testimonialsDescription}
            eyebrow={homepage?.testimonialsEyebrow}
            testimonials={testimonials}
            title={homepage?.testimonialsTitle}
          />
        </FadeUp>
        <Pricing
          ctaHref={homepage?.packagesPreviewCtaUrl}
          ctaLabel={homepage?.packagesPreviewCtaLabel}
          description={homepage?.packagesPreviewDescription}
          eyebrow={homepage?.packagesPreviewEyebrow}
          packageCtaHref={homepage?.ctaButtonHref}
          packageCtaLabel={homepage?.ctaButtonLabel}
          packages={packages}
          supportItems={homepage?.packagesPreviewSupportItems}
          title={homepage?.packagesPreviewTitle}
          variant="preview"
        />
        <FadeUp>
          <CTA
            buttonHref={homepage?.ctaButtonHref}
            buttonLabel={homepage?.ctaButtonLabel}
            description={homepage?.ctaDescription}
            eyebrow={homepage?.ctaEyebrow}
            title={homepage?.ctaTitle}
          />
        </FadeUp>
      </main>
      <FadeUp subtle>
        <Footer />
      </FadeUp>
    </>
  );
}
