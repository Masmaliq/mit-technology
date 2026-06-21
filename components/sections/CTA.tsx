import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { ScaleIn, TextReveal } from "@/components/motion/Motion";

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
  const ctaEyebrow = eyebrow?.trim() || "";
  const ctaTitle = title?.trim() || "";
  const ctaDescription = description?.trim() || "";
  const ctaButtonLabel = buttonLabel?.trim() || "";
  const ctaButtonHref = buttonHref?.trim() || "";
  const hasContent = Boolean(ctaEyebrow || ctaTitle || ctaDescription || (ctaButtonLabel && ctaButtonHref));

  if (!hasContent) {
    return null;
  }

  return (
    <section id="cta" aria-label="Call to action" className="bg-white px-5 py-10 sm:px-6 lg:px-8 lg:py-16">
      <ScaleIn className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.32),transparent_34%),linear-gradient(135deg,#0f172a_0%,#172554_100%)] p-6 text-white shadow-glass-lg md:rounded-[2rem] md:p-12 lg:p-16">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl motion-safe:animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-32 w-64 rounded-full bg-white/10 blur-3xl motion-safe:animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            {ctaEyebrow ? (
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
                <CalendarCheck className="h-4 w-4" />
                <TextReveal as="span" direction="down" mode="chars" stagger={0.018} text={ctaEyebrow} />
              </div>
            ) : null}
            {ctaTitle ? (
              <TextReveal
                as="h2"
                className="max-w-3xl text-3xl font-semibold tracking-tight md:text-6xl"
                direction="up"
                mode="words"
                text={ctaTitle}
              />
            ) : null}
            {ctaDescription ? (
              <TextReveal
                as="p"
                className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:mt-5 md:text-lg md:leading-8"
                direction="up"
                mode="lines"
                text={ctaDescription}
              />
            ) : null}
          </div>
          {ctaButtonLabel && ctaButtonHref ? (
            <Link
              href={ctaButtonHref}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold text-navy shadow-[0_18px_50px_rgba(15,23,42,0.18)] transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:bg-blue-50 hover:shadow-[0_24px_70px_rgba(37,99,235,0.24)]"
            >
              {ctaButtonLabel}
              <ArrowRight className="h-4 w-4 transition duration-300 ease-out group-hover:translate-x-1" />
            </Link>
          ) : null}
        </div>
      </ScaleIn>
    </section>
  );
}
