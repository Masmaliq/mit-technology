import Image from "next/image";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { InnerPageHero } from "@/components/sections/InnerPage";
import { getAbout, getInnerPage } from "@/lib/sanity/fetch";
import { createCmsMetadata } from "@/lib/sanity/metadata";
import type { SanityImageValue } from "@/lib/sanity/queries";
import { urlFor } from "@/sanity/lib/image";

function getImageUrl(image?: SanityImageValue) {
  if (!image) {
    return "";
  }

  try {
    return urlFor(image).width(1400).height(980).fit("crop").auto("format").quality(90).url();
  } catch {
    return "";
  }
}

export async function generateMetadata() {
  const [about, innerPage] = await Promise.all([getAbout(), getInnerPage("about")]);

  return createCmsMetadata({
    page: "about",
    path: "/about",
    seoTitle: innerPage.seoTitle || about.seoTitle,
    seoDescription: innerPage.seoDescription || about.seoDescription,
    seoImage: innerPage.seoImage || about.seoImage,
    seoKeywords: innerPage.seoKeywords || about.seoKeywords,
    title: innerPage.heroTitle || about.heroTitle,
    description: innerPage.heroDescription || about.heroDescription,
  });
}

export default async function AboutPage() {
  const [about, innerPage] = await Promise.all([getAbout(), getInnerPage("about")]);
  const mission = about.mission?.filter(Boolean) ?? [];
  const storyImageUrl = getImageUrl(about.image);
  const heroPage = {
    ...innerPage,
    heroBackgroundImage: innerPage.heroBackgroundImage || about.image,
  };

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <InnerPageHero
          page={heroPage}
          fallback={{
            eyebrow: about.heroEyebrow || "",
            title: about.heroTitle || "",
            description: about.heroDescription,
          }}
          editorial
        />

        <section className="bg-white px-6 py-10 lg:px-8 lg:py-14">
          <div className="mx-auto max-w-[48rem] text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              {about.storyEyebrow || ""}
            </p>
            <h2 className="mt-4 text-[1.875rem] font-bold leading-[1.12] tracking-tight text-navy md:text-[2.125rem]">
              {about.storyTitle || ""}
            </h2>
            {about.storyDescription ? (
              <p className="mx-auto mt-6 max-w-[47.5rem] text-left text-[16px] leading-[1.75] text-slate-600 md:text-center">
                {about.storyDescription}
              </p>
            ) : null}
          </div>
        </section>

        <section className="bg-white px-6 py-10 lg:px-8 lg:py-14">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-4 border-y border-slate-200 py-8 md:grid-cols-[0.24fr_1fr] md:gap-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {about.missionEyebrow || "MISSION"}
              </p>
              <div className="max-w-4xl space-y-3">
                {mission.map((item, index) => (
                  <p
                    className="text-[15px] font-normal leading-[1.6] text-navy md:text-base"
                    key={`${item}-${index}`}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid gap-4 border-b border-slate-200 py-8 md:grid-cols-[0.24fr_1fr] md:gap-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {about.visionEyebrow || "VISION"}
              </p>
              <p className="max-w-4xl text-[15px] font-normal leading-[1.6] text-navy md:text-base">
                {about.vision || ""}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
