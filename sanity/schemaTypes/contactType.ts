import { defineField, defineType } from "sanity";
import { seoFields } from "./objects/seoFields";

export const contactType = defineType({
  name: "contact",
  title: "Kontak",
  type: "document",
  fields: [
    defineField({
      name: "pageNumber",
      title: "Nomor Halaman",
      type: "string",
      description: "Contoh: 06.",
    }),
    defineField({
      name: "pageDisplayName",
      title: "Nama Halaman",
      type: "string",
      description: "Nama yang mudah dipahami klien. Contoh: Kontak.",
    }),
    defineField({
      name: "menuLabel",
      title: "Label Menu",
      type: "string",
      description: "Teks yang tampil di menu navbar. Contoh: Kontak.",
    }),
    defineField({
      name: "slug",
      title: "Slug / URL",
      type: "slug",
      options: { source: "pageDisplayName" },
      description: "URL halaman. Untuk halaman ini biasanya /contact.",
    }),
    defineField({
      name: "adminDescription",
      title: "Short Description / Catatan Admin",
      type: "text",
      rows: 2,
      description: "Catatan singkat agar editor tahu fungsi halaman kontak.",
    }),
    defineField({
      name: "showInClientPages",
      title: "Show in Pages Dashboard",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showInNavbar",
      title: "Show in Navbar",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showInFooter",
      title: "Show in Footer",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 60,
    }),
    defineField({
      name: "heroEyebrow",
      title: "Eyebrow / Label Kecil",
      type: "string",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title / Judul Kontak",
      type: "string",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description / Deskripsi Kontak",
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
      title: "Page Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Page Description",
      type: "text",
    }),
    defineField({
      name: "phone",
      title: "Phone / Telepon",
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
      title: "Address / Alamat",
      type: "text",
    }),
    defineField({
      name: "googleMapsEmbed",
      title: "Google Maps Embed / Map Link",
      type: "text",
      description: "Masukkan embed Google Maps atau link peta jika tersedia.",
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
      displayTitle: "pageDisplayName",
      title: "title",
      subtitle: "email",
    },
    prepare({ displayTitle, title, subtitle }) {
      return {
        title: displayTitle || title || "Kontak",
        subtitle: subtitle || "Konten halaman Kontak",
      };
    },
  },
});
