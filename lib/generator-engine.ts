import type { DesignPresetId } from "./design-presets";
import type { SectionId } from "./section-library";

export type GeneratedPageId =
  | "home"
  | "about"
  | "services"
  | "contact"
  | "products"
  | "distribution"
  | "partnership"
  | "factory"
  | "capabilities"
  | "case-studies"
  | "solutions"
  | "portfolio"
  | "stories"
  | "journal"
  | "photography"
  | "categories";

export interface GeneratedPage {
  pageId: GeneratedPageId;
  sections: SectionId[];
}

export interface GeneratedWebsiteBlueprint {
  presetId: DesignPresetId;
  pages: GeneratedPage[];
}

export interface GeneratorDefinition {
  presetId: DesignPresetId;
  generatedPages: GeneratedPage[];
}

export const GENERATOR_ENGINE: GeneratorDefinition[] = [
  {
    presetId: "corporate-clean",
    generatedPages: [
      {
        pageId: "home",
        sections: [
          "hero-corporate",
          "about-story",
          "services-grid",
          "testimonial-grid",
          "cta-corporate",
        ],
      },
      {
        pageId: "about",
        sections: ["hero-corporate", "about-company", "about-mission-vision"],
      },
      {
        pageId: "services",
        sections: ["hero-corporate", "services-grid", "process-cards", "cta-simple"],
      },
      {
        pageId: "contact",
        sections: ["contact-basic"],
      },
    ],
  },
  {
    presetId: "product-distribution",
    generatedPages: [
      {
        pageId: "home",
        sections: [
          "hero-product",
          "product-showcase",
          "distribution-network",
          "partnership-cta",
          "cta-corporate",
        ],
      },
      {
        pageId: "about",
        sections: ["about-company", "about-story", "statistics-cards"],
      },
      {
        pageId: "products",
        sections: ["product-categories", "product-grid"],
      },
      {
        pageId: "distribution",
        sections: ["distribution-network", "distribution-map"],
      },
      {
        pageId: "partnership",
        sections: ["partnership-benefits", "partnership-cta"],
      },
      {
        pageId: "contact",
        sections: ["contact-basic"],
      },
    ],
  },
  {
    presetId: "manufacturing-premium",
    generatedPages: [
      {
        pageId: "home",
        sections: [
          "hero-manufacturing",
          "services-featured",
          "process-timeline",
          "cta-corporate",
        ],
      },
      {
        pageId: "about",
        sections: ["about-company", "about-story", "about-mission-vision"],
      },
      {
        pageId: "factory",
        sections: ["gallery-grid", "statistics-counter"],
      },
      {
        pageId: "products",
        sections: ["product-categories", "product-showcase"],
      },
      {
        pageId: "capabilities",
        sections: ["services-featured", "process-timeline"],
      },
      {
        pageId: "case-studies",
        sections: ["case-study-grid"],
      },
      {
        pageId: "contact",
        sections: ["contact-premium"],
      },
    ],
  },
  {
    presetId: "technology-dark",
    generatedPages: [
      {
        pageId: "home",
        sections: [
          "hero-technology",
          "services-grid",
          "process-cards",
          "case-study-featured",
          "cta-full-width",
        ],
      },
      {
        pageId: "solutions",
        sections: ["services-grid", "services-featured"],
      },
      {
        pageId: "portfolio",
        sections: ["case-study-featured", "case-study-grid"],
      },
      {
        pageId: "case-studies",
        sections: ["case-study-grid"],
      },
      {
        pageId: "contact",
        sections: ["contact-premium"],
      },
    ],
  },
  {
    presetId: "luxury-editorial",
    generatedPages: [
      {
        pageId: "home",
        sections: ["hero-editorial", "case-study-featured", "gallery-masonry"],
      },
      {
        pageId: "stories",
        sections: ["case-study-grid"],
      },
      {
        pageId: "journal",
        sections: ["case-study-grid"],
      },
      {
        pageId: "photography",
        sections: ["gallery-masonry", "gallery-grid"],
      },
      {
        pageId: "contact",
        sections: ["contact-basic"],
      },
    ],
  },
  {
    presetId: "store-lite",
    generatedPages: [
      {
        pageId: "home",
        sections: ["hero-store", "product-grid", "cta-simple"],
      },
      {
        pageId: "products",
        sections: ["product-categories", "product-grid"],
      },
      {
        pageId: "categories",
        sections: ["product-categories"],
      },
      {
        pageId: "contact",
        sections: ["contact-basic"],
      },
    ],
  },
];

export function getGeneratorDefinition(
  presetId: DesignPresetId,
): GeneratorDefinition | undefined {
  return GENERATOR_ENGINE.find(
    (definition) => definition.presetId === presetId,
  );
}

export function generateBlueprint(
  presetId: DesignPresetId,
): GeneratedWebsiteBlueprint | undefined {
  const definition = getGeneratorDefinition(presetId);

  if (!definition) {
    return undefined;
  }

  return {
    presetId: definition.presetId,
    pages: definition.generatedPages,
  };
}
