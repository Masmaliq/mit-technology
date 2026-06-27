import Link from "next/link";

import AdminActionLink from "@/components/admin/AdminActionLink";
import { sectionsControlPanel } from "@/lib/admin-dashboard-data";
import type {
  CaseStudyItem,
  ClientLogoItem,
  Footer,
  Homepage,
  PackageItem,
  ProcessItem,
  SiteSettings,
  SolutionItem,
  TestimonialItem,
} from "@/lib/sanity/queries";

const summaryTone: Record<string, string> = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
  violet: "border-violet-100 bg-violet-50 text-violet-700",
  amber: "border-amber-100 bg-amber-50 text-amber-700",
};

type SectionsAdminData = {
  homepage?: Homepage;
  clientLogos?: ClientLogoItem[];
  solutions?: SolutionItem[];
  packages?: PackageItem[];
  caseStudies?: CaseStudyItem[];
  testimonials?: TestimonialItem[];
  footer?: Footer;
  siteSettings?: SiteSettings;
  processes?: ProcessItem[];
};

type SectionStatus = {
  title: string;
  status: string;
  placement: string;
  editable: string;
  readiness: string;
  action: string;
  mediaStatus: string;
  order: string;
  page: string;
  previewHref: string;
  source: string;
};

function hasObjectValue(value?: Record<string, unknown>) {
  return Boolean(value && Object.values(value).some((item) => Array.isArray(item) ? item.length > 0 : Boolean(item)));
}

function hasSectionsData(data?: SectionsAdminData) {
  return Boolean(
    hasObjectValue(data?.homepage as Record<string, unknown> | undefined) ||
      hasObjectValue(data?.footer as Record<string, unknown> | undefined) ||
      hasObjectValue(data?.siteSettings as Record<string, unknown> | undefined) ||
      data?.clientLogos?.length ||
      data?.solutions?.length ||
      data?.packages?.length ||
      data?.caseStudies?.length ||
      data?.testimonials?.length ||
      data?.processes?.length
  );
}

function sectionStatus(ready: boolean) {
  return ready ? "Active" : "Hidden";
}

function sectionReadiness(ready: boolean) {
  return ready ? "Ready" : "Review";
}

function sectionCard({
  action,
  mediaStatus = "Content",
  order,
  page = "Homepage",
  placement,
  previewHref = "/",
  ready,
  source,
  title,
}: {
  action: string;
  mediaStatus?: string;
  order: string;
  page?: string;
  placement: string;
  previewHref?: string;
  ready: boolean;
  source: string;
  title: string;
}): SectionStatus {
  return {
    action,
    editable: source,
    mediaStatus,
    order,
    page,
    placement,
    previewHref,
    readiness: sectionReadiness(ready),
    source,
    status: sectionStatus(ready),
    title,
  };
}

function buildSections(data?: SectionsAdminData): SectionStatus[] {
  if (!hasSectionsData(data)) {
    return sectionsControlPanel.sections.map((section) => ({
      ...section,
      action: section.action || "Review Readiness",
      mediaStatus: section.mediaStatus || "Blueprint",
      order: section.order || "00",
      page: section.page || "Homepage",
      previewHref: section.previewHref || "/admin/sections",
      source: section.source || section.editable || "Blueprint",
    }));
  }

  const homepage = data?.homepage;
  const hasHero = Boolean(homepage?.heroTitle || homepage?.heroDescription || homepage?.heroBackgroundImage || homepage?.heroBackgroundVideoMp4);
  const hasClientLogos = Boolean(data?.clientLogos?.length || homepage?.clientLogosTitle || homepage?.clientLogosDescription);
  const hasSolutions = Boolean(data?.solutions?.length || homepage?.solutionsPreviewTitle || homepage?.solutionsPreviewDescription);
  const hasProcess = Boolean(data?.processes?.length || homepage?.processTitle || homepage?.processDescription);
  const hasPackages = Boolean(data?.packages?.length);
  const hasCaseStudies = Boolean(data?.caseStudies?.length || homepage?.caseStudiesPreviewTitle || homepage?.caseStudiesPreviewDescription);
  const hasImpactMetrics = Boolean(homepage?.impactMetricsItems?.length || homepage?.impactMetricsTitle || homepage?.impactMetricsDescription);
  const hasTestimonials = Boolean(data?.testimonials?.length || homepage?.testimonialsTitle || homepage?.testimonialsDescription);
  const hasCta = Boolean(homepage?.ctaTitle || homepage?.ctaDescription || homepage?.ctaButtonLabel);
  const hasFooter = Boolean(data?.footer?.description || data?.footer?.email || data?.footer?.whatsapp || data?.siteSettings?.companyName || data?.siteSettings?.siteTitle);
  const hasBackgroundScene = Boolean(homepage?.enableCinematicFlow || homepage?.cinematicVideoMp4 || homepage?.heroBackgroundVideoMp4 || homepage?.heroBackgroundImage);
  const hasMotion = Boolean(homepage?.heroMotionType && homepage.heroMotionType !== "none");

  return [
    sectionCard({
      action: "Edit Hero",
      mediaStatus: hasBackgroundScene ? "Visual Ready" : "Visual Review",
      order: "01",
      placement: "Top",
      ready: hasHero || hasBackgroundScene,
      source: "Homepage Settings",
      title: "Hero",
    }),
    sectionCard({
      action: "Open Sanity",
      mediaStatus: `${data?.clientLogos?.length ?? 0} Logos`,
      order: "02",
      placement: "After Hero",
      ready: hasClientLogos,
      source: data?.clientLogos?.length ? "Client Logos Collection" : "Homepage Settings",
      title: "Client Logos",
    }),
    sectionCard({
      action: "Edit Solutions",
      mediaStatus: homepage?.solutionsPreviewImage ? "Image Ready" : "Content",
      order: "03",
      placement: "Homepage Preview",
      ready: hasSolutions,
      source: data?.solutions?.length ? "Solutions Collection" : "Homepage Settings",
      title: "Solutions",
    }),
    sectionCard({
      action: "Open Sanity",
      mediaStatus: `${data?.processes?.length ?? 0} Steps`,
      order: "04",
      placement: "Growth Framework",
      ready: hasProcess,
      source: data?.processes?.length ? "Process Collection" : "Homepage Settings",
      title: "Process",
    }),
    sectionCard({
      action: "Edit Packages",
      mediaStatus: `${data?.packages?.length ?? 0} Packages`,
      order: "05",
      placement: "Pricing Preview",
      ready: hasPackages,
      source: "Package Collection",
      title: "Packages",
    }),
    sectionCard({
      action: "Review Cases",
      mediaStatus: homepage?.featuredBannerBackgroundImage ? "Banner Ready" : `${data?.caseStudies?.length ?? 0} Cases`,
      order: "06",
      placement: "Proof Banner",
      ready: hasCaseStudies,
      source: data?.caseStudies?.length ? "Case Study Collection" : "Homepage Settings",
      title: "Case Studies",
    }),
    sectionCard({
      action: "Open Sanity",
      mediaStatus: `${homepage?.impactMetricsItems?.length ?? 0} Metrics`,
      order: "07",
      placement: "Metrics Band",
      ready: hasImpactMetrics,
      source: "Homepage Settings",
      title: "Impact Metrics",
    }),
    sectionCard({
      action: "Preview Testimonials",
      mediaStatus: `${data?.testimonials?.length ?? 0} Quotes`,
      order: "08",
      placement: "Social Proof",
      ready: hasTestimonials,
      source: data?.testimonials?.length ? "Testimonials Collection" : "Homepage Settings",
      title: "Testimonials",
    }),
    sectionCard({
      action: "Edit CTA",
      mediaStatus: "Conversion",
      order: "09",
      placement: "Before Footer",
      ready: hasCta,
      source: "Homepage Settings",
      title: "CTA",
    }),
    sectionCard({
      action: "Edit Footer",
      mediaStatus: data?.footer?.enableFooterBackground ? "Background Ready" : "Content",
      order: "10",
      page: "Global",
      placement: "Global Closing",
      previewHref: "/admin/footer",
      ready: hasFooter,
      source: "Footer Settings",
      title: "Footer",
    }),
    sectionCard({
      action: "Edit Scene",
      mediaStatus: hasBackgroundScene ? "Video / Image" : "Review",
      order: "BG",
      placement: "Hero / Cinematic",
      previewHref: "/admin/background-scene",
      ready: hasBackgroundScene,
      source: "Visual Settings",
      title: "Background Scene",
    }),
    sectionCard({
      action: "Edit Motion",
      mediaStatus: hasMotion ? "Motion Ready" : "Optional",
      order: "FX",
      placement: "Visual Layer",
      previewHref: "/admin/motion-effects",
      ready: hasMotion,
      source: "Motion Settings",
      title: "Motion Effects",
    }),
  ];
}

function buildSectionsOverview(data?: SectionsAdminData) {
  if (!hasSectionsData(data)) {
    return [
      ["Sumber Data", "Blueprint fallback"],
      ["Section Registry", "Review"],
      ["Reusable Blocks", "Blueprint Ready"],
      ["Visual Status", "Review"],
      ["Content Source", "Blueprint"],
    ];
  }

  const sections = buildSections(data);
  const activeCount = sections.filter((section) => section.status === "Active").length;
  const reviewCount = sections.filter((section) => section.readiness === "Review").length;
  const reusableCount = sections.filter((section) => section.source.includes("Collection") || section.source.includes("Settings")).length;

  return [
    ["Sumber Data", "Sanity + Admin Registry"],
    ["Section Registry", `${sections.length} Section`],
    ["Active Sections", `${activeCount} Aktif`],
    ["Reusable Blocks", `${reusableCount} Reusable`],
    ["Need Attention", reviewCount ? `${reviewCount} Review` : "Ready"],
  ];
}

function buildSummary(data?: SectionsAdminData) {
  if (!hasSectionsData(data)) {
    return sectionsControlPanel.summary;
  }

  const sections = buildSections(data);
  const activeCount = sections.filter((section) => section.status === "Active").length;
  const hiddenCount = sections.length - activeCount;
  const reviewCount = sections.filter((section) => section.readiness === "Review").length;

  return [
    { label: "Total Sections", value: `${sections.length}`, tone: "blue" },
    { label: "Active Sections", value: `${activeCount}`, tone: "emerald" },
    { label: "Hidden Sections", value: `${hiddenCount}`, tone: "violet" },
    { label: "Need Attention", value: `${reviewCount}`, tone: "amber" },
  ];
}

function buildHomepageStructure(data?: SectionsAdminData) {
  if (!hasSectionsData(data)) {
    return sectionsControlPanel.homepageStructure;
  }

  const sections = buildSections(data);
  const findReadiness = (title: string) => sections.find((section) => section.title === title)?.readiness || "Review";

  return [
    ["Hero", findReadiness("Hero")],
    ["Trust / Logos", findReadiness("Client Logos")],
    ["Solutions Preview", findReadiness("Solutions")],
    ["Process", findReadiness("Process")],
    ["Case Studies Banner", findReadiness("Case Studies")],
    ["Impact Metrics", findReadiness("Impact Metrics")],
    ["Testimonials", findReadiness("Testimonials")],
    ["Final CTA", findReadiness("CTA")],
  ];
}

function buildOrderStatus(data?: SectionsAdminData) {
  if (!hasSectionsData(data)) {
    return sectionsControlPanel.orderStatus;
  }

  return [
    ["Hero", "01"],
    ["Client Logos", "02"],
    ["Solutions", "03"],
    ["Process", data?.processes?.length ? "04" : "Review"],
    ["Packages", "05"],
    ["Case Studies", "06"],
    ["Impact Metrics", data?.homepage?.impactMetricsItems?.length ? "07" : "Review"],
    ["Testimonials", "08"],
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

export default function SectionsControlPanel({ sectionsData }: { sectionsData?: SectionsAdminData }) {
  const summaryCards = buildSummary(sectionsData);
  const sectionCards = buildSections(sectionsData);
  const overview = buildSectionsOverview(sectionsData);
  const orderStatus = buildOrderStatus(sectionsData);
  const homepageStructure = buildHomepageStructure(sectionsData);
  const hasData = hasSectionsData(sectionsData);

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] border border-white bg-gradient-to-br from-white via-blue-50/60 to-emerald-50 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-emerald-100 bg-white/80 px-3 py-1.5 text-xs font-bold text-emerald-700">
              {sectionsControlPanel.header.badge}
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {sectionsControlPanel.header.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              {sectionsControlPanel.header.description}
            </p>
          </div>

          <AdminActionLink
            action={sectionsControlPanel.header.action}
            className="w-fit rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
          >
            {sectionsControlPanel.header.action}
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
              <h2 className="mt-4 text-xl font-bold text-slate-950">Section registry belum membaca data Sanity.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Panel menampilkan blueprint section sebagai preview aman. Hubungkan konten di Sanity agar status section membaca data real.
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

      <article className="rounded-[2rem] border border-emerald-100 bg-emerald-50/50 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-7">
        <h2 className="text-xl font-bold text-slate-950">Sections Overview</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Ringkasan susunan section, sumber konten, blok reusable, dan status visual.
        </p>
        <div className="mt-6">
          <DetailList items={overview} />
        </div>
      </article>

      <div className="grid gap-4 lg:grid-cols-2">
        {sectionCards.map((section) => (
          <article
            className={`rounded-[2rem] border p-5 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-6 ${
              section.status === "Hidden"
                ? "border-violet-100 bg-violet-50/55"
                : section.readiness === "Review"
                  ? "border-amber-100 bg-amber-50/55"
                  : "border-slate-200/80 bg-white"
            }`}
            key={section.title}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{section.page} · {section.order}</div>
                <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-950">{section.title}</h2>
                <p className="mt-2 text-sm font-semibold text-blue-700">{section.placement}</p>
              </div>
              <span
                className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ${
                  section.status === "Hidden" ? "bg-violet-100 text-violet-700" : "bg-emerald-50 text-emerald-700"
                }`}
              >
                {section.status}
              </span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Content Source</div>
                <div className="mt-1 text-sm font-bold text-slate-900">{section.source}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Media / Visual</div>
                <div className="mt-1 text-sm font-bold text-slate-900">{section.mediaStatus}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Readiness</div>
                <div className={`mt-1 text-sm font-bold ${section.readiness === "Review" ? "text-amber-700" : "text-emerald-700"}`}>
                  {section.readiness}
                </div>
              </div>
              <div className="grid gap-2">
                <AdminActionLink
                  action={section.action}
                  className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-left text-sm font-bold text-blue-700 transition hover:bg-blue-100"
                >
                  {section.action}
                </AdminActionLink>
                <Link
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  href={section.previewHref}
                >
                  Preview Section
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Section Order Status</h2>
          <p className="mt-1 text-sm text-slate-500">Urutan utama section homepage yang sedang aktif.</p>
          <div className="mt-6">
            <DetailList items={orderStatus} />
          </div>
        </article>

        <article className="rounded-[2rem] border border-emerald-100 bg-emerald-50/50 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Homepage Structure</h2>
          <p className="mt-1 text-sm text-slate-500">Kesiapan struktur section yang membentuk homepage.</p>
          <div className="mt-6">
            <DetailList items={homepageStructure} />
          </div>
        </article>
      </div>

      <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
        <h2 className="text-xl font-bold text-slate-950">Aksi Cepat</h2>
        <p className="mt-1 text-sm text-slate-500">Akses cepat untuk struktur section, visibility, order, dan readiness.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {sectionsControlPanel.quickActions.map((action, index) => (
            <AdminActionLink
              action={action}
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                index === 0
                  ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                  : action === "Review Readiness"
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
