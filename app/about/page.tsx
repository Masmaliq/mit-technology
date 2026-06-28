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
            eyebrow: about.heroEyebrow || "About",
            title: about.heroTitle || "About content is not available yet.",
            description: about.heroDescription,
          }}
          editorial
        />

        <section className="bg-white px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[48rem] text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              {about.storyEyebrow || "Story"}
            </p>
            <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] tracking-tight text-navy md:text-[2.5rem]">
              {about.storyTitle || about.heroTitle || "Story"}
            </h2>
            {about.storyDescription ? (
              <p className="mt-7 text-left text-[17px] leading-[1.9] text-slate-600 md:text-center">
                {about.storyDescription}
              </p>
            ) : null}
          </div>
        </section>

        <section className="bg-white px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="border-y border-slate-200 py-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {about.missionEyebrow || "MISSION"}
              </p>
              <div className="mx-auto mt-5 max-w-4xl space-y-3">
                {mission.map((item, index) => (
                  <p
                    className="text-[15px] font-normal leading-[1.6] text-navy"
                    key={`${item}-${index}`}
                    style={{ fontSize: "15px", fontWeight: 400, lineHeight: "24px" }}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="border-b border-slate-200 py-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {about.visionEyebrow || "VISION"}
              </p>
              <p
                className="mx-auto mt-5 max-w-4xl text-[15px] font-normal leading-[1.6] text-navy"
                style={{ fontSize: "15px", fontWeight: 400, lineHeight: "24px" }}
              >
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
