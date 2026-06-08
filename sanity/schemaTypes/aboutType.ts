import { defineField, defineType } from "sanity";
import { seoFields } from "./objects/seoFields";

export const aboutType = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
    }),
    defineField({
      name: "storyTitle",
      title: "Story Title",
      type: "string",
    }),
    defineField({
      name: "storyDescription",
      title: "Story Description",
      type: "text",
    }),
    defineField({
      name: "vision",
      title: "Vision",
      type: "text",
    }),
    defineField({
      name: "mission",
      title: "Mission",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "coreValues",
      title: "Core Values",
      type: "array",
      of: [{ type: "string" }],
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
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    ...seoFields,
  ],
  preview: {
    select: {
      title: "heroTitle",
      subtitle: "storyTitle",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "About",
        subtitle: subtitle || "MIT about page content",
        media,
      };
    },
  },
});
