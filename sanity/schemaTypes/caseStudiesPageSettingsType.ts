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
      name: "pageNumber",
      title: "Nomor Halaman",
      type: "string",
      description: "Nomor halaman jika ingin dimunculkan di dashboard klien.",
    }),
    defineField({
      name: "pageDisplayName",
      title: "Nama Halaman",
      type: "string",
      description: "Nama halaman untuk editor. Untuk klien ini bisa dibiarkan opsional.",
    }),
    defineField({
      name: "menuLabel",
      title: "Label Menu",
      type: "string",
      description: "Teks menu jika halaman ini ingin ditampilkan.",
    }),
    defineField({
      name: "slug",
      title: "Slug / URL",
      type: "slug",
      options: { source: "pageDisplayName" },
      description: "URL halaman. Default framework biasanya /case-studies.",
    }),
    defineField({
      name: "adminDescription",
      title: "Short Description / Catatan Admin",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "showInClientPages",
      title: "Show in Pages Dashboard",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "showInNavbar",
      title: "Show in Navbar",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "showInFooter",
      title: "Show in Footer",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 80,
    }),
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
    select: {
      displayTitle: "pageDisplayName",
      title: "pageTitle",
    },
    prepare({ displayTitle, title }) {
      return {
        title: displayTitle || title || "Case Studies Page Settings",
        subtitle: "Hero, media, overlay, and SEO",
      };
    },
  },
});
