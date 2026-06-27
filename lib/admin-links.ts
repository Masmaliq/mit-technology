export const ADMIN_STUDIO_URL = "/studio";
export const ADMIN_VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_DASHBOARD_URL || "https://vercel.com/dashboard";

export function getSanitySingletonIntentHref(id: string, type: string) {
  return `${ADMIN_STUDIO_URL}/intent/edit/id=${id};type=${type}`;
}

export const sanitySingletonLinks = {
  homepage: getSanitySingletonIntentHref("homepage", "homepage"),
  siteSettings: getSanitySingletonIntentHref("siteSettings", "siteSettings"),
  navbar: getSanitySingletonIntentHref("navbar", "navbar"),
  contact: getSanitySingletonIntentHref("contact", "contact"),
  footer: getSanitySingletonIntentHref("footer", "footer"),
};
