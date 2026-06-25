"use client";

import Link from "next/link";
import type { ReactNode } from "react";

const studioHref = "/studio";
const singletonIntentHref = (id: string, type: string) => `/studio/intent/edit/id=${id};type=${type}`;

const studioSingletons = {
  homepage: singletonIntentHref("homepage", "homepage"),
  siteSettings: singletonIntentHref("siteSettings", "siteSettings"),
  navbar: singletonIntentHref("navbar", "navbar"),
  contact: singletonIntentHref("contact", "contact"),
  footer: singletonIntentHref("footer", "footer"),
};

const actionRoutes: Array<[string, string]> = [
  ["Open Sanity", studioHref],
  ["Buka Sanity", studioHref],
  ["Studio", studioHref],
  ["Open Vercel", "#"],
  ["Buka Vercel", "#"],
  ["Preview Website", "/"],
  ["Open Website", "/"],
  ["Desktop 1440px view", "/"],
  ["Desktop Preview", "/"],
  ["Mobile 375px view", "/"],
  ["Mobile Preview", "/"],
  ["Preview Homepage", "/"],
  ["Edit Homepage", studioSingletons.homepage],
  ["Add Page", "/admin/pages"],
  ["Tambah Page", "/admin/pages"],
  ["Review Drafts", "/admin/pages"],
  ["Update SEO", "/admin/seo-health"],
  ["Preview Pages", "/admin/pages"],
  ["Manage Visibility", "/admin/pages"],
  ["Edit About", "/admin/pages"],
  ["Edit Solutions", "/admin/pages"],
  ["Edit CTA", studioHref],
  ["Review Cases", "/admin/case-studies"],
  ["Review Portfolio", "/admin/pages"],
  ["Hero Studio", studioSingletons.homepage],
  ["Edit Content", studioHref],
  ["Edit Background Scene", "/admin/background-scene"],
  ["Edit Background", studioHref],
  ["Edit Hero Media", studioHref],
  ["Edit Hero", studioSingletons.homepage],
  ["Edit Packages", "/admin/packages"],
  ["Edit Package", "/admin/packages"],
  ["Packages Page Settings", studioHref],
  ["Add Package", studioHref],
  ["Tambah Package", studioHref],
  ["Edit Starter", studioHref],
  ["Edit Growth", studioHref],
  ["Edit Premium", studioHref],
  ["Preview Pricing", "/admin/packages"],
  ["Edit Case Studies", "/admin/case-studies"],
  ["Case Studies Page Settings", studioHref],
  ["Add Case Study", studioHref],
  ["Tambah Case Study", studioHref],
  ["Edit Featured Case", studioHref],
  ["Manage Drafts", studioHref],
  ["Upload Thumbnail", studioHref],
  ["Preview Case Studies", "/admin/case-studies"],
  ["Preview Case", "/admin/case-studies"],
  ["Add Testimonial", studioHref],
  ["Tambah Testimonial", studioHref],
  ["Review Approval", "/admin/testimonials"],
  ["Edit Featured", studioHref],
  ["Upload Avatar", studioHref],
  ["Preview Testimonials", "/admin/testimonials"],
  ["Update Footer", "/admin/footer"],
  ["Edit Footer", studioSingletons.footer],
  ["Edit Brand Copy", studioHref],
  ["Update Contact", studioHref],
  ["Manage Links", studioHref],
  ["Edit Social Links", studioHref],
  ["Preview Footer", "/admin/footer"],
  ["Edit Parallax Studio", studioHref],
  ["Edit Parallax", "/admin/product-parallax"],
  ["Edit Product Asset", studioHref],
  ["Edit Start/End Section", "/admin/sections"],
  ["Preview Parallax", "/admin/product-parallax"],
  ["Product Parallax Preview", "/admin/product-parallax"],
  ["Disable Parallax", "/admin/product-parallax"],
  ["Edit Scene", studioHref],
  ["Upload Scene", studioHref],
  ["Edit Overlay", studioHref],
  ["Replace Poster", studioHref],
  ["Set Mobile Fallback", studioHref],
  ["Preview Scene", "/admin/background-scene"],
  ["Disable Scene", "/admin/background-scene"],
  ["Edit Motion Studio", studioHref],
  ["Edit Motion Style", "/admin/motion-effects"],
  ["Edit Preset", studioHref],
  ["Edit Scroll Behavior", "/admin/motion-effects"],
  ["Edit Mobile Motion", "/admin/motion-effects"],
  ["Preview Motion", "/admin/motion-effects"],
  ["Disable Heavy Motion", "/admin/motion-effects"],
  ["Edit Motion", studioHref],
  ["Review Metadata Studio", studioHref],
  ["Review Metadata", "/admin/seo-health"],
  ["SEO Audit", "/admin/seo-health"],
  ["Run SEO Audit", "/admin/seo-health"],
  ["Run Audit", "/admin/seo-health"],
  ["Fix Missing Copy", studioHref],
  ["Check Performance", "/admin/seo-health"],
  ["Lihat Log Sistem", "/admin/seo-health"],
  ["Settings", "/admin/settings"],
  ["Buka Pengaturan", "/admin/settings"],
  ["General Settings", "/admin/settings"],
  ["Edit Site Settings", studioSingletons.siteSettings],
  ["Edit Pengaturan Situs", studioSingletons.siteSettings],
  ["Edit General Settings", studioSingletons.siteSettings],
  ["Edit Navbar", studioSingletons.navbar],
  ["Edit Navigasi", studioSingletons.navbar],
  ["Navbar Settings", studioSingletons.navbar],
  ["Edit Contact", studioSingletons.contact],
  ["Edit Kontak", studioSingletons.contact],
  ["Contact Settings", studioSingletons.contact],
  ["Manage Access", "/admin/settings"],
  ["Kelola Akses", "/admin/settings"],
  ["Check Integrations", "/admin/settings"],
  ["Add Section", "/admin/sections"],
  ["Tambah Section", "/admin/sections"],
  ["Reorder Sections", "/admin/sections"],
  ["Toggle Visibility", "/admin/sections"],
  ["Review Readiness", "/admin/sections"],
];

export function getAdminActionHref(action: string) {
  const normalizedAction = action.replace(/[^\w\s/&+-]/g, "").trim().toLowerCase();
  const exactMatch = actionRoutes.find(([label]) => normalizedAction === label.toLowerCase());
  const match = exactMatch ?? actionRoutes.find(([label]) => normalizedAction.includes(label.toLowerCase()));

  return match?.[1] ?? null;
}

export default function AdminActionLink({
  action,
  children,
  className,
}: {
  action: string;
  children: ReactNode;
  className: string;
}) {
  const href = getAdminActionHref(action);

  if (!href) {
    return (
      <button className={className} type="button">
        {children}
      </button>
    );
  }

  if (href === "#" || href.startsWith("http")) {
    return (
      <a className={className} href={href} rel={href.startsWith("http") ? "noreferrer" : undefined} target={href.startsWith("http") ? "_blank" : undefined}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}
