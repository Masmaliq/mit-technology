"use client";

import { useState } from "react";
import type { ObjectInputProps, ObjectMember } from "sanity";
import { StudioBackLink } from "./StudioEditorPrimitives";
import system from "./StudioEditorSystem.module.css";
import styles from "./WorkEditor.module.css";

type SectionDefinition = {
  number: string;
  title: string;
  description: string;
  note: string;
  fields: string[];
  label: string;
};

const sections: SectionDefinition[] = [
  {
    number: "01",
    title: "Work Hero",
    description: "Konten dan media pembuka halaman Work.",
    note: "Studio mengganti content dan media. Layout, typography, overlay, motion, positioning, dan behaviour tetap dikunci frontend.",
    fields: ["workHeroMediaType", "workHeroImage", "workHeroVideo", "pageEyebrow", "pageTitle", "pageDescription"],
    label: "Content / Media",
  },
  {
    number: "02",
    title: "Featured Work",
    description: "Project pilihan untuk rotasi Featured Work dan interaksi cursor.",
    note: "Project adalah sumber canonical. Featured Hero Image dan Cursor Supporting Images hanya dipakai oleh Featured Work.",
    fields: ["projectsIntro", "selectedProjects"],
    label: "Featured projects",
  },
  {
    number: "03",
    title: "All Work",
    description: "Daftar project yang ditampilkan pada archive All Work.",
    note: "Judul, kategori, tahun, dan Case Study tetap berasal dari canonical Project. Urutan archive dikelola di sini.",
    fields: ["moreWorkIntro", "moreWorkItems"],
    label: "Archive projects",
  },
  {
    number: "04",
    title: "Project Card",
    description: "Media card khusus untuk archive All Work.",
    note: "All Work Image tidak digunakan sebagai Featured Hero, cursor preview, atau media Case Study.",
    fields: ["projectCards"],
    label: "Archive media",
  },
  {
    number: "05",
    title: "Process",
    description: "Editorial heading untuk process yang menggunakan canonical Process steps.",
    note: "Copy section dikelola di Work. Isi setiap step tetap berasal dari canonical Process.",
    fields: ["processEyebrow", "processHeading"],
    label: "Content",
  },
];

function nativeMembers(props: ObjectInputProps, names: string[]): ObjectMember[] {
  return props.members.filter((member) => member.kind === "field" && names.includes(member.name));
}

function NativeFields({ members, props }: { members: ObjectMember[]; props: ObjectInputProps }) {
  return <div className={styles.nativeFields}>{props.renderDefault({ ...props, groups: [], members })}</div>;
}

export function WorkEditor(props: ObjectInputProps) {
  const [activeNumber, setActiveNumber] = useState<string | null>(null);
  const activeSection = sections.find((section) => section.number === activeNumber) ?? null;

  return (
    <div className={`${styles.editor} ${system.system}`} data-mit-work-editor="true">
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>{activeSection ? `Work / ${activeSection.title}` : "Emitech Studio / Work"}</p>
          <h1>{activeSection ? activeSection.title : "Work Editor"}</h1>
          <p className={styles.lead}>{activeSection ? activeSection.description : "Kelola Hero, Featured Work, archive, dan media card dari satu editorial workspace."}</p>
        </div>
        <span className={styles.status}>{activeSection ? "Design locked" : "5 sections"}</span>
      </header>

      {activeSection ? (
        <main className={styles.workspace}>
          <StudioBackLink onClick={() => setActiveNumber(null)}>Back to Work</StudioBackLink>
          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <p>{activeSection.number} · {activeSection.title}</p>
              <span>{activeSection.note}</span>
            </div>
            <div className={styles.fields}>
              <span className={styles.groupLabel}>{activeSection.label}</span>
              <NativeFields members={nativeMembers(props, activeSection.fields)} props={props} />
            </div>
          </section>
        </main>
      ) : (
        <><div className={system.pageBack}><StudioBackLink href="/studio/dashboard/pages">Back to Pages</StudioBackLink></div><div className={styles.overview}>
          <nav aria-label="Work editor sections" className={styles.index}>
            {sections.map((section) => (
              <button className={styles.row} key={section.number} onClick={() => setActiveNumber(section.number)} type="button">
                <span>{section.number}</span>
                <span><strong>{section.title}</strong><small>{section.description}</small></span>
                <em>→</em>
              </button>
            ))}
          </nav>
          <aside className={styles.aside}>
            <p className={styles.groupLabel}>Image map</p>
            <dl>
              <div><dt>Featured Hero Image</dt><dd>Gambar besar Featured Work.</dd></div>
              <div><dt>Cursor Supporting Images</dt><dd>Efek cursor, maksimal tiga gambar.</dd></div>
              <div><dt>All Work Image</dt><dd>Thumbnail card pada archive.</dd></div>
              <div><dt>Case Study Images</dt><dd>Dikelola pada canonical Project.</dd></div>
            </dl>
          </aside>
        </div></>
      )}
    </div>
  );
}
