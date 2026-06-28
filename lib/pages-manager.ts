import type { DesignPresetId } from "./design-presets";
import type { SectionId } from "./section-library";

export type PageId =
  | "home"
  | "about"
  | "services"
  | "contact"
  | "products"
  | "distribution"
  | "partnership"
  | "factory"
  | "oem"
  | "product-categories"
  | "solutions"
  | "case-studies"
  | "packages"
  | "journal"
  | "photography"
  | "supplier";

export type PageTemplate = {
  id: PageId;
  name: string;
  slug: string;
  description: string;
  sections: SectionId[];
};

export type PageDefinition = {
  presetId: DesignPresetId;
  pages: PageTemplate[];
};

export const PAGE_TEMPLATES: PageDefinition[] = [
  {
    presetId: "corporate-clean",
    pages: [
      {
        id: "home",
        name: "Home",
        slug: "/",
        description: "Main landing page for a clean corporate website.",
        sections: [
          "hero-corporate",
          "about-story",
          "services-grid",
          "process-cards",
          "testimonial-slider",
          "cta-corporate",
        ],
      },
      {
        id: "about",
        name: "About",
        slug: "/about",
        description: "Company profile page with story, mission, vision, and proof.",
        sections: [
          "hero-corporate",
          "about-company",
          "about-mission-vision",
          "statistics-cards",
        ],
      },
      {
        id: "services",
        name: "Services",
        slug: "/services",
        description: "Service overview page with process and conversion CTA.",
        sections: [
          "hero-corporate",
          "services-grid",
          "process-cards",
          "cta-simple",
        ],
      },
      {
        id: "contact",
        name: "Contact",
        slug: "/contact",
        description: "Simple contact page for inquiry and business communication.",
        sections: ["contact-basic"],
      },
    ],
  },
  {
    presetId: "product-distribution",
    pages: [
      {
        id: "home",
        name: "Home",
        slug: "/",
        description: "Product and distribution focused landing page.",
        sections: [
          "hero-product",
          "product-showcase",
          "distribution-network",
          "partnership-cta",
          "cta-corporate",
        ],
      },
      {
        id: "about",
        name: "About",
        slug: "/about",
        description: "Company profile page for supplier and distribution credibility.",
        sections: ["about-company", "about-story", "statistics-cards"],
      },
      {
        id: "products",
        name: "Products",
        slug: "/products",
        description: "Product category and catalog overview page.",
        sections: ["product-categories", "product-grid"],
      },
      {
        id: "distribution",
        name: "Distribution",
        slug: "/distribution",
        description: "Network and coverage page for distribution businesses.",
        sections: ["distribution-network", "distribution-map"],
      },
      {
        id: "partnership",
        name: "Partnership",
        slug: "/partnership",
        description: "Business partnership and channel inquiry page.",
        sections: ["partnership-benefits", "partnership-cta"],
      },
      {
        id: "contact",
        name: "Contact",
        slug: "/contact",
        description: "Contact page for sales, supplier, and partnership inquiries.",
        sections: ["contact-basic"],
      },
    ],
  },
  {
    presetId: "manufacturing-premium",
    pages: [
      {
        id: "home",
        name: "Home",
        slug: "/",
        description: "Premium manufacturing landing page with capability and process proof.",
        sections: [
          "hero-manufacturing",
          "services-featured",
          "process-timeline",
          "cta-corporate",
        ],
      },
      {
        id: "factory",
        name: "Factory",
        slug: "/factory",
        description: "Factory capability and facility proof page.",
        sections: ["gallery-grid", "statistics-counter"],
      },
      {
        id: "oem",
        name: "OEM",
        slug: "/oem",
        description: "OEM, ODM, or private label service page.",
        sections: ["services-featured"],
      },
      {
        id: "product-categories",
        name: "Product Categories",
        slug: "/product-categories",
        description: "Manufacturing product category overview.",
        sections: ["product-categories", "product-showcase"],
      },
      {
        id: "contact",
        name: "Contact",
        slug: "/contact",
        description: "Premium contact page for manufacturing inquiries.",
        sections: ["contact-premium"],
      },
    ],
  },
  {
    presetId: "technology-dark",
    pages: [
      {
        id: "home",
        name: "Home",
        slug: "/",
        description: "Cinematic technology landing page.",
        sections: [
          "hero-technology",
          "services-grid",
          "process-cards",
          "case-study-featured",
          "cta-full-width",
        ],
      },
      {
        id: "solutions",
        name: "Solutions",
        slug: "/solutions",
        description: "Technology solutions overview page.",
        sections: ["services-grid"],
      },
      {
        id: "case-studies",
        name: "Case Studies",
        slug: "/case-studies",
        description: "Project proof and outcome page.",
        sections: ["case-study-grid"],
      },
      {
        id: "packages",
        name: "Packages",
        slug: "/packages",
        description: "Package and commercial proof page.",
        sections: ["statistics-cards", "cta-corporate"],
      },
      {
        id: "contact",
        name: "Contact",
        slug: "/contact",
        description: "Premium contact page for technology inquiries.",
        sections: ["contact-premium"],
      },
    ],
  },
  {
    presetId: "luxury-editorial",
    pages: [
      {
        id: "home",
        name: "Home",
        slug: "/",
        description: "Editorial homepage with featured story and visual atmosphere.",
        sections: ["hero-editorial", "case-study-featured", "gallery-masonry"],
      },
      {
        id: "journal",
        name: "Journal",
        slug: "/journal",
        description: "Story or article listing page.",
        sections: ["case-study-grid"],
      },
      {
        id: "photography",
        name: "Photography",
        slug: "/photography",
        description: "Visual gallery page for image-led brands.",
        sections: ["gallery-masonry"],
      },
      {
        id: "about",
        name: "About",
        slug: "/about",
        description: "Editorial brand story page.",
        sections: ["about-story"],
      },
      {
        id: "contact",
        name: "Contact",
        slug: "/contact",
        description: "Simple contact page for editorial brands.",
        sections: ["contact-basic"],
      },
    ],
  },
  {
    presetId: "store-lite",
    pages: [
      {
        id: "home",
        name: "Home",
        slug: "/",
        description: "Lightweight commerce homepage for product browsing and inquiry.",
        sections: ["hero-store", "product-grid", "cta-simple"],
      },
      {
        id: "products",
        name: "Products",
        slug: "/products",
        description: "Product catalog page with categories and item grid.",
        sections: ["product-categories", "product-grid"],
      },
      {
        id: "supplier",
        name: "Supplier",
        slug: "/supplier",
        description: "Supplier inquiry and business partnership page.",
        sections: ["partnership-cta"],
      },
      {
        id: "contact",
        name: "Contact",
        slug: "/contact",
        description: "Simple contact and WhatsApp inquiry page.",
        sections: ["contact-basic"],
      },
    ],
  },
];

export function getPageTemplate(
  id: PageId,
): PageTemplate | undefined {
  return PAGE_TEMPLATES.flatMap((preset) => preset.pages).find(
    (page) => page.id === id,
  );
}

export function getPagesForPreset(
  presetId: DesignPresetId,
): PageTemplate[] {
  return (
    PAGE_TEMPLATES.find((definition) => definition.presetId === presetId)
      ?.pages ?? []
  );
}
