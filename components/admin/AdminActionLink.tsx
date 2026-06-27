"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { ADMIN_STUDIO_URL, ADMIN_VERCEL_URL, sanitySingletonLinks } from "@/lib/admin-links";

const actionRoutes: Array<[string, string]> = [
  ["Open Sanity", ADMIN_STUDIO_URL],
  ["Buka Sanity", ADMIN_STUDIO_URL],
  ["Studio", ADMIN_STUDIO_URL],
  ["Open Vercel", ADMIN_VERCEL_URL],
  ["Buka Vercel", ADMIN_VERCEL_URL],
  ["Preview Website", "/"],
  ["Open Website", "/"],
  ["Desktop 1440px view", "/"],
  ["Desktop Preview", "/"],
  ["Mobile 375px view", "/"],
  ["Mobile Preview", "/"],
  ["Preview Homepage", "/"],
  ["Edit Homepage", sanitySingletonLinks.homepage],
  ["Add Page", "/admin/pages"],
  ["Tambah Page", "/admin/pages"],
  ["Tambah Halaman", "/admin/pages"],
  ["Review Drafts", "/admin/pages"],
  ["Update SEO", "/admin/seo-health"],
  ["Preview Pages", "/admin/pages"],
  ["Manage Visibility", "/admin/pages"],
  ["Edit About", "/admin/pages"],
  ["Edit Solutions", "/admin/pages"],
  ["Edit CTA", ADMIN_STUDIO_URL],
  ["Review Cases", "/admin/case-studies"],
  ["Review Portfolio", "/admin/pages"],
  ["Hero Studio", sanitySingletonLinks.homepage],
  ["Edit Hero Content", sanitySingletonLinks.homepage],
  ["Edit Content", ADMIN_STUDIO_URL],
  ["Edit Background Scene", "/admin/background-scene"],
  ["Edit Background", ADMIN_STUDIO_URL],
  ["Edit Hero Media", ADMIN_STUDIO_URL],
  ["Edit Hero", sanitySingletonLinks.homepage],
  ["Edit Packages", "/admin/packages"],
  ["Edit Package", "/admin/packages"],
  ["Packages Page Settings", ADMIN_STUDIO_URL],
  ["Add Package", ADMIN_STUDIO_URL],
  ["Tambah Package", ADMIN_STUDIO_URL],
  ["Edit Starter", ADMIN_STUDIO_URL],
  ["Edit Growth", ADMIN_STUDIO_URL],
  ["Edit Premium", ADMIN_STUDIO_URL],
  ["Preview Pricing", "/admin/packages"],
  ["Edit Case Studies", "/admin/case-studies"],
  ["Case Studies Page Settings", ADMIN_STUDIO_URL],
  ["Add Case Study", ADMIN_STUDIO_URL],
  ["Tambah Case Study", ADMIN_STUDIO_URL],
  ["Edit Featured Case", ADMIN_STUDIO_URL],
  ["Manage Drafts", ADMIN_STUDIO_URL],
  ["Upload Thumbnail", ADMIN_STUDIO_URL],
  ["Preview Case Studies", "/admin/case-studies"],
  ["Preview Case", "/admin/case-studies"],
  ["Add Testimonial", ADMIN_STUDIO_URL],
  ["Tambah Testimonial", ADMIN_STUDIO_URL],
  ["Review Approval", "/admin/testimonials"],
  ["Edit Featured", ADMIN_STUDIO_URL],
  ["Upload Avatar", ADMIN_STUDIO_URL],
  ["Preview Testimonials", "/admin/testimonials"],
  ["Update Footer", "/admin/footer"],
  ["Edit Footer", sanitySingletonLinks.footer],
  ["Edit Brand Copy", ADMIN_STUDIO_URL],
  ["Update Contact", ADMIN_STUDIO_URL],
  ["Manage Links", ADMIN_STUDIO_URL],
  ["Edit Social Links", ADMIN_STUDIO_URL],
  ["Preview Footer", "/admin/footer"],
  ["Edit Parallax Studio", ADMIN_STUDIO_URL],
  ["Edit Parallax", "/admin/product-parallax"],
  ["Edit Product Asset", ADMIN_STUDIO_URL],
  ["Edit Start/End Section", "/admin/sections"],
  ["Preview Parallax", "/admin/product-parallax"],
  ["Product Parallax Preview", "/admin/product-parallax"],
  ["Disable Parallax", "/admin/product-parallax"],
  ["Edit Scene", ADMIN_STUDIO_URL],
  ["Upload Scene", ADMIN_STUDIO_URL],
  ["Edit Overlay", ADMIN_STUDIO_URL],
  ["Replace Poster", ADMIN_STUDIO_URL],
  ["Set Mobile Fallback", ADMIN_STUDIO_URL],
  ["Preview Scene", "/admin/background-scene"],
  ["Disable Scene", "/admin/background-scene"],
  ["Edit Motion Studio", ADMIN_STUDIO_URL],
  ["Edit Motion Style", "/admin/motion-effects"],
  ["Edit Preset", ADMIN_STUDIO_URL],
  ["Edit Scroll Behavior", "/admin/motion-effects"],
  ["Edit Mobile Motion", "/admin/motion-effects"],
  ["Preview Motion", "/admin/motion-effects"],
  ["Disable Heavy Motion", "/admin/motion-effects"],
  ["Edit Motion", ADMIN_STUDIO_URL],
  ["Review Metadata Studio", ADMIN_STUDIO_URL],
  ["Review Metadata", "/admin/seo-health"],
  ["SEO Audit", "/admin/seo-health"],
  ["Run SEO Audit", "/admin/seo-health"],
  ["Run Audit", "/admin/seo-health"],
  ["Fix Missing Copy", ADMIN_STUDIO_URL],
  ["Check Performance", "/admin/seo-health"],
  ["Lihat Log", "/admin/seo-health"],
  ["Lihat Log Sistem", "/admin/seo-health"],
  ["Settings", "/admin/settings"],
  ["Buka Pengaturan", "/admin/settings"],
  ["General Settings", "/admin/settings"],
  ["Edit Site Settings", sanitySingletonLinks.siteSettings],
  ["Edit Pengaturan Situs", sanitySingletonLinks.siteSettings],
  ["Edit General Settings", sanitySingletonLinks.siteSettings],
  ["Edit Navbar", sanitySingletonLinks.navbar],
  ["Edit Navigasi", sanitySingletonLinks.navbar],
  ["Navbar Settings", sanitySingletonLinks.navbar],
  ["Edit Contact", sanitySingletonLinks.contact],
  ["Edit Kontak", sanitySingletonLinks.contact],
  ["Contact Settings", sanitySingletonLinks.contact],
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
