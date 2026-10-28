import Image from "next/image";
import Link from "next/link";
import type { CaseStudyItem, SanityImageValue } from "@/lib/sanity/queries";
import styles from "./AmorensCaseStudy.module.css";

function imageUrl(image?: SanityImageValue) {
  return image?.url || image?.asset?.url || "";
}

function Heading({ children, className }: { children?: string; className?: string }) {
  if (!children) return null;
  const lines = children.split("\n");
  return <h2 className={className}>{lines.map((line, index) => <span key={`${line}-${index}`}>{line}{index < lines.length - 1 ? <br /> : null}</span>)}</h2>;
}

function RichParagraph({ children }: { children: string }) {
  const parts = children.split(/(\*\*[^*]+\*\*)/g);
  return <p>{parts.map((part, index) => part.startsWith("**") && part.endsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : part)}</p>;
}

function CaseImage({ image, alt, priority = false, parallax = false }: { image?: SanityImageValue; alt: string; priority?: boolean; parallax?: boolean }) {
  const src = imageUrl(image);
  if (!src) return null;
  return <Image alt={image?.alt || alt} data-motion-parallax={parallax ? "24" : undefined} height={940} priority={priority} src={src} unoptimized width={1672} />;
}

export function AmorensCaseStudy({ caseStudy }: { caseStudy: CaseStudyItem }) {
  const gallery = (caseStudy.supportingImages || caseStudy.gallery || []).filter((image) => imageUrl(image));
  const overviewParagraphs = (caseStudy.overviewDescription || "").split(/\n\s*\n/).filter(Boolean);
  const websiteLabel = caseStudy.websiteUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const resultCopy = caseStudy.resultHeading;

  return <main className={styles.page}>
    <header className={styles.caseHero} data-motion-reveal>
      <p className={styles.meta}>{[caseStudy.industry, "Case Study", caseStudy.year].filter(Boolean).join(" · ")}</p>
      <h1>{caseStudy.title}</h1>
      <div className={styles.heroBottom}>
        <div className={styles.projectInfo} aria-label="Project information">
          {caseStudy.client ? <div><span>Client</span><b>{caseStudy.client}</b></div> : null}
          {caseStudy.industry ? <div><span>Category</span><b>{caseStudy.industry}</b></div> : null}
          {caseStudy.deliverables?.length ? <div><span>Deliverables</span><b>{caseStudy.deliverables.join(" · ")}</b></div> : null}
          {caseStudy.year ? <div><span>Year</span><b>{caseStudy.year}</b></div> : null}
          {caseStudy.websiteUrl ? <div><span>Website</span><b><a href={caseStudy.websiteUrl} rel="noopener noreferrer" target="_blank">{websiteLabel} ↗</a></b></div> : null}
        </div>
        {caseStudy.statement ? <p>{caseStudy.statement}</p> : null}
      </div>
    </header>

    {imageUrl(caseStudy.featuredImage) ? <section className={styles.heroImage} data-motion-media data-motion-reveal><CaseImage alt={`${caseStudy.title} website hero`} image={caseStudy.featuredImage} parallax priority /></section> : null}

    {caseStudy.overviewHeading || overviewParagraphs.length ? <section className={styles.story} data-motion-reveal><div className={styles.storyGrid}>
      <div><p className={styles.meta}>{caseStudy.overviewLabel}</p><Heading>{caseStudy.overviewHeading}</Heading></div>
      <div className={styles.storyCopy}>{overviewParagraphs.map((paragraph, index) => <RichParagraph key={index}>{paragraph}</RichParagraph>)}</div>
    </div></section> : null}

    {caseStudy.projectType === "redesign" && (caseStudy.redesignContext || imageUrl(caseStudy.previousWebsiteImage) || imageUrl(caseStudy.redesignedWebsiteImage) || caseStudy.keyImprovements?.length) ? <section className={styles.redesign} data-motion-reveal>
      {caseStudy.redesignContext ? <p className={styles.redesignContext}>{caseStudy.redesignContext}</p> : null}
      <div className={styles.redesignMedia}><CaseImage alt={`${caseStudy.title} previous website`} image={caseStudy.previousWebsiteImage} /><CaseImage alt={`${caseStudy.title} redesigned website`} image={caseStudy.redesignedWebsiteImage} /></div>
      {caseStudy.keyImprovements?.length ? <div className={styles.points}>{caseStudy.keyImprovements.map((item, index) => <article className={styles.point} key={`${item.title}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div> : null}
    </section> : null}

    {caseStudy.challengeHeading || caseStudy.challenge || caseStudy.challengeItems?.length ? <section className={styles.challenge} data-motion-reveal>
      <div className={styles.challengeHead}><div><p className={styles.meta}>{caseStudy.challengeLabel}</p><Heading className={styles.sectionTitle}>{caseStudy.challengeHeading}</Heading></div>{caseStudy.challenge ? <p>{caseStudy.challenge}</p> : null}</div>
      {caseStudy.challengeItems?.length ? <div className={styles.points} data-motion-stagger>{caseStudy.challengeItems.map((item, index) => <article className={styles.point} data-motion-item data-motion-reveal key={`${item.title}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div> : null}
    </section> : null}

    {imageUrl(caseStudy.supportingImage) ? <section className={styles.fullMedia} data-motion-media data-motion-reveal><CaseImage alt={`${caseStudy.title} supporting experience`} image={caseStudy.supportingImage} parallax /></section> : null}

    {caseStudy.approachHeading || caseStudy.approachSteps?.length ? <section className={styles.approach} data-motion-reveal><div className={styles.approachGrid}>
      <div><p className={styles.meta}>{caseStudy.approachLabel}</p><Heading className={styles.sectionTitle}>{caseStudy.approachHeading}</Heading></div>
      {caseStudy.approachSteps?.length ? <div className={styles.steps} data-motion-stagger>{caseStudy.approachSteps.map((item, index) => <div data-motion-item data-motion-reveal key={`${item.title}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><b>{item.title}</b><p>{item.description}</p></div>)}</div> : null}
    </div></section> : null}

    {caseStudy.experienceHeading || caseStudy.experienceDescription || gallery.length ? <section className={styles.gallery} data-motion-reveal>
      <div className={styles.galleryHead}><div><p className={styles.meta}>{caseStudy.experienceLabel}</p><Heading className={styles.sectionTitle}>{caseStudy.experienceHeading}</Heading></div>{caseStudy.experienceDescription ? <p>{caseStudy.experienceDescription}</p> : null}</div>
      {gallery.length ? <div className={styles.galleryGrid}><CaseImage alt={`${caseStudy.title} experience 1`} image={gallery[0]} /><div className={styles.galleryRight}>{gallery.slice(1).map((image, index) => <CaseImage alt={`${caseStudy.title} experience ${index + 2}`} image={image} key={image.asset?._ref || image.url || index} />)}</div></div> : null}
    </section> : null}

    {resultCopy || caseStudy.result || imageUrl(caseStudy.finalImage) ? <section className={styles.result} data-motion-reveal><div className={styles.resultGrid}>
      <div><p className={styles.meta}>{caseStudy.resultLabel}</p>{resultCopy ? <p className={styles.resultCopy}>{resultCopy}</p> : null}</div>
      <div>{caseStudy.result ? <><p className={styles.meta}>Result</p><p className={styles.resultSmall}>{caseStudy.result}</p></> : null}<CaseImage alt={`${caseStudy.title} final experience`} image={caseStudy.finalImage} /></div>
    </div></section> : null}

    {caseStudy.nextProject?.title && caseStudy.nextProject.slug ? <section className={styles.nextProject} data-motion-reveal><p className={styles.meta}>Next Project</p><Heading>{caseStudy.nextProject.title}</Heading><Link href={`/work/${caseStudy.nextProject.slug}`}>Next Case Study →</Link></section> : null}
  </main>;
}
