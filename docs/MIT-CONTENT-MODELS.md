# MIT Content Models V2

Status: planning and registry foundation  
Scope: passive content field definitions for MIT Framework V2 sections  
Runtime impact: none

This document defines the first Content Model Registry for MIT Framework V2.

The goal is to describe what fields each reusable section needs before changing Sanity schema, frontend rendering, dashboard logic, or Workbench behavior.

## Purpose

MIT Framework V2 now has three passive planning layers:

```text
Design Presets
↓
Pages Manager
↓
Section Library
```

Content Models add the next layer:

```text
Section
↓
Required Content Fields
```

This makes future schema and frontend decisions safer because the expected content contract is documented first.

## What This Registry Does

The Content Model Registry defines:

- Which fields a section needs.
- What field type each field uses.
- Whether the field is required.
- Short guidance for editors and implementers.

## What This Registry Does Not Do

This registry does not:

- Change Sanity schema.
- Render frontend sections.
- Create routes.
- Change dashboard or Workbench behavior.
- Validate live content.
- Save or mutate data.

It is only a planning contract.

## Field Types

The first supported field types are:

- `text`
- `textarea`
- `image`
- `video`
- `url`
- `number`
- `boolean`
- `array`

These types are intentionally simple. They are meant to guide future Sanity schema design without forcing a schema implementation today.

## Initial Content Models

The first registry covers core reusable sections:

- `hero-corporate`
- `hero-product`
- `hero-manufacturing`
- `about-story`
- `about-company`
- `product-grid`
- `product-categories`
- `distribution-map`
- `testimonial-grid`
- `contact-basic`
- `footer-corporate`

## Example Model

### hero-product

Recommended fields:

- `title`
- `subtitle`
- `backgroundImage`
- `ctaLabel`
- `ctaUrl`

This supports a product-forward hero for distribution, supplier, FMCG, or catalog websites.

### product-grid

Recommended fields:

- `productName`
- `description`
- `image`

This supports product card rendering in a future Product Grid section.

### distribution-map

Recommended fields:

- `province`
- `city`
- `partnerName`
- `description`

This supports distribution network and regional partner communication.

## Roadmap

### Phase 1 - Registry Foundation

- Define passive content models.
- Keep runtime untouched.
- Keep Sanity schema untouched.

### Phase 2 - Compare With Existing Sanity Schemas

- Audit which fields already exist.
- Identify gaps.
- Avoid adding schema until the reusable pattern is proven.

### Phase 3 - Workbench Read-Only Mapping

- Workbench can show expected fields per section.
- Missing content can be labeled as readiness guidance only.

### Phase 4 - Sanity Schema Planning

- Add fields gradually only when needed.
- Prefer shared field groups where patterns repeat.

### Phase 5 - Frontend Integration

- Connect content models to frontend rendering only after section contracts are stable.
- Keep existing pages safe during migration.

## Safety Rules

- Documentation before schema.
- Registry before runtime.
- Read-only before mutation.
- No public UI should depend on this registry yet.
- No admin feature should claim live control until it is connected deliberately.
