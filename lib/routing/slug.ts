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

function withoutLegalPrefix(value?: string) {
  return toUrlSlug(value).replace(/^(?:pt|cv|ud)-/, "");
}

export function getCaseStudyUrlCandidates(caseStudy: { slug?: string; title?: string; client?: string }) {
  return Array.from(new Set([
    toUrlSlug(caseStudy.slug),
    toUrlSlug(caseStudy.title),
    toUrlSlug(caseStudy.client),
    withoutLegalPrefix(caseStudy.title),
    withoutLegalPrefix(caseStudy.client),
  ].filter(Boolean)));
}

function compactUrlIdentity(value?: string) {
  return toUrlSlug(value).replace(/-/g, "");
}

function isSingleEditApart(left: string, right: string) {
  if (Math.abs(left.length - right.length) > 1) return false;

  const shorter = left.length <= right.length ? left : right;
  const longer = left.length <= right.length ? right : left;
  let shorterIndex = 0;
  let longerIndex = 0;
  let edits = 0;

  while (shorterIndex < shorter.length && longerIndex < longer.length) {
    if (shorter[shorterIndex] === longer[longerIndex]) {
      shorterIndex += 1;
      longerIndex += 1;
      continue;
    }

    edits += 1;
    if (edits > 1) return false;

    if (shorter.length === longer.length) shorterIndex += 1;
    longerIndex += 1;
  }

  if (longerIndex < longer.length) edits += 1;
  return edits <= 1;
}

export function getCaseStudyCompatibilityScore(
  caseStudy: { slug?: string; title?: string; client?: string },
  routeSlug: string,
) {
  const normalizedRoute = toUrlSlug(routeSlug);
  const candidates = getCaseStudyUrlCandidates(caseStudy);

  if (candidates.includes(normalizedRoute)) return 0;

  const compactRoute = compactUrlIdentity(normalizedRoute);
  const compactCandidates = candidates.map(compactUrlIdentity).filter(Boolean);
  if (compactCandidates.includes(compactRoute)) return 1;

  if (compactRoute.length < 8) return null;

  return compactCandidates.some((candidate) => candidate.length >= 8 && isSingleEditApart(candidate, compactRoute))
    ? 2
    : null;
}

export function getCaseStudyUrlSlug(caseStudy: { slug?: string; title?: string; client?: string }) {
  const storedSlug = caseStudy.slug?.trim();
  if (storedSlug && storedSlug === toUrlSlug(storedSlug)) return storedSlug;

  return withoutLegalPrefix(caseStudy.client) || withoutLegalPrefix(caseStudy.title) || toUrlSlug(storedSlug);
}
