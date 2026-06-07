export type PortfolioProject = {
  title: string;
  category: string;
  description: string;
  highlights: string[];
  featured?: boolean;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "Narapati Journal",
    category: "Digital Media Platform",
    description:
      "Modern digital journal platform built with editorial structure, responsive layout, and premium publishing experience.",
    highlights: [
      "Editorial Website",
      "Modern Journal Layout",
      "Publishing System",
      "Responsive Design"
    ],
    featured: true
  },
  {
    title: "Chemiko Digital Concept",
    category: "Corporate Export Website",
    description:
      "Corporate website concept for export manufacturing, private label, and product catalog presentation.",
    highlights: [
      "Corporate Website",
      "Export Ready Structure",
      "Product Catalog",
      "Lead Generation"
    ],
    featured: true
  },
  {
    title: "MAK Capital Concept",
    category: "Investment Holding Website",
    description:
      "Premium digital presence concept for an investment holding company with strong corporate identity.",
    highlights: [
      "Holding Company Website",
      "Investor Style Layout",
      "Corporate Branding",
      "Strategic Presentation"
    ]
  },
  {
    title: "MIT Web App Demo",
    category: "Business Application",
    description:
      "Custom dashboard concept for business operation, CRM, reporting, and internal workflow management.",
    highlights: ["Dashboard System", "CRM Concept", "Reporting", "Workflow Management"],
    featured: true
  },
  {
    title: "AI Assistant Demo",
    category: "AI Ecosystem",
    description:
      "AI-powered assistant concept for customer service, knowledge base, automation, and business productivity.",
    highlights: ["AI Chatbot", "Knowledge Base", "Workflow Automation", "Customer Support"]
  }
];

export const featuredPortfolioProjects = portfolioProjects.filter((project) => project.featured);
