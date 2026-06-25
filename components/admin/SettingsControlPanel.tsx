import AdminActionLink from "@/components/admin/AdminActionLink";
import { settingsControlPanel } from "@/lib/admin-dashboard-data";
import type { Contact, Footer, Navbar, SiteSettings } from "@/lib/sanity/queries";

const summaryTone: Record<string, string> = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
  violet: "border-violet-100 bg-violet-50 text-violet-700",
  amber: "border-amber-100 bg-amber-50 text-amber-700",
};

function DetailList({ items }: { items: string[][] }) {
  return (
    <div className="space-y-3">
      {items.map(([label, value]) => {
        const pending = ["Pending", "Planned", "Review", "Tertunda", "Rencana"].includes(value);
        const ready = [
          "Ready",
          "Stable",
          "Connected",
          "Active",
          "Enabled",
          "Siap",
          "Stabil",
          "Terhubung",
          "Aktif",
        ].includes(value);

        return (
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3" key={label}>
            <span className="text-sm text-slate-500">{label}</span>
            <span
              className={`text-right text-sm font-bold ${
                pending ? "text-amber-700" : ready ? "text-emerald-700" : "text-slate-900"
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

function firstAvailable(...values: Array<string | undefined>) {
  return values.find((value) => Boolean(value?.trim()));
}

function readyLabel(isReady: boolean) {
  return isReady ? "Siap" : "Review";
}

function connectedLabel(isConnected: boolean) {
  return isConnected ? "Terhubung" : "Review";
}

function hasContactInfo(siteSettings?: SiteSettings, contact?: Contact, footer?: Footer) {
  return Boolean(contact?.email || contact?.whatsapp || siteSettings?.email || siteSettings?.whatsapp || footer?.email || footer?.whatsapp);
}

function hasFooterBrand(footer?: Footer, siteSettings?: SiteSettings) {
  return Boolean(footer?.description || footer?.copyright || siteSettings?.companyName || siteSettings?.siteTitle);
}

function getSocialLinksCount(siteSettings?: SiteSettings, footer?: Footer) {
  return [
    ...(footer?.socialLinks || []).filter((item) => item?.url),
    siteSettings?.instagram,
    siteSettings?.linkedin,
    siteSettings?.youtube,
    siteSettings?.facebook,
  ].filter(Boolean).length;
}

function hasSiteSeo(siteSettings?: SiteSettings) {
  return Boolean(siteSettings?.siteTitle && siteSettings?.siteDescription);
}

function buildSummary(siteSettings?: SiteSettings, navbar?: Navbar, contact?: Contact, footer?: Footer) {
  const hasCmsData = Boolean(
    siteSettings?.companyName ||
      siteSettings?.siteTitle ||
      navbar?.menuItems?.length ||
      contact?.email ||
      contact?.whatsapp ||
      footer?.description
  );

  if (!hasCmsData) {
    return settingsControlPanel.summary;
  }

  return [
    { label: "Versi Framework", value: "v2.4.1", tone: "blue" },
    { label: "Paket Aktif", value: "Premium", tone: "violet" },
    { label: "Lingkungan", value: process.env.NODE_ENV === "production" ? "Produksi" : "Lokal", tone: "amber" },
    { label: "Status Sistem", value: "Terhubung", tone: "emerald" },
  ];
}

function buildGeneralSettings(siteSettings?: SiteSettings, contact?: Contact, footer?: Footer) {
  const siteName = siteSettings?.siteTitle || siteSettings?.companyName;
  const brandName = siteSettings?.companyName;
  const tagline = siteSettings?.tagline || siteSettings?.siteDescription || siteSettings?.description;
  const email = siteSettings?.email || contact?.email || footer?.email;
  const whatsapp = siteSettings?.whatsapp || contact?.whatsapp || footer?.whatsapp;
  const phone = firstAvailable(siteSettings?.phone, contact?.phone, footer?.phone);
  const address = firstAvailable(siteSettings?.address, contact?.address, footer?.address);
  const seoTitle = siteSettings?.siteTitle;
  const seoDescription = siteSettings?.siteDescription;

  if (!siteName && !brandName && !tagline && !email && !whatsapp && !phone && !address && !seoTitle && !seoDescription) {
    return settingsControlPanel.generalSettings;
  }

  return [
    ["Nama Situs", siteName || "Review"],
    ["Nama Brand", brandName || "Review"],
    ["Tagline", tagline || "Review"],
    ["Email", email || "Review"],
    ["WhatsApp", whatsapp || "Review"],
    ["Telepon", phone || "Review"],
    ["Alamat", address || "Review"],
    ["SEO Title", seoTitle || "Review"],
    ["SEO Description", seoDescription || "Review"],
  ];
}

function buildAccessControl() {
  return [
    ["Akses Admin", "Aktif"],
    ["Sistem Role", "Basic"],
    ["Akun Owner", "Aktif"],
    ["Akses Tim", "Tertunda"],
    ["Proteksi Login", "Aktif"],
  ];
}

function buildIntegrationStatus(siteSettings?: SiteSettings, navbar?: Navbar, contact?: Contact, footer?: Footer) {
  return [
    ["Sanity CMS", connectedLabel(Boolean(siteSettings || navbar || contact || footer))],
    ["Deploy Vercel", "Siap"],
    ["Repository GitHub", "Terhubung"],
    ["Kontak Global", readyLabel(hasContactInfo(siteSettings, contact, footer))],
    ["Footer Global", readyLabel(hasFooterBrand(footer, siteSettings))],
    ["Navigasi", readyLabel(Boolean(navbar?.menuItems?.length))],
    ["Social Links", readyLabel(getSocialLinksCount(siteSettings, footer) > 0)],
  ];
}

function buildFrameworkConfiguration(siteSettings?: SiteSettings, navbar?: Navbar, contact?: Contact, footer?: Footer) {
  return [
    ["Frontend Publik", "Terlindungi"],
    ["Sanity Schema", "Terkunci"],
    ["Admin Dashboard", "Aktif"],
    ["Menu Navigasi", navbar?.menuItems?.length ? `${navbar.menuItems.length} Menu` : "Review"],
    ["CTA Navbar", readyLabel(Boolean(navbar?.ctaLabel || navbar?.ctaHref))],
    ["Kontak", readyLabel(hasContactInfo(siteSettings, contact, footer))],
    ["Footer", readyLabel(hasFooterBrand(footer, siteSettings))],
    ["Copyright Footer", footer?.copyright || "Review"],
    ["SEO Situs", readyLabel(hasSiteSeo(siteSettings))],
  ];
}

function buildSystemReadiness(siteSettings?: SiteSettings, navbar?: Navbar, contact?: Contact, footer?: Footer) {
  return [
    ["Pengaturan Situs", readyLabel(Boolean(siteSettings?.companyName || siteSettings?.siteTitle))],
    ["Navigasi", readyLabel(Boolean(navbar?.menuItems?.length))],
    ["Kontak", readyLabel(hasContactInfo(siteSettings, contact, footer))],
    ["Footer", readyLabel(hasFooterBrand(footer, siteSettings))],
    ["SEO Situs", readyLabel(hasSiteSeo(siteSettings))],
    ["Social Links", readyLabel(getSocialLinksCount(siteSettings, footer) > 0)],
    ["Handoff Produksi", "Review"],
  ];
}

function SettingsCard({
  title,
  description,
  items,
  accent = "white",
}: {
  title: string;
  description: string;
  items: string[][];
  accent?: "white" | "blue" | "emerald" | "violet";
}) {
  const accentClass = {
    white: "border-slate-200/80 bg-white",
    blue: "border-blue-100 bg-blue-50/50",
    emerald: "border-emerald-100 bg-emerald-50/55",
    violet: "border-violet-100 bg-violet-50/55",
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

export default function SettingsControlPanel({
  contact,
  footer,
  navbar,
  siteSettings,
}: {
  contact?: Contact;
  footer?: Footer;
  navbar?: Navbar;
  siteSettings?: SiteSettings;
}) {
  const summary = buildSummary(siteSettings, navbar, contact, footer);
  const generalSettings = buildGeneralSettings(siteSettings, contact, footer);
  const accessControl = buildAccessControl();
  const integrationStatus = buildIntegrationStatus(siteSettings, navbar, contact, footer);
  const frameworkConfiguration = buildFrameworkConfiguration(siteSettings, navbar, contact, footer);
  const systemReadiness = buildSystemReadiness(siteSettings, navbar, contact, footer);

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] border border-white bg-gradient-to-br from-white via-blue-50/60 to-violet-50 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-xs font-bold text-blue-700">
              {settingsControlPanel.header.badge}
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {settingsControlPanel.header.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              {settingsControlPanel.header.description}
            </p>
          </div>

          <AdminActionLink
            action={settingsControlPanel.header.action}
            className="w-fit rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
          >
            {settingsControlPanel.header.action}
          </AdminActionLink>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
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

      <div className="grid gap-6 xl:grid-cols-3">
        <SettingsCard
          accent="blue"
          description="Preferensi dasar framework dan identitas sistem internal."
          items={generalSettings}
          title="Pengaturan Umum"
        />
        <SettingsCard
          description="Status akses admin, owner, dan proteksi login internal."
          items={accessControl}
          title="Kontrol Akses"
        />
        <SettingsCard
          accent="emerald"
          description="Koneksi layanan utama yang mendukung workflow website."
          items={integrationStatus}
          title="Status Integrasi"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SettingsCard
          accent="violet"
          description="Konfigurasi modul dan status sistem visual yang sedang aktif."
          items={frameworkConfiguration}
          title="Konfigurasi Framework"
        />

        <SettingsCard
          description="Kesiapan modul utama sebelum handoff production."
          items={systemReadiness}
          title="Kesiapan Sistem"
        />
      </div>

      <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
        <h2 className="text-xl font-bold text-slate-950">Aksi Cepat</h2>
        <p className="mt-1 text-sm text-slate-500">Akses cepat untuk pengaturan sistem dan integrasi admin.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {settingsControlPanel.quickActions.map((action, index) => (
            <AdminActionLink
              action={action}
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                index === 0
                  ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                  : action === "Lihat Log Sistem"
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
