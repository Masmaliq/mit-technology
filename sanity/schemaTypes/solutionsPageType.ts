import { defineField, defineType } from "sanity";
import { seoFields } from "./objects/seoFields";
import { ServiceEditor } from "../components/ServiceEditor";

const hiddenLegacy = { hidden: true, readOnly: true };

export const solutionsPageType = defineType({
  name: "solutionsPage",
  title: "Services",
  type: "document",
  components: { input: ServiceEditor },
  fieldsets: [
    {
      name: "hero",
      title: "Hero Section",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "intro",
      title: "What We Do",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "cards",
      title: "Legacy Service Cards",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "coreServices",
      title: "Core Services",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "creativeProduction",
      title: "Creative Production",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "capabilities",
      title: "Capabilities",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "process",
      title: "Process",
      options: { collapsible: true, collapsed: true },
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
    defineField({ name: "serviceHeroMediaType", title: "Hero Media Type", type: "string", initialValue: "image", fieldset: "hero", options: { layout: "radio", list: [{ title: "Image", value: "image" }, { title: "Video", value: "video" }] } }),
    defineField({ name: "serviceHeroImage", title: "Hero Image", type: "image", fieldset: "hero", options: { hotspot: true }, hidden: ({ parent }) => parent?.serviceHeroMediaType === "video" }),
    defineField({ name: "serviceHeroVideo", title: "Hero Video", type: "file", fieldset: "hero", options: { accept: "video/mp4" }, hidden: ({ parent }) => parent?.serviceHeroMediaType !== "video" }),
    defineField({ name: "heroCount", title: "Hero Count", type: "string", fieldset: "hero" }),
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
      name: "whatWeDo",
      title: "What We Do",
      type: "pageSectionIntro",
      fieldset: "intro",
    }),
    defineField({
      name: "coreServicesIntro",
      title: "Core Services Introduction",
      type: "pageSectionIntro",
      fieldset: "coreServices",
    }),
    defineField({
      name: "selectedServices",
      title: "Selected Services",
      description: "Ordered references to canonical Services.",
      type: "array",
      fieldset: "coreServices",
      of: [{ type: "reference", to: [{ type: "solution" }], options: { disableNew: true } }],
    }),
    defineField({ name: "creativeProductionIntro", title: "Creative Production Introduction", type: "pageSectionIntro", fieldset: "creativeProduction" }),
    defineField({ name: "creativeShowreels", title: "Showreel Entries", description: "Video ini khusus Creative Production dan terpisah dari Hero Video.", type: "array", fieldset: "creativeProduction", of: [{ type: "object", fields: [defineField({ name: "title", title: "Title", type: "string" }), defineField({ name: "category", title: "Category", type: "string" }), defineField({ name: "caption", title: "Caption", type: "string" }), defineField({ name: "video", title: "Showreel Video", type: "file", options: { accept: "video/mp4" } }), defineField({ name: "image", title: "Preview Image", type: "image", options: { hotspot: true } })], preview: { select: { title: "title", subtitle: "category", media: "image" } } }] }),
    defineField({ name: "creativeProductionMedia", title: "Showreel Media", type: "sharedHeroMedia", fieldset: "creativeProduction" }),
    defineField({ name: "creativeProductionSupportingContent", title: "Supporting Content", type: "array", fieldset: "creativeProduction", of: [{ type: "pagePresentationItem" }] }),
    defineField({ name: "capabilitiesIntro", title: "Capabilities Introduction", type: "pageSectionIntro", fieldset: "capabilities" }),
    defineField({
      name: "capabilityGroups",
      title: "Capability Groups",
      description: "Recommended groups: Strategy, Experience Design, Technology, and Creative.",
      type: "array",
      fieldset: "capabilities",
      options: { sortable: true, modal: { type: "popover", width: 1 } },
      of: [{ type: "pageCapabilityGroup" }],
    }),
    defineField({ name: "processIntro", title: "Process Introduction", type: "pageSectionIntro", fieldset: "process" }),
    defineField({
      name: "selectedProcess",
      title: "Selected Process Steps",
      type: "array",
      fieldset: "process",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "process", title: "Process Step", type: "reference", to: [{ type: "process" }] }),
          defineField({ name: "displayDescription", title: "Description Override", type: "text", rows: 2 }),
        ],
        preview: { select: { title: "process.title", subtitle: "displayDescription" } },
      }],
    }),
    defineField({ name: "finalCta", title: "Final CTA", type: "pageCtaSection", fieldset: "cta" }),
    defineField({ name: "seo", title: "SEO", type: "sharedSeo", fieldset: "seo" }),
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
        title: title || "Services",
        subtitle: subtitle || "Services page architecture and presentation",
      };
    },
  },
});
