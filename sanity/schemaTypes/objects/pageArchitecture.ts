import { defineField, defineType } from "sanity";

export const pageSectionIntroType = defineType({
  name: "pageSectionIntro",
  title: "Section Introduction",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
  ],
});

export const pagePresentationItemType = defineType({
  name: "pagePresentationItem",
  title: "Presentation Item",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alternative Text", type: "string" })],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "label", media: "image" },
    prepare({ title, subtitle, media }) {
      return { title: title || "Presentation item", subtitle, media };
    },
  },
});

export const pageCapabilityGroupType = defineType({
  name: "pageCapabilityGroup",
  title: "Capability Group",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Group Title", type: "string" }),
    defineField({ name: "items", title: "Capabilities", type: "array", of: [{ type: "string" }] }),
  ],
  preview: {
    select: { title: "title", items: "items" },
    prepare({ title, items }) {
      return { title: title || "Capability group", subtitle: `${items?.length || 0} capabilities` };
    },
  },
});

export const pageFaqType = defineType({
  name: "pageFaq",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({ name: "question", title: "Question", type: "string" }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4 }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "question", subtitle: "answer" },
  },
});

export const pageCtaSectionType = defineType({
  name: "pageCtaSection",
  title: "Final CTA",
  type: "object",
  fields: [
    defineField({
      name: "globalCta",
      title: "Global CTA",
      description: "Use the shared site-wide CTA when this page does not need unique copy.",
      type: "reference",
      to: [{ type: "globalCta" }],
    }),
    defineField({ name: "eyebrow", title: "Override Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Override Title", type: "string" }),
    defineField({ name: "description", title: "Override Description", type: "text", rows: 3 }),
    defineField({ name: "primaryAction", title: "Override Primary Action", type: "sharedCta" }),
  ],
});
