import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.documentTypeListItem("homepage").title("Homepage"),
      S.listItem().title("About").child(S.document().schemaType("about").documentId("about")),
      S.documentTypeListItem("clientLogo").title("Client Logos"),
      S.documentTypeListItem("process").title("Process"),
      S.documentTypeListItem("impactMetric").title("Impact Metrics"),
      S.documentTypeListItem("solution").title("Solutions"),
      S.documentTypeListItem("package").title("Packages"),
      S.documentTypeListItem("portfolio").title("Portfolio"),
      S.documentTypeListItem("caseStudy").title("Case Studies"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.listItem()
        .title("Contact")
        .child(S.document().schemaType("contact").documentId("contact")),
      S.listItem().title("Navbar").child(S.document().schemaType("navbar").documentId("navbar")),
      S.listItem().title("Footer").child(S.document().schemaType("footer").documentId("footer")),
    ]);
