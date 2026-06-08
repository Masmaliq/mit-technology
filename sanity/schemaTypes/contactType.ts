import { defineField, defineType } from "sanity";
import { seoFields } from "./objects/seoFields";

export const contactType = defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
    }),
    defineField({
      name: "googleMapsEmbed",
      title: "Google Maps Embed",
      type: "text",
    }),
    defineField({
      name: "formTitle",
      title: "Form Title",
      type: "string",
    }),
    defineField({
      name: "formDescription",
      title: "Form Description",
      type: "text",
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
    ...seoFields,
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "email",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Contact",
        subtitle: subtitle || "MIT contact page content",
      };
    },
  },
});
