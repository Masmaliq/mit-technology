import { processSteps } from "@/data/site";

export function Process() {
  return (
    <section id="process" aria-label="Process" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Process
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl">
            A calm, executive build process before a single pixel becomes permanent.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((item) => (
            <div
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-glass-lg"
              key={item.step}
            >
              <span className="text-sm font-bold text-primary">{item.step}</span>
              <h3 className="mt-10 text-2xl font-semibold text-navy">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
