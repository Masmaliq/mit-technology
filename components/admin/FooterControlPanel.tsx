import AdminActionLink from "@/components/admin/AdminActionLink";
import { footerControlPanel } from "@/lib/admin-dashboard-data";
import type { Footer, SiteSettings } from "@/lib/sanity/queries";

const summaryTone: Record<string, string> = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
  violet: "border-violet-100 bg-violet-50 text-violet-700",
  amber: "border-amber-100 bg-amber-50 text-amber-700",
};

function hasFooterData(footer?: Footer, siteSettings?: SiteSettings) {
  return Boolean(
    footer?.description ||
      footer?.address ||
      footer?.email ||
      footer?.phone ||
      footer?.whatsapp ||
      footer?.copyright ||
      footer?.socialLinks?.length ||
      siteSettings?.companyName ||
      siteSettings?.siteTitle ||
      siteSettings?.tagline ||
      siteSettings?.description
  );
}

function getBrandName(siteSettings?: SiteSettings) {
  return siteSettings?.companyName || siteSettings?.siteTitle || "MIT Technology";
}

function getFooterDescription(footer?: Footer, siteSettings?: SiteSettings) {
  return footer?.description || siteSettings?.description || siteSettings?.siteDescription || "";
}

function getSocialCount(footer?: Footer, siteSettings?: SiteSettings) {
  const footerLinks = footer?.socialLinks?.filter((item) => item.url).length ?? 0;
  const settingsLinks = [siteSettings?.instagram, siteSettings?.linkedin, siteSettings?.youtube, siteSettings?.facebook].filter(Boolean).length;

  return footerLinks || settingsLinks;
}

function buildSummary(footer?: Footer, siteSettings?: SiteSettings) {
  if (!hasFooterData(footer, siteSettings)) {
    return footerControlPanel.summary;
  }

  const contactReady = Boolean(footer?.email || footer?.phone || footer?.whatsapp || siteSettings?.email || siteSettings?.phone || siteSettings?.whatsapp);

  return [
    { label: "Status Footer", value: "Aktif", tone: "emerald" },
    { label: "Brand Info", value: getBrandName(siteSettings) ? "Siap" : "Review", tone: "blue" },
    { label: "Link Navigasi", value: "Fallback", tone: "violet" },
    { label: "Social Links", value: `${getSocialCount(footer, siteSettings)}`, tone: contactReady ? "emerald" : "amber" },
  ];
}

function buildBrandPreview(footer?: Footer, siteSettings?: SiteSettings) {
  if (!hasFooterData(footer, siteSettings)) {
    return footerControlPanel.brandClosingPreview;
  }

  return [
    ["Brand Name", getBrandName(siteSettings)],
    ["Tagline", siteSettings?.tagline || "Siap"],
    ["Description", getFooterDescription(footer, siteSettings) || "Review"],
    ["CTA Label", footer?.whatsapp || siteSettings?.whatsapp ? "WhatsApp CTA" : "Review"],
    ["Status", getFooterDescription(footer, siteSettings) ? "Siap" : "Review"],
  ];
}

function buildContactInformation(footer?: Footer, siteSettings?: SiteSettings) {
  if (!hasFooterData(footer, siteSettings)) {
    return footerControlPanel.contactInformation;
  }

  const whatsapp = footer?.whatsapp || siteSettings?.whatsapp;
  const email = footer?.email || siteSettings?.email;
  const phone = footer?.phone || siteSettings?.phone;
  const address = footer?.address || siteSettings?.address;

  return [
    ["WhatsApp", whatsapp ? "Siap" : "Review"],
    ["Email", email ? "Siap" : "Review"],
    ["Phone", phone ? "Siap" : "Review"],
    ["Location", address ? "Siap" : "Review"],
    ["Contact CTA", whatsapp || email ? "Aktif" : "Review"],
  ];
}

function buildSocialLinks(footer?: Footer, siteSettings?: SiteSettings) {
  if (!hasFooterData(footer, siteSettings)) {
    return footerControlPanel.socialLinks;
  }

  const footerPlatforms = new Map((footer?.socialLinks ?? []).map((item) => [item.platform?.toLowerCase(), item.url]));

  return [
    ["Instagram", footerPlatforms.get("instagram") || siteSettings?.instagram ? "Terhubung" : "Pending"],
    ["WhatsApp", footer?.whatsapp || siteSettings?.whatsapp ? "Terhubung" : "Pending"],
    ["Email", footer?.email || siteSettings?.email ? "Terhubung" : "Pending"],
    ["LinkedIn", footerPlatforms.get("linkedin") || siteSettings?.linkedin ? "Terhubung" : "Pending"],
  ];
}

function buildLegalSystem(footer?: Footer, siteSettings?: SiteSettings) {
  if (!hasFooterData(footer, siteSettings)) {
    return footerControlPanel.legalSystem;
  }

  return [
    ["Copyright", footer?.copyright || `© 2026 ${getBrandName(siteSettings)}`],
    ["Privacy Policy", "Pending"],
    ["Terms", "Pending"],
    ["Sitemap", siteSettings?.siteUrl ? "Siap" : "Review"],
    ["Footer SEO", siteSettings?.siteTitle || siteSettings?.siteDescription ? "Siap" : "Review"],
  ];
}

function buildVisualSettings(footer?: Footer, siteSettings?: SiteSettings) {
  if (!hasFooterData(footer, siteSettings)) {
    return footerControlPanel.visualSettings;
  }

  return [
    ["Background Type", footer?.enableFooterBackground ? "Image" : "Soft Gradient"],
    ["Background Image", footer?.footerBackgroundImage?.url ? "Terunggah" : "Review"],
    ["Overlay Opacity", footer?.enableFooterBackground ? `${footer.footerOverlayOpacity ?? 86}%` : "Default"],
    ["Position", footer?.footerBackgroundPosition || "center"],
    ["Size", footer?.footerBackgroundSize || "cover"],
    ["Status", "Aktif"],
  ];
}

function buildReadiness(footer?: Footer, siteSettings?: SiteSettings) {
  if (!hasFooterData(footer, siteSettings)) {
    return footerControlPanel.readinessChecklist;
  }

  const contactReady = Boolean(footer?.email || footer?.phone || footer?.whatsapp || siteSettings?.email || siteSettings?.phone || siteSettings?.whatsapp);

  return [
    ["Brand Copy", getFooterDescription(footer, siteSettings) ? "Siap" : "Review"],
    ["Contact Links", contactReady ? "Siap" : "Review"],
    ["Navigation", "Siap"],
    ["Social Links", getSocialCount(footer, siteSettings) > 0 ? "Siap" : "Review"],
    ["Legal Links", footer?.copyright ? "Ready" : "Pending"],
    ["Mobile Footer", "Siap"],
  ];
}

function DetailList({ items }: { items: string[][] }) {
  return (
    <div className="space-y-3">
      {items.map(([label, value]) => {
        const warning = value === "Pending" || value === "Review";
        const ready = ["Ready", "Active", "Connected", "Enabled", "Siap", "Aktif", "Terhubung"].includes(value);

        return (
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3" key={label}>
            <span className="text-sm text-slate-500">{label}</span>
            <span
              className={`max-w-[58%] text-right text-sm font-bold ${
                warning ? "text-amber-700" : ready ? "text-emerald-700" : "text-slate-900"
              }`}
            >
              {value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function FooterPanelCard({
  title,
  description,
  items,
  accent = "white",
}: {
  title: string;
  description: string;
  items: string[][];
  accent?: "white" | "blue" | "emerald" | "violet" | "amber";
}) {
  const accentClass = {
    white: "border-slate-200/80 bg-white",
    blue: "border-blue-100 bg-blue-50/50",
    emerald: "border-emerald-100 bg-emerald-50/55",
    violet: "border-violet-100 bg-violet-50/55",
    amber: "border-amber-100 bg-amber-50/55",
  }[accent];

  return (
    <article className={`rounded-[2rem] border p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-7 ${accentClass}`}>
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
      <div className="mt-6">
        <DetailList items={items} />
      </div>
    </article>
  );
}

export default function FooterControlPanel({ footer, siteSettings }: { footer?: Footer; siteSettings?: SiteSettings }) {
  const summaryCards = buildSummary(footer, siteSettings);
  const brandClosingPreview = buildBrandPreview(footer, siteSettings);
  const contactInformation = buildContactInformation(footer, siteSettings);
  const socialLinks = buildSocialLinks(footer, siteSettings);
  const legalSystem = buildLegalSystem(footer, siteSettings);
  const visualSettings = buildVisualSettings(footer, siteSettings);
  const readinessChecklist = buildReadiness(footer, siteSettings);
  const brandName = brandClosingPreview[0]?.[1] || "MIT Technology";
  const tagline = brandClosingPreview[1]?.[1] || "Membangun fondasi digital untuk pertumbuhan bisnis.";
  const description = brandClosingPreview[2]?.[1] || "";
  const ctaLabel = brandClosingPreview[3]?.[1] || "Start Your Project";
  const previewStatus = brandClosingPreview[4]?.[1] || "Ready";

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] border border-white bg-gradient-to-br from-white via-blue-50/60 to-violet-50 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-xs font-bold text-blue-700">
              {footerControlPanel.header.badge}
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {footerControlPanel.header.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              {footerControlPanel.header.description}
            </p>
          </div>

          <AdminActionLink
            action={footerControlPanel.header.action}
            className="w-fit rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
          >
            {footerControlPanel.header.action}
          </AdminActionLink>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((item) => (
          <article
            className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_54px_rgba(15,23,42,0.05)]"
            key={item.label}
          >
            <div className="text-sm font-bold text-slate-950">{item.label}</div>
            <div className={`mt-5 inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${summaryTone[item.tone]}`}>
              {item.value}
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-slate-950 p-6 text-white shadow-[0_24px_90px_rgba(15,23,42,0.16)] sm:p-8">
          <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full border border-blue-300/20" />
          <div className="absolute -bottom-24 right-8 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="absolute bottom-8 right-8 h-28 w-28 rounded-full border border-white/10" />

          <div className="relative">
          <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold text-blue-100">
              Preview Closing Brand
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">{brandName}</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100">
              {tagline}
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/72">
              {description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950">{ctaLabel}</span>
              <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-100">
                {previewStatus}
              </span>
            </div>
          </div>
        </article>

        <FooterPanelCard
          accent="blue"
          description="Rangkuman copy dan CTA yang muncul di closing section."
          items={brandClosingPreview}
          title="Detail Closing Brand"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <FooterPanelCard
          accent="emerald"
          description="Status informasi kontak utama pada footer."
          items={contactInformation}
          title="Informasi Kontak"
        />

        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Navigasi Footer</h2>
          <p className="mt-1 text-sm text-slate-500">Struktur link footer yang dikelompokkan untuk akses cepat.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            {footerControlPanel.navigationGroups.map((group) => (
              <div className="rounded-2xl bg-slate-50 p-4" key={group.title}>
                <div className="text-sm font-bold text-slate-950">{group.title}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.links.map((link) => (
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600" key={link}>
                      {link}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        <FooterPanelCard
          accent="amber"
          description="Status kanal sosial dan external link yang tersedia."
          items={socialLinks}
          title="Social & External Links"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <FooterPanelCard
          description="Informasi legal dan sistem pendukung footer."
          items={legalSystem}
          title="Legal & Sistem"
        />
        <FooterPanelCard
          accent="violet"
          description="Pengaturan visual footer yang menjadi bagian dari global closing."
          items={visualSettings}
          title="Pengaturan Visual Footer"
        />
        <FooterPanelCard
          description="Checklist kesiapan footer sebelum handoff production."
          items={readinessChecklist}
          title="Checklist Kesiapan Footer"
        />
      </div>

      <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
        <h2 className="text-xl font-bold text-slate-950">Aksi Cepat</h2>
        <p className="mt-1 text-sm text-slate-500">Akses cepat untuk workflow footer dan global closing section.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {footerControlPanel.quickActions.map((action, index) => (
            <AdminActionLink
              action={action}
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                index === 0
                  ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                  : action === "Edit Social Links"
                    ? "border-amber-100 bg-amber-50 text-amber-700 hover:bg-amber-100"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
              key={action}
            >
              {action}
            </AdminActionLink>
          ))}
        </div>
      </article>
    </section>
  );
}
