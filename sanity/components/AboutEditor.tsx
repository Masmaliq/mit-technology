"use client";

import { useState } from "react";
import type { ObjectInputProps, ObjectMember } from "sanity";
import { StudioBackLink } from "./StudioEditorPrimitives";
import system from "./StudioEditorSystem.module.css";
import styles from "./AboutEditor.module.css";

type Section = { number: string; title: string; description: string; badge: "Design locked" | "Editable" | "Linked to Service" | "Linked to Work"; fields: string[]; group: string; note: string; label: string };
const sections: Section[] = [
  { number: "01", title: "Hero About", description: "Hero utama About dengan media Image atau Video.", badge: "Design locked", fields: ["aboutHeroMediaType", "aboutHeroImage", "aboutHeroVideo", "heroEyebrow", "heroTitle", "heroDescription"], group: "hero", note: "CMS mengatur content dan media Image atau Video. Autoplay, loop, muted, overlay, typography, positioning, spacing, dan tinggi Hero dikunci frontend. Tidak menggunakan Poster Image.", label: "Content / Media" },
  { number: "02", title: "Who We Are", description: "Cerita singkat Emitech dan capability utama.", badge: "Editable", fields: ["whoWeAreIntro", "whoWeAreBody", "capabilityCards"], group: "whoWeAre", note: "Gunakan Portable Text dan array native Sanity untuk menjaga paragraph serta capability tetap mudah disusun ulang.", label: "Story / Capabilities" },
  { number: "03", title: "Expertise", description: "Expertise yang dipilih dari canonical Service Master.", badge: "Linked to Service", fields: ["expertiseIntro", "expertiseServices"], group: "expertise", note: "About hanya memilih dan mengurutkan canonical Service. Display Title dan Display Description tetap tersedia sebagai page-specific override.", label: "Service references" },
  { number: "04", title: "Values", description: "Nilai utama Emitech.", badge: "Editable", fields: ["valuesIntro", "values"], group: "values", note: "Values dapat ditambah, diedit, dan diurutkan melalui array native Sanity. Presentation dan layout dikunci frontend.", label: "Values" },
  { number: "05", title: "Clients & Partners", description: "Client dan project yang ditampilkan sebagai selected relationships.", badge: "Linked to Work", fields: ["clientsIntro", "selectedClients", "selectedProjects"], group: "clients", note: "Clients & Partners menggunakan canonical Client references. Existing Selected Work Projects tetap terlihat sebagai compatibility fallback yang saat ini dibaca frontend, tanpa menduplikasi data.", label: "Client / Project references" },
  { number: "06", title: "Closing CTA", description: "Ajakan terakhir sebelum Global Footer.", badge: "Design locked", fields: ["finalCta"], group: "cta", note: "Isi page-specific override hanya bila About membutuhkan copy khusus. Jika override kosong, frontend otomatis menggunakan Global CTA.", label: "Content / Action" },
];

function membersFor(props: ObjectInputProps, names: string[]): ObjectMember[] {
  return props.members.flatMap((member) => {
    if (member.kind === "field" && names.includes(member.name)) return [member];
    if (member.kind !== "fieldSet") return [];
    return member.fieldSet.members.filter(
      (field) => field.kind === "field" && names.includes(field.name),
    );
  });
}
function NativeFields({ props, members }: { props: ObjectInputProps; members: ObjectMember[] }) { return <div className={styles.nativeFields}>{props.renderDefault({ ...props, groups: [], members })}</div>; }

export function AboutEditor(props: ObjectInputProps) {
  const [activeNumber, setActiveNumber] = useState<string | null>(null);
  const active = sections.find((section) => section.number === activeNumber) ?? null;

  function openSection(section: Section) {
    props.onFieldGroupSelect(section.group);
    setActiveNumber(section.number);
  }

  return <div className={`${styles.editor} ${system.system}`} data-mit-about-editor="true">
    <header className={styles.header}><div><p className={styles.eyebrow}>{active ? `About / ${active.title}` : "Emitech Studio / Pages / About"}</p><h1>{active ? active.title : "About Editor"}</h1><p className={styles.lead}>{active ? active.description : "Kelola cerita, expertise, values, relationships dan Hero About."}</p></div><span className={styles.sectionCount}>{active ? active.badge : "6 sections"}</span></header>
    {active ? <main className={styles.workspace}><StudioBackLink onClick={() => setActiveNumber(null)}>Back to About</StudioBackLink><section className={styles.panel}><div className={styles.panelHeader}><p>{active.number} · {active.title}</p><span>{active.note}</span></div><div className={styles.fields}><span className={styles.groupLabel}>{active.label}</span><NativeFields members={membersFor(props, active.fields)} props={props} /></div></section></main> : <><div className={system.pageBack}><StudioBackLink href="/studio/dashboard/pages">Back to Pages</StudioBackLink></div><div className={styles.summary}><strong>About mengikuti struktur frontend yang sudah ada.</strong><span>Konten dan media dapat diperbarui; komposisi visual tetap dikunci.</span></div><div className={styles.overview}><nav className={styles.index} aria-label="About editor sections">{sections.map((section) => <button className={styles.row} key={section.number} onClick={() => openSection(section)} type="button"><span>{section.number}</span><span><strong>{section.title}</strong><small>{section.description}</small></span><span className={`${styles.badge} ${section.badge === "Design locked" ? styles.locked : section.badge === "Editable" ? styles.editable : styles.linked}`}>{section.badge}</span><em>→</em></button>)}</nav><aside className={styles.aside}><div><p className={styles.groupLabel}>Shared data</p><h3>About tidak menduplikasi data.</h3><p>Expertise menggunakan Service Master. Clients & Partners menggunakan canonical Client dan Work Project. Navbar dan Footer berasal dari Global.</p></div><div><p className={styles.groupLabel}>About structure</p><dl>{sections.map((section) => <div key={section.number}><dt>{section.number} {section.title}</dt><dd>{section.description}</dd></div>)}</dl></div><div><p className={styles.groupLabel}>Design rule</p><p>Text, Hero media, values, selection, order, dan CTA dapat diedit. Layout, typography, spacing, warna, dan interaction dikunci frontend.</p></div></aside></div></>}
  </div>;
}
