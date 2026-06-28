export type RuntimeStepId =
  | "create-project"
  | "resolve-website-type"
  | "resolve-preset"
  | "resolve-blueprint"
  | "resolve-pages"
  | "resolve-sections"
  | "resolve-content-models"
  | "generate-project-structure";

export type RuntimeStep = {
  id: RuntimeStepId;
  functionName: string;
  title: string;
  description: string;
  input: string[];
  output: string[];
};

export type RuntimeFlow = {
  id: string;
  name: string;
  description: string;
  steps: RuntimeStep[];
};

export const GENERATOR_RUNTIME_FLOW: RuntimeFlow = {
  id: "mit-generator-runtime-v2-flow",
  name: "MIT Generator Runtime V2 Flow",
  description:
    "A future passive architecture for resolving website type into a complete project structure blueprint.",
  steps: [
    {
      id: "create-project",
      functionName: "createProject",
      title: "Create Project",
      description:
        "Create the initial project context before resolving website structure.",
      input: ["Project name", "Client name", "Website type", "Package scope"],
      output: ["Project context"],
    },
    {
      id: "resolve-website-type",
      functionName: "resolveWebsiteType",
      title: "Resolve Website Type",
      description:
        "Resolve the selected website type from the Website Types Registry.",
      input: ["Project context", "website-types.ts"],
      output: ["Website type definition", "Recommended preset ID"],
    },
    {
      id: "resolve-preset",
      functionName: "resolvePreset",
      title: "Resolve Preset",
      description:
        "Resolve the design preset recommended by the website type.",
      input: ["Recommended preset ID", "design-presets.ts"],
      output: ["Design preset definition"],
    },
    {
      id: "resolve-blueprint",
      functionName: "resolveBlueprint",
      title: "Resolve Blueprint",
      description:
        "Resolve the website blueprint for the selected website type.",
      input: ["Website type ID", "blueprints.ts"],
      output: ["Blueprint definition"],
    },
    {
      id: "resolve-pages",
      functionName: "resolvePages",
      title: "Resolve Pages",
      description:
        "Resolve page IDs, slugs, names, and page-level section composition.",
      input: ["Blueprint definition", "pages-manager.ts"],
      output: ["Resolved pages"],
    },
    {
      id: "resolve-sections",
      functionName: "resolveSections",
      title: "Resolve Sections",
      description:
        "Resolve section definitions for every section ID used by the pages.",
      input: ["Resolved pages", "section-library.ts"],
      output: ["Resolved section definitions"],
    },
    {
      id: "resolve-content-models",
      functionName: "resolveContentModels",
      title: "Resolve Content Models",
      description:
        "Resolve expected content fields for each section when a content model exists.",
      input: ["Resolved section definitions", "content-models.ts"],
      output: ["Resolved content models", "Missing model warnings"],
    },
    {
      id: "generate-project-structure",
      functionName: "generateProjectStructure",
      title: "Generate Project Structure",
      description:
        "Generate the final project structure blueprint for review.",
      input: [
        "Project context",
        "Website type",
        "Preset",
        "Blueprint",
        "Pages",
        "Sections",
        "Content models",
      ],
      output: ["Generated project structure blueprint"],
    },
  ],
};
