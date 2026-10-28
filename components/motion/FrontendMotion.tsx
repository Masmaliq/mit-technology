"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const DESKTOP_MOTION = "(min-width: 851px) and (hover: hover) and (pointer: fine)";

export function FrontendMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname.startsWith("/studio") || pathname.startsWith("/admin")) return;

    const root = document.documentElement;
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-motion-reveal]"));
    const parallaxItems = Array.from(document.querySelectorAll<HTMLElement>("[data-motion-parallax]"));
    const reducedMotion = window.matchMedia(REDUCED_MOTION);
    const desktopMotion = window.matchMedia(DESKTOP_MOTION);
    const settleTimers: number[] = [];

    root.dataset.frontendMotion = "ready";

    if (reducedMotion.matches) {
      revealItems.forEach((item) => { item.dataset.motionState = "visible"; });
      return () => { delete root.dataset.frontendMotion; };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const item = entry.target as HTMLElement;
          item.dataset.motionState = "visible";
          settleTimers.push(window.setTimeout(() => { item.dataset.motionSettled = "true"; }, 1100));
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));

    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      if (!desktopMotion.matches) {
        parallaxItems.forEach((item) => item.style.removeProperty("--motion-parallax-y"));
        return;
      }

      parallaxItems.forEach((item) => {
        const bounds = item.parentElement?.getBoundingClientRect() || item.getBoundingClientRect();
        if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
        const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) / window.innerHeight));
        const range = Number(item.dataset.motionParallax || 24);
        item.style.setProperty("--motion-parallax-y", `${progress * range}px`);
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    if (parallaxItems.length) {
      updateParallax();
      window.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate, { passive: true });
    }

    return () => {
      observer.disconnect();
      settleTimers.forEach((timer) => window.clearTimeout(timer));
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      parallaxItems.forEach((item) => item.style.removeProperty("--motion-parallax-y"));
      delete root.dataset.frontendMotion;
    };
  }, [pathname]);

  return null;
}
