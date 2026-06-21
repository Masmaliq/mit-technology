"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { TextReveal } from "@/components/motion/Motion";
import { VisualCmsLayer } from "@/components/visual/VisualCmsLayer";
import type { SanityFileValue, SanityImageValue, VisualSettings } from "@/lib/sanity/queries";
import { hasHeroVisualImage } from "@/lib/visual";
import { urlFor } from "@/sanity/lib/image";

type HeroProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  heroImage?: SanityImageValue;
  heroBackgroundImage?: SanityImageValue;
  heroSliderImages?: SanityImageValue[];
  backgroundType?: "image" | "slider" | "video";
  backgroundVideoMp4?: SanityFileValue;
  backgroundPosterImage?: SanityImageValue;
  heroMediaType?: "image" | "gif" | "video";
  heroGif?: SanityFileValue;
  heroVideoMp4?: SanityFileValue;
  heroVideoPosterImage?: SanityImageValue;
  heroMotionType?: "none" | "gif" | "video";
  heroMotionGif?: SanityFileValue;
  heroMotionVideoMp4?: SanityFileValue;
  heroMotionPosterImage?: SanityImageValue;
  heroMotionPosition?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "center"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  heroMotionSize?: "small" | "medium" | "large";
  heroMotionOpacity?: number;
  heroMotionSpeed?: number;
  enableMotionOnMobile?: boolean;
  visualSettings?: VisualSettings;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  externalBackground?: boolean;
};

const enterpriseEase = [0.22, 1, 0.36, 1] as const;

function getHeroImageUrl(heroImage?: SanityImageValue) {
  if (!heroImage) {
    return "";
  }

  if (heroImage.url?.startsWith("http")) {
    return heroImage.url;
  }

  if (heroImage.asset?.url?.startsWith("http")) {
    return heroImage.asset.url;
  }

  try {
    const imageUrl = urlFor(heroImage).width(1500).height(1100).fit("max").auto("format").quality(92).url();

    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }
  } catch {
    // Fall through to the resolved asset URL from the Sanity query.
  }

  return heroImage.url?.startsWith("http") ? heroImage.url : "";
}

function getFileUrl(file?: SanityFileValue) {
  if (!file) {
    return "";
  }

  if (file.url?.startsWith("http")) {
    return file.url;
  }

  if (file.asset?.url?.startsWith("http")) {
    return file.asset.url;
  }

  return "";
}

function getMotionPositionClass(position?: HeroProps["heroMotionPosition"]) {
  const positionMap: Record<NonNullable<HeroProps["heroMotionPosition"]>, string> = {
    "top-left": "top-[16%]",
    "top-center": "top-[18%]",
    "top-right": "top-[14%]",
    center: "top-[42%]",
    "bottom-left": "top-[62%]",
    "bottom-center": "top-[58%]",
    "bottom-right": "top-[54%]",
  };

  return positionMap[position || "top-right"];
}

function getMotionSizeClass(size?: HeroProps["heroMotionSize"]) {
  const sizeMap: Record<NonNullable<HeroProps["heroMotionSize"]>, string> = {
    small: "h-20 w-32 md:h-24 md:w-40",
    medium: "h-28 w-44 md:h-36 md:w-60",
    large: "h-36 w-56 md:h-48 md:w-80",
  };

  return sizeMap[size || "medium"];
}

function NetworkLayer({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.svg
      aria-hidden="true"
      animate={prefersReducedMotion ? undefined : { opacity: [0.018, 0.04, 0.026], x: [-3, 3, -3] }}
      className={className}
      fill="none"
      preserveAspectRatio="none"
      transition={prefersReducedMotion ? undefined : { duration: 48, ease: "easeInOut", repeat: Infinity }}
      viewBox="0 0 1600 900"
    >
      <defs>
        <linearGradient id="hero-network-line" x1="0" y1="0" x2="1" y2="0.75">
          <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.02" />
          <stop offset="36%" stopColor="#60a5fa" stopOpacity="0.08" />
          <stop offset="72%" stopColor="#38bdf8" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="hero-network-highlight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0" />
          <stop offset="46%" stopColor="#93c5fd" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.04" />
        </linearGradient>
        <filter id="hero-node-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g stroke="url(#hero-network-line)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.85">
        <path d="M-80 74 C214 164 430 236 610 314 C792 394 948 472 1192 626 C1322 708 1450 766 1660 828" />
        <path d="M-120 118 C188 216 430 312 632 396 C842 484 1018 560 1246 674 C1390 746 1500 792 1640 822" />
        <path d="M-96 174 C206 296 430 382 646 444 C864 506 1052 562 1288 664 C1430 726 1520 770 1668 842" />
        <path d="M-64 240 C232 346 480 416 720 458 C928 494 1084 532 1264 626 C1410 702 1508 762 1630 850" />
        <path d="M-20 318 C248 384 492 420 726 438 C944 454 1114 500 1278 606 C1420 696 1512 764 1638 872" />
        <path d="M170 0 C356 186 538 300 722 366 C924 438 1112 514 1322 672" />
        <path d="M460 -20 C552 174 642 300 782 392 C942 498 1114 578 1382 718" />
        <path d="M740 -36 C732 188 814 356 972 484 C1096 584 1246 660 1430 744" />
      </g>
      <g stroke="url(#hero-network-highlight)" strokeLinecap="round" strokeWidth="0.85" opacity="0.24">
        <path d="M88 80 C320 188 548 318 770 436 C986 552 1138 626 1358 706" />
        <path d="M212 6 C420 228 640 376 886 488 C1058 566 1196 636 1418 764" />
      </g>
      <g filter="url(#hero-node-glow)">
        {[
          [280, 190, 2],
          [452, 292, 1.8],
          [632, 396, 2.1],
          [770, 436, 2.8],
          [972, 484, 2.2],
          [1138, 626, 2.4],
          [1264, 626, 2.6],
          [1358, 706, 3.1],
          [1430, 744, 2.2],
          [1512, 764, 1.8],
        ].map(([cx, cy, r]) => (
          <circle cx={cx} cy={cy} fill="#93c5fd" key={`${cx}-${cy}`} r={Number(r) * 0.58} />
        ))}
      </g>
    </motion.svg>
  );
}

function FloatingParticles() {
  const prefersReducedMotion = useReducedMotion();
  const particles = [
    ["left-[9%] top-[28%]", "h-1 w-1", 0],
    ["right-[20%] top-[42%]", "h-1.5 w-1.5", 0.2],
    ["left-[42%] bottom-[24%]", "h-1 w-1", 1.4],
  ];

  return (
    <>
      {particles.map(([position, size, delay]) => (
        <motion.span
          animate={prefersReducedMotion ? undefined : { opacity: [0.045, 0.13, 0.045], y: [0, -3, 0] }}
          className={`absolute rounded-full bg-sky-300/35 shadow-[0_0_8px_rgba(96,165,250,0.14)] ${position} ${size}`}
          key={position}
          transition={prefersReducedMotion ? undefined : { delay: Number(delay), duration: 20, ease: "easeInOut", repeat: Infinity }}
        />
      ))}
    </>
  );
}

type HeroMotionOverlayProps = {
  type?: HeroProps["heroMotionType"];
  gifUrl?: string;
  videoMp4Url?: string;
  posterUrl?: string;
  posterAlt?: string;
  position?: HeroProps["heroMotionPosition"];
  size?: HeroProps["heroMotionSize"];
  opacity?: number;
  speed?: number;
  enableOnMobile?: boolean;
};

function HeroMotionOverlay({
  type,
  gifUrl,
  videoMp4Url,
  posterUrl,
  posterAlt,
  position,
  size,
  opacity,
  speed,
  enableOnMobile,
}: HeroMotionOverlayProps) {
  const prefersReducedMotion = useReducedMotion();
  const hasVideo = Boolean(videoMp4Url);
  const hasGif = Boolean(gifUrl);
  const normalizedOpacity = Math.min(Math.max(opacity ?? 38, 0), 100) / 100;
  const playbackSpeed = Math.min(Math.max(speed ?? 0.8, 0.1), 3);
  const flightDuration = 24 / playbackSpeed;
  const shouldRenderGif = type === "gif" && hasGif;
  const shouldRenderVideo = type === "video" && hasVideo;

  if (type === "none" || (!shouldRenderGif && !shouldRenderVideo && !posterUrl)) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-[3] h-40 overflow-visible ${getMotionPositionClass(position)} ${
        enableOnMobile ? "block" : "hidden md:block"
      }`}
    >
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: ["110vw", "-20vw"],
                y: [8, -10, 4],
                opacity: [0, normalizedOpacity, normalizedOpacity, 0],
              }
        }
        className={`absolute left-0 top-1/2 ${getMotionSizeClass(size)} -translate-y-1/2 transform-gpu will-change-transform`}
        initial={prefersReducedMotion ? false : { x: "110vw", opacity: 0 }}
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: flightDuration,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 1.8,
                times: [0, 0.18, 0.82, 1],
              }
        }
      >
        <motion.div
          animate={prefersReducedMotion ? undefined : { rotate: [-1, 1.5, -0.5] }}
          className="relative h-full w-full"
          style={prefersReducedMotion ? { opacity: normalizedOpacity } : undefined}
          transition={prefersReducedMotion ? undefined : { duration: 8, ease: "easeInOut", repeat: Infinity }}
        >
          {shouldRenderVideo && !prefersReducedMotion ? (
            <video
              autoPlay
              className="h-full w-full object-contain"
              loop
              muted
              playsInline
            poster={posterUrl || undefined}
            preload="metadata"
          >
              {videoMp4Url ? <source src={videoMp4Url} type="video/mp4" /> : null}
            </video>
          ) : shouldRenderGif && !prefersReducedMotion ? (
            // Transparent GIF/WebM assets integrate best; solid-background files may still show their original rectangle.
            <img alt="" className="h-full w-full object-contain" src={gifUrl} />
          ) : posterUrl ? (
            <Image
              alt={posterAlt || ""}
              className="object-contain"
              fill
              sizes="(min-width: 768px) 20vw, 40vw"
              src={posterUrl}
              unoptimized
            />
          ) : null}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Hero({
  title,
  subtitle,
  description,
  heroImage,
  heroBackgroundImage,
  heroSliderImages,
  backgroundType,
  backgroundVideoMp4,
  backgroundPosterImage,
  heroMediaType,
  heroGif,
  heroVideoMp4,
  heroVideoPosterImage,
  heroMotionType,
  heroMotionGif,
  heroMotionVideoMp4,
  heroMotionPosterImage,
  heroMotionPosition,
  heroMotionSize,
  heroMotionOpacity,
  heroMotionSpeed,
  enableMotionOnMobile,
  visualSettings,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  externalBackground = false,
}: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const heroTitle = title?.trim() || "";
  const heroSubtitle = description?.trim() || "";
  const heroLabel = subtitle?.trim() || "";
  const primaryLabel = primaryCtaLabel?.trim() || "";
  const primaryHref = primaryCtaHref?.trim() || "";
  const secondaryLabel = secondaryCtaLabel?.trim() || "";
  const secondaryHref = secondaryCtaHref?.trim() || "";
  const hasPrimaryCta = Boolean(primaryLabel && primaryHref);
  const hasSecondaryCta = Boolean(secondaryLabel && secondaryHref);
  const heroImageUrl = getHeroImageUrl(heroImage);
  const heroBackgroundImageUrl = getHeroImageUrl(heroBackgroundImage);
  const sliderImages = heroSliderImages
    ?.map((image) => ({
      image,
      url: getHeroImageUrl(image),
    }))
    .filter((item) => item.url) ?? [];
  const backgroundVideoMp4Url = getFileUrl(backgroundVideoMp4);
  const backgroundPosterImageUrl = getHeroImageUrl(backgroundPosterImage);
  const heroGifUrl = getFileUrl(heroGif);
  const heroVideoMp4Url = getFileUrl(heroVideoMp4);
  const heroVideoPosterImageUrl = getHeroImageUrl(heroVideoPosterImage);
  const heroMotionGifUrl = getFileUrl(heroMotionGif);
  const heroMotionVideoMp4Url = getFileUrl(heroMotionVideoMp4);
  const heroMotionPosterImageUrl = getHeroImageUrl(heroMotionPosterImage);
  const shouldRenderBackgroundVideo = !externalBackground && backgroundType === "video" && Boolean(backgroundVideoMp4Url);
  const shouldRenderBackgroundSlider = !externalBackground && backgroundType === "slider" && sliderImages.length > 1;
  const shouldRenderHeroGif = heroMediaType === "gif" && Boolean(heroGifUrl);
  const shouldRenderHeroVideo = heroMediaType === "video" && Boolean(heroVideoMp4Url);
  const hasForegroundHeroMedia = Boolean(heroImageUrl || shouldRenderHeroGif || shouldRenderHeroVideo || heroVideoPosterImageUrl);
  const hasCmsHeroVisual = externalBackground || shouldRenderBackgroundVideo || shouldRenderBackgroundSlider || Boolean(heroBackgroundImageUrl) || hasHeroVisualImage(visualSettings);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || !shouldRenderBackgroundSlider) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % sliderImages.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, shouldRenderBackgroundSlider, sliderImages.length]);
  const heroBackgroundVisual = !externalBackground && heroBackgroundImageUrl
    ? {
        desktopImage: heroBackgroundImage,
        alt: heroBackgroundImage?.alt,
      }
    : undefined;

  return (
    <section
      id="hero"
      className={`relative isolate flex min-h-[680px] overflow-hidden text-white sm:min-h-[720px] md:min-h-screen ${externalBackground ? "bg-transparent" : "bg-[#020817]"}`}
    >
      <div className={`absolute inset-0 ${externalBackground ? "bg-transparent" : "bg-[#020817]"}`} />
      {shouldRenderBackgroundVideo ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.04 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 3.4, ease: enterpriseEase }}
        >
          {prefersReducedMotion && backgroundPosterImageUrl ? (
            <Image
              alt={backgroundPosterImage?.alt || ""}
              className="object-cover"
              fill
              priority
              sizes="100vw"
              src={backgroundPosterImageUrl}
              unoptimized
            />
          ) : (
            <video
              autoPlay
              className="h-full w-full object-cover"
              loop
              muted
              playsInline
              poster={backgroundPosterImageUrl || undefined}
              preload="metadata"
            >
              {backgroundVideoMp4Url ? <source src={backgroundVideoMp4Url} type="video/mp4" /> : null}
            </video>
          )}
          <div
            className="absolute inset-0 bg-slate-950"
            style={{ opacity: Math.min(Math.max(visualSettings?.pageSettings?.heroOverlayOpacity ?? 35, 0), 100) / 100 }}
          />
          {visualSettings?.styleSettings?.enableGradientOverlay ?? true ? (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(37,99,235,0.28),transparent_34%),linear-gradient(90deg,rgba(2,8,23,0.72)_0%,rgba(15,23,42,0.28)_50%,rgba(15,23,42,0.12)_100%)]" />
          ) : null}
          {visualSettings?.styleSettings?.enableDarkModeSection ? <div className="absolute inset-0 bg-slate-950/35" /> : null}
          {visualSettings?.styleSettings?.enableGlassEffect ? <div className="absolute inset-0 backdrop-blur-[2px]" /> : null}
        </motion.div>
      ) : shouldRenderBackgroundSlider ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.025 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 2.8, ease: enterpriseEase }}
        >
          {sliderImages.map((slide, index) => (
            <motion.div
              animate={{ opacity: index === activeSlide ? 1 : 0 }}
              className="absolute inset-0"
              initial={false}
              key={`${slide.url}-${index}`}
              transition={{ duration: 1.3, ease: enterpriseEase }}
            >
              <Image
                alt={slide.image.alt || ""}
                className="object-cover"
                fill
                priority={index === 0}
                sizes="100vw"
                src={slide.url}
                unoptimized
              />
            </motion.div>
          ))}
          <div
            className="absolute inset-0 bg-slate-950"
            style={{ opacity: Math.min(Math.max(visualSettings?.pageSettings?.heroOverlayOpacity ?? 35, 0), 100) / 100 }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(37,99,235,0.26),transparent_34%),linear-gradient(90deg,rgba(2,8,23,0.7)_0%,rgba(15,23,42,0.25)_50%,rgba(15,23,42,0.1)_100%)]" />
        </motion.div>
      ) : !externalBackground ? (
        <VisualCmsLayer
          image={heroBackgroundVisual}
          settings={visualSettings}
          variant="hero"
        />
      ) : null}
      {!hasCmsHeroVisual ? (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,23,0.78)_0%,rgba(2,8,23,0.42)_38%,rgba(2,8,23,0.08)_74%,rgba(2,8,23,0)_100%),linear-gradient(180deg,rgba(2,8,23,0.2)_0%,rgba(2,8,23,0)_42%,rgba(2,8,23,0.68)_100%)]" />
          <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(90deg,rgba(96,165,250,0.32)_1px,transparent_1px),linear-gradient(180deg,rgba(96,165,250,0.24)_1px,transparent_1px)] [background-size:150px_150px]" />
          <motion.div
            animate={prefersReducedMotion ? undefined : { x: [-3, 3, -3], opacity: [0.024, 0.04, 0.024] }}
            className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(circle_at_center,rgba(96,165,250,0.14)_1px,transparent_1.5px)] [background-size:96px_96px]"
            transition={prefersReducedMotion ? undefined : { duration: 52, ease: "easeInOut", repeat: Infinity }}
          />
          <motion.div
            animate={prefersReducedMotion ? undefined : { opacity: [0.18, 0.3, 0.18], scale: [1, 1.025, 1] }}
            className="absolute bottom-[-28%] right-[-12%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.2)_0%,rgba(37,99,235,0.09)_42%,rgba(2,8,23,0)_72%)] blur-3xl"
            transition={prefersReducedMotion ? undefined : { duration: 18, ease: "easeInOut", repeat: Infinity }}
          />
          <div className="absolute bottom-[-8%] right-[10%] h-[14rem] w-[28rem] rotate-[-10deg] rounded-full bg-sky-300/[0.025] blur-3xl" />
          <motion.div
            className="pointer-events-none absolute inset-0 hidden mix-blend-screen md:block"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            transition={prefersReducedMotion ? undefined : { delay: 0.6, duration: 1.4, ease: enterpriseEase }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 0.065 }}
          >
            <NetworkLayer className="h-full w-full" />
          </motion.div>
          <FloatingParticles />
        </>
      ) : null}

      {hasForegroundHeroMedia ? (
        <motion.div
          className="pointer-events-none absolute bottom-[-6vh] right-[-6vw] z-[2] h-[58vh] min-h-[28rem] w-[48vw] max-w-none bg-transparent md:block lg:bottom-[-7vh] lg:right-[-5vw] lg:h-[68vh] lg:w-[52vw] xl:bottom-[-8vh] xl:right-[-6vw] xl:h-[74vh] xl:w-[54vw]"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 1.025 }}
          transition={prefersReducedMotion ? undefined : { delay: 0.8, duration: 1.15, ease: enterpriseEase }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        >
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -3, 0] }}
            className="relative h-full w-full transform-gpu bg-transparent"
            transition={prefersReducedMotion ? undefined : { delay: 1.6, duration: 24, ease: "easeInOut", repeat: Infinity }}
          >
            {shouldRenderHeroVideo && !prefersReducedMotion ? (
              <video
                autoPlay
                className="h-full w-full object-contain object-bottom drop-shadow-[0_38px_90px_rgba(0,0,0,0.48)]"
                loop
                muted
                playsInline
                poster={heroVideoPosterImageUrl || heroImageUrl || undefined}
                preload="metadata"
              >
                {heroVideoMp4Url ? <source src={heroVideoMp4Url} type="video/mp4" /> : null}
              </video>
            ) : shouldRenderHeroGif && !prefersReducedMotion ? (
              // Use the original GIF file directly so animation is preserved.
              <img
                alt={heroImage?.alt || "Hero motion visual"}
                className="h-full w-full object-contain object-bottom drop-shadow-[0_38px_90px_rgba(0,0,0,0.48)]"
                src={heroGifUrl}
              />
            ) : heroVideoPosterImageUrl || heroImageUrl ? (
              <Image
                alt={heroVideoPosterImage?.alt || heroImage?.alt || "Borobudur Stupa hero visual"}
                className="object-contain drop-shadow-[0_38px_90px_rgba(0,0,0,0.48)]"
                fill
                priority
                sizes="(min-width: 1280px) 64vw, (min-width: 768px) 62vw, 92vw"
                src={heroVideoPosterImageUrl || heroImageUrl}
                style={{ objectPosition: "bottom right" }}
                unoptimized
              />
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}

      <HeroMotionOverlay
        enableOnMobile={enableMotionOnMobile}
        gifUrl={heroMotionGifUrl}
        opacity={heroMotionOpacity}
        position={heroMotionPosition}
        posterAlt={heroMotionPosterImage?.alt}
        posterUrl={heroMotionPosterImageUrl}
        size={heroMotionSize}
        speed={heroMotionSpeed}
        type={heroMotionType}
        videoMp4Url={heroMotionVideoMp4Url}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-12 px-5 pb-12 pt-24 sm:px-6 md:min-h-screen md:grid-cols-[0.5fr_0.5fr] md:gap-16 md:pb-20 md:pt-32 lg:px-8 lg:pb-24">
        <motion.div
          className="max-w-2xl self-center md:-translate-y-8 lg:-translate-y-12"
          initial={prefersReducedMotion ? false : "hidden"}
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                delayChildren: 0.35,
                staggerChildren: 0.12,
              },
            },
          }}
        >
          {heroLabel ? (
            <motion.div
              className="mb-5 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-sky-300/85"
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 1, ease: enterpriseEase } },
              }}
            >
              <TextReveal as="p" direction="down" mode="chars" stagger={0.018} text={heroLabel} />
            </motion.div>
          ) : null}

          {heroTitle ? (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 26 },
                show: { opacity: 1, y: 0, transition: { duration: 1.05, ease: enterpriseEase } },
              }}
            >
              <TextReveal
                as="h1"
                className="max-w-3xl text-[2.16rem] font-semibold leading-[1.02] tracking-tight text-white [text-shadow:0_14px_42px_rgba(0,0,0,0.3)] sm:text-[2.3rem] md:text-[3.22rem] md:leading-[0.96] lg:text-[3.92rem] lg:leading-[0.94]"
                direction="random"
                mode="words"
                stagger={0.045}
                text={heroTitle}
              />
            </motion.div>
          ) : null}

          {heroSubtitle ? (
            <motion.div
              className="mt-4 max-w-[560px] text-[0.96rem] leading-[1.72] text-white/76 [text-shadow:0_10px_30px_rgba(0,0,0,0.22)] md:mt-5 md:text-[1.04rem] md:leading-[1.86]"
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 1.05, ease: enterpriseEase } },
              }}
            >
              <TextReveal as="p" direction="up" mode="lines" text={heroSubtitle} />
            </motion.div>
          ) : null}

        </motion.div>

        <div className="pointer-events-none relative hidden min-h-[42rem] md:block" />
      </div>
      {hasPrimaryCta || hasSecondaryCta ? (
        <motion.div
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          className="absolute inset-x-0 bottom-10 z-20 flex flex-col items-center justify-center gap-3 px-5 sm:flex-row md:bottom-24"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          transition={prefersReducedMotion ? undefined : { delay: 0.85, duration: 1.05, ease: enterpriseEase }}
        >
          {hasPrimaryCta ? (
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_44px_rgba(37,99,235,0.22),0_8px_24px_rgba(0,0,0,0.14)] transition duration-[350ms] ease-out hover:-translate-y-[2px] hover:bg-[#1d4ed8] hover:shadow-[0_24px_64px_rgba(37,99,235,0.28),0_12px_34px_rgba(0,0,0,0.2)]"
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
          {hasSecondaryCta ? (
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.035] px-6 py-3.5 text-sm font-semibold text-white/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_10px_28px_rgba(0,0,0,0.1)] backdrop-blur-sm transition duration-[350ms] ease-out hover:-translate-y-[2px] hover:border-[#60a5fa]/42 hover:bg-white/[0.075] hover:text-white"
            >
              {secondaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </motion.div>
      ) : null}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-40 bg-gradient-to-b from-transparent via-[#020817]/46 to-slate-950"
      />
    </section>
  );
}
