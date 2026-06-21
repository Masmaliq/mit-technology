import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("MIT CMS")
    .items([
      S.listItem()
        .title("🌐 GLOBAL")
        .child(
          S.list()
            .title("GLOBAL")
            .items([
              S.listItem()
                .title("🌐 Site Settings")
                .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
              S.listItem().title("🧭 Navbar").child(S.document().schemaType("navbar").documentId("navbar")),
              S.listItem().title("📌 Footer").child(S.document().schemaType("footer").documentId("footer")),
            ])
        ),
      S.listItem()
        .title("🏠 HOMEPAGE")
        .child(
          S.list()
            .title("HOMEPAGE")
            .items([
              S.listItem()
                .title("🏠 Homepage Settings")
                .child(S.document().schemaType("homepage").documentId("homepage")),
            ])
        ),
      S.listItem()
        .title("📄 PAGES")
        .child(
          S.list()
            .title("PAGES")
            .items([
              S.listItem().title("👤 About").child(S.document().schemaType("about").documentId("about")),
              S.listItem()
                .title("⚡ Solutions")
                .child(S.document().schemaType("solutionsPage").documentId("solutionsPage")),
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
              S.listItem()
                .title("📞 Contact")
                .child(S.document().schemaType("contact").documentId("contact")),
            ])
        ),
      S.listItem()
        .title("📚 CONTENT")
        .child(
          S.list()
            .title("CONTENT")
            .items([
              S.documentTypeListItem("clientLogo").title("🤝 Client Logos"),
              S.documentTypeListItem("process").title("🔄 Process"),
              S.documentTypeListItem("testimonial").title("⭐ Testimonials"),
            ])
        ),
    ]);
