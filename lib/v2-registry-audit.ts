import { CONTENT_MODELS } from "./content-models";
import { DESIGN_PRESETS } from "./design-presets";
import { GENERATOR_ENGINE } from "./generator-engine";
import { PAGE_TEMPLATES } from "./pages-manager";
import { SECTION_LIBRARY } from "./section-library";

export type V2RegistryAuditResult = {
  ok: boolean;
  errors: string[];
  warnings: string[];
  summary: {
    presets: number;
    sections: number;
    pageTemplates: number;
    contentModels: number;
    generators: number;
  };
};

function unique(values: string[]): string[] {
  return Array.from(new Set(values));
}

export function auditV2Registries(): V2RegistryAuditResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const presetIds = new Set(DESIGN_PRESETS.map((preset) => preset.id));
  const sectionIds = new Set(SECTION_LIBRARY.map((section) => section.id));
  const pageTemplatePresetIds = new Set(
    PAGE_TEMPLATES.map((definition) => definition.presetId),
  );
  const generatorPresetIds = new Set(
    GENERATOR_ENGINE.map((definition) => definition.presetId),
  );
  const contentModelSectionIds = new Set(
    CONTENT_MODELS.map((model) => model.id),
  );

  for (const definition of PAGE_TEMPLATES) {
    if (!presetIds.has(definition.presetId)) {
      errors.push(
        `Pages Manager references unknown presetId: ${definition.presetId}`,
      );
    }

    for (const page of definition.pages) {
      for (const sectionId of page.sections) {
        if (!sectionIds.has(sectionId)) {
          errors.push(
            `Pages Manager page ${page.id} references unknown sectionId: ${sectionId}`,
          );
        }
      }
    }
  }

  for (const definition of GENERATOR_ENGINE) {
    if (!presetIds.has(definition.presetId)) {
      errors.push(
        `Generator Engine references unknown presetId: ${definition.presetId}`,
      );
    }

    for (const page of definition.generatedPages) {
      for (const sectionId of page.sections) {
        if (!sectionIds.has(sectionId)) {
          errors.push(
            `Generator Engine page ${page.pageId} references unknown sectionId: ${sectionId}`,
          );
        }
      }
    }
  }

  for (const model of CONTENT_MODELS) {
    if (!sectionIds.has(model.id)) {
      errors.push(`Content Model references unknown sectionId: ${model.id}`);
    }
  }

  for (const section of SECTION_LIBRARY) {
    if (!contentModelSectionIds.has(section.id)) {
      warnings.push(`Section has no content model yet: ${section.id}`);
    }
  }

  for (const preset of DESIGN_PRESETS) {
    if (!pageTemplatePresetIds.has(preset.id)) {
      warnings.push(`Preset has no page template yet: ${preset.id}`);
    }

    if (!generatorPresetIds.has(preset.id)) {
      warnings.push(`Preset has no generator definition yet: ${preset.id}`);
    }
  }

  return {
    ok: errors.length === 0,
    errors: unique(errors),
    warnings: unique(warnings),
    summary: {
      presets: DESIGN_PRESETS.length,
      sections: SECTION_LIBRARY.length,
      pageTemplates: PAGE_TEMPLATES.reduce(
        (total, definition) => total + definition.pages.length,
        0,
      ),
      contentModels: CONTENT_MODELS.length,
      generators: GENERATOR_ENGINE.length,
    },
  };
}
