import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Solutions } from "@/components/sections/Solutions";

export default function SolutionsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <Solutions />
      </main>
      <Footer />
    </>
  );
}
