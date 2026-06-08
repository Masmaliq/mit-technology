import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { SolutionDivisionDetail } from "@/components/sections/SolutionDivisionDetail";
import { getSolutionBySlug, getSolutions } from "@/lib/sanity/fetch";
import { createCmsMetadata } from "@/lib/sanity/metadata";

type SolutionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const solutions = await getSolutions();

  return solutions
    .filter((solution) => solution.slug)
    .map((solution) => ({
      slug: solution.slug as string,
    }));
}

export async function generateMetadata({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);

  return createCmsMetadata({
    page: "solutions",
    path: `/solutions/${slug}`,
    seoTitle: solution?.seoTitle,
    seoDescription: solution?.seoDescription,
    seoImage: solution?.seoImage,
    seoKeywords: solution?.seoKeywords,
    title: solution?.title,
    description: solution?.shortDescription || solution?.fullDescription,
  });
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);

  if (!solution?.title) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <SolutionDivisionDetail solution={solution} />
      <Footer />
    </>
  );
}
