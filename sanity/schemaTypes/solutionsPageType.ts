import { defineField, defineType } from "sanity";
import { seoFields } from "./objects/seoFields";

const hiddenLegacy = { hidden: true, readOnly: true };

export const solutionsPageType = defineType({
  name: "solutionsPage",
  title: "Solutions",
  type: "document",
  fieldsets: [
    {
      name: "hero",
      title: "Hero Section",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "intro",
      title: "What We Do Best Section",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "cards",
      title: "Solution Cards / Blocks",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "cta",
      title: "Final CTA",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "seo",
      title: "SEO",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "legacy",
      title: "Legacy Data",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: "heroContent",
      title: "Hero Content",
      type: "pageHeroContent",
      fieldset: "hero",
    }),
    defineField({
      name: "heroMedia",
      title: "Hero Media",
      type: "pageHeroMedia",
      fieldset: "hero",
    }),
    defineField({
      name: "sectionBuilder",
      title: "Section Builder",
      type: "pageSectionBuilder",
      fieldset: "intro",
    }),
    defineField({
      name: "seoBuilder",
      title: "SEO Builder",
      type: "pageSeoBuilder",
      fieldset: "seo",
    }),
    defineField({
      name: "heroEyebrow",
      title: "Legacy Hero Eyebrow",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 3,
      fieldset: "hero",
    }),
    defineField({
      name: "sectionEyebrow",
      title: "Section Eyebrow",
      type: "string",
      fieldset: "intro",
    }),
    defineField({
      name: "sectionTitle",
      title: "Section Title",
      type: "string",
      fieldset: "intro",
    }),
    defineField({
      name: "sectionDescription",
      title: "Section Description",
      type: "text",
      rows: 3,
      fieldset: "intro",
    }),
    defineField({
      name: "solutionCards",
      title: "Solution Cards",
      type: "array",
      fieldset: "cards",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Website", value: "website" },
                  { title: "Application", value: "application" },
                  { title: "AI", value: "ai" },
                  { title: "Strategy", value: "strategy" },
                ],
              },
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
            }),
            defineField({ name: "link", title: "Link", type: "string" }),
            defineField({ name: "linkLabel", title: "Link Label", type: "string" }),
            defineField({ name: "linkUrl", title: "Link URL", type: "string" }),
            defineField({ name: "order", title: "Order", type: "number" }),
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "description", media: "image" },
          },
        },
      ],
    }),
    defineField({
      name: "ctaEyebrow",
      title: "CTA Eyebrow",
      type: "string",
      fieldset: "cta",
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA Title",
      type: "string",
      fieldset: "cta",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA Description",
      type: "text",
      rows: 3,
      fieldset: "cta",
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "CTA Button Label",
      type: "string",
      fieldset: "cta",
    }),
    defineField({
      name: "ctaButtonUrl",
      title: "CTA Button URL",
      type: "string",
      fieldset: "cta",
    }),
    defineField({ name: "introEyebrow", title: "Legacy Intro Eyebrow", type: "string", fieldset: "legacy", ...hiddenLegacy }),
    defineField({ name: "introTitle", title: "Legacy Intro Title", type: "string", fieldset: "legacy", ...hiddenLegacy }),
    defineField({ name: "introDescription", title: "Legacy Intro Description", type: "text", fieldset: "legacy", ...hiddenLegacy }),
    defineField({ name: "introCtaLabel", title: "Legacy Intro CTA Label", type: "string", fieldset: "legacy", ...hiddenLegacy }),
    defineField({ name: "introCtaHref", title: "Legacy Intro CTA Link", type: "string", fieldset: "legacy", ...hiddenLegacy }),
    ...seoFields.map((field) => ({ ...field, fieldset: "seo" })),
  ],
  preview: {
    select: {
      title: "heroTitle",
      subtitle: "sectionTitle",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Solutions Page",
        subtitle: subtitle || "Editable copy for the /solutions page",
      };
    },
  },
});
