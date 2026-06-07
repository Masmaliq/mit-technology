import { packageCategories } from "@/data/packages";

export type SolutionDivision = {
  slug: "corporate" | "ecommerce" | "application" | "ai";
  title: string;
  label: string;
  href: string;
  overview: string;
  services: string[];
  packageHref: string;
};

export const solutionDivisions: SolutionDivision[] = [
  {
    slug: "corporate",
    title: "Corporate Division",
    label: "Corporate systems",
    href: "/solutions/corporate",
    overview:
      "Premium corporate web systems for companies that need trust, investor clarity, export readiness, and an enterprise-grade digital presence.",
    services: [
      "Company Profile Website",
      "Corporate Website",
      "Investor Relations",
      "Annual Report",
      "Export Company Website"
    ],
    packageHref: "/company-profile"
  },
  {
    slug: "ecommerce",
    title: "E-Commerce Division",
    label: "Commerce infrastructure",
    href: "/solutions/ecommerce",
    overview:
      "Storefront and commerce infrastructure for brands, distributors, and B2B companies that need a scalable selling system.",
    services: [
      "Online Store",
      "WooCommerce",
      "Marketplace Integration",
      "B2B Commerce",
      "Distributor Portal"
    ],
    packageHref: "/ecommerce"
  },
  {
    slug: "application",
    title: "Application Division",
    label: "Business applications",
    href: "/solutions/application",
    overview:
      "Custom business applications for teams that need dashboards, internal tools, CRM, ERP, membership, or SaaS platforms.",
    services: [
      "Custom Dashboard",
      "CRM System",
      "ERP System",
      "Membership Platform",
      "SaaS Platform"
    ],
    packageHref: "/web-app"
  },
  {
    slug: "ai",
    title: "AI Division",
    label: "AI operations",
    href: "/solutions/ai",
    overview:
      "AI-powered systems that help companies automate support, content, workflows, knowledge access, and internal assistance.",
    services: [
      "AI Chatbot",
      "AI Customer Service",
      "AI Content Generator",
      "AI Workflow Automation",
      "AI Company Assistant"
    ],
    packageHref: "/ai-ecosystem"
  }
];

export function getSolutionDivision(slug: SolutionDivision["slug"]) {
  const division = solutionDivisions.find((item) => item.slug === slug);

  if (!division) {
    throw new Error(`Solution division not found: ${slug}`);
  }

  return division;
}

export function getRelatedPackageCategory(division: SolutionDivision) {
  const category = packageCategories.find((item) => item.href === division.packageHref);

  if (!category) {
    throw new Error(`Related package category not found: ${division.packageHref}`);
  }

  return category;
}
