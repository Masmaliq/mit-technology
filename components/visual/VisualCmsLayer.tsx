"use client";

import Image from "next/image";
import { motion, type MotionStyle, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { VisualCmsImage, VisualSettings } from "@/lib/sanity/queries";

type VisualCmsLayerProps = {
  settings?: VisualSettings;
  image?: VisualCmsImage;
  variant?: "hero" | "featured" | "section" | "cta";
  className?: string;
  motionStyle?: MotionStyle;
};

function getVariantImage(settings?: VisualSettings, variant: VisualCmsLayerProps["variant"] = "hero") {
  if (variant === "featured") {
    return settings?.visualAssets?.featuredBackgroundImage;
  }

  if (variant === "section") {
    return settings?.visualAssets?.sectionBackgroundImage;
  }

  if (variant === "cta") {
    return settings?.visualAssets?.ctaBackgroundImage;
  }

  return settings?.pageSettings?.heroBackgroundImage;
}

export function VisualCmsLayer({ settings, image, variant = "hero", className = "", motionStyle }: VisualCmsLayerProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -180]);
  const selectedImage = image || getVariantImage(settings, variant);
  const desktopImage = selectedImage?.desktopImage;
  const mobileImage = selectedImage?.mobileImage;
  const imageAlt = selectedImage?.alt || desktopImage?.alt || mobileImage?.alt || "";
  const overlayOpacity = Math.min(Math.max(settings?.pageSettings?.heroOverlayOpacity ?? 35, 0), 100) / 100;
  const enableGradient = settings?.styleSettings?.enableGradientOverlay ?? true;
  const enableGlass = settings?.styleSettings?.enableGlassEffect;
  const enableParallax = settings?.styleSettings?.enableParallaxEffect;
  const enableDarkMode = settings?.styleSettings?.enableDarkModeSection;

  if (!desktopImage?.url && !mobileImage?.url) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1 }}
      style={prefersReducedMotion ? undefined : motionStyle}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {desktopImage?.url ? (
        <motion.div
          className="absolute inset-0 hidden md:block"
          initial={prefersReducedMotion ? false : { scale: 1.08 }}
          animate={prefersReducedMotion ? undefined : { scale: 1 }}
          style={prefersReducedMotion || !enableParallax ? undefined : { y: parallaxY }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          <Image
            src={desktopImage.url}
            alt={imageAlt}
            fill
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      ) : null}

      {(mobileImage?.url || desktopImage?.url) ? (
        <motion.div
          className="absolute inset-0 md:hidden"
          initial={prefersReducedMotion ? false : { scale: 1.08 }}
          animate={prefersReducedMotion ? undefined : { scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          <Image
            src={mobileImage?.url || desktopImage?.url || ""}
            alt={imageAlt}
            fill
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      ) : null}

      <div
        className="absolute inset-0 bg-slate-950"
        style={{ opacity: overlayOpacity }}
      />

      {enableGradient ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(37,99,235,0.28),transparent_34%),linear-gradient(90deg,rgba(2,8,23,0.72)_0%,rgba(15,23,42,0.28)_50%,rgba(15,23,42,0.12)_100%)]" />
      ) : null}

      {enableDarkMode ? <div className="absolute inset-0 bg-slate-950/35" /> : null}
      {enableGlass ? <div className="absolute inset-0 backdrop-blur-[2px]" /> : null}
    </motion.div>
  );
}
