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
        <section className="border-b border-slate-200 bg-[#FBFAF7] px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#9A7B38]">
              MIT PACKAGES
            </p>
            <h1 className="mt-5 max-w-5xl text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">
              Consulting-grade digital packages for companies ready to move seriously.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Explore CMS-managed engagement options across websites, applications, commerce, and
              AI systems.
            </p>
          </div>
        </section>
        <Pricing packages={packages} />
      </main>
      <Footer />
    </>
  );
}
