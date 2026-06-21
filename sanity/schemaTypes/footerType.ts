import { defineField, defineType } from "sanity";

export const footerType = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fieldsets: [
    {
      name: "content",
      title: "Footer Content",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "background",
      title: "Footer Background",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      fieldset: "content",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      fieldset: "content",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      fieldset: "content",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      fieldset: "content",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      type: "string",
      fieldset: "content",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      fieldset: "content",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "platform", title: "Platform", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
        },
      ],
    }),
    defineField({
      name: "copyright",
      title: "Copyright",
      type: "string",
      fieldset: "content",
    }),
    defineField({
      name: "enableFooterBackground",
      title: "Enable Footer Background",
      type: "boolean",
      initialValue: false,
      fieldset: "background",
    }),
    defineField({
      name: "footerBackgroundImage",
      title: "Footer Background Image",
      type: "image",
      options: { hotspot: true },
      fieldset: "background",
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
      hidden: ({ document }) => !document?.enableFooterBackground,
    }),
    defineField({
      name: "footerOverlayOpacity",
      title: "Footer Overlay Opacity",
      type: "number",
      description: "White overlay strength from 0 to 100. Higher values keep footer text cleaner.",
      initialValue: 86,
      validation: (Rule) => Rule.min(0).max(100),
      fieldset: "background",
      hidden: ({ document }) => !document?.enableFooterBackground,
    }),
    defineField({
      name: "footerBackgroundPosition",
      title: "Footer Background Position",
      type: "string",
      initialValue: "center",
      options: {
        list: [
          { title: "Center", value: "center" },
          { title: "Top", value: "top" },
          { title: "Bottom", value: "bottom" },
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
      },
      fieldset: "background",
      hidden: ({ document }) => !document?.enableFooterBackground,
    }),
    defineField({
      name: "footerBackgroundSize",
      title: "Footer Background Size",
      type: "string",
      initialValue: "cover",
      options: {
        list: [
          { title: "Cover", value: "cover" },
          { title: "Contain", value: "contain" },
          { title: "Auto", value: "auto" },
        ],
      },
      fieldset: "background",
      hidden: ({ document }) => !document?.enableFooterBackground,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Footer",
        subtitle: "Global footer content",
      };
    },
  },
});
