import type { Metadata } from "next";
import { getHomepageFooterGlobals, getSiteSettings } from "./fetch";
import type { PageSeo, SeoFields, SiteSettings } from "./queries";

type MetadataInput = SeoFields & {
  page?: string;
  path?: string;
  title?: string;
  description?: string;
};

function getPageSeo(siteSettings: SiteSettings, page?: string): PageSeo | undefined {
  return siteSettings.pageSeo?.find((item) => item.page === page);
}

function toKeywords(keywords?: string[]) {
  const clean = keywords?.filter(Boolean);
  return clean && clean.length > 0 ? clean : undefined;
}

function getSiteUrl(siteSettings: SiteSettings) {
  const rawUrl = siteSettings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL;

  if (!rawUrl) return undefined;

  try {
    return new URL(rawUrl);
  } catch {
    return undefined;
  }
}

function getCanonicalPath(path?: string) {
  if (!path || path === "/") return "/";

  return path.startsWith("/") ? path : `/${path}`;
}

export async function createCmsMetadata(input: MetadataInput = {}): Promise<Metadata> {
  const [siteSettings, globals] = await Promise.all([getSiteSettings(), getHomepageFooterGlobals()]);
  const defaults = globals.seoDefaults || {};
  const identity = globals.identity || {};
  const pageSeo = getPageSeo(siteSettings, input.page);
  const siteUrl = getSiteUrl(siteSettings);
  const canonicalPath = getCanonicalPath(input.path);
  const title =
    input.seoTitle ||
    pageSeo?.title ||
    input.title ||
    defaults.defaultTitle ||
    defaults.siteName ||
    identity.siteName ||
    siteSettings.companyName ||
    siteSettings.siteTitle;
  const description =
    input.seoDescription ||
    pageSeo?.description ||
    input.description ||
    defaults.defaultDescription ||
    identity.shortDescription ||
    siteSettings.siteDescription ||
    siteSettings.description ||
    "";
  const image = input.seoImage?.url || pageSeo?.ogImage?.url || defaults.defaultOpenGraphImage?.url || siteSettings.ogImage?.url;
  const keywords = toKeywords(input.seoKeywords || pageSeo?.keywords || siteSettings.keywords);

  return {
    metadataBase: siteUrl,
    title,
    description,
    keywords,
    alternates: siteUrl
      ? {
          canonical: canonicalPath,
        }
      : undefined,
    icons: {
      icon: identity.favicon?.url || siteSettings.favicon?.url || "/favicon.png",
      apple: identity.favicon?.url || siteSettings.favicon?.url || "/favicon-180.png",
    },
    openGraph: {
      title,
      description,
      url: siteUrl ? canonicalPath : undefined,
      images: image ? [{ url: image }] : undefined,
      type: "website",
    },
    twitter: {
      card: defaults.twitterCardType || (image ? "summary_large_image" : "summary"),
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
