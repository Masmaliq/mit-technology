import { defineField, defineType } from "sanity";
import { WorkEditor } from "../components/WorkEditor";

const imageAltField = defineField({ name: "alt", title: "Alternative Text", type: "string" });

export const caseStudiesPageSettingsType = defineType({
  name: "caseStudiesPageSettings",
  title: "Work",
  type: "document",
  components: { input: WorkEditor },
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "projects", title: "Projects" },
    { name: "moreWork", title: "More Work" },
    { name: "process", title: "Process" },
    { name: "cta", title: "Final CTA" },
    { name: "seo", title: "SEO" },
    { name: "legacy", title: "Compatibility" },
  ],
  fields: [
    defineField({
      name: "workHeroMediaType",
      title: "Hero Media Type",
      type: "string",
      initialValue: "image",
      group: "hero",
      options: { layout: "radio", list: [{ title: "Image", value: "image" }, { title: "Video", value: "video" }] },
    }),
    defineField({ name: "workHeroImage", title: "Hero Image", type: "image", group: "hero", options: { hotspot: true }, fields: [imageAltField], hidden: ({ parent }) => parent?.workHeroMediaType === "video" }),
    defineField({ name: "workHeroVideo", title: "Hero Video", type: "file", group: "hero", options: { accept: "video/mp4" }, hidden: ({ parent }) => parent?.workHeroMediaType !== "video" }),
    defineField({ name: "workHeroMedia", title: "Hero Media", type: "sharedHeroMedia", group: "hero" }),
    defineField({ name: "projectsIntro", title: "Projects Introduction", type: "pageSectionIntro", group: "projects" }),
    defineField({
      name: "selectedProjects",
      title: "Selected Projects",
      description: "Ordered references to canonical Projects. Overrides only affect this page.",
      type: "array",
      group: "projects",
      of: [{
        type: "object",
        fieldsets: [
          { name: "projectMedia", title: "PROJECT MEDIA", options: { columns: 2 } },
          { name: "presentation", title: "PRESENTATION STYLE" },
        ],
        fields: [
          defineField({ name: "project", title: "Project", type: "reference", to: [{ type: "project" }] }),
          defineField({ name: "showInFeaturedWork", title: "Show in Featured Work", type: "boolean", initialValue: true }),
          defineField({ name: "displayOrder", title: "Order", type: "number" }),
          defineField({ name: "displayCategory", title: "Display Category Override", type: "string" }),
          defineField({ name: "displayDescription", title: "Featured Statement", type: "text", rows: 3 }),
          defineField({ name: "featuredHeroImage", title: "Featured Hero Image", description: "Gambar besar Featured Work. Bukan cursor image atau Case Study image.", type: "image", options: { hotspot: true }, fields: [imageAltField] }),
          defineField({ name: "cursorSupportingImages", title: "Cursor Supporting Images", description: "0–3 gambar untuk interaksi cursor Featured Work. Drag untuk mengatur urutan.", type: "array", validation: (rule) => rule.max(3), of: [{ type: "image", options: { hotspot: true }, fields: [imageAltField] }] }),
          defineField({ name: "mainMedia", title: "Legacy Main / Hero", type: "image", fieldset: "projectMedia", hidden: true, options: { hotspot: true } }),
          defineField({ name: "mobileMedia", title: "Legacy Mobile", type: "image", fieldset: "projectMedia", hidden: true, options: { hotspot: true } }),
          defineField({ name: "productMedia", title: "Legacy Product", type: "image", fieldset: "projectMedia", hidden: true, options: { hotspot: true } }),
          defineField({ name: "detailMedia", title: "Legacy Detail", type: "image", fieldset: "projectMedia", hidden: true, options: { hotspot: true } }),
          defineField({
            name: "presentationStyle",
            title: "Presentation Style",
            type: "string",
            fieldset: "presentation",
            hidden: true,
            initialValue: "spatial",
            options: {
              layout: "radio",
              list: [
                { title: "Editorial", value: "editorial" },
                { title: "Spatial", value: "spatial" },
                { title: "Mosaic", value: "mosaic" },
                { title: "Cinematic", value: "cinematic" },
              ],
            },
          }),
          defineField({
            name: "presentationMedia",
            title: "Legacy Presentation Media",
            description: "Preserved for existing project media compatibility.",
            type: "sharedHeroMedia",
            hidden: true,
          }),
        ],
        preview: {
          select: {
            title: "project.title",
            subtitle: "displayCategory",
            mainMedia: "mainMedia",
            legacyMedia: "presentationMedia.image",
            projectMedia: "project.coverImage",
          },
          prepare({ title, subtitle, mainMedia, legacyMedia, projectMedia }) {
            return {
              title: title || "Selected Project",
              subtitle,
              media: mainMedia || legacyMedia || projectMedia,
            };
          },
        },
      }],
    }),
    defineField({ name: "moreWorkIntro", title: "More Work Introduction", type: "pageSectionIntro", group: "moreWork" }),
    defineField({ name: "processEyebrow", title: "Process Eyebrow", type: "string", group: "process" }),
    defineField({ name: "processHeading", title: "Process Heading", type: "string", group: "process" }),
    defineField({
      name: "moreWorkItems",
      title: "More Work Items",
      description: "Optional future Project references. Leave empty until real projects are available.",
      type: "array",
      group: "moreWork",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "project", title: "Project", type: "reference", to: [{ type: "project" }] }),
          defineField({ name: "showInAllWork", title: "Show in All Work", type: "boolean", initialValue: true }),
          defineField({ name: "displayOrder", title: "Order", type: "number" }),
          defineField({ name: "displayTitle", title: "Display Title Override", type: "string" }),
          defineField({ name: "displayDescription", title: "Display Description Override", type: "text", rows: 2 }),
        ],
        preview: { select: { title: "project.title", subtitle: "displayTitle" } },
      }],
    }),
    defineField({
      name: "projectCards",
      title: "Project Cards",
      description: "Media card khusus archive. Identitas project tetap berasal dari canonical Project.",
      type: "array",
      group: "moreWork",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "project", title: "Project", type: "reference", to: [{ type: "project" }] }),
          defineField({ name: "allWorkImage", title: "All Work Image", description: "Hanya digunakan untuk thumbnail/card All Work.", type: "image", options: { hotspot: true }, fields: [imageAltField] }),
          defineField({ name: "showInAllWork", title: "Show in All Work", type: "boolean", initialValue: true }),
        ],
        preview: { select: { title: "project.title", media: "allWorkImage", active: "showInAllWork" }, prepare({ title, media, active }) { return { title: title || "Project Card", subtitle: active === false ? "Hidden from All Work" : "Visible in All Work", media }; } },
      }],
    }),
    defineField({ name: "finalCta", title: "Final CTA", type: "pageCtaSection", group: "cta" }),
    defineField({ name: "seo", title: "SEO", type: "sharedSeo", group: "seo" }),

    defineField({ name: "pageEyebrow", title: "Hero Eyebrow", type: "string", group: "hero" }),
    defineField({ name: "pageTitle", title: "Hero Title", type: "string", group: "hero" }),
    defineField({ name: "pageDescription", title: "Hero Description", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroBackgroundImage", title: "Legacy Hero Background Image", type: "image", group: "legacy", options: { hotspot: true }, fields: [imageAltField] }),
    defineField({ name: "heroBackgroundVideo", title: "Legacy Hero Background Video MP4", type: "file", group: "legacy", options: { accept: "video/mp4" } }),
    defineField({ name: "heroOverlayOpacity", title: "Legacy Hero Overlay Opacity", type: "number", group: "legacy", validation: (rule) => rule.min(0).max(100) }),
    defineField({ name: "seoTitle", title: "Legacy SEO Title", type: "string", group: "legacy" }),
    defineField({ name: "seoDescription", title: "Legacy SEO Description", type: "text", rows: 3, group: "legacy" }),
    defineField({ name: "seoImage", title: "Legacy SEO Image", type: "image", group: "legacy", options: { hotspot: true }, fields: [imageAltField] }),
  ],
  preview: {
    select: { title: "pageTitle", subtitle: "pageDescription" },
    prepare({ title, subtitle }) {
      return { title: title || "Work", subtitle: subtitle || "Projects, More Work, CTA, and SEO" };
    },
  },
});
