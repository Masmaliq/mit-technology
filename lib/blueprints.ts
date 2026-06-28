import type { SectionId } from "./section-library";
import type { WebsiteTypeId } from "./website-types";
import type { DesignPresetId } from "./design-presets";
import type { ContentModelDefinition } from "./content-models";

export type BlueprintId = WebsiteTypeId;

export type BlueprintSection = {
  sectionId: SectionId;
  contentModelId?: ContentModelDefinition["id"];
};

export type BlueprintPage = {
  pageId: string;
  name: string;
  slug: string;
  sections: BlueprintSection[];
};

export type BlueprintDefinition = {
  id: BlueprintId;
  websiteType: WebsiteTypeId;
  presetId: DesignPresetId;
  description: string;
  pages: BlueprintPage[];
};

export const BLUEPRINTS: BlueprintDefinition[] = [
  {
    id: "company-profile",
    websiteType: "company-profile",
    presetId: "corporate-clean",
    description: "A clean business website for general company profiles.",
    pages: [
      {
        pageId: "home",
        name: "Home",
        slug: "/",
        sections: [
          { sectionId: "hero-corporate", contentModelId: "hero-corporate" },
          { sectionId: "about-story", contentModelId: "about-story" },
          { sectionId: "services-grid" },
          { sectionId: "testimonial-grid", contentModelId: "testimonial-grid" },
          { sectionId: "cta-corporate" },
        ],
      },
      {
        pageId: "about",
        name: "About",
        slug: "/about",
        sections: [
          { sectionId: "about-company", contentModelId: "about-company" },
          { sectionId: "about-mission-vision" },
          { sectionId: "statistics-cards" },
        ],
      },
      {
        pageId: "services",
        name: "Services",
        slug: "/services",
        sections: [{ sectionId: "services-grid" }, { sectionId: "process-cards" }],
      },
      {
        pageId: "contact",
        name: "Contact",
        slug: "/contact",
        sections: [{ sectionId: "contact-basic", contentModelId: "contact-basic" }],
      },
    ],
  },
  {
    id: "product-distribution",
    websiteType: "product-distribution",
    presetId: "product-distribution",
    description: "A product and distribution website for suppliers, FMCG, and trading businesses.",
    pages: [
      {
        pageId: "home",
        name: "Home",
        slug: "/",
        sections: [
          { sectionId: "hero-product", contentModelId: "hero-product" },
          { sectionId: "product-showcase" },
          { sectionId: "distribution-network" },
          { sectionId: "partnership-cta" },
          { sectionId: "cta-corporate" },
        ],
      },
      {
        pageId: "about",
        name: "About",
        slug: "/about",
        sections: [
          { sectionId: "about-company", contentModelId: "about-company" },
          { sectionId: "about-story", contentModelId: "about-story" },
          { sectionId: "statistics-cards" },
        ],
      },
      {
        pageId: "products",
        name: "Products",
        slug: "/products",
        sections: [
          { sectionId: "product-categories", contentModelId: "product-categories" },
          { sectionId: "product-grid", contentModelId: "product-grid" },
        ],
      },
      {
        pageId: "distribution",
        name: "Distribution",
        slug: "/distribution",
        sections: [
          { sectionId: "distribution-network" },
          { sectionId: "distribution-map", contentModelId: "distribution-map" },
        ],
      },
      {
        pageId: "partnership",
        name: "Partnership",
        slug: "/partnership",
        sections: [{ sectionId: "partnership-benefits" }, { sectionId: "partnership-cta" }],
      },
      {
        pageId: "contact",
        name: "Contact",
        slug: "/contact",
        sections: [{ sectionId: "contact-basic", contentModelId: "contact-basic" }],
      },
    ],
  },
  {
    id: "manufacturing",
    websiteType: "manufacturing",
    presetId: "manufacturing-premium",
    description: "A premium manufacturing website for factory, OEM, ODM, and production capability.",
    pages: [
      {
        pageId: "home",
        name: "Home",
        slug: "/",
        sections: [
          { sectionId: "hero-manufacturing", contentModelId: "hero-manufacturing" },
          { sectionId: "services-featured" },
          { sectionId: "process-timeline" },
          { sectionId: "cta-corporate" },
        ],
      },
      {
        pageId: "about",
        name: "About",
        slug: "/about",
        sections: [
          { sectionId: "about-company", contentModelId: "about-company" },
          { sectionId: "about-story", contentModelId: "about-story" },
        ],
      },
      {
        pageId: "factory",
        name: "Factory",
        slug: "/factory",
        sections: [{ sectionId: "gallery-grid" }, { sectionId: "statistics-counter" }],
      },
      {
        pageId: "products",
        name: "Products",
        slug: "/products",
        sections: [
          { sectionId: "product-categories", contentModelId: "product-categories" },
          { sectionId: "product-showcase" },
        ],
      },
      {
        pageId: "contact",
        name: "Contact",
        slug: "/contact",
        sections: [{ sectionId: "contact-premium" }],
      },
    ],
  },
  {
    id: "technology-company",
    websiteType: "technology-company",
    presetId: "technology-dark",
    description: "A cinematic technology website for digital products, AI, software, and automation.",
    pages: [
      {
        pageId: "home",
        name: "Home",
        slug: "/",
        sections: [
          { sectionId: "hero-technology" },
          { sectionId: "services-grid" },
          { sectionId: "process-cards" },
          { sectionId: "case-study-featured" },
          { sectionId: "cta-full-width" },
        ],
      },
      {
        pageId: "solutions",
        name: "Solutions",
        slug: "/solutions",
        sections: [{ sectionId: "services-grid" }, { sectionId: "services-featured" }],
      },
      {
        pageId: "case-studies",
        name: "Case Studies",
        slug: "/case-studies",
        sections: [{ sectionId: "case-study-grid" }],
      },
      {
        pageId: "contact",
        name: "Contact",
        slug: "/contact",
        sections: [{ sectionId: "contact-premium" }],
      },
    ],
  },
  {
    id: "media-journal",
    websiteType: "media-journal",
    presetId: "luxury-editorial",
    description: "An editorial website for journal, photography, media, and premium storytelling.",
    pages: [
      {
        pageId: "home",
        name: "Home",
        slug: "/",
        sections: [{ sectionId: "hero-editorial" }, { sectionId: "case-study-featured" }, { sectionId: "gallery-masonry" }],
      },
      {
        pageId: "journal",
        name: "Journal",
        slug: "/journal",
        sections: [{ sectionId: "case-study-grid" }],
      },
      {
        pageId: "photography",
        name: "Photography",
        slug: "/photography",
        sections: [{ sectionId: "gallery-masonry" }],
      },
      {
        pageId: "about",
        name: "About",
        slug: "/about",
        sections: [{ sectionId: "about-story", contentModelId: "about-story" }],
      },
      {
        pageId: "contact",
        name: "Contact",
        slug: "/contact",
        sections: [{ sectionId: "contact-basic", contentModelId: "contact-basic" }],
      },
    ],
  },
  {
    id: "online-store",
    websiteType: "online-store",
    presetId: "store-lite",
    description: "A lightweight catalog and inquiry website for simple product selling.",
    pages: [
      {
        pageId: "home",
        name: "Home",
        slug: "/",
        sections: [{ sectionId: "hero-store" }, { sectionId: "product-grid", contentModelId: "product-grid" }, { sectionId: "cta-simple" }],
      },
      {
        pageId: "products",
        name: "Products",
        slug: "/products",
        sections: [
          { sectionId: "product-categories", contentModelId: "product-categories" },
          { sectionId: "product-grid", contentModelId: "product-grid" },
        ],
      },
      {
        pageId: "supplier",
        name: "Supplier",
        slug: "/supplier",
        sections: [{ sectionId: "partnership-cta" }],
      },
      {
        pageId: "contact",
        name: "Contact",
        slug: "/contact",
        sections: [{ sectionId: "contact-basic", contentModelId: "contact-basic" }],
      },
    ],
  },
  {
    id: "consulting-firm",
    websiteType: "consulting-firm",
    presetId: "corporate-clean",
    description: "A professional consulting website for expertise, process, proof, and inquiry.",
    pages: [
      {
        pageId: "home",
        name: "Home",
        slug: "/",
        sections: [
          { sectionId: "hero-corporate", contentModelId: "hero-corporate" },
          { sectionId: "services-featured" },
          { sectionId: "process-cards" },
          { sectionId: "testimonial-grid", contentModelId: "testimonial-grid" },
          { sectionId: "cta-corporate" },
        ],
      },
      {
        pageId: "about",
        name: "About",
        slug: "/about",
        sections: [{ sectionId: "about-story", contentModelId: "about-story" }, { sectionId: "about-company", contentModelId: "about-company" }],
      },
      {
        pageId: "services",
        name: "Services",
        slug: "/services",
        sections: [{ sectionId: "services-grid" }, { sectionId: "process-steps" }],
      },
      {
        pageId: "contact",
        name: "Contact",
        slug: "/contact",
        sections: [{ sectionId: "contact-basic", contentModelId: "contact-basic" }],
      },
    ],
  },
  {
    id: "holding-company",
    websiteType: "holding-company",
    presetId: "corporate-clean",
    description: "A corporate group website for identity, portfolio, trust, and contact.",
    pages: [
      {
        pageId: "home",
        name: "Home",
        slug: "/",
        sections: [
          { sectionId: "hero-corporate", contentModelId: "hero-corporate" },
          { sectionId: "about-company", contentModelId: "about-company" },
          { sectionId: "statistics-cards" },
          { sectionId: "cta-corporate" },
        ],
      },
      {
        pageId: "about",
        name: "About",
        slug: "/about",
        sections: [{ sectionId: "about-story", contentModelId: "about-story" }, { sectionId: "about-mission-vision" }],
      },
      {
        pageId: "portfolio",
        name: "Portfolio",
        slug: "/portfolio",
        sections: [{ sectionId: "case-study-grid" }],
      },
      {
        pageId: "contact",
        name: "Contact",
        slug: "/contact",
        sections: [{ sectionId: "contact-basic", contentModelId: "contact-basic" }],
      },
    ],
  },
  {
    id: "export-company",
    websiteType: "export-company",
    presetId: "product-distribution",
    description: "A supplier and export website for product credibility, distribution, and partnerships.",
    pages: [
      {
        pageId: "home",
        name: "Home",
        slug: "/",
        sections: [
          { sectionId: "hero-product", contentModelId: "hero-product" },
          { sectionId: "product-categories", contentModelId: "product-categories" },
          { sectionId: "distribution-network" },
          { sectionId: "partnership-cta" },
        ],
      },
      {
        pageId: "about",
        name: "About",
        slug: "/about",
        sections: [{ sectionId: "about-company", contentModelId: "about-company" }, { sectionId: "statistics-cards" }],
      },
      {
        pageId: "products",
        name: "Products",
        slug: "/products",
        sections: [{ sectionId: "product-grid", contentModelId: "product-grid" }],
      },
      {
        pageId: "distribution",
        name: "Distribution",
        slug: "/distribution",
        sections: [{ sectionId: "distribution-map", contentModelId: "distribution-map" }],
      },
      {
        pageId: "contact",
        name: "Contact",
        slug: "/contact",
        sections: [{ sectionId: "contact-basic", contentModelId: "contact-basic" }],
      },
    ],
  },
  {
    id: "startup-saas",
    websiteType: "startup-saas",
    presetId: "technology-dark",
    description: "A modern SaaS website for product positioning, proof, pricing, and inquiry.",
    pages: [
      {
        pageId: "home",
        name: "Home",
        slug: "/",
        sections: [
          { sectionId: "hero-technology" },
          { sectionId: "services-featured" },
          { sectionId: "case-study-featured" },
          { sectionId: "cta-full-width" },
        ],
      },
      {
        pageId: "solutions",
        name: "Solutions",
        slug: "/solutions",
        sections: [{ sectionId: "services-grid" }],
      },
      {
        pageId: "packages",
        name: "Packages",
        slug: "/packages",
        sections: [{ sectionId: "statistics-cards" }, { sectionId: "cta-corporate" }],
      },
      {
        pageId: "case-studies",
        name: "Case Studies",
        slug: "/case-studies",
        sections: [{ sectionId: "case-study-grid" }],
      },
      {
        pageId: "contact",
        name: "Contact",
        slug: "/contact",
        sections: [{ sectionId: "contact-premium" }],
      },
    ],
  },
];

export function getBlueprint(id: BlueprintId): BlueprintDefinition | undefined {
  return BLUEPRINTS.find((blueprint) => blueprint.id === id);
}
