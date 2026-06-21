import { defineField, defineType } from "sanity";

const imageAltField = defineField({
  name: "alt",
  title: "Alternative Text",
  type: "string",
});

export const caseStudiesPageSettingsType = defineType({
  name: "caseStudiesPageSettings",
  title: "Case Studies Page Settings",
  type: "document",
  fields: [
    defineField({
      name: "pageEyebrow",
      title: "Case Studies Page Eyebrow",
      type: "string",
    }),
    defineField({
      name: "pageTitle",
      title: "Case Studies Page Title",
      type: "string",
    }),
    defineField({
      name: "pageDescription",
      title: "Case Studies Page Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroBackgroundImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      fields: [imageAltField],
    }),
    defineField({
      name: "heroBackgroundVideo",
      title: "Hero Background Video MP4",
      type: "file",
      options: { accept: "video/mp4" },
    }),
    defineField({
      name: "heroOverlayOpacity",
      title: "Hero Overlay Opacity",
      description: "Use values from 0 to 100.",
      type: "number",
      validation: (rule) => rule.min(0).max(100),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "seoImage",
      title: "SEO Image",
      type: "image",
      options: { hotspot: true },
      fields: [imageAltField],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Case Studies Page Settings",
        subtitle: "Hero, media, overlay, and SEO",
      };
    },
  },
});
