import { defineField, defineType } from "sanity";

const imageAltField = defineField({ name: "alt", title: "Alternative Text", type: "string" });

export const packageType = defineType({
  name: "package",
  title: "Pricing",
  type: "document",
  groups: [
    { name: "basic", title: "Basic", default: true },
    { name: "pricing", title: "Pricing" },
    { name: "details", title: "Package Details" },
    { name: "status", title: "Status" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Package Name", type: "string", group: "basic", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "basic", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({
      name: "packageType",
      title: "Package Type",
      type: "string",
      group: "basic",
      options: {
        list: [
          { title: "Standard", value: "standard" },
          { title: "Premium", value: "premium" },
          { title: "WordPress", value: "wordpress" },
        ],
        layout: "radio",
      },
    }),

    defineField({ name: "price", title: "Price", type: "number", group: "pricing", validation: (rule) => rule.min(0) }),
    defineField({ name: "priceDisplay", title: "Price Display", description: "Human-readable label such as Rp1,5 jt or Rp15 jt+.", type: "string", group: "pricing" }),
    defineField({
      name: "priceQualifier",
      title: "Price Qualifier",
      type: "string",
      group: "pricing",
      options: {
        list: [
          { title: "Fixed", value: "fixed" },
          { title: "Starting From", value: "startingFrom" },
          { title: "Bespoke", value: "bespoke" },
        ],
      },
    }),
    defineField({ name: "priceNote", title: "Price Note", type: "string", group: "pricing" }),
    defineField({ name: "startingPrice", title: "Legacy Starting Price", description: "Formatted price used by the current frontend. Preserve until query migration.", type: "string", group: "pricing" }),

    defineField({ name: "pageCount", title: "Number of Pages", type: "number", group: "details", validation: (rule) => rule.min(1) }),
    defineField({ name: "maximumSections", title: "Maximum Sections", type: "number", group: "details", validation: (rule) => rule.min(1) }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3, group: "details" }),
    defineField({ name: "suitableFor", title: "Suitable For", type: "text", rows: 2, group: "details" }),
    defineField({ name: "features", title: "Features", type: "array", group: "details", of: [{ type: "string" }] }),

    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false, group: "status" }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: true, group: "status" }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0, group: "status" }),

    defineField({ name: "seoTitle", title: "SEO Title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "Meta Description", type: "text", rows: 3, group: "seo" }),
    defineField({ name: "seoImage", title: "Open Graph Image", type: "image", group: "seo", options: { hotspot: true }, fields: [imageAltField] }),
    defineField({ name: "seoKeywords", title: "SEO Keywords", type: "array", group: "seo", of: [{ type: "string" }] }),
  ],
  preview: {
    select: { title: "title", priceDisplay: "priceDisplay", startingPrice: "startingPrice", packageType: "packageType" },
    prepare({ title, priceDisplay, startingPrice, packageType }) {
      return { title: title || "Untitled Package", subtitle: [packageType, priceDisplay || startingPrice].filter(Boolean).join(" · ") };
    },
  },
});
