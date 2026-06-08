type TrustItem = {
  value?: string;
  label?: string;
  description?: string;
};

type TrustProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: TrustItem[];
};

const fallbackTrustItems = [
  {
    value: "Strategy",
    label: "Senior-led planning before production begins.",
  },
  {
    value: "Systems",
    label: "Web, commerce, application, and AI foundations built to scale.",
  },
  {
    value: "Clarity",
    label: "Structured delivery paths for decision makers and teams.",
  },
  {
    value: "Trust",
    label: "Premium digital presence designed for credibility.",
  },
];

export function Trust({ eyebrow, title, description, items }: TrustProps) {
  const trustEyebrow = eyebrow || "Built for trust";
  const trustTitle =
    title ||
    "Digital foundations for businesses that need to look established before the first meeting.";
  const trustDescription =
    description ||
    "MIT Technology combines consulting clarity, refined interface design, and resilient engineering for companies that need their digital presence to carry executive confidence.";
  const metrics =
    items && items.length > 0
      ? items.map((item) => ({
          value: item.value || item.label || "",
          label: item.description || item.label || "",
        }))
      : fallbackTrustItems;

  return (
    <section id="trust" aria-label="Trust" className="border-y border-slate-200/70 bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              {trustEyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl">
              {trustTitle}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">{trustDescription}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {metrics.map((metric) => (
              <article
                className="min-h-44 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_26px_80px_rgba(15,23,42,0.08)]"
                key={metric.label}
              >
                <div className="mb-8 h-1 w-10 rounded-full bg-primary/70" />
                <p className="text-2xl font-semibold tracking-tight text-navy">{metric.value}</p>
                <p className="mt-3 leading-7 text-slate-600">{metric.label}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
