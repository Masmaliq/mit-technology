import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
    }),
    defineField({
      name: "instagram",
      title: "Instagram",
      type: "url",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn",
      type: "url",
    }),
    defineField({
      name: "youtube",
      title: "YouTube",
      type: "url",
    }),
    defineField({
      name: "facebook",
      title: "Facebook",
      type: "url",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "primaryColor",
      title: "Primary Color",
      type: "string",
    }),
    defineField({
      name: "secondaryColor",
      title: "Secondary Color",
      type: "string",
    }),
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
    }),
    defineField({
      name: "ogImage",
      title: "OpenGraph Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "siteUrl",
      title: "Site URL",
      type: "url",
      description: "Canonical production URL, for example https://mit.example.com",
    }),
    defineField({
      name: "pageSeo",
      title: "Page SEO",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "page",
              title: "Page",
              type: "string",
              options: {
                list: [
                  { title: "Homepage", value: "homepage" },
                  { title: "About", value: "about" },
                  { title: "Solutions", value: "solutions" },
                  { title: "Packages", value: "packages" },
                  { title: "Portfolio", value: "portfolio" },
                  { title: "Contact", value: "contact" },
                ],
              },
            }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
            defineField({
              name: "ogImage",
              title: "OpenGraph Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "keywords",
              title: "Keywords",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "companyName",
      subtitle: "tagline",
      media: "logo",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Site Settings",
        subtitle: subtitle || "Global MIT website settings",
        media,
      };
    },
  },
});
