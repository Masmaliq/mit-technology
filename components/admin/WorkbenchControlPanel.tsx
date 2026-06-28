import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";

import { ADMIN_STUDIO_URL, sanitySingletonLinks } from "@/lib/admin-links";

const projectProfile = [
  ["Client", "PT Pangan Kawan Nusantara"],
  ["Package", "Simple / Business"],
  ["Website Type", "Product Distribution Company Profile"],
  ["Design Direction", "Product Distribution"],
  ["Status", "Setup in progress"],
];

const pageMapping = [
  {
    page: "01 — Beranda",
    frontend: "/",
    cms: "Homepage Settings",
    purpose: "halaman utama / hero / trust / produk ringkas",
  },
  {
    page: "02 — Tentang Kami",
    frontend: "/about",
    cms: "About Page",
    purpose: "profil perusahaan, cerita, visi, misi",
  },
  {
    page: "03 — Produk",
    frontend: "/solutions sementara",
    cms: "Solutions Page + Solution Items",
    purpose: "daftar produk / kategori produk",
  },
  {
    page: "04 — Distribusi",
    frontend: "homepage section sementara",
    cms: "Homepage Settings / future distribution page",
    purpose: "jaringan distribusi",
  },
  {
    page: "05 — Kemitraan",
    frontend: "homepage section sementara",
    cms: "Homepage Settings / future partnership page",
    purpose: "ajakan kerja sama",
  },
  {
    page: "06 — Kontak",
    frontend: "/contact",
    cms: "Contact Page / Contact Settings",
    purpose: "alamat, WhatsApp, email, form kontak",
  },
];

const designDirection = [
  ["Preset", "Product Distribution"],
  ["Color Direction", "white, dark green, cream, soft gold"],
  ["Navbar Style", "Corporate Clean / Logo Mark"],
  ["Hero Style", "Product Distribution Hero"],
  ["Motion Level", "Soft Fade"],
  ["Premium Features", "Hidden for now"],
];

const quickLinks = [
  ["Edit Homepage", sanitySingletonLinks.homepage],
  ["Edit Navbar", sanitySingletonLinks.navbar],
  ["Edit Site Settings", sanitySingletonLinks.siteSettings],
  ["Edit Footer", sanitySingletonLinks.footer],
  ["Edit Contact", sanitySingletonLinks.contact],
  ["Edit About", ADMIN_STUDIO_URL],
  ["Edit Products", ADMIN_STUDIO_URL],
  ["Preview Website", "/"],
  ["Open Studio", ADMIN_STUDIO_URL],
];

const packageScopes = [
  {
    name: "Simple",
    active: true,
    items: ["Homepage", "About", "Products/Services", "Contact", "Navbar/Footer", "SEO dasar"],
  },
  {
    name: "Business",
    active: true,
    items: ["Distribution", "Partnership", "Testimonials", "Client Logos", "Process"],
  },
  {
    name: "Premium",
    active: false,
    items: ["Case Studies", "Motion Effects", "Background Scene", "Product Parallax", "Advanced SEO"],
  },
];

const checklist = [
  "Logo sudah proporsional",
  "Navbar sudah sesuai struktur klien",
  "Homepage sudah memakai konten klien",
  "About sudah diganti dari MIT",
  "Produk sudah sesuai",
  "Footer sudah identitas klien",
  "Contact sudah benar",
  "Mobile sudah dicek",
  "SEO dasar sudah diisi",
  "Preview live aman",
];

function InfoList({ items }: { items: string[][] }) {
  return (
    <div className="space-y-3">
      {items.map(([label, value]) => (
        <div className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3" key={label}>
          <span className="text-sm text-slate-500">{label}</span>
          <span className="max-w-[62%] text-right text-sm font-bold text-slate-950">{value}</span>
        </div>
      ))}
    </div>
  );
}

function Panel({
  title,
  description,
  children,
  tone = "white",
}: {
  title: string;
  description?: string;
  children: ReactNode;
  tone?: "white" | "blue" | "green";
}) {
  const toneClass = {
    white: "border-slate-200/80 bg-white",
    blue: "border-blue-100 bg-blue-50/60",
    green: "border-emerald-100 bg-emerald-50/55",
  }[tone];

  return (
    <section className={`rounded-[2rem] border p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-7 ${toneClass}`}>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-950">{title}</h2>
        {description ? <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

export default function WorkbenchControlPanel() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
              Internal Workbench
            </span>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              MIT Project Workbench
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
              Meja kerja internal untuk memetakan halaman, desain, konten, dan fitur sebelum framework dipakai untuk klien.
            </p>
          </div>
          <Link
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_16px_40px_rgba(37,99,235,0.24)] transition hover:bg-blue-700"
            href={ADMIN_STUDIO_URL}
          >
            Open Studio
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Panel title="Project Profile" description="Identitas adaptasi klien saat ini.">
          <InfoList items={projectProfile} />
        </Panel>

        <Panel title="Design Direction" description="Arah visual awal sebelum masuk ke produksi konten." tone="blue">
          <InfoList items={designDirection} />
        </Panel>
      </div>

      <Panel title="Page Mapping" description="Peta halaman, route frontend, sumber CMS, dan tujuan konten.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pageMapping.map((item) => (
            <article className="rounded-3xl border border-slate-200 bg-white p-5" key={item.page}>
              <h3 className="text-base font-black text-slate-950">{item.page}</h3>
              <div className="mt-4 space-y-3 text-sm">
                <p className="flex justify-between gap-3">
                  <span className="text-slate-500">Frontend</span>
                  <span className="text-right font-bold text-slate-900">{item.frontend}</span>
                </p>
                <p className="flex justify-between gap-3">
                  <span className="text-slate-500">CMS Source</span>
                  <span className="text-right font-bold text-slate-900">{item.cms}</span>
                </p>
                <p className="rounded-2xl bg-slate-50 p-3 text-slate-600">{item.purpose}</p>
              </div>
            </article>
          ))}
        </div>
      </Panel>

      <Panel title="Quick Edit Links" description="Akses cepat aman untuk update konten dan preview.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map(([label, href]) => (
            <Link
              className="group inline-flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 transition hover:border-blue-200 hover:bg-blue-50"
              href={href}
              key={label}
            >
              {label}
              <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-600" />
            </Link>
          ))}
        </div>
      </Panel>

      <Panel title="Package Scope" description="Scope kerja Pangan saat ini berada di Simple / Business." tone="green">
        <div className="grid gap-4 lg:grid-cols-3">
          {packageScopes.map((scope) => (
            <article
              className={`rounded-3xl border p-5 ${scope.active ? "border-emerald-200 bg-white" : "border-slate-200 bg-white/65"}`}
              key={scope.name}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-black text-slate-950">{scope.name}</h3>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    scope.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {scope.active ? "Fokus" : "Nanti"}
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {scope.items.map((item) => (
                  <li className="flex items-start gap-2 text-sm text-slate-600" key={item}>
                    <CheckCircle2 className={`mt-0.5 h-4 w-4 ${scope.active ? "text-emerald-500" : "text-slate-300"}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel title="Checklist Before Live" description="Checklist operasional sebelum preview/deploy klien.">
          <div className="grid gap-3 sm:grid-cols-2">
            {checklist.map((item) => (
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700" key={item}>
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                {item}
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Future System Note" description="Target sistem berikutnya, belum diimplementasikan sekarang." tone="blue">
          <ul className="space-y-3 text-sm leading-6 text-slate-600">
            <li>Website Pages Manager akan menjadi sumber utama.</li>
            <li>Navbar akan membaca dari Pages.</li>
            <li>Footer menu akan membaca dari Pages.</li>
            <li>Workbench akan membaca dari Pages.</li>
          </ul>
        </Panel>
      </div>
    </div>
  );
}
