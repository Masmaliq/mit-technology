import Image from "next/image";
import type { HomepageProject, ProjectCaseStudySection, ProjectMedia, SanityImageValue } from "@/lib/sanity/queries";
import { WorkMediaViewer } from "./WorkMediaViewer";
import styles from "./WorkDetail.module.css";

function imageUrl(image?: SanityImageValue) {
  return image?.url || image?.asset?.url || "";
}

function videoUrl(media?: ProjectMedia) {
  return media?.video?.url || media?.video?.asset?.url || "";
}

function mediaImage(media?: ProjectMedia) {
  return media?.image || media?.posterImage;
}

function blockText(block: NonNullable<ProjectCaseStudySection["body"]>[number]) {
  return (block.children || []).map((child) => child.text || "").join("");
}

function RichBody({ blocks }: { blocks?: ProjectCaseStudySection["body"] }) {
  if (!blocks?.length) return null;
  return (
    <div className={styles.richText}>
      {blocks.map((block, index) => {
        const text = blockText(block);
        if (!text) return null;
        if (block.style === "h2") return <h3 key={block._key || index}>{text}</h3>;
        if (block.style === "h3") return <h4 key={block._key || index}>{text}</h4>;
        if (block.listItem) return <p className={styles.listItem} key={block._key || index}>{text}</p>;
        return <p key={block._key || index}>{text}</p>;
      })}
    </div>
  );
}

export function WorkDetail({ project }: { project: HomepageProject }) {
  const heroMedia = project.heroMedia;
  const heroImage = mediaImage(heroMedia) || mediaImage(project.coverMedia) || project.coverImage || project.desktopVisual;
  const heroImageUrl = imageUrl(heroImage);
  const heroVideoUrl = videoUrl(heroMedia);
  const sections = project.caseStudyContent || [];
  const articleImages = sections.flatMap((section) => {
    const image = mediaImage(section.media);
    return image && imageUrl(image) ? [{ image, caption: section.caption }] : [];
  });
  const galleryImages = (project.gallery || [])
    .filter((image) => Boolean(imageUrl(image)))
    .map((image) => ({ image, caption: image.caption }));
  const viewerItems = [...articleImages, ...galleryImages];
  let mediaIndex = 0;

  const meta = [
    ["Client", project.client],
    ["Service", project.category],
    ["Year", project.year ? String(project.year) : undefined],
    ["Technology", project.technologies?.join(" · ")],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{project.heroEyebrow || project.category || "Case Study"}</p>
          <h1>{project.heroTitle || project.title}</h1>
          {project.heroIntroduction || project.shortDescription ? <p className={styles.intro}>{project.heroIntroduction || project.shortDescription}</p> : null}
        </div>
        {heroVideoUrl || heroImageUrl ? (
          <div className={styles.heroVisual}>
            {heroVideoUrl ? (
              <video autoPlay controls={false} loop muted playsInline poster={heroImageUrl || undefined}><source src={heroVideoUrl} type="video/mp4" /></video>
            ) : (
              <Image alt={project.heroAlt || heroImage?.alt || project.title || "Project media"} fill priority sizes="100vw" src={heroImageUrl} unoptimized />
            )}
          </div>
        ) : null}
      </header>

      {meta.length || project.projectUrl ? (
        <section className={styles.metaGrid} aria-label="Project information">
          {meta.map(([label, value]) => <div key={label}><span>{label}</span><p>{value}</p></div>)}
          {project.projectUrl ? <div><span>Website</span><a href={project.projectUrl} rel="noreferrer" target="_blank">Visit live site ↗</a></div> : null}
        </section>
      ) : null}

      {sections.length ? (
        <article className={styles.article}>
          {sections.map((section, sectionIndex) => {
            const sectionImage = mediaImage(section.media);
            const sectionVideo = videoUrl(section.media);
            const hasImage = Boolean(imageUrl(sectionImage));
            const currentMediaIndex = hasImage ? mediaIndex++ : -1;
            return (
              <section className={styles.articleSection} key={section._key || sectionIndex}>
                <div className={styles.articleCopy}>
                  {section.eyebrow ? <p className={styles.eyebrow}>{section.eyebrow}</p> : null}
                  {section.heading ? <h2>{section.heading}</h2> : null}
                  <RichBody blocks={section.body} />
                </div>
                {sectionVideo ? (
                  <figure className={section.layout === "full" ? styles.mediaFull : styles.mediaWide}>
                    <video controls playsInline poster={imageUrl(sectionImage) || undefined}><source src={sectionVideo} type="video/mp4" /></video>
                    {section.caption ? <figcaption>{section.caption}</figcaption> : null}
                  </figure>
                ) : hasImage ? (
                  <figure className={section.layout === "full" ? styles.mediaFull : styles.mediaWide}>
                    <WorkMediaViewer alt={section.heading || project.title || "Project media"} index={currentMediaIndex} items={viewerItems} />
                    {section.caption ? <figcaption>{section.caption}</figcaption> : null}
                  </figure>
                ) : null}
              </section>
            );
          })}
        </article>
      ) : project.fullDescription ? (
        <section className={styles.legacyDescription}><p>{project.fullDescription}</p></section>
      ) : null}

      {galleryImages.length ? (
        <section className={styles.gallery} aria-label="Additional project media">
          {galleryImages.map((item, index) => (
            <figure key={`${imageUrl(item.image)}-${index}`}>
              <WorkMediaViewer alt={item.image.alt || project.title || "Project media"} index={articleImages.length + index} items={viewerItems} />
              {item.caption ? <figcaption>{item.caption}</figcaption> : null}
            </figure>
          ))}
        </section>
      ) : null}
    </main>
  );
}
