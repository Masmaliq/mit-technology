import { defineField, defineType } from "sanity";

type SliderPreview = {
  title?: string;
  subtitle?: string;
  media?: any;
};

const imageAltField = defineField({
  name: "alt",
  title: "Alt Text",
  type: "string",
});

const sliderImageObject = {
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [imageAltField],
    }),
    defineField({
      name: "altText",
      title: "Alt Text",
      type: "string",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "caption",
      subtitle: "altText",
      media: "image",
    },
    prepare({ title, subtitle, media }: SliderPreview) {
      return {
        title: title || subtitle || "Slider image",
        subtitle,
        media,
      };
    },
  },
};

export const pageHeroContentType = defineType({
  name: "pageHeroContent",
  title: "Hero Content",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "primaryCtaLabel", title: "Primary CTA Label", type: "string" }),
    defineField({ name: "primaryCtaUrl", title: "Primary CTA URL", type: "string" }),
    defineField({ name: "secondaryCtaLabel", title: "Secondary CTA Label", type: "string" }),
    defineField({ name: "secondaryCtaUrl", title: "Secondary CTA URL", type: "string" }),
  ],
});

export const pageHeroMediaType = defineType({
  name: "pageHeroMedia",
  title: "Hero Media",
  type: "object",
  fields: [
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      initialValue: "image",
      options: {
        layout: "radio",
        list: [
          { title: "Image", value: "image" },
          { title: "Slider", value: "slider" },
          { title: "Video", value: "video" },
        ],
      },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [imageAltField],
      hidden: ({ parent }) => parent?.mediaType && parent.mediaType !== "image",
    }),
    defineField({
      name: "sliderImages",
      title: "Slider Images",
      type: "array",
      of: [sliderImageObject],
      hidden: ({ parent }) => parent?.mediaType !== "slider",
      validation: (rule) => rule.min(2).max(8),
    }),
    defineField({
      name: "videoMp4",
      title: "Video MP4",
      type: "file",
      options: { accept: "video/mp4" },
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({
      name: "posterImage",
      title: "Poster Image",
      type: "image",
      options: { hotspot: true },
      fields: [imageAltField],
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({
      name: "overlayOpacity",
      title: "Overlay Opacity",
      description: "0 is transparent. 100 is fully dark.",
      type: "number",
      initialValue: 45,
      validation: (rule) => rule.min(0).max(100),
    }),
  ],
});

export const pageCardBuilderType = defineType({
  name: "pageCardBuilder",
  title: "Card Builder",
  type: "object",
  fields: [
    defineField({ name: "icon", title: "Icon", type: "string" }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [imageAltField],
    }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({ name: "ctaUrl", title: "CTA URL", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "image",
    },
  },
});

export const pageSectionBuilderType = defineType({
  name: "pageSectionBuilder",
  title: "Section Builder",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({ name: "ctaUrl", title: "CTA URL", type: "string" }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "pageCardBuilder" }],
    }),
  ],
});

export const pageMediaBuilderType = defineType({
  name: "pageMediaBuilder",
  title: "Media Builder",
  type: "object",
  fields: [
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      initialValue: "image",
      options: {
        layout: "radio",
        list: [
          { title: "Image", value: "image" },
          { title: "Slider", value: "slider" },
          { title: "Video", value: "video" },
        ],
      },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [imageAltField],
      hidden: ({ parent }) => parent?.mediaType && parent.mediaType !== "image",
    }),
    defineField({
      name: "sliderImages",
      title: "Slider Images",
      type: "array",
      of: [sliderImageObject],
      hidden: ({ parent }) => parent?.mediaType !== "slider",
      validation: (rule) => rule.min(2).max(8),
    }),
    defineField({
      name: "videoMp4",
      title: "Video MP4",
      type: "file",
      options: { accept: "video/mp4" },
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({ name: "altText", title: "Alt Text", type: "string" }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
});

export const pageSeoBuilderType = defineType({
  name: "pageSeoBuilder",
  title: "SEO Builder",
  type: "object",
  fields: [
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 3 }),
    defineField({
      name: "openGraphImage",
      title: "OpenGraph Image",
      type: "image",
      options: { hotspot: true },
      fields: [imageAltField],
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
