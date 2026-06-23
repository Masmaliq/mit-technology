import { motionEffectsControlPanel } from "@/lib/admin-dashboard-data";

const summaryTone: Record<string, string> = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
  violet: "border-violet-100 bg-violet-50 text-violet-700",
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

function MotionCard({
  title,
  description,
  items,
  accent = "blue",
}: {
  title: string;
  description: string;
  items: string[][];
  accent?: "blue" | "violet" | "emerald";
}) {
  const accentClass = {
    blue: "border-blue-100 bg-blue-50/50",
    violet: "border-violet-100 bg-violet-50/60",
    emerald: "border-emerald-100 bg-emerald-50/50",
  }[accent];

  return (
    <article className={`rounded-[2rem] border p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-7 ${accentClass}`}>
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
      <div className="mt-6">
        <DetailList items={items} />
      </div>
    </article>
  );
}

export default function MotionEffectsControlPanel() {
  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] border border-white bg-gradient-to-br from-white via-blue-50/60 to-violet-50 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-xs font-bold text-blue-700">
              {motionEffectsControlPanel.header.badge}
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {motionEffectsControlPanel.header.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              {motionEffectsControlPanel.header.description}
            </p>
          </div>

          <button
            className="w-fit rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
            type="button"
          >
            {motionEffectsControlPanel.header.action}
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {motionEffectsControlPanel.summary.map((item) => (
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

      <div className="grid gap-6 xl:grid-cols-2">
        <MotionCard
          description="Preset animasi utama yang menjaga ritme premium di halaman publik."
          items={motionEffectsControlPanel.presets}
          title="Motion Preset Status"
        />
        <MotionCard
          accent="violet"
          description="Konfigurasi reveal agar tidak terasa terlalu lambat atau terlalu ramai."
          items={motionEffectsControlPanel.animationBehavior}
          title="Animation Behavior"
        />
        <MotionCard
          accent="emerald"
          description="Pengaturan scroll interaction yang ringan dan aman untuk performa."
          items={motionEffectsControlPanel.scrollInteraction}
          title="Scroll Interaction"
        />
        <MotionCard
          description="Fallback mobile agar motion tetap halus di perangkat kecil."
          items={motionEffectsControlPanel.mobileFallback}
          title="Mobile Fallback"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Readiness Checklist</h2>
          <p className="mt-1 text-sm text-slate-500">Checklist kesiapan motion system sebelum production.</p>
          <div className="mt-6">
            <DetailList items={motionEffectsControlPanel.readiness} />
          </div>
        </article>

        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Quick Actions</h2>
          <p className="mt-1 text-sm text-slate-500">Akses cepat untuk workflow motion effects.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {motionEffectsControlPanel.quickActions.map((action, index) => (
              <button
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                  index === 0
                    ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                    : action === "Disable Heavy Motion"
                      ? "border-rose-100 bg-rose-50 text-rose-700 hover:bg-rose-100"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
                key={action}
                type="button"
              >
                {action}
              </button>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
