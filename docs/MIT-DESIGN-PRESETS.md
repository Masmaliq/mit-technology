# MIT Design Presets Library

Status: planning and registry foundation  
Scope: MIT Framework V2 design presets  
Runtime impact: none

This document defines the first reusable design preset library for MIT Framework V2. The goal is to make client adaptation more structured, so a website can shift visual direction without rebuilding every page from scratch.

The presets below are not connected to the public frontend yet. They are intended as a reference for future page, navbar, section, and workbench decisions.

## Why Design Presets Matter

MIT Framework V1 already has CMS fields, admin panels, and reusable components. The missing layer is a clear design system that answers:

- What visual direction fits this client?
- Which navbar style should be used?
- Which section types are recommended?
- How strong should motion be?
- Which package tier supports the requested experience?

MIT Framework V2 should use design presets to make those choices reusable.

## Preset Model

Each preset should define:

- ID
- Name
- Description
- Suitable client types
- Color direction
- Typography direction
- Navbar style
- Hero style
- Motion level
- Recommended sections
- Package fit

## Presets

### 1. Corporate Clean

ID: `corporate-clean`

Best for:

- General company profiles
- Consulting firms
- Holding companies
- Service businesses

Visual direction:

- White and soft gray surfaces.
- Navy or blue accents.
- Clean spacing.
- Clear hierarchy.
- Low visual noise.

Recommended sections:

- Hero Corporate
- About Summary
- Services Grid
- Process
- Testimonials
- Contact CTA

Package fit:

- Starter
- Business
- Premium

Use this preset when the client needs a trustworthy business website that feels professional, simple, and easy to scan.

### 2. Product Distribution

ID: `product-distribution`

Best for:

- Food companies
- Distribution businesses
- Suppliers
- FMCG
- Trading businesses

Visual direction:

- White base.
- Dark green authority color.
- Cream and soft gold warmth.
- Product-forward layout.
- Practical, trustworthy tone.

Recommended sections:

- Product Hero
- Product Categories
- Distribution Network
- Partnership CTA
- Contact

Package fit:

- Starter
- Business
- Premium

Use this preset when products, supply chain, network, and partnership trust are the main story.

### 3. Manufacturing Premium

ID: `manufacturing-premium`

Best for:

- Factories
- OEM businesses
- ODM businesses
- Private label producers
- Industrial companies

Visual direction:

- White base.
- Dark slate.
- Industrial gray.
- Green or blue accent.
- Facility and capability oriented.

Recommended sections:

- Factory Hero
- Capability
- Services / OEM ODM
- Product Categories
- Factory Gallery
- Contact

Package fit:

- Business
- Premium

Use this preset when the client needs to show production credibility, facility readiness, export capability, or private-label services.

### 4. Technology Dark

ID: `technology-dark`

Best for:

- Technology companies
- AI companies
- Software teams
- Internal system providers
- Automation businesses

Visual direction:

- Dark navy.
- Blue glow.
- White text.
- Cinematic contrast.
- Controlled motion.

Recommended sections:

- Tech Hero
- Solutions
- Case Studies
- Process
- Packages
- CTA

Package fit:

- Business
- Premium

Use this preset when the brand needs to feel technical, modern, cinematic, and system-driven.

### 5. Luxury Editorial

ID: `luxury-editorial`

Best for:

- Media brands
- Journals
- Photography-led brands
- Premium storytelling
- Founder-led editorial websites

Visual direction:

- Off-white background.
- Black typography.
- Serif or editorial typography direction.
- Large whitespace.
- Fewer cards.

Recommended sections:

- Editorial Hero
- Featured Story
- Category Grid
- Video / Photography
- Newsletter / Contact

Package fit:

- Business
- Premium

Use this preset when content, atmosphere, image selection, and editorial rhythm matter more than dense UI.

### 6. Store Lite

ID: `store-lite`

Best for:

- Simple stores
- Product catalogs
- Lightweight marketplace-style websites
- WhatsApp-driven product inquiries

Visual direction:

- Clean commerce layout.
- Product cards.
- Clear categories.
- Strong inquiry CTA.
- Practical mobile browsing.

Recommended sections:

- Commerce Hero
- Product Categories
- Featured Products
- Supplier CTA
- Contact / WhatsApp

Package fit:

- Starter
- Business
- Premium

Use this preset when the client needs product browsing and inquiry behavior without a full e-commerce system.

## Future Integration Notes

The registry in `lib/design-presets.ts` is intentionally not connected to the frontend yet.

Future safe integration path:

1. Use presets in Workbench as read-only guidance.
2. Let Admin show selected preset status.
3. Add a client-level preset selection field only after the model is stable.
4. Map preset to navbar style, hero style, and section recommendations.
5. Only then connect visual tokens to public frontend.

## Safety Rules

- Presets should not overwrite client content.
- Presets should not force routes or schemas.
- Presets should describe design direction before controlling implementation.
- Presets should support graceful fallback.
- Presets should stay reusable across clients.
