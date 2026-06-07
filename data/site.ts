import { routes } from "@/lib/routes";

export const site = {
  name: "MIT",
  fullName: "Maliq Ibrahim Technology",
  tagline: "Digital systems for growing companies",
  email: "hello@maligibrahim.tech",
  location: "Jakarta, Indonesia"
};

export const siteNavigation = routes.slice(0, 5);

export const trustMetrics = [
  { value: "12+", label: "Digital product tracks delivered" },
  { value: "4", label: "Core solution verticals" },
  { value: "30 hari", label: "Typical launch sprint" },
  { value: "99.9%", label: "Availability mindset from day one" }
];

export const trustedBy = [
  "Founder-led businesses",
  "Professional services",
  "Retail operations",
  "Education brands",
  "Local enterprises"
];

export const solutions = [
  {
    title: "Company Profile Systems",
    href: "/company-profile",
    description:
      "Corporate websites that clarify positioning, build authority, and turn visitors into qualified conversations.",
    outcomes: ["Brand credibility", "Lead capture", "SEO-ready structure"]
  },
  {
    title: "Ecommerce Infrastructure",
    href: "/ecommerce",
    description:
      "Conversion-focused storefronts with clean catalogs, checkout flows, and operational foundations.",
    outcomes: ["Product discovery", "Checkout clarity", "Growth analytics"]
  },
  {
    title: "Web App Platforms",
    href: "/web-app",
    description:
      "Custom dashboards, portals, and workflow systems for teams that need software tailored to their process.",
    outcomes: ["Role-based flows", "Data visibility", "Scalable modules"]
  },
  {
    title: "AI Ecosystem",
    href: "/ai-ecosystem",
    description:
      "AI-assisted workflows, internal copilots, and automations that reduce repetitive work across operations.",
    outcomes: ["Workflow automation", "Knowledge access", "Operational leverage"]
  }
];

export const processSteps = [
  {
    step: "01",
    title: "Diagnose",
    description: "Map business goals, audience trust gaps, and the digital system that should exist."
  },
  {
    step: "02",
    title: "Architect",
    description: "Define information architecture, conversion paths, and technical foundation before design."
  },
  {
    step: "03",
    title: "Build",
    description: "Ship responsive, maintainable interfaces with clean components and measurable flows."
  },
  {
    step: "04",
    title: "Optimize",
    description: "Review performance, analytics signals, and iteration priorities after launch."
  }
];

export const testimonials = [
  {
    quote:
      "MIT helped us turn a scattered online presence into a corporate website that finally explains our value clearly.",
    name: "Raka Pradipta",
    role: "Managing Partner, Advisory Firm"
  },
  {
    quote:
      "The process felt strategic from day one. We did not just get pages; we got a cleaner digital sales system.",
    name: "Nadia Putri",
    role: "Founder, Retail Brand"
  }
];
