"use client";

import { Fragment, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { About, HomepageProject, SolutionItem } from "@/lib/sanity/queries";
import styles from "./AboutMaster.module.css";
import heroStyles from "@/components/layout/PageHero.module.css";

type AboutMasterProps = {
  about: About;
  services: SolutionItem[];
  projects: HomepageProject[];
};

function portableTextParagraphs(about: About) {
  return (about.whoWeAreBody || [])
    .map((block) => (block.children || []).map((child) => child.text || "").join("").trim())
    .filter(Boolean);
}

function resolveCapabilities(about: About) {
  return (about.capabilityCards || []).filter((item) => item.title).map((item) => ({label: item.label || "", title: item.title || "", description: item.description || ""}));
}

function resolveExpertise(about: About, _services: SolutionItem[]) {
  return (about.expertiseServices || []).filter((item) => item.service?.title).map((item, index) => ({
    label: String(index + 1).padStart(2, "0"),
    title: item.displayTitle || item.service?.title || "",
    description: item.displayDescription || item.service?.shortDescription || "",
  }));
}

function resolveValues(about: About) {
  return (about.values || []).filter((item) => item.title).map((item, index) => ({label: item.label || String(index + 1).padStart(2, "0"), title: item.title || "", description: item.description || ""}));
}

function resolveClients(about: About, projects: HomepageProject[]) {
  if (about.selectedClients?.length) {
    return about.selectedClients
      .filter((entry) => entry.client?.name || entry.relatedProject?.title)
      .map((entry) => ({
        label: entry.relatedProject?.category || entry.client?.industry || "",
        title: entry.client?.name || entry.relatedProject?.client || entry.relatedProject?.title || "",
        description: entry.displayRole || entry.relatedProject?.category || entry.client?.industry || "",
      }));
  }
  if (about.selectedProjects?.length) {
    return about.selectedProjects.filter((project) => project.title || project.client).map((project) => ({
      label: project.category || "",
      title: project.client || project.title || "",
      description: project.category || "",
    }));
  }
  return projects.filter((project) => project.title || project.client).map((project) => ({label: project.category || "", title: project.client || project.title || "", description: project.category || ""}));
}

export function AboutMaster({ about, services, projects }: AboutMasterProps) {
  const expertise = useMemo(() => resolveExpertise(about, services), [about, services]);
  const capabilities = useMemo(() => resolveCapabilities(about), [about]);
  const values = useMemo(() => resolveValues(about), [about]);
  const clients = useMemo(() => resolveClients(about, projects), [about, projects]);
  const story = portableTextParagraphs(about);
  const [activeExpertise, setActiveExpertise] = useState(0);
  const active = expertise[activeExpertise] || expertise[0];

  const cta = about.finalCta;
  const globalCta = cta?.globalCta;
  const ctaTitle = cta?.title || [globalCta?.titleLine1, globalCta?.titleLine2].filter(Boolean).join("\n");
  const ctaAction = cta?.primaryAction || globalCta?.primaryButton;
  const ctaHref = ctaAction?.link || "/contact";
  const heroImage = about.aboutHeroImage?.url || about.aboutHeroImage?.asset?.url;
  const heroVideo = about.aboutHeroVideo?.url || about.aboutHeroVideo?.asset?.url;
  const heroTitle = about.heroTitle || "";

  return (
    <main className={styles.page}>
      <header className={`${styles.hero} ${heroStyles.hero}`} data-motion-reveal>
        {about.aboutHeroMediaType === "video" && heroVideo ? <video aria-label="About Emitech" autoPlay className={heroStyles.media} data-motion-parallax="36" loop muted playsInline src={heroVideo} /> : heroImage ? <Image alt={about.aboutHeroImage?.alt || ""} className={heroStyles.media} data-motion-parallax="36" fill priority sizes="100vw" src={heroImage} unoptimized /> : null}
        <div className={heroStyles.shade} />
        <div className={`${styles.wrap} ${heroStyles.content}`}>
          <p className={`${styles.eyebrow} ${heroStyles.eyebrow}`}>{about.heroEyebrow}</p>
          <h1 className={heroStyles.heading}>{heroTitle.split("\n").map((line, index) => <Fragment key={`${line}-${index}`}>{index ? <br /> : null}{line === "EMITECH" ? <span>EMITECH</span> : line}</Fragment>)}</h1>
          <div className={heroStyles.bottom}>
            <p className={`${styles.heroDescription} ${heroStyles.description}`}>{about.heroDescription}</p>
          </div>
        </div>
      </header>

      <section className={styles.storySection} data-motion-reveal>
        <div className={`${styles.wrap} ${styles.story}`}>
          <div>
            <p className={styles.kicker}>{about.whoWeAreIntro?.eyebrow}</p>
            <h2>{about.whoWeAreIntro?.heading}</h2>
            {story.map((paragraph) => <p className={styles.storyCopy} key={paragraph}>{paragraph}</p>)}
          </div>
          <div className={styles.facts} data-motion-stagger>
            {capabilities.map((item) => (
              <article className={styles.fact} data-motion-item data-motion-reveal key={`${item.title}-${item.label}`}>
                <strong>{item.title}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.expertiseSection} data-motion-reveal>
        <div className={styles.wrap}>
          <p className={styles.kicker}>{about.expertiseIntro?.eyebrow}</p>
          <h2>{about.expertiseIntro?.heading}</h2>
          <div className={styles.expertiseGrid}>
            <div className={styles.expertiseList} data-motion-stagger>
              {expertise.map((item, index) => (
                <button
                  aria-pressed={activeExpertise === index}
                  className={`${styles.expertiseItem} ${activeExpertise === index ? styles.expertiseItemActive : ""}`}
                  data-motion-item
                  data-motion-reveal
                  key={item.title}
                  onClick={() => setActiveExpertise(index)}
                  type="button"
                >
                  <span>{item.label}</span>
                  <strong>{item.title}</strong>
                </button>
              ))}
            </div>
            <aside aria-live="polite" className={styles.expertisePreview}>
              <p className={styles.kicker}>{active.label} / Keahlian</p>
              <h3>{active.title}</h3>
              <p>{active.description}</p>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.valuesSection} data-motion-reveal>
        <div className={styles.wrap}>
          <p className={styles.kicker}>{about.valuesIntro?.eyebrow}</p>
          <h2>{about.valuesIntro?.heading}</h2>
          <div className={styles.valuesGrid} data-motion-stagger>
            <article className={styles.valueMain} data-motion-item data-motion-reveal>
              <span>{values[0].label}</span><h3>{values[0].title}</h3><p>{values[0].description}</p>
            </article>
            <div className={styles.sideValues}>
              {values.slice(1).map((item) => (
                <article className={styles.value} data-motion-item data-motion-reveal key={item.title}>
                  <span>{item.label}</span><h3>{item.title}</h3><p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.clientsSection} data-motion-reveal>
        <div className={styles.wrap}>
          <p className={styles.kicker}>{about.clientsIntro?.eyebrow}</p>
          <h2>{about.clientsIntro?.heading}</h2>
          <div className={styles.clientList} data-motion-stagger>
            {clients.map((item, index) => (
              <div className={styles.client} data-motion-item data-motion-reveal key={item.title}>
                <span className={styles.clientIndex}>{String(index + 1).padStart(2, "0")}</span>
                <div><strong>{item.title}</strong><span>{item.label}</span></div>
                <span className={styles.clientType}>{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection} data-motion-reveal>
        <div className={styles.wrap}>
          <div className={styles.ctaLine} />
          <p className={styles.kicker}>{cta?.eyebrow || globalCta?.eyebrow}</p>
          <h2>{ctaTitle}</h2>
          <p className={styles.ctaDescription}>{cta?.description || globalCta?.description}</p>
          {ctaAction?.label ? <Link className={styles.ctaButton} href={ctaHref}>{ctaAction.label} <span aria-hidden>→</span></Link> : null}
        </div>
      </section>
    </main>
  );
}
