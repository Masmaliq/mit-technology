# MIT Website Pages Manager V2

Status: planning and registry foundation  
Scope: design preset to pages to sections mapping  
Runtime impact: none

This document defines the first Website Pages Manager registry for MIT Framework V2. It connects design presets to page templates, and page templates to section IDs from the Section Library.

The registry in `lib/pages-manager.ts` is not connected to the frontend, Sanity, dashboard, Workbench, or routing system yet.

## Core Concept

MIT Framework V2 should treat website structure as a reusable system:

```text
Design Preset
↓
Pages
↓
Sections
```

This means:

- A design preset recommends a website structure.
- A website structure contains page templates.
- A page template contains section IDs.
- Section IDs reference the official Section Library.

This gives MIT Framework a reusable planning layer before any frontend rendering or CMS mutation exists.

## Relationship With Existing V2 Registries

### `lib/design-presets.ts`

Defines available visual directions:

- Corporate Clean
- Product Distribution
- Manufacturing Premium
- Technology Dark
- Luxury Editorial
- Store Lite

Each preset describes the client type, visual tone, navbar style, hero style, motion level, recommended sections, and package fit.

### `lib/section-library.ts`

Defines available reusable section definitions:

- Hero sections
- About sections
- Services sections
- Product sections
- Distribution sections
- Partnership sections
- Process sections
- Testimonials
- Case studies
- Gallery
- Statistics
- Contact
- CTA
- Footer

### `lib/pages-manager.ts`

Connects a design preset to page templates.

Each page template defines:

- Page ID
- Page name
- Slug
- Description
- Design preset ID
- Section IDs

This file is the first draft of a future page composition system.

## Why This Matters

Without a Pages Manager, adapting MIT Framework to each client requires manual decisions:

- Which pages should exist?
- Which section belongs on each page?
- Which pages should be shown for each business type?
- Which structure fits a package scope?

With Pages Manager, those decisions can become reusable.

Example:

- Product Distribution preset can include Home, About, Products, Distribution, Partnership, and Contact.
- Technology Dark can include Home, Solutions, Case Studies, Packages, and Contact.
- Store Lite can include Home, Products, Supplier, and Contact.

## Initial Page Templates

### Corporate Clean

Pages:

- Home
- About
- Services
- Contact

Recommended use:

- General company profiles
- Consulting
- Holding companies
- Service businesses

### Product Distribution

Pages:

- Home
- About
- Products
- Distribution
- Partnership
- Contact

Recommended use:

- Food distribution
- Suppliers
- FMCG
- Trading businesses

### Manufacturing Premium

Pages:

- Home
- Factory
- OEM
- Product Categories
- Contact

Recommended use:

- Factories
- OEM
- ODM
- Private label
- Industrial businesses

### Technology Dark

Pages:

- Home
- Solutions
- Case Studies
- Packages
- Contact

Recommended use:

- Technology companies
- AI
- Software
- Automation
- Internal systems

### Luxury Editorial

Pages:

- Home
- Journal
- Photography
- About
- Contact

Recommended use:

- Media
- Journal
- Photography
- Premium storytelling

### Store Lite

Pages:

- Home
- Products
- Supplier
- Contact

Recommended use:

- Simple stores
- Product catalogs
- WhatsApp inquiry businesses

## Future Behavior

In a later V2 phase, Pages Manager can become the source for:

- Navbar items
- Footer navigation
- Workbench page mapping
- Admin page readiness
- Section readiness
- SEO checklist
- Package scope validation

For now, it is only a planning registry.

## Roadmap V2

### Phase 1 - Registry Foundation

- Create design preset registry.
- Create section library registry.
- Create pages manager registry.
- Keep all registries passive.

### Phase 2 - Workbench Read-Only Integration

- Let Workbench read the selected preset.
- Show recommended pages for that preset.
- Show recommended sections per page.
- Do not mutate data.

### Phase 3 - Admin Readiness Integration

- Let admin show page and section readiness based on registry definitions.
- Label items as connected, static, placeholder, or future-ready.

### Phase 4 - CMS Model Planning

- Compare registry needs with current Sanity schemas.
- Avoid schema changes until the reusable model is proven.
- Add only the smallest needed fields.

### Phase 5 - Runtime Integration

- Let frontend read page composition only after page and section contracts are stable.
- Keep fallback behavior safe.
- Preserve existing routes during migration.

### Phase 6 - Navbar and Footer Integration

- Let navbar read page visibility.
- Let footer read page visibility.
- Keep manual override for special clients.

## Safety Rules

- Do not use this registry to render frontend yet.
- Do not use this registry to create Sanity documents yet.
- Do not use this registry to change routes yet.
- Do not assume every section is live just because it is listed.
- Treat this as a planning layer until connected deliberately.
