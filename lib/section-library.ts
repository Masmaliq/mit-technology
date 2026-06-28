export type SectionCategory =
  | "hero"
  | "about"
  | "service"
  | "product"
  | "distribution"
  | "partnership"
  | "process"
  | "testimonial"
  | "case-study"
  | "gallery"
  | "statistics"
  | "contact"
  | "cta"
  | "footer";

export type SectionComplexity = "simple" | "business" | "premium";

export type SectionId =
  | "hero-corporate"
  | "hero-manufacturing"
  | "hero-product"
  | "hero-technology"
  | "hero-editorial"
  | "hero-store"
  | "about-story"
  | "about-company"
  | "about-mission-vision"
  | "about-timeline"
  | "services-grid"
  | "services-cards"
  | "services-featured"
  | "product-grid"
  | "product-categories"
  | "product-showcase"
  | "distribution-network"
  | "distribution-map"
  | "partnership-cta"
  | "partnership-benefits"
  | "process-timeline"
  | "process-steps"
  | "process-cards"
  | "testimonial-slider"
  | "testimonial-grid"
  | "case-study-grid"
  | "case-study-featured"
  | "gallery-grid"
  | "gallery-masonry"
  | "statistics-counter"
  | "statistics-cards"
  | "contact-basic"
  | "contact-premium"
  | "cta-simple"
  | "cta-corporate"
  | "cta-full-width"
  | "footer-simple"
  | "footer-corporate"
  | "footer-editorial";

export type SectionDefinition = {
  id: SectionId;
  name: string;
  category: SectionCategory;
  description: string;
  recommendedFor: string[];
  complexity: SectionComplexity;
  motionSupport: boolean;
  sanityReady: boolean;
};

export const SECTION_LIBRARY: SectionDefinition[] = [
  {
    id: "hero-corporate",
    name: "Hero Corporate",
    category: "hero",
    description: "A clean opening section for professional company profiles.",
    recommendedFor: ["Corporate Clean", "Consulting", "Service business"],
    complexity: "simple",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "hero-manufacturing",
    name: "Hero Manufacturing",
    category: "hero",
    description: "A capability-led hero for factories, OEM, ODM, and industrial brands.",
    recommendedFor: ["Manufacturing Premium", "Factory", "Industrial"],
    complexity: "business",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "hero-product",
    name: "Hero Product",
    category: "hero",
    description: "A product-forward hero for distribution, supplier, and FMCG websites.",
    recommendedFor: ["Product Distribution", "Supplier", "FMCG"],
    complexity: "business",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "hero-technology",
    name: "Hero Technology",
    category: "hero",
    description: "A cinematic technical hero for software, AI, and automation companies.",
    recommendedFor: ["Technology Dark", "AI", "Software"],
    complexity: "premium",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "hero-editorial",
    name: "Hero Editorial",
    category: "hero",
    description: "A quiet editorial hero for media, journal, and premium storytelling sites.",
    recommendedFor: ["Luxury Editorial", "Media", "Photography"],
    complexity: "business",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "hero-store",
    name: "Hero Store",
    category: "hero",
    description: "A commerce-oriented hero for product catalogs and lightweight store pages.",
    recommendedFor: ["Store Lite", "Catalog", "Product inquiry"],
    complexity: "simple",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "about-story",
    name: "About Story",
    category: "about",
    description: "An editorial story section for company background and brand context.",
    recommendedFor: ["About page", "Company story", "Brand narrative"],
    complexity: "simple",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "about-company",
    name: "About Company",
    category: "about",
    description: "A concise company introduction section with essential business identity.",
    recommendedFor: ["Corporate Clean", "Company profile", "Business introduction"],
    complexity: "simple",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "about-mission-vision",
    name: "About Mission Vision",
    category: "about",
    description: "A structured mission and vision section for corporate credibility.",
    recommendedFor: ["About page", "Corporate profile", "Institutional profile"],
    complexity: "simple",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "about-timeline",
    name: "About Timeline",
    category: "about",
    description: "A company milestone timeline for history, growth, and achievements.",
    recommendedFor: ["Established company", "Manufacturing", "Holding"],
    complexity: "business",
    motionSupport: true,
    sanityReady: false,
  },
  {
    id: "services-grid",
    name: "Services Grid",
    category: "service",
    description: "A simple grid for listing services or business capabilities.",
    recommendedFor: ["Service business", "Consulting", "Technology"],
    complexity: "simple",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "services-cards",
    name: "Services Cards",
    category: "service",
    description: "Card-based service presentation with short descriptions and CTAs.",
    recommendedFor: ["Corporate Clean", "Service business", "Agency"],
    complexity: "business",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "services-featured",
    name: "Services Featured",
    category: "service",
    description: "A stronger service section for highlighting priority capabilities.",
    recommendedFor: ["Technology Dark", "Premium services", "Business package"],
    complexity: "premium",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "product-grid",
    name: "Product Grid",
    category: "product",
    description: "A product listing grid for catalogs, categories, or featured products.",
    recommendedFor: ["Store Lite", "Product Distribution", "Catalog"],
    complexity: "simple",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "product-categories",
    name: "Product Categories",
    category: "product",
    description: "A category-first product section for suppliers and distribution businesses.",
    recommendedFor: ["Product Distribution", "FMCG", "Trading"],
    complexity: "business",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "product-showcase",
    name: "Product Showcase",
    category: "product",
    description: "A premium product presentation section with stronger visual focus.",
    recommendedFor: ["Manufacturing Premium", "Store Lite", "Premium product"],
    complexity: "premium",
    motionSupport: true,
    sanityReady: false,
  },
  {
    id: "distribution-network",
    name: "Distribution Network",
    category: "distribution",
    description: "A section for explaining distribution coverage, supply network, or route reach.",
    recommendedFor: ["Product Distribution", "Supplier", "Trading"],
    complexity: "business",
    motionSupport: true,
    sanityReady: false,
  },
  {
    id: "distribution-map",
    name: "Distribution Map",
    category: "distribution",
    description: "A map-led section for geographic reach and coverage areas.",
    recommendedFor: ["Distribution", "Logistics", "Regional supplier"],
    complexity: "premium",
    motionSupport: true,
    sanityReady: false,
  },
  {
    id: "partnership-cta",
    name: "Partnership CTA",
    category: "partnership",
    description: "A focused CTA section for partner, reseller, or business inquiry flows.",
    recommendedFor: ["Partnership page", "Distribution", "B2B"],
    complexity: "simple",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "partnership-benefits",
    name: "Partnership Benefits",
    category: "partnership",
    description: "A benefit-led section explaining why partners should work with the company.",
    recommendedFor: ["Partnership", "Supplier", "Channel business"],
    complexity: "business",
    motionSupport: true,
    sanityReady: false,
  },
  {
    id: "process-timeline",
    name: "Process Timeline",
    category: "process",
    description: "A timeline section for workflow, production, or project steps.",
    recommendedFor: ["Manufacturing", "Service workflow", "Project process"],
    complexity: "business",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "process-steps",
    name: "Process Steps",
    category: "process",
    description: "A simple numbered process section for clear operational explanation.",
    recommendedFor: ["Corporate Clean", "Product Distribution", "Service business"],
    complexity: "simple",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "process-cards",
    name: "Process Cards",
    category: "process",
    description: "A card-based process section for modular steps and business workflows.",
    recommendedFor: ["Business package", "Services", "Distribution"],
    complexity: "business",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "testimonial-slider",
    name: "Testimonial Slider",
    category: "testimonial",
    description: "A carousel-style testimonial section for social proof.",
    recommendedFor: ["Business package", "Premium", "Client proof"],
    complexity: "business",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "testimonial-grid",
    name: "Testimonial Grid",
    category: "testimonial",
    description: "A grid of testimonials for easy scanning and stronger trust density.",
    recommendedFor: ["Corporate Clean", "Service business", "Homepage"],
    complexity: "simple",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "case-study-grid",
    name: "Case Study Grid",
    category: "case-study",
    description: "A card grid for selected projects, proof points, and client outcomes.",
    recommendedFor: ["Technology Dark", "Portfolio", "Business proof"],
    complexity: "business",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "case-study-featured",
    name: "Case Study Featured",
    category: "case-study",
    description: "A featured proof section for one or two priority case studies.",
    recommendedFor: ["Premium", "Portfolio", "High-impact proof"],
    complexity: "premium",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "gallery-grid",
    name: "Gallery Grid",
    category: "gallery",
    description: "A clean visual grid for products, facilities, team, or project images.",
    recommendedFor: ["Manufacturing", "Product", "Editorial"],
    complexity: "simple",
    motionSupport: true,
    sanityReady: false,
  },
  {
    id: "gallery-masonry",
    name: "Gallery Masonry",
    category: "gallery",
    description: "An editorial masonry gallery for richer image-led pages.",
    recommendedFor: ["Luxury Editorial", "Photography", "Premium brand"],
    complexity: "premium",
    motionSupport: true,
    sanityReady: false,
  },
  {
    id: "statistics-counter",
    name: "Statistics Counter",
    category: "statistics",
    description: "A focused metrics section with large numbers and concise labels.",
    recommendedFor: ["Company proof", "Manufacturing", "Distribution"],
    complexity: "simple",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "statistics-cards",
    name: "Statistics Cards",
    category: "statistics",
    description: "Card-based metrics for business proof and operational scale.",
    recommendedFor: ["Business package", "Corporate Clean", "Manufacturing"],
    complexity: "business",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "contact-basic",
    name: "Contact Basic",
    category: "contact",
    description: "A simple contact section with phone, email, WhatsApp, and address.",
    recommendedFor: ["Starter", "Company profile", "Contact page"],
    complexity: "simple",
    motionSupport: false,
    sanityReady: true,
  },
  {
    id: "contact-premium",
    name: "Contact Premium",
    category: "contact",
    description: "A richer contact section with stronger layout, map, and CTA treatment.",
    recommendedFor: ["Business", "Premium", "Partnership page"],
    complexity: "business",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "cta-simple",
    name: "CTA Simple",
    category: "cta",
    description: "A compact conversion block for common page endings.",
    recommendedFor: ["Starter", "Contact CTA", "Service page"],
    complexity: "simple",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "cta-corporate",
    name: "CTA Corporate",
    category: "cta",
    description: "A professional CTA section for corporate and B2B inquiry flows.",
    recommendedFor: ["Corporate Clean", "Business", "Partnership"],
    complexity: "business",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "cta-full-width",
    name: "CTA Full Width",
    category: "cta",
    description: "A premium full-width CTA section for high-impact page closings.",
    recommendedFor: ["Premium", "Technology Dark", "Luxury Editorial"],
    complexity: "premium",
    motionSupport: true,
    sanityReady: true,
  },
  {
    id: "footer-simple",
    name: "Footer Simple",
    category: "footer",
    description: "A lightweight footer for simple company profile websites.",
    recommendedFor: ["Starter", "Store Lite", "Contact-driven websites"],
    complexity: "simple",
    motionSupport: false,
    sanityReady: true,
  },
  {
    id: "footer-corporate",
    name: "Footer Corporate",
    category: "footer",
    description: "A structured footer with brand, navigation, contact, and social links.",
    recommendedFor: ["Corporate Clean", "Business", "Product Distribution"],
    complexity: "business",
    motionSupport: false,
    sanityReady: true,
  },
  {
    id: "footer-editorial",
    name: "Footer Editorial",
    category: "footer",
    description: "A quieter editorial footer for premium content-led websites.",
    recommendedFor: ["Luxury Editorial", "Media", "Premium brand"],
    complexity: "business",
    motionSupport: false,
    sanityReady: true,
  },
];

export function getSectionById(
  id: SectionId,
): SectionDefinition | undefined {
  return SECTION_LIBRARY.find((section) => section.id === id);
}

export function getSectionsByCategory(
  category: SectionCategory,
): SectionDefinition[] {
  return SECTION_LIBRARY.filter((section) => section.category === category);
}
