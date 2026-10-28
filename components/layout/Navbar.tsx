"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
  mobileIcon: string;
};

function HomeIcon() {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}

function SolutionsIcon() {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect height="7" rx="1" width="7" x="3" y="3" />
      <rect height="7" rx="1" width="7" x="14" y="3" />
      <rect height="7" rx="1" width="7" x="3" y="14" />
      <rect height="7" rx="1" width="7" x="14" y="14" />
    </svg>
  );
}

function CaseStudiesIcon() {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M21 7v6h-6" />
    </svg>
  );
}

function PackagesIcon() {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect height="14" rx="1" width="18" x="3" y="7" />
      <path d="M3 7l2-4h14l2 4" />
      <path d="M10 12h4" />
    </svg>
  );
}

function AboutIcon() {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 21v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2" />
      <circle cx="18" cy="9" r="2" />
      <path d="M16 21v-1a4 4 0 0 1 4-4h0a4 4 0 0 1 2 .5" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="14" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="14">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="14" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="14">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: <HomeIcon />, mobileIcon: "H" },
  { label: "Solutions", href: "/solutions", icon: <SolutionsIcon />, mobileIcon: "S" },
  { label: "Case Studies", href: "/case-studies", icon: <CaseStudiesIcon />, mobileIcon: "C" },
  { label: "Packages", href: "/packages", icon: <PackagesIcon />, mobileIcon: "P" },
  { label: "About", href: "/about", icon: <AboutIcon />, mobileIcon: "A" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function MobilePanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open ? <div aria-hidden="true" className={styles.overlay} onClick={onClose} /> : null}
      <div aria-hidden={!open} className={`${styles.mobilePanel} ${open ? styles.open : ""}`}>
        <button aria-label="Close menu" className={styles.closeButton} onClick={onClose} type="button">
          <CloseIcon />
        </button>
        <div className={styles.mobileNavWrap}>
          <ul className={styles.mobileNav}>
            {navItems.map((item, index) => (
              <li
                className={styles.mobileNavItem}
                data-icon={item.mobileIcon}
                key={item.href}
                style={{ "--i": navItems.length - index } as CSSProperties}
              >
                <Link className={styles.mobileNavLink} href={item.href} onClick={onClose}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function updateScrollState() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;

      setScrolled(window.scrollY > 60);
      setProgress(Math.min(Math.max(nextProgress, 0), 100));
    }

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <div className={styles.scrollProgress} style={{ width: `${progress}%` }} />
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <Link className={styles.logo} href="/">
          Emitech
        </Link>

        <ul className={styles.navLinks}>
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <li key={item.href}>
                <Link className={`${styles.navLink} ${active ? styles.active : ""}`} href={item.href}>
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className={styles.navRight}>
          <Link className={styles.cta} href="/contact">
            Start Your Project
          </Link>
          <button
            aria-expanded={mobileOpen}
            aria-label="Open menu"
            className={styles.burger}
            onClick={() => setMobileOpen(true)}
            type="button"
          >
            <MenuIcon />
          </button>
        </div>
      </header>
      <MobilePanel onClose={() => setMobileOpen(false)} open={mobileOpen} />
    </>
  );
}
