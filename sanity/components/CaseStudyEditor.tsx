"use client";

import { useState } from "react";
import type { ObjectInputProps, ObjectMember } from "sanity";
import { urlFor } from "../lib/image";
import { StudioBackLink } from "./StudioEditorPrimitives";
import system from "./StudioEditorSystem.module.css";
import styles from "./CaseStudyEditor.module.css";

type ImageValue = { _key?: string; alt?: string; caption?: string; asset?: { _ref?: string } };
type CaseStudyValue = {
  projectType?: string;
  title?: string;
  featuredImage?: ImageValue;
  previousWebsiteImage?: ImageValue;
  redesignedWebsiteImage?: ImageValue;
  supportingImage?: ImageValue;
  finalImage?: ImageValue;
  gallery?: ImageValue[];
  cursorSupportingImages?: ImageValue[];
};
type Section = { number: string; title: string; description: string; badge?: string; fields: string[]; note: string };

const baseSections: Section[] = [
  { number: "00", title: "Project Intro", description: "Case Study identity and project type.", badge: "Required", fields: ["title", "slug", "projectType"], note: "Project Type controls whether the Website Redesign module appears. Changing the mode never deletes existing data." },
  { number: "01", title: "Metadata", description: "Compact project information shown beneath the Case Study title.", badge: "Required", fields: ["client", "industry", "deliverables", "year", "websiteUrl"], note: "Keep metadata concise and factual. Category continues to use the existing industry field for compatibility." },
  { number: "02", title: "Statement", description: "The short statement directly below metadata.", badge: "Required", fields: ["statement"], note: "Use one focused sentence that frames the project before the visual story begins." },
  { number: "03", title: "Hero", description: "Main Case Study visual.", badge: "Image", fields: ["featuredImage"], note: "The frontend owns typography, spacing, position, and visual treatment. Upload only the canonical Hero image." },
  { number: "04", title: "Overview", description: "Opening editorial story.", fields: ["overviewLabel", "overviewHeading", "overviewDescription"], note: "Introduce the project context before the detailed challenge and approach." },
  { number: "05", title: "Website Redesign", description: "Conditional content for redesign projects only.", badge: "Conditional", fields: ["redesignContext", "previousWebsiteImage", "redesignedWebsiteImage", "keyImprovements"], note: "Visible only when Project Type is Redesign. Hidden data remains intact when the type changes." },
  { number: "06", title: "Challenge", description: "Problem statement, numbered challenges, and full-width supporting media.", fields: ["challengeLabel", "challengeHeading", "challenge", "challengeItems", "supportingImage"], note: "Challenge Items remain reorderable. Challenge Full Width Media appears between Challenge and Approach." },
  { number: "07", title: "Approach", description: "Method and implementation steps.", fields: ["approachLabel", "approachHeading", "approachSteps"], note: "Steps are an ordered native array and can be added, removed, edited, or reordered." },
  { number: "08", title: "Experience", description: "Supporting screens used inside the Case Study.", badge: "Gallery", fields: ["experienceLabel", "experienceHeading", "experienceDescription", "gallery"], note: "This gallery belongs to the Case Study story and remains separate from cursor preview assets." },
  { number: "09", title: "Final Experience / Result", description: "Closing Case Study content.", fields: ["resultLabel", "resultHeading", "result", "finalImage"], note: "Close with the final experience, outcome, and canonical final visual." },
  { number: "10", title: "Next Project", description: "Controls the next Case Study shown at the bottom of this page.", fields: ["nextProject"], note: "Select another Case Study reference instead of entering a URL manually." },
  { number: "11", title: "Work Cursor Supporting Images", description: "Supporting images used only by the Work page cursor interaction.", badge: "Work Page", fields: ["cursorSupportingImages"], note: "These assets never appear inside Case Study Experience. No upload means no cursor preview." },
  { number: "12", title: "Publishing", description: "Editorial visibility, order, and search metadata.", badge: "Native Sanity", fields: ["featured", "order", "seoTitle", "seoDescription"], note: "Draft, validation, publish, unpublish, and document state remain controlled by native Sanity actions." },
];

function membersFor(props: ObjectInputProps, names: string[]): ObjectMember[] { return props.members.filter((member) => member.kind === "field" && names.includes(member.name)); }
function NativeFields({ props, members }: { props: ObjectInputProps; members: ObjectMember[] }) { return <div className={styles.nativeFields}>{props.renderDefault({ ...props, groups: [], members })}</div>; }

const mediaLabels: Record<string, string> = {
  featuredImage: "Hero Image",
  previousWebsiteImage: "Previous Website",
  redesignedWebsiteImage: "Redesigned Website",
  supportingImage: "Challenge Full Width Media",
  finalImage: "Final Experience Image",
  gallery: "Supporting Images",
  cursorSupportingImages: "Featured Work Cursor Images",
};

function thumbnailUrl(image?: ImageValue) {
  if (!image?.asset?._ref) return "";
  try { return urlFor(image).width(520).height(320).fit("crop").auto("format").url(); } catch { return ""; }
}

function MediaOverview({ fields, value }: { fields: string[]; value: CaseStudyValue }) {
  const entries = fields.flatMap((field) => {
    // Gallery arrays use Sanity's native grid so upload, reorder, edit, and remove
    // remain one coherent interface instead of being previewed twice.
    if (field === "gallery") return [];
    if (!(field in mediaLabels)) return [];
    const raw = value[field as keyof CaseStudyValue];
    const images = Array.isArray(raw) ? raw : raw ? [raw as ImageValue] : [];
    return [{ field, images }];
  });
  if (!entries.length) return null;

  return <div className={styles.mediaOverview}>
    {entries.map(({ field, images }) => <section className={styles.mediaGroup} key={field}>
      <div className={styles.mediaGroupHeader}><strong>{mediaLabels[field]}</strong><span>{images.length ? `${images.length} asset${images.length === 1 ? "" : "s"}` : "No media yet"}</span></div>
      {images.length ? <div className={styles.mediaGrid}>{images.map((image, index) => {
        const src = thumbnailUrl(image);
        return <figure className={styles.mediaItem} key={image._key || image.asset?._ref || index}>
          {src ? <img alt={image.alt || `${mediaLabels[field]} ${index + 1}`} src={src} /> : <div className={styles.mediaPlaceholder}>Preview unavailable</div>}
          <figcaption><strong>{image.caption || image.alt || `Image ${index + 1}`}</strong><span>{field === "gallery" || field === "cursorSupportingImages" ? "Drag below to reorder" : "Replace, crop, or remove below"}</span></figcaption>
        </figure>;
      })}</div> : <div className={styles.emptyMedia}><strong>Ready for media</strong><span>Use the native Upload or Select control below.</span></div>}
    </section>)}
  </div>;
}

export function CaseStudyEditor(props: ObjectInputProps) {
  const value = (props.value ?? {}) as CaseStudyValue;
  const sections = baseSections.filter((section) => section.number !== "05" || value.projectType === "redesign");
  const [activeNumber, setActiveNumber] = useState<string | null>(null);
  const active = sections.find((section) => section.number === activeNumber) ?? null;

  return <div className={`${styles.editor} ${system.system}`} data-mit-case-study-editor="true">
    <header className={styles.header}><div><p className={styles.eyebrow}>{active ? `Case Studies / ${active.title}` : "Emitech Studio / Pages / Case Studies"}</p><h1>{active ? active.title : value.title || "Case Study Editor"}</h1><p className={styles.lead}>{active ? active.description : "Kelola cerita project, media, result, cursor assets, dan hubungan antar Case Study."}</p></div><span className={styles.sectionCount}>{active ? active.badge || "Editable" : `${sections.length} sections`}</span></header>
    <div className={styles.navigation}><StudioBackLink href="/studio/case-studies-editor">Back to Case Studies</StudioBackLink><a href="/studio/dashboard/pages">Back to Pages</a></div>
    {active ? <main className={styles.workspace}><button className={styles.backButton} onClick={() => setActiveNumber(null)} type="button">← All sections</button><section className={styles.panel}><div className={styles.panelHeader}><p>{active.number} · {active.title}</p><span>{active.note}</span></div><div className={`${styles.fields} ${active.title === "Experience" ? styles.experienceFields : ""}`}><span className={styles.groupLabel}>Editorial fields</span><MediaOverview fields={active.fields} value={value} />{active.title === "Experience" ? <div className={styles.galleryStatus}><strong>Supporting Images</strong><span>{value.gallery?.length || 0} assets · Drag to reorder</span></div> : null}<NativeFields members={membersFor(props, active.fields)} props={props} /></div></section></main> : <><div className={styles.summary}><strong>Case Study is a collection document.</strong><span>Frontend design remains locked. Studio controls content, media, order, and references.</span></div><div className={styles.overview}><nav className={styles.index} aria-label="Case Study editor sections">{sections.map((section) => <button className={styles.row} key={section.number} onClick={() => setActiveNumber(section.number)} type="button"><span>{section.number}</span><span><strong>{section.title}</strong><small>{section.description}</small></span><span className={styles.badge}>{section.badge || "Editable"}</span><em>→</em></button>)}</nav><aside className={styles.aside}><div><p className={styles.groupLabel}>Source of truth</p><h3>Existing Case Study document</h3><p>This editor is attached to the canonical <code>caseStudy</code> collection. Existing IDs, slugs, legacy fields, references, and published documents remain intact.</p></div><div><p className={styles.groupLabel}>Project type</p><h3>{value.projectType === "redesign" ? "Redesign" : "New Website"}</h3><p>{value.projectType === "redesign" ? "Website Redesign is available in the editorial workflow." : "Website Redesign is hidden. Existing redesign data is not removed."}</p></div><div><p className={styles.groupLabel}>Publishing</p><p>Use Sanity&apos;s native document actions for drafts, validation, publishing, unpublishing, and history.</p></div></aside></div></>}
  </div>;
}
