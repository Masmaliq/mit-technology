import type { DesignPresetId } from "./design-presets";
import type { PageId } from "./pages-manager";

export type WebsiteTypeId =
  | "company-profile"
  | "product-distribution"
  | "manufacturing"
  | "technology-company"
  | "media-journal"
  | "online-store"
  | "consulting-firm"
  | "holding-company"
  | "export-company"
  | "startup-saas";

export type WebsiteType = {
  id: WebsiteTypeId;
  name: string;
  description: string;
  recommendedPreset: DesignPresetId;
  typicalPages: PageId[];
  targetClients: string[];
};

export const WEBSITE_TYPES: WebsiteType[] = [
  {
    id: "company-profile",
    name: "Company Profile",
    description:
      "A standard business website for presenting company identity, services, trust, and contact information.",
    recommendedPreset: "corporate-clean",
    typicalPages: ["home", "about", "services", "contact"],
    targetClients: [
      "General business",
      "Professional services",
      "Local company",
      "Corporate profile",
    ],
  },
  {
    id: "product-distribution",
    name: "Product Distribution",
    description:
      "A product and network focused website for suppliers, distributors, trading companies, and FMCG businesses.",
    recommendedPreset: "product-distribution",
    typicalPages: [
      "home",
      "about",
      "products",
      "distribution",
      "partnership",
      "contact",
    ],
    targetClients: [
      "Food supplier",
      "Distribution company",
      "FMCG",
      "Trading business",
    ],
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description:
      "A capability-led website for factories, OEM, ODM, private label, and industrial production businesses.",
    recommendedPreset: "manufacturing-premium",
    typicalPages: ["home", "factory", "oem", "product-categories", "contact"],
    targetClients: [
      "Factory",
      "OEM",
      "ODM",
      "Private label",
      "Industrial company",
    ],
  },
  {
    id: "technology-company",
    name: "Technology Company",
    description:
      "A modern technology website for digital solutions, software, automation, AI, and internal systems.",
    recommendedPreset: "technology-dark",
    typicalPages: ["home", "solutions", "case-studies", "packages", "contact"],
    targetClients: [
      "Software company",
      "AI company",
      "Automation provider",
      "Digital solutions business",
    ],
  },
  {
    id: "media-journal",
    name: "Media Journal",
    description:
      "An editorial website for media, journals, visual storytelling, photography, and premium content brands.",
    recommendedPreset: "luxury-editorial",
    typicalPages: ["home", "journal", "photography", "about", "contact"],
    targetClients: [
      "Media",
      "Journal",
      "Photography",
      "Editorial brand",
    ],
  },
  {
    id: "online-store",
    name: "Online Store",
    description:
      "A lightweight product catalog or inquiry-based store website without full e-commerce complexity.",
    recommendedPreset: "store-lite",
    typicalPages: ["home", "products", "supplier", "contact"],
    targetClients: [
      "Simple store",
      "Product catalog",
      "WhatsApp sales",
      "Marketplace-lite business",
    ],
  },
  {
    id: "consulting-firm",
    name: "Consulting Firm",
    description:
      "A professional service website for consultants, advisors, agencies, and expert-led businesses.",
    recommendedPreset: "corporate-clean",
    typicalPages: ["home", "about", "services", "contact"],
    targetClients: [
      "Consultant",
      "Advisor",
      "Agency",
      "Professional services",
    ],
  },
  {
    id: "holding-company",
    name: "Holding Company",
    description:
      "A corporate website for presenting group identity, portfolio companies, leadership, and contact.",
    recommendedPreset: "corporate-clean",
    typicalPages: ["home", "about", "services", "contact"],
    targetClients: [
      "Holding company",
      "Investment group",
      "Business group",
      "Corporate institution",
    ],
  },
  {
    id: "export-company",
    name: "Export Company",
    description:
      "A trust and product focused website for companies selling or supplying products across regions or countries.",
    recommendedPreset: "product-distribution",
    typicalPages: [
      "home",
      "about",
      "products",
      "distribution",
      "partnership",
      "contact",
    ],
    targetClients: [
      "Exporter",
      "Supplier",
      "Trading company",
      "Regional distributor",
    ],
  },
  {
    id: "startup-saas",
    name: "Startup SaaS",
    description:
      "A modern product or platform website for SaaS, tools, and early-stage technology companies.",
    recommendedPreset: "technology-dark",
    typicalPages: ["home", "solutions", "case-studies", "packages", "contact"],
    targetClients: [
      "SaaS startup",
      "Platform company",
      "Digital product",
      "Technology startup",
    ],
  },
];

export function getWebsiteType(
  id: WebsiteTypeId,
): WebsiteType | undefined {
  return WEBSITE_TYPES.find((websiteType) => websiteType.id === id);
}
