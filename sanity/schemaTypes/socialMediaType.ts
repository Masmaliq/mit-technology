import { defineField, defineType } from "sanity";
import { SocialMediaEditor } from "../components/GlobalEditor";

const platformFields = (prefix: string, labelTitle: string) => [
  defineField({ name: `${prefix}Url`, title: "URL", type: "url" }),
  defineField({ name: `${prefix}Label`, title: labelTitle, type: "string" }),
];

export const socialMediaType = defineType({
  name: "socialMedia",
  title: "Social Media",
  type: "document",
  components: { input: SocialMediaEditor },
  fieldsets: [
    { name: "instagram", title: "Instagram", options: { collapsible: true, collapsed: false } },
    { name: "tiktok", title: "TikTok", options: { collapsible: true, collapsed: true } },
    { name: "linkedin", title: "LinkedIn", options: { collapsible: true, collapsed: true } },
    { name: "youtube", title: "YouTube", options: { collapsible: true, collapsed: true } },
    { name: "facebook", title: "Facebook", options: { collapsible: true, collapsed: true } },
    { name: "twitter", title: "X / Twitter", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    ...platformFields("instagram", "Username").map((field) => ({ ...field, fieldset: "instagram" })),
    ...platformFields("tiktok", "Username").map((field) => ({ ...field, fieldset: "tiktok" })),
    ...platformFields("linkedin", "Label").map((field) => ({ ...field, fieldset: "linkedin" })),
    ...platformFields("youtube", "Channel Name").map((field) => ({ ...field, fieldset: "youtube" })),
    ...platformFields("facebook", "Label").map((field) => ({ ...field, fieldset: "facebook" })),
    ...platformFields("twitter", "Username").map((field) => ({ ...field, fieldset: "twitter" })),
    defineField({
      name: "additionalLinks",
      title: "Additional Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "platform", title: "Platform", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
          preview: { select: { title: "platform", subtitle: "label" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Social Media", subtitle: "Global social profiles" }) },
});
