# MIT Generator Engine V2

Status: planning and registry foundation  
Scope: passive website blueprint generator  
Runtime impact: none

This document defines the first Generator Engine Registry for MIT Framework V2.

The Generator Engine is a planning layer that can produce a website blueprint from a selected design preset. It does not render frontend pages, create routes, write Sanity documents, or change dashboard behavior.

## Position In MIT Framework V2

MIT Framework V2 now has these passive layers:

```text
Design Presets
↓
Pages Manager
↓
Section Library
↓
Content Models
↓
Generator Engine
```

The Generator Engine is the first layer that combines the previous registries into a website blueprint.

## Relationship With Design Presets

Design Presets define the website's visual and business direction.

Examples:

- `corporate-clean`
- `product-distribution`
- `manufacturing-premium`
- `technology-dark`
- `luxury-editorial`
- `store-lite`

The Generator Engine uses a selected preset ID to choose the recommended page structure.

## Relationship With Pages Manager

Pages Manager defines possible pages for each preset.

The Generator Engine turns those planning ideas into a blueprint shape:

```text
Preset
↓
Generated pages
```

It does not create routes. It only describes which pages should exist for a preset.

## Relationship With Section Library

Every generated page contains section IDs from the Section Library.

Example:

```text
home
↓
hero-product
product-showcase
distribution-network
partnership-cta
cta-corporate
```

The Generator Engine should only use section IDs that exist in `lib/section-library.ts`.

## Relationship With Content Models

Content Models define expected fields for sections.

Future behavior:

- Generator Engine creates a page blueprint.
- Each page has section IDs.
- Each section ID can be matched to a content model.
- Workbench can show missing content fields before implementation.

Current behavior:

- No runtime lookup is connected.
- No validation is performed.
- No schema is changed.

## Example Generate Flow

Example: generating a Product Distribution blueprint.

Input:

```ts
generateBlueprint("product-distribution")
```

Conceptual output:

```ts
{
  presetId: "product-distribution",
  pages: [
    {
      pageId: "home",
      sections: [
        "hero-product",
        "product-showcase",
        "distribution-network",
        "partnership-cta",
        "cta-corporate"
      ]
    },
    {
      pageId: "products",
      sections: ["product-categories", "product-grid"]
    }
  ]
}
```

This output is only a blueprint. It does not modify a website.

## Future Dashboard Integration

In a future V2 phase, the Admin Dashboard can use this registry to:

- Show selected preset.
- Show recommended pages.
- Show recommended sections.
- Compare live website pages against blueprint.
- Mark items as connected, static, missing, or future-ready.

This should start as read-only.

## Future Sanity Integration

In a future V2 phase, Sanity can use this registry to:

- Suggest initial page documents.
- Suggest section groups.
- Map required fields from Content Models.
- Guide editors without exposing developer terminology.

No Sanity schema should be changed until the blueprint model is proven.

## Roadmap

### Phase 1 - Passive Registry

- Create Generator Engine definitions.
- Keep it disconnected from runtime.
- Keep frontend, dashboard, Workbench, and Sanity unchanged.

### Phase 2 - Workbench Preview

- Let Workbench display a generated blueprint.
- Compare selected client structure against recommended preset structure.
- Keep all output read-only.

### Phase 3 - Admin Readiness

- Let Admin show whether generated pages and sections exist.
- Avoid automatic mutation or route creation.

### Phase 4 - Sanity Planning

- Use the blueprint to plan page and section content models.
- Add fields only after repeated client patterns are proven.

### Phase 5 - Runtime Rendering

- Connect blueprint to public rendering only after page, section, and content contracts are stable.
- Preserve existing routes during migration.

## Safety Rules

- Do not import Generator Engine into frontend yet.
- Do not use it to create routes.
- Do not use it to create Sanity documents.
- Do not use it to mutate data.
- Do not claim generated sections are live.
- Treat output as planning blueprint only.
