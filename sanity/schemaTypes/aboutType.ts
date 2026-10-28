import { defineField, defineType } from "sanity";
import { seoFields } from "./objects/seoFields";
import { AboutEditor } from "../components/AboutEditor";

export const aboutType = defineType({
  name: "about",
  title: "About",
  type: "document",
  components: { input: AboutEditor },
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "whoWeAre", title: "Who We Are" },
    { name: "expertise", title: "Expertise" },
    { name: "values", title: "Values" },
    { name: "clients", title: "Clients & Partners" },
    { name: "cta", title: "Final CTA" },
    { name: "seo", title: "SEO" },
    { name: "legacy", title: "Compatibility" },
  ],
  fields: [
    defineField({ name: "aboutHeroMediaType", title: "Hero Media Type", type: "string", initialValue: "image", group: "hero", options: { layout: "radio", list: [{ title: "Image", value: "image" }, { title: "Video", value: "video" }] } }),
    defineField({ name: "aboutHeroImage", title: "Hero Image", type: "image", group: "hero", options: { hotspot: true }, hidden: ({ parent }) => parent?.aboutHeroMediaType === "video" }),
    defineField({ name: "aboutHeroVideo", title: "Hero Video", type: "file", group: "hero", options: { accept: "video/mp4" }, hidden: ({ parent }) => parent?.aboutHeroMediaType !== "video" }),
    defineField({ name: "heroEyebrow", title: "Hero Eyebrow", type: "string", group: "hero" }),
    defineField({ name: "heroTitle", title: "Hero Title", type: "string", group: "hero" }),
    defineField({ name: "heroDescription", title: "Hero Description", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "aboutHeroMedia", title: "Hero Media", type: "sharedHeroMedia", group: "hero" }),

    defineField({ name: "whoWeAreIntro", title: "Who We Are Introduction", type: "pageSectionIntro", group: "whoWeAre" }),
    defineField({
      name: "whoWeAreBody",
      title: "Who We Are Body",
      type: "array",
      group: "whoWeAre",
      of: [{ type: "block" }],
    }),
    defineField({ name: "capabilityCards", title: "Capability Cards", type: "array", group: "whoWeAre", of: [{ type: "pagePresentationItem" }] }),

    defineField({ name: "expertiseIntro", title: "Expertise Introduction", type: "pageSectionIntro", group: "expertise" }),
    defineField({
      name: "expertiseServices",
      title: "Expertise Services",
      description: "References canonical Services while allowing page-specific labels and preview media.",
      type: "array",
      group: "expertise",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "service", title: "Service", type: "reference", to: [{ type: "solution" }] }),
          defineField({ name: "displayTitle", title: "Display Title Override", type: "string" }),
          defineField({ name: "displayDescription", title: "Display Description Override", type: "text", rows: 2 }),
          defineField({ name: "previewMedia", title: "Preview Media", type: "sharedHeroMedia" }),
        ],
        preview: { select: { title: "service.title", subtitle: "displayTitle", media: "previewMedia.image" } },
      }],
    }),

    defineField({ name: "valuesIntro", title: "Values Introduction", type: "pageSectionIntro", group: "values" }),
    defineField({ name: "values", title: "Values", type: "array", group: "values", of: [{ type: "pagePresentationItem" }] }),

    defineField({ name: "clientsIntro", title: "Clients & Partners Introduction", type: "pageSectionIntro", group: "clients" }),
    defineField({ name: "selectedProjects", title: "Selected Work Projects", description: "Ordered references to canonical Work Projects.", type: "array", group: "clients", of: [{ type: "reference", to: [{ type: "project" }] }] }),
    defineField({
      name: "selectedClients",
      title: "Clients & Partners",
      type: "array",
      group: "clients",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "client", title: "Client", type: "reference", to: [{ type: "clientLogo" }] }),
          defineField({ name: "displayRole", title: "Role / Type Override", type: "string" }),
          defineField({ name: "relatedProject", title: "Related Project", type: "reference", to: [{ type: "project" }] }),
        ],
        preview: { select: { title: "client.name", subtitle: "displayRole", media: "client.logo" } },
      }],
    }),
    defineField({ name: "finalCta", title: "Final CTA", type: "pageCtaSection", group: "cta" }),
    defineField({ name: "seo", title: "SEO", type: "sharedSeo", group: "seo" }),

    defineField({ name: "storyEyebrow", title: "Legacy Story Eyebrow", type: "string", group: "legacy" }),
    defineField({ name: "storyTitle", title: "Legacy Story Title", type: "string", group: "legacy" }),
    defineField({ name: "storyDescription", title: "Legacy Story Description", type: "text", group: "legacy" }),
    defineField({ name: "vision", title: "Legacy Vision", type: "text", group: "legacy" }),
    defineField({ name: "mission", title: "Legacy Mission", type: "array", group: "legacy", of: [{ type: "string" }] }),
    defineField({ name: "coreValuesEyebrow", title: "Legacy Core Values Eyebrow", type: "string", group: "legacy" }),
    defineField({ name: "coreValuesTitle", title: "Legacy Core Values Title", type: "string", group: "legacy" }),
    defineField({ name: "coreValues", title: "Legacy Core Values", type: "array", group: "legacy", of: [{ type: "string" }] }),
    defineField({ name: "missionEyebrow", title: "Legacy Mission Eyebrow", type: "string", group: "legacy" }),
    defineField({ name: "visionEyebrow", title: "Legacy Vision Eyebrow", type: "string", group: "legacy" }),
    defineField({ name: "whyEyebrow", title: "Legacy Why Eyebrow", type: "string", group: "legacy" }),
    defineField({ name: "whyTitle", title: "Legacy Why Title", type: "string", group: "legacy" }),
    defineField({
      name: "statistics",
      title: "Legacy Statistics",
      type: "array",
      group: "legacy",
      of: [{ type: "object", fields: [defineField({ name: "value", title: "Value", type: "string" }), defineField({ name: "label", title: "Label", type: "string" })] }],
    }),
    defineField({ name: "image", title: "Legacy Image", type: "image", group: "legacy", options: { hotspot: true } }),
    defineField({ name: "ctaEyebrow", title: "Legacy CTA Eyebrow", type: "string", group: "legacy" }),
    defineField({ name: "ctaTitle", title: "Legacy CTA Title", type: "string", group: "legacy" }),
    defineField({ name: "ctaDescription", title: "Legacy CTA Description", type: "text", group: "legacy" }),
    defineField({ name: "ctaButtonLabel", title: "Legacy CTA Button Label", type: "string", group: "legacy" }),
    defineField({ name: "ctaButtonUrl", title: "Legacy CTA Button URL", type: "string", group: "legacy" }),
    ...seoFields.map((field) => ({ ...field, group: "legacy" })),
  ],
  preview: {
    select: { title: "heroTitle", subtitle: "whoWeAreIntro.heading", media: "aboutHeroMedia.image" },
    prepare({ title, subtitle, media }) {
      return { title: title || "About", subtitle: subtitle || "About page architecture", media };
    },
  },
});
