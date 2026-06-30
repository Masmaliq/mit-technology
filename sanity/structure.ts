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
  StarIcon,
} from "@sanity/icons";
import type { ListItemBuilder, StructureBuilder, StructureResolver } from "sanity/structure";

const singleton = (
  S: StructureBuilder,
  title: string,
  schemaType: string,
  documentId: string,
  icon?: ComponentType
): ListItemBuilder => {
  const item = S.listItem()
    .id(documentId)
    .title(title)
    .child(S.document().schemaType(schemaType).documentId(documentId));

  return icon ? item.icon(icon) : item;
};

const documentList = (
  S: StructureBuilder,
  schemaType: string,
  title: string,
  icon?: ComponentType
): ListItemBuilder => {
  const item = S.documentTypeListItem(schemaType).id(schemaType).title(title);

  return icon ? item.icon(icon) : item;
};

export const structure: StructureResolver = (S) =>
  S.list()
    .title("MIT CMS")
    .items([
      S.listItem()
        .id("homepage")
        .title("Halaman Statis")
        .icon(HomeIcon)
        .child(
          S.list()
            .title("Halaman Statis")
            .items([
              singleton(S, "Homepage", "homepage", "homepage", HomeIcon),
              singleton(S, "About", "about", "about", DocumentIcon),
              singleton(S, "Contact", "contact", "contact", CommentIcon),
            ])
        ),
      S.listItem()
        .id("pages")
        .title("Halaman Koleksi")
        .icon(FolderIcon)
        .child(
          S.list()
            .title("Halaman Koleksi")
            .items([
              S.listItem()
                .id("solutions")
                .title("Solutions")
                .icon(StackIcon)
                .child(
                  S.list()
                    .title("Solutions")
                    .items([
                      singleton(S, "Page Settings", "solutionsPage", "solutionsPage", CogIcon),
                      documentList(S, "solution", "Solution Items", StackIcon),
                    ])
                ),
              S.listItem()
                .id("packages")
                .title("Packages")
                .icon(PackageIcon)
                .child(
                  S.list()
                    .title("Packages")
                    .items([
                      singleton(
                        S,
                        "Page Settings",
                        "packagesPageSettings",
                        "packagesPageSettings",
                        CogIcon
                      ),
                      documentList(S, "package", "Package Items", PackageIcon),
                    ])
                ),
              S.listItem()
                .id("portfolio")
                .title("Portfolio")
                .icon(FolderIcon)
                .child(
                  S.list()
                    .title("Portfolio")
                    .items([documentList(S, "portfolio", "Portfolio Items", FolderIcon)])
                ),
              S.listItem()
                .id("case-studies")
                .title("Case Studies")
                .icon(CaseIcon)
                .child(
                  S.list()
                    .title("Case Studies")
                    .items([
                      singleton(
                        S,
                        "Page Settings",
                        "caseStudiesPageSettings",
                        "caseStudiesPageSettings",
                        CogIcon
                      ),
                      documentList(S, "caseStudy", "Case Study Items", CaseIcon),
                    ])
                ),
            ])
        ),
      S.listItem()
        .id("content")
        .title("Data Terpusat")
        .icon(FolderIcon)
        .child(
          S.list()
            .title("Data Terpusat")
            .items([
              documentList(S, "clientLogo", "Client Logos", ImagesIcon),
              documentList(S, "process", "Process", ComposeIcon),
              documentList(S, "testimonial", "Testimonials", StarIcon),
            ])
        ),
      S.listItem()
        .id("global")
        .title("Pengaturan Global")
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .title("Pengaturan Global")
            .items([
              singleton(S, "Site Settings", "siteSettings", "siteSettings", CogIcon),
              singleton(S, "Navbar", "navbar", "navbar", MenuIcon),
              singleton(S, "Footer", "footer", "footer", StackIcon),
            ])
        ),
    ]);

export const deskStructure = structure;
