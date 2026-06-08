import SolutionPage from "../[slug]/page";

export default function CorporateDivisionPage() {
  return <SolutionPage params={Promise.resolve({ slug: "corporate" })} />;
}
