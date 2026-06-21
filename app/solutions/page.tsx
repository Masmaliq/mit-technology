import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { CTA } from "@/components/sections/CTA";
import { InnerPageHero } from "@/components/sections/InnerPage";
import { Solutions } from "@/components/sections/Solutions";
import { getSolutionsPage } from "@/lib/sanity/fetch";
import { createCmsMetadata } from "@/lib/sanity/metadata";

const solutionsPageFallback = {
  heroEyebrow: "",
  heroTitle: "Solutions",
  heroDescription: "",
  sectionEyebrow: "",
  sectionTitle: "",
  sectionDescription: "",
  ctaEyebrow: "",
  ctaTitle: "",
  ctaDescription: "",
  ctaButtonLabel: "",
  ctaButtonUrl: "",
};

export async function generateMetadata() {
  const page = await getSolutionsPage();
  const title = page.heroTitle?.trim() || solutionsPageFallback.heroTitle;
  const description = page.heroDescription?.trim() || solutionsPageFallback.heroDescription;

  return createCmsMetadata({
    page: "solutions",
    path: "/solutions",
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    seoImage: page.seoImage,
    seoKeywords: page.seoKeywords,
    title,
    description,
  });
}

export default async function SolutionsPage() {
  const page = await getSolutionsPage();
  const heroEyebrow = page.heroEyebrow?.trim() || solutionsPageFallback.heroEyebrow;
  const heroTitle = page.heroTitle?.trim() || solutionsPageFallback.heroTitle;
  const heroDescription = page.heroDescription?.trim() || solutionsPageFallback.heroDescription;
  const sectionEyebrow = page.sectionEyebrow?.trim() || solutionsPageFallback.sectionEyebrow;
  const sectionTitle = page.sectionTitle?.trim() || solutionsPageFallback.sectionTitle;
  const sectionDescription = page.sectionDescription?.trim() || solutionsPageFallback.sectionDescription;
  const ctaEyebrow = page.ctaEyebrow?.trim() || solutionsPageFallback.ctaEyebrow;
  const ctaTitle = page.ctaTitle?.trim() || solutionsPageFallback.ctaTitle;
  const ctaDescription = page.ctaDescription?.trim() || solutionsPageFallback.ctaDescription;
  const ctaButtonLabel = page.ctaButtonLabel?.trim() || solutionsPageFallback.ctaButtonLabel;
  const ctaButtonUrl = page.ctaButtonUrl?.trim() || solutionsPageFallback.ctaButtonUrl;
  const hasCta = Boolean(ctaEyebrow || ctaTitle || ctaDescription || (ctaButtonLabel && ctaButtonUrl));

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <InnerPageHero
          page={{
            heroEyebrow,
            heroTitle,
            heroDescription,
            heroBackgroundImage: page.heroBackgroundImage,
            heroSliderImages: page.heroSliderImages,
            heroMotionVideoMp4: page.heroMotionVideoMp4,
            heroPosterImage: page.heroPosterImage,
            heroOverlayOpacity: page.heroOverlayOpacity,
            heroPrimaryButtonLabel: page.heroPrimaryButtonLabel,
            heroPrimaryButtonLink: page.heroPrimaryButtonLink,
            heroSecondaryButtonLabel: page.heroSecondaryButtonLabel,
            heroSecondaryButtonLink: page.heroSecondaryButtonLink,
          }}
          fallback={{
            eyebrow: heroEyebrow,
            title: heroTitle,
            description: heroDescription,
          }}
        />
        <Solutions
          emptyStateText="Konten solusi belum tersedia."
          introDescription={sectionDescription}
          introEyebrow={sectionEyebrow}
          introTitle={sectionTitle}
          serviceCards={page.solutionCards}
        />
        {hasCta ? (
          <CTA
            buttonHref={ctaButtonUrl}
            buttonLabel={ctaButtonLabel}
            description={ctaDescription}
            eyebrow={ctaEyebrow}
            title={ctaTitle}
          />
        ) : null}
      </main>
      <Footer />
    </>
  );
}
