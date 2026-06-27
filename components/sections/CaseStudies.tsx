import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { TextReveal } from "@/components/motion/Motion";
import type { SanityImageValue } from "@/lib/sanity/queries";
import { urlFor } from "@/sanity/lib/image";

type CaseStudiesProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage?: SanityImageValue;
  backgroundOverlayOpacity?: number;
  backgroundPosition?: "center" | "top" | "bottom" | "left" | "right";
  enableWorldMap?: boolean;
  enableGridPattern?: boolean;
  enableOrbitLines?: boolean;
  enableGlow?: boolean;
  cinematicFlowEnabled?: boolean;
};

function getBannerImageUrl(image?: SanityImageValue) {
  if (!image) {
    return "";
  }

  try {
    const imageUrl = urlFor(image).width(1800).height(760).fit("crop").auto("format").quality(88).url();

    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }
  } catch {
    // Fall through to resolved Sanity asset URL.
  }

  return image.url?.startsWith("http") ? image.url : "";
}

function getObjectPosition(position?: CaseStudiesProps["backgroundPosition"]) {
  const positions = {
    center: "object-center",
    top: "object-top",
    bottom: "object-bottom",
    left: "object-left",
    right: "object-right",
  };

  return positions[position || "center"];
}

export function CaseStudies({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  backgroundImage,
  backgroundOverlayOpacity,
  backgroundPosition,
  enableWorldMap,
  enableGridPattern,
  enableOrbitLines,
  enableGlow,
  cinematicFlowEnabled,
}: CaseStudiesProps) {
  const displayEyebrow = eyebrow?.trim() || "";
  const displayTitle = title?.trim() || "";
  const displayDescription = description?.trim() || "";
  const displayCtaLabel = ctaLabel?.trim() || "";
  const displayCtaHref = ctaHref?.trim() || "";
  const bannerImageUrl = getBannerImageUrl(backgroundImage);
  const overlayOpacity = Math.min(Math.max(cinematicFlowEnabled ? Math.min(backgroundOverlayOpacity ?? 42, 42) : backgroundOverlayOpacity ?? 58, 0), 100) / 100;
  const hasContent = Boolean(displayEyebrow || displayTitle || displayDescription || (displayCtaLabel && displayCtaHref) || bannerImageUrl);

  if (!hasContent) {
    return null;
  }

  return (
    <section
      id="case-studies"
      aria-label="Case studies"
      className="relative isolate overflow-hidden bg-white px-5 py-10 sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className={`relative isolate ml-0 mr-0 w-full max-w-none overflow-hidden rounded-[1.75rem] px-5 py-10 sm:px-6 md:px-10 lg:-mr-20 lg:w-[calc(100%+5rem)] lg:min-h-[34rem] lg:rounded-l-[17rem] lg:rounded-r-none lg:px-20 lg:py-20 ${cinematicFlowEnabled ? "bg-[#031230]/72 backdrop-blur-sm" : "bg-[#031230]"}`}>
          {bannerImageUrl ? (
            <Image
              alt={backgroundImage?.alt || ""}
              className={`absolute inset-0 object-cover ${cinematicFlowEnabled ? "opacity-70" : ""} ${getObjectPosition(backgroundPosition)}`}
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              src={bannerImageUrl}
              unoptimized
            />
          ) : (
            <div className={`absolute inset-0 bg-[radial-gradient(circle_at_82%_42%,rgba(96,165,250,0.32),transparent_30%),linear-gradient(120deg,#020817_0%,#031230_48%,#0a3b8f_100%)] ${cinematicFlowEnabled ? "opacity-70" : ""}`} />
          )}
          <div
            className="absolute inset-0 bg-[#031230]"
            style={{ opacity: overlayOpacity }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,23,0.78)_0%,rgba(3,18,48,0.52)_48%,rgba(10,59,143,0.22)_100%)]" />
          {enableGridPattern !== false ? (
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />
          ) : null}
          {enableWorldMap !== false ? (
            <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.55)_1px,transparent_1.8px)] [background-position:58%_45%] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_70%_46%,black_0%,black_38%,transparent_68%)]" />
          ) : null}
          {enableGlow !== false ? (
            <>
              <div className="absolute -bottom-28 -right-12 h-96 w-96 rounded-full bg-sky-400/18 blur-3xl" />
              <div className="absolute right-10 top-8 h-40 w-40 rounded-full bg-white/8 blur-2xl" />
              <div className="absolute right-[18%] top-[42%] h-3 w-3 rounded-full bg-sky-200/70 shadow-[0_0_38px_rgba(125,211,252,0.9)]" />
            </>
          ) : null}
          <div className="absolute inset-x-0 top-0 h-px bg-white/14" />
          <div className="absolute inset-y-0 right-0 w-px bg-white/10" />

          {enableOrbitLines !== false ? (
            <>
              <div className="absolute -left-[20rem] top-1/2 hidden h-[52rem] w-[52rem] -translate-y-1/2 rounded-full border border-white/16 bg-[radial-gradient(circle,rgba(255,255,255,0.18)_0%,rgba(96,165,250,0.13)_38%,rgba(3,18,48,0)_68%)] lg:block" />
              <div className="absolute -left-[15rem] top-1/2 hidden h-[39rem] w-[39rem] -translate-y-1/2 rounded-full border border-white/12 bg-[#031230]/38 shadow-[inset_-30px_0_90px_rgba(96,165,250,0.13)] lg:block" />
              <div className="absolute -left-[8rem] top-1/2 hidden h-[22rem] w-[22rem] -translate-y-1/2 rounded-full border border-sky-200/12 bg-sky-300/[0.035] lg:block" />
            </>
          ) : null}

          {enableOrbitLines !== false ? (
            <svg
              aria-hidden="true"
              className="absolute -left-28 top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 text-white/16 lg:block"
              fill="none"
              viewBox="0 0 420 420"
            >
              <circle cx="210" cy="210" r="156" stroke="currentColor" strokeWidth="1" />
              <circle cx="210" cy="210" r="106" stroke="currentColor" strokeWidth="1" opacity="0.65" />
              <path d="M42 214c78-42 225-54 336 0" stroke="currentColor" strokeWidth="1" opacity="0.7" />
              <path d="M92 104c54 74 78 166 62 276" stroke="currentColor" strokeWidth="1" opacity="0.45" />
            </svg>
          ) : null}

          <div className="relative z-10 max-w-3xl lg:ml-32">
            <div>
              {displayEyebrow ? (
                <TextReveal
                  as="p"
                  className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300"
                  direction="down"
                  mode="chars"
                  stagger={0.018}
                  text={displayEyebrow}
                />
              ) : null}
              {displayTitle ? (
                <TextReveal
                  as="h2"
                  className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
                  direction="right"
                  mode="words"
                  text={displayTitle}
                />
              ) : null}
              {displayDescription ? (
                <TextReveal
                  as="p"
                  className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg md:leading-8"
                  direction="up"
                  mode="lines"
                  text={displayDescription}
                />
              ) : null}
            </div>

            {displayCtaLabel && displayCtaHref ? (
              <Link
                href={displayCtaHref}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#031230] shadow-[0_18px_60px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-sky-50"
              >
                {displayCtaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
