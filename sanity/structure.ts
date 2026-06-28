import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Pangan Kawan CMS")
    .items([
      S.listItem()
        .title("📄 Halaman Website")
        .child(
          S.list()
            .title("Halaman Website")
            .items([
              S.listItem()
                .title("01 — Beranda")
                .child(S.document().schemaType("homepage").documentId("homepage")),
              S.listItem()
                .title("02 — Tentang Kami")
                .child(S.document().schemaType("about").documentId("about")),
              S.listItem()
                .title("03 — Produk")
                .child(S.document().schemaType("solutionsPage").documentId("solutionsPage")),
              S.listItem()
                .title("04 — Distribusi")
                .child(S.document().schemaType("innerPage").documentId("distribution-network")),
              S.listItem()
                .title("05 — Kemitraan")
                .child(S.document().schemaType("innerPage").documentId("partnership")),
              S.listItem()
                .title("06 — Kontak")
                .child(S.document().schemaType("contact").documentId("contact")),
            ])
        ),
      S.listItem()
        .title("🌐 Pengaturan Website")
        .child(
          S.list()
            .title("Pengaturan Website")
            .items([
              S.listItem()
                .title("Site Settings")
                .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
              S.listItem().title("Navbar").child(S.document().schemaType("navbar").documentId("navbar")),
              S.listItem().title("Footer").child(S.document().schemaType("footer").documentId("footer")),
              S.listItem().title("Contact").child(S.document().schemaType("contact").documentId("contact")),
              S.listItem()
                .title("SEO")
                .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            ])
        ),
      S.listItem()
        .title("📦 Konten")
        .child(
          S.list()
            .title("Konten")
            .items([
              S.documentTypeListItem("solution").title("📦 Product Items / Solution Items"),
              S.documentTypeListItem("clientLogo").title("🤝 Client Logos"),
              S.documentTypeListItem("testimonial").title("⭐ Testimonials"),
              S.documentTypeListItem("process").title("🔄 Process / Workflow"),
            ])
        ),
      S.listItem()
        .title("🧩 Advanced / Framework")
        .child(
          S.list()
            .title("Advanced / Framework")
            .items([
              S.listItem()
                .title("📦 Packages")
                .child(
                  S.list()
                    .title("Packages")
                    .items([
                      S.listItem()
                        .title("Page Settings")
                        .child(
                          S.document()
                            .schemaType("packagesPageSettings")
                            .documentId("packagesPageSettings")
                        ),
                      S.documentTypeListItem("package").title("Package Items"),
                    ])
                ),
              S.documentTypeListItem("portfolio").title("💼 Portfolio"),
              S.listItem()
                .title("🏆 Case Studies")
                .child(
                  S.list()
                    .title("Case Studies")
                    .items([
                      S.listItem()
                        .title("Page Settings")
                        .child(
                          S.document()
                            .schemaType("caseStudiesPageSettings")
                            .documentId("caseStudiesPageSettings")
                        ),
                      S.documentTypeListItem("caseStudy").title("Case Study Items"),
                    ])
                ),
            ])
        ),
    ]);
