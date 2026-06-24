import AdminActionLink from "@/components/admin/AdminActionLink";
import { caseStudiesControlPanel } from "@/lib/admin-dashboard-data";
import type { CaseStudyItem } from "@/lib/sanity/queries";

const summaryTone: Record<string, string> = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
  violet: "border-violet-100 bg-violet-50 text-violet-700",
  amber: "border-amber-100 bg-amber-50 text-amber-700",
};

function DetailList({ items }: { items: string[][] }) {
  return (
    <div className="space-y-3">
      {items.map(([label, value]) => (
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3" key={label}>
          <span className="text-sm text-slate-500">{label}</span>
          <span className="text-sm font-bold text-slate-900">{value}</span>
        </div>
      ))}
    </div>
  );
}

function hasImage(caseStudy: CaseStudyItem) {
  return Boolean(caseStudy.featuredImage?.url || caseStudy.featuredImage?.asset?.url || caseStudy.featuredImage?.asset?._ref);
}

function normalizeCaseCards(caseStudies?: CaseStudyItem[]) {
  if (!caseStudies?.length) {
    return caseStudiesControlPanel.featuredCases;
  }

  const orderedCases = [...caseStudies].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

  return orderedCases.slice(0, 3).map((item) => ({
    title: item.title || item.client || "Untitled Case Study",
    category: item.industry || item.client || "Case Study",
    status: item.featured ? "Featured" : "Published",
    result: item.result || item.solution || item.challenge || "Result copy belum tersedia di Sanity.",
    metrics: [
      item.client || "Client Ready",
      hasImage(item) ? "Thumbnail Ready" : "Thumbnail Missing",
      item.challenge && item.solution && item.result ? "Content Ready" : "Copy Review",
    ],
    cta: "Preview Case",
    featured: Boolean(item.featured),
  }));
}

function buildCaseSummary(caseStudies?: CaseStudyItem[]) {
  if (!caseStudies?.length) {
    return caseStudiesControlPanel.summary;
  }

  const featuredCount = caseStudies.filter((item) => item.featured).length;
  const needsReviewCount = caseStudies.filter((item) => !item.result || !hasImage(item)).length;

  return [
    { label: "Total Case Studies", value: `${caseStudies.length}`, tone: "blue" },
    { label: "Published", value: `${caseStudies.length}`, tone: "emerald" },
    { label: "Need Review", value: `${needsReviewCount}`, tone: needsReviewCount ? "amber" : "emerald" },
    { label: "Featured", value: `${featuredCount}`, tone: featuredCount ? "blue" : "violet" },
  ];
}

function buildReadiness(caseStudies?: CaseStudyItem[]) {
  if (!caseStudies?.length) {
    return caseStudiesControlPanel.readiness;
  }

  const hasAny = (predicate: (item: CaseStudyItem) => boolean) => caseStudies.some(predicate);

  return [
    ["Thumbnail Image", hasAny(hasImage) ? "Ready" : "Pending"],
    ["Client Name", hasAny((item) => Boolean(item.client)) ? "Ready" : "Pending"],
    ["Challenge", hasAny((item) => Boolean(item.challenge)) ? "Ready" : "Pending"],
    ["Solution", hasAny((item) => Boolean(item.solution)) ? "Ready" : "Pending"],
    ["Result", hasAny((item) => Boolean(item.result)) ? "Ready" : "Pending"],
    ["Gallery", hasAny((item) => Boolean(item.gallery?.length)) ? "Ready" : "Pending"],
  ];
}

function buildWorkflow(caseStudies?: CaseStudyItem[]) {
  if (!caseStudies?.length) {
    return caseStudiesControlPanel.workflow;
  }

  const readyToPublish = caseStudies.filter((item) => item.title && item.client && item.result && hasImage(item)).length;
  const missingThumbnail = caseStudies.filter((item) => !hasImage(item)).length;
  const missingResultCopy = caseStudies.filter((item) => !item.result).length;

  return [
    ["Published Content", `${caseStudies.length}`],
    ["Ready to Publish", `${readyToPublish}`],
    ["Featured Cases", `${caseStudies.filter((item) => item.featured).length}`],
    ["Missing Thumbnail", `${missingThumbnail}`],
    ["Missing Result Copy", `${missingResultCopy}`],
  ];
}

export default function CaseStudiesControlPanel({ caseStudies }: { caseStudies?: CaseStudyItem[] }) {
  const summaryCards = buildCaseSummary(caseStudies);
  const caseCards = normalizeCaseCards(caseStudies);
  const readiness = buildReadiness(caseStudies);
  const workflow = buildWorkflow(caseStudies);

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] border border-white bg-gradient-to-br from-white via-blue-50/60 to-violet-50 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-xs font-bold text-blue-700">
              {caseStudiesControlPanel.header.badge}
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {caseStudiesControlPanel.header.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              {caseStudiesControlPanel.header.description}
            </p>
          </div>

          <AdminActionLink
            action={caseStudiesControlPanel.header.action}
            className="w-fit rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
          >
            {caseStudiesControlPanel.header.action}
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

      <div className="grid gap-4 xl:grid-cols-3">
        {caseCards.map((item) => (
          <article
            className={`flex h-full flex-col rounded-[2rem] border p-5 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-6 ${
              item.featured
                ? "border-blue-200 bg-blue-50/50 shadow-[0_24px_80px_rgba(37,99,235,0.10)]"
                : "border-slate-200/80 bg-white"
            }`}
            key={item.title}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{item.category}</div>
                <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-950">{item.title}</h2>
              </div>
              <span
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${
                  item.status === "Featured"
                    ? "bg-blue-600 text-white"
                    : item.status === "Published"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-violet-50 text-violet-700"
                }`}
              >
                {item.status}
              </span>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">{item.result}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {item.metrics.map((metric) => (
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600" key={metric}>
                  {metric}
                </span>
              ))}
            </div>

            <AdminActionLink
              action={item.cta}
              className="mt-6 w-fit rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
            >
              {item.cta}
            </AdminActionLink>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Case Study Readiness</h2>
          <p className="mt-1 text-sm text-slate-500">Status kelengkapan struktur konten case study.</p>
          <div className="mt-6">
            <DetailList items={readiness} />
          </div>
        </article>

        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Content Workflow</h2>
          <p className="mt-1 text-sm text-slate-500">Ringkasan pipeline editorial dan publishing proof.</p>
          <div className="mt-6">
            <DetailList items={workflow} />
          </div>
        </article>
      </div>

      <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
        <h2 className="text-xl font-bold text-slate-950">Quick Actions</h2>
        <p className="mt-1 text-sm text-slate-500">Akses cepat untuk workflow case studies.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {caseStudiesControlPanel.quickActions.map((action, index) => (
            <AdminActionLink
              action={action}
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                index === 0
                  ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
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
