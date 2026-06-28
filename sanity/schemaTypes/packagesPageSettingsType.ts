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
      description: "URL halaman. Default framework biasanya /packages.",
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
      initialValue: 70,
    }),
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
    select: {
      displayTitle: "pageDisplayName",
      title: "pageTitle",
    },
    prepare({ displayTitle, title }) {
      return {
        title: displayTitle || title || "Packages Page Settings",
        subtitle: "Hero, packages section, media, overlay, and SEO",
      };
    },
  },
});
