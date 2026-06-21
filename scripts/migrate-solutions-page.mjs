import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-06-06" });

function isBlank(value) {
  return value === undefined || value === null || value === "";
}

const defaults = {
  heroEyebrow: "MIT SOLUTIONS",
  heroTitle: "Technology Solutions Built For Modern Organizations",
  heroDescription:
    "Kami membantu organisasi membangun website, aplikasi, platform digital, dan sistem internal yang mendukung pertumbuhan bisnis.",
  sectionEyebrow: "SOLUTIONS",
  sectionTitle: "What We Do Best",
  sectionDescription:
    "Kami membantu perusahaan membangun website premium, automasi AI, dan strategi teknologi yang rapi, modern, dan siap berkembang.",
  solutionCards: [
    {
      _type: "object",
      title: "Web Design & Development",
      description: "Website premium yang dirancang cepat, rapi, dan mudah dikembangkan.",
      icon: "website",
      linkLabel: "View Solution",
      linkUrl: "/solutions",
      order: 1,
    },
    {
      _type: "object",
      title: "AI Automation",
      description: "Automasi proses bisnis menggunakan sistem digital dan artificial intelligence.",
      icon: "ai",
      linkLabel: "View Solution",
      linkUrl: "/solutions",
      order: 2,
    },
    {
      _type: "object",
      title: "Digital Strategy",
      description: "Strategi teknologi yang membantu perusahaan mengambil keputusan digital dengan lebih terarah.",
      icon: "strategy",
      linkLabel: "View Solution",
      linkUrl: "/solutions",
      order: 3,
    },
  ],
  ctaEyebrow: "START YOUR PROJECT",
  ctaTitle: "Siap membangun solusi digital yang lebih serius?",
  ctaDescription: "Diskusikan kebutuhan perusahaan Anda bersama tim MIT Technology.",
  ctaButtonLabel: "Schedule Consultation",
  ctaButtonUrl: "/contact",
};

let page = await client.fetch(`*[_type == "solutionsPage" && _id == "solutionsPage"][0]{
  ...
}`);

if (!page) {
  page = {
    _id: "solutionsPage",
    _type: "solutionsPage",
  };

  await client.createOrReplace(page);
  console.log("Created Solutions Page singleton.");
}

const patch = {};

for (const key of ["heroEyebrow", "heroTitle", "heroDescription", "ctaEyebrow", "ctaTitle", "ctaDescription", "ctaButtonLabel", "ctaButtonUrl"]) {
  if (isBlank(page[key])) {
    patch[key] = defaults[key];
  }
}

if (isBlank(page.sectionEyebrow)) {
  patch.sectionEyebrow = page.introEyebrow || defaults.sectionEyebrow;
}

if (isBlank(page.sectionTitle)) {
  patch.sectionTitle = page.introTitle || defaults.sectionTitle;
}

if (isBlank(page.sectionDescription)) {
  patch.sectionDescription = page.introDescription || defaults.sectionDescription;
}

if (!page.solutionCards?.length) {
  patch.solutionCards = defaults.solutionCards;
}

const cleanPatch = Object.fromEntries(
  Object.entries(patch).filter(([, value]) => value !== undefined && value !== null && value !== "")
);

if (Object.keys(cleanPatch).length === 0) {
  console.log("Solutions Page migration: no missing fields found.");
  process.exit(0);
}

await client.patch("solutionsPage").set(cleanPatch).commit();

console.log("Solutions Page migration completed.");
console.log(Object.keys(cleanPatch).sort().join("\n"));
