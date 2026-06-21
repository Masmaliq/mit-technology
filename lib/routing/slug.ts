export function toUrlSlug(value?: string) {
  return (value || "")
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCaseStudyUrlSlug(caseStudy: { slug?: string; title?: string }) {
  return toUrlSlug(caseStudy.slug) || toUrlSlug(caseStudy.title);
}
