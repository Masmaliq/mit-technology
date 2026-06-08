import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Pricing } from "@/components/sections/Pricing";
import { getPackages } from "@/lib/sanity/fetch";
import { createCmsMetadata } from "@/lib/sanity/metadata";

export function generateMetadata() {
  return createCmsMetadata({
    page: "packages",
    path: "/packages",
    title: "Packages",
    description: "Explore MIT packages for websites, applications, commerce, and AI.",
  });
}

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <Pricing packages={packages} />
      </main>
      <Footer />
    </>
  );
}
