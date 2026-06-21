"use client";

import { useState } from "react";
import PackagePlanStatus from "./PackagePlanStatus";
import PreviewPanel from "./PreviewPanel";
import ProductParallaxStatus from "./ProductParallaxStatus";
import QuickActionsPanel from "./QuickActionsPanel";
import QuickStatsGrid, { type QuickStat } from "./QuickStatsGrid";
import VisualExperienceStatus, { type VisualMode } from "./VisualExperienceStatus";
import WebsiteHealthPanel from "./WebsiteHealthPanel";
import WelcomePanel from "./WelcomePanel";

const quickStatsTop: QuickStat[] = [
  { label: "◫ Total Pages", value: "8", sub: "3 Draft · 5 Published", icon: "📄" },
  { label: "⬡ Active Sections", value: "24", sub: "Hero, Packages, CTA, +21", icon: "✦" },
  { label: "◈ Packages", value: "3", sub: "Rp5jt · Rp10jt · Rp15jt+", icon: "💎" },
  { label: "◉ Case Studies", value: "12", sub: "+2 bulan ini", icon: "📊" },
];

const quickStatsBottom: QuickStat[] = [
  { label: "❝ Testimonials", value: "31", sub: "4 menunggu approval", icon: "⭐" },
  { label: "◑ Parallax Assets", value: "2/4", sub: "2 asset belum diupload", icon: "⚠" },
  { label: "⚡ Page Speed", value: "92", sub: "Mobile: 87 · Desktop: 98", color: "text-emerald-600", icon: "⚡" },
  { label: "🔍 SEO Score", value: "74", sub: "2 issue ditemukan", color: "text-amber-600", icon: "🔍" },
];

const initialVisualModes: VisualMode[] = [
  { name: "Basic Hero", desc: "Static hero section", active: true },
  { name: "Motion Effects", desc: "Fade & slide animations", active: true },
  { name: "Cinematic Flow", desc: "Full-screen transitions", active: false },
  { name: "Product Parallax", desc: "3D scroll product effect", active: true },
];

function InternalPackageSummary() {
  return (
    <div className="self-start overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900">Internal Package Summary</h3>
          <span className="rounded-lg bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
            Internal Active
          </span>
        </div>
      </div>

      <div className="space-y-3 p-6">
        {[
          ["Active Plan", "Premium"],
          ["Package Levels", "3"],
          ["Price Range", "Rp5jt · Rp10jt · Rp15jt+"],
          ["Status", "Internal Active"],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
            <span className="text-sm text-slate-600">{label}</span>
            <span className="text-sm font-semibold text-slate-900">{value}</span>
          </div>
        ))}

        <button
          onClick={() => alert("Action: Kelola Paket")}
          className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          Kelola Paket →
        </button>
      </div>
    </div>
  );
}

export default function DashboardHome() {
  const [visualModes, setVisualModes] = useState(initialVisualModes);
  const [parallaxOn, setParallaxOn] = useState(true);

  const toggleVisualMode = (index: number) => {
    setVisualModes((prev) =>
      prev.map((mode, modeIndex) => (modeIndex === index ? { ...mode, active: !mode.active } : mode))
    );
  };

  const handlePreviewParallax = () => {
    alert("Preview Parallax: Menampilkan efek scroll 3D produk...");
  };

  const handleQuickAction = (action: string) => {
    alert(`Action: ${action}`);
    console.log(`Clicked: ${action}`);
  };

  return (
    <section className="space-y-6">
      <WelcomePanel />

      <QuickStatsGrid stats={quickStatsTop} />
      <QuickStatsGrid stats={quickStatsBottom} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <VisualExperienceStatus modes={visualModes} onToggleMode={toggleVisualMode} />
        <InternalPackageSummary />
      </div>

      <PackagePlanStatus />

      <ProductParallaxStatus
        onPreviewParallax={handlePreviewParallax}
        onQuickAction={handleQuickAction}
        onToggleParallax={() => setParallaxOn((current) => !current)}
        parallaxOn={parallaxOn}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <QuickActionsPanel onQuickAction={handleQuickAction} />
        <WebsiteHealthPanel />
        <PreviewPanel onPreviewParallax={handlePreviewParallax} onQuickAction={handleQuickAction} />
      </div>
    </section>
  );
}
