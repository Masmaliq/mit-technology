import { HomepageEditorialFooter } from "@/components/home/HomepageEditorialFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PricingMaster } from "@/components/pricing/PricingMaster";
import { getPackages, getPackagesPageSettings } from "@/lib/sanity/fetch";
import { createCmsMetadata } from "@/lib/sanity/metadata";

export const revalidate = 10;

export async function generateMetadata() {
  const page = await getPackagesPageSettings();
  return createCmsMetadata({
    page: "pricing",
    path: "/pricing",
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    seoImage: page.seoImage,
    seoKeywords: page.seoKeywords,
    title: page.pageTitle,
    description: page.pageDescription,
  });
}

export default async function PricingPage() {
  const [page, packages] = await Promise.all([
    getPackagesPageSettings(),
    getPackages(),
  ]);
  return (
    <>
      <SiteHeader overlay />
      <PricingMaster packages={packages} page={page} />
      <HomepageEditorialFooter />
    </>
  );
}
