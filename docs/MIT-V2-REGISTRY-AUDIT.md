# MIT V2 Registry Audit

Status: passive audit utility  
Scope: consistency check for MIT Framework V2 registries  
Runtime impact: none

This document explains the passive registry audit for MIT Framework V2.

The audit exists to make sure the V2 planning registries stay consistent before they are connected to Workbench, Admin Dashboard, Sanity, or public frontend runtime.

## Registries Covered

The audit checks these V2 registries:

- `lib/design-presets.ts`
- `lib/section-library.ts`
- `lib/pages-manager.ts`
- `lib/content-models.ts`
- `lib/generator-engine.ts`

## What The Audit Checks

The audit verifies:

1. Every `presetId` in Pages Manager exists in Design Presets.
2. Every `presetId` in Generator Engine exists in Design Presets.
3. Every `sectionId` used in Pages Manager exists in Section Library.
4. Every `sectionId` used in Generator Engine exists in Section Library.
5. Every `sectionId` in Content Models exists in Section Library.
6. Sections that do not yet have a content model.
7. Presets that do not yet have a page template.
8. Presets that do not yet have a generator definition.

## Audit Output

The exported function is:

```ts
auditV2Registries()
```

It returns:

```ts
{
  ok: boolean,
  errors: string[],
  warnings: string[],
  summary: {
    presets: number,
    sections: number,
    pageTemplates: number,
    contentModels: number,
    generators: number
  }
}
```

## Error vs Warning

Errors mean the registry is structurally inconsistent.

Examples:

- A page template references a preset that does not exist.
- A generator definition references a section that does not exist.
- A content model references an unknown section.

Warnings mean the system is incomplete but still valid for planning.

Examples:

- A valid section does not yet have a content model.
- A valid preset does not yet have a page template.
- A valid preset does not yet have a generator definition.

## Current Expected State

At this stage, warnings are expected because Content Models intentionally cover only the first core sections.

That is healthy for V2 planning:

- The full Section Library is broader than the initial Content Models.
- Runtime is not connected.
- Sanity schema is not changed.
- Dashboard and Workbench are not changed.

## Future Use

In a later V2 phase, this audit can be used by:

- Workbench readiness checks.
- Admin Dashboard registry status.
- CI checks for registry consistency.
- Documentation validation before adding new presets or sections.

## Safety Rules

- Do not import this audit into frontend runtime yet.
- Do not use it to mutate files or Sanity data.
- Do not use warnings as blockers during early V2 planning.
- Treat it as a passive consistency report until integration is deliberately planned.
