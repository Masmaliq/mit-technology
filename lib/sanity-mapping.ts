import type { DesignPresetId } from "./design-presets";
import type { BlueprintId } from "./blueprints";
import type { PageId } from "./pages-manager";
import type { SectionId } from "./section-library";
import type { ContentFieldDefinition } from "./content-models";

export type FieldDefinition = ContentFieldDefinition;

export type SchemaDefinition = {
  schemaName: string;
  title: string;
  description: string;
  fields: FieldDefinition[];
};

export type SectionSchemaMapping = {
  sectionId: SectionId;
  schemaName: string;
};

export type PageDocumentMapping = {
  pageId: PageId | string;
  requiredDocuments: string[];
};

export type PresetSchemaMapping = {
  presetId: DesignPresetId;
  requiredSchemas: string[];
};

export type BlueprintSanityStructureMapping = {
  blueprintId: BlueprintId;
  structureGroups: {
    title: string;
    items: string[];
  }[];
};

export const SECTION_SCHEMA_MAP: SectionSchemaMapping[] = [
  {
    sectionId: "hero-corporate",
    schemaName: "heroSection",
  },
  {
    sectionId: "hero-product",
    schemaName: "heroSection",
  },
  {
    sectionId: "hero-manufacturing",
    schemaName: "heroSection",
  },
  {
    sectionId: "about-story",
    schemaName: "storySection",
  },
  {
    sectionId: "about-company",
    schemaName: "companySection",
  },
  {
    sectionId: "product-grid",
    schemaName: "productSection",
  },
  {
    sectionId: "product-categories",
    schemaName: "productCategorySection",
  },
  {
    sectionId: "distribution-map",
    schemaName: "distributionSection",
  },
  {
    sectionId: "testimonial-grid",
    schemaName: "testimonialSection",
  },
  {
    sectionId: "contact-basic",
    schemaName: "contactSection",
  },
  {
    sectionId: "footer-corporate",
    schemaName: "footerSection",
  },
];

export const SCHEMA_DEFINITIONS: SchemaDefinition[] = [
  {
    schemaName: "heroSection",
    title: "Hero Section",
    description: "Future schema for hero sections across corporate, product, and manufacturing layouts.",
    fields: [
      {
        id: "eyebrow",
        label: "Eyebrow",
        type: "text",
        required: false,
        description: "Small label above the hero title.",
      },
      {
        id: "title",
        label: "Title",
        type: "text",
        required: true,
        description: "Main hero headline.",
      },
      {
        id: "subtitle",
        label: "Subtitle",
        type: "textarea",
        required: false,
        description: "Short supporting hero description.",
      },
      {
        id: "backgroundImage",
        label: "Background Image",
        type: "image",
        required: false,
        description: "Hero background image.",
      },
      {
        id: "backgroundVideo",
        label: "Background Video",
        type: "video",
        required: false,
        description: "Optional hero background video.",
      },
      {
        id: "ctaLabel",
        label: "CTA Label",
        type: "text",
        required: false,
        description: "Primary CTA label.",
      },
      {
        id: "ctaUrl",
        label: "CTA URL",
        type: "url",
        required: false,
        description: "Primary CTA URL.",
      },
    ],
  },
  {
    schemaName: "storySection",
    title: "Story Section",
    description: "Future schema for editorial company story content.",
    fields: [
      {
        id: "title",
        label: "Title",
        type: "text",
        required: true,
        description: "Main story heading.",
      },
      {
        id: "body",
        label: "Body",
        type: "textarea",
        required: true,
        description: "Story body text.",
      },
      {
        id: "image",
        label: "Image",
        type: "image",
        required: false,
        description: "Optional story image.",
      },
    ],
  },
  {
    schemaName: "productSection",
    title: "Product Section",
    description: "Future schema for product grid or product showcase content.",
    fields: [
      {
        id: "productName",
        label: "Product Name",
        type: "text",
        required: true,
        description: "Product name.",
      },
      {
        id: "description",
        label: "Description",
        type: "textarea",
        required: false,
        description: "Product description.",
      },
      {
        id: "image",
        label: "Image",
        type: "image",
        required: false,
        description: "Product image.",
      },
    ],
  },
  {
    schemaName: "distributionSection",
    title: "Distribution Section",
    description: "Future schema for distribution coverage and partner mapping.",
    fields: [
      {
        id: "province",
        label: "Province",
        type: "text",
        required: true,
        description: "Province or region name.",
      },
      {
        id: "city",
        label: "City",
        type: "text",
        required: true,
        description: "City or distribution area.",
      },
      {
        id: "partnerName",
        label: "Partner Name",
        type: "text",
        required: false,
        description: "Distribution partner name.",
      },
      {
        id: "description",
        label: "Description",
        type: "textarea",
        required: false,
        description: "Short coverage or partner note.",
      },
    ],
  },
  {
    schemaName: "testimonialSection",
    title: "Testimonial Section",
    description: "Future schema for testimonial display sections.",
    fields: [
      {
        id: "clientName",
        label: "Client Name",
        type: "text",
        required: true,
        description: "Name of testimonial giver.",
      },
      {
        id: "quote",
        label: "Quote",
        type: "textarea",
        required: true,
        description: "Testimonial quote.",
      },
      {
        id: "avatar",
        label: "Avatar",
        type: "image",
        required: false,
        description: "Client image or logo.",
      },
    ],
  },
  {
    schemaName: "contactSection",
    title: "Contact Section",
    description: "Future schema for contact information sections.",
    fields: [
      {
        id: "email",
        label: "Email",
        type: "text",
        required: false,
        description: "Business email.",
      },
      {
        id: "phone",
        label: "Phone",
        type: "text",
        required: false,
        description: "Business phone.",
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        type: "text",
        required: false,
        description: "WhatsApp contact.",
      },
      {
        id: "address",
        label: "Address",
        type: "textarea",
        required: false,
        description: "Business address.",
      },
    ],
  },
  {
    schemaName: "footerSection",
    title: "Footer Section",
    description: "Future schema for footer brand, navigation, contact, and legal content.",
    fields: [
      {
        id: "brandName",
        label: "Brand Name",
        type: "text",
        required: true,
        description: "Footer brand name.",
      },
      {
        id: "description",
        label: "Description",
        type: "textarea",
        required: false,
        description: "Footer brand description.",
      },
      {
        id: "navigationLinks",
        label: "Navigation Links",
        type: "array",
        required: false,
        description: "Footer navigation links.",
      },
      {
        id: "copyrightText",
        label: "Copyright Text",
        type: "text",
        required: false,
        description: "Footer copyright.",
      },
    ],
  },
];

export const PAGE_DOCUMENT_MAP: PageDocumentMapping[] = [
  {
    pageId: "home",
    requiredDocuments: ["homepage", "heroSection", "ctaSection"],
  },
  {
    pageId: "about",
    requiredDocuments: ["about", "storySection", "companySection"],
  },
  {
    pageId: "products",
    requiredDocuments: ["productsPage", "productSection", "productCategorySection"],
  },
  {
    pageId: "distribution",
    requiredDocuments: ["distributionPage", "distributionSection"],
  },
  {
    pageId: "partnership",
    requiredDocuments: ["partnershipPage", "partnershipSection"],
  },
  {
    pageId: "contact",
    requiredDocuments: ["contact", "contactSection"],
  },
];

export const PRESET_SCHEMA_MAP: PresetSchemaMapping[] = [
  {
    presetId: "corporate-clean",
    requiredSchemas: [
      "heroSection",
      "storySection",
      "companySection",
      "serviceSection",
      "testimonialSection",
      "contactSection",
      "footerSection",
    ],
  },
  {
    presetId: "product-distribution",
    requiredSchemas: [
      "heroSection",
      "productSection",
      "productCategorySection",
      "distributionSection",
      "partnershipSection",
      "contactSection",
      "footerSection",
    ],
  },
  {
    presetId: "manufacturing-premium",
    requiredSchemas: [
      "heroSection",
      "companySection",
      "serviceSection",
      "productSection",
      "gallerySection",
      "contactSection",
      "footerSection",
    ],
  },
  {
    presetId: "technology-dark",
    requiredSchemas: [
      "heroSection",
      "serviceSection",
      "processSection",
      "caseStudySection",
      "ctaSection",
      "contactSection",
    ],
  },
  {
    presetId: "luxury-editorial",
    requiredSchemas: [
      "heroSection",
      "storySection",
      "gallerySection",
      "caseStudySection",
      "contactSection",
    ],
  },
  {
    presetId: "store-lite",
    requiredSchemas: [
      "heroSection",
      "productSection",
      "productCategorySection",
      "contactSection",
      "footerSection",
    ],
  },
];

export const BLUEPRINT_SANITY_STRUCTURE_MAP: BlueprintSanityStructureMapping[] = [
  {
    blueprintId: "product-distribution",
    structureGroups: [
      {
        title: "Halaman Website",
        items: ["Beranda", "Tentang Kami", "Produk", "Distribusi", "Kemitraan", "Kontak"],
      },
      {
        title: "Konten",
        items: ["Product Items", "Distribution Areas", "Testimonials", "Client Logos"],
      },
      {
        title: "Pengaturan Website",
        items: ["Site Settings", "Navbar", "Footer", "Contact", "SEO"],
      },
    ],
  },
  {
    blueprintId: "company-profile",
    structureGroups: [
      {
        title: "Halaman Website",
        items: ["Beranda", "Tentang Kami", "Layanan", "Kontak"],
      },
      {
        title: "Konten",
        items: ["Services", "Testimonials", "Client Logos"],
      },
      {
        title: "Pengaturan Website",
        items: ["Site Settings", "Navbar", "Footer", "Contact", "SEO"],
      },
    ],
  },
];

export function getSchemaForSection(
  sectionId: SectionId,
): SchemaDefinition | undefined {
  const mapping = SECTION_SCHEMA_MAP.find(
    (item) => item.sectionId === sectionId,
  );

  if (!mapping) {
    return undefined;
  }

  return SCHEMA_DEFINITIONS.find(
    (schema) => schema.schemaName === mapping.schemaName,
  );
}
