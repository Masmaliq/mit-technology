import SolutionPage from "../[slug]/page";

export default function AiDivisionPage() {
  return <SolutionPage params={Promise.resolve({ slug: "ai" })} />;
}
