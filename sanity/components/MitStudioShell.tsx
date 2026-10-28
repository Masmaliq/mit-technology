"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import {
  DashboardIcon,
  DocumentIcon,
  EarthGlobeIcon,
  FolderIcon,
  HomeIcon,
  SearchIcon,
} from "@sanity/icons";
import type { LayoutProps } from "sanity";
import styles from "./MitStudioShell.module.css";

type ShellLink = {
  href: string;
  icon: ComponentType;
  label: string;
  match: string[];
};

const links: ShellLink[] = [
  { label: "Beranda", href: "/studio/dashboard", icon: DashboardIcon, match: ["/studio", "/studio/dashboard"] },
  { label: "Homepage", href: "/studio/homepage-editor/homepage", icon: HomeIcon, match: ["/homepage-editor"] },
  { label: "Pages", href: "/studio/dashboard/pages", icon: DocumentIcon, match: ["/dashboard/pages", "/work-page-editor", "/service-page-editor", "/pricing-page-editor", "/about-page-editor"] },
  { label: "Content", href: "/studio/dashboard/content", icon: FolderIcon, match: ["/dashboard/content", "/content-services", "/content-work", "/content-pricing"] },
  { label: "Global", href: "/studio/dashboard/global", icon: EarthGlobeIcon, match: ["/dashboard/global", "/navigation-editor", "/footer-editor", "/global-cta-editor", "/contact-information-editor", "/social-media-editor", "/site-identity-editor", "/seo-defaults-editor", "/site-settings-editor"] },
];

function pathIsActive(pathname: string, link: ShellLink) {
  if (link.label === "Beranda") return pathname === "/studio" || pathname === "/studio/" || pathname === "/studio/dashboard" || pathname === "/studio/dashboard/";
  return link.match.some((value) => pathname.includes(value));
}

export function MitStudioShell(props: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [pathname, setPathname] = useState("/studio/dashboard");

  useEffect(() => {
    setPathname(window.location.pathname + window.location.search);
    setCollapsed(window.localStorage.getItem("mit-studio-sidebar") === "collapsed");
  }, []);

  function toggleSidebar() {
    setCollapsed((current) => {
      const next = !current;
      window.localStorage.setItem("mit-studio-sidebar", next ? "collapsed" : "expanded");
      return next;
    });
  }

  return (
    <div className={`${styles.shell} ${collapsed ? styles.shellCollapsed : ""}`}>
      <aside className={styles.sidebar}>
        <div className={styles.sideTop}>
          <button aria-label={collapsed ? "Expand Studio sidebar" : "Collapse Studio sidebar"} className={styles.toggle} onClick={toggleSidebar} title="Toggle sidebar" type="button">
            <span aria-hidden="true" className={styles.toggleLines}><span /><span /><span /></span>
          </button>
          <div className={styles.logoText}>Emitech Studio</div>
        </div>

        <div className={styles.group}>
          <div className={styles.groupTitle}>WORKSPACE</div>
          <nav aria-label="Emitech Studio workspace" className={styles.nav}>
            {links.map((link) => {
              const Icon = link.icon;
              const active = pathIsActive(pathname, link);
              return (
                <a aria-current={active ? "page" : undefined} className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`} href={link.href} key={link.label} title={collapsed ? link.label : undefined}>
                  <span className={styles.navIcon}><Icon /></span>
                  <span className={styles.navLabel}>{link.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        <div className={styles.profile}>
          <div className={styles.profileBox}>
            <div aria-label="Emitech" className={styles.profileLogo}>E</div>
            <div className={styles.profileText}>
              <div className={styles.profileName}>Emitech</div>
              <div className={styles.profileDomain}>mittechnology.id</div>
              <div className={styles.profileLive}>Website Live</div>
            </div>
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.topbarTitle}>Emitech <span>/ Studio</span></div>
          <label className={styles.search}>
            <SearchIcon />
            <input aria-label="Search pages, projects, articles" placeholder="Search pages, projects, articles…" readOnly />
          </label>
          <div className={styles.actions}>
            <span className={`${styles.pill} ${styles.statusPill}`}><span className={styles.dot} /> Live</span>
            <a className={styles.pill} href="/" rel="noreferrer" target="_blank">Preview <span aria-hidden="true">↗</span></a>
          </div>
        </header>
        <div className={`${styles.workspace} ${styles.nativeWorkspace}`}>{props.renderDefault(props)}</div>
      </main>
    </div>
  );
}

export function MitStudioNativeNavbar() {
  return null;
}
