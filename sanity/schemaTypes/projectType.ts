import { defineField, defineType } from "sanity";

const imageAltField = defineField({
  name: "alt",
  title: "Alternative Text",
  type: "string",
  description: "Jelaskan isi gambar secara singkat untuk aksesibilitas.",
});

const legacyImage = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "image",
    group: "legacy",
    hidden: true,
    options: { hotspot: true },
    fields: [imageAltField],
  });

export const projectType = defineType({
  name: "project",
  title: "Work",
  type: "document",
  groups: [
    { name: "info", title: "01 — Project Info", default: true },
    { name: "cover", title: "02 — Work Cover" },
    { name: "hero", title: "03 — Case Study Hero" },
    { name: "content", title: "04 — Case Study Content" },
    { name: "media", title: "05 — Project Media" },
    { name: "seo", title: "06 — SEO" },
    { name: "legacy", title: "Compatibility" },
  ],
  fields: [
    defineField({ name: "title", title: "Project Name", type: "string", group: "info", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "info", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "client", title: "Client", type: "string", group: "info" }),
    defineField({ name: "category", title: "Category / Service", type: "string", group: "info" }),
    defineField({ name: "year", title: "Year", type: "number", group: "info", validation: (rule) => rule.min(1900).max(2200) }),
    defineField({ name: "technologies", title: "Technology / Tags", type: "array", group: "info", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "projectUrl", title: "Live Website URL", type: "url", group: "info" }),
    defineField({ name: "shortDescription", title: "Short Description", type: "text", rows: 3, group: "info" }),
    defineField({ name: "active", title: "Published on Work", type: "boolean", initialValue: true, group: "info" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false, group: "info" }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 0, group: "info" }),

    defineField({
      name: "coverMedia",
      title: "Cover Media",
      description: "Ditampilkan pada halaman Work sebelum pengunjung membuka project.",
      type: "sharedHeroMedia",
      group: "cover",
    }),
    defineField({ name: "coverAlt", title: "Cover Alt Text", type: "string", group: "cover", description: "Deskripsi singkat untuk gambar cover." }),

    defineField({ name: "heroEyebrow", title: "Hero Eyebrow", type: "string", group: "hero" }),
    defineField({ name: "heroTitle", title: "Hero Title", type: "string", group: "hero" }),
    defineField({ name: "heroIntroduction", title: "Hero Introduction", type: "text", rows: 4, group: "hero" }),
    defineField({
      name: "heroMedia",
      title: "Hero Media",
      description: "Gambar utama yang tampil besar di halaman detail project.",
      type: "sharedHeroMedia",
      group: "hero",
    }),
    defineField({ name: "heroAlt", title: "Hero Alt Text", type: "string", group: "hero", description: "Deskripsi singkat untuk media hero." }),

    defineField({
      name: "caseStudyContent",
      title: "Case Study Content",
      description: "Susun cerita project seperti artikel: tambah, hapus, atau urutkan setiap bagian.",
      type: "array",
      group: "content",
      of: [{
        type: "object",
        name: "caseStudySection",
        title: "Article Section",
        fields: [
          defineField({ name: "eyebrow", title: "Section Label", type: "string" }),
          defineField({ name: "heading", title: "Heading", type: "string" }),
          defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }] }),
          defineField({
            name: "media",
            title: "Case Study Media",
            description: "Gambar proses, desain, frontend, CMS, mobile, atau dokumentasi lain yang mendukung cerita project.",
            type: "sharedHeroMedia",
          }),
          defineField({ name: "caption", title: "Caption", type: "string" }),
          defineField({
            name: "layout",
            title: "Media Width",
            type: "string",
            initialValue: "wide",
            options: {
              layout: "radio",
              list: [
                { title: "Wide", value: "wide" },
                { title: "Full Width", value: "full" },
              ],
            },
          }),
        ],
        preview: {
          select: { title: "heading", subtitle: "eyebrow", media: "media.image" },
          prepare({ title, subtitle, media }) {
            return { title: title || "Article Section", subtitle, media };
          },
        },
      }],
    }),

    defineField({
      name: "gallery",
      title: "Additional Project Media",
      description: "Asset tambahan yang dapat digunakan untuk melengkapi dokumentasi project.",
      type: "array",
      group: "media",
      of: [{
        type: "image",
        options: { hotspot: true },
        fields: [
          imageAltField,
          defineField({ name: "label", title: "Label", type: "string" }),
          defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          defineField({ name: "caption", title: "Caption", type: "string" }),
        ],
      }],
    }),

    defineField({ name: "seo", title: "SEO", type: "sharedSeo", group: "seo" }),

    defineField({ name: "fullDescription", title: "Legacy Full Description", type: "text", rows: 8, group: "legacy", hidden: true }),
    legacyImage("coverImage", "Legacy Cover Image"),
    legacyImage("desktopVisual", "Legacy Desktop Visual"),
    legacyImage("mobileVisual", "Legacy Mobile Visual"),
    defineField({ name: "videoMp4", title: "Legacy Video MP4", type: "file", group: "legacy", hidden: true, options: { accept: "video/mp4" } }),
    legacyImage("videoPosterImage", "Legacy Video Poster"),
    defineField({ name: "services", title: "Legacy Services", type: "array", group: "legacy", hidden: true, of: [{ type: "reference", to: [{ type: "solution" }] }] }),
  ],
  preview: {
    select: { title: "title", client: "client", category: "category", cover: "coverMedia.image", legacyCover: "coverImage" },
    prepare({ title, client, category, cover, legacyCover }) {
      return {
        title: title || "Untitled Project",
        subtitle: [client, category].filter(Boolean).join(" · "),
        media: cover || legacyCover,
      };
    },
  },
});
