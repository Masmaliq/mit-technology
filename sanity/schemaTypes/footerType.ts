import { defineField, defineType } from "sanity";
import { FooterGlobalEditor } from "../components/GlobalEditor";

export const footerType = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  components: { input: FooterGlobalEditor },
  fieldsets: [
    { name: "content", title: "Footer Content", options: { collapsible: true, collapsed: false } },
    { name: "navigation", title: "Navigation Links", options: { collapsible: true, collapsed: false } },
    { name: "display", title: "Display Controls", options: { collapsible: true, collapsed: false } },
    { name: "legal", title: "Legal Links", options: { collapsible: true, collapsed: true } },
    { name: "background", title: "Footer Background", options: { collapsible: true, collapsed: true } },
    { name: "legacy", title: "Legacy Contact Compatibility", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: "description", title: "Short Description", type: "text", rows: 3, fieldset: "content" }),
    defineField({ name: "copyright", title: "Copyright Text", type: "string", fieldset: "content" }),
    defineField({ name: "footerNote", title: "Footer Note", type: "string", fieldset: "content", hidden: true }),
    defineField({ name: "navigationLinks", title: "Navigation Links", type: "array", fieldset: "navigation", of: [{
      type: "object", fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "link", title: "Link", type: "string" }),
      ], preview: { select: { title: "label", subtitle: "link" } },
    }] }),
    defineField({ name: "showAddress", title: "Show Address", type: "boolean", initialValue: true, fieldset: "display" }),
    defineField({ name: "showEmail", title: "Show Email", type: "boolean", initialValue: true, fieldset: "display" }),
    defineField({ name: "showPhone", title: "Show Phone", type: "boolean", initialValue: true, fieldset: "display" }),
    defineField({ name: "showSocialMedia", title: "Show Social Media", type: "boolean", initialValue: true, fieldset: "display" }),
    defineField({ name: "privacyPolicyLink", title: "Privacy Policy", type: "string", fieldset: "legal" }),
    defineField({ name: "termsLink", title: "Terms", type: "string", fieldset: "legal" }),
    defineField({ name: "enableFooterBackground", title: "Enable Footer Background", type: "boolean", initialValue: false, fieldset: "background" }),
    defineField({ name: "footerBackgroundImage", title: "Footer Background Image", type: "image", options: { hotspot: true }, fieldset: "background", fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })], hidden: ({ document }) => !document?.enableFooterBackground }),
    defineField({ name: "footerOverlayOpacity", title: "Footer Overlay Opacity", type: "number", initialValue: 86, validation: (Rule) => Rule.min(0).max(100), fieldset: "background", hidden: ({ document }) => !document?.enableFooterBackground }),
    defineField({ name: "footerBackgroundPosition", title: "Footer Background Position", type: "string", initialValue: "center", options: { list: ["center", "top", "bottom", "left", "right"] }, fieldset: "background", hidden: ({ document }) => !document?.enableFooterBackground }),
    defineField({ name: "footerBackgroundSize", title: "Footer Background Size", type: "string", initialValue: "cover", options: { list: ["cover", "contain", "auto"] }, fieldset: "background", hidden: ({ document }) => !document?.enableFooterBackground }),
    defineField({ name: "address", title: "Legacy Address", type: "text", fieldset: "legacy", hidden: true, description: "Preserved for compatibility. Canonical address lives in Contact Information." }),
    defineField({ name: "email", title: "Legacy Email", type: "string", fieldset: "legacy", hidden: true }),
    defineField({ name: "phone", title: "Legacy Phone", type: "string", fieldset: "legacy", hidden: true }),
    defineField({ name: "whatsapp", title: "Legacy WhatsApp", type: "string", fieldset: "legacy", hidden: true }),
    defineField({ name: "socialLinks", title: "Legacy Social Links", type: "array", fieldset: "legacy", hidden: true, of: [{ type: "object", fields: [
      defineField({ name: "platform", title: "Platform", type: "string" }),
      defineField({ name: "url", title: "URL", type: "url" }),
    ] }] }),
  ],
  preview: { prepare: () => ({ title: "Footer", subtitle: "Global footer presentation" }) },
});
