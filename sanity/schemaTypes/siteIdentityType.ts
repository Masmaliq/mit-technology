import { defineField, defineType } from "sanity";
import { SiteIdentityEditor } from "../components/GlobalEditor";

const logoField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "Alternative Text", type: "string" })],
  });

export const siteIdentityType = defineType({
  name: "siteIdentity",
  title: "Site Identity",
  type: "document",
  components: { input: SiteIdentityEditor },
  groups: [
    { name: "brand", title: "Brand", default: true },
    { name: "logos", title: "Logos" },
    { name: "media", title: "Default Media", hidden: true },
  ],
  fields: [
    defineField({ name: "siteName", title: "Site Name", type: "string", group: "brand" }),
    defineField({ name: "shortName", title: "Short Name", type: "string", group: "brand" }),
    defineField({ name: "tagline", title: "Tagline", type: "string", group: "brand" }),
    defineField({ name: "shortDescription", title: "Short Description", type: "text", rows: 3, group: "brand" }),
    { ...logoField("primaryLogo", "Primary Logo"), group: "logos" },
    { ...logoField("darkLogo", "Dark Logo"), group: "logos", hidden: true },
    { ...logoField("lightLogo", "Light Logo"), group: "logos", hidden: true },
    defineField({ name: "favicon", title: "Favicon", type: "image", options: { hotspot: true }, group: "logos" }),
    { ...logoField("defaultOpenGraphImage", "Default Open Graph Image"), group: "media", hidden: true },
    { ...logoField("placeholderImage", "Placeholder Image"), group: "media", hidden: true },
  ],
  preview: {
    select: { title: "siteName", subtitle: "tagline", media: "primaryLogo" },
    prepare({ title, subtitle, media }) {
      return { title: title || "Site Identity", subtitle: subtitle || "Global brand identity", media };
    },
  },
});
