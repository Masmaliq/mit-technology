export type DashboardStepId =
  | "project-creation"
  | "website-type"
  | "package"
  | "preset"
  | "blueprint"
  | "pages"
  | "sections"
  | "generate";

export type DashboardStep = {
  id: DashboardStepId;
  title: string;
  description: string;
  inputSource: string[];
  output: string[];
};

export type DashboardFlow = {
  id: string;
  name: string;
  description: string;
  steps: DashboardStep[];
};

export const DASHBOARD_V2_FLOW: DashboardFlow = {
  id: "mit-dashboard-v2-flow",
  name: "MIT Dashboard V2 Flow",
  description:
    "A future guided workflow for turning client context into a reusable website blueprint.",
  steps: [
    {
      id: "project-creation",
      title: "Project Creation",
      description:
        "Create the initial project context before choosing website structure.",
      inputSource: ["Operator input", "Client brief"],
      output: ["Project name", "Client name", "Business category"],
    },
    {
      id: "website-type",
      title: "Website Type Selector",
      description:
        "Select the website type that best matches the client business model.",
      inputSource: ["website-types.ts", "Project context"],
      output: ["Selected website type", "Recommended preset"],
    },
    {
      id: "package",
      title: "Package Selector",
      description:
        "Select commercial scope and expected feature depth.",
      inputSource: ["Package scope", "Client budget", "Operator decision"],
      output: ["Starter, Business, or Premium scope"],
    },
    {
      id: "preset",
      title: "Design Preset Selector",
      description:
        "Confirm the recommended visual direction or choose an approved alternative.",
      inputSource: ["design-presets.ts", "Selected website type"],
      output: ["Selected design preset"],
    },
    {
      id: "blueprint",
      title: "Blueprint Preview",
      description:
        "Preview the recommended website blueprint before any generation step.",
      inputSource: ["blueprints.ts", "generator-engine.ts"],
      output: ["Generated website blueprint"],
    },
    {
      id: "pages",
      title: "Pages Preview",
      description:
        "Review generated pages, slugs, and recommended page structure.",
      inputSource: ["pages-manager.ts", "Generated blueprint"],
      output: ["Approved page list"],
    },
    {
      id: "sections",
      title: "Sections Preview",
      description:
        "Review sections, categories, complexity, motion support, and Sanity readiness.",
      inputSource: ["section-library.ts", "content-models.ts"],
      output: ["Approved section composition"],
    },
    {
      id: "generate",
      title: "Generate Website Flow",
      description:
        "Confirm the final generation step after reviewing project, preset, pages, and sections.",
      inputSource: [
        "Approved page list",
        "Approved section composition",
        "Selected package",
      ],
      output: ["Future draft website plan"],
    },
  ],
};
