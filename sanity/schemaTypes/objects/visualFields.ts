import { defineField } from "sanity";

function visualImageFields() {
  return [
    defineField({
      name: "desktopImage",
      title: "Desktop Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "mobileImage",
      title: "Mobile Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
    }),
  ];
}

export const visualSettingsField = defineField({
  name: "visualSettings",
  title: "Visual CMS Settings",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "pageSettings",
      title: "Page Settings",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "heroBackgroundImage",
          title: "Hero Background Image",
          description: "Controls the hero background visual for this page.",
          type: "object",
          fields: visualImageFields(),
        }),
        defineField({
          name: "heroOverlayOpacity",
          title: "Hero Overlay Opacity",
          description: "Use values from 0 to 100.",
          type: "number",
          initialValue: 35,
          validation: (rule) => rule.min(0).max(100),
        }),
        defineField({
          name: "heroEyebrowText",
          title: "Hero Eyebrow Text",
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
      ],
    }),
    defineField({
      name: "visualAssets",
      title: "Visual Settings",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "featuredBackgroundImage",
          title: "Featured Background Image",
          type: "object",
          fields: visualImageFields(),
        }),
        defineField({
          name: "sectionBackgroundImage",
          title: "Section Background Image",
          type: "object",
          fields: visualImageFields(),
        }),
        defineField({
          name: "ctaBackgroundImage",
          title: "CTA Background Image",
          type: "object",
          fields: visualImageFields(),
        }),
      ],
    }),
    defineField({
      name: "styleSettings",
      title: "Style Settings",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "enableDarkModeSection",
          title: "Enable Dark Mode Section",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "enableGradientOverlay",
          title: "Enable Gradient Overlay",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "enableGlassEffect",
          title: "Enable Glass Effect",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "enableParallaxEffect",
          title: "Enable Parallax Effect",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),
  ],
});
