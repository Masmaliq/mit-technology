"use client";

import { AddIcon, CaseIcon, DashboardIcon, EditIcon, HomeIcon, PackageIcon } from "@sanity/icons";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { definePlugin, useClient } from "sanity";
import { route, useRouterState } from "sanity/router";
import styles from "./dashboardTool.module.css";

type DirectoryItem = { label: string; href: string };
type Directory = { description: string; items: DirectoryItem[]; title: string };

const directories: Record<string, Directory> = {
  pages: {
    title: "Pages",
    description: "Kelola halaman utama website dari satu workspace editorial.",
    items: [
      { label: "Work", href: "/studio/work-page-editor" },
      { label: "Service", href: "/studio/service-page-editor" },
      { label: "Pricing", href: "/studio/pricing-page-editor" },
      { label: "About", href: "/studio/about-page-editor" },
      { label: "Case Studies", href: "/studio/case-studies-editor" },
    ],
  },
  content: {
    title: "Content",
    description: "Kelola library konten reusable yang digunakan oleh halaman website.",
    items: [
      { label: "Services", href: "/studio/content-services" },
      { label: "Work", href: "/studio/content-work" },
      { label: "Pricing", href: "/studio/content-pricing" },
    ],
  },
  global: {
    title: "Global",
    description: "Pengaturan bersama yang menjadi sumber utama identitas dan informasi website.",
    items: [
      { label: "Navigation", href: "/studio/navigation-editor" },
      { label: "Footer", href: "/studio/footer-editor" },
      { label: "Global CTA", href: "/studio/global-cta-editor" },
      { label: "Contact Information", href: "/studio/contact-information-editor" },
      { label: "Social Media", href: "/studio/social-media-editor" },
      { label: "Site Identity", href: "/studio/site-identity-editor" },
      { label: "SEO Defaults", href: "/studio/seo-defaults-editor" },
      { label: "Site Settings", href: "/studio/site-settings-editor" },
    ],
  },
};

const globalItems = [
  {number: "01", label: "Navigation", description: "Menu + Navbar CTA", href: "/studio/navigation-editor"},
  {number: "02", label: "Footer", description: "Footer presentation + legal links", href: "/studio/footer-editor"},
  {number: "03", label: "Global CTA", description: "Shared closing CTA", href: "/studio/global-cta-editor"},
  {number: "04", label: "Contact Information", description: "Address · Email · Phone · WhatsApp", href: "/studio/contact-information-editor"},
  {number: "05", label: "Social Media", description: "All social channels", href: "/studio/social-media-editor"},
  {number: "06", label: "Site Identity", description: "Brand · Logo · Favicon", href: "/studio/site-identity-editor"},
  {number: "07", label: "SEO Defaults", description: "Global SEO fallback", href: "/studio/seo-defaults-editor"},
  {number: "08", label: "Site Settings", description: "Website URL + necessary operational settings", href: "/studio/site-settings-editor"},
];

const apiVersion = "2026-10-29";

type RecentContent = {
  _id: string;
  _type: "caseStudy" | "project";
  category?: string;
  image?: string;
  title?: string;
  updatedAt?: string;
  year?: number;
};

type DashboardData = {
  caseStudies: number;
  drafts: number;
  homepage: number;
  homepageHeroImage?: string;
  missingCaseStudyMedia: number;
  missingProjectMedia: number;
  pages: number;
  pricing: number;
  projects: number;
  recent: RecentContent[];
};

const dashboardQuery = `{
  "homepage": count(*[_id == "homepage"]),
  "homepageHeroImage": *[_id == "homepage"][0]{"url": coalesce(heroMainImage.asset->url, heroBackgroundImage.asset->url)}.url,
  "pages": count(*[_id in ["solutionsPage", "caseStudiesPageSettings", "packagesPageSettings", "about", "contact"]]),
  "projects": count(*[_type == "project" && !(_id in path("drafts.**"))]),
  "caseStudies": count(*[_type == "caseStudy" && !(_id in path("drafts.**"))]),
  "pricing": count(*[_type == "package" && !(_id in path("drafts.**"))]),
  "drafts": count(*[_id in path("drafts.**") && _type in ["homepage", "solutionsPage", "caseStudiesPageSettings", "packagesPageSettings", "about", "contact", "project", "caseStudy", "package", "solution", "insight"]]),
  "missingProjectMedia": count(*[_type == "project" && !(_id in path("drafts.**")) && !defined(coverMedia.image.asset._ref) && !defined(coverImage.asset._ref)]),
  "missingCaseStudyMedia": count(*[_type == "caseStudy" && !(_id in path("drafts.**")) && !defined(featuredImage.asset._ref)]),
  "recent": *[_type in ["project", "caseStudy"] && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0...4]{
    _id,
    _type,
    title,
    "category": coalesce(category, industry),
    year,
    "updatedAt": _updatedAt,
    "image": coalesce(coverMedia.image.asset->url, coverImage.asset->url, featuredImage.asset->url)
  }
}`;

function DirectoryView({ directory }: { directory: Directory }) {
  return (
    <main className={styles.dashboard}>
      <div className={styles.inner}>
        <header className={styles.indexHeader}>
          <div><div className={styles.kicker}>EMITECH / STUDIO</div><h1>{directory.title}</h1></div>
          <p>{directory.description}</p>
        </header>
        <nav aria-label={`${directory.title} directory`} className={styles.directory}>
          {directory.items.map((item, index) => (
            <a className={styles.directoryLink} href={item.href} key={item.label}>
              <span>{String(index + 1).padStart(2, "0")}</span><strong>{item.label}</strong><span aria-hidden="true">→</span>
            </a>
          ))}
        </nav>
      </div>
    </main>
  );
}

function GlobalDirectoryView() {
  return <main className={styles.dashboard}>
    <div className={styles.inner}>
      <header className={styles.indexHeader}>
        <div><div className={styles.kicker}>EMITECH STUDIO / GLOBAL</div><h1>Global</h1></div>
        <p>Kelola identitas website, navigation, contact, social media, SEO, CTA, dan pengaturan global dari satu tempat.</p>
      </header>
      <div className={styles.globalLayout}>
        <nav aria-label="Global directory" className={styles.globalDirectory}>
          {globalItems.map((item) => <a className={styles.globalLink} href={item.href} key={item.label}>
            <span>{item.number}</span><span><strong>{item.label}</strong><small>{item.description}</small></span><em>→</em>
          </a>)}
        </nav>
        <aside className={styles.globalAside}>
          <div><span className={styles.kicker}>CMS RULE</span><h2>One information, one home.</h2><p>Editor tidak perlu memahami struktur teknis website. Informasi utama hanya diedit dari satu tempat.</p></div>
          <div><span className={styles.kicker}>SOURCE OF TRUTH</span><dl><div><dt>Site Identity</dt><dd>Brand + Logo</dd></div><div><dt>Contact Information</dt><dd>Contact + WhatsApp</dd></div><div><dt>Social Media</dt><dd>Social links</dd></div><div><dt>Navigation</dt><dd>Navbar</dd></div><div><dt>Footer</dt><dd>Footer presentation</dd></div><div><dt>Global CTA</dt><dd>Shared CTA</dd></div><div><dt>SEO Defaults</dt><dd>SEO fallback</dd></div><div><dt>Site Settings</dt><dd>Technical config</dd></div></dl></div>
          <p className={styles.globalLegacy}><strong>Legacy / Internal</strong><br />Tetap tersimpan untuk compatibility dan bukan area kerja editor sehari-hari.</p>
        </aside>
      </div>
    </div>
  </main>;
}

function DashboardHome() {
  const client = useClient({ apiVersion });
  const rawClient = useMemo(() => client.withConfig({ perspective: "raw" }), [client]);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loadError, setLoadError] = useState(false);
  const overviewRef = useRef<HTMLElement>(null);
  const animationFrame = useRef<number | null>(null);
  const reducedMotion = useRef(false);
  const newCaseStudyId = useMemo(() => `caseStudy-${crypto.randomUUID()}`, []);

  useEffect(() => {
    let active = true;
    rawClient.fetch<DashboardData>(dashboardQuery).then((result) => {
      if (active) setData(result);
    }).catch(() => {
      if (active) setLoadError(true);
    });
    return () => { active = false; };
  }, [rawClient]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { reducedMotion.current = media.matches; };
    update();
    media.addEventListener("change", update);
    return () => {
      media.removeEventListener("change", update);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  function updateParallax(event: ReactPointerEvent<HTMLElement>) {
    if (reducedMotion.current || window.innerWidth <= 720) return;
    const node = overviewRef.current;
    if (!node) return;
    const bounds = node.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 16;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 16;
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    animationFrame.current = requestAnimationFrame(() => {
      node.style.setProperty("--parallax-x", `${x.toFixed(2)}px`);
      node.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);
    });
  }

  function resetParallax() {
    const node = overviewRef.current;
    if (!node) return;
    node.style.setProperty("--parallax-x", "0px");
    node.style.setProperty("--parallax-y", "0px");
  }

  const summaries = [
    { label: "Homepage", count: data?.homepage, status: "Aktif", href: "/studio/homepage-editor/homepage" },
    { label: "Pages", count: data?.pages, status: "Terhubung", href: "/studio/dashboard/pages" },
    { label: "Projects", count: data?.projects, status: "Published", href: "/studio/content-work" },
    { label: "Case Studies", count: data?.caseStudies, status: "Published", href: "/studio/case-studies-editor" },
    { label: "Pricing", count: data?.pricing, status: "Canonical", href: "/studio/content-pricing" },
  ];
  const readyGroups = summaries.filter((item) => typeof item.count === "number" && item.count > 0).length;
  const contentHealth = data ? Math.round((readyGroups / summaries.length) * 100) : 0;
  const attention = data ? [
    data.drafts > 0 ? { title: "Draft belum dipublish", detail: `${data.drafts} dokumen memiliki perubahan yang belum dipublish.` } : null,
    data.missingProjectMedia > 0 ? { title: "Media Project", detail: `${data.missingProjectMedia} Project belum memiliki cover media.` } : null,
    data.missingCaseStudyMedia > 0 ? { title: "Media Case Study", detail: `${data.missingCaseStudyMedia} Case Study belum memiliki hero image.` } : null,
  ].filter((item): item is { detail: string; title: string } => Boolean(item)) : [];
  const heroStyle = data?.homepageHeroImage ? { "--overview-image": `url("${data.homepageHeroImage}")` } as CSSProperties : undefined;
  const quickActions = [
    { label: "Edit Homepage", href: "/studio/homepage-editor/homepage", icon: HomeIcon },
    { label: "Tambah Project", href: "/studio/content-work/intent/create/type=project", icon: AddIcon },
    { label: "Tambah Case Study", href: `/studio/case-study-document/intent/edit/id=${encodeURIComponent(newCaseStudyId)};type=caseStudy`, icon: CaseIcon },
    { label: "Edit Pricing", href: "/studio/pricing-page-editor", icon: PackageIcon },
  ];

  return (
    <main className={styles.dashboard}>
      <div className={`${styles.inner} ${styles.homeInner}`}>
        <header className={`${styles.welcome} ${styles.reveal}`}>
          <div>
            <h1>Selamat Datang di Emitech Studio</h1>
            <p>Kelola website, konten, project, dan halaman dari satu tempat.</p>
          </div>
          <div className={styles.welcomeActions}>
            <a className={styles.secondaryButton} href="/studio/dashboard/content">Cari Konten</a>
            <a className={styles.secondaryButton} href="/" rel="noreferrer" target="_blank">Preview <span aria-hidden="true">↗</span></a>
            <a className={styles.primaryButton} href="/" rel="noreferrer" target="_blank">Buka Website <span aria-hidden="true">↗</span></a>
          </div>
        </header>

        <section className={styles.overviewGrid}>
          <article className={`${styles.websiteOverview} ${styles.reveal}`} onPointerLeave={resetParallax} onPointerMove={updateParallax} ref={overviewRef} style={heroStyle}>
            <div className={styles.overviewMedia} aria-hidden="true" />
            <div className={styles.overviewShade} aria-hidden="true" />
            <div className={styles.overviewContent}>
              <div className={styles.overviewEyebrow}>WEBSITE OVERVIEW</div>
              <h2>Bangun dan kelola pengalaman digital Emitech.</h2>
              <p>Homepage, project, Case Study, pricing, dan konten utama terhubung langsung dengan Sanity.</p>
              <div className={styles.overviewActions}>
                <a href="/studio/homepage-editor/homepage">Edit Homepage</a>
                <a href="/" rel="noreferrer" target="_blank">Preview Website <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </article>

          <aside className={`${styles.healthCard} ${styles.reveal}`}>
            <div className={styles.healthHead}><strong>Status Konten</strong><span><i /> Live</span></div>
            <div className={styles.healthRing} style={{ "--health": `${contentHealth * 3.6}deg` } as CSSProperties}><span>{data ? `${contentHealth}%` : "—"}</span></div>
            <p>{loadError ? "Status konten belum dapat dimuat." : attention.length ? "Konten utama terhubung. Beberapa bagian masih memerlukan perhatian editorial." : "Semua konten utama dalam kondisi baik."}</p>
          </aside>
        </section>

        <section className={`${styles.summarySection} ${styles.reveal}`}>
          <div className={styles.sectionTitle}>
            <h2>Ringkasan Konten</h2>
            <a href="/studio/dashboard/content">Lihat semua <span aria-hidden="true">→</span></a>
          </div>
          <div className={styles.summaryGrid}>
            {summaries.map((item, index) => (
              <a className={styles.summaryCard} href={item.href} key={item.label} style={{ "--delay": `${index * 45}ms` } as CSSProperties}>
                <small>{item.label}</small>
                <strong>{typeof item.count === "number" ? item.count : "—"}</strong>
                <span><i /> {item.status}</span>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.lowerGrid}>
          <div className={styles.lowerMain}>
            <section className={`${styles.panel} ${styles.reveal}`}>
              <div className={styles.sectionTitle}><h2>Aksi Cepat</h2></div>
              <div className={styles.quickGrid}>
                {quickActions.map((item, index) => {
                  const Icon = item.icon;
                  return <a href={item.href} key={item.label} style={{ "--delay": `${index * 45}ms` } as CSSProperties}><Icon /><strong>{item.label}</strong><span aria-hidden="true">→</span></a>;
                })}
              </div>
            </section>

            <section className={`${styles.panel} ${styles.reveal}`}>
              <div className={styles.sectionTitle}><h2>Konten Terbaru</h2><a href="/studio/dashboard/content">Content <span aria-hidden="true">→</span></a></div>
              <div className={styles.recentList}>
                {data?.recent?.length ? data.recent.map((item) => {
                  const href = item._type === "caseStudy"
                    ? `/studio/case-study-document/intent/edit/id=${encodeURIComponent(item._id)};type=caseStudy`
                    : `/studio/content-work/intent/edit/id=${encodeURIComponent(item._id)};type=project`;
                  const updated = item.updatedAt ? new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(new Date(item.updatedAt)) : "";
                  return <a className={styles.recentItem} href={href} key={`${item._type}-${item._id}`}>
                    <span className={styles.thumbnail}>{item.image ? <img alt="" src={item.image} /> : <i>{item._type === "project" ? <EditIcon /> : <CaseIcon />}</i>}</span>
                    <span className={styles.recentIdentity}><strong>{item.title || "Tanpa judul"}</strong><small>{[item.category, item.year].filter(Boolean).join(" · ") || (item._type === "project" ? "Project" : "Case Study")}</small></span>
                    <time dateTime={item.updatedAt}>{updated}</time>
                    <span className={styles.recentArrow} aria-hidden="true">→</span>
                  </a>;
                }) : <div className={styles.emptyState}>{loadError ? "Konten terbaru belum dapat dimuat." : "Memuat konten terbaru…"}</div>}
              </div>
            </section>
          </div>

          <aside className={`${styles.panel} ${styles.attentionPanel} ${styles.reveal}`}>
            <div className={styles.sectionTitle}><h2>Perlu Perhatian</h2>{data ? <span>{attention.length} item</span> : null}</div>
            {attention.length ? <div className={styles.attentionList}>{attention.map((item) => <div className={styles.attentionItem} key={item.title}><span className={styles.attentionDot} /><div><strong>{item.title}</strong><p>{item.detail}</p></div></div>)}</div> : <div className={styles.calmState}><DashboardIcon /><strong>Semua konten utama dalam kondisi baik.</strong><p>Tidak ada masalah terverifikasi yang memerlukan perhatian saat ini.</p></div>}
          </aside>
        </section>
      </div>
    </main>
  );
}

function MITDashboardTool() {
  const view = useRouterState((state) => typeof state.view === "string" ? state.view : "home");

  if (view === "global") return <GlobalDirectoryView />;
  return directories[view] ? <DirectoryView directory={directories[view]} /> : <DashboardHome />;
}

export const mitDashboardTool = definePlugin({
  name: "mit-dashboard-tool",
  tools: [{ name: "dashboard", title: "Beranda", icon: DashboardIcon, component: MITDashboardTool, router: route.create("/:view") }],
});
