# MIT Dashboard V2 Architecture

Status: planning and passive registry foundation  
Scope: future Dashboard V2 flow architecture  
Runtime impact: none

This document defines the future Dashboard V2 architecture for MIT Framework.

Dashboard V2 should guide operators through a reusable project generation workflow without replacing the current Admin Control Center until the V2 system is proven.

## Purpose

Dashboard V2 is intended to become the guided setup layer for new client websites.

It should help an operator move from client context to website blueprint:

```text
Project Creation
↓
Website Type
↓
Package
↓
Preset
↓
Blueprint
↓
Pages
↓
Sections
↓
Generate
```

## Core Modules

### New Project Wizard

Captures the basic client setup:

- Project name
- Client name
- Business category
- Target launch scope
- Internal notes

This should remain non-destructive until generation is explicitly confirmed.

### Website Type Selector

Selects the website type:

- Company Profile
- Product Distribution
- Manufacturing
- Technology Company
- Media Journal
- Online Store
- Consulting Firm
- Holding Company
- Export Company
- Startup SaaS

Website Type determines the recommended Design Preset.

### Package Selector

Selects the commercial scope:

- Starter
- Business
- Premium

The selected package controls expectation, not automatic feature mutation at first.

### Design Preset Selector

Shows recommended design preset and optional alternatives.

Examples:

- Corporate Clean
- Product Distribution
- Manufacturing Premium
- Technology Dark
- Luxury Editorial
- Store Lite

### Blueprint Preview

Shows the generated blueprint before anything is created.

Blueprint preview should include:

- Website type
- Preset
- Pages
- Sections
- Content model coverage

### Pages Preview

Shows generated page structure:

- Page name
- Slug
- Recommended sections
- Visibility recommendation
- Package fit

### Sections Preview

Shows section composition:

- Section ID
- Section name
- Category
- Complexity
- Motion support
- Sanity readiness

### Generate Website Flow

The final step confirms generation.

Early V2 should keep this read-only or draft-only. Actual Sanity document creation should only happen after schema and safety rules are stable.

## Future Safety Rules

- Preview before generation.
- Read-only before mutation.
- Draft creation before published creation.
- No route changes without confirmation.
- No schema generation from dashboard.
- No destructive overwrite.
- Clear rollback path.

## Relationship With V2 Registries

Dashboard V2 should eventually read:

- `website-types.ts`
- `design-presets.ts`
- `pages-manager.ts`
- `section-library.ts`
- `content-models.ts`
- `generator-engine.ts`
- `blueprints.ts`
- `v2-registry-audit.ts`

For now, this is only architectural documentation and a passive flow registry.

## Implementation Roadmap

### Phase 1 - Passive Flow Registry

- Document the Dashboard V2 flow.
- Create a passive flow registry.
- Do not connect to the existing dashboard.

### Phase 2 - Workbench Preview

- Let Workbench display the V2 flow in read-only mode.
- Show selected website type, preset, and blueprint.

### Phase 3 - Admin Preview

- Add a V2 preview panel to Admin only after the flow is stable.
- Keep existing Admin Control Center unchanged.

### Phase 4 - Draft Generator

- Generate draft plans only.
- Do not create public routes or published Sanity documents automatically.

### Phase 5 - Safe Website Generation

- Add confirmed generation with clear warnings.
- Create only approved documents.
- Preserve existing client websites.
