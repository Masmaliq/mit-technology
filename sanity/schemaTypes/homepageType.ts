import { defineField, defineType } from "sanity";

export const homepageType = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",

  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),

    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
    }),

    defineField({
      name: "heroButtonText",
      title: "Hero Button Text",
      type: "string",
    }),

    defineField({
      name: "heroButtonLink",
      title: "Hero Button Link",
      type: "string",
    }),
  ],
});