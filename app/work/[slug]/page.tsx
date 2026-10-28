import { notFound } from "next/navigation";
import { HomepageEditorialFooter } from "@/components/home/HomepageEditorialFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmorensCaseStudy } from "@/components/work/AmorensCaseStudy";
import { WorkDetail } from "@/components/work/WorkDetail";
import { getCaseStudies, getCaseStudyBySlug, getProjectBySlug, getProjects } from "@/lib/sanity/fetch";
import { createCmsMetadata } from "@/lib/sanity/metadata";

export const revalidate = 10;

type WorkDetailPageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const [projects, caseStudies] = await Promise.all([getProjects(), getCaseStudies()]);
  const slugs = new Set([...projects.filter((project) => project.slug).map((project) => project.slug!), ...caseStudies.filter((item) => item.slug).map((item) => item.slug!)]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const [caseStudy, project] = await Promise.all([getCaseStudyBySlug(slug), getProjectBySlug(slug)]);
  return createCmsMetadata({
    title: caseStudy?.title || project?.title,
    description: caseStudy?.seoDescription || caseStudy?.statement || caseStudy?.overviewDescription || project?.shortDescription,
    path: `/work/${slug}`,
    seoTitle: caseStudy?.seoTitle || project?.seoTitle,
    seoDescription: caseStudy?.seoDescription || project?.seoDescription,
    seoImage: caseStudy?.seoImage || caseStudy?.featuredImage || project?.seoImage || project?.heroMedia?.image || project?.coverMedia?.image || project?.coverImage,
  });
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (caseStudy?.title) {
    return (
      <>
        <SiteHeader light />
        <AmorensCaseStudy caseStudy={caseStudy} />
        <HomepageEditorialFooter />
      </>
    );
  }
  const project = await getProjectBySlug(slug);
  if (!project?.title) notFound();

  return (
    <>
      <SiteHeader />
      <WorkDetail project={project} />
      <HomepageEditorialFooter />
    </>
  );
}
