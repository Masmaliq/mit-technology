import AdminShell from "@/components/admin/AdminShell";
import DashboardHero from "@/components/admin/DashboardHero";
import PackagePlanControl from "@/components/admin/PackagePlanControl";
import PackageSummary from "@/components/admin/PackageSummary";
import PreviewAccess from "@/components/admin/PreviewAccess";
import ProductParallaxStatus from "@/components/admin/ProductParallaxStatus";
import QuickActions from "@/components/admin/QuickActions";
import StatCards, { type AdminStat } from "@/components/admin/StatCards";
import VisualStatus from "@/components/admin/VisualStatus";
import WebsiteHealth from "@/components/admin/WebsiteHealth";
import {
  getAbout,
  getCaseStudies,
  getCaseStudiesPageSettings,
  getClientLogos,
  getFooter,
  getHomepage,
  getPackages,
  getPackagesPageSettings,
  getPortfolio,
  getProcesses,
  getSiteSettings,
  getSolutions,
  getSolutionsPage,
  getTestimonials,
} from "@/lib/sanity/fetch";
import type {
  About,
  CaseStudiesPageSettings,
  CaseStudyItem,
  ClientLogoItem,
  Footer,
  Homepage,
  PackageItem,
  PackagesPageSettings,
  PortfolioItem,
  ProcessItem,
  SiteSettings,
  SolutionItem,
  SolutionsPage,
  TestimonialItem,
} from "@/lib/sanity/queries";

type DashboardSanityData = {
  homepage?: Homepage;
  about?: About;
  solutionsPage?: SolutionsPage;
  solutions?: SolutionItem[];
  packagesPageSettings?: PackagesPageSettings;
  packages?: PackageItem[];
  caseStudiesPageSettings?: CaseStudiesPageSettings;
  caseStudies?: CaseStudyItem[];
  testimonials?: TestimonialItem[];
  portfolio?: PortfolioItem[];
  clientLogos?: ClientLogoItem[];
  processes?: ProcessItem[];
  footer?: Footer;
  siteSettings?: SiteSettings;
};

function hasObjectValue(value?: Record<string, unknown>) {
  return Boolean(value && Object.values(value).some((item) => Array.isArray(item) ? item.length > 0 : Boolean(item)));
}

function hasDashboardData(data: DashboardSanityData) {
  return Boolean(
    hasObjectValue(data.homepage as Record<string, unknown> | undefined) ||
      hasObjectValue(data.about as Record<string, unknown> | undefined) ||
      hasObjectValue(data.solutionsPage as Record<string, unknown> | undefined) ||
      hasObjectValue(data.packagesPageSettings as Record<string, unknown> | undefined) ||
      hasObjectValue(data.caseStudiesPageSettings as Record<string, unknown> | undefined) ||
      hasObjectValue(data.footer as Record<string, unknown> | undefined) ||
      hasObjectValue(data.siteSettings as Record<string, unknown> | undefined) ||
      data.solutions?.length ||
      data.packages?.length ||
      data.caseStudies?.length ||
      data.testimonials?.length ||
      data.portfolio?.length ||
      data.clientLogos?.length ||
      data.processes?.length
  );
}

function hasSeo(page?: { seoTitle?: string; seoDescription?: string; seoImage?: unknown }) {
  return Boolean(page?.seoTitle || page?.seoDescription || page?.seoImage);
}

function buildDashboardStats(data: DashboardSanityData): AdminStat[] | undefined {
  if (!hasDashboardData(data)) return undefined;

  const pageItems = [
    Boolean(data.homepage?.heroTitle || data.homepage?.heroDescription),
    Boolean(data.about?.heroTitle || data.about?.storyTitle),
    Boolean(data.solutionsPage?.heroTitle || data.solutions?.length),
    Boolean(data.packagesPageSettings?.pageTitle || data.packages?.length),
    Boolean(data.caseStudiesPageSettings?.pageTitle || data.caseStudies?.length),
    Boolean(data.portfolio?.length),
    Boolean(data.footer?.email || data.footer?.whatsapp || data.siteSettings?.email || data.siteSettings?.whatsapp),
  ];
  const publishedPages = pageItems.filter(Boolean).length;
  const draftPages = pageItems.length - publishedPages;
  const sectionItems = [
    Boolean(data.homepage?.heroTitle || data.homepage?.heroDescription),
    Boolean(data.clientLogos?.length || data.homepage?.clientLogosTitle),
    Boolean(data.homepage?.trustTitle || data.homepage?.trustCards?.length),
    Boolean(data.solutions?.length || data.homepage?.solutionsPreviewTitle),
    Boolean(data.caseStudies?.length || data.homepage?.caseStudiesPreviewTitle),
    Boolean(data.processes?.length || data.homepage?.processTitle),
    Boolean(data.testimonials?.length || data.homepage?.testimonialsTitle),
    Boolean(data.packages?.length),
    Boolean(data.homepage?.ctaTitle || data.homepage?.ctaButtonLabel),
    Boolean(data.footer?.description || data.siteSettings?.companyName),
  ];
  const activeSections = sectionItems.filter(Boolean).length;
  const seoPages = [data.homepage, data.about, data.solutionsPage, data.packagesPageSettings, data.caseStudiesPageSettings];
  const missingSeo = seoPages.filter((page) => page && !hasSeo(page)).length;
  const footerReady = Boolean(data.footer?.description || data.footer?.email || data.footer?.whatsapp || data.siteSettings?.companyName);
  const heroReady = Boolean(data.homepage?.heroTitle || data.homepage?.heroDescription || data.homepage?.heroBackgroundImage);
  const issueCount = [!footerReady, !heroReady, missingSeo > 0].filter(Boolean).length;

  return [
    { label: "Total Pages", value: `${pageItems.length}`, detail: `${draftPages} Draft · ${publishedPages} Published`, tone: "blue" },
    { label: "Active Sections", value: `${activeSections}`, detail: `Hero, Packages, CTA, +${Math.max(activeSections - 3, 0)}`, tone: "violet" },
    { label: "Packages", value: `${data.packages?.length ?? 0}`, detail: data.packages?.map((item) => item.startingPrice).filter(Boolean).join(" · ") || "Collection ready", tone: "emerald" },
    { label: "Case Studies", value: `${data.caseStudies?.length ?? 0}`, detail: `${data.caseStudies?.filter((item) => item.featured).length ?? 0} featured`, tone: "blue" },
    { label: "Testimonials", value: `${data.testimonials?.length ?? 0}`, detail: `${data.testimonials?.filter((item) => item.featured).length ?? 0} featured`, tone: "violet" },
    { label: "Footer Ready", value: footerReady ? "Ready" : "Review", detail: footerReady ? "Footer CMS connected" : "Footer needs content", tone: footerReady ? "emerald" : "amber" },
    { label: "Hero Ready", value: heroReady ? "Ready" : "Review", detail: heroReady ? "Homepage hero connected" : "Hero needs review", tone: heroReady ? "emerald" : "amber" },
    { label: "SEO Score", value: missingSeo ? "Review" : "Ready", detail: missingSeo ? `${missingSeo} page SEO perlu review` : `${seoPages.length} page SEO ready`, tone: issueCount ? "amber" : "emerald" },
  ];
}

function buildPackageSummary(data: DashboardSanityData): string[][] | undefined {
  if (!hasDashboardData(data) || !data.packages?.length) return undefined;

  const featuredPackage = data.packages.find((item) => item.featured) ?? data.packages[0];
  const priceRange = data.packages.map((item) => item.startingPrice).filter(Boolean).join(" · ") || "Ready";

  return [
    ["Active Plan", featuredPackage?.title || "Ready"],
    ["Package Levels", `${data.packages.length}`],
    ["Price Range", priceRange],
    ["Status", "Sanity Connected"],
  ];
}

function buildWebsiteHealth(data: DashboardSanityData): string[][] | undefined {
  if (!hasDashboardData(data)) return undefined;

  const missingImages = [
    !data.homepage?.heroBackgroundImage && !data.homepage?.heroMainImage,
    !data.about?.image,
    Boolean(data.caseStudies?.some((item) => !item.featuredImage)),
  ].filter(Boolean).length;
  const hasCta = Boolean(data.homepage?.ctaTitle || data.homepage?.ctaButtonLabel || data.footer?.whatsapp || data.siteSettings?.whatsapp);
  const draftContent = [
    !data.homepage?.heroTitle,
    !data.about?.heroTitle,
    !data.packages?.length,
    !data.caseStudies?.length,
    !data.testimonials?.length,
  ].filter(Boolean).length;
  const missingSeo = [data.homepage, data.about, data.solutionsPage, data.packagesPageSettings, data.caseStudiesPageSettings].filter((page) => page && !hasSeo(page)).length;

  return [
    ["SEO Status Score", missingSeo ? "Review" : "Ready"],
    ["Missing Images", missingImages ? `${missingImages} Review` : "Lengkap"],
    ["Missing CTA", hasCta ? "Lengkap" : "Review"],
    ["Draft Content", `${draftContent} Review`],
    ["Hero Status", data.homepage?.heroTitle ? "Ready" : "Review"],
    ["Footer Status", data.footer?.description || data.siteSettings?.companyName ? "Ready" : "Review"],
  ];
}

function buildDashboardHero(data: DashboardSanityData) {
  if (!hasDashboardData(data)) return undefined;

  const stats = buildDashboardStats(data);
  const attentionCount = stats?.filter((item) => item.tone === "amber").length ?? 0;

  return {
    title: "MIT Framework Control Center",
    description:
      "Ringkasan utama status website Anda dan akses cepat ke semua pengaturan penting dalam satu tampilan terpusat.",
    badges: ["Website Aktif", `Packages: ${data.packages?.length ?? 0}`, `${attentionCount} Item Perlu Perhatian`],
    actions: ["Lihat Log", "Edit Homepage"],
  };
}

export default async function AdminDashboardPage() {
  const [
    homepage,
    about,
    solutionsPage,
    solutions,
    packagesPageSettings,
    packages,
    caseStudiesPageSettings,
    caseStudies,
    testimonials,
    portfolio,
    clientLogos,
    processes,
    footer,
    siteSettings,
  ] = await Promise.all([
    getHomepage(),
    getAbout(),
    getSolutionsPage(),
    getSolutions(),
    getPackagesPageSettings(),
    getPackages(),
    getCaseStudiesPageSettings(),
    getCaseStudies(),
    getTestimonials(),
    getPortfolio(),
    getClientLogos(),
    getProcesses(),
    getFooter(),
    getSiteSettings(),
  ]);
  const dashboardData = {
    homepage,
    about,
    solutionsPage,
    solutions,
    packagesPageSettings,
    packages,
    caseStudiesPageSettings,
    caseStudies,
    testimonials,
    portfolio,
    clientLogos,
    processes,
    footer,
    siteSettings,
  };
  const dashboardStats = buildDashboardStats(dashboardData);
  const packageSummary = buildPackageSummary(dashboardData);
  const websiteHealth = buildWebsiteHealth(dashboardData);
  const heroContent = buildDashboardHero(dashboardData);

  return (
    <AdminShell>
      <div className="space-y-6">
        <DashboardHero content={heroContent} />
        <StatCards items={dashboardStats} />

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
          <VisualStatus />
          <PackageSummary items={packageSummary} />
        </div>

        <PackagePlanControl />
        <ProductParallaxStatus />

        <div className="grid gap-6 lg:grid-cols-3">
          <QuickActions />
          <WebsiteHealth items={websiteHealth} />
          <PreviewAccess />
        </div>
      </div>
    </AdminShell>
  );
}
