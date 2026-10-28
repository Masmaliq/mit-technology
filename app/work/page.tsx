import { HomepageEditorialFooter } from "@/components/home/HomepageEditorialFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WorkMaster } from "@/components/work/WorkMaster";
import { getCaseStudiesPageSettings, getProcesses, getProjects } from "@/lib/sanity/fetch";
import { createCmsMetadata } from "@/lib/sanity/metadata";

export const revalidate = 10;

export async function generateMetadata() {
  const page = await getCaseStudiesPageSettings();

  return createCmsMetadata({
    page: "work",
    path: "/work",
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    seoImage: page.seoImage,
    seoKeywords: page.seoKeywords,
    title: page.pageTitle,
    description: page.pageDescription,
  });
}

export default async function WorkPage() {
  const [page, projects, processes] = await Promise.all([
    getCaseStudiesPageSettings(),
    getProjects(),
    getProcesses(),
  ]);

  return (
    <>
      <SiteHeader overlay />
      <WorkMaster page={page} processes={processes} projects={projects} />
      <HomepageEditorialFooter />
    </>
  );
}
