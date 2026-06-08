import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";

type CTAProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export function CTA({
  eyebrow,
  title,
  description,
  buttonLabel,
  buttonHref,
}: CTAProps) {
  const ctaEyebrow = eyebrow || "Strategy-first engagement";
  const ctaTitle = title || "Build the digital system your next stage requires.";
  const ctaDescription =
    description ||
    "Tell MIT Technology where the business is going. We will map the website, platform, or AI workflow that can support that direction.";
  const ctaButtonLabel = buttonLabel || "Book a consultation";
  const ctaButtonHref = buttonHref || "/contact";

  return (
    <section id="cta" aria-label="Call to action" className="bg-white px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.32),transparent_34%),linear-gradient(135deg,#0f172a_0%,#172554_100%)] p-8 text-white shadow-glass-lg md:p-12 lg:p-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
              <CalendarCheck className="h-4 w-4" />
              {ctaEyebrow}
            </div>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              {ctaTitle}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              {ctaDescription}
            </p>
          </div>
          <Link
            href={ctaButtonHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold text-navy transition duration-300 hover:-translate-y-1 hover:bg-blue-50"
          >
            {ctaButtonLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
