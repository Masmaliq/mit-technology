import { defineField, defineType } from "sanity";
import { seoFields } from "./objects/seoFields";

export const aboutType = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
    }),
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
      name: "storyEyebrow",
      title: "Story Eyebrow",
      type: "string",
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
      name: "coreValuesEyebrow",
      title: "Core Values Eyebrow",
      type: "string",
    }),
    defineField({
      name: "coreValuesTitle",
      title: "Core Values Title",
      type: "string",
    }),
    defineField({
      name: "coreValues",
      title: "Core Values",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "missionEyebrow",
      title: "Mission Eyebrow",
      type: "string",
    }),
    defineField({
      name: "visionEyebrow",
      title: "Vision Eyebrow",
      type: "string",
    }),
    defineField({
      name: "whyEyebrow",
      title: "Why Section Eyebrow",
      type: "string",
    }),
    defineField({
      name: "whyTitle",
      title: "Why Section Title",
      type: "string",
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
    defineField({
      name: "ctaEyebrow",
      title: "CTA Eyebrow",
      type: "string",
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA Title",
      type: "string",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA Description",
      type: "text",
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "CTA Button Label",
      type: "string",
    }),
    defineField({
      name: "ctaButtonUrl",
      title: "CTA Button URL",
      type: "string",
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
