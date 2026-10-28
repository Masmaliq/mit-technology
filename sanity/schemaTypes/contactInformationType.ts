import { defineField, defineType } from "sanity";
import { ContactInformationEditor } from "../components/GlobalEditor";

export const contactInformationType = defineType({
  name: "contactInformation",
  title: "Contact Information",
  type: "document",
  components: { input: ContactInformationEditor },
  groups: [
    { name: "company", title: "Company", default: true },
    { name: "address", title: "Address" },
    { name: "contact", title: "Contact" },
    { name: "whatsapp", title: "WhatsApp" },
    { name: "hours", title: "Business Hours", hidden: true },
  ],
  fields: [
    defineField({ name: "companyName", title: "Company / Business Name", type: "string", group: "company" }),
    defineField({ name: "displayName", title: "Display Name", type: "string", group: "company" }),
    defineField({ name: "addressLine1", title: "Address Line 1", type: "string", group: "address" }),
    defineField({ name: "addressLine2", title: "Address Line 2", type: "string", group: "address" }),
    defineField({ name: "city", title: "City", type: "string", group: "address" }),
    defineField({ name: "province", title: "Province", type: "string", group: "address" }),
    defineField({ name: "postalCode", title: "Postal Code", type: "string", group: "address" }),
    defineField({ name: "country", title: "Country", type: "string", initialValue: "Indonesia", group: "address" }),
    defineField({ name: "primaryEmail", title: "Primary Email", type: "string", group: "contact" }),
    defineField({ name: "secondaryEmail", title: "Secondary Email", type: "string", group: "contact", hidden: true }),
    defineField({ name: "phone", title: "Phone", type: "string", group: "contact" }),
    defineField({ name: "whatsappNumber", title: "WhatsApp Number", type: "string", group: "whatsapp" }),
    defineField({ name: "whatsappDefaultMessage", title: "Default Message", type: "text", rows: 3, group: "whatsapp" }),
    defineField({ name: "whatsappButtonLabel", title: "Button Label", type: "string", group: "whatsapp", hidden: true }),
    defineField({ name: "businessDays", title: "Days", type: "string", group: "hours", hidden: true }),
    defineField({ name: "businessHours", title: "Hours", type: "string", group: "hours", hidden: true }),
  ],
  preview: {
    select: { title: "companyName", subtitle: "primaryEmail" },
    prepare({ title, subtitle }) {
      return { title: title || "Contact Information", subtitle: subtitle || "Global contact details" };
    },
  },
});
