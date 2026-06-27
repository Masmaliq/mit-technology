import Link from "next/link";

import AdminActionLink from "@/components/admin/AdminActionLink";
import { pagesControlPanel } from "@/lib/admin-dashboard-data";
import type {
  About,
  CaseStudiesPageSettings,
  CaseStudyItem,
  Contact,
  Footer,
  Homepage,
  PackageItem,
  PackagesPageSettings,
  PortfolioItem,
  SiteSettings,
  SolutionItem,
  SolutionsPage,
} from "@/lib/sanity/queries";

const summaryTone: Record<string, string> = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
  violet: "border-violet-100 bg-violet-50 text-violet-700",
  amber: "border-amber-100 bg-amber-50 text-amber-700",
};

type AdminPageStatus = {
  title: string;
  status: string;
  type: string;
  visibility: string;
  action: string;
  route: string;
  source: string;
  seoStatus: string;
  previewHref: string;
};

type PagesAdminData = {
  homepage?: Homepage;
  about?: About;
  solutionsPage?: SolutionsPage;
  solutions?: SolutionItem[];
  packagesPageSettings?: PackagesPageSettings;
  packages?: PackageItem[];
  caseStudiesPageSettings?: CaseStudiesPageSettings;
  caseStudies?: CaseStudyItem[];
  portfolio?: PortfolioItem[];
  contact?: Contact;
  footer?: Footer;
  siteSettings?: SiteSettings;
};

function hasObjectValue(value?: Record<string, unknown>) {
  return Boolean(value && Object.values(value).some((item) => Array.isArray(item) ? item.length > 0 : Boolean(item)));
}

function hasPagesData(data?: PagesAdminData) {
  return Boolean(
    hasObjectValue(data?.homepage as Record<string, unknown> | undefined) ||
      hasObjectValue(data?.about as Record<string, unknown> | undefined) ||
      hasObjectValue(data?.solutionsPage as Record<string, unknown> | undefined) ||
      hasObjectValue(data?.packagesPageSettings as Record<string, unknown> | undefined) ||
      hasObjectValue(data?.caseStudiesPageSettings as Record<string, unknown> | undefined) ||
      hasObjectValue(data?.contact as Record<string, unknown> | undefined) ||
      hasObjectValue(data?.footer as Record<string, unknown> | undefined) ||
      hasObjectValue(data?.siteSettings as Record<string, unknown> | undefined) ||
      data?.solutions?.length ||
      data?.packages?.length ||
      data?.caseStudies?.length ||
      data?.portfolio?.length
  );
}

function pageStatus(hasContent: boolean, needsReview = false) {
  if (!hasContent) return "Draft";
  return needsReview ? "Review" : "Published";
}

function hasSeo(page?: { seoTitle?: string; seoDescription?: string; seoImage?: unknown }) {
  return Boolean(page?.seoTitle || page?.seoDescription || page?.seoImage);
}

function seoStatus(page?: { seoTitle?: string; seoDescription?: string; seoImage?: unknown }) {
  return hasSeo(page) ? "Ready" : "Review";
}

function buildPage({
  action,
  hasContent,
  pageSeo,
  previewHref,
  route,
  source,
  title,
  type,
  visibility = "Public",
}: {
  action: string;
  hasContent: boolean;
  pageSeo?: { seoTitle?: string; seoDescription?: string; seoImage?: unknown };
  previewHref: string;
  route: string;
  source: string;
  title: string;
  type: string;
  visibility?: string;
}): AdminPageStatus {
  const seo = seoStatus(pageSeo);

  return {
    action,
    previewHref,
    route,
    seoStatus: seo,
    source,
    status: pageStatus(hasContent, seo === "Review"),
    title,
    type,
    visibility,
  };
}

function buildPages(data?: PagesAdminData): AdminPageStatus[] {
  if (!hasPagesData(data)) {
    return pagesControlPanel.pages.map((page) => ({
      ...page,
      route: page.route || "/admin/pages",
      source: page.source || "Blueprint",
      seoStatus: page.seoStatus || "Review",
      previewHref: page.previewHref || "/admin/pages",
    }));
  }

  const homeReady = Boolean(
    data?.homepage?.heroTitle ||
      data?.homepage?.heroDescription ||
      data?.homepage?.heroBackgroundImage ||
      data?.homepage?.heroBackgroundVideoMp4 ||
      data?.homepage?.cinematicVideoMp4
  );
  const aboutReady = Boolean(data?.about?.heroTitle || data?.about?.storyTitle || data?.about?.storyDescription);
  const solutionsReady = Boolean(data?.solutionsPage?.heroTitle || data?.solutions?.length);
  const packagesReady = Boolean(data?.packagesPageSettings?.pageTitle || data?.packages?.length);
  const caseStudiesReady = Boolean(data?.caseStudiesPageSettings?.pageTitle || data?.caseStudies?.length);
  const portfolioReady = Boolean(data?.portfolio?.length);
  const contactReady = Boolean(data?.contact?.heroTitle || data?.contact?.email || data?.contact?.whatsapp || data?.siteSettings?.email || data?.siteSettings?.whatsapp);

  return [
    buildPage({
      action: "Edit Homepage",
      hasContent: homeReady,
      pageSeo: data?.homepage,
      previewHref: "/",
      route: "/",
      source: "Homepage Settings",
      title: "Home",
      type: "Landing Page",
    }),
    buildPage({
      action: "Edit About",
      hasContent: aboutReady,
      pageSeo: data?.about,
      previewHref: "/about",
      route: "/about",
      source: "About Page Settings",
      title: "About",
      type: "Company Page",
    }),
    buildPage({
      action: "Edit Solutions",
      hasContent: solutionsReady,
      pageSeo: data?.solutionsPage,
      previewHref: "/solutions",
      route: "/solutions",
      source: `${data?.solutions?.length ?? 0} Solution Items`,
      title: "Solutions",
      type: `${data?.solutions?.length ?? 0} Solution Items`,
    }),
    buildPage({
      action: "Edit Packages",
      hasContent: packagesReady,
      pageSeo: data?.packagesPageSettings,
      previewHref: "/packages",
      route: "/packages",
      source: `${data?.packages?.length ?? 0} Package Items`,
      title: "Packages",
      type: `${data?.packages?.length ?? 0} Package Items`,
    }),
    buildPage({
      action: "Review Cases",
      hasContent: caseStudiesReady,
      pageSeo: data?.caseStudiesPageSettings,
      previewHref: "/case-studies",
      route: "/case-studies",
      source: `${data?.caseStudies?.length ?? 0} Case Items`,
      title: "Case Studies",
      type: `${data?.caseStudies?.length ?? 0} Case Items`,
    }),
    buildPage({
      action: "Review Portfolio",
      hasContent: portfolioReady,
      previewHref: "/portfolio",
      route: "/portfolio",
      source: `${data?.portfolio?.length ?? 0} Portfolio Items`,
      title: "Portfolio",
      type: `${data?.portfolio?.length ?? 0} Portfolio Items`,
      visibility: portfolioReady ? "Public" : "Hidden",
    }),
    buildPage({
      action: "Edit CTA",
      hasContent: contactReady,
      pageSeo: data?.contact,
      previewHref: "/contact",
      route: "/contact",
      source: "Contact Settings",
      title: "Contact",
      type: "Conversion Page",
    }),
  ];
}

function buildPagesOverview(data?: PagesAdminData) {
  if (!hasPagesData(data)) {
    return [
      ["Sumber Data", "Blueprint fallback"],
      ["Page Registry", "Review"],
      ["Public Routes", "Blueprint Ready"],
      ["SEO Coverage", "Review"],
      ["Content Source", "Blueprint"],
    ];
  }

  const pages = buildPages(data);
  const publicCount = pages.filter((page) => page.visibility === "Public").length;
  const reviewCount = pages.filter((page) => page.status === "Review" || page.seoStatus === "Review").length;

  return [
    ["Sumber Data", "Sanity + Admin Registry"],
    ["Page Registry", `${pages.length} Halaman`],
    ["Public Routes", `${publicCount} Public`],
    ["SEO Coverage", reviewCount ? `${reviewCount} Review` : "Ready"],
    ["Content Source", "Read-only"],
  ];
}

function buildSummary(data?: PagesAdminData) {
  if (!hasPagesData(data)) {
    return pagesControlPanel.summary;
  }

  const pages = buildPages(data);

  return [
    { label: "Total Pages", value: `${pages.length}`, tone: "blue" },
    { label: "Published", value: `${pages.filter((page) => page.status === "Published").length}`, tone: "emerald" },
    { label: "Draft", value: `${pages.filter((page) => page.status === "Draft").length}`, tone: "violet" },
    { label: "Need Review", value: `${pages.filter((page) => page.status === "Review").length}`, tone: "amber" },
  ];
}

function buildReadiness(data?: PagesAdminData) {
  if (!hasPagesData(data)) {
    return pagesControlPanel.readiness;
  }

  const pages = buildPages(data);
  const hasHeroContent = Boolean(data?.homepage?.heroTitle || data?.about?.heroTitle || data?.solutionsPage?.heroTitle);
  const hasPageCopy = pages.some((page) => page.status !== "Draft");
  const hasMedia = Boolean(data?.homepage?.heroBackgroundImage || data?.about?.image || data?.packagesPageSettings?.heroBackgroundImage || data?.caseStudiesPageSettings?.heroBackgroundImage);
  const hasCta = Boolean(data?.homepage?.ctaTitle || data?.about?.ctaTitle || data?.contact?.ctaTitle || data?.footer?.whatsapp || data?.siteSettings?.whatsapp);

  return [
    ["Hero Content", hasHeroContent ? "Ready" : "Review"],
    ["Page Copy", hasPageCopy ? "Ready" : "Review"],
    ["Media Asset", hasMedia ? "Ready" : "Review"],
    ["CTA", hasCta ? "Ready" : "Review"],
    ["Mobile Layout", "Ready"],
    ["Publish Status", pages.some((page) => page.status === "Review" || page.status === "Draft") ? "Review" : "Ready"],
  ];
}

function buildSeoCoverage(data?: PagesAdminData) {
  if (!hasPagesData(data)) {
    return pagesControlPanel.seoCoverage;
  }

  const seoPages = [data?.homepage, data?.about, data?.solutionsPage, data?.packagesPageSettings, data?.caseStudiesPageSettings, data?.contact];
  const titleCount = seoPages.filter((page) => page?.seoTitle).length;
  const descriptionCount = seoPages.filter((page) => page?.seoDescription).length;
  const imageCount = seoPages.filter((page) => page?.seoImage).length;

  return [
    ["Meta Title", titleCount ? "Ready" : "Review"],
    ["Meta Description", descriptionCount ? "Ready" : "Review"],
    ["Open Graph Image", imageCount ? "Ready" : "Review"],
    ["Canonical URL", data?.siteSettings?.siteUrl ? "Ready" : "Review"],
    ["Sitemap", "Ready"],
    ["Schema Markup", "Planned"],
  ];
}

function DetailList({ items }: { items: string[][] }) {
  return (
    <div className="space-y-3">
      {items.map(([label, value]) => {
        const warning = value === "Review" || value === "Planned";
        const ready = value === "Ready";

        return (
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3" key={label}>
            <span className="text-sm text-slate-500">{label}</span>
            <span className={`max-w-[58%] break-words text-right text-sm font-bold ${warning ? "text-amber-700" : ready ? "text-emerald-700" : "text-slate-900"}`}>
              {value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function PagesControlPanel({ pagesData }: { pagesData?: PagesAdminData }) {
  const summaryCards = buildSummary(pagesData);
  const pageCards = buildPages(pagesData);
  const overview = buildPagesOverview(pagesData);
  const readiness = buildReadiness(pagesData);
  const seoCoverage = buildSeoCoverage(pagesData);
  const hasData = hasPagesData(pagesData);

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] border border-white bg-gradient-to-br from-white via-blue-50/60 to-violet-50 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-xs font-bold text-blue-700">
              {pagesControlPanel.header.badge}
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {pagesControlPanel.header.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              {pagesControlPanel.header.description}
            </p>
          </div>

          <AdminActionLink
            action={pagesControlPanel.header.action}
            className="w-fit rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
          >
            {pagesControlPanel.header.action}
          </AdminActionLink>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((item) => (
          <article
            className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_54px_rgba(15,23,42,0.05)]"
            key={item.label}
          >
            <div className="text-sm font-bold text-slate-950">{item.label}</div>
            <div className={`mt-5 inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${summaryTone[item.tone]}`}>
              {item.value}
            </div>
          </article>
        ))}
      </div>

      {!hasData ? (
        <article className="rounded-[2rem] border border-amber-100 bg-amber-50/70 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-bold text-amber-700">
                Empty State
              </span>
              <h2 className="mt-4 text-xl font-bold text-slate-950">Page registry belum membaca data Sanity.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Panel menampilkan blueprint halaman utama sebagai preview aman. Hubungkan konten di Sanity agar status halaman membaca data real.
              </p>
            </div>
            <AdminActionLink
              action="Open Sanity"
              className="w-fit rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Open Sanity
            </AdminActionLink>
          </div>
        </article>
      ) : null}

      <article className="rounded-[2rem] border border-blue-100 bg-blue-50/55 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-7">
        <h2 className="text-xl font-bold text-slate-950">Pages Overview</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Ringkasan route publik, sumber konten, status SEO, dan kesiapan halaman.
        </p>
        <div className="mt-6">
          <DetailList items={overview} />
        </div>
      </article>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {pageCards.map((page) => (
          <article
            className={`rounded-[2rem] border p-5 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-6 ${
              page.status === "Review"
                ? "border-amber-100 bg-amber-50/55"
                : page.status === "Draft"
                  ? "border-violet-100 bg-violet-50/55"
                  : "border-slate-200/80 bg-white"
            }`}
            key={page.title}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{page.type}</div>
                <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-950">{page.title}</h2>
                <p className="mt-2 font-mono text-sm font-semibold text-blue-700">{page.route}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                  page.status === "Review"
                    ? "bg-amber-100 text-amber-700"
                    : page.status === "Draft"
                      ? "bg-violet-100 text-violet-700"
                      : "bg-emerald-50 text-emerald-700"
                }`}
              >
                {page.status}
              </span>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">Visibility</span>
                <span className="text-sm font-bold text-slate-900">{page.visibility}</span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">Content Source</span>
                <span className="max-w-[58%] break-words text-right text-sm font-bold text-slate-900">{page.source}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">SEO Status</span>
                <span className={`text-sm font-bold ${page.seoStatus === "Ready" ? "text-emerald-700" : "text-amber-700"}`}>
                  {page.seoStatus}
                </span>
              </div>
              <AdminActionLink action={page.action} className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-left text-sm font-bold text-blue-700 transition hover:bg-blue-100">
                {page.action}
              </AdminActionLink>
              <Link
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                href={page.previewHref}
              >
                Preview Page
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Page Readiness</h2>
          <p className="mt-1 text-sm text-slate-500">Kesiapan struktur halaman sebelum publish.</p>
          <div className="mt-6">
            <DetailList items={readiness} />
          </div>
        </article>

        <article className="rounded-[2rem] border border-blue-100 bg-blue-50/50 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">SEO Coverage</h2>
          <p className="mt-1 text-sm text-slate-500">Status metadata dan coverage SEO per halaman.</p>
          <div className="mt-6">
            <DetailList items={seoCoverage} />
          </div>
        </article>
      </div>

      <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
        <h2 className="text-xl font-bold text-slate-950">Aksi Cepat</h2>
        <p className="mt-1 text-sm text-slate-500">Akses cepat untuk struktur halaman, SEO, preview, dan publish readiness.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {pagesControlPanel.quickActions.map((action, index) => (
            <AdminActionLink
              action={action}
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                index === 0
                  ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                  : action === "Review Drafts"
                    ? "border-amber-100 bg-amber-50 text-amber-700 hover:bg-amber-100"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
              key={action}
            >
              {action}
            </AdminActionLink>
          ))}
        </div>
      </article>
    </section>
  );
}
