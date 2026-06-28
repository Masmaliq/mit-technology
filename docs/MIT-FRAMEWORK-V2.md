# MIT Framework V2 Architecture Blueprint

Status: planning only  
Scope: reusable website framework architecture  
Branch context: client adaptation learning from PT Pangan Kawan Nusantara

This document is a blueprint, not an implementation task. It should guide future work without forcing immediate schema, route, dashboard, or frontend changes.

## 1. Vision

MIT Framework V2 is intended to become a reusable company profile and business website system that can adapt to different clients without rebuilding the website from scratch.

The core goal is to separate four layers clearly:

- Content: what the client writes and uploads.
- Pages: what pages exist, what they are called, and where they appear.
- Design: what visual preset, navbar style, section rhythm, and tone the website uses.
- Features: what the selected package enables.

### Goals

- Make client adaptation faster and safer.
- Let pages, navbar, footer, and workbench read from the same page source.
- Make design choices reusable through presets instead of one-off redesigns.
- Keep the public website stable while allowing client-specific variation.
- Support multiple industries such as technology, distribution, manufacturing, services, luxury, and lightweight commerce.

### MIT V1 vs MIT V2

| Area | MIT V1 | MIT V2 |
| --- | --- | --- |
| CMS | Has page settings and collections, but some parts are still framework-specific | Pages, sections, navbar, footer, and workbench share a clearer source of truth |
| Admin | Strong control center, mostly read-only/status based | Admin becomes operational layer for page readiness, design preset, and package scope |
| Design | Premium but adapted manually per client | Preset-driven visual system with reusable layout patterns |
| Navbar | CMS-driven, but not fully page-source driven | Reads from Pages Manager with style presets |
| Sections | Built as components per page | Organized as reusable section library |
| Client adaptation | Requires careful manual mapping | Starts from package, pages, design preset, and section selection |

## 2. Package Scope

The package scope defines which systems are enabled for each client tier. It should guide implementation, quoting, admin visibility, and handoff expectations.

### Starter - 5 juta

Best for simple business presence.

Included scope:

- Core pages: Home, About, Products / Services, Contact.
- Basic navbar and footer.
- Basic Sanity content editing.
- Basic SEO fields.
- Contact information and WhatsApp CTA.
- Simple section structure.
- Responsive desktop and mobile layout.

Not included by default:

- Advanced motion controls.
- Product parallax.
- Complex page manager automation.
- Large content library.
- Custom design preset development.

### Business - 10 juta

Best for growing companies that need trust, structure, and clearer business communication.

Included scope:

- Starter scope.
- Distribution / Network page or section.
- Partnership page or section.
- Testimonials.
- Client logos.
- Process / workflow section.
- More flexible section ordering.
- Stronger SEO readiness.
- Admin readiness dashboard.
- Content source status for main pages.

Optional depending on client:

- Case studies.
- Gallery.
- Multi-category product or service grid.

### Premium - 15 juta

Best for companies that need a more cinematic, premium, or brand-led digital presence.

Included scope:

- Business scope.
- Premium hero treatment.
- Background scene system.
- Code-level motion system.
- Cinematic video / image background support.
- Advanced section composition.
- Richer visual hierarchy.
- Premium design preset.
- Product showcase / parallax blueprint if relevant.
- More complete Workbench readiness layer.

Optional depending on client:

- Product parallax live integration.
- Custom visual scene.
- Advanced gallery.
- Industry-specific landing pages.

## 3. Page System

MIT Framework V2 should treat pages as a first-class system. Pages should not only be routes; they should become reusable records that drive navbar, footer, admin, and workbench state.

### Core Page Types

- Home
- About
- Products / Services
- Distribution / Network
- Partnership
- Contact
- Custom Page

### Recommended Page Fields

Future page records should support:

- Page number
- Page display name
- Menu label
- Slug
- Page type
- Page status
- Show in navbar
- Show in footer
- Sort order
- Short admin description
- Hero title
- Hero description
- Hero image / video
- SEO title
- SEO description
- Section list

### Page Behavior

- Home should always be available.
- About should be standard for company profile clients.
- Products / Services should adapt by industry.
- Distribution / Network should be available for distribution, logistics, retail, and supplier businesses.
- Partnership should be available for B2B, vendor, reseller, and channel businesses.
- Contact should be easy to edit and should share data with Site Settings where possible.
- Custom Page should support future client-specific needs without creating a new schema for every case.

## 4. Navbar System

The navbar should be controlled by page source, brand setting, and visual preset. It should not need one-off hardcoding per client.

### Navbar Variants

#### Classic Corporate

Best for professional company profiles.

- Logo left.
- Menu center or right.
- CTA right.
- Works on white or soft backgrounds.

#### Logo Mark

Best for brands with strong symbol logos.

- Compact logo mark.
- Supports horizontal or square logo safely.
- Avoids forced circular crop unless selected.

#### Minimal

Best for editorial or premium service websites.

- Fewer menu items.
- Lightweight surface.
- Subtle CTA.

#### Transparent

Best for cinematic hero pages.

- Glass or transparent navbar over hero.
- Scroll state becomes more solid.
- Requires text contrast safety.

#### Commerce

Best for product-heavy or store-lite websites.

- Product/category-oriented navigation.
- Contact or inquiry CTA.
- Can later support catalog/cart-like flows if needed.

### Navbar Source Rules

Future rule:

- Pages determine available menu items.
- Navbar setting determines which pages are shown.
- Design preset determines navbar style.
- Manual navbar override remains available for edge cases.

## 5. Section Library

The section library should become the reusable building block system for V2. Each section should define what content it needs, where it can appear, and which package unlocks it.

### Core Sections

#### Hero

Purpose:

- First impression.
- Brand positioning.
- Main visual and CTA.

Inputs:

- Eyebrow
- Title
- Description
- Primary CTA
- Secondary CTA
- Background image / video
- Overlay
- Optional motion layer

#### Text + Image

Purpose:

- Story, company introduction, product explanation, or partnership explanation.

Inputs:

- Eyebrow
- Title
- Body
- Image
- Image position

#### Product Grid

Purpose:

- Product catalog preview, services grid, or business scope.

Inputs:

- Section title
- Intro
- Items
- Category
- Image
- CTA

#### Process

Purpose:

- Workflow, distribution process, service process, production steps.

Inputs:

- Steps
- Step number
- Step title
- Step description

#### Metrics

Purpose:

- Business proof and credibility.

Inputs:

- Number
- Label
- Description

#### Testimonials

Purpose:

- Social proof.

Inputs:

- Quote
- Client name
- Role / company
- Avatar / logo
- Rating if relevant

#### CTA

Purpose:

- Conversion point.

Inputs:

- Title
- Description
- Button label
- Button URL

#### Gallery

Purpose:

- Product, factory, team, facility, or project visuals.

Inputs:

- Images
- Captions
- Category

#### Contact

Purpose:

- Inquiry and business contact.

Inputs:

- Email
- Phone
- WhatsApp
- Address
- Map link
- Form status

## 6. Design Presets

Design presets should define the visual personality of a client website without requiring a total redesign.

Each preset should define:

- Color palette
- Typography scale
- Navbar style
- Hero treatment
- Section rhythm
- Card style
- Button style
- Motion intensity
- Background style

### Corporate Clean

Best for:

- Consulting
- Services
- Professional firms
- General company profiles

Traits:

- White / soft gray background.
- Clear typography.
- Minimal cards.
- Strong readability.

### Product Distribution

Best for:

- Food distribution
- FMCG
- Wholesale
- Supplier networks

Traits:

- Product-forward sections.
- Distribution network emphasis.
- Practical, trustworthy tone.
- Strong contact and partnership CTAs.

### Manufacturing Premium

Best for:

- Factories
- Production companies
- Export-ready businesses

Traits:

- Industrial but polished.
- Facility imagery.
- Process and capability sections.
- Strong certifications / metrics support.

### Technology Dark

Best for:

- Software
- AI
- Automation
- Digital transformation

Traits:

- Dark hero.
- Cinematic background.
- Motion-rich but controlled.
- Technical credibility.

### Luxury Editorial

Best for:

- Premium brands
- Lifestyle
- High-end services
- Founder-led companies

Traits:

- Large whitespace.
- Editorial typography.
- Fewer cards.
- Strong imagery.

### Store Lite

Best for:

- Product catalogs without full e-commerce.
- Small retail brands.
- Inquiry-based product sales.

Traits:

- Product grid focus.
- Category navigation.
- Inquiry CTA.
- Lightweight catalog behavior.

## 7. Future Website Pages Manager

The Website Pages Manager should become the core source of truth for page structure.

### Concept

Pages become the primary system.

Future behavior:

- Navbar reads Pages.
- Footer reads Pages.
- Workbench reads Pages.
- Admin dashboard reads Pages.
- SEO Health reads Pages.
- Section manager reads Pages.

### Why This Matters

Without a Pages Manager, every client adaptation risks becoming a manual remap:

- Navbar labels change in one place.
- Footer links change elsewhere.
- Admin still shows old framework labels.
- Workbench needs a separate mapping.
- Studio structure becomes too developer-oriented.

With a Pages Manager:

- A page can be renamed once.
- A page can be hidden or shown consistently.
- Page readiness can be measured.
- Client-specific structures become safer.

### Recommended Future Page Record

Each page should eventually include:

- Internal page key
- Display name
- Menu label
- Slug
- Template
- Status
- Package availability
- Navbar visibility
- Footer visibility
- Admin visibility
- Sort order
- Connected document reference
- SEO status
- Section list

## 8. Future Workbench

The Workbench should be the internal operator layer for adapting MIT Framework to a client.

It is not meant to replace Sanity Studio or the Admin Control Center. Instead, it should help the operator see the project structure clearly before editing content or shipping a client website.

### Workbench Roles

- Client adaptation overview.
- Page mapping review.
- Package scope confirmation.
- Design preset selection.
- Section readiness tracking.
- CMS readiness tracking.
- Deployment handoff checklist.

### Future Workbench Functions

- Read Pages Manager.
- Show active client pages.
- Show which pages are hidden.
- Show selected design preset.
- Show enabled package scope.
- Show which sections are live, static, or future-ready.
- Link safely to Sanity Studio.
- Link safely to public preview.
- Highlight missing content.
- Separate framework-level tasks from client-level tasks.

### Workbench Safety Rules

- Read-only first.
- No mutation until the data model is stable.
- No schema-changing behavior from Workbench.
- No destructive actions.
- Clear labels for live, static, and future-ready features.

## 9. Roadmap

The V2 roadmap should be implemented gradually so the existing MIT Framework V1 remains stable.

### Phase 0 - Lock V1

- Keep MIT Framework V1 stable.
- Keep current Admin Control Center safe.
- Keep current public frontend working.
- Avoid broad refactors.

### Phase 1 - Normalize Page Metadata

- Add or standardize page display name, menu label, slug, visibility, and sort order.
- Keep frontend behavior unchanged at first.
- Use these fields for Studio clarity and admin readiness only.

### Phase 2 - Build Pages Manager Read-Only

- Create a read-only Pages Manager in admin/workbench.
- Show page status, labels, slugs, navbar visibility, and footer visibility.
- Do not let it mutate data yet.

### Phase 3 - Connect Navbar and Footer to Pages

- Let navbar read from Pages when enabled.
- Let footer read from Pages when enabled.
- Preserve manual override for special clients.

### Phase 4 - Define Section Library Contracts

- Document required fields per section.
- Group sections by package tier.
- Add readiness checks before adding new schema complexity.

### Phase 5 - Introduce Design Presets

- Start with token-level presets.
- Avoid a full theme engine at first.
- Map preset to navbar style, card style, hero treatment, and section rhythm.

### Phase 6 - Connect Workbench to Pages and Presets

- Workbench reads client pages.
- Workbench reads selected design preset.
- Workbench shows package scope.
- Workbench becomes the operator's client adaptation map.

### Phase 7 - Upgrade Premium Modules Carefully

- Keep Motion Effects code-level until CMS controls are justified.
- Keep Product Parallax future-ready until a client needs it live.
- Keep Background Scene connected where already proven stable.

### Phase 8 - Client Handoff System

- Add client-facing editing guide.
- Add content readiness checklist.
- Add deployment checklist.
- Add reusable documentation per package tier.

## Implementation Principles

- Documentation before schema.
- Read-only before mutation.
- Presets before redesign.
- Page source before navbar/footer duplication.
- Fallbacks must be honest: live, static, placeholder, or future-ready.
- Client-specific changes should live on client branches until the reusable pattern is proven.
