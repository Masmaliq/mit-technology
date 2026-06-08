import type { ImpactMetricItem } from "@/lib/sanity/queries";

type ImpactMetricsProps = {
  metrics?: ImpactMetricItem[];
};

export function ImpactMetrics({ metrics = [] }: ImpactMetricsProps) {
  const visibleMetrics = metrics.filter((item) => item.value && item.label && item.featured !== false);

  return (
    <section aria-label="Impact metrics" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9A7B38]">
            Impact Metrics
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl">
            Measurable momentum for long-term growth.
          </h2>
        </div>

        {visibleMetrics.length > 0 ? (
          <div className="mt-16 grid divide-y divide-slate-200 border-y border-slate-200 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
            {visibleMetrics.map((item) => (
              <article className="px-0 py-10 md:px-8 lg:px-10" key={`${item.value}-${item.label}`}>
                {item.icon ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9A7B38]">
                    {item.icon}
                  </p>
                ) : null}
                <p className="mt-5 text-5xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                  {item.value}
                </p>
                <h3 className="mt-5 text-lg font-semibold text-slate-950">{item.label}</h3>
                <p className="mt-3 leading-7 text-slate-500">{item.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-14 max-w-2xl rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 px-8 py-10 text-center">
            <p className="text-sm font-medium text-slate-500">
              Impact metrics are ready to be managed from Sanity Studio.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
