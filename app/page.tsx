import { SiteHeader } from "@/components/layout/SiteHeader";
import { HomepageLocked } from "@/components/home/HomepageLocked";
import { HomepageEditorialFooter } from "@/components/home/HomepageEditorialFooter";
import {
  getHomepage,
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
  const homepage = await getHomepage();

  return (
    <>
      <SiteHeader overlay />
      <HomepageLocked homepage={homepage} />
      <HomepageEditorialFooter />
    </>
  );
}
