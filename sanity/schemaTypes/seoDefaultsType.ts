import { defineField, defineType } from "sanity";
import { SeoDefaultsEditor } from "../components/GlobalEditor";

export const seoDefaultsType = defineType({
  name: "seoDefaults",
  title: "SEO Defaults",
  type: "document",
  components: { input: SeoDefaultsEditor },
  fields: [
    defineField({ name: "defaultTitle", title: "Default SEO Title", type: "string" }),
    defineField({ name: "defaultDescription", title: "Default Meta Description", type: "text", rows: 3 }),
    defineField({
      name: "defaultOpenGraphImage",
      title: "Default Open Graph Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alternative Text", type: "string" })],
    }),
    defineField({ name: "siteName", title: "Site Name", type: "string" }),
    defineField({
      name: "twitterCardType",
      title: "Twitter / X Card Type",
      type: "string",
      initialValue: "summary_large_image",
      options: {
        list: [
          { title: "Summary", value: "summary" },
          { title: "Summary with Large Image", value: "summary_large_image" },
        ],
      },
    }),
    defineField({ name: "allowIndexing", title: "Allow Indexing", type: "boolean", initialValue: true, hidden: true }),
    defineField({ name: "sitemapEnabled", title: "Sitemap Enabled", type: "boolean", initialValue: true, hidden: true }),
  ],
  preview: { prepare: () => ({ title: "SEO Defaults", subtitle: "Global metadata fallback" }) },
});
