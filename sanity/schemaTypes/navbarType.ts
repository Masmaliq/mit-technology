import { defineField, defineType } from "sanity";
import { NavigationGlobalEditor } from "../components/GlobalEditor";

export const navbarType = defineType({
  name: "navbar",
  title: "Navigation",
  type: "document",
  components: { input: NavigationGlobalEditor },
  fieldsets: [
    { name: "menu", title: "Navbar Menu", options: { collapsible: false } },
    { name: "cta", title: "Navbar CTA", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: "useSiteIdentity", title: "Use Global Site Identity", type: "boolean", initialValue: false, hidden: true, description: "Reserved for the later frontend migration. Existing logo behavior remains compatible." }),
    defineField({ name: "logo", title: "Legacy Logo", type: "image", options: { hotspot: true }, hidden: true, description: "Currently used by the public navbar when Image Logo mode is selected." }),
    defineField({ name: "brandMode", title: "Brand Mode", type: "string", initialValue: "textOnly", hidden: true, options: { list: [
      { title: "Text Only", value: "textOnly" }, { title: "Image Logo", value: "image" },
    ], layout: "radio" } }),
    defineField({
      name: "menuItems",
      title: "Menu Items",
      type: "array",
      fieldset: "menu",
      description: "Atur label, tujuan, dan urutan menu utama website.",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", title: "Menu Label", type: "string" }),
          defineField({ name: "href", title: "Destination", type: "string" }),
          defineField({ name: "order", title: "Order", type: "number", hidden: true }),
        ],
        preview: { select: { title: "label", subtitle: "href" } },
      }],
    }),
    defineField({ name: "ctaEnabled", title: "Show CTA", type: "boolean", initialValue: true, fieldset: "cta" }),
    defineField({ name: "ctaLabel", title: "Button Label", type: "string", fieldset: "cta", hidden: ({ document }) => document?.ctaEnabled === false }),
    defineField({ name: "ctaHref", title: "Destination", type: "string", fieldset: "cta", hidden: ({ document }) => document?.ctaEnabled === false }),
  ],
  preview: { prepare: () => ({ title: "Navigation", subtitle: "Global website navigation" }) },
});
