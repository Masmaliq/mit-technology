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
  ctaEnabled?: boolean;
  overlay?: boolean;
  light?: boolean;
};

function isActivePath(pathname: string, href: string) {
  const routeAliases: Record<string, string[]> = {
    "/services": ["/services", "/solutions"],
    "/pricing": ["/pricing", "/packages"],
    "/work": ["/work", "/case-studies", "/portfolio"],
  };
  const activeRoutes = routeAliases[href] ?? [href];

  if (href === "/") {
    return pathname === "/";
  }

  return activeRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

const fallbackNavItems: ResolvedMenuItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

const publicRouteMap: Record<string, ResolvedMenuItem> = {
  "/work": { label: "Work", href: "/work" },
  "/portfolio": { label: "Work", href: "/work" },
  "/case-studies": { label: "Work", href: "/work" },
  "/services": { label: "Services", href: "/services" },
  "/solutions": { label: "Services", href: "/services" },
  "/pricing": { label: "Pricing", href: "/pricing" },
  "/packages": { label: "Pricing", href: "/pricing" },
  "/about": { label: "About", href: "/about" },
};

function resolveNavItems(menuItems?: MenuItem[]): ResolvedMenuItem[] {
  const resolved = menuItems
    ?.flatMap((item) => {
      const href = item.href?.trim();
      const label = item.label?.trim();

      if (!href || !label || href === "/") {
        return [];
      }

      return [publicRouteMap[href] ?? { label, href }];
    })
    .filter(
      (item, index, items) => items.findIndex((candidate) => candidate.href === item.href) === index
    );

  if (!resolved?.length) {
    return fallbackNavItems;
  }

  const publicOrder = new Map(fallbackNavItems.map((item, index) => [item.href, index]));

  return resolved.sort(
    (a, b) => (publicOrder.get(a.href) ?? Number.MAX_SAFE_INTEGER) - (publicOrder.get(b.href) ?? Number.MAX_SAFE_INTEGER)
  );
}

function NavIcon({ label }: { label: string }) {
  const iconProps = {
    "aria-hidden": true,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    viewBox: "0 0 24 24",
    width: 11,
    height: 11,
    style: { display: "inline", verticalAlign: "-1px" },
  } as const;

  if (label === "Services") {
    return (
      <svg {...iconProps}>
        <rect height="7" rx="1" width="7" x="3" y="3" />
        <rect height="7" rx="1" width="7" x="14" y="3" />
        <rect height="7" rx="1" width="7" x="3" y="14" />
        <rect height="7" rx="1" width="7" x="14" y="14" />
      </svg>
    );
  }

  if (label === "Work") {
    return (
      <svg {...iconProps}>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M21 7v6h-6" />
      </svg>
    );
  }

  if (label === "Pricing") {
    return (
      <svg {...iconProps}>
        <rect height="14" rx="1" width="18" x="3" y="7" />
        <path d="M3 7l2-4h14l2 4" />
        <path d="M10 12h4" />
      </svg>
    );
  }

  if (label === "About") {
    return (
      <svg {...iconProps}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 21v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2" />
        <circle cx="18" cy="9" r="2" />
        <path d="M16 21v-1a4 4 0 0 1 4-4h0a4 4 0 0 1 2 .5" />
      </svg>
    );
  }

  return null;
}

export function SiteHeaderClient({
  logoUrl,
  logoAlt,
  brandName = "",
  brandMode = "textOnly",
  menuItems,
  ctaLabel,
  ctaHref,
  ctaEnabled = true,
  overlay = false,
  light = false,
}: SiteHeaderClientProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const navItems = resolveNavItems(menuItems);
  const callToActionHref = ctaHref?.trim() || "/contact";
  const callToActionLabel = ctaLabel?.trim() || "Start Your Project";
  const safeBrandName = brandName.trim();
  const useImageLogo = brandMode === "image" && Boolean(logoUrl);
  const [isScrolled, setIsScrolled] = useState(false);
  const useLightPresentation = light || isScrolled;

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 60);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-all duration-[400ms] ease-out ${
        useLightPresentation
          ? "bg-[rgba(255,255,255,0.85)] py-4 shadow-[0_1px_0_rgba(10,19,48,0.06)] backdrop-blur-[16px]"
          : "border-none bg-transparent py-[26px] outline-none"
      }`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: -16 }}
      transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.nav
        aria-label="Navigasi utama"
        className="pointer-events-auto mx-auto grid w-full grid-cols-[auto_1fr_auto] items-center border-none bg-transparent px-[5%] outline-none transition-all duration-[400ms] ease-out lg:grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)]"
        initial={false}
        transition={{ duration: prefersReducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href="/"
          className={`flex min-w-0 items-center font-['Plus_Jakarta_Sans',sans-serif] text-[19px] font-bold transition-colors duration-[400ms] ${useLightPresentation ? "text-[#0A1330]" : "text-white"}`}
          aria-label={safeBrandName ? `${safeBrandName} homepage` : "Homepage"}
        >
          {useImageLogo ? (
            <BrandLogo
              imageUrl={logoUrl}
              alt={logoAlt || safeBrandName}
              brandName={safeBrandName}
              compact
            />
          ) : (
            <span className="block max-w-[42vw] truncate whitespace-nowrap sm:max-w-none">
              {safeBrandName || "Emitech"}
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
                className={`group/nav relative inline-flex items-center gap-[7px] px-0.5 pb-1 text-[13.5px] font-medium opacity-85 transition duration-300 ${
                  active
                    ? "text-[#4D7FFF] opacity-100"
                    : useLightPresentation
                      ? "text-[#0A1330] opacity-75 hover:opacity-100"
                      : "text-[rgba(255,255,255,0.92)] hover:opacity-100"
                }`}
              >
                <NavIcon label={item.label} />
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-[#4D7FFF] transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover/nav:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-3">
          {ctaEnabled ? <Link
            href={callToActionHref || "/contact"}
            className={`hidden items-center gap-2 rounded-full border bg-transparent px-[22px] py-2.5 text-[13px] font-semibold transition duration-300 hover:border-[#FF6A3D] hover:bg-[#FF6A3D] hover:text-white md:inline-flex ${
              useLightPresentation
                ? "border-[#0A1330] text-[#0A1330]"
                : "border-[rgba(255,255,255,0.6)] text-white"
            }`}
          >
            {callToActionLabel}
            <ArrowRight className="h-4 w-4" />
          </Link> : null}

          <details className="group relative lg:hidden">
            <summary
              className={`inline-flex h-[38px] w-[38px] cursor-pointer list-none items-center justify-center rounded-full border bg-transparent transition duration-300 [&::-webkit-details-marker]:hidden ${
                useLightPresentation
                  ? "border-[#0A1330] text-[#0A1330]"
                  : "border-[rgba(255,255,255,0.5)] text-white"
              }`}
            >
              <span className="sr-only">Buka navigasi</span>
              <Menu className="h-5 w-5" />
            </summary>

            <div className="absolute right-0 mt-3 w-[min(19rem,calc(100vw-2.5rem))] rounded-3xl border border-white/24 bg-[rgba(5,18,42,0.82)] p-3 shadow-[0_28px_90px_rgba(2,8,23,0.34)] backdrop-blur-2xl">
              <div className="grid gap-1">
                {navItems.map((item) => {
                  const href = item.href;
                  const active = isActivePath(pathname, href);

                  return (
                    <Link
                      href={href}
                      key={href}
                      className={`rounded-2xl px-4 py-3 text-sm font-bold transition duration-200 ${
                        active
                          ? "bg-white/14 text-white"
                          : "text-white hover:bg-white/12 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                {ctaEnabled ? <Link
                  href={callToActionHref}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_16px_44px_rgba(2,8,23,0.22)]"
                >
                  {callToActionLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link> : null}
              </div>
            </div>
          </details>
        </div>
      </motion.nav>
    </motion.header>
  );
}
