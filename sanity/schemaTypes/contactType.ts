import { defineField, defineType } from "sanity";
import { seoFields } from "./objects/seoFields";

export const contactType = defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
    }),
    defineField({
      name: "heroBackgroundImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "heroBackgroundVideo",
      title: "Hero Background Video MP4",
      type: "file",
      options: { accept: "video/mp4" },
    }),
    defineField({
      name: "heroOverlayOpacity",
      title: "Hero Overlay Opacity",
      type: "number",
      description: "Use values from 0 to 100.",
      validation: (Rule) => Rule.min(0).max(100),
    }),
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
      name: "namePlaceholder",
      title: "Name Field Placeholder",
      type: "string",
    }),
    defineField({
      name: "emailPlaceholder",
      title: "Email Field Placeholder",
      type: "string",
    }),
    defineField({
      name: "phonePlaceholder",
      title: "Phone Field Placeholder",
      type: "string",
    }),
    defineField({
      name: "companyPlaceholder",
      title: "Company Field Placeholder",
      type: "string",
    }),
    defineField({
      name: "messagePlaceholder",
      title: "Message Field Placeholder",
      type: "string",
    }),
    defineField({
      name: "submitButtonLabel",
      title: "Submit Button Label",
      type: "string",
    }),
    defineField({
      name: "submittingLabel",
      title: "Submitting Label",
      type: "string",
    }),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "string",
    }),
    defineField({
      name: "errorPrefix",
      title: "Error Prefix",
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
