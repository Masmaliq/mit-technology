import { SiteHeader } from "@/components/layout/SiteHeader";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { Solutions } from "@/components/sections/Solutions";
import { Testimonials } from "@/components/sections/Testimonials";
import { Trust } from "@/components/sections/Trust";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden bg-white">
        <Hero />
        <Trust />
        <Solutions />
        <Pricing />
        <Portfolio />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
