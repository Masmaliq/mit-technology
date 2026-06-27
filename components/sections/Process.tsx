import { StaggerContainer, StaggerItem, TextReveal } from "@/components/motion/Motion";
import type { ProcessItem } from "@/lib/sanity/queries";

type ProcessProps = {
  processes?: ProcessItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function Process({ processes = [], eyebrow, title, description }: ProcessProps) {
  const visibleProcesses = processes.filter((item) => item.title && item.featured !== false);
  const displayEyebrow = eyebrow?.trim() || "";
  const displayTitle = title?.trim() || "";
  const displayDescription = description?.trim() || "";
  const hasHeading = Boolean(displayEyebrow || displayTitle || displayDescription);

  if (!hasHeading && visibleProcesses.length === 0) {
    return null;
  }

  return (
    <section id="process" aria-label="Process" className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
                className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl"
                direction="up"
                mode="words"
                text={displayTitle}
              />
            ) : null}
            {displayDescription ? (
              <TextReveal
                as="p"
                className="mt-5 text-lg leading-8 text-slate-600"
                direction="up"
                mode="lines"
                text={displayDescription}
              />
            ) : null}
          </div>
        ) : null}

        {visibleProcesses.length > 0 ? (
          <StaggerContainer className="mt-8 grid gap-2 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-200 md:grid-cols-2 lg:mt-12 lg:grid-cols-5 lg:gap-px lg:rounded-[2rem]">
            {visibleProcesses.map((item, index) => (
              <StaggerItem className="h-full" key={item.slug ?? item.title}>
                <article className="group flex flex-col bg-white p-4 transition duration-300 hover:bg-slate-50 lg:min-h-[300px] lg:justify-between lg:p-7">
                  <div className="flex items-start justify-between gap-4 lg:block">
                    <span className="block text-3xl font-semibold leading-none tracking-tight text-slate-200 transition duration-300 group-hover:text-primary/20 lg:text-6xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.icon ? (
                      <p className="mt-1 text-right text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-primary lg:mt-8 lg:text-left lg:text-xs lg:tracking-[0.24em]">
                        {item.icon}
                      </p>
                    ) : null}
                  </div>
                  <div className="mt-3 lg:mt-0">
                    <h3 className="text-lg font-semibold tracking-tight text-navy lg:text-2xl">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-[1.45] text-slate-600 lg:mt-4 lg:text-base lg:leading-7">{item.shortDescription}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="mx-auto mt-14 max-w-2xl rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 px-8 py-10 text-center">
            <p className="text-sm font-medium text-slate-500">
              Process content is not available yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
