"use client";

import type { ObjectInputProps } from "sanity";
import { StudioBackLink } from "./StudioEditorPrimitives";
import styles from "./GlobalEditor.module.css";

type EditorSection = {
  title: string;
};

type SourceRelationship = {
  source: string;
  purpose: string;
};

type GlobalEditorConfig = {
  title: string;
  description: string;
  badge?: string;
  notice?: string;
  sections: EditorSection[];
  sources?: SourceRelationship[];
};

function GlobalEditor({ props, config }: { props: ObjectInputProps; config: GlobalEditorConfig }) {
  return (
    <div className={styles.editor} data-mit-global-editor="true">
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.eyebrow}>Global / {config.title}</p>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{config.title}</h1>
            <span className={styles.badge}>{config.badge || "Global setting"}</span>
          </div>
          <p className={styles.description}>{config.description}</p>
        </div>
      </header>

      <div className={styles.body}>
        <main className={styles.workspace}>
          <StudioBackLink href="/studio/dashboard/global">Back to Global</StudioBackLink>
          {config.notice ? <div className={styles.notice}>{config.notice}</div> : null}

          <div aria-label={`${config.title} sections`} className={styles.directory}>
            {config.sections.map((section, index) => (
              <div className={styles.directoryItem} key={section.title}>
                <span className={styles.sectionNumber}>{String(index + 1).padStart(2, "0")}</span>
                <strong>{section.title}</strong>
              </div>
            ))}
          </div>

          <section className={styles.form}>{props.renderDefault(props)}</section>
        </main>

        <aside className={styles.aside}>
          <span className={styles.asideLabel}>CMS rule</span>
          <h2>One information, one home.</h2>
          <p>Informasi utama dikelola dari satu tempat dan digunakan kembali oleh bagian website yang membutuhkannya.</p>

          {config.sources?.length ? (
            <>
              <hr className={styles.asideRule} />
              <span className={styles.asideLabel}>Linked data</span>
              <ul className={styles.sourceList}>
                {config.sources.map((item) => (
                  <li key={`${item.source}-${item.purpose}`}><strong>{item.source}</strong> - {item.purpose}</li>
                ))}
              </ul>
            </>
          ) : null}

          <p className={styles.legacyNote}>Compatibility fields remain stored safely but are hidden from the daily editorial workflow.</p>
        </aside>
      </div>
    </div>
  );
}

function createGlobalEditor(config: GlobalEditorConfig) {
  function ConfiguredGlobalEditor(props: ObjectInputProps) {
    return <GlobalEditor config={config} props={props} />;
  }

  ConfiguredGlobalEditor.displayName = `${config.title.replace(/\s+/g, "")}GlobalEditor`;
  return ConfiguredGlobalEditor;
}

export const NavigationGlobalEditor = createGlobalEditor({
  title: "Navigation",
  description: "Menu utama website dan action opsional yang tampil di navbar.",
  badge: "Navbar only",
  notice: "Logo dan identitas brand dikelola dari Site Identity. Navigation hanya mengatur menu dan CTA navbar.",
  sections: [{ title: "Navbar Menu" }, { title: "Navbar CTA" }],
  sources: [{ source: "Site Identity", purpose: "Brand dan logo navbar" }],
});

export const FooterGlobalEditor = createGlobalEditor({
  title: "Footer",
  description: "Atur presentasi footer, navigation, legal links, dan background tanpa menduplikasi data global.",
  badge: "Presentation",
  notice: "Kontak, social media, dan identitas brand dibaca dari master GLOBAL masing-masing.",
  sections: [{ title: "Footer Content" }, { title: "Footer Navigation" }, { title: "Display" }, { title: "Legal" }, { title: "Background" }],
  sources: [
    { source: "Contact Information", purpose: "Alamat, email, phone, WhatsApp" },
    { source: "Social Media", purpose: "Social links" },
    { source: "Site Identity", purpose: "Brand footer" },
  ],
});

export const GlobalCtaEditor = createGlobalEditor({
  title: "Global CTA",
  description: "Closing action reusable yang menjadi default untuk halaman utama website.",
  badge: "Master data",
  sections: [{ title: "Content" }, { title: "Primary Action" }],
  sources: [{ source: "Page CTA", purpose: "Dapat menjadi deliberate override" }],
});

export const ContactInformationEditor = createGlobalEditor({
  title: "Contact Information",
  description: "Sumber utama informasi perusahaan, alamat, email, phone, dan WhatsApp.",
  badge: "Master data",
  notice: "Footer, Contact, dan floating WhatsApp membaca data dari dokumen ini ketika tersedia.",
  sections: [{ title: "Company" }, { title: "Contact" }, { title: "Address" }, { title: "WhatsApp" }],
  sources: [
    { source: "Footer", purpose: "Menampilkan kontak global" },
    { source: "Contact Page", purpose: "Menggunakan data contact master" },
  ],
});

export const SocialMediaEditor = createGlobalEditor({
  title: "Social Media",
  description: "Satu tempat untuk seluruh kanal social media resmi Emitech.",
  badge: "Master data",
  sections: [{ title: "Instagram" }, { title: "TikTok" }, { title: "LinkedIn" }, { title: "YouTube" }, { title: "Facebook" }, { title: "X / Twitter" }, { title: "Additional Links" }],
  sources: [{ source: "Footer", purpose: "Menampilkan kanal social yang tersedia" }],
});

export const SiteIdentityEditor = createGlobalEditor({
  title: "Site Identity",
  description: "Identitas brand utama yang digunakan secara konsisten di seluruh website.",
  badge: "Master data",
  notice: "Primary Logo dan Favicon memiliki fallback compatibility agar identitas website tidak hilang saat migrasi.",
  sections: [{ title: "Brand" }, { title: "Primary Logo" }, { title: "Favicon" }],
  sources: [
    { source: "Navigation", purpose: "Nama brand dan logo" },
    { source: "Footer", purpose: "Nama dan deskripsi brand" },
    { source: "Metadata", purpose: "Favicon" },
  ],
});

export const SeoDefaultsEditor = createGlobalEditor({
  title: "SEO Defaults",
  description: "Metadata fallback global sebelum page-specific SEO override diterapkan.",
  badge: "Global fallback",
  notice: "Page SEO tetap memiliki prioritas. Nilai di sini digunakan ketika halaman tidak menyediakan override.",
  sections: [{ title: "Default Metadata" }, { title: "Social Preview" }],
  sources: [{ source: "Page SEO", purpose: "Override title, description, dan image per halaman" }],
});

export const SiteSettingsEditor = createGlobalEditor({
  title: "Site Settings",
  description: "Konfigurasi operasional website yang tidak termasuk brand, contact, social, atau SEO.",
  badge: "Operational",
  sections: [{ title: "Website" }],
  sources: [{ source: "Website URL", purpose: "Canonical base dan deployment identity" }],
});
