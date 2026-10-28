import Image from "next/image";
import Link from "next/link";
import type {
  CtaLink,
  PackageItem,
  PackagesPageSettings,
  PricingSelection,
  SectionIntro,
} from "@/lib/sanity/queries";
import styles from "./PricingMaster.module.css";
import heroStyles from "@/components/layout/PageHero.module.css";

type PricingMasterProps = {
  page: PackagesPageSettings;
  packages: PackageItem[];
};

function packagePrice(item?: PackageItem) {
  return (
    item?.priceDisplay ||
    item?.startingPrice ||
    (typeof item?.price === "number" ? `Rp${item.price}` : "")
  );
}

function resolvePackages(selections: PricingSelection[] | undefined, packages: PackageItem[], type: PackageItem["packageType"]) {
  const selected = (selections || []).filter((entry) => entry.pricing?.active !== false).map((entry) => ({
    ...entry.pricing,
    title: entry.displayTitle || entry.pricing?.title,
    description: entry.displayDescription || entry.pricing?.suitableFor || entry.pricing?.description,
  }));
  const resolved = selected.length
    ? selected
    : packages
        .filter((item) => item.active !== false && item.packageType === type)
        .sort((a, b) => (a.order || 0) - (b.order || 0));

  return resolved.map((item) => ({...item, price: packagePrice(item)}));
}

function sectionIntro(value: SectionIntro | undefined) {
  return {eyebrow: value?.eyebrow || "", heading: value?.heading || "", description: value?.description || ""};
}

function safeHref(value: string | undefined, fallback = "/contact") {
  if (!value) return fallback;
  return value.startsWith("/") ||
    value.startsWith("http") ||
    value.startsWith("mailto:")
    ? value
    : fallback;
}

function ActionLink({
  action,
}: {
  action?: CtaLink;
}) {
  if (!action?.label) return null;
  return (
    <Link
      className={styles.button}
      href={safeHref(action?.link)}
      rel={action?.openInNewTab ? "noreferrer" : undefined}
      target={action?.openInNewTab ? "_blank" : undefined}
    >
      {action.label} <span aria-hidden="true">→</span>
    </Link>
  );
}

function Intro({
  intro,
  dark = false,
}: {
  intro: Required<SectionIntro>;
  dark?: boolean;
}) {
  return (
    <div className={`${styles.intro} ${dark ? styles.introDark : ""}`}>
      <div>
        <p className={styles.eyebrow}>{intro.eyebrow}</p>
        <h2>{intro.heading}</h2>
      </div>
      <p>{intro.description}</p>
    </div>
  );
}

export function PricingMaster({ page, packages }: PricingMasterProps) {
  const standard = resolvePackages(page.websitePricing, packages, "standard");
  const premium = resolvePackages(page.premiumPricing, packages, "premium");
  const wordpress = resolvePackages(page.wordpressPricing, packages, "wordpress")[0];
  const heroMedia = page.pricingHeroMedia;
  const heroImage =
    page.pricingHeroImage?.url ||
    page.pricingHeroImage?.asset?.url ||
    heroMedia?.image?.url ||
    heroMedia?.image?.asset?.url ||
    heroMedia?.posterImage?.url ||
    heroMedia?.posterImage?.asset?.url ||
    page.heroBackgroundImage?.url ||
    page.heroBackgroundImage?.asset?.url;
  const heroVideo =
    page.pricingHeroVideo?.url ||
    page.pricingHeroVideo?.asset?.url ||
    heroMedia?.video?.url ||
    heroMedia?.video?.asset?.url ||
    page.heroBackgroundVideo?.url ||
    page.heroBackgroundVideo?.asset?.url;
  const websiteIntro = sectionIntro(page.websitePricingIntro);
  const premiumIntro = sectionIntro(page.premiumPricingIntro);
  const foundationIntro = sectionIntro(page.projectFoundationIntro);
  const questionsIntro = sectionIntro(page.beforeWeBuildIntro);
  const processIntro = sectionIntro(page.processIntro);
  const faqIntro = sectionIntro(page.faqIntro);
  const foundation = page.projectFoundationItems || [];
  const questions = page.beforeWeBuildItems || [];
  const ownership = page.ownershipItems || [];
  const process = page.selectedProcess?.length
      ? page.selectedProcess.map((entry) => ({
          title: entry.process?.title,
          description:
            entry.displayDescription || entry.process?.shortDescription,
        }))
      : [];
  const faqs = [...(page.faqs || [])].sort((a, b) => (a.order || 0) - (b.order || 0));
  const benefits = page.websitePricingBenefits || [];
  const finalCta = page.finalCta;
  const finalTitle =
    finalCta?.title ||
    [finalCta?.globalCta?.titleLine1, finalCta?.globalCta?.titleLine2]
      .filter(Boolean)
      .join("\n");
  const finalDescription =
    finalCta?.description ||
    finalCta?.globalCta?.description;
  const finalAction =
    finalCta?.primaryAction || finalCta?.globalCta?.primaryButton;

  return (
    <main className={styles.page}>
      <header className={`${styles.hero} ${heroStyles.hero}`} data-motion-reveal>
        {heroVideo ? (
          <video
            autoPlay
            className={`${styles.heroMedia} ${heroStyles.media}`}
            data-motion-parallax="36"
            loop
            muted
            playsInline
            poster={heroImage}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        ) : heroImage ? (
          <Image
            alt={page.pricingHeroImage?.alt || heroMedia?.alt || ""}
            className={`${styles.heroMedia} ${heroStyles.media}`}
            data-motion-parallax="36"
            fill
            priority
            sizes="100vw"
            src={heroImage}
            unoptimized
          />
        ) : null}
        <div className={`${styles.heroShade} ${heroStyles.shade}`} />
        <div className={`${styles.heroContent} ${heroStyles.content}`}>
          <p className={`${styles.eyebrow} ${heroStyles.eyebrow}`}>{page.pageEyebrow}</p>
          <h1 className={heroStyles.heading}>{page.pageTitle}</h1>
          <div className={`${styles.heroFoot} ${heroStyles.bottom}`}>
            <p className={heroStyles.description}>
              {page.pageDescription}
            </p>
            <div className={styles.heroPrice}>
              <span>{page.startingPriceLabel}</span>
              <strong>{page.startingPriceDisplay}</strong>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.standardSection} data-motion-reveal>
        <Intro intro={websiteIntro} />
        <div className={styles.priceGrid} data-motion-stagger>
          {standard.map((item, index) => (
            <article className={styles.priceCard} data-motion-item data-motion-reveal key={item.title}>
              <span className={styles.number}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{item.title}</h3>
              <strong className={styles.amount}>{item.price}</strong>
              <p>Maks. {item.maximumSections} sections</p>
              <div className={styles.fit}>
                <b>Cocok untuk</b>
                <span>{item.description}</span>
              </div>
            </article>
          ))}
        </div>
        <p className={styles.shared}>{benefits.join(" · ")}</p>
      </section>

      <section className={styles.premiumSection} data-motion-reveal>
        <Intro dark intro={premiumIntro} />
        <div className={styles.tiers} data-motion-stagger>
          {premium.map((item) => (
            <article className={styles.tier} data-motion-item data-motion-reveal key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <strong>{item.price}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.wordpress} data-motion-reveal>
        <div>
          <p className={styles.eyebrow}>
            {page.wordpressIntro?.eyebrow}
          </p>
          <h2>{page.wordpressIntro?.heading}</h2>
        </div>
        <div><p>{page.wordpressIntro?.description || wordpress?.description}</p>{wordpress?.price ? <strong>{wordpress.price}</strong> : null}</div>
        <ActionLink action={page.wordpressCta} />
      </section>

      <section className={styles.foundationSection} data-motion-reveal>
        <Intro intro={foundationIntro} />
        <div className={styles.foundationGrid} data-motion-stagger>
          {foundation.map((item, index) => (
            <article
              className={styles.foundationItem}
              data-motion-item
              data-motion-reveal
              key={`${item.title}-${index}`}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.questionsSection} data-motion-reveal>
        <Intro intro={questionsIntro} />
        <div>
          {questions.map((item, index) => (
            <article className={styles.question} data-motion-item data-motion-reveal key={`${item.title}-${index}`}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.ownershipSection} data-motion-reveal>
        <p className={styles.eyebrow}>
          {page.ownershipIntro?.eyebrow}
        </p>
        <h2>{page.ownershipIntro?.heading}</h2>
        <div className={styles.ownershipGrid} data-motion-stagger>
          {ownership.map((item, index) => (
            <article
              className={styles.ownershipItem}
              data-motion-item
              data-motion-reveal
              key={`${item.title}-${index}`}
            >
              <span className={styles.number}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.processSection} data-motion-reveal>
        <Intro intro={processIntro} />
        <div className={styles.processGrid} data-motion-stagger>
          {process.map((item, index) => (
            <article
              className={styles.processItem}
              data-motion-item
              data-motion-reveal
              key={`${item.title}-${index}`}
            >
              <b>{String(index + 1).padStart(2, "0")}</b>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.faqSection} data-motion-reveal>
        <Intro intro={faqIntro} />
        <div className={styles.faqList}>
          {faqs.map((item, index) => (
            <details key={`${item.question}-${index}`}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.cta} data-motion-reveal>
        <h2>{finalTitle}</h2>
        <div className={styles.ctaLine}>
          <p>{finalDescription}</p>
          <ActionLink action={finalAction} />
        </div>
      </section>
    </main>
  );
}
