import { trustedBy, trustMetrics } from "@/data/site";

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

export function Trust({ eyebrow, title, description, items }: TrustProps) {
  const trustEyebrow = eyebrow || "Built for trust";
  const trustTitle =
    title ||
    "Digital foundations for businesses that need to look established before the first meeting.";
  const trustDescription = description;
  const metrics =
    items && items.length > 0
      ? items.map((item) => ({
          value: item.value || item.label || "",
          label: item.description || item.label || "",
        }))
      : trustMetrics;

  return (
    <section id="trust" aria-label="Trust" className="border-y border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              {trustEyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-navy md:text-3xl">
              {trustTitle}
            </h2>
            {trustDescription ? (
              <p className="mt-4 text-base leading-7 text-slate-600">{trustDescription}</p>
            ) : null}
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {metrics.map((metric) => (
              <div
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-glass-lg"
                key={metric.label}
              >
                <p className="text-2xl font-semibold text-navy">{metric.value}</p>
                <p className="mt-2 text-sm leading-5 text-slate-500">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          {trustedBy.map((name) => (
            <span
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600"
              key={name}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
