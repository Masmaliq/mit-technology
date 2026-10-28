import { defineField, defineType } from "sanity";
import { SiteSettingsEditor } from "../components/GlobalEditor";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  components: { input: SiteSettingsEditor },
  groups: [
    { name: "website", title: "Website", default: true },
    { name: "features", title: "Features", hidden: true },
    { name: "maintenance", title: "Maintenance", hidden: true },
    { name: "legacy", title: "Legacy Compatibility", hidden: true },
  ],
  fields: [
    defineField({ name: "siteUrl", title: "Website URL", type: "url", group: "website" }),
    defineField({ name: "defaultLanguage", title: "Default Language", type: "string", initialValue: "id", group: "website", hidden: true }),
    defineField({ name: "timezone", title: "Timezone", type: "string", initialValue: "Asia/Jakarta", group: "website", hidden: true }),
    defineField({ name: "enableWhatsAppFloatingButton", title: "WhatsApp Floating Button", type: "boolean", initialValue: true, group: "features", hidden: true }),
    defineField({ name: "enableSmoothScroll", title: "Smooth Scroll", type: "boolean", initialValue: true, group: "features", hidden: true }),
    defineField({ name: "supportReducedMotion", title: "Reduced Motion Support", type: "boolean", initialValue: true, group: "features", hidden: true }),
    defineField({ name: "maintenanceMode", title: "Maintenance Mode", type: "boolean", initialValue: false, group: "maintenance", hidden: true }),
    defineField({ name: "maintenanceMessage", title: "Maintenance Message", type: "text", rows: 3, group: "maintenance", hidden: true }),
    defineField({ name: "companyName", title: "Company Name", type: "string", group: "legacy", hidden: true, description: "Compatibility field. Brand identity will move to Site Identity." }),
    defineField({ name: "tagline", title: "Tagline", type: "string", group: "legacy", hidden: true }),
    defineField({ name: "description", title: "Description", type: "text", group: "legacy", hidden: true }),
    defineField({ name: "phone", title: "Phone", type: "string", group: "legacy", hidden: true, description: "Compatibility field. Edit future canonical contact data in Contact Information." }),
    defineField({ name: "whatsapp", title: "WhatsApp", type: "string", group: "legacy", hidden: true }),
    defineField({ name: "email", title: "Email", type: "string", group: "legacy", hidden: true }),
    defineField({ name: "address", title: "Address", type: "text", group: "legacy", hidden: true }),
    defineField({ name: "instagram", title: "Instagram", type: "url", group: "legacy", hidden: true, description: "Compatibility field. Edit future canonical profiles in Social Media." }),
    defineField({ name: "linkedin", title: "LinkedIn", type: "url", group: "legacy", hidden: true }),
    defineField({ name: "youtube", title: "YouTube", type: "url", group: "legacy", hidden: true }),
    defineField({ name: "facebook", title: "Facebook", type: "url", group: "legacy", hidden: true }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true }, group: "legacy", hidden: true, description: "Compatibility field used by the current frontend." }),
    defineField({ name: "favicon", title: "Favicon", type: "image", options: { hotspot: true }, group: "legacy", hidden: true }),
    defineField({ name: "primaryColor", title: "Primary Color", type: "string", group: "legacy", hidden: true }),
    defineField({ name: "secondaryColor", title: "Secondary Color", type: "string", group: "legacy", hidden: true }),
    defineField({ name: "siteTitle", title: "Site Title", type: "string", group: "legacy", hidden: true }),
    defineField({ name: "siteDescription", title: "Site Description", type: "text", group: "legacy", hidden: true }),
    defineField({ name: "ogImage", title: "OpenGraph Image", type: "image", options: { hotspot: true }, group: "legacy", hidden: true }),
    defineField({ name: "keywords", title: "Keywords", type: "array", of: [{ type: "string" }], group: "legacy", hidden: true }),
    defineField({
      name: "pageSeo",
      title: "Page SEO",
      type: "array",
      group: "legacy",
      hidden: true,
      of: [{
        type: "object",
        fields: [
          defineField({ name: "page", title: "Page", type: "string", options: { list: [
            { title: "Homepage", value: "homepage" }, { title: "About", value: "about" },
            { title: "Solutions", value: "solutions" }, { title: "Packages", value: "packages" },
            { title: "Portfolio", value: "portfolio" }, { title: "Contact", value: "contact" },
          ] } }),
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "description", title: "Description", type: "text" }),
          defineField({ name: "ogImage", title: "OpenGraph Image", type: "image", options: { hotspot: true } }),
          defineField({ name: "keywords", title: "Keywords", type: "array", of: [{ type: "string" }] }),
        ],
      }],
    }),
  ],
  preview: {
    select: { title: "companyName", subtitle: "siteUrl", media: "logo" },
    prepare({ title, subtitle, media }) {
      return { title: title || "Site Settings", subtitle: subtitle || "Website behavior and compatibility settings", media };
    },
  },
});
