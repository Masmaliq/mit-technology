# MIT Section Library V2

Status: planning and registry foundation  
Scope: reusable section catalog for MIT Framework V2  
Runtime impact: none

This document defines the first official Section Library for MIT Framework V2. The library is a catalog of approved section types that can later be used by Design Presets, Website Pages Manager, Workbench, and Admin readiness checks.

The registry in `lib/section-library.ts` is not connected to the frontend, Sanity, dashboard, or Workbench yet.

## What Is The Section Library?

The Section Library is the official list of reusable website sections that MIT Framework can support.

It answers:

- What sections are available?
- What category does each section belong to?
- Which clients or page types is a section recommended for?
- Is the section simple, business-level, or premium?
- Does the section support motion?
- Is it ready for Sanity-driven content?

In V1, sections exist mostly as page components. In V2, sections should become reusable building blocks with clear definitions before they become configurable in CMS.

## Relationship With Design Presets

Design Presets define the visual direction of a website.

Section Library defines the building blocks available to that preset.

Example:

- `product-distribution` preset can recommend `hero-product`, `product-categories`, `distribution-network`, `partnership-cta`, and `contact-basic`.
- `technology-dark` preset can recommend `hero-technology`, `services-featured`, `case-study-grid`, `process-steps`, and `cta-full-width`.
- `luxury-editorial` preset can recommend `hero-editorial`, `about-story`, `gallery-masonry`, and `footer-editorial`.

The preset should not hardcode section rendering. It should only recommend and guide section selection.

## Relationship With Website Pages Manager

In the future, Website Pages Manager should read pages and their section composition.

Future page behavior:

- A page has a list of allowed sections.
- Each section uses an ID from the Section Library.
- Workbench can show whether a page has all required sections.
- Navbar and Footer can still read page visibility, while page content reads selected sections.
- Admin can show section readiness without needing custom logic per client.

The Section Library should become the shared reference between:

- Pages
- Design Presets
- Workbench
- Admin Dashboard
- Sanity content structure
- Public frontend sections

## Section Categories

The V2 Section Library starts with these categories:

- Hero
- About
- Service
- Product
- Distribution
- Partnership
- Process
- Testimonial
- Case Study
- Gallery
- Statistics
- Contact
- CTA
- Footer

## Section Complexity

Each section has a complexity level:

- `simple`: suitable for Starter package and lightweight pages.
- `business`: suitable for Business package and stronger company profiles.
- `premium`: suitable for Premium package, cinematic pages, or more advanced visual direction.

Complexity is not a price by itself. It is a planning signal for scope, timeline, and implementation risk.

## Sanity Readiness

Each section has a `sanityReady` flag.

- `true`: section content can reasonably be represented by existing or straightforward CMS fields.
- `false`: section likely needs future schema, mapping, or implementation before becoming fully CMS-driven.

This does not change schema today. It only documents readiness.

## Motion Support

Each section has a `motionSupport` flag.

- `true`: section can support reveal, stagger, hover, or cinematic motion.
- `false`: section should stay mostly static or only receive global page motion.

Motion support should not mean heavy animation. MIT Framework V2 should keep motion premium, light, and respectful of reduced-motion preferences.

## Initial Section Library

### Hero

- `hero-corporate`
- `hero-manufacturing`
- `hero-product`
- `hero-technology`
- `hero-editorial`
- `hero-store`

### About

- `about-story`
- `about-company`
- `about-mission-vision`
- `about-timeline`

### Service

- `services-grid`
- `services-cards`
- `services-featured`

### Product

- `product-grid`
- `product-categories`
- `product-showcase`

### Distribution

- `distribution-network`
- `distribution-map`

### Partnership

- `partnership-cta`
- `partnership-benefits`

### Process

- `process-timeline`
- `process-steps`
- `process-cards`

### Testimonial

- `testimonial-slider`
- `testimonial-grid`

### Case Study

- `case-study-grid`
- `case-study-featured`

### Gallery

- `gallery-grid`
- `gallery-masonry`

### Statistics

- `statistics-counter`
- `statistics-cards`

### Contact

- `contact-basic`
- `contact-premium`

### CTA

- `cta-simple`
- `cta-corporate`
- `cta-full-width`

### Footer

- `footer-simple`
- `footer-corporate`
- `footer-editorial`

## Roadmap V2

### Phase 1 - Registry Foundation

- Document available sections.
- Create typed registry in `lib/section-library.ts`.
- Do not connect to runtime yet.

### Phase 2 - Preset Recommendations

- Map Design Presets to recommended section IDs.
- Keep the mapping read-only.
- Use it in Workbench first, not public frontend.

### Phase 3 - Pages Manager Integration

- Let Website Pages Manager reference allowed sections.
- Show section readiness per page.
- Keep existing page routes stable.

### Phase 4 - Admin Readiness Layer

- Admin can show which sections are live, static, missing, or future-ready.
- Avoid claiming a section is CMS-driven until it actually reads CMS content.

### Phase 5 - Sanity Section Model

- Only after the section system is proven, decide whether schema changes are needed.
- Add CMS fields gradually and per package scope.

### Phase 6 - Frontend Runtime Integration

- Connect selected sections to frontend rendering.
- Keep fallback behavior safe.
- Preserve existing client websites during migration.

## Safety Rules

- Do not use the Section Library to change existing pages yet.
- Do not create new schemas from this registry automatically.
- Do not make public frontend depend on this file until the V2 model is stable.
- Keep section labels honest: live, static, placeholder, or future-ready.
- Treat this as architecture foundation first, runtime system later.
