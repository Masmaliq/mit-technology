# MIT Sanity Mapping Architecture V2

Status: planning and passive registry foundation  
Scope: conceptual mapping between MIT V2 registries and future Sanity structure  
Runtime impact: none

This document defines the Sanity Mapping Architecture for MIT Framework V2.

It explains how the V2 registries can eventually connect to Sanity without changing existing schemas today.

## Purpose

MIT Framework V2 has passive registries for:

- Website Types
- Design Presets
- Pages Manager
- Section Library
- Content Models
- Generator Engine
- Blueprints
- Dashboard V2
- Generator Runtime

Sanity Mapping adds the conceptual bridge:

```text
Section
↓
Schema
↓
Fields
↓
Documents
↓
Studio Structure
```

## 1. Mapping Section To Schema

Each reusable section can eventually map to a Sanity schema.

Examples:

- `hero-corporate` -> `heroSection`
- `about-story` -> `storySection`
- `product-grid` -> `productSection`
- `distribution-map` -> `distributionSection`
- `testimonial-grid` -> `testimonialSection`
- `contact-basic` -> `contactSection`
- `footer-corporate` -> `footerSection`

This does not mean these schemas exist today. It only defines the recommended future names.

## 2. Mapping Schema To Fields

Each schema should map to fields from Content Models.

Example:

`heroSection` can contain:

- `eyebrow`
- `title`
- `subtitle`
- `backgroundImage`
- `ctaLabel`
- `ctaUrl`

`productSection` can contain:

- `productName`
- `description`
- `image`
- `ctaUrl`

`distributionSection` can contain:

- `province`
- `city`
- `partnerName`
- `description`

## 3. Mapping Page To Required Documents

Each page can eventually require a page settings document and section documents.

Example:

Product Distribution home page:

- `homepage`
- `heroSection`
- `productSection`
- `distributionSection`
- `partnershipSection`
- `ctaSection`

Contact page:

- `contact`
- `contactSection`

## 4. Mapping Preset To Required Schemas

Each preset can imply which schema groups are likely needed.

Example:

Product Distribution preset can require:

- `heroSection`
- `productSection`
- `distributionSection`
- `partnershipSection`
- `contactSection`
- `footerSection`

Technology Dark preset can require:

- `heroSection`
- `serviceSection`
- `processSection`
- `caseStudySection`
- `ctaSection`
- `contactSection`

## 5. Mapping Blueprint To Sanity Structure

Blueprints can eventually generate a suggested Studio structure.

Example:

Product Distribution blueprint:

```text
Halaman Website
- Beranda
- Tentang Kami
- Produk
- Distribusi
- Kemitraan
- Kontak

Konten
- Product Items
- Distribution Areas
- Testimonials
- Client Logos

Pengaturan Website
- Site Settings
- Navbar
- Footer
- Contact
- SEO
```

This should remain a suggestion until runtime generation is deliberately implemented.

## Future Roadmap

### Phase 1 - Passive Mapping

- Document section to schema mapping.
- Create a passive registry.
- Do not change current schemas.

### Phase 2 - Schema Gap Audit

- Compare mapping with existing Sanity schemas.
- Identify missing fields or duplicated concepts.
- Do not auto-generate schema.

### Phase 3 - Workbench Readiness

- Show which blueprint sections have a mapped schema.
- Show which schemas are live, missing, or future-ready.

### Phase 4 - Studio Structure Planning

- Use blueprint mapping to suggest client-friendly Studio groups.
- Keep existing Studio structure stable until approved.

### Phase 5 - Controlled Schema Evolution

- Add new schema only when repeated client patterns prove the need.
- Keep migration safe and explicit.

## Safety Rules

- This document does not modify Sanity.
- Registry mapping does not create schema.
- Mapping names are future recommendations.
- Existing schemas should not be renamed automatically.
- No public frontend should depend on this mapping yet.
