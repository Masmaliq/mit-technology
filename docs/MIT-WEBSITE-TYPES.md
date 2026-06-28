# MIT Website Types V2

Status: planning and registry foundation  
Scope: website type to design preset mapping  
Runtime impact: none

This document defines the Website Types Registry for MIT Framework V2.

Website Types are the top-level business classification layer. They help translate a client category into the right design preset, page structure, sections, content models, and future blueprint.

## Core Flow

```text
Client Type
↓
Website Type
↓
Preset
↓
Pages
↓
Sections
↓
Content Models
↓
Blueprint
```

## Why Website Types Matter

Before V2, client adaptation often started from visual preference or existing page structure. That works, but it can make each client feel like a custom rebuild.

Website Types give MIT Framework a clearer starting point:

- What kind of website is this?
- Which preset should be used?
- What pages are typical?
- What clients does this pattern serve?
- Which blueprint can be generated later?

## Relationship With Other Registries

### Design Presets

Website Types point to a recommended design preset.

Example:

- `product-distribution` website type recommends `product-distribution` preset.
- `technology-company` website type recommends `technology-dark` preset.
- `media-journal` website type recommends `luxury-editorial` preset.

### Pages Manager

The preset can later determine recommended pages.

Example:

- Product Distribution pages: Home, About, Products, Distribution, Partnership, Contact.
- Technology Dark pages: Home, Solutions, Case Studies, Packages, Contact.

### Section Library

Pages reference section IDs from the Section Library.

Example:

- Product Distribution home can use `hero-product`, `product-showcase`, `distribution-network`, and `partnership-cta`.

### Content Models

Sections can later reference expected content models.

Example:

- `hero-product` expects title, subtitle, background image, CTA label, and CTA URL.
- `product-grid` expects product name, description, and image.

### Generator Engine

The Generator Engine can later generate a website blueprint from the preset recommended by Website Type.

## Website Type Examples

### PT Pangan Kawan Nusantara

Client type:

- Food distribution
- Supplier
- Trading / distribution network

Website Type:

- `product-distribution`

Recommended preset:

- `product-distribution`

### Chemiko

Client type:

- Manufacturing
- Factory
- Product production
- OEM / ODM potential

Website Type:

- `manufacturing`

Recommended preset:

- `manufacturing-premium`

### MIT Technology

Client type:

- Technology company
- Digital solutions
- Website and system development

Website Type:

- `technology-company`

Recommended preset:

- `technology-dark`

### Narapati

Client type:

- Media
- Journal
- Editorial storytelling

Website Type:

- `media-journal`

Recommended preset:

- `luxury-editorial`

## Initial Website Types

The first Website Types are:

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

## Future Use

Website Types can later help:

- Workbench choose a starting direction.
- Admin show recommended preset.
- Generator Engine produce the right blueprint.
- Client onboarding become faster.
- Proposal package scope become clearer.

## Safety Rules

- Website Types are planning metadata only.
- They do not change frontend behavior.
- They do not change Sanity schema.
- They do not create routes.
- They do not mutate content.
- They should not be used as runtime source until V2 integration is deliberate.
