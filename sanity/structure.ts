import type { ComponentType } from "react";
import {
  CaseIcon,
  CogIcon,
  CommentIcon,
  ComposeIcon,
  DocumentIcon,
  EarthGlobeIcon,
  FolderIcon,
  HomeIcon,
  ImagesIcon,
  MenuIcon,
  PackageIcon,
  StackIcon,
} from "@sanity/icons";
import type { ListItemBuilder, StructureBuilder, StructureResolver } from "sanity/structure";

const singleton = (
  S: StructureBuilder,
  id: string,
  title: string,
  schemaType: string,
  documentId: string,
  icon?: ComponentType
): ListItemBuilder => {
  const item = S.listItem()
    .id(id)
    .title(title)
    .child(S.document().id(`${id}-document`).title(title).schemaType(schemaType).documentId(documentId));
  return icon ? item.icon(icon) : item;
};

const documentList = (
  S: StructureBuilder,
  id: string,
  schemaType: string,
  title: string,
  icon?: ComponentType
): ListItemBuilder => {
  const item = S.documentTypeListItem(schemaType).id(id).title(title);
  return icon ? item.icon(icon) : item;
};

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Emitech Studio")
    .items([
      S.listItem()
        .id("pages")
        .title("PAGES")
        .icon(DocumentIcon)
        .child(
          S.list()
            .title("Website Pages")
            .items([
              singleton(S, "homepage", "Homepage", "homepage", "homepage", HomeIcon),
              singleton(S, "services", "Services", "solutionsPage", "solutionsPage", StackIcon),
              singleton(S, "work", "Work", "caseStudiesPageSettings", "caseStudiesPageSettings", CaseIcon),
              singleton(S, "pricing", "Pricing", "packagesPageSettings", "packagesPageSettings", PackageIcon),
              singleton(S, "about", "About", "about", "about", DocumentIcon),
              singleton(S, "contact", "Contact", "contact", "contact", CommentIcon),
            ])
        ),
      S.listItem()
        .id("content")
        .title("CONTENT")
        .icon(FolderIcon)
        .child(
          S.list()
            .title("Reusable Content")
            .items([
              documentList(S, "services", "solution", "Services", StackIcon),
              documentList(S, "projects", "project", "Work", CaseIcon),
              documentList(S, "packages", "package", "Pricing", PackageIcon),
            ])
        ),
      S.listItem()
        .id("global")
        .title("GLOBAL")
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .title("Website Settings")
            .items([
              singleton(S, "navigation", "Navigation", "navbar", "navbar", MenuIcon),
              singleton(S, "footer", "Footer", "footer", "footer", StackIcon),
              singleton(S, "global-cta", "Global CTA", "globalCta", "globalCta", ComposeIcon),
              singleton(S, "contact-information", "Contact Information", "contactInformation", "contactInformation", CommentIcon),
              singleton(S, "social-media", "Social Media", "socialMedia", "socialMedia", EarthGlobeIcon),
              singleton(S, "site-identity", "Site Identity", "siteIdentity", "siteIdentity", ImagesIcon),
              singleton(S, "seo-defaults", "SEO Defaults", "seoDefaults", "seoDefaults", DocumentIcon),
              singleton(S, "site-settings", "Site Settings", "siteSettings", "siteSettings", CogIcon),
            ])
        ),
      S.divider(),
      S.listItem()
        .id("legacy")
        .title("Legacy / Internal")
        .icon(CogIcon)
        .child(
          S.list()
            .title("Legacy / Internal")
            .items([
              documentList(S, "testimonials", "testimonial", "Testimonials"),
              documentList(S, "impact-metrics", "impactMetric", "Impact Metrics"),
              documentList(S, "portfolio", "portfolio", "Portfolio Items", ImagesIcon),
              documentList(S, "case-studies", "caseStudy", "Case Study Items", CaseIcon),
              documentList(S, "insights", "insight", "Insights", DocumentIcon),
              documentList(S, "process", "process", "Process", ComposeIcon),
              documentList(S, "clients", "clientLogo", "Clients", ImagesIcon),
              documentList(S, "inner-pages", "innerPage", "Page Builder Documents"),
            ])
        ),
    ]);

export const deskStructure = structure;
