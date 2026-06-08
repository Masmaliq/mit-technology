import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Solutions } from "@/components/sections/Solutions";
import { getSolutions } from "@/lib/sanity/fetch";
import { createCmsMetadata } from "@/lib/sanity/metadata";

export function generateMetadata() {
  return createCmsMetadata({
    page: "solutions",
    path: "/solutions",
    title: "Solutions",
    description: "Explore MIT digital systems solutions.",
  });
}

export default async function SolutionsPage() {
  const solutions = await getSolutions();

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <Solutions solutions={solutions} />
      </main>
      <Footer />
    </>
  );
}
