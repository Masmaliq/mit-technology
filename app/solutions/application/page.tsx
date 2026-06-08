import SolutionPage from "../[slug]/page";

export default function ApplicationDivisionPage() {
  return <SolutionPage params={Promise.resolve({ slug: "application" })} />;
}
