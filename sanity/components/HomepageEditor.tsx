"use client";

import { useState } from "react";
import type { ObjectInputProps, ObjectMember } from "sanity";
import { StudioBackLink } from "./StudioEditorPrimitives";
import system from "./StudioEditorSystem.module.css";
import styles from "./HomepageEditor.module.css";

type SectionDefinition = {
  badge: string;
  description: string;
  fieldsets: string[];
  number: string;
  title: string;
  tone: "editable" | "linked" | "locked";
  allowedFields?: Record<string, string[]>;
  note?: string;
  source: string;
};

const sections: SectionDefinition[] = [
  {
    number: "01",
    title: "Hero",
    description: "Media pembuka, headline utama, dan action pertama Homepage.",
    badge: "Design locked",
    tone: "locked",
    source: "Homepage",
    fieldsets: ["heroContent", "heroMedia"],
    allowedFields: {
      heroContent: ["heroEyebrow", "heroTitle", "heroDescription", "heroPrimaryCtaLabel", "heroPrimaryCtaUrl"],
      heroMedia: ["heroMediaType", "heroMainImage", "heroVideoMp4", "heroMediaAltText"],
    },
    note: "Studio hanya mengganti konten. Layout, gradient, typography, posisi media, motion, spacing, dan komposisi Hero tetap dikunci oleh frontend.",
  },
  {
    number: "02",
    title: "Technology Marquee",
    description: "Daftar teknologi berurutan yang bergerak tepat setelah Hero.",
    badge: "Editable",
    tone: "editable",
    source: "Homepage",
    fieldsets: ["technologyMarquee"],
    note: "Tambah, hapus, edit, dan urutkan item dengan array native Sanity. Kecepatan serta styling marquee tetap dikunci.",
  },
  {
    number: "03",
    title: "Services Preview",
    description: "Pengantar Homepage dan pilihan layanan dari master Content → Services.",
    badge: "Linked content",
    tone: "linked",
    source: "Content → Services",
    fieldsets: ["servicesArchitecture"],
    note: "Service tetap menjadi sumber utama. Homepage hanya memilih urutan dan presentasi layanan yang ditampilkan.",
  },
  {
    number: "04",
    title: "Selected Work",
    description: "Pengantar, urutan project pilihan, dan Featured Case pada Homepage.",
    badge: "Linked to Work",
    tone: "linked",
    source: "Content → Work",
    fieldsets: ["workArchitecture"],
    note: "Identitas project, media master, tahun, kategori, dan Case Study tetap berasal dari Content → Work.",
  },
  {
    number: "05",
    title: "Pricing Preview",
    description: "Pengantar dan pilihan paket yang ditampilkan dari master Content → Pricing.",
    badge: "Linked to Pricing",
    tone: "linked",
    source: "Content → Pricing",
    fieldsets: ["pricingArchitecture"],
    note: "Harga tidak disimpan ulang di Homepage. Perubahan nilai paket dilakukan satu kali pada Pricing.",
  },
  {
    number: "06",
    title: "Process",
    description: "Pengantar dan urutan tahap kerja yang tampil pada Homepage.",
    badge: "Editable",
    tone: "editable",
    source: "Homepage + Process",
    fieldsets: ["processArchitecture"],
    note: "Urutkan process steps dengan array native Sanity. Konten master tiap langkah tetap dapat digunakan kembali.",
  },
  {
    number: "07",
    title: "Insights",
    description: "Pengantar dan artikel pilihan dari library Content.",
    badge: "Linked content",
    tone: "linked",
    source: "Content → Insights",
    fieldsets: ["insightsArchitecture"],
    note: "Homepage memilih artikel yang tampil; judul, kategori, excerpt, dan media tetap berasal dari master Insight.",
  },
  {
    number: "08",
    title: "Closing CTA",
    description: "Ajakan terakhir sebelum Global Footer.",
    badge: "Layout locked",
    tone: "locked",
    source: "Homepage + Global CTA",
    fieldsets: ["finalCtaArchitecture"],
    note: "Page-level CTA tetap menjadi override yang disengaja. Global CTA tetap tersedia sebagai sumber bersama.",
  },
];

function fieldsetMembers(props: ObjectInputProps, section: SectionDefinition, fieldsetName: string): ObjectMember[] {
  return props.members.flatMap((member) => {
    if (member.kind !== "fieldSet" || member.fieldSet.name !== fieldsetName) return [];

    const allowed = section.allowedFields?.[member.fieldSet.name];
    return member.fieldSet.members.filter((fieldMember) => {
      if (!allowed || fieldMember.kind !== "field") return true;
      return allowed.includes(fieldMember.name);
    });
  });
}

function sectionMembers(props: ObjectInputProps, section: SectionDefinition): ObjectMember[] {
  return section.fieldsets.flatMap((fieldsetName) => fieldsetMembers(props, section, fieldsetName));
}

function NativeFields({ members, props }: { members: ObjectMember[]; props: ObjectInputProps }) {
  return <div className={styles.nativeFields}>{props.renderDefault({...props, groups: [], members})}</div>;
}

function sectionGroupLabel(sectionNumber: string) {
  if (sectionNumber === "02") return "Data";
  if (sectionNumber === "04") return "Content / Media";
  if (["03", "05", "06", "07"].includes(sectionNumber)) return "Content / Data";
  return "Content";
}

export function HomepageEditor(props: ObjectInputProps) {
  const [activeSectionNumber, setActiveSectionNumber] = useState<string | null>(null);
  const activeSection = sections.find((section) => section.number === activeSectionNumber) ?? null;

  return (
    <div className={`${styles.editor} ${system.system}`} data-mit-homepage-editor="true">
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>{activeSection ? `Homepage / ${activeSection.title}` : "Emitech Studio / Homepage"}</p>
          <h1>{activeSection ? activeSection.title : "Homepage Editor"}</h1>
          <p className={styles.lead}>{activeSection ? activeSection.description : "Kelola konten Homepage dari Hero hingga Closing CTA. Urutan dan desain frontend tetap terkunci."}</p>
        </div>
        {activeSection ? (
          <span className={`${styles.badge} ${styles[activeSection.tone]}`}>{activeSection.badge}</span>
        ) : (
          <span className={styles.sectionCount}>8 sections</span>
        )}
      </header>

      {activeSection ? (
        <SectionEditor activeSection={activeSection} onBack={() => setActiveSectionNumber(null)} props={props} />
      ) : (
        <HomepageIndex onEdit={setActiveSectionNumber} />
      )}
    </div>
  );
}

function HomepageIndex({ onEdit }: { onEdit: (sectionNumber: string) => void }) {
  return (
    <>
      <div className={styles.summary}>
        <strong>Homepage FINAL terpetakan.</strong>
        <span>Konten boleh berubah. Desain tidak.</span>
      </div>

      <div className={styles.overviewLayout}>
        <nav aria-label="Homepage sections" className={styles.sectionIndex}>
          {sections.map((section) => (
            <button className={styles.indexRow} key={section.number} onClick={() => onEdit(section.number)} type="button">
              <span className={styles.indexNumber}>{section.number}</span>
              <span className={styles.indexCopy}><strong>{section.title}</strong><small>{section.description}</small></span>
              <span className={styles.indexMeta}><span>{section.source}</span><span className={`${styles.badge} ${styles[section.tone]}`}>{section.badge}</span></span>
              <span aria-hidden="true" className={styles.indexArrow}>→</span>
            </button>
          ))}
        </nav>

        <aside className={styles.overviewAside}>
          <div className={`${styles.asideBlock} ${styles.ruleBlock}`}>
            <p className={styles.asideLabel}>CMS rule</p>
            <h3>Konten boleh berubah. Desain tidak.</h3>
            <p>Layout, typography, motion, spacing, dan seluruh styling frontend tetap dikunci.</p>
          </div>

          <div className={styles.asideBlock}>
            <p className={styles.asideLabel}>Shared data</p>
            <dl className={styles.sharedData}>
              <div><dt>Work</dt><dd>Project + Case Study</dd></div>
              <div><dt>Service</dt><dd>Service master data</dd></div>
              <div><dt>Pricing</dt><dd>Single source of price</dd></div>
              <div><dt>Content</dt><dd>Insights / articles</dd></div>
              <div><dt>Global</dt><dd>Navbar + Footer + shared UI</dd></div>
            </dl>
          </div>
        </aside>
      </div>
    </>
  );
}

function SectionEditor({ activeSection, onBack, props }: { activeSection: SectionDefinition; onBack: () => void; props: ObjectInputProps }) {
  const isHero = activeSection.number === "01";

  return (
    <main className={styles.sectionWorkspace}>
      <StudioBackLink onClick={onBack}>Back to Homepage</StudioBackLink>

      <section className={`${styles.editorPanel} ${styles.sectionPanel} ${isHero ? styles.heroPanel : ""}`}>
        <div className={styles.sectionIntro}>
          <p className={styles.sectionEyebrow}>{activeSection.number} · {activeSection.title}</p>
          <p>{activeSection.note}</p>
        </div>

        {isHero ? (
          <div className={styles.heroFields}>
            <div className={styles.fieldColumn}>
              <span className={styles.columnLabel}>Content</span>
              <NativeFields members={fieldsetMembers(props, activeSection, "heroContent")} props={props} />
            </div>
            <div className={styles.fieldColumn}>
              <span className={styles.columnLabel}>Media</span>
              <NativeFields members={fieldsetMembers(props, activeSection, "heroMedia")} props={props} />
            </div>
          </div>
        ) : (
          <div className={styles.sectionFields}>
            <span className={styles.columnLabel}>{sectionGroupLabel(activeSection.number)}</span>
            <NativeFields members={sectionMembers(props, activeSection)} props={props} />
          </div>
        )}
      </section>
    </main>
  );
}
