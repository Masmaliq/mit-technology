import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Pricing } from "@/components/sections/Pricing";

export default function PackagesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
