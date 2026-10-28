import { client } from "@/sanity/lib/client";
import { getCaseStudyCompatibilityScore } from "@/lib/routing/slug";
import {
  aboutQuery,
  caseStudiesPageSettingsQuery,
  caseStudiesQuery,
  caseStudyIdentitiesQuery,
  caseStudyBySlugQuery,
  clientLogosQuery,
  contactQuery,
  footerQuery,
  homepageFooterGlobalsQuery,
  homepageQuery,
  insightsQuery,
  insightBySlugQuery,
  impactMetricsQuery,
  innerPageBySlugQuery,
  navbarQuery,
  packagesPageSettingsQuery,
  packagesQuery,
  projectsQuery,
  projectBySlugQuery,
  portfolioQuery,
  processQuery,
  siteSettingsQuery,
  solutionBySlugQuery,
  solutionsPageQuery,
  solutionsQuery,
  testimonialsQuery,
  type About,
  type CaseStudiesPageSettings,
  type CaseStudyItem,
  type ClientLogoItem,
  type Contact,
  type Footer,
  type Homepage,
  type HomepageFooterGlobals,
  type HomepageInsight,
  type HomepageProject,
  type ImpactMetricItem,
  type InnerPage,
  type Navbar,
  type PackagesPageSettings,
  type PackageItem,
  type PortfolioItem,
  type ProcessItem,
  type SolutionItem,
  type SiteSettings,
  type TestimonialItem,
  type SolutionsPage,
} from "./queries";

function getFetchOptions(tags: string[]) {
  return process.env.NODE_ENV === "development"
    ? { cache: "no-store" as const, perspective: "published" as const, useCdn: false }
    : {
        next: { revalidate: 10, tags },
        perspective: "published" as const,
        useCdn: false,
      };
}

async function sanityFetch<T>(query: string, tags: string[], fallback: T): Promise<T> {
  try {
    const data = await client.fetch<T | null>(query, {}, getFetchOptions(tags));
    return data ?? fallback;
  } catch (error) {
    console.error("Sanity fetch failed, retrying with CDN", error);

    try {
      const data = await client.withConfig({ useCdn: true }).fetch<T | null>(
        query,
        {},
        {
          next: { revalidate: 10, tags },
          perspective: "published",
        }
      );

      return data ?? fallback;
    } catch (retryError) {
      console.error("Sanity CDN fetch failed", retryError);
      return fallback;
    }
  }
}

export function getHomepage() {
  return sanityFetch<Homepage>(homepageQuery, ["homepage"], {});
}

export function getAbout() {
  return sanityFetch<About>(aboutQuery, ["about"], {});
}

export function getInnerPage(slug: string): Promise<InnerPage> {
  return client
    .fetch<InnerPage | null>(innerPageBySlugQuery, { slug }, getFetchOptions(["innerPages", `innerPage:${slug}`]))
    .then((data) => data ?? {})
    .catch((error) => {
      console.error("Sanity fetch failed", error);
      return {};
    });
}

export function getSolutionsPage() {
  return sanityFetch<SolutionsPage>(solutionsPageQuery, ["solutionsPage"], {});
}

export function getPackages() {
  return sanityFetch<PackageItem[]>(packagesQuery, ["packages"], []);
}

export function getProjects() {
  return sanityFetch<HomepageProject[]>(projectsQuery, ["projects"], []);
}

export function getProjectBySlug(slug: string) {
  return client
    .fetch<HomepageProject | null>(
      projectBySlugQuery,
      { slug },
      getFetchOptions(["projects", `project:${slug}`])
    )
    .catch((error) => {
      console.error("Sanity project fetch failed", error);
      return null;
    });
}

export function getInsights() {
  return sanityFetch<HomepageInsight[]>(insightsQuery, ["insights"], []);
}

export function getInsightBySlug(slug: string) {
  return client
    .fetch<HomepageInsight | null>(insightBySlugQuery, { slug }, getFetchOptions(["insights", `insight:${slug}`]))
    .catch((error) => {
      console.error("Sanity insight fetch failed", error);
      return null;
    });
}

export function getPackagesPageSettings() {
  return sanityFetch<PackagesPageSettings>(packagesPageSettingsQuery, ["packagesPageSettings"], {});
}

export function getPortfolio() {
  return sanityFetch<PortfolioItem[]>(portfolioQuery, ["portfolio"], []);
}

export function getCaseStudies() {
  return sanityFetch<CaseStudyItem[]>(caseStudiesQuery, ["caseStudies"], []);
}

export function getCaseStudiesPageSettings() {
  return sanityFetch<CaseStudiesPageSettings>(caseStudiesPageSettingsQuery, ["caseStudiesPageSettings"], {});
}

export function getClientLogos() {
  return sanityFetch<ClientLogoItem[]>(clientLogosQuery, ["clientLogos"], []);
}

export function getProcesses() {
  return sanityFetch<ProcessItem[]>(processQuery, ["process"], []);
}

export function getImpactMetrics() {
  return sanityFetch<ImpactMetricItem[]>(impactMetricsQuery, ["impactMetrics"], []);
}

export function getTestimonials() {
  return sanityFetch<TestimonialItem[]>(testimonialsQuery, ["testimonials"], []);
}

export async function getCaseStudyBySlug(slug: string) {
  try {
    const data = await client.fetch<CaseStudyItem | null>(
      caseStudyBySlugQuery,
      { slug },
      getFetchOptions(["caseStudies", `caseStudy:${slug}`])
    );

    if (data) {
      return data;
    }

    const identities = await client.fetch<Array<Pick<CaseStudyItem, "_id" | "title" | "slug" | "client">>>(
      caseStudyIdentitiesQuery,
      {},
      getFetchOptions(["caseStudies", `caseStudy:${slug}`])
    );
    const matches = identities
      .map((caseStudy) => ({caseStudy, score: getCaseStudyCompatibilityScore(caseStudy, slug)}))
      .filter((match): match is {caseStudy: Pick<CaseStudyItem, "_id" | "title" | "slug" | "client">; score: number} => match.score !== null)
      .sort((left, right) => left.score - right.score);

    if (!matches.length) return null;

    const [bestMatch, secondMatch] = matches;
    if (secondMatch?.score === bestMatch.score || !bestMatch.caseStudy.slug) return null;

    return client.fetch<CaseStudyItem | null>(
      caseStudyBySlugQuery,
      {slug: bestMatch.caseStudy.slug},
      getFetchOptions(["caseStudies", `caseStudy:${bestMatch.caseStudy.slug}`])
    );
  } catch (error) {
    console.error("Sanity fetch failed", error);
    return null;
  }
}

export function getSolutions() {
  return sanityFetch<SolutionItem[]>(solutionsQuery, ["solutions"], []);
}

export async function getSolutionBySlug(slug: string) {
  try {
    const data = await client.fetch<SolutionItem | null>(
      solutionBySlugQuery,
      { slug },
      getFetchOptions(["solutions", `solution:${slug}`])
    );

    return data;
  } catch (error) {
    console.error("Sanity fetch failed", error);
    return null;
  }
}

export function getContact() {
  return sanityFetch<Contact>(contactQuery, ["contact"], {});
}

export function getNavbar() {
  return sanityFetch<Navbar>(navbarQuery, ["navbar"], {});
}

export function getFooter() {
  return sanityFetch<Footer>(footerQuery, ["footer"], {});
}

export function getHomepageFooterGlobals() {
  return sanityFetch<HomepageFooterGlobals>(homepageFooterGlobalsQuery, ["footer", "contactInformation", "socialMedia", "siteIdentity", "navbar"], {});
}

export function getSiteSettings() {
  return sanityFetch<SiteSettings>(siteSettingsQuery, ["siteSettings"], {});
}
