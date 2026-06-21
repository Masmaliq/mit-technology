import Image from "next/image";
import type { ReactNode } from "react";
import type { Homepage } from "@/lib/sanity/queries";

type CinematicFlowProps = {
  children: ReactNode;
  settings?: Pick<
    Homepage,
    | "enableCinematicFlow"
    | "cinematicVideoMp4"
    | "cinematicVideoWebm"
    | "cinematicPosterImage"
    | "cinematicPosterAlt"
    | "cinematicOverlayOpacity"
    | "cinematicBackgroundPosition"
    | "cinematicMobileFallbackImage"
    | "cinematicMobileFallbackAlt"
    | "cinematicMobileMode"
  >;
};

function clampOpacity(value?: number) {
  return Math.min(Math.max(value ?? 45, 0), 100) / 100;
}

function getObjectPosition(position?: Homepage["cinematicBackgroundPosition"]) {
  const positions = {
    center: "object-center",
    top: "object-top",
    bottom: "object-bottom",
    left: "object-left",
    right: "object-right",
  };

  return positions[position || "center"];
}

export function CinematicFlow({ children, settings }: CinematicFlowProps) {
  const isEnabled = Boolean(settings?.enableCinematicFlow);
  const mp4Url = settings?.cinematicVideoMp4?.url || settings?.cinematicVideoMp4?.asset?.url || "";
  const webmUrl = settings?.cinematicVideoWebm?.url || settings?.cinematicVideoWebm?.asset?.url || "";
  const posterUrl = settings?.cinematicPosterImage?.url || settings?.cinematicPosterImage?.asset?.url || "";
  const mobileFallbackUrl =
    settings?.cinematicMobileFallbackImage?.url ||
    settings?.cinematicMobileFallbackImage?.asset?.url ||
    posterUrl;
  const mobileMode = settings?.cinematicMobileMode || "poster";
  const hasVideo = Boolean(mp4Url || webmUrl);
  const hasMobilePoster = Boolean(mobileFallbackUrl);
  const shouldRenderDesktopVideo = isEnabled && hasVideo;
  const shouldRenderMobileVideo = shouldRenderDesktopVideo && mobileMode === "video";
  const shouldRenderMobilePoster = isEnabled && mobileMode === "poster" && hasMobilePoster;
  const shouldRenderFlow = isEnabled && (hasVideo || hasMobilePoster || posterUrl);
  const overlayOpacity = clampOpacity(settings?.cinematicOverlayOpacity);
  const positionClass = getObjectPosition(settings?.cinematicBackgroundPosition);

  if (!shouldRenderFlow) {
    return <>{children}</>;
  }

  return (
    <section
      aria-label="Homepage cinematic flow"
      className="relative isolate overflow-hidden bg-[#020817] [&_#case-studies]:!bg-transparent [&_#client-logos]:![background-image:none] [&_#client-logos]:!bg-white/5 [&_#client-logos]:backdrop-blur-sm [&_#hero>div:first-child]:!bg-transparent [&_#hero]:!bg-transparent [&_#solutions]:!bg-white/78 [&_#solutions]:backdrop-blur-md [&_#trust]:!bg-white/78 [&_#trust]:backdrop-blur-md"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {shouldRenderDesktopVideo ? (
          <video
            autoPlay
            className={`hidden h-full w-full object-cover sm:block ${positionClass}`}
            loop
            muted
            playsInline
            poster={posterUrl || undefined}
            preload="metadata"
          >
            {webmUrl ? <source src={webmUrl} type="video/webm" /> : null}
            {mp4Url ? <source src={mp4Url} type="video/mp4" /> : null}
          </video>
        ) : null}

        {shouldRenderMobileVideo ? (
          <video
            autoPlay
            className={`h-full w-full object-cover sm:hidden ${positionClass}`}
            loop
            muted
            playsInline
            poster={mobileFallbackUrl || posterUrl || undefined}
            preload="metadata"
          >
            {webmUrl ? <source src={webmUrl} type="video/webm" /> : null}
            {mp4Url ? <source src={mp4Url} type="video/mp4" /> : null}
          </video>
        ) : null}

        {shouldRenderMobilePoster ? (
          <Image
            alt={settings?.cinematicMobileFallbackAlt || settings?.cinematicPosterAlt || ""}
            className={`object-cover sm:hidden ${positionClass}`}
            fill
            sizes="100vw"
            src={mobileFallbackUrl}
            unoptimized
          />
        ) : null}

        {!shouldRenderDesktopVideo && posterUrl ? (
          <Image
            alt={settings?.cinematicPosterAlt || ""}
            className={`hidden object-cover sm:block ${positionClass}`}
            fill
            sizes="100vw"
            src={posterUrl}
            unoptimized
          />
        ) : null}

        <div className="absolute inset-0 bg-[#020817]" style={{ opacity: overlayOpacity }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_16%,rgba(96,165,250,0.18),transparent_34%),linear-gradient(180deg,rgba(2,8,23,0.22)_0%,rgba(2,8,23,0.48)_100%)]" />
      </div>

      <div className="relative z-10">{children}</div>
    </section>
  );
}
