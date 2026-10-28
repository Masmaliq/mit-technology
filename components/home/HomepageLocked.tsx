"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type {
  Homepage,
  HomepagePackage,
  HomepageProject,
} from "@/lib/sanity/queries";
import styles from "./HomepageLocked.module.css";

type HomepageLockedProps = {
  homepage: Homepage;
};

type WorkItem = HomepageProject & { imageUrl?: string };

function safeHref(value: string | undefined, fallback: string) {
  if (!value) return fallback;
  return value.startsWith("/") || value.startsWith("#") || value.startsWith("http") ? value : fallback;
}

function serviceHref(slug?: string) {
  return slug && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? `/services#${slug}` : "/services";
}

function imageUrl(image?: { url?: string; asset?: { url?: string } }) {
  return image?.url || image?.asset?.url || "";
}

function priceLabel(item: HomepagePackage) {
  if (item.priceDisplay) return item.priceDisplay;
  if (item.startingPrice) return item.startingPrice;
  if (typeof item.price === "number") {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(item.price);
  }
  return "";
}

function revealDelay(index: number): CSSProperties {
  return { "--reveal-delay": `${Math.min(index, 6) * 70}ms` } as CSSProperties;
}

export function HomepageLocked({
  homepage,
}: HomepageLockedProps) {
  const selectedServices = (homepage.selectedServices || [])
    .filter((entry) => entry.service?.title)
    .map((entry) => ({
      ...entry.service,
      title: entry.displayTitle || entry.service?.title,
      shortDescription: entry.displayDescription || entry.service?.shortDescription,
    }));

  const selectedProjects: WorkItem[] = useMemo(() => {
    if (homepage.selectedProjects?.length) {
      return homepage.selectedProjects
        .filter((entry) => entry.project?.title)
        .map((entry) => ({
          ...entry.project,
          category: entry.displayCategory || entry.project?.category,
          shortDescription: entry.displayDescription || entry.project?.shortDescription,
          featured: entry.featured || entry.project?.featured,
          imageUrl:
            imageUrl(entry.presentationMedia?.image) ||
            imageUrl(entry.presentationMedia?.posterImage) ||
            imageUrl(entry.project?.coverImage) ||
            imageUrl(entry.project?.desktopVisual),
        }));
    }
    return [];
  }, [homepage.selectedProjects]);

  const [activeWorkIndex, setActiveWorkIndex] = useState(0);
  const activeWork = selectedProjects[Math.min(activeWorkIndex, Math.max(selectedProjects.length - 1, 0))];

  const pagePricing = homepage.selectedPricing || [];
  const configuredStandardPricing = pagePricing
    .filter((item) => item.packageType === "standard")
    .sort((a, b) => (a.pageCount || 0) - (b.pageCount || 0));
  const standardPricing = configuredStandardPricing;
  const configuredPremiumPricing = pagePricing.filter((item) => item.packageType === "premium");
  const premiumPricing = configuredPremiumPricing;
  const wordpressPricing = pagePricing.find((item) => item.packageType === "wordpress");
  const selectedProcess = (homepage.selectedProcess || [])
    .filter((entry) => entry.process?.title)
    .map((entry) => ({
      ...entry.process,
      shortDescription: entry.displayDescription || entry.process?.shortDescription,
    }));
  const visibleProcess = selectedProcess;
  const selectedInsights = homepage.selectedInsights || [];
  const visibleInsights = selectedInsights;

  const technologyLabels = homepage.technologyLabels?.filter(Boolean).length
    ? homepage.technologyLabels.filter(Boolean)
    : [];
  const marqueeLabels = [...technologyLabels, ...technologyLabels];

  const heroImage = imageUrl(homepage.heroMainImage);
  const heroVideo = homepage.heroMediaType === "video" ? homepage.heroVideoMp4?.url : undefined;
  const finalCta = homepage.finalCta;
  const globalCta = finalCta?.globalCta || homepage.globalCta;
  const finalTitle = finalCta?.title || [globalCta?.titleLine1, globalCta?.titleLine2].filter(Boolean).join("\n") || homepage.ctaTitle;
  const finalAction = finalCta?.primaryAction || globalCta?.primaryButton;

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-homepage-motion]");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const revealItems = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.revealState = "visible";
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );

    root.dataset.motionReady = "true";
    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.page} data-homepage-motion>
      <header className={styles.hero}>
        {heroVideo ? (
          <video className={styles.heroMedia} autoPlay data-motion-parallax="36" muted loop playsInline poster={heroImage || undefined}>
            <source src={heroVideo} type="video/mp4" />
          </video>
        ) : heroImage ? (
          <Image alt={homepage.heroMediaAltText || ""} className={styles.heroMedia} data-motion-parallax="36" fill priority sizes="100vw" src={heroImage} unoptimized />
        ) : null}
        <div className={styles.heroShade} />
        <div className={`${styles.wrap} ${styles.heroInner}`}>
          <p className={styles.eyebrow} data-reveal>{homepage.heroEyebrow}</p>
          <h1 data-reveal style={revealDelay(1)}>{homepage.heroTitle}</h1>
          <div className={styles.heroBottom} data-reveal style={revealDelay(2)}>
            <p>{homepage.heroDescription}</p>
            {homepage.heroPrimaryCtaLabel ? (
              <Link className={styles.lightButton} href={safeHref(homepage.heroPrimaryCtaUrl, "/work")}>
                {homepage.heroPrimaryCtaLabel} <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </div>
        </div>
      </header>

      {technologyLabels.length ? (
        <div className={styles.marquee} aria-label="Technology stack">
          <div className={styles.marqueeTrack}>
            {marqueeLabels.map((label, index) => (
              <span className={styles.tech} key={`${label}-${index}`}>
                <span className={styles.techMark} aria-hidden="true">◇</span>
                {label}
                <span className={styles.separator} aria-hidden="true">—</span>
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {selectedServices.length ? (
        <section className={styles.services} id="services">
          <div className={styles.wrap}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow} data-reveal>{homepage.servicesSection?.eyebrow}</p>
                <h2 data-reveal style={revealDelay(1)}>{homepage.servicesSection?.heading}</h2>
              </div>
              <p data-reveal style={revealDelay(2)}>{homepage.servicesSection?.description}</p>
            </div>
            <div className={styles.serviceList}>
              {selectedServices.map((service, index) => (
                <Link className={styles.serviceRow} data-reveal href={serviceHref(service.slug)} key={`${service.slug || service.title}-${index}`} style={revealDelay(index)}>
                  <span>/{String(index + 1).padStart(2, "0")}</span>
                  <h3>{service.title}</h3>
                  <b aria-hidden="true">↗</b>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {selectedProjects.length ? (
        <section className={styles.work} id="work">
          <div className={styles.wrap}>
            <div className={styles.workIntro}>
              <div>
                <p className={styles.eyebrow} data-reveal>{homepage.selectedWorkSection?.eyebrow}</p>
                <h2 data-reveal style={revealDelay(1)}>{homepage.selectedWorkSection?.heading}</h2>
              </div>
              <div className={styles.workIntroRight} data-reveal style={revealDelay(2)}>
                <p>{homepage.selectedWorkSection?.description}</p>
                {homepage.selectedWorkCta?.label ? <Link href={safeHref(homepage.selectedWorkCta.link, "/work")}>{homepage.selectedWorkCta.label} ↗</Link> : null}
              </div>
            </div>

            <div className={styles.workBrowser} data-motion-media data-reveal>
              <div className={styles.workList}>
                {selectedProjects.slice(0, 4).map((project, index) => (
                  <button
                    className={`${styles.workItem} ${activeWorkIndex === index ? styles.workItemActive : ""}`}
                    key={`${project.slug || project.title}-${index}`}
                    onClick={() => setActiveWorkIndex(index)}
                    onMouseEnter={() => setActiveWorkIndex(index)}
                    type="button"
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{project.title}</strong>
                    <span>{project.category || project.client}</span>
                    <span>{project.year || ""}</span>
                    <b aria-hidden="true">↗</b>
                  </button>
                ))}
              </div>
              <div className={styles.workPreview}>
                {activeWork?.imageUrl ? (
                  <Link aria-label={activeWork.title ? `Buka ${activeWork.title}` : "Buka project"} className={styles.workPreviewLink} href={activeWork.slug ? `/work/${activeWork.slug}` : "/work"}>
                    <Image alt={activeWork.title || "Selected project"} className={styles.workPreviewImage} fill key={activeWork.slug || activeWork.title} sizes="(max-width: 850px) 100vw, 45vw" src={activeWork.imageUrl} unoptimized />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className={styles.pricing} id="pricing">
          <div className={styles.wrap}>
            <div className={styles.pricingHeading}>
              <div>
                <p className={styles.eyebrow} data-reveal>{homepage.pricingSection?.eyebrow}</p>
                <h2 data-reveal style={revealDelay(1)}>{homepage.pricingSection?.heading}</h2>
              </div>
              <div className={styles.pricingHeadingRight} data-reveal style={revealDelay(2)}>
                <p>{homepage.pricingSection?.description}</p>
                {homepage.pricingCta?.label ? <Link href={safeHref(homepage.pricingCta.link, "/pricing")}>{homepage.pricingCta.label} ↗</Link> : null}
              </div>
            </div>

            {standardPricing.length ? (
              <div className={styles.priceCards}>
                {standardPricing.map((item, index) => (
                  <article className={styles.priceCard} data-reveal key={`${item.slug || item.title}-${index}`} style={revealDelay(index)}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{item.title}</h3>
                      {priceLabel(item) ? <strong>{priceLabel(item)}</strong> : null}
                      <p>{item.maximumSections ? `Maks. ${item.maximumSections} sections` : item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
            <p className={styles.pricingBenefits}>{homepage.pricingBenefits?.join("  ·  ")}</p>
            {homepage.pricingNote ? <p className={styles.pricingNote}>{homepage.pricingNote}</p> : null}

            {premiumPricing.length ? (
              <div className={styles.premium} data-reveal>
                <div className={styles.premiumHead}>
                  <div><p className={styles.eyebrow}>{homepage.premiumPricingSection?.eyebrow}</p><h3>{homepage.premiumPricingSection?.heading}</h3></div>
                  <p>{homepage.premiumPricingSection?.description}</p>
                </div>
                <div className={styles.tiers}>
                  {premiumPricing.map((item, index) => (
                    <article className={styles.tier} data-reveal key={`${item.slug || item.title}-${index}`} style={revealDelay(index)}>
                      <span>{String(index + 1).padStart(2, "0")} / {item.title?.toUpperCase()}</span>
                      <h4>{item.title}</h4>
                      <small>{item.priceQualifier === "bespoke" ? homepage.premiumPricingBespokeLabel : homepage.premiumPricingStartingFromLabel}</small>
                      {priceLabel(item) ? <strong>{priceLabel(item)}</strong> : null}
                      {item.features?.length ? <p>{item.features.map((feature) => <span key={feature}>{feature}</span>)}</p> : item.description ? <p>{item.description}</p> : null}
                      <Link href="/contact">{index === 2 ? homepage.premiumPricingFeaturedCtaLabel : homepage.premiumPricingCtaLabel} →</Link>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}

          {wordpressPricing ? (
              <div className={styles.wordpress} data-reveal>
                <div><p className={styles.eyebrow}>{homepage.wordpressEyebrow}</p><h3>{wordpressPricing.title}</h3><p>{wordpressPricing.description}</p></div>
                <div className={styles.wordpressPrice}><small>{homepage.wordpressPriceLabel}</small><strong>{priceLabel(wordpressPricing)}</strong></div>
                {homepage.wordpressCta?.label ? <Link className={styles.wordpressButton} href={safeHref(homepage.wordpressCta.link, "/pricing")}>{homepage.wordpressCta.label} →</Link> : null}
              </div>
            ) : null}
          </div>
        </section>

      <section className={styles.process}>
          <div className={styles.wrap}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.eyebrow} data-reveal>{homepage.processSection?.eyebrow}</p><h2 data-reveal style={revealDelay(1)}>{homepage.processSection?.heading}</h2></div>
              <p data-reveal style={revealDelay(2)}>{homepage.processSection?.description}</p>
            </div>
            <div className={styles.steps}>
              {visibleProcess.map((step, index) => (
                <article className={styles.step} data-reveal key={`${step.title}-${index}`} style={revealDelay(index)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.shortDescription}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

      {visibleInsights.length ? (
        <section className={styles.insights}>
          <div className={styles.wrap}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.eyebrow} data-reveal>{homepage.insightsSection?.eyebrow}</p><h2 data-reveal style={revealDelay(1)}>{homepage.insightsSection?.heading}</h2></div>
              <p data-reveal style={revealDelay(2)}>{homepage.insightsSection?.description}</p>
            </div>
            <div className={styles.articles}>
              {visibleInsights.slice(0, 3).map((insight, index) => (
                <Link className={styles.article} data-reveal href={insight.slug ? `/insights/${insight.slug}` : "#"} key={`${insight.slug || insight.title}-${index}`} style={revealDelay(index)}>
                  <span>{insight.category}</span>
                  <div><h3>{insight.title}</h3><p>{insight.excerpt}</p></div>
                  <span>{homepage.insightsCtaLabel} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {finalTitle ? (
        <section className={styles.finalCta}>
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-reveal>{finalCta?.eyebrow || globalCta?.eyebrow || homepage.ctaEyebrow}</p>
            <h2 data-reveal style={revealDelay(1)}>{finalTitle}</h2>
            <div className={styles.ctaBottom} data-reveal style={revealDelay(2)}>
              <p>{finalCta?.description || globalCta?.description || homepage.ctaDescription}</p>
              {(finalAction?.label || homepage.ctaButtonLabel) ? (
                <Link className={styles.lightButton} href={safeHref(finalAction?.link || homepage.ctaButtonHref, "/contact")}>
                  {finalAction?.label || homepage.ctaButtonLabel} <span aria-hidden="true">→</span>
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
