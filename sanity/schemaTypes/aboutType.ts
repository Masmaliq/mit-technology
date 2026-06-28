import { defineField, defineType } from "sanity";
import { seoFields } from "./objects/seoFields";

export const aboutType = defineType({
  name: "about",
  title: "Tentang Kami",
  type: "document",
  fields: [
    defineField({
      name: "pageNumber",
      title: "Nomor Halaman",
      type: "string",
      description: "Contoh: 02.",
    }),
    defineField({
      name: "pageDisplayName",
      title: "Nama Halaman",
      type: "string",
      description: "Nama yang mudah dipahami klien. Contoh: Tentang Kami.",
    }),
    defineField({
      name: "menuLabel",
      title: "Label Menu",
      type: "string",
      description: "Teks yang tampil di menu navbar. Contoh: Tentang Kami.",
    }),
    defineField({
      name: "slug",
      title: "Slug / URL",
      type: "slug",
      options: { source: "pageDisplayName" },
      description: "URL halaman. Untuk halaman ini biasanya /about.",
    }),
    defineField({
      name: "adminDescription",
      title: "Short Description / Catatan Admin",
      type: "text",
      rows: 2,
      description: "Catatan singkat agar editor tahu fungsi halaman ini.",
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
      initialValue: 20,
    }),
    defineField({
      name: "heroEyebrow",
      title: "Eyebrow / Label Kecil",
      type: "string",
      description: "Teks kecil di atas judul halaman. Contoh: Tentang Kami.",
    }),
    defineField({
      name: "heroTitle",
      title: "Page Title / Hero Title",
      type: "string",
      description: "Judul utama halaman Tentang Kami.",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description / Deskripsi Pembuka",
      type: "text",
      description: "Deskripsi singkat di area pembuka halaman.",
    }),
    defineField({
      name: "storyEyebrow",
      title: "Story Eyebrow / Label Cerita",
      type: "string",
    }),
    defineField({
      name: "storyTitle",
      title: "Story Title / Judul Cerita",
      type: "string",
    }),
    defineField({
      name: "storyDescription",
      title: "Story Content / Isi Cerita",
      type: "text",
      description: "Narasi singkat tentang perusahaan.",
    }),
    defineField({
      name: "vision",
      title: "Vision Content / Isi Visi",
      type: "text",
    }),
    defineField({
      name: "mission",
      title: "Mission Content / Isi Misi",
      type: "array",
      of: [{ type: "string" }],
      description: "Isi misi utama. Halaman frontend memakai item pertama sebagai teks misi.",
    }),
    defineField({
      name: "coreValuesEyebrow",
      title: "Core Values Eyebrow",
      type: "string",
    }),
    defineField({
      name: "coreValuesTitle",
      title: "Core Values Title",
      type: "string",
    }),
    defineField({
      name: "coreValues",
      title: "Core Values",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "missionEyebrow",
      title: "Mission Title / Judul Misi",
      type: "string",
    }),
    defineField({
      name: "visionEyebrow",
      title: "Vision Title / Judul Visi",
      type: "string",
    }),
    defineField({
      name: "whyEyebrow",
      title: "Why Section Eyebrow",
      type: "string",
    }),
    defineField({
      name: "whyTitle",
      title: "Why Section Title",
      type: "string",
    }),
    defineField({
      name: "statistics",
      title: "Statistics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "image",
      title: "Hero / Story Image",
      type: "image",
      options: { hotspot: true },
      description: "Gambar utama halaman Tentang Kami.",
    }),
    defineField({
      name: "ctaEyebrow",
      title: "CTA Eyebrow",
      type: "string",
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA Title",
      type: "string",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA Description",
      type: "text",
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "CTA Button Label",
      type: "string",
    }),
    defineField({
      name: "ctaButtonUrl",
      title: "CTA Button URL",
      type: "string",
    }),
    ...seoFields,
  ],
  preview: {
    select: {
      displayTitle: "pageDisplayName",
      title: "heroTitle",
      subtitle: "storyTitle",
      media: "image",
    },
    prepare({ displayTitle, title, subtitle, media }) {
      return {
        title: displayTitle || title || "Tentang Kami",
        subtitle: subtitle || "Konten halaman Tentang Kami",
        media,
      };
    },
  },
});
