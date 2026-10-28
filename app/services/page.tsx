import { HomepageEditorialFooter } from "@/components/home/HomepageEditorialFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ServicesMaster } from "@/components/services/ServicesMaster";
import { getSolutions, getSolutionsPage } from "@/lib/sanity/fetch";
import { createCmsMetadata } from "@/lib/sanity/metadata";

export const revalidate = 10;

export async function generateMetadata() {
  const page = await getSolutionsPage();

  return createCmsMetadata({
    page: "services",
    path: "/services",
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    seoImage: page.seoImage,
    seoKeywords: page.seoKeywords,
    title: page.heroTitle,
    description: page.heroDescription,
  });
}

export default async function ServicesPage() {
  const [page, services] = await Promise.all([getSolutionsPage(), getSolutions()]);

  return (
    <>
      <SiteHeader overlay />
      <ServicesMaster page={page} services={services} />
      <HomepageEditorialFooter />
    </>
  );
}
