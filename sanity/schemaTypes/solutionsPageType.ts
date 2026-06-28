import { defineField, defineType } from "sanity";
import { seoFields } from "./objects/seoFields";

const hiddenLegacy = { hidden: true, readOnly: true };

export const solutionsPageType = defineType({
  name: "solutionsPage",
  title: "Produk",
  type: "document",
  fieldsets: [
    {
      name: "hero",
      title: "Hero Produk",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "intro",
      title: "Product Intro / Pengantar Produk",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "cards",
      title: "Product Items / Daftar Produk",
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
      name: "pageNumber",
      title: "Nomor Halaman",
      type: "string",
      description: "Contoh: 03.",
    }),
    defineField({
      name: "pageDisplayName",
      title: "Nama Halaman",
      type: "string",
      description: "Nama halaman yang tampil untuk editor. Contoh: Produk.",
    }),
    defineField({
      name: "menuLabel",
      title: "Label Menu",
      type: "string",
      description: "Teks yang tampil di menu navbar. Contoh: Produk.",
    }),
    defineField({
      name: "slug",
      title: "Slug / URL",
      type: "slug",
      options: { source: "pageDisplayName" },
      description: "Route frontend sementara tetap /solutions, tetapi nama tampil bisa Produk.",
    }),
    defineField({
      name: "adminDescription",
      title: "Short Description / Catatan Admin",
      type: "text",
      rows: 2,
      description: "Catatan singkat tentang fungsi halaman Produk.",
    }),
    defineField({
      name: "showInClientPages",
      title: "Show in Pages Dashboard",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showInNavbar",
      title: "Show in Navbar",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showInFooter",
      title: "Show in Footer",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 30,
    }),
    defineField({
      name: "heroContent",
      title: "Hero Content / Konten Pembuka Produk",
      type: "pageHeroContent",
      fieldset: "hero",
    }),
    defineField({
      name: "heroMedia",
      title: "Hero Image / Video",
      type: "pageHeroMedia",
      fieldset: "hero",
    }),
    defineField({
      name: "sectionBuilder",
      title: "Product Intro Builder",
      type: "pageSectionBuilder",
      fieldset: "intro",
    }),
    defineField({
      name: "seoBuilder",
      title: "SEO Produk",
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
      title: "Hero Title / Judul Produk",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description / Deskripsi Produk",
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
      title: "Product Intro Title",
      type: "string",
      fieldset: "intro",
    }),
    defineField({
      name: "sectionDescription",
      title: "Product Intro Description",
      type: "text",
      rows: 3,
      fieldset: "intro",
    }),
    defineField({
      name: "solutionCards",
      title: "Product Items",
      type: "array",
      fieldset: "cards",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Product Name", type: "string" }),
            defineField({ name: "description", title: "Product Description", type: "text", rows: 3 }),
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
              title: "Product Image",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
            }),
            defineField({ name: "link", title: "Link", type: "string" }),
            defineField({ name: "linkLabel", title: "Button Label", type: "string" }),
            defineField({ name: "linkUrl", title: "Button URL", type: "string" }),
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
      displayTitle: "pageDisplayName",
      title: "heroTitle",
      subtitle: "sectionTitle",
    },
    prepare({ displayTitle, title, subtitle }) {
      return {
        title: displayTitle || title || "Produk",
        subtitle: subtitle || "Konten halaman Produk (/solutions)",
      };
    },
  },
});
