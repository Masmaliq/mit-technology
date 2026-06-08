import type { ProcessItem } from "@/lib/sanity/queries";

type ProcessProps = {
  processes?: ProcessItem[];
};

export function Process({ processes = [] }: ProcessProps) {
  const visibleProcesses = processes.filter((item) => item.title && item.featured !== false);

  return (
    <section id="process" aria-label="Process" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            MIT Growth Framework
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl">
            A consulting framework for digital infrastructure, automation, and AI.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            From strategic clarity to scalable systems, every stage is designed to make growth more operational.
          </p>
        </div>

        {visibleProcesses.length > 0 ? (
          <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-5">
            {visibleProcesses.map((item, index) => (
              <article
                className="group flex min-h-[300px] flex-col justify-between bg-white p-7 transition duration-300 hover:bg-slate-50"
                key={item.slug ?? item.title}
              >
                <div>
                  <span className="block text-6xl font-semibold tracking-tight text-slate-200 transition duration-300 group-hover:text-primary/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.icon ? (
                    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                      {item.icon}
                    </p>
                  ) : null}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-navy">{item.title}</h3>
                  <p className="mt-4 leading-7 text-slate-600">{item.shortDescription}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-14 max-w-2xl rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 px-8 py-10 text-center">
            <p className="text-sm font-medium text-slate-500">
              Process Framework content is ready to be managed from Sanity Studio.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
