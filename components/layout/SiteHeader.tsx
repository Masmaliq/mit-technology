import { getNavbar, getSiteSettings } from "@/lib/sanity/fetch";
import { SiteHeaderClient } from "./SiteHeaderClient";

type SiteHeaderProps = {
  overlay?: boolean;
};

export async function SiteHeader({ overlay = false }: SiteHeaderProps) {
  const [navbar, siteSettings] = await Promise.all([getNavbar(), getSiteSettings()]);
  const logo = navbar.logo || siteSettings.logo;
  const companyName = siteSettings.companyName || siteSettings.siteTitle || "MIT Technology";
  const brandMode = navbar.brandMode === "image" ? "image" : "textOnly";
  const logoUrl = brandMode === "image" ? logo?.url : undefined;

  return (
    <SiteHeaderClient
      logoUrl={logoUrl}
      logoAlt={logo?.alt || companyName}
      brandName={companyName}
      brandMode={brandMode}
      menuItems={navbar.menuItems}
      ctaLabel={navbar.ctaLabel}
      ctaHref={navbar.ctaHref}
      overlay={overlay}
    />
  );
}
