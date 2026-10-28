import { AboutMaster } from "@/components/about/AboutMaster";
import { HomepageEditorialFooter } from "@/components/home/HomepageEditorialFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getAbout, getProjects, getSolutions } from "@/lib/sanity/fetch";
import { createCmsMetadata } from "@/lib/sanity/metadata";

export async function generateMetadata() {
  const about = await getAbout();

  return createCmsMetadata({
    page: "about",
    path: "/about",
    seoTitle: about.seoTitle,
    seoDescription: about.seoDescription,
    seoImage: about.seoImage,
    seoKeywords: about.seoKeywords,
    title: about.heroTitle,
    description: about.heroDescription,
  });
}

export default async function AboutPage() {
  const [about, services, projects] = await Promise.all([
    getAbout(),
    getSolutions(),
    getProjects(),
  ]);

  return (
    <>
      <SiteHeader overlay />
      <AboutMaster about={about} projects={projects} services={services} />
      <HomepageEditorialFooter />
    </>
  );
}
