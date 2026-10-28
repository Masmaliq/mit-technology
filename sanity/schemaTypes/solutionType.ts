import { defineField, defineType } from "sanity";
import { visualSettingsField } from "./objects/visualFields";

const imageAltField = defineField({ name: "alt", title: "Alternative Text", type: "string" });

export const solutionType = defineType({
  name: "solution",
  title: "Service",
  type: "document",
  groups: [
    { name: "basic", title: "Basic", default: true },
    { name: "media", title: "Media" },
    { name: "seo", title: "SEO" },
    { name: "compatibility", title: "Detail Page / Compatibility" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "basic", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "shortDescription", title: "Short Description", type: "text", rows: 3, group: "basic" }),
    defineField({ name: "capabilities", title: "Capabilities / Tags", type: "array", group: "basic", of: [{ type: "string" }] }),
    defineField({ name: "exploreLabel", title: "Explore Label", type: "string", group: "basic" }),
    defineField({ name: "exploreLink", title: "Explore Link", type: "string", group: "basic" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false, group: "basic" }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: true, group: "basic" }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0, group: "basic" }),

    defineField({ name: "thumbnail", title: "Thumbnail", type: "image", group: "media", options: { hotspot: true }, fields: [imageAltField] }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", group: "media", options: { hotspot: true }, fields: [imageAltField] }),
    defineField({ name: "videoMp4", title: "Video MP4", type: "file", group: "media", options: { accept: "video/mp4" } }),
    defineField({ name: "videoPosterImage", title: "Video Poster", type: "image", group: "media", options: { hotspot: true }, fields: [imageAltField] }),

    defineField({ name: "seoTitle", title: "SEO Title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "Meta Description", type: "text", rows: 3, group: "seo" }),
    defineField({ name: "seoImage", title: "Open Graph Image", type: "image", group: "seo", options: { hotspot: true }, fields: [imageAltField] }),
    defineField({ name: "seoKeywords", title: "SEO Keywords", type: "array", group: "seo", of: [{ type: "string" }] }),

    defineField({ name: "fullDescription", title: "Full Description", type: "text", rows: 8, group: "compatibility" }),
    defineField({ name: "icon", title: "Icon", type: "string", group: "compatibility", description: "Legacy icon name used by existing presentations." }),
    defineField({ name: "features", title: "Features", type: "array", group: "compatibility", of: [{ type: "string" }] }),
    defineField({ name: "benefits", title: "Benefits", type: "array", group: "compatibility", of: [{ type: "string" }] }),
    defineField({
      name: "process",
      title: "Process",
      type: "array",
      group: "compatibility",
      of: [{ type: "object", fields: [defineField({ name: "title", title: "Title", type: "string" }), defineField({ name: "description", title: "Description", type: "text" })] }],
    }),
    defineField({ name: "ctaTitle", title: "CTA Title", type: "string", group: "compatibility" }),
    defineField({ name: "ctaDescription", title: "CTA Description", type: "text", group: "compatibility" }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string", group: "compatibility" }),
    defineField({ name: "ctaHref", title: "CTA Link", type: "string", group: "compatibility" }),
    { ...visualSettingsField, group: "compatibility" },
    defineField({
      name: "seo",
      title: "Phase C Shared SEO (Compatibility)",
      description: "Preserved for compatibility. Use the SEO tab for current editing.",
      type: "sharedSeo",
      group: "compatibility",
      readOnly: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "shortDescription", media: "thumbnail" },
  },
});
