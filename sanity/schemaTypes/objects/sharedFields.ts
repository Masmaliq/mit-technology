import { defineField, defineType } from "sanity";

const imageAltField = defineField({
  name: "alt",
  title: "Alternative Text",
  type: "string",
  description: "Describe the image for visitors using assistive technology.",
});

export const sharedCtaType = defineType({
  name: "sharedCta",
  title: "CTA",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "link", title: "Link", type: "string" }),
    defineField({ name: "isExternal", title: "External Link", type: "boolean", initialValue: false }),
    defineField({
      name: "openInNewTab",
      title: "Open in New Tab",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => !parent?.isExternal,
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "link" },
    prepare({ title, subtitle }) {
      return { title: title || "CTA", subtitle: subtitle || "No link set" };
    },
  },
});

export const sharedSeoType = defineType({
  name: "sharedSeo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "SEO Title", type: "string" }),
    defineField({ name: "description", title: "Meta Description", type: "text", rows: 3 }),
    defineField({
      name: "openGraphImage",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
      fields: [imageAltField],
    }),
  ],
});

export const sharedHeroMediaType = defineType({
  name: "sharedHeroMedia",
  title: "Hero Media",
  type: "object",
  fieldsets: [
    { name: "desktop", title: "Desktop Media", options: { collapsible: true, collapsed: false } },
    { name: "mobile", title: "Mobile Fallback", options: { collapsible: true, collapsed: true } },
    { name: "presentation", title: "Media Presentation", options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      initialValue: "image",
      fieldset: "desktop",
      options: {
        layout: "radio",
        list: [
          { title: "Image", value: "image" },
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
      fieldset: "desktop",
      hidden: ({ parent }) => parent?.mediaType === "video",
    }),
    defineField({
      name: "video",
      title: "Video MP4",
      type: "file",
      options: { accept: "video/mp4" },
      fieldset: "desktop",
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({
      name: "posterImage",
      title: "Poster / Thumbnail",
      type: "image",
      options: { hotspot: true },
      fields: [imageAltField],
      fieldset: "desktop",
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({ name: "accessibleLabel", title: "Accessible Media Label", type: "string", fieldset: "desktop" }),
    defineField({
      name: "mobileMediaType",
      title: "Mobile Media Type",
      type: "string",
      initialValue: "image",
      fieldset: "mobile",
      options: {
        layout: "radio",
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
      },
    }),
    defineField({
      name: "mobileImage",
      title: "Mobile Image",
      type: "image",
      options: { hotspot: true },
      fields: [imageAltField],
      fieldset: "mobile",
      hidden: ({ parent }) => parent?.mobileMediaType === "video",
    }),
    defineField({
      name: "mobileVideo",
      title: "Mobile Video MP4",
      type: "file",
      options: { accept: "video/mp4" },
      fieldset: "mobile",
      hidden: ({ parent }) => parent?.mobileMediaType !== "video",
    }),
    defineField({
      name: "horizontalPosition",
      title: "Horizontal Position",
      type: "string",
      initialValue: "center",
      fieldset: "presentation",
      options: { list: ["left", "center", "right"], layout: "radio" },
    }),
    defineField({
      name: "verticalPosition",
      title: "Vertical Position",
      type: "string",
      initialValue: "center",
      fieldset: "presentation",
      options: { list: ["top", "center", "bottom"], layout: "radio" },
    }),
    defineField({
      name: "scale",
      title: "Scale / Zoom",
      description: "Use 100 for the natural size.",
      type: "number",
      initialValue: 100,
      fieldset: "presentation",
      validation: (Rule) => Rule.min(80).max(140),
    }),
    defineField({
      name: "overlayStrength",
      title: "Overlay Strength",
      type: "number",
      initialValue: 40,
      fieldset: "presentation",
      validation: (Rule) => Rule.min(0).max(90),
    }),
  ],
});
