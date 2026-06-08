import { defineField } from "sanity";

export const seoFields = [
  defineField({
    name: "seoTitle",
    title: "SEO Title",
    type: "string",
  }),
  defineField({
    name: "seoDescription",
    title: "SEO Description",
    type: "text",
  }),
  defineField({
    name: "seoImage",
    title: "SEO Image",
    type: "image",
    options: { hotspot: true },
  }),
  defineField({
    name: "seoKeywords",
    title: "SEO Keywords",
    type: "array",
    of: [{ type: "string" }],
  }),
];
