"use client";

import { useState } from "react";
import type { ObjectInputProps, ObjectMember } from "sanity";
import { StudioBackLink } from "./StudioEditorPrimitives";
import system from "./StudioEditorSystem.module.css";
import styles from "./PricingEditor.module.css";

type Section = { number: string; title: string; description: string; badge: "Design locked" | "Editable" | "Master data"; fields: string[]; group: string; note: string; label: string };

const sections: Section[] = [
  { number: "01", title: "Hero", description: "Pembukaan halaman Pricing, media, dan starting price.", badge: "Design locked", fields: ["pricingHeroMediaType", "pricingHeroImage", "pricingHeroVideo", "pageEyebrow", "pageTitle", "pageDescription", "startingPriceLabel", "startingPriceDisplay"], group: "hero", note: "CMS mengatur content dan media. Typography, layout, overlay, positioning, motion, autoplay, loop, dan muted dikunci frontend. Tidak menggunakan Poster Image.", label: "Content / Media" },
  { number: "02", title: "Website Packages", description: "Master standard pricing berdasarkan jumlah halaman.", badge: "Master data", fields: ["websitePricingIntro", "websitePricing", "websitePricingBenefits", "websitePricingNote"], group: "websitePricing", note: "Harga canonical berasal dari Content → Pricing. Homepage membaca package yang sama dan tidak menyimpan harga kedua.", label: "Standard pricing" },
  { number: "03", title: "Custom Digital Experience", description: "Tier Custom, Advanced, dan Signature.", badge: "Master data", fields: ["premiumPricingIntro", "premiumPricing"], group: "premium", note: "Gunakan canonical Pricing references untuk menjaga title, harga, deskripsi, dan urutan tetap konsisten.", label: "Premium pricing" },
  { number: "04", title: "Essential Website", description: "Penawaran WordPress yang lebih efisien dan ringan.", badge: "Master data", fields: ["wordpressIntro", "wordpressPricing", "wordpressCta"], group: "wordpress", note: "WordPress offer tetap menggunakan canonical Pricing dan CTA terpisah yang aman.", label: "WordPress offer" },
  { number: "05", title: "Project Foundation", description: "Fondasi yang didapat pada project website.", badge: "Editable", fields: ["projectFoundationIntro", "projectFoundationItems"], group: "foundation", note: "Tambah, edit, dan urutkan item dengan array native Sanity. Presentation tetap dikunci frontend.", label: "Content" },
  { number: "06", title: "Before We Build", description: "Pertanyaan penting sebelum project dimulai.", badge: "Editable", fields: ["beforeWeBuildIntro", "beforeWeBuildItems"], group: "beforeBuild", note: "Kelola title/question dan supporting text tanpa kontrol styling.", label: "Clarity items" },
  { number: "07", title: "Ownership", description: "Kepemilikan dan akses aset digital.", badge: "Editable", fields: ["ownershipIntro", "ownershipItems"], group: "ownership", note: "Domain, CMS access, repository, dan scalable stack dikelola sebagai content terurut.", label: "Ownership content" },
  { number: "08", title: "Process", description: "Process Pricing dari idea sampai launch.", badge: "Editable", fields: ["processIntro", "selectedProcess"], group: "process", note: "Process steps mereferensikan canonical Process dan dapat diurutkan melalui array native Sanity.", label: "Process" },
  { number: "09", title: "FAQ", description: "Pertanyaan dan jawaban sebelum memulai project.", badge: "Editable", fields: ["faqIntro", "faqs"], group: "faq", note: "Question, answer, ordering, add, dan remove tetap menggunakan native Sanity array behaviour.", label: "Questions / Answers" },
  { number: "10", title: "Closing CTA", description: "Ajakan terakhir sebelum Global Footer.", badge: "Design locked", fields: ["finalCta"], group: "cta", note: "Konten CTA dapat diubah; layout tetap dikunci dan Global CTA tetap tersedia sebagai fallback.", label: "Content / Action" },
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

function NativeFields({ props, members }: { props: ObjectInputProps; members: ObjectMember[] }) {
  return <div className={styles.nativeFields}>{props.renderDefault({ ...props, groups: [], members })}</div>;
}

export function PricingEditor(props: ObjectInputProps) {
  const [activeNumber, setActiveNumber] = useState<string | null>(null);
  const active = sections.find((section) => section.number === activeNumber) ?? null;

  function openSection(section: Section) {
    props.onFieldGroupSelect(section.group);
    setActiveNumber(section.number);
  }

  return (
    <div className={`${styles.editor} ${system.system}`} data-mit-pricing-editor="true">
      <header className={styles.header}>
        <div><p className={styles.eyebrow}>{active ? `Pricing / ${active.title}` : "Emitech Studio / Pages / Pricing"}</p><h1>{active ? active.title : "Pricing Editor"}</h1><p className={styles.lead}>{active ? active.description : "Sumber utama seluruh harga dan konten halaman Pricing."}</p></div>
        <span className={styles.sectionCount}>{active ? active.badge : "10 sections"}</span>
      </header>
      {active ? (
        <main className={styles.workspace}>
          <StudioBackLink onClick={() => setActiveNumber(null)}>Back to Pricing</StudioBackLink>
          <section className={styles.panel}>
            <div className={styles.panelHeader}><p>{active.number} · {active.title}</p><span>{active.note}</span></div>
            <div className={styles.fields}><span className={styles.groupLabel}>{active.label}</span><NativeFields members={membersFor(props, active.fields)} props={props} /></div>
          </section>
        </main>
      ) : (
        <><div className={system.pageBack}><StudioBackLink href="/studio/dashboard/pages">Back to Pages</StudioBackLink></div><div className={styles.summary}><strong>Pricing adalah master data.</strong><span>Homepage membaca canonical Pricing sehingga perubahan harga cukup dilakukan satu kali.</span></div><div className={styles.overview}>
          <nav className={styles.index} aria-label="Pricing editor sections">{sections.map((section) => <button className={styles.row} key={section.number} onClick={() => openSection(section)} type="button"><span>{section.number}</span><span><strong>{section.title}</strong><small>{section.description}</small></span><span className={`${styles.badge} ${section.badge === "Master data" ? styles.master : section.badge === "Design locked" ? styles.locked : styles.editable}`}>{section.badge}</span><em>→</em></button>)}</nav>
          <aside className={styles.aside}><div><p className={styles.groupLabel}>Single source of truth</p><h3>Harga diedit di sini saja.</h3><p>Homepage menggunakan Website Packages, Custom tiers, dan WordPress offer dari canonical Pricing.</p></div><div><p className={styles.groupLabel}>Pricing structure</p><dl>{sections.map((section) => <div key={section.number}><dt>{section.number} {section.title}</dt><dd>{section.description}</dd></div>)}</dl></div><div><p className={styles.groupLabel}>Design rule</p><p>Text, price, item, order, dan CTA dapat diedit. Typography, spacing, layout, warna, dan motion dikunci frontend.</p></div></aside>
        </div></>
      )}
    </div>
  );
}
