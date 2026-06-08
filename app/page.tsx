import { SiteHeader } from "@/components/layout/SiteHeader";
import { CTA } from "@/components/sections/CTA";
import { CaseStudies } from "@/components/sections/CaseStudies";
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
  getCaseStudies,
  getClientLogos,
  getImpactMetrics,
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
  const [homepage, packages, solutions, caseStudies, processes, testimonials, clientLogos, impactMetrics] =
    await Promise.all([
      getHomepage(),
      getPackages(),
      getSolutions(),
      getCaseStudies(),
      getProcesses(),
      getTestimonials(),
      getClientLogos(),
      getImpactMetrics(),
    ]);
  const featuredCaseStudies = caseStudies.filter((item) => item.featured).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden bg-white">
        <Hero
          title={homepage?.heroTitle}
          subtitle={homepage?.heroSubtitle}
          description={homepage?.heroDescription}
          primaryCtaLabel={homepage?.heroPrimaryCtaLabel}
          primaryCtaHref={homepage?.heroPrimaryCtaHref}
          secondaryCtaLabel={homepage?.heroSecondaryCtaLabel}
          secondaryCtaHref={homepage?.heroSecondaryCtaHref}
          consoleTitle={homepage?.consoleTitle}
          consoleHeading={homepage?.consoleHeading}
          metricOneValue={homepage?.metricOneValue}
          metricOneLabel={homepage?.metricOneLabel}
          metricTwoValue={homepage?.metricTwoValue}
          metricTwoLabel={homepage?.metricTwoLabel}
          recommendedStack={homepage?.recommendedStack}
        />
        <ClientLogos logos={clientLogos} />
        <Trust
          eyebrow={homepage?.trustEyebrow}
          title={homepage?.trustTitle}
          description={homepage?.trustDescription}
          items={homepage?.trustItems}
        />
        <Solutions solutions={solutions} />
        <Process processes={processes} />
        <CaseStudies caseStudies={featuredCaseStudies} />
        <ImpactMetrics metrics={impactMetrics} />
        <Testimonials testimonials={testimonials} />
        <Pricing packages={packages} />
        <CTA
          eyebrow={homepage?.ctaEyebrow}
          title={homepage?.ctaTitle}
          description={homepage?.ctaDescription}
          buttonLabel={homepage?.ctaButtonLabel}
          buttonHref={homepage?.ctaButtonHref}
        />
      </main>
      <Footer />
    </>
  );
}
