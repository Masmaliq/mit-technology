import { defineField, defineType } from "sanity";

export const navbarType = defineType({
  name: "navbar",
  title: "Navbar",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "brandMode",
      title: "Brand Mode",
      type: "string",
      initialValue: "textOnly",
      options: {
        list: [
          { title: "Text Only", value: "textOnly" },
          { title: "Image Logo", value: "image" },
        ],
        layout: "radio",
      },
      description: "Choose whether the global header and footer render a text logo or uploaded image logo.",
    }),
    defineField({
      name: "menuItems",
      title: "Menu Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Href", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Href",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Navbar",
        subtitle: "Global navigation content",
      };
    },
  },
});
