import {defineField, defineType} from "sanity";

export const homepageProjectSelectionType = defineType({
  name: "homepageProjectSelection",
  title: "Selected Project",
  type: "object",
  fields: [
    defineField({
      name: "project",
      title: "Project",
      type: "reference",
      to: [{type: "project"}],
      options: {disableNew: true},
      validation: (rule) => rule.required(),
    }),
    defineField({name: "displayCategory", title: "Display Category Override", type: "string"}),
    defineField({name: "displayDescription", title: "Display Description Override", type: "text", rows: 2}),
    defineField({name: "presentationMedia", title: "Presentation Media Override", type: "sharedHeroMedia"}),
    defineField({name: "featured", title: "Featured Case", type: "boolean", initialValue: false}),
  ],
  preview: {
    select: {
      title: "project.title",
      subtitle: "displayCategory",
      media: "presentationMedia.image",
    },
  },
});
