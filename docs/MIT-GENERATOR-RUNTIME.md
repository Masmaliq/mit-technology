# MIT Generator Runtime Architecture

Status: planning and passive registry foundation  
Scope: future generator runtime flow  
Runtime impact: none

This document defines the future Generator Runtime Architecture for MIT Framework V2.

The runtime generator is not implemented yet. This document and the companion registry only describe the intended flow.

## Goal

The Generator Runtime should eventually transform a selected website type into a complete project structure.

Conceptual flow:

```text
Website Type
↓
Preset
↓
Blueprint
↓
Pages
↓
Sections
↓
Content Models
↓
Project Structure
```

## Runtime Steps

### createProject()

Creates the initial project context.

Future inputs:

- Project name
- Client name
- Website type
- Package scope
- Operator notes

Future output:

- Project context object

### resolveWebsiteType()

Finds the selected Website Type from the Website Types Registry.

Future source:

- `lib/website-types.ts`

Future output:

- Website type definition
- Recommended preset

### resolvePreset()

Finds the Design Preset recommended by the Website Type.

Future source:

- `lib/design-presets.ts`

Future output:

- Preset definition
- Visual direction
- Navbar style
- Motion level

### resolveBlueprint()

Finds the Blueprint matching the selected Website Type.

Future source:

- `lib/blueprints.ts`

Future output:

- Blueprint definition
- Preset
- Page list

### resolvePages()

Resolves the page structure from the blueprint or Pages Manager.

Future sources:

- `lib/pages-manager.ts`
- `lib/blueprints.ts`

Future output:

- Page IDs
- Page names
- Slugs
- Page section composition

### resolveSections()

Resolves section definitions used by each page.

Future source:

- `lib/section-library.ts`

Future output:

- Section definitions
- Category
- Complexity
- Motion support
- Sanity readiness

### resolveContentModels()

Resolves expected content fields for each section.

Future source:

- `lib/content-models.ts`

Future output:

- Content model definitions
- Required fields
- Optional fields
- Missing content model warnings

### generateProjectStructure()

Creates the final project structure blueprint.

Future output:

- Project metadata
- Selected website type
- Selected preset
- Pages
- Sections
- Content models
- Readiness warnings

Early versions should generate a draft plan only. They should not create routes, Sanity documents, frontend files, or published content.

## Future Safety Rules

- Generate preview before mutation.
- Never overwrite existing client content automatically.
- Avoid route creation until explicitly confirmed.
- Avoid Sanity document creation until schema is stable.
- Keep all generated output reviewable.
- Treat warnings as guidance, not automatic blockers.

## Relationship With Dashboard V2

Dashboard V2 can use this runtime flow as its backend planning logic in a future phase.

For now:

- Dashboard V2 is only documented.
- Generator Runtime is only documented.
- No existing dashboard behavior changes.

## Relationship With Workbench

Workbench can eventually preview the generated project structure.

For now:

- Workbench is unchanged.
- No integration is performed.

## Roadmap

### Phase 1 - Passive Runtime Flow

- Document runtime steps.
- Create passive registry.
- Do not implement functions yet.

### Phase 2 - Dry Run Generator

- Create a function that returns a blueprint object.
- No file writes.
- No Sanity writes.
- No route changes.

### Phase 3 - Workbench Preview

- Show dry run output in Workbench.
- Compare current client structure with generated structure.

### Phase 4 - Safe Draft Generation

- Generate draft project plans.
- Still no destructive writes.

### Phase 5 - Controlled Runtime Generation

- Add confirmed generation only after review.
- Keep rollback and audit trail.
