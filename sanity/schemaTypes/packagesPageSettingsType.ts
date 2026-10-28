import { defineField, defineType } from "sanity";
import { PricingEditor } from "../components/PricingEditor";

const imageAltField = defineField({ name: "alt", title: "Alternative Text", type: "string" });

const pricingSelection = (name: string, title: string, group: string) =>
  defineField({
    name,
    title,
    type: "array",
    group,
    of: [{
      type: "object",
      fields: [
        defineField({ name: "pricing", title: "Pricing Record", type: "reference", to: [{ type: "package" }] }),
        defineField({ name: "displayTitle", title: "Display Title Override", type: "string" }),
        defineField({ name: "displayDescription", title: "Display Description Override", type: "text", rows: 2 }),
      ],
      preview: { select: { title: "pricing.title", subtitle: "displayTitle" } },
    }],
  });

export const packagesPageSettingsType = defineType({
  name: "packagesPageSettings",
  title: "Pricing",
  type: "document",
  components: { input: PricingEditor },
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "websitePricing", title: "Website Pricing" },
    { name: "premium", title: "Custom Digital Experience" },
    { name: "wordpress", title: "WordPress" },
    { name: "foundation", title: "Project Foundation" },
    { name: "beforeBuild", title: "Before We Build" },
    { name: "ownership", title: "Ownership" },
    { name: "process", title: "Process" },
    { name: "faq", title: "FAQ" },
    { name: "cta", title: "Final CTA" },
    { name: "seo", title: "SEO" },
    { name: "legacy", title: "Compatibility" },
  ],
  fields: [
    defineField({ name: "pricingHeroMediaType", title: "Hero Media Type", type: "string", initialValue: "image", group: "hero", options: { layout: "radio", list: [{ title: "Image", value: "image" }, { title: "Video", value: "video" }] } }),
    defineField({ name: "pricingHeroImage", title: "Hero Image", type: "image", group: "hero", options: { hotspot: true }, fields: [imageAltField], hidden: ({ parent }) => parent?.pricingHeroMediaType === "video" }),
    defineField({ name: "pricingHeroVideo", title: "Hero Video", type: "file", group: "hero", options: { accept: "video/mp4" }, hidden: ({ parent }) => parent?.pricingHeroMediaType !== "video" }),
    defineField({ name: "startingPriceLabel", title: "Starting Price Label", type: "string", group: "hero" }),
    defineField({ name: "startingPriceDisplay", title: "Starting Price", type: "string", group: "hero" }),
    defineField({ name: "pricingHeroMedia", title: "Hero Media", type: "sharedHeroMedia", group: "hero" }),
    defineField({ name: "websitePricingIntro", title: "Website Pricing Introduction", type: "pageSectionIntro", group: "websitePricing" }),
    pricingSelection("websitePricing", "Website Pricing", "websitePricing"),
    defineField({ name: "websitePricingBenefits", title: "Shared Benefits", type: "array", group: "websitePricing", of: [{ type: "string" }] }),
    defineField({ name: "websitePricingNote", title: "Pricing Note", type: "text", rows: 2, group: "websitePricing" }),
    defineField({ name: "premiumPricingIntro", title: "Custom Digital Experience Introduction", type: "pageSectionIntro", group: "premium" }),
    pricingSelection("premiumPricing", "Premium Pricing", "premium"),
    defineField({ name: "wordpressIntro", title: "WordPress Introduction", type: "pageSectionIntro", group: "wordpress" }),
    pricingSelection("wordpressPricing", "WordPress Pricing", "wordpress"),
    defineField({ name: "wordpressCta", title: "WordPress CTA", type: "sharedCta", group: "wordpress" }),
    defineField({ name: "projectFoundationIntro", title: "Project Foundation Introduction", type: "pageSectionIntro", group: "foundation" }),
    defineField({ name: "projectFoundationItems", title: "Project Foundation Items", type: "array", group: "foundation", of: [{ type: "pagePresentationItem" }], validation: (rule) => rule.max(4) }),
    defineField({ name: "beforeWeBuildIntro", title: "Before We Build Introduction", type: "pageSectionIntro", group: "beforeBuild" }),
    defineField({ name: "beforeWeBuildItems", title: "Before We Build Items", type: "array", group: "beforeBuild", of: [{ type: "pagePresentationItem" }], validation: (rule) => rule.max(4) }),
    defineField({ name: "ownershipIntro", title: "Ownership Introduction", type: "pageSectionIntro", group: "ownership" }),
    defineField({ name: "ownershipItems", title: "Ownership Items", type: "array", group: "ownership", of: [{ type: "pagePresentationItem" }], validation: (rule) => rule.max(4) }),
    defineField({ name: "processIntro", title: "Process Introduction", type: "pageSectionIntro", group: "process" }),
    defineField({
      name: "selectedProcess",
      title: "Selected Process Steps",
      type: "array",
      group: "process",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "process", title: "Process Step", type: "reference", to: [{ type: "process" }] }),
          defineField({ name: "displayDescription", title: "Description Override", type: "text", rows: 2 }),
        ],
        preview: { select: { title: "process.title", subtitle: "displayDescription" } },
      }],
    }),
    defineField({ name: "faqIntro", title: "FAQ Introduction", type: "pageSectionIntro", group: "faq" }),
    defineField({ name: "faqs", title: "Questions and Answers", type: "array", group: "faq", of: [{ type: "pageFaq" }] }),
    defineField({ name: "finalCta", title: "Final CTA", type: "pageCtaSection", group: "cta" }),
    defineField({ name: "seo", title: "SEO", type: "sharedSeo", group: "seo" }),

    defineField({ name: "pageEyebrow", title: "Hero Eyebrow", type: "string", group: "hero" }),
    defineField({ name: "pageTitle", title: "Hero Title", type: "string", group: "hero" }),
    defineField({ name: "pageDescription", title: "Hero Description", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "packagesSectionEyebrow", title: "Legacy Pricing Section Eyebrow", type: "string", group: "legacy" }),
    defineField({ name: "packagesSectionTitle", title: "Legacy Pricing Section Title", type: "string", group: "legacy" }),
    defineField({ name: "packagesSectionDescription", title: "Legacy Pricing Section Description", type: "text", rows: 3, group: "legacy" }),
    defineField({ name: "packagesSectionCtaLabel", title: "Legacy Pricing CTA Label", type: "string", group: "legacy" }),
    defineField({ name: "packagesSectionCtaUrl", title: "Legacy Pricing CTA URL", type: "string", group: "legacy" }),
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
      return { title: title || "Pricing", subtitle: subtitle || "Pricing architecture and presentation" };
    },
  },
});
