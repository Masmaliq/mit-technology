import Image from "next/image";
import Link from "next/link";
import type { SolutionItem, SolutionsPage } from "@/lib/sanity/queries";
import styles from "./ServicesMaster.module.css";
import heroStyles from "@/components/layout/PageHero.module.css";

type ServicesMasterProps = {
  page: SolutionsPage;
  services: SolutionItem[];
};

function slugify(value?: string) {
  return (value || "").toLowerCase().trim().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function imageUrl(image?: { url?: string; asset?: { url?: string } }) {
  return image?.url || image?.asset?.url || "";
}

function safeHref(value: string | undefined, fallback: string) {
  if (!value) return fallback;
  return value.startsWith("/") || value.startsWith("#") || value.startsWith("http") ? value : fallback;
}

export function ServicesMaster({ page, services }: ServicesMasterProps) {
  const heroImage = imageUrl(page.serviceHeroImage);
  const heroVideo = page.serviceHeroMediaType === "video" ? page.serviceHeroVideo?.url || page.serviceHeroVideo?.asset?.url : undefined;
  const coreServicesIntro = page.coreServicesIntro || page.whatWeDo;
  const selectedRecords = page.selectedServices?.length
    ? page.selectedServices.map((entry) => ({
        ...entry.service,
        title: entry.displayTitle || entry.service?.title,
        shortDescription: entry.displayDescription || entry.service?.shortDescription,
      })).filter((item) => item.title)
    : services;

  const presentations = selectedRecords.map((service) => ({
    key: service.slug || slugify(service.title),
    title: service.title || "",
    description: service.shortDescription || service.fullDescription || "",
    tags: service.capabilities?.filter(Boolean).length ? service.capabilities.filter(Boolean) : service.features?.filter(Boolean) || [],
    href: safeHref(service.exploreLink || service.ctaHref, "/services"),
    linkLabel: service.exploreLabel || service.ctaLabel || "",
  }));

  const capabilities = page.capabilityGroups?.filter((group) => group.title).length
    ? page.capabilityGroups.filter((group) => group.title).map((group) => ({
        title: group.title || "",
        description: group.items?.filter(Boolean).join(" ") || "",
      }))
    : [];

  const processSteps = page.selectedProcess?.filter((entry) => entry.process?.title).length
    ? page.selectedProcess.filter((entry) => entry.process?.title).map((entry) => ({
        title: entry.process?.title || "",
        description: entry.displayDescription || entry.process?.shortDescription || "",
      }))
    : [];

  const creativeItems = page.creativeShowreels?.length
    ? page.creativeShowreels.map((item) => ({ title: item.title || "", label: item.category || item.caption || "", image: item.image, video: item.video }))
    : page.creativeProductionMedia?.image || page.creativeProductionMedia?.video
      ? [{ title: page.creativeProductionIntro?.heading || "", label: page.creativeProductionIntro?.eyebrow || "", image: page.creativeProductionMedia.image, video: page.creativeProductionMedia.video }]
      : (page.creativeProductionSupportingContent || []).map((item) => ({title: item.title || "", label: item.label || "", image: item.image, video: undefined}));

  const globalCta = page.finalCta?.globalCta;
  const finalTitle = page.finalCta?.title || [globalCta?.titleLine1, globalCta?.titleLine2].filter(Boolean).join("\n") || page.ctaTitle;
  const finalDescription = page.finalCta?.description || globalCta?.description || page.ctaDescription;
  const finalAction = page.finalCta?.primaryAction || globalCta?.primaryButton;

  return (
    <main className={styles.page}>
      <header className={`${styles.hero} ${heroStyles.hero}`} data-motion-reveal>
        {heroVideo ? <video className={`${styles.heroMedia} ${heroStyles.media}`} autoPlay data-motion-parallax="36" loop muted playsInline src={heroVideo} /> : heroImage ? <Image alt={page.serviceHeroImage?.alt || ""} className={`${styles.heroMedia} ${heroStyles.media}`} data-motion-parallax="36" fill priority sizes="100vw" src={heroImage} unoptimized /> : null}
        <div className={`${styles.heroShade} ${heroStyles.shade}`} />
        <div className={`${styles.heroContent} ${heroStyles.content}`}>
          <p className={`${styles.eyebrow} ${heroStyles.eyebrow}`}>{page.heroEyebrow}</p>
          <h1 className={heroStyles.heading}>{page.heroTitle}</h1>
          <div className={`${styles.heroBottom} ${heroStyles.bottom}`}>
            <p className={heroStyles.description}>{page.heroDescription}</p>
            <span>{page.heroCount}</span>
          </div>
        </div>
      </header>

      <section className={styles.intro} data-motion-reveal>
        <div><p className={styles.eyebrow}>{coreServicesIntro?.eyebrow}</p><h2>{coreServicesIntro?.heading}</h2></div>
        <p>{coreServicesIntro?.description}</p>
      </section>

      <section className={styles.services} aria-label="Core services" data-motion-stagger>
        {presentations.map((service, index) => (
          <article className={styles.service} data-motion-item data-motion-reveal id={service.key} key={service.key}>
            <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
            <h3>{service.title}</h3>
            <div className={styles.serviceRight}>
              <p>{service.description}</p>
              <div className={styles.tags}>{service.tags.map((tag) => <span className={styles.tag} key={`${service.key}-${tag}`}>{tag}</span>)}</div>
              <Link className={styles.more} href={service.href}>{service.linkLabel} →</Link>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.media} data-motion-reveal id="showreel">
        <div className={styles.mediaHead}>
          <div><p className={styles.eyebrow}>{page.creativeProductionIntro?.eyebrow}</p><h2>{page.creativeProductionIntro?.heading}</h2></div>
          <p>{page.creativeProductionIntro?.description}</p>
        </div>
        <div className={styles.showreel} data-motion-stagger>
          {creativeItems.map((item, index) => {
            const src = imageUrl(item.image);
            const videoSrc = item.video?.url || item.video?.asset?.url || "";
            return (
              <div className={`${styles.visual} ${index === 1 ? styles.motion : ""}`} data-motion-item data-motion-media data-motion-reveal key={item.title}>
                {videoSrc ? <video aria-label={item.title} autoPlay loop muted playsInline src={videoSrc} /> : src ? <Image alt={item.image?.alt || item.title} fill sizes="(max-width: 850px) 100vw, 50vw" src={src} unoptimized /> : null}
                <span className={styles.play} aria-hidden="true">▶</span>
                <div className={styles.caption}><h3>{item.title}</h3><span>{item.label}</span></div>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.capabilities} data-motion-reveal>
        <div className={styles.capHead}>
          <div><p className={styles.eyebrow}>{page.capabilitiesIntro?.eyebrow}</p><h2>{page.capabilitiesIntro?.heading}</h2></div>
          <p>{page.capabilitiesIntro?.description}</p>
        </div>
        <div className={styles.capGrid} data-motion-stagger>
          {capabilities.slice(0, 4).map((capability, index) => (
            <article className={styles.cap} data-motion-item data-motion-reveal key={`${capability.title}-${index}`}><b>{String(index + 1).padStart(2, "0")}</b><h3>{capability.title}</h3><p>{capability.description}</p></article>
          ))}
        </div>
      </section>

      <section className={styles.process} data-motion-reveal>
        <p className={styles.eyebrow}>{page.processIntro?.eyebrow}</p>
        <h2>{page.processIntro?.heading}</h2>
        {page.processIntro?.description ? <p className={styles.processDescription}>{page.processIntro.description}</p> : null}
        <div className={styles.steps} data-motion-stagger>
          {processSteps.slice(0, 4).map((step, index) => (
            <article className={styles.step} data-motion-item data-motion-reveal key={`${step.title}-${index}`}><b>{String(index + 1).padStart(2, "0")}</b><h3>{step.title}</h3><p>{step.description}</p></article>
          ))}
        </div>
      </section>

      <section className={styles.cta} data-motion-reveal>
        <h2>{finalTitle}</h2>
        <div className={styles.ctaLine}>
          <p>{finalDescription}</p>
          {(finalAction?.label || page.ctaButtonLabel) ? <Link className={styles.ctaButton} href={safeHref(finalAction?.link || page.ctaButtonUrl, "/contact")}>{finalAction?.label || page.ctaButtonLabel} →</Link> : null}
        </div>
      </section>
    </main>
  );
}
