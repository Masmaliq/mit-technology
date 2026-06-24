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

function buildSections(data?: SectionsAdminData): SectionStatus[] {
  if (!hasSectionsData(data)) {
    return sectionsControlPanel.sections;
  }

  const homepage = data?.homepage;
  const hasHero = Boolean(homepage?.heroTitle || homepage?.heroDescription || homepage?.heroBackgroundImage || homepage?.heroBackgroundVideoMp4);
  const hasClientLogos = Boolean(data?.clientLogos?.length || homepage?.clientLogosTitle || homepage?.clientLogosDescription);
  const hasSolutions = Boolean(data?.solutions?.length || homepage?.solutionsPreviewTitle || homepage?.solutionsPreviewDescription);
  const hasPackages = Boolean(data?.packages?.length);
  const hasCaseStudies = Boolean(data?.caseStudies?.length || homepage?.caseStudiesPreviewTitle || homepage?.caseStudiesPreviewDescription);
  const hasTestimonials = Boolean(data?.testimonials?.length || homepage?.testimonialsTitle || homepage?.testimonialsDescription);
  const hasCta = Boolean(homepage?.ctaTitle || homepage?.ctaDescription || homepage?.ctaButtonLabel);
  const hasFooter = Boolean(data?.footer?.description || data?.footer?.email || data?.footer?.whatsapp || data?.siteSettings?.companyName || data?.siteSettings?.siteTitle);

  return [
    { title: "Hero", status: sectionStatus(hasHero), placement: "Top", editable: "Homepage CMS", readiness: sectionReadiness(hasHero) },
    {
      title: "Client Logos",
      status: sectionStatus(hasClientLogos),
      placement: `${data?.clientLogos?.length ?? 0} Logos`,
      editable: "Collection",
      readiness: sectionReadiness(hasClientLogos),
    },
    {
      title: "Solutions",
      status: sectionStatus(hasSolutions),
      placement: `${data?.solutions?.length ?? 0} Items`,
      editable: "Collection",
      readiness: sectionReadiness(hasSolutions),
    },
    {
      title: "Packages",
      status: sectionStatus(hasPackages),
      placement: `${data?.packages?.length ?? 0} Packages`,
      editable: "Collection",
      readiness: sectionReadiness(hasPackages),
    },
    {
      title: "Case Studies",
      status: sectionStatus(hasCaseStudies),
      placement: `${data?.caseStudies?.length ?? 0} Cases`,
      editable: "Collection",
      readiness: sectionReadiness(hasCaseStudies),
    },
    {
      title: "Testimonials",
      status: sectionStatus(hasTestimonials),
      placement: `${data?.testimonials?.length ?? 0} Quotes`,
      editable: "Collection",
      readiness: sectionReadiness(hasTestimonials),
    },
    { title: "CTA", status: sectionStatus(hasCta), placement: "Before Footer", editable: "Homepage CMS", readiness: sectionReadiness(hasCta) },
    { title: "Footer", status: sectionStatus(hasFooter), placement: "Global Closing", editable: "Global CMS", readiness: sectionReadiness(hasFooter) },
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
    ["Case Studies Banner", findReadiness("Case Studies")],
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
    ["Case Studies", "04"],
    ["Framework", data?.processes?.length ? "05" : "Review"],
    ["Packages", "08"],
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
            <span className={`text-sm font-bold ${warning ? "text-amber-700" : ready ? "text-emerald-700" : "text-slate-900"}`}>
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
  const orderStatus = buildOrderStatus(sectionsData);
  const homepageStructure = buildHomepageStructure(sectionsData);

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
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{section.placement}</div>
                <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-950">{section.title}</h2>
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
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Editable</div>
                <div className="mt-1 text-sm font-bold text-slate-900">{section.editable}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Readiness</div>
                <div className={`mt-1 text-sm font-bold ${section.readiness === "Review" ? "text-amber-700" : "text-emerald-700"}`}>
                  {section.readiness}
                </div>
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
        <h2 className="text-xl font-bold text-slate-950">Quick Actions</h2>
        <p className="mt-1 text-sm text-slate-500">Akses cepat untuk section visibility, order, dan readiness.</p>
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
