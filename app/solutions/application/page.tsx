import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { SolutionDivisionDetail } from "@/components/sections/SolutionDivisionDetail";
import { getSolutionDivision } from "@/data/solution-divisions";

export default function ApplicationDivisionPage() {
  return (
    <>
      <SiteHeader />
      <SolutionDivisionDetail division={getSolutionDivision("application")} />
      <Footer />
    </>
  );
}
