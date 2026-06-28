import type { SectionId } from "./section-library";

export type ContentFieldType =
  | "text"
  | "textarea"
  | "image"
  | "video"
  | "url"
  | "number"
  | "boolean"
  | "array";

export interface ContentFieldDefinition {
  id: string;
  label: string;
  type: ContentFieldType;
  required: boolean;
  description: string;
}

export interface ContentModelDefinition {
  id: SectionId;
  name: string;
  description: string;
  fields: ContentFieldDefinition[];
}

export const CONTENT_MODELS: ContentModelDefinition[] = [
  {
    id: "hero-corporate",
    name: "Hero Corporate",
    description: "Content model for a clean corporate homepage or inner page hero.",
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
        description: "Short supporting description below the hero title.",
      },
      {
        id: "backgroundImage",
        label: "Background Image",
        type: "image",
        required: false,
        description: "Optional hero background or visual image.",
      },
      {
        id: "ctaLabel",
        label: "CTA Label",
        type: "text",
        required: false,
        description: "Primary call-to-action button label.",
      },
      {
        id: "ctaUrl",
        label: "CTA URL",
        type: "url",
        required: false,
        description: "Primary call-to-action button URL.",
      },
    ],
  },
  {
    id: "hero-product",
    name: "Hero Product",
    description: "Content model for product-led distribution and catalog heroes.",
    fields: [
      {
        id: "title",
        label: "Title",
        type: "text",
        required: true,
        description: "Product or business headline.",
      },
      {
        id: "subtitle",
        label: "Subtitle",
        type: "textarea",
        required: false,
        description: "Short explanation of the product, category, or business promise.",
      },
      {
        id: "backgroundImage",
        label: "Background Image",
        type: "image",
        required: false,
        description: "Product, warehouse, distribution, or brand image.",
      },
      {
        id: "ctaLabel",
        label: "CTA Label",
        type: "text",
        required: false,
        description: "Primary CTA label for product inquiry or contact.",
      },
      {
        id: "ctaUrl",
        label: "CTA URL",
        type: "url",
        required: false,
        description: "Primary CTA destination.",
      },
    ],
  },
  {
    id: "hero-manufacturing",
    name: "Hero Manufacturing",
    description: "Content model for factory, OEM, ODM, and industrial heroes.",
    fields: [
      {
        id: "eyebrow",
        label: "Eyebrow",
        type: "text",
        required: false,
        description: "Small manufacturing or capability label.",
      },
      {
        id: "title",
        label: "Title",
        type: "text",
        required: true,
        description: "Main manufacturing capability headline.",
      },
      {
        id: "subtitle",
        label: "Subtitle",
        type: "textarea",
        required: false,
        description: "Short supporting description for factory capability.",
      },
      {
        id: "backgroundVideo",
        label: "Background Video",
        type: "video",
        required: false,
        description: "Optional factory or process video.",
      },
      {
        id: "backgroundImage",
        label: "Background Image",
        type: "image",
        required: false,
        description: "Fallback factory or facility image.",
      },
      {
        id: "ctaLabel",
        label: "CTA Label",
        type: "text",
        required: false,
        description: "Primary CTA label for inquiry.",
      },
      {
        id: "ctaUrl",
        label: "CTA URL",
        type: "url",
        required: false,
        description: "Primary CTA destination.",
      },
    ],
  },
  {
    id: "about-story",
    name: "About Story",
    description: "Content model for editorial company story sections.",
    fields: [
      {
        id: "eyebrow",
        label: "Eyebrow",
        type: "text",
        required: false,
        description: "Small section label.",
      },
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
        description: "Company story or narrative text.",
      },
      {
        id: "image",
        label: "Image",
        type: "image",
        required: false,
        description: "Optional supporting image.",
      },
    ],
  },
  {
    id: "about-company",
    name: "About Company",
    description: "Content model for concise company identity sections.",
    fields: [
      {
        id: "companyName",
        label: "Company Name",
        type: "text",
        required: true,
        description: "Official company or brand name.",
      },
      {
        id: "description",
        label: "Description",
        type: "textarea",
        required: true,
        description: "Short company profile description.",
      },
      {
        id: "foundedYear",
        label: "Founded Year",
        type: "number",
        required: false,
        description: "Optional founding year.",
      },
      {
        id: "image",
        label: "Image",
        type: "image",
        required: false,
        description: "Company, team, facility, or brand image.",
      },
    ],
  },
  {
    id: "product-grid",
    name: "Product Grid",
    description: "Content model for product listing cards.",
    fields: [
      {
        id: "productName",
        label: "Product Name",
        type: "text",
        required: true,
        description: "Name of the product shown in the grid.",
      },
      {
        id: "description",
        label: "Description",
        type: "textarea",
        required: false,
        description: "Short product description.",
      },
      {
        id: "image",
        label: "Image",
        type: "image",
        required: false,
        description: "Product image.",
      },
      {
        id: "ctaUrl",
        label: "CTA URL",
        type: "url",
        required: false,
        description: "Optional detail or inquiry link.",
      },
    ],
  },
  {
    id: "product-categories",
    name: "Product Categories",
    description: "Content model for grouping products by category.",
    fields: [
      {
        id: "categoryName",
        label: "Category Name",
        type: "text",
        required: true,
        description: "Name of the product category.",
      },
      {
        id: "description",
        label: "Description",
        type: "textarea",
        required: false,
        description: "Short category description.",
      },
      {
        id: "image",
        label: "Image",
        type: "image",
        required: false,
        description: "Category image.",
      },
      {
        id: "products",
        label: "Products",
        type: "array",
        required: false,
        description: "List of products inside this category.",
      },
    ],
  },
  {
    id: "distribution-map",
    name: "Distribution Map",
    description: "Content model for distribution coverage and partner locations.",
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
        description: "Distribution partner or branch name.",
      },
      {
        id: "description",
        label: "Description",
        type: "textarea",
        required: false,
        description: "Short note about coverage, partner role, or availability.",
      },
    ],
  },
  {
    id: "testimonial-grid",
    name: "Testimonial Grid",
    description: "Content model for testimonial cards.",
    fields: [
      {
        id: "clientName",
        label: "Client Name",
        type: "text",
        required: true,
        description: "Name of the testimonial giver.",
      },
      {
        id: "clientRole",
        label: "Client Role",
        type: "text",
        required: false,
        description: "Role, company, or relationship context.",
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
        description: "Optional client photo or logo.",
      },
      {
        id: "rating",
        label: "Rating",
        type: "number",
        required: false,
        description: "Optional rating value.",
      },
    ],
  },
  {
    id: "contact-basic",
    name: "Contact Basic",
    description: "Content model for basic contact sections.",
    fields: [
      {
        id: "email",
        label: "Email",
        type: "text",
        required: false,
        description: "Business email address.",
      },
      {
        id: "phone",
        label: "Phone",
        type: "text",
        required: false,
        description: "Business phone number.",
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        type: "text",
        required: false,
        description: "WhatsApp contact number.",
      },
      {
        id: "address",
        label: "Address",
        type: "textarea",
        required: false,
        description: "Business address.",
      },
      {
        id: "mapUrl",
        label: "Map URL",
        type: "url",
        required: false,
        description: "Optional map link.",
      },
    ],
  },
  {
    id: "footer-corporate",
    name: "Footer Corporate",
    description: "Content model for structured corporate footers.",
    fields: [
      {
        id: "brandName",
        label: "Brand Name",
        type: "text",
        required: true,
        description: "Brand or company name shown in footer.",
      },
      {
        id: "description",
        label: "Description",
        type: "textarea",
        required: false,
        description: "Short footer brand description.",
      },
      {
        id: "navigationLinks",
        label: "Navigation Links",
        type: "array",
        required: false,
        description: "Footer navigation links.",
      },
      {
        id: "socialLinks",
        label: "Social Links",
        type: "array",
        required: false,
        description: "Social or external links.",
      },
      {
        id: "copyrightText",
        label: "Copyright Text",
        type: "text",
        required: false,
        description: "Footer copyright text.",
      },
    ],
  },
];

export function getContentModel(
  id: SectionId,
): ContentModelDefinition | undefined {
  return CONTENT_MODELS.find((model) => model.id === id);
}
