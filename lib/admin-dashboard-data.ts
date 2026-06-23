type SidebarItem = {
  label: string;
  href: string;
  icon: string;
  active?: boolean;
  badge?: string;
};

type SidebarSection = {
  label: string;
  items: SidebarItem[];
};

export const sidebarSections: SidebarSection[] = [
  {
    label: "OVERVIEW",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: "⌂", active: true },
      { label: "Halaman", href: "/admin/pages", icon: "◫" },
      { label: "Sections", href: "/admin/sections", icon: "⬡" },
    ],
  },
  {
    label: "KONTEN",
    items: [
      { label: "Hero", href: "/admin/hero", icon: "✦" },
      { label: "Packages", href: "/admin/packages", icon: "◈" },
      { label: "Case Studies", href: "/admin/case-studies", icon: "◉" },
      { label: "Testimonials", href: "/admin/testimonials", icon: "❝" },
      { label: "Footer", href: "/admin/footer", icon: "⊞" },
    ],
  },
  {
    label: "VISUAL",
    items: [
      { label: "Product Parallax", href: "/admin/parallax", icon: "◑", badge: "!" },
      { label: "Motion Effects", href: "/admin/motion", icon: "◈" },
      { label: "Background Scene", href: "/admin/background", icon: "▣" },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { label: "SEO & Health", href: "/admin/health", icon: "◎" },
      { label: "Pengaturan", href: "/admin/settings", icon: "⚙" },
    ],
  },
];

export const dashboardHero = {
  title: "MIT Framework Control Center",
  description:
    "Ringkasan utama status website Anda dan akses cepat ke semua pengaturan penting dalam satu tampilan terpusat.",
  badges: ["Website Aktif", "Plan: Rp 15jt+", "2 Item Perlu Perhatian"],
  actions: ["Lihat Log", "Edit Homepage"],
};

export const stats = [
  { label: "Total Pages", value: "8", detail: "3 Draft · 5 Published", tone: "blue" },
  { label: "Active Sections", value: "24", detail: "Hero, Packages, CTA, +21", tone: "violet" },
  { label: "Packages", value: "3", detail: "Rp5jt · Rp10jt · Rp15jt+", tone: "emerald" },
  { label: "Case Studies", value: "12", detail: "+2 bulan ini", tone: "blue" },
  { label: "Testimonials", value: "31", detail: "4 menunggu approval", tone: "violet" },
  { label: "Parallax Assets", value: "2/4", detail: "2 asset belum diupload", tone: "amber" },
  { label: "Page Speed", value: "92", detail: "Mobile: 87 · Desktop: 98", tone: "emerald" },
  { label: "SEO Score", value: "74", detail: "2 issue ditemukan", tone: "amber" },
];

export const visualModes = [
  { name: "Basic Hero", status: "Active", active: true },
  { name: "Motion Effects", status: "Active", active: true },
  { name: "Cinematic Flow", status: "Inactive", active: false },
  { name: "Product Parallax", status: "Active", active: true },
];

export const packageSummary = [
  ["Active Plan", "Premium"],
  ["Package Levels", "3"],
  ["Price Range", "Rp5jt · Rp10jt · Rp15jt+"],
  ["Status", "Internal Active"],
];

export const packagePlans = [
  {
    name: "Starter",
    price: "Rp 5.000.000",
    description:
      "Basic company profile untuk website sederhana dengan struktur halaman utama, CMS dasar, dan optimasi awal.",
    features: [
      "Homepage",
      "About Page",
      "Services Page",
      "Contact Section",
      "Basic CMS",
      "Mobile Responsive",
      "Basic SEO",
      "WhatsApp CTA",
    ],
  },
  {
    name: "Growth",
    price: "Rp 10.000.000",
    description:
      "Paket pengembangan menengah untuk website bisnis yang membutuhkan konten lebih lengkap, struktur CMS lebih rapi, dan elemen kepercayaan.",
    features: [
      "Semua fitur Starter",
      "Packages CMS",
      "Case Studies",
      "Testimonials",
      "Blog / Insight",
      "Advanced SEO",
      "Basic Motion Effects",
      "Section Management",
      "Footer CMS",
    ],
  },
  {
    name: "Premium",
    price: "Rp 15.000.000+",
    description:
      "Paket visual premium untuk website dengan pengalaman cinematic, pengaturan visual lanjutan, dan struktur CMS lebih fleksibel.",
    features: [
      "Semua fitur Growth",
      "Product Parallax",
      "Cinematic Background",
      "Background Image / Video",
      "Start & End Section Control",
      "Motion Preset",
      "Mobile Fallback",
      "Advanced Visual Settings",
      "Priority Support",
      "Custom Layout Direction",
    ],
    active: true,
  },
];

export const baseFeatures = [
  "Mobile Responsive",
  "Contact Form",
  "Basic SEO",
  "Speed Optimization",
  "CMS Ready",
  "WhatsApp CTA",
  "SSL Ready",
  "Basic Page Structure",
];

export const premiumFeatures = [
  "Packages CMS",
  "Testimonials",
  "Advanced SEO",
  "Product Parallax",
  "Background Scene Image / Video",
  "Mobile Fallback",
  "Case Studies",
  "Blog / Insight",
  "Motion Effects",
  "Start & End Section Control",
  "Custom Visual Direction",
];

export const parallaxStatus = {
  main: [
    ["Product Parallax", "ON"],
    ["Product Asset", "Uploaded"],
    ["Background Scene", "lab-chemical.mp4"],
    ["Mobile Fallback", "Missing"],
  ],
  motion: [
    ["Motion Style", "Product Anchor"],
    ["Motion Intensity", "Medium"],
    ["Product Position", "Center Right"],
    ["Product Scale", "Large"],
  ],
  range: "Hero → Packages",
  actions: [
    "Edit Product Asset",
    "Edit Background Scene",
    "Edit Motion Style",
    "Edit Start/End Section",
    "Preview Parallax",
    "Disable Parallax",
  ],
};

export const quickActions = [
  "Edit Homepage",
  "Edit Hero",
  "Edit Packages",
  "Edit Case Studies",
  "Update Footer",
  "Edit Parallax",
];

export const websiteHealth = [
  ["SEO Status Score", "74"],
  ["Missing Images", "Lengkap"],
  ["Missing CTA", "Lengkap"],
  ["Draft Content", "3 Draft"],
  ["Product Asset", "Uploaded"],
  ["Poster Image", "Uploaded"],
  ["Mobile Fallback", "Missing"],
];

export const previewAccess = [
  "Open Website",
  "Desktop 1440px view",
  "Mobile 375px view",
  "Product Parallax Preview efek scroll 3D",
];
