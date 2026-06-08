export {
  getFooter,
  getHomepage as getHomepageContent,
  getPackages as getHomepagePackages,
  getPortfolio as getHomepagePortfolio,
  getSiteSettings,
} from "@/lib/sanity/fetch";

export type {
  Footer,
  Homepage as HomepageContent,
  PackageItem as PackagePreviewContent,
  PortfolioItem as PortfolioPreviewContent,
  SiteSettings as SiteSettingsContent,
} from "@/lib/sanity/queries";
