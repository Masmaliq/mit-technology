import { ScaleIn, StaggerContainer, StaggerItem, TextReveal } from "@/components/motion/Motion";
import type { ImpactMetricItem } from "@/lib/sanity/queries";

type ImpactMetricsProps = {
  metrics?: ImpactMetricItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function ImpactMetrics({ metrics = [], eyebrow, title, description }: ImpactMetricsProps) {
  const visibleMetrics = metrics.filter((item) => item.value && item.label);
  const cleanLabel = (label?: string) => label?.replace(/\s+De$/, "").trim();
  const displayEyebrow = eyebrow?.trim() || "";
  const displayTitle = title?.trim() || "";
  const displayDescription = description?.trim() || "";
  const hasHeading = Boolean(displayEyebrow || displayTitle || displayDescription);

  if (!hasHeading && visibleMetrics.length === 0) {
    return null;
  }

  return (
    <section aria-label="Impact metrics" className="bg-white py-5 md:py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {hasHeading ? (
          <div className="mx-auto max-w-3xl text-center">
            {displayEyebrow ? (
              <TextReveal
                as="p"
                className="text-sm font-semibold uppercase tracking-[0.24em] text-primary"
                direction="down"
                mode="chars"
                stagger={0.018}
                text={displayEyebrow}
              />
            ) : null}
            {displayTitle ? (
              <TextReveal
                as="h2"
                className="mt-3 text-3xl font-semibold tracking-tight text-navy md:mt-4 md:text-5xl"
                direction="up"
                mode="words"
                text={displayTitle}
              />
            ) : null}
            {displayDescription ? (
            <TextReveal
              as="p"
              className="mt-4 text-base leading-7 text-slate-600 md:text-lg md:leading-8"
              direction="up"
              mode="lines"
              text={displayDescription}
            />
            ) : null}
          </div>
        ) : null}

        {visibleMetrics.length > 0 ? (
          <StaggerContainer className="mt-5 grid grid-cols-1 gap-2.5 min-[390px]:grid-cols-2 md:mt-10 md:divide-y md:divide-slate-200 md:border-y md:border-slate-200 lg:mt-12 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {visibleMetrics.map((item) => (
              <StaggerItem key={`${item.value}-${item.label}`}>
                <article className="h-full rounded-2xl border border-slate-200 bg-slate-50/80 p-3 shadow-[0_14px_36px_rgba(15,23,42,0.04)] md:rounded-none md:border-0 md:bg-transparent md:px-8 md:py-10 md:shadow-none lg:px-10">
                  {item.icon ? (
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary md:text-xs md:tracking-[0.24em]">
                      {item.icon}
                    </p>
                  ) : null}
                  <ScaleIn>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 md:mt-5 md:text-6xl">
                      {item.value}
                    </p>
                  </ScaleIn>
                  <h3 className="mt-1.5 text-sm font-semibold leading-5 text-slate-950 md:mt-5 md:text-lg">{cleanLabel(item.label)}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-slate-500 md:mt-3 md:text-base md:leading-7">{item.description}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="mx-auto mt-14 max-w-2xl rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 px-8 py-10 text-center">
            <p className="text-sm font-medium text-slate-500">
              Impact metrics are not available yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
