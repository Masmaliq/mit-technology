import { defineArrayMember, defineField, defineType } from "sanity";

export const insightType = defineType({
  name: "insight",
  title: "Insight",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "publishing", title: "Publishing" },
    { name: "media", title: "Media" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "content", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      options: { list: [
        { title: "Design", value: "design" },
        { title: "Technology", value: "technology" },
        { title: "Business", value: "business" },
      ] },
    }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, group: "content" }),
    defineField({ name: "body", title: "Body", type: "array", group: "content", of: [defineArrayMember({ type: "block" })] }),
    defineField({ name: "publishedAt", title: "Published Date", type: "datetime", group: "publishing" }),
    defineField({ name: "author", title: "Author", type: "string", group: "publishing" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false, group: "publishing" }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: true, group: "publishing" }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      group: "media",
      fields: [defineField({ name: "alt", title: "Alternative Text", type: "string" })],
    }),
    defineField({ name: "seo", title: "SEO", type: "sharedSeo", group: "seo" }),
  ],
  preview: {
    select: { title: "title", category: "category", date: "publishedAt", media: "coverImage" },
    prepare({ title, category, date, media }) {
      return { title: title || "Untitled Insight", subtitle: [category, date?.slice(0, 10)].filter(Boolean).join(" · "), media };
    },
  },
});
