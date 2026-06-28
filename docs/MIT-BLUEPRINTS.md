# MIT Blueprints V2

Status: planning and registry foundation  
Scope: website type to full website blueprint mapping  
Runtime impact: none

This document defines the passive Blueprint Registry for MIT Framework V2.

Blueprints connect:

```text
Website Type
↓
Preset
↓
Pages
↓
Sections
↓
Content Models
```

## Purpose

The Blueprint Registry gives MIT Framework a clear reusable website structure for common client needs.

It does not:

- Render frontend pages.
- Create routes.
- Change Sanity schema.
- Change dashboard or Workbench behavior.
- Mutate content.

It only describes a recommended website architecture.

## Blueprint Role

A blueprint is the future starting point for client adaptation.

Example:

- PT Pangan Kawan Nusantara can start from `product-distribution`.
- Chemiko can start from `manufacturing`.
- MIT Technology can start from `technology-company`.
- Narapati can start from `media-journal`.

## Included Blueprint IDs

- `company-profile`
- `product-distribution`
- `manufacturing`
- `technology-company`
- `media-journal`
- `online-store`
- `consulting-firm`
- `holding-company`
- `export-company`
- `startup-saas`

## Future Integration

In a later V2 phase, blueprints can help:

- Workbench show recommended structure.
- Admin compare current website readiness.
- Sanity onboarding suggest content fields.
- Generator Engine produce starter website plans.

Blueprints should remain read-only until page, section, and content model contracts are stable.

## Safety Rules

- Do not import blueprints into frontend runtime yet.
- Do not use blueprints to create Sanity documents yet.
- Do not use blueprints to change routes.
- Treat them as planning data only.
