import Link from "next/link";
import { ArrowRight, CheckCircle2, Gauge, Layers3, ShieldCheck, Sparkles } from "lucide-react";
export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.16),transparent_32%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]"
    >
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-28">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Web • Apps • AI
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-navy md:text-7xl">
            Enterprise digital systems built for credible growth.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            MIT Technology designs and builds company profiles, ecommerce platforms, web apps,
            and AI ecosystems for businesses that need a sharper digital presence and measurable
            operating leverage.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white shadow-glass-lg transition duration-300 hover:-translate-y-1 hover:bg-blue-700"
            >
              Start a strategic build
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 px-6 py-4 text-sm font-semibold text-navy transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:text-primary"
            >
              View selected work
            </Link>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
            {["Conversion-first", "Scalable architecture", "Corporate credibility"].map((item) => (
              <div className="flex items-center gap-2" key={item}>
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-glass-lg backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-slate-200 bg-navy p-5 text-white">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">MIT Growth Console</p>
                  <p className="text-xl font-semibold">Digital readiness map</p>
                </div>
                <div className="rounded-full bg-primary/20 p-3 text-blue-200">
                  <Layers3 className="h-5 w-5" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Brand trust", value: "92%", icon: ShieldCheck },
                  { label: "Launch velocity", value: "30d", icon: Gauge }
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      className="rounded-2xl border border-white/10 bg-white/10 p-4"
                      key={item.label}
                    >
                      <Icon className="mb-6 h-5 w-5 text-blue-200" />
                      <p className="text-3xl font-semibold">{item.value}</p>
                      <p className="mt-1 text-sm text-slate-300">{item.label}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 rounded-2xl bg-white p-5 text-navy">
                <p className="text-sm font-semibold text-slate-500">Recommended stack</p>
                <div className="mt-4 space-y-3">
                  {["Corporate website", "Lead funnel", "Analytics layer", "AI workflow"].map(
                    (item, index) => (
                      <div className="flex items-center gap-3" key={item}>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {index + 1}
                        </span>
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
