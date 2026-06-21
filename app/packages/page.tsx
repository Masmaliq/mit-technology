import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { InnerPageCmsSections, InnerPageFooterCta, InnerPageHero } from "@/components/sections/InnerPage";
import { Pricing } from "@/components/sections/Pricing";
import { getInnerPage, getPackages, getPackagesPageSettings } from "@/lib/sanity/fetch";
import { createCmsMetadata } from "@/lib/sanity/metadata";

const packagesFallback = {
  eyebrow: "",
  title: "Packages",
  description: "",
};

export async function generateMetadata() {
  const settings = await getPackagesPageSettings();

  return createCmsMetadata({
    page: "packages",
    path: "/packages",
    seoTitle: settings.seoTitle,
    seoDescription: settings.seoDescription,
    seoImage: settings.seoImage,
    title: settings.pageTitle || packagesFallback.title,
    description: settings.pageDescription || packagesFallback.description,
  });
}

export default async function PackagesPage() {
  const [packages, settings, innerPage] = await Promise.all([
    getPackages(),
    getPackagesPageSettings(),
    getInnerPage("packages"),
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
        <InnerPageHero page={heroPage} fallback={packagesFallback} compact />
        <InnerPageCmsSections page={innerPage} />
        <Pricing
          cardLabel={innerPage.cardLabel}
          ctaHref={settings.packagesSectionCtaUrl}
          ctaLabel={settings.packagesSectionCtaLabel}
          description={settings.packagesSectionDescription}
          emptyStateText={innerPage.emptyStateText}
          eyebrow={settings.packagesSectionEyebrow}
          featuredBadgeLabel={innerPage.featuredBadgeLabel}
          featuredCardLabel={innerPage.featuredCardLabel}
          packageCtaHref={innerPage.packageCtaUrl}
          packageCtaLabel={innerPage.packageCtaLabel}
          packages={packages}
          priceLabel={innerPage.priceLabel}
          scopeLabel={innerPage.scopeLabel}
          supportItems={innerPage.listingSupportItems}
          title={settings.packagesSectionTitle}
        />
        <InnerPageFooterCta page={innerPage} />
      </main>
      <Footer />
    </>
  );
}
