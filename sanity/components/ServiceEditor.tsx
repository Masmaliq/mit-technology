"use client";

import { useState } from "react";
import type { ObjectInputProps, ObjectMember } from "sanity";
import { StudioBackLink } from "./StudioEditorPrimitives";
import system from "./StudioEditorSystem.module.css";
import styles from "./ServiceEditor.module.css";

type Section = {
  number: string;
  title: string;
  description: string;
  badge: "Design locked" | "Editable" | "Master data";
  fields: string[];
  note: string;
  label: string;
};

const sections: Section[] = [
  { number: "01", title: "Hero", description: "Hero utama Services dengan media Image atau Video.", badge: "Design locked", fields: ["serviceHeroMediaType", "serviceHeroImage", "serviceHeroVideo", "heroEyebrow", "heroCount", "heroTitle", "heroDescription"], note: "Autoplay, loop, muted, layout, overlay, typography, positioning, dan motion tetap dikunci frontend. Tidak menggunakan Poster Image.", label: "Content / Media" },
  { number: "02", title: "What We Do", description: "Pengantar sebelum daftar layanan utama.", badge: "Editable", fields: ["whatWeDo"], note: "Gunakan pengantar singkat untuk menjelaskan arah layanan Emitech tanpa mengulang detail setiap service.", label: "Content" },
  { number: "03", title: "Core Services", description: "Pilihan dan urutan canonical Service yang digunakan kembali di Homepage.", badge: "Master data", fields: ["coreServicesIntro", "selectedServices"], note: "Service adalah single source of truth. Edit reference untuk memperbarui master data; Homepage cukup memilih service yang sama.", label: "Master services" },
  { number: "04", title: "Creative Production", description: "Pengantar dan showreel aktual untuk layanan visual.", badge: "Editable", fields: ["creativeProductionIntro", "creativeShowreels", "creativeProductionMedia", "creativeProductionSupportingContent"], note: "Showreel Video berbeda dari Hero Video dan hanya digunakan pada Creative Production.", label: "Content / Showreels" },
  { number: "05", title: "Built Together", description: "Capabilities yang dapat digabungkan dalam satu project.", badge: "Editable", fields: ["capabilitiesIntro", "capabilityGroups"], note: "Kelola capability content saja. Grid, visual hierarchy, dan responsive behaviour tetap dikunci frontend.", label: "Capabilities" },
  { number: "06", title: "How We Work", description: "Urutan process dari masalah sampai produk.", badge: "Editable", fields: ["processIntro", "selectedProcess"], note: "Process steps mereferensikan canonical Process dan dapat diurutkan menggunakan array native Sanity.", label: "Process" },
  { number: "07", title: "Closing CTA", description: "Ajakan terakhir sebelum Global Footer.", badge: "Design locked", fields: ["finalCta"], note: "Konten CTA dapat diubah. Layout dan presentation tetap mengikuti frontend serta Global CTA fallback.", label: "Content / Action" },
];

function membersFor(props: ObjectInputProps, names: string[]): ObjectMember[] {
  return props.members.flatMap((member) => {
    if (member.kind === "field" && names.includes(member.name)) return [member];
    if (member.kind !== "fieldSet") return [];
    return member.fieldSet.members.filter((field) => field.kind === "field" && names.includes(field.name));
  });
}

function NativeFields({ props, members }: { props: ObjectInputProps; members: ObjectMember[] }) {
  return <div className={styles.nativeFields}>{props.renderDefault({ ...props, groups: [], members })}</div>;
}

export function ServiceEditor(props: ObjectInputProps) {
  const [activeNumber, setActiveNumber] = useState<string | null>(null);
  const active = sections.find((section) => section.number === activeNumber) ?? null;

  return (
    <div className={`${styles.editor} ${system.system}`} data-mit-service-editor="true">
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>{active ? `Services / ${active.title}` : "Emitech Studio / Pages / Service"}</p>
          <h1>{active ? active.title : "Service Editor"}</h1>
          <p className={styles.lead}>{active ? active.description : "Kelola halaman Services dan master service yang digunakan kembali di Homepage."}</p>
        </div>
        <span className={styles.sectionCount}>{active ? active.badge : "7 sections"}</span>
      </header>

      {active ? (
        <main className={styles.workspace}>
          <StudioBackLink onClick={() => setActiveNumber(null)}>Back to Services</StudioBackLink>
          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <p>{active.number} · {active.title}</p>
              <span>{active.note}</span>
            </div>
            <div className={styles.fields}>
              <span className={styles.groupLabel}>{active.label}</span>
              <NativeFields members={membersFor(props, active.fields)} props={props} />
            </div>
          </section>
        </main>
      ) : (
        <><div className={system.pageBack}><StudioBackLink href="/studio/dashboard/pages">Back to Pages</StudioBackLink></div>
          <div className={styles.summary}><strong>Service adalah master data layanan Emitech.</strong><span>Homepage mereferensikan service yang sama, bukan menyimpan ulang kontennya.</span></div>
          <div className={styles.overview}>
            <nav className={styles.index} aria-label="Service editor sections">
              {sections.map((section) => (
                <button className={styles.row} key={section.number} onClick={() => setActiveNumber(section.number)} type="button">
                  <span>{section.number}</span>
                  <span><strong>{section.title}</strong><small>{section.description}</small></span>
                  <span className={`${styles.badge} ${section.badge === "Master data" ? styles.master : section.badge === "Design locked" ? styles.locked : styles.editable}`}>{section.badge}</span>
                  <em>→</em>
                </button>
              ))}
            </nav>
            <aside className={styles.aside}>
              <div><p className={styles.groupLabel}>Single source of truth</p><h3>Service disimpan satu kali.</h3><p>Homepage Services Preview memilih master Service dari editor ini.</p></div>
              <div><p className={styles.groupLabel}>Media map</p><dl><div><dt>Hero Image / Video</dt><dd>Visual pembuka halaman Services.</dd></div><div><dt>Showreel Video</dt><dd>Creative Production only.</dd></div></dl></div>
              <div><p className={styles.groupLabel}>Design rule</p><p>Text, service, tags, video, order, dan CTA dapat diedit. Layout, typography, spacing, warna, dan motion dikunci frontend.</p></div>
            </aside>
          </div>
        </>
      )}
    </div>
  );
}
