"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";

type MenuItem = {
  label?: string;
  href?: string;
};

type ResolvedMenuItem = {
  label: string;
  href: string;
};

type SiteHeaderClientProps = {
  logoUrl?: string;
  logoAlt?: string;
  brandName?: string;
  brandMode?: "textOnly" | "image";
  menuItems?: MenuItem[];
  ctaLabel?: string;
  ctaHref?: string;
  overlay?: boolean;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

const finalNavItems = [
  { label: "Solutions", href: "/solutions" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Packages", href: "/packages" },
  { label: "About", href: "/about" },
];

export function SiteHeaderClient({
  logoUrl,
  logoAlt,
  brandName = "",
  brandMode = "textOnly",
  menuItems,
  ctaLabel,
  ctaHref,
  overlay = false,
}: SiteHeaderClientProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const navItems: ResolvedMenuItem[] =
    menuItems
      ?.filter((item): item is ResolvedMenuItem => Boolean(item.label && item.href)) ?? finalNavItems;
  const callToActionHref = ctaHref?.trim() || "/";
  const callToActionLabel = ctaLabel?.trim() || "Start Your Project";
  const safeBrandName = brandName.trim();
  const useTextLogo = brandMode !== "image" || !logoUrl;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktopNav, setIsDesktopNav] = useState(false);
  const transparentHeader = !isScrolled;
  const darkOverlayHeader = true;

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    function handleResize() {
      setIsDesktopNav(desktopQuery.matches);
    }

    function handleScroll() {
      setIsScrolled(window.scrollY > 12);
    }

    handleResize();
    handleScroll();
    desktopQuery.addEventListener("change", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      desktopQuery.removeEventListener("change", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 transition-[transform] duration-300 ease-out sm:top-5 sm:px-5 lg:top-6 lg:px-0"
      initial={prefersReducedMotion ? false : { opacity: 0, y: -16 }}
      transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.nav
        animate={{ height: isDesktopNav ? (isScrolled ? 78 : 90) : isScrolled ? 58 : 64 }}
        aria-label="Navigasi utama"
        className={`pointer-events-auto mx-auto grid w-full max-w-[95vw] grid-cols-[auto_1fr_auto] items-center rounded-full border px-3 shadow-[0_22px_80px_rgba(2,8,23,0.18)] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out sm:max-w-[94vw] sm:px-4 lg:max-w-[93vw] lg:grid-cols-[minmax(170px,1fr)_auto_minmax(170px,1fr)] lg:px-5 ${
          transparentHeader
            ? "border-white/16 bg-slate-950/[0.16] backdrop-blur-[14px]"
            : "border-white/22 bg-[rgba(2,10,28,0.76)] shadow-[0_26px_90px_rgba(2,8,23,0.28)] backdrop-blur-[24px]"
        }`}
        initial={false}
        transition={{ duration: prefersReducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href="/"
          className="flex min-w-0 items-center text-white"
          aria-label={safeBrandName ? `${safeBrandName} homepage` : "Homepage"}
        >
          {useTextLogo ? (
            <span className="block max-w-[42vw] truncate whitespace-nowrap text-base font-semibold tracking-[0.02em] text-white sm:max-w-none md:text-lg">
              {safeBrandName || "MIT Technology"}
            </span>
          ) : (
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/18 bg-white/[0.09] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur md:h-12 md:w-12">
              <BrandLogo
                imageUrl={logoUrl}
                alt={logoAlt || safeBrandName}
                brandName={safeBrandName}
                compact
              />
            </span>
          )}
        </Link>

        <div className="hidden items-center justify-center gap-7 lg:flex xl:gap-9">
          {navItems.map((item) => {
            const href = item.href;
            const active = isActivePath(pathname, href);

            return (
              <Link
                href={href}
                key={href}
                className={`group/nav relative px-0.5 py-3 text-[14px] font-medium transition duration-300 xl:text-[15px] ${
                  active
                    ? "text-white"
                    : darkOverlayHeader
                      ? "text-white/75 hover:text-white"
                      : "text-slate-600 hover:text-navy"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-1 left-0 h-0.5 rounded-full transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover/nav:w-full"
                  } ${darkOverlayHeader ? "bg-[#60a5fa]" : "bg-primary"}`}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href={callToActionHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-white/16 bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_16px_48px_rgba(2,8,23,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-[0_22px_64px_rgba(2,8,23,0.28)] md:inline-flex lg:px-6 lg:py-3"
          >
            {callToActionLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>

          <details className="group relative lg:hidden">
            <summary
              className="inline-flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition duration-200 hover:border-white/35 hover:bg-white/15 md:h-11 md:w-11 [&::-webkit-details-marker]:hidden"
            >
              <span className="sr-only">Buka navigasi</span>
              <Menu className="h-5 w-5" />
            </summary>

            <div className="absolute right-0 mt-3 w-[min(19rem,calc(100vw-2.5rem))] rounded-3xl border border-white/18 bg-[rgba(2,10,28,0.92)] p-3 shadow-[0_28px_90px_rgba(2,8,23,0.34)] backdrop-blur-2xl">
              <div className="grid gap-1">
                {navItems.map((item) => {
                  const href = item.href;
                  const active = isActivePath(pathname, href);

                  return (
                    <Link
                      href={href}
                      key={href}
                      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200 ${
                        active
                          ? "bg-white text-slate-950"
                          : "text-white/76 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <Link
                  href={callToActionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950"
                >
                  {callToActionLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </details>
        </div>
      </motion.nav>
    </motion.header>
  );
}
