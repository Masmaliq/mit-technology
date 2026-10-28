"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CaseStudiesPageSettings, HomepageProject, ProcessItem } from "@/lib/sanity/queries";
import styles from "./WorkMaster.module.css";
import heroStyles from "@/components/layout/PageHero.module.css";

type WorkProject = {
  title: string;
  category: string;
  type: string;
  year: string;
  statement: string;
  image: string;
  previews: string[];
  href: string;
};

type WorkMasterProps = {
  page?: CaseStudiesPageSettings;
  projects?: HomepageProject[];
  processes?: ProcessItem[];
};

type Filter = "all" | string;

function imageUrl(image?: { url?: string; asset?: { url?: string } }) {
  return image?.url || image?.asset?.url || "";
}

function projectHref(project?: HomepageProject) {
  return project?.slug ? `/work/${project.slug}` : project?.projectUrl || "/work";
}

export function WorkMaster({ page = {}, projects = [], processes = [] }: WorkMasterProps) {
  const workHeroImage = imageUrl(page.workHeroImage);
  const workHeroVideo = page.workHeroMediaType === "video" ? page.workHeroVideo?.url || page.workHeroVideo?.asset?.url : undefined;
  const featuredProjects: WorkProject[] = page.selectedProjects?.length
    ? page.selectedProjects
        .filter((selection) => selection.showInFeaturedWork !== false && selection.project?.title)
        .sort((a, b) => (a.displayOrder ?? a.project?.order ?? 999) - (b.displayOrder ?? b.project?.order ?? 999))
        .map((selection) => ({
          title: selection.project?.title || "",
          category: selection.displayCategory || selection.project?.category || "Digital Project",
          type: (selection.project?.category || "project").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
          year: selection.project?.year ? String(selection.project.year) : "",
          statement: selection.displayDescription || selection.project?.shortDescription || "",
          image: imageUrl(selection.featuredHeroImage) || imageUrl(selection.project?.coverMedia?.image) || imageUrl(selection.project?.coverImage),
          previews: (selection.cursorSupportingImages || []).map(imageUrl).filter(Boolean),
          href: projectHref(selection.project),
        }))
    : projects.map((project) => ({
        title: project.title || "",
        category: project.category || "",
        type: (project.category || "project").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        year: project.year ? String(project.year) : "",
        statement: project.shortDescription || "",
        image: imageUrl(project.coverMedia?.image) || imageUrl(project.coverImage),
        previews: [],
        href: projectHref(project),
      }));

  const cardMedia = new Map((page.projectCards || []).map((card) => [card.project?.slug, card]));
  const archiveProjects: WorkProject[] = page.moreWorkItems?.length
    ? page.moreWorkItems
        .filter((selection) => selection.showInAllWork !== false && selection.project?.title)
        .sort((a, b) => (a.displayOrder ?? a.project?.order ?? 999) - (b.displayOrder ?? b.project?.order ?? 999))
        .map((selection) => {
          const card = cardMedia.get(selection.project?.slug);
          return {
            title: selection.displayTitle || selection.project?.title || "",
            category: selection.project?.category || "Digital Project",
            type: (selection.project?.category || "project").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
            year: selection.project?.year ? String(selection.project.year) : "",
            statement: selection.displayDescription || selection.project?.shortDescription || "",
            image: imageUrl(card?.allWorkImage) || imageUrl(selection.project?.coverMedia?.image) || imageUrl(selection.project?.coverImage),
            previews: [],
            href: projectHref(selection.project),
          };
        })
    : projects.length
      ? projects.map((project) => ({
          title: project.title || "",
          category: project.category || "Digital Project",
          type: (project.category || "project").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
          year: project.year ? String(project.year) : "",
          statement: project.shortDescription || "",
          image: imageUrl(project.coverMedia?.image) || imageUrl(project.coverImage),
          previews: [],
          href: projectHref(project),
        }))
      : [];

  const displayProjects = featuredProjects;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const stackRefs = useRef<Array<HTMLDivElement | null>>([]);

  const show = useCallback((index: number) => {
    setActive((index + displayProjects.length) % displayProjects.length);
  }, [displayProjects.length]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % displayProjects.length), 6000);
    return () => window.clearInterval(timer);
  }, [active, paused]);

  function moveStack(event: React.PointerEvent<HTMLDivElement>, index: number) {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const stack = stackRefs.current[index];
    if (!stack) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    stack.style.left = `${event.clientX - bounds.left}px`;
    stack.style.top = `${event.clientY - bounds.top}px`;
  }

  function enterHero() {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    setPaused(true);
  }

  function leaveHero() {
    setPaused(false);
  }

  const visibleProjects = archiveProjects.filter((project) => filter === "all" || project.type === filter);
  const filters = ["all", ...Array.from(new Set(archiveProjects.map((project) => project.type)))];
  const visibleProcess = processes;

  return (
    <main className={styles.page}>
      <header className={`${styles.intro} ${heroStyles.hero}`} data-motion-reveal>
        {workHeroVideo ? <video className={`${styles.introMedia} ${heroStyles.media}`} autoPlay data-motion-parallax="36" loop muted playsInline src={workHeroVideo} /> : workHeroImage ? <Image alt={page.workHeroImage?.alt || ""} className={`${styles.introMedia} ${heroStyles.media}`} data-motion-parallax="36" fill priority sizes="100vw" src={workHeroImage} unoptimized /> : null}
        <div className={`${styles.introShade} ${heroStyles.shade}`} />
        <div className={`${styles.introContent} ${heroStyles.content}`}>
          <div className={`${styles.kicker} ${heroStyles.eyebrow}`}>{page.pageEyebrow}</div>
          <h1 className={heroStyles.heading}>{(page.pageTitle || "").split("\n").map((line, index) => <span key={line}>{index ? <br /> : null}{line}</span>)}</h1>
          <div className={heroStyles.bottom}>
            <p className={heroStyles.description}>{page.pageDescription}</p>
          </div>
        </div>
      </header>

      <section className={styles.featured} aria-label="Featured Work" data-motion-reveal>
        <div className={styles.topline}>
          <span className={styles.eyebrow}>{page.projectsIntro?.eyebrow}</span>
          <span className={styles.counter}><b>{String(active + 1).padStart(2, "0")}</b> / {String(displayProjects.length).padStart(2, "0")}</span>
        </div>
        <div className={styles.stage}>
          {displayProjects.map((project, index) => (
            <article aria-hidden={active !== index} className={`${styles.slide} ${active === index ? styles.active : ""} ${index === 0 ? styles.amorens : ""}`} key={project.title}>
              <div className={styles.copy}>
                <div className={styles.eyebrow}>{`${String(index + 1).padStart(2, "0")} · ${project.category} · ${project.year}`}</div>
                <h2>{project.title}</h2>
                <p>{project.statement}</p>
                <Link className={styles.caseLink} href={project.href}>View Case Study ↗</Link>
              </div>
              <div
                className={styles.heroZone}
                onPointerEnter={enterHero}
                onPointerLeave={leaveHero}
                onPointerMove={(event) => moveStack(event, index)}
              >
                <Link aria-label={`View ${project.title} case study`} className={styles.heroLink} href={project.href} tabIndex={active === index ? 0 : -1}>
                  <Image alt={project.title} className={styles.heroImage} fill priority={index === 0} sizes="(max-width: 850px) 100vw, 68vw" src={project.image} />
                </Link>
                {project.previews.length ? (
                  <div className={styles.cursorStack} ref={(node) => { stackRefs.current[index] = node; }}>
                    {project.previews.map((preview, previewIndex) => (
                      <Image alt="" aria-hidden="true" className={`${styles.cursorPreview} ${styles[`preview${previewIndex + 1}`]}`} height={155} key={preview} src={preview} width={245} />
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
        <div className={styles.controls}>
          <button aria-label="Previous featured project" className={styles.arrow} onClick={() => show(active - 1)} type="button">←</button>
          <div className={styles.dots}>
            {displayProjects.map((project, index) => <button aria-label={`Show ${project.title}`} className={`${styles.dot} ${active === index ? styles.dotActive : ""}`} key={project.title} onClick={() => show(index)} type="button" />)}
          </div>
          <button aria-label="Next featured project" className={styles.arrow} onClick={() => show(active + 1)} type="button">→</button>
        </div>
      </section>

      <section className={styles.archive} data-motion-reveal id="archive">
        <div className={styles.archiveHead}>
          <div><div className={styles.kicker}>{page.moreWorkIntro?.eyebrow}</div><h3>{page.moreWorkIntro?.heading}</h3></div>
          <p>{page.moreWorkIntro?.description}</p>
        </div>
        <div aria-label="Work filters" className={styles.filterRow}>
          {filters.map((item) => (
            <button className={`${styles.filter} ${filter === item ? styles.filterActive : ""}`} key={item} onClick={() => setFilter(item)} type="button">{item}</button>
          ))}
        </div>
        <div className={styles.grid} data-motion-stagger>
          {visibleProjects.map((project) => {
            const index = archiveProjects.indexOf(project);
            return (
              <Link className={styles.card} data-motion-item data-motion-reveal href={project.href} key={project.title}>
                <div className={styles.archiveVisual}>
                  <Image alt={`${project.title} project`} fill sizes="(max-width: 850px) 100vw, 50vw" src={project.image} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <span>{`${project.category} · ${project.year}`}</span><b>{project.title}</b><em>View Case Study ↗</em>
              </Link>
            );
          })}
        </div>
        <div className={styles.archiveBottom}><span>{String(visibleProjects.length).padStart(2, "0")} projects shown</span><button disabled type="button">Load More</button></div>
      </section>

      <section className={styles.approach} data-motion-reveal>
        <div className={styles.kicker}>{page.processEyebrow || "How We Work"}</div>
        <div className={styles.approachGrid}>
          <h3>{(page.processHeading || "FROM IDEA\nTO EXPERIENCE.").split("\n").map((line, index) => <span key={`${line}-${index}`}>{index ? <br /> : null}{line}</span>)}</h3>
          <div className={styles.steps} data-motion-stagger>
            {visibleProcess.map((step, index) => <div data-motion-item data-motion-reveal key={`${step.title}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><b>{step.title}</b><p>{step.shortDescription}</p></div>)}
          </div>
        </div>
      </section>

      <section className={styles.closing} data-motion-reveal>
        <div className={styles.kicker}>{page.finalCta?.eyebrow || page.finalCta?.globalCta?.eyebrow}</div>
        <h3>{(page.finalCta?.title || [page.finalCta?.globalCta?.titleLine1, page.finalCta?.globalCta?.titleLine2].filter(Boolean).join("\n")).split("\n").map((line, index) => <span key={`${line}-${index}`}>{index ? <br /> : null}{line}</span>)}</h3>
        {(page.finalCta?.primaryAction?.label || page.finalCta?.globalCta?.primaryButton?.label) ? <Link className={styles.closingLink} href={page.finalCta?.primaryAction?.link || page.finalCta?.globalCta?.primaryButton?.link || "/contact"}>{page.finalCta?.primaryAction?.label || page.finalCta?.globalCta?.primaryButton?.label} ↗</Link> : null}
      </section>
    </main>
  );
}
