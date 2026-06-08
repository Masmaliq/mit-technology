import { client } from "@/sanity/lib/client";
import {
  aboutQuery,
  caseStudiesQuery,
  caseStudyBySlugQuery,
  clientLogosQuery,
  contactQuery,
  footerQuery,
  homepageQuery,
  impactMetricsQuery,
  navbarQuery,
  packagesQuery,
  portfolioQuery,
  processQuery,
  siteSettingsQuery,
  solutionBySlugQuery,
  solutionsQuery,
  testimonialsQuery,
  type About,
  type CaseStudyItem,
  type ClientLogoItem,
  type Contact,
  type Footer,
  type Homepage,
  type ImpactMetricItem,
  type Navbar,
  type PackageItem,
  type PortfolioItem,
  type ProcessItem,
  type SolutionItem,
  type SiteSettings,
  type TestimonialItem,
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
    console.error("Sanity fetch failed", error);
    return fallback;
  }
}

export function getHomepage() {
  return sanityFetch<Homepage>(homepageQuery, ["homepage"], {});
}

export function getAbout() {
  return sanityFetch<About>(aboutQuery, ["about"], {});
}

export function getPackages() {
  return sanityFetch<PackageItem[]>(packagesQuery, ["packages"], []);
}

export function getPortfolio() {
  return sanityFetch<PortfolioItem[]>(portfolioQuery, ["portfolio"], []);
}

export function getCaseStudies() {
  return sanityFetch<CaseStudyItem[]>(caseStudiesQuery, ["caseStudies"], []);
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

    return data;
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

export function getSiteSettings() {
  return sanityFetch<SiteSettings>(siteSettingsQuery, ["siteSettings"], {});
}
