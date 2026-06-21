import { TextReveal } from "@/components/motion/Motion";

type TrustItem = {
  title?: string;
  order?: number;
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

const fallbackTrustCards = [
  {
    title: "Strategy",
    description: "Senior-led planning before production begins.",
  },
  {
    title: "Systems",
    description: "Web, commerce, application, and AI foundations built to scale.",
  },
  {
    title: "Clarity",
    description: "Structured delivery paths for decision makers and teams.",
  },
  {
    title: "Trust",
    description: "Premium digital presence designed for credibility.",
  },
];

export function Trust({ eyebrow, title, description, items }: TrustProps) {
  const trustEyebrow = eyebrow || "DIBANGUN UNTUK KEPERCAYAAN";
  const trustTitle =
    title ||
    "Fondasi digital untuk bisnis yang perlu tampil kredibel sejak kesan pertama.";
  const trustDescription =
    description ||
    "MIT Technology menggabungkan arahan strategis, desain yang rapi, dan engineering yang stabil untuk membangun kehadiran digital yang lebih meyakinkan.";
  const metrics =
    items && items.length > 0
      ? [...items]
          .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
          .map((item) => ({
            title: item.title || item.value || "",
            description: item.description || item.label || "",
          }))
      : fallbackTrustCards;

  return (
    <section id="trust" aria-label="Trust" className="border-y border-slate-200/70 bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
          <div className="max-w-2xl">
            <TextReveal
              as="p"
              className="text-sm font-semibold uppercase tracking-[0.24em] text-primary"
              direction="down"
              mode="chars"
              stagger={0.018}
              text={trustEyebrow}
            />
            <TextReveal
              as="h2"
              className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl"
              direction="right"
              mode="words"
              text={trustTitle}
            />
            <TextReveal
              as="p"
              className="mt-5 text-lg leading-8 text-slate-600"
              direction="up"
              mode="lines"
              text={trustDescription}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {metrics.map((metric) => (
              <article
                className="min-h-44 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_26px_80px_rgba(15,23,42,0.08)]"
                key={`${metric.title}-${metric.description}`}
              >
                <div className="mb-8 h-1 w-10 rounded-full bg-primary/70" />
                <p className="text-2xl font-semibold tracking-tight text-navy">{metric.title}</p>
                <p className="mt-3 leading-7 text-slate-600">{metric.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
