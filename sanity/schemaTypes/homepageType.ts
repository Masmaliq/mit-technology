import { defineField, defineType } from "sanity";
import { seoFields } from "./objects/seoFields";

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
      description: "Small badge text above the hero headline.",
      type: "string",
    }),

    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
    }),

    defineField({
      name: "heroPrimaryCtaLabel",
      title: "Hero Primary CTA Label",
      type: "string",
    }),

    defineField({
      name: "heroPrimaryCtaHref",
      title: "Hero Primary CTA URL",
      type: "string",
    }),

    defineField({
      name: "heroSecondaryCtaLabel",
      title: "Hero Secondary CTA Label",
      type: "string",
    }),

    defineField({
      name: "heroSecondaryCtaHref",
      title: "Hero Secondary CTA URL",
      type: "string",
    }),

    defineField({
      name: "consoleTitle",
      title: "Hero Console Title",
      type: "string",
    }),

    defineField({
      name: "consoleHeading",
      title: "Hero Console Heading",
      type: "string",
    }),

    defineField({
      name: "metricOneValue",
      title: "Metric One Value",
      type: "string",
    }),

    defineField({
      name: "metricOneLabel",
      title: "Metric One Label",
      type: "string",
    }),

    defineField({
      name: "metricTwoValue",
      title: "Metric Two Value",
      type: "string",
    }),

    defineField({
      name: "metricTwoLabel",
      title: "Metric Two Label",
      type: "string",
    }),

    defineField({
      name: "recommendedStack",
      title: "Recommended Stack",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "trustEyebrow",
      title: "Trust Eyebrow",
      type: "string",
    }),

    defineField({
      name: "trustTitle",
      title: "Trust Title",
      type: "string",
    }),

    defineField({
      name: "trustDescription",
      title: "Trust Description",
      type: "text",
    }),

    defineField({
      name: "trustItems",
      title: "Trust Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
          ],
        },
      ],
    }),

    defineField({
      name: "featuredSolutions",
      title: "Featured Solutions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
            defineField({ name: "href", title: "URL", type: "string" }),
          ],
        },
      ],
    }),

    defineField({
      name: "packagesPreview",
      title: "Packages Preview",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "price", title: "Starting Price", type: "string" }),
            defineField({ name: "href", title: "URL", type: "string" }),
          ],
        },
      ],
    }),

    defineField({
      name: "portfolioPreview",
      title: "Portfolio Preview",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "category", title: "Category", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
            defineField({ name: "href", title: "URL", type: "string" }),
          ],
        },
      ],
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
      name: "ctaButtonHref",
      title: "CTA Button URL",
      type: "string",
    }),
    ...seoFields,
  ],

  preview: {
    select: {
      title: "heroTitle",
      subtitle: "heroSubtitle",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Homepage",
        subtitle: subtitle || "MIT Technology homepage content",
      };
    },
  },
});
