import AdminActionLink from "@/components/admin/AdminActionLink";
import { testimonialsControlPanel } from "@/lib/admin-dashboard-data";
import type { TestimonialItem } from "@/lib/sanity/queries";

const summaryTone: Record<string, string> = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
  violet: "border-violet-100 bg-violet-50 text-violet-700",
  amber: "border-amber-100 bg-amber-50 text-amber-700",
};

function hasAvatar(testimonial: TestimonialItem) {
  return Boolean(
    testimonial.avatar?.url ||
      testimonial.avatar?.asset?.url ||
      testimonial.image?.url ||
      testimonial.image?.asset?.url ||
      testimonial.logo?.url ||
      testimonial.logo?.asset?.url ||
      testimonial.photo?.url ||
      testimonial.photo?.asset?.url ||
      testimonial.clientLogo?.url ||
      testimonial.clientLogo?.asset?.url
  );
}

function normalizeTestimonials(testimonials?: TestimonialItem[]) {
  if (!testimonials?.length) {
    return testimonialsControlPanel.featuredTestimonials;
  }

  return [...testimonials]
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    .slice(0, 3)
    .map((testimonial) => ({
      client: testimonial.name || testimonial.company || "Untitled Testimonial",
      role: testimonial.position || testimonial.company || "Client Testimonial",
      status: testimonial.featured ? "Featured" : "Published",
      quote: testimonial.quote || "Quote belum tersedia dari Sanity.",
      rating: testimonial.rating ? testimonial.rating.toFixed(1) : "N/A",
      tag: testimonial.featured ? "Featured" : hasAvatar(testimonial) ? "Published" : "Review",
      featured: Boolean(testimonial.featured),
    }));
}

function buildSummary(testimonials?: TestimonialItem[]) {
  if (!testimonials?.length) {
    return testimonialsControlPanel.summary;
  }

  const featuredCount = testimonials.filter((item) => item.featured).length;
  const needReviewCount = testimonials.filter((item) => !item.quote || !hasAvatar(item) || !item.position).length;

  return [
    { label: "Total Testimonials", value: `${testimonials.length}`, tone: "blue" },
    { label: "Published", value: `${testimonials.length}`, tone: "emerald" },
    { label: "Need Review", value: `${needReviewCount}`, tone: "amber" },
    { label: "Featured", value: `${featuredCount}`, tone: "violet" },
  ];
}

function buildReadiness(testimonials?: TestimonialItem[]) {
  if (!testimonials?.length) {
    return testimonialsControlPanel.readiness;
  }

  const hasAny = (predicate: (item: TestimonialItem) => boolean) => testimonials.some(predicate);

  return [
    ["Client Name", hasAny((item) => Boolean(item.name || item.company)) ? "Ready" : "Review"],
    ["Client Role", hasAny((item) => Boolean(item.position || item.company)) ? "Ready" : "Review"],
    ["Quote", hasAny((item) => Boolean(item.quote)) ? "Ready" : "Review"],
    ["Avatar / Logo", hasAny(hasAvatar) ? "Uploaded" : "Review"],
    ["Rating", hasAny((item) => typeof item.rating === "number") ? "Ready" : "Review"],
    ["Approval Status", testimonials.some((item) => item.featured) ? "Ready" : "Review"],
  ];
}

function buildWorkflow(testimonials?: TestimonialItem[]) {
  if (!testimonials?.length) {
    return testimonialsControlPanel.workflow;
  }

  return [
    ["Published Content", `${testimonials.length}`],
    ["Need Review", `${testimonials.filter((item) => !item.quote || !hasAvatar(item) || !item.position).length}`],
    ["Draft", "0"],
    ["Missing Avatar", `${testimonials.filter((item) => !hasAvatar(item)).length}`],
    ["Missing Client Role", `${testimonials.filter((item) => !item.position && !item.company).length}`],
    ["Featured Testimonials", `${testimonials.filter((item) => item.featured).length}`],
  ];
}

function DetailList({ items }: { items: string[][] }) {
  return (
    <div className="space-y-3">
      {items.map(([label, value]) => {
        const warning = value === "Review" || value === "4" || value === "3" || value === "2" || value === "1";

        return (
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3" key={label}>
            <span className="text-sm text-slate-500">{label}</span>
            <span className={`text-sm font-bold ${warning ? "text-amber-700" : "text-slate-900"}`}>
              {value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function TestimonialsControlPanel({ testimonials }: { testimonials?: TestimonialItem[] }) {
  const summaryCards = buildSummary(testimonials);
  const featuredTestimonials = normalizeTestimonials(testimonials);
  const readiness = buildReadiness(testimonials);
  const workflow = buildWorkflow(testimonials);

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] border border-white bg-gradient-to-br from-white via-blue-50/60 to-violet-50 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-xs font-bold text-blue-700">
              {testimonialsControlPanel.header.badge}
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {testimonialsControlPanel.header.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              {testimonialsControlPanel.header.description}
            </p>
          </div>

          <AdminActionLink
            action={testimonialsControlPanel.header.action}
            className="w-fit rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
          >
            {testimonialsControlPanel.header.action}
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
        {featuredTestimonials.map((item) => (
          <article
            className={`flex h-full flex-col rounded-[2rem] border p-5 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-6 ${
              item.featured
                ? "border-violet-100 bg-violet-50/60 shadow-[0_24px_80px_rgba(124,58,237,0.08)]"
                : item.status === "Waiting Approval"
                  ? "border-amber-100 bg-amber-50/65"
                  : "border-slate-200/80 bg-white"
            }`}
            key={item.client}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{item.role}</div>
                <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-950">{item.client}</h2>
              </div>
              <span
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${
                  item.status === "Waiting Approval"
                    ? "bg-amber-100 text-amber-700"
                    : item.status === "Featured"
                      ? "bg-violet-600 text-white"
                      : "bg-emerald-50 text-emerald-700"
                }`}
              >
                {item.status}
              </span>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">“{item.quote}”</p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600">
                Rating {item.rating}
              </span>
              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                {item.tag}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Testimonial Readiness</h2>
          <p className="mt-1 text-sm text-slate-500">Status kelengkapan struktur testimonial.</p>
          <div className="mt-6">
            <DetailList items={readiness} />
          </div>
        </article>

        <article className="rounded-[2rem] border border-amber-100 bg-amber-50/65 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Approval Workflow</h2>
          <p className="mt-1 text-sm text-slate-600">Pipeline approval dan kelengkapan data testimonial.</p>
          <div className="mt-6">
            <DetailList items={workflow} />
          </div>
        </article>

        <article className="rounded-[2rem] border border-blue-100 bg-blue-50/50 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Display Settings</h2>
          <p className="mt-1 text-sm text-slate-500">Status penempatan testimonial pada halaman website.</p>
          <div className="mt-6">
            <DetailList items={testimonialsControlPanel.displaySettings} />
          </div>
        </article>
      </div>

      <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
        <h2 className="text-xl font-bold text-slate-950">Quick Actions</h2>
        <p className="mt-1 text-sm text-slate-500">Akses cepat untuk workflow testimonial dan approval.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {testimonialsControlPanel.quickActions.map((action, index) => (
            <AdminActionLink
              action={action}
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                index === 0
                  ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                  : action === "Review Approval"
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
