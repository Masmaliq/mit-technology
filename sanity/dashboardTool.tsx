"use client";

import type { ComponentType, CSSProperties } from "react";
import {
  ChevronRightIcon,
  CogIcon,
  DashboardIcon,
  DocumentIcon,
  FolderIcon,
  HomeIcon,
  StackIcon,
} from "@sanity/icons";
import { definePlugin } from "sanity";
import { route } from "sanity/router";

type QuickAccessItem = {
  title: string;
  description: string;
  href: string;
  icon: ComponentType;
};

type OverviewColumn = {
  title: string;
  description: string;
  items: {
    title: string;
    href: string;
  }[];
};

const quickAccess: QuickAccessItem[] = [
  {
    title: "Global Settings",
    description: "Site settings, navbar, and footer.",
    href: "/studio/structure/global",
    icon: CogIcon,
  },
  {
    title: "Homepage",
    description: "Hero, statistics, solutions, and case studies.",
    href: "/studio/structure/homepage",
    icon: HomeIcon,
  },
  {
    title: "Pages",
    description: "About, Solutions, Packages, Portfolio, and Case Studies pages.",
    href: "/studio/structure/pages",
    icon: DocumentIcon,
  },
  {
    title: "Content Library",
    description: "Client logos, process, testimonials, and reusable content.",
    href: "/studio/structure/content",
    icon: FolderIcon,
  },
];

const overviewColumns: OverviewColumn[] = [
  {
    title: "Website Foundation",
    description: "Core website settings used across every page.",
    items: [
      {
        title: "Site Settings",
        href: "/studio/intent/edit/id=siteSettings;type=siteSettings",
      },
      {
        title: "Navbar",
        href: "/studio/intent/edit/id=navbar;type=navbar",
      },
      {
        title: "Footer",
        href: "/studio/intent/edit/id=footer;type=footer",
      },
    ],
  },
  {
    title: "Content Modules",
    description: "Reusable content blocks for homepage and selected pages.",
    items: [
      {
        title: "Client Logos",
        href: "/studio/structure/content;clientLogo",
      },
      {
        title: "Process",
        href: "/studio/structure/content;process",
      },
      {
        title: "Testimonials",
        href: "/studio/structure/content;testimonial",
      },
      {
        title: "Case Studies",
        href: "/studio/structure/pages;case-studies;caseStudy",
      },
    ],
  },
];

const statusItems = [
  ["Studio", "Online"],
  ["CMS", "Ready"],
  ["Frontend", "Connected"],
  ["Deployment", "Vercel"],
];

const styles = {
  dashboard: {
    minHeight: "100%",
    background:
      "radial-gradient(circle at 12% 0%, rgba(200, 85, 26, 0.1), transparent 28%), linear-gradient(180deg, #F1F7FB 0%, #F8FBFD 52%, #F1F7FB 100%)",
    color: "#1A2733",
    padding: "54px 32px 88px",
  },
  inner: {
    maxWidth: 1180,
    margin: "0 auto",
  },
  header: {
    display: "grid",
    gap: 18,
    marginBottom: 28,
  },
  badge: {
    width: "fit-content",
    border: "1px solid #FFD7BE",
    borderRadius: 999,
    background: "#FFE7D6",
    color: "#C8551A",
    padding: "7px 12px",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
  },
  title: {
    maxWidth: 760,
    margin: 0,
    color: "#1A2733",
    fontSize: "clamp(32px, 4.3vw, 50px)",
    fontWeight: 740,
    letterSpacing: 0,
    lineHeight: 0.98,
  },
  subtitle: {
    maxWidth: 680,
    margin: 0,
    color: "#5C7184",
    fontSize: 16,
    lineHeight: 1.75,
  },
  quickGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    margin: "30px 0",
  },
  card: {
    display: "grid",
    cursor: "pointer",
    gap: 18,
    minHeight: 190,
    border: "1px solid #DCE7F0",
    borderRadius: 20,
    background: "rgba(255, 255, 255, 0.92)",
    boxShadow: "0 18px 45px rgba(26, 39, 51, 0.06)",
    color: "inherit",
    padding: 22,
    textDecoration: "none",
    transition: "border-color 220ms ease, box-shadow 220ms ease, transform 220ms ease",
  },
  iconBox: {
    display: "grid",
    width: 46,
    height: 46,
    placeItems: "center",
    borderRadius: 14,
    background: "linear-gradient(135deg, #FFF1D6 0%, #FFE7D6 72%, #FFD7BE 100%)",
    boxShadow: "inset 0 0 0 1px rgba(200, 85, 26, 0.13), 0 10px 22px rgba(200, 85, 26, 0.11)",
    color: "#C8551A",
  },
  cardContent: {
    display: "grid",
    gap: 8,
    alignSelf: "end",
  },
  cardTitle: {
    color: "#1A2733",
    fontSize: 17,
    fontWeight: 720,
    letterSpacing: 0,
  },
  cardDescription: {
    color: "#5C7184",
    fontSize: 14,
    lineHeight: 1.65,
  },
  overview: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 18,
    margin: "18px 0 24px",
  },
  panel: {
    border: "1px solid #DCE7F0",
    borderRadius: 20,
    background: "rgba(255, 255, 255, 0.92)",
    boxShadow: "0 18px 45px rgba(26, 39, 51, 0.06)",
    padding: 24,
  },
  panelTitle: {
    margin: 0,
    color: "#1A2733",
    fontSize: 18,
    fontWeight: 720,
  },
  panelDescription: {
    margin: "8px 0 0",
    color: "#5C7184",
    fontSize: 13,
    lineHeight: 1.6,
  },
  panelList: {
    display: "grid",
    gap: 8,
    margin: "20px 0 0",
    padding: 0,
    color: "#5C7184",
    fontSize: 14,
    listStyle: "none",
  },
  panelItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    borderRadius: 12,
    color: "#5C7184",
    padding: "10px 10px",
    textDecoration: "none",
    transition: "background-color 180ms ease, color 180ms ease, transform 180ms ease",
  },
  panelItemContent: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  panelChevron: {
    color: "#94A6B5",
    flex: "0 0 auto",
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    background: "#C8551A",
    boxShadow: "0 0 0 4px rgba(200, 85, 26, 0.1)",
  },
  statusGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
    gap: 14,
  },
  statusCard: {
    border: "1px solid #DCE7F0",
    borderRadius: 18,
    background: "rgba(255, 255, 255, 0.92)",
    boxShadow: "0 18px 45px rgba(26, 39, 51, 0.06)",
    padding: 18,
  },
  statusTitle: {
    margin: 0,
    color: "#1A2733",
    fontSize: 13,
    fontWeight: 720,
  },
  statusText: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: 14,
    color: "#5C7184",
    fontSize: 15,
    fontWeight: 700,
  },
  statusPulse: {
    width: 8,
    height: 8,
    borderRadius: 999,
    background: "#16a34a",
    boxShadow: "0 0 0 5px rgba(22, 163, 74, 0.1)",
  },
} satisfies Record<string, CSSProperties>;

function MITDashboardTool() {
  return (
    <main style={styles.dashboard}>
      <div style={styles.inner}>
        <header style={styles.header}>
          <div style={styles.badge}>MIT Technology Studio</div>
          <h1 style={styles.title}>MIT CMS Dashboard</h1>
          <p style={styles.subtitle}>
            Manage your website content, global settings, and reusable sections from one
            workspace.
          </p>
        </header>

        <section style={styles.quickGrid} aria-label="Quick access">
          {quickAccess.map((item) => {
            const Icon = item.icon;

            return (
              <a
                href={item.href}
                key={item.title}
                onBlur={(event) => {
                  event.currentTarget.style.transform = "translateY(0)";
                  event.currentTarget.style.borderColor = "#DCE7F0";
                  event.currentTarget.style.boxShadow = "0 18px 45px rgba(26, 39, 51, 0.06)";
                }}
                onFocus={(event) => {
                  event.currentTarget.style.transform = "translateY(-4px)";
                  event.currentTarget.style.borderColor = "rgba(200, 85, 26, 0.38)";
                  event.currentTarget.style.boxShadow = "0 24px 58px rgba(200, 85, 26, 0.14)";
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform = "translateY(-4px)";
                  event.currentTarget.style.borderColor = "rgba(200, 85, 26, 0.38)";
                  event.currentTarget.style.boxShadow = "0 24px 58px rgba(200, 85, 26, 0.14)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform = "translateY(0)";
                  event.currentTarget.style.borderColor = "#DCE7F0";
                  event.currentTarget.style.boxShadow = "0 18px 45px rgba(26, 39, 51, 0.06)";
                }}
                style={styles.card}
              >
                <span style={styles.iconBox} aria-hidden="true">
                  <Icon />
                </span>
                <span style={styles.cardContent}>
                  <span style={styles.cardTitle}>{item.title}</span>
                  <span style={styles.cardDescription}>{item.description}</span>
                </span>
              </a>
            );
          })}
        </section>

        <section style={styles.overview} aria-label="Editorial overview">
          {overviewColumns.map((column) => (
            <article style={styles.panel} key={column.title}>
              <h2 style={styles.panelTitle}>{column.title}</h2>
              <p style={styles.panelDescription}>{column.description}</p>
              <ul style={styles.panelList}>
                {column.items.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.href}
                      onBlur={(event) => {
                        event.currentTarget.style.backgroundColor = "transparent";
                        event.currentTarget.style.color = "#5C7184";
                        event.currentTarget.style.transform = "translateX(0)";
                      }}
                      onFocus={(event) => {
                        event.currentTarget.style.backgroundColor = "#FFE7D6";
                        event.currentTarget.style.color = "#C8551A";
                        event.currentTarget.style.transform = "translateX(2px)";
                      }}
                      onMouseEnter={(event) => {
                        event.currentTarget.style.backgroundColor = "#FFE7D6";
                        event.currentTarget.style.color = "#C8551A";
                        event.currentTarget.style.transform = "translateX(2px)";
                      }}
                      onMouseLeave={(event) => {
                        event.currentTarget.style.backgroundColor = "transparent";
                        event.currentTarget.style.color = "#5C7184";
                        event.currentTarget.style.transform = "translateX(0)";
                      }}
                      style={styles.panelItem}
                    >
                      <span style={styles.panelItemContent}>
                        <span style={styles.dot} aria-hidden="true" />
                        {item.title}
                      </span>
                      <ChevronRightIcon style={styles.panelChevron} />
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section style={styles.statusGrid} aria-label="System status">
          {statusItems.map(([label, value]) => (
            <article style={styles.statusCard} key={label}>
              <h2 style={styles.statusTitle}>{label}</h2>
              <div style={styles.statusText}>
                <span style={styles.statusPulse} aria-hidden="true" />
                {value}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export const mitDashboardTool = definePlugin({
  name: "mit-dashboard-tool",
  tools: [
    {
      name: "dashboard",
      title: "Dashboard",
      icon: DashboardIcon,
      component: MITDashboardTool,
      router: route.create("/*"),
    },
  ],
});
