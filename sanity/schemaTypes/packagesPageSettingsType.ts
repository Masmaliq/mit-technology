import { defineField, defineType } from "sanity";

const imageAltField = defineField({
  name: "alt",
  title: "Alternative Text",
  type: "string",
});

export const packagesPageSettingsType = defineType({
  name: "packagesPageSettings",
  title: "Packages Page Settings",
  type: "document",
  fields: [
    defineField({
      name: "pageEyebrow",
      title: "Packages Page Eyebrow",
      type: "string",
    }),
    defineField({
      name: "pageTitle",
      title: "Packages Page Title",
      type: "string",
    }),
    defineField({
      name: "pageDescription",
      title: "Packages Page Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "packagesSectionEyebrow",
      title: "Packages Section Eyebrow",
      type: "string",
    }),
    defineField({
      name: "packagesSectionTitle",
      title: "Packages Section Title",
      type: "string",
    }),
    defineField({
      name: "packagesSectionDescription",
      title: "Packages Section Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "packagesSectionCtaLabel",
      title: "Packages Section CTA Label",
      type: "string",
    }),
    defineField({
      name: "packagesSectionCtaUrl",
      title: "Packages Section CTA URL",
      type: "string",
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
        title: "Packages Page Settings",
        subtitle: "Hero, packages section, media, overlay, and SEO",
      };
    },
  },
});
