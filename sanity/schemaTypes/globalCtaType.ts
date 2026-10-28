import { defineField, defineType } from "sanity";
import { GlobalCtaEditor } from "../components/GlobalEditor";

export const globalCtaType = defineType({
  name: "globalCta",
  title: "Global CTA",
  type: "document",
  components: { input: GlobalCtaEditor },
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "actions", title: "Buttons" },
  ],
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string", group: "content" }),
    defineField({ name: "titleLine1", title: "Title Line 1", type: "string", group: "content" }),
    defineField({ name: "titleLine2", title: "Title Line 2", type: "string", group: "content" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3, group: "content" }),
    defineField({ name: "primaryButton", title: "Primary Button", type: "sharedCta", group: "actions" }),
    defineField({ name: "secondaryButton", title: "Secondary Button", type: "sharedCta", group: "actions", hidden: true, description: "Preserved for compatibility. The public frontend currently uses the primary button only." }),
  ],
  preview: {
    select: { title: "titleLine1", subtitle: "titleLine2" },
    prepare({ title, subtitle }) {
      return { title: title || "Global CTA", subtitle: subtitle || "Default page closing action" };
    },
  },
});
