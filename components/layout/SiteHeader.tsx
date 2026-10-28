import { getHomepageFooterGlobals, getSiteSettings } from "@/lib/sanity/fetch";
import { SiteHeaderClient } from "./SiteHeaderClient";

type SiteHeaderProps = {
  overlay?: boolean;
  light?: boolean;
};

export async function SiteHeader({ overlay = false, light = false }: SiteHeaderProps) {
  const [globals, siteSettings] = await Promise.all([getHomepageFooterGlobals(), getSiteSettings()]);
  const navbar = globals.navigation || {};
  const identity = globals.identity || {};
  const logo = identity.primaryLogo || navbar.logo || siteSettings.logo;
  const companyName = identity.siteName || identity.shortName || siteSettings.companyName || siteSettings.siteTitle || "Emitech";
  const brandMode = navbar.brandMode === "image" ? "image" : "textOnly";
  const logoUrl = brandMode === "image" ? logo?.url || "/mit-logo.png" : undefined;

  return (
    <SiteHeaderClient
      logoUrl={logoUrl}
      logoAlt={logo?.alt || companyName}
      brandName={companyName}
      brandMode={brandMode}
      menuItems={navbar.menuItems}
      ctaLabel={navbar.ctaLabel}
      ctaHref={navbar.ctaHref}
      ctaEnabled={navbar.ctaEnabled}
      overlay={overlay}
      light={light}
    />
  );
}
