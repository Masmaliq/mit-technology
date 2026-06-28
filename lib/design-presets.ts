export type PackageFit = "starter" | "business" | "premium";

export type MotionLevel = "minimal" | "balanced" | "cinematic";

export type DesignPresetId =
  | "corporate-clean"
  | "product-distribution"
  | "manufacturing-premium"
  | "technology-dark"
  | "luxury-editorial"
  | "store-lite";

export type DesignPreset = {
  id: DesignPresetId;
  name: string;
  description: string;
  suitableFor: string[];
  colorDirection: string;
  typographyDirection: string;
  navbarStyle: string;
  heroStyle: string;
  motionLevel: MotionLevel;
  recommendedSections: string[];
  packageFit: PackageFit[];
};

export const DESIGN_PRESETS: DesignPreset[] = [
  {
    id: "corporate-clean",
    name: "Corporate Clean",
    description:
      "A clean, trustworthy company profile direction for service businesses that need clear structure and professional presence.",
    suitableFor: [
      "Company profile umum",
      "Consulting",
      "Holding",
      "Service business",
    ],
    colorDirection: "White, soft gray, navy or blue accent, clean spacing.",
    typographyDirection:
      "Modern sans-serif, clear hierarchy, medium heading weight, easy body reading.",
    navbarStyle: "Classic Corporate",
    heroStyle: "Hero Corporate",
    motionLevel: "minimal",
    recommendedSections: [
      "Hero Corporate",
      "About Summary",
      "Services Grid",
      "Process",
      "Testimonials",
      "Contact CTA",
    ],
    packageFit: ["starter", "business", "premium"],
  },
  {
    id: "product-distribution",
    name: "Product Distribution",
    description:
      "A product-forward direction for distribution, supplier, trading, and FMCG businesses where trust and supply network matter.",
    suitableFor: ["Pangan", "Distribusi", "Supplier", "FMCG", "Trading"],
    colorDirection: "White, dark green, cream, soft gold.",
    typographyDirection:
      "Practical sans-serif, strong section labels, readable product and network content.",
    navbarStyle: "Classic Corporate",
    heroStyle: "Product Hero",
    motionLevel: "balanced",
    recommendedSections: [
      "Product Hero",
      "Product Categories",
      "Distribution Network",
      "Partnership CTA",
      "Contact",
    ],
    packageFit: ["starter", "business", "premium"],
  },
  {
    id: "manufacturing-premium",
    name: "Manufacturing Premium",
    description:
      "A polished industrial direction for factories, OEM, ODM, private label, and production-heavy companies.",
    suitableFor: ["Pabrik", "OEM", "ODM", "Private label", "Industrial"],
    colorDirection: "White, dark slate, industrial gray, accent green or blue.",
    typographyDirection:
      "Confident sans-serif, compact technical labels, strong capability headings.",
    navbarStyle: "Classic Corporate",
    heroStyle: "Factory Hero",
    motionLevel: "balanced",
    recommendedSections: [
      "Factory Hero",
      "Capability",
      "Services / OEM ODM",
      "Product Categories",
      "Factory Gallery",
      "Contact",
    ],
    packageFit: ["business", "premium"],
  },
  {
    id: "technology-dark",
    name: "Technology Dark",
    description:
      "A cinematic dark direction for technology, AI, software, automation, and internal system providers.",
    suitableFor: [
      "Technology company",
      "AI",
      "Software",
      "Internal system",
    ],
    colorDirection: "Dark navy, blue glow, white text, cinematic contrast.",
    typographyDirection:
      "Modern technical sans-serif, high contrast headings, concise body copy.",
    navbarStyle: "Transparent",
    heroStyle: "Tech Hero",
    motionLevel: "cinematic",
    recommendedSections: [
      "Tech Hero",
      "Solutions",
      "Case Studies",
      "Process",
      "Packages",
      "CTA",
    ],
    packageFit: ["business", "premium"],
  },
  {
    id: "luxury-editorial",
    name: "Luxury Editorial",
    description:
      "A quiet editorial direction for media, journal, photography, and premium storytelling websites.",
    suitableFor: [
      "Media",
      "Journal",
      "Photography",
      "Premium storytelling",
    ],
    colorDirection: "Off white, black, warm neutral, restrained contrast.",
    typographyDirection:
      "Editorial spacing, optional serif direction, lighter cards, stronger reading rhythm.",
    navbarStyle: "Minimal",
    heroStyle: "Editorial Hero",
    motionLevel: "minimal",
    recommendedSections: [
      "Editorial Hero",
      "Featured Story",
      "Category Grid",
      "Video / Photography",
      "Newsletter / Contact",
    ],
    packageFit: ["business", "premium"],
  },
  {
    id: "store-lite",
    name: "Store Lite",
    description:
      "A lightweight commerce direction for product catalogs, simple stores, and WhatsApp-based inquiries.",
    suitableFor: [
      "Toko sederhana",
      "Katalog produk",
      "Marketplace ringan",
    ],
    colorDirection: "Clean commerce surface, product-card friendly, clear CTA colors.",
    typographyDirection:
      "Readable product labels, compact card text, direct CTA hierarchy.",
    navbarStyle: "Commerce",
    heroStyle: "Commerce Hero",
    motionLevel: "balanced",
    recommendedSections: [
      "Commerce Hero",
      "Product Categories",
      "Featured Products",
      "Supplier CTA",
      "Contact / WhatsApp",
    ],
    packageFit: ["starter", "business", "premium"],
  },
];

export function getDesignPresetById(
  id: DesignPresetId,
): DesignPreset | undefined {
  return DESIGN_PRESETS.find((preset) => preset.id === id);
}
