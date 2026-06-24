"use client";

import Link from "next/link";
import type { ReactNode } from "react";

const actionRoutes: Array<[string, string]> = [
  ["Open Sanity", "/studio"],
  ["Studio", "/studio"],
  ["Open Vercel", "#"],
  ["Preview Website", "/"],
  ["Open Website", "/"],
  ["Desktop 1440px view", "/"],
  ["Desktop Preview", "/"],
  ["Mobile 375px view", "/"],
  ["Mobile Preview", "/"],
  ["Preview Homepage", "/"],
  ["Edit Homepage", "/admin/pages"],
  ["Add Page", "/admin/pages"],
  ["Tambah Page", "/admin/pages"],
  ["Review Drafts", "/admin/pages"],
  ["Update SEO", "/admin/seo-health"],
  ["Preview Pages", "/admin/pages"],
  ["Manage Visibility", "/admin/pages"],
  ["Edit About", "/admin/pages"],
  ["Edit Solutions", "/admin/pages"],
  ["Edit CTA", "/admin/sections"],
  ["Review Cases", "/admin/case-studies"],
  ["Review Portfolio", "/admin/pages"],
  ["Hero Studio", "/studio"],
  ["Edit Content", "/studio"],
  ["Edit Background Scene", "/admin/background-scene"],
  ["Edit Background", "/admin/background-scene"],
  ["Edit Hero Media", "/studio"],
  ["Edit Hero", "/admin/hero"],
  ["Edit Packages", "/admin/packages"],
  ["Edit Package", "/admin/packages"],
  ["Add Package", "/studio"],
  ["Tambah Package", "/studio"],
  ["Edit Starter", "/studio"],
  ["Edit Growth", "/studio"],
  ["Edit Premium", "/studio"],
  ["Preview Pricing", "/admin/packages"],
  ["Edit Case Studies", "/admin/case-studies"],
  ["Add Case Study", "/studio"],
  ["Tambah Case Study", "/studio"],
  ["Edit Featured Case", "/studio"],
  ["Manage Drafts", "/studio"],
  ["Upload Thumbnail", "/studio"],
  ["Preview Case Studies", "/admin/case-studies"],
  ["Preview Case", "/admin/case-studies"],
  ["Add Testimonial", "/studio"],
  ["Tambah Testimonial", "/studio"],
  ["Review Approval", "/admin/testimonials"],
  ["Edit Featured", "/studio"],
  ["Upload Avatar", "/studio"],
  ["Preview Testimonials", "/admin/testimonials"],
  ["Update Footer", "/admin/footer"],
  ["Edit Footer", "/studio"],
  ["Edit Brand Copy", "/studio"],
  ["Update Contact", "/studio"],
  ["Manage Links", "/studio"],
  ["Edit Social Links", "/studio"],
  ["Preview Footer", "/admin/footer"],
  ["Edit Parallax Studio", "/studio"],
  ["Edit Parallax", "/admin/product-parallax"],
  ["Edit Product Asset", "/studio"],
  ["Edit Start/End Section", "/admin/sections"],
  ["Preview Parallax", "/admin/product-parallax"],
  ["Product Parallax Preview", "/admin/product-parallax"],
  ["Disable Parallax", "/admin/product-parallax"],
  ["Edit Scene", "/studio"],
  ["Upload Scene", "/studio"],
  ["Edit Overlay", "/studio"],
  ["Replace Poster", "/studio"],
  ["Set Mobile Fallback", "/studio"],
  ["Preview Scene", "/admin/background-scene"],
  ["Disable Scene", "/admin/background-scene"],
  ["Edit Motion Studio", "/studio"],
  ["Edit Motion Style", "/admin/motion-effects"],
  ["Edit Preset", "/studio"],
  ["Edit Scroll Behavior", "/admin/motion-effects"],
  ["Edit Mobile Motion", "/admin/motion-effects"],
  ["Preview Motion", "/admin/motion-effects"],
  ["Disable Heavy Motion", "/admin/motion-effects"],
  ["Edit Motion", "/admin/motion-effects"],
  ["Review Metadata Studio", "/studio"],
  ["Review Metadata", "/admin/seo-health"],
  ["SEO Audit", "/admin/seo-health"],
  ["Run SEO Audit", "/admin/seo-health"],
  ["Run Audit", "/admin/seo-health"],
  ["Fix Missing Copy", "/studio"],
  ["Check Performance", "/admin/seo-health"],
  ["Settings", "/admin/settings"],
  ["Buka Pengaturan", "/admin/settings"],
  ["General Settings", "/admin/settings"],
  ["Edit General Settings", "/admin/settings"],
  ["Manage Access", "/admin/settings"],
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
