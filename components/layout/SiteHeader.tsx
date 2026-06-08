import { getNavbar, getSiteSettings } from "@/lib/sanity/fetch";
import { SiteHeaderClient } from "./SiteHeaderClient";

export async function SiteHeader() {
  const [navbar, siteSettings] = await Promise.all([getNavbar(), getSiteSettings()]);
  const logo = navbar.logo || siteSettings.logo;

  return (
    <SiteHeaderClient
      logoUrl={logo?.url}
      logoAlt={siteSettings.companyName || logo?.alt || "MIT"}
      menuItems={navbar.menuItems}
      ctaLabel={navbar.ctaLabel}
      ctaHref={navbar.ctaHref}
    />
  );
}
