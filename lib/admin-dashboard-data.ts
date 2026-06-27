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
      { label: "Product Parallax", href: "/admin/product-parallax", icon: "◑", badge: "!" },
      { label: "Motion Effects", href: "/admin/motion-effects", icon: "◈" },
      { label: "Background Scene", href: "/admin/background-scene", icon: "▣" },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { label: "SEO & Health", href: "/admin/seo-health", icon: "◎" },
      { label: "Pengaturan", href: "/admin/settings", icon: "⚙" },
    ],
  },
];

export const adminModulePages = {
  pages: {
    title: "Halaman",
    description: "Kelola struktur halaman utama website sebelum setiap modul dihubungkan ke CMS penuh.",
    badge: "Page Module",
    action: "Tambah Halaman",
  },
  sections: {
    title: "Sections",
    description: "Atur daftar section, urutan konten, dan kesiapan modul homepage atau halaman dalam.",
    badge: "Section Library",
    action: "Tambah Section",
  },
  hero: {
    title: "Hero",
    description: "Kontrol hero content, visual media, CTA, dan status cinematic section setiap halaman.",
    badge: "Hero Control",
    action: "Edit Hero",
  },
  packages: {
    title: "Packages",
    description: "Kelola paket internal, pricing display, fitur, dan CTA paket website MIT Framework.",
    badge: "Pricing Module",
    action: "Tambah Package",
  },
  "case-studies": {
    title: "Case Studies",
    description: "Kelola studi kasus, project proof, client result, dan preview project unggulan.",
    badge: "Proof Module",
    action: "Tambah Case Study",
  },
  testimonials: {
    title: "Testimonials",
    description: "Kelola testimoni, avatar/logo klien, quote, dan status publikasi social proof.",
    badge: "Trust Module",
    action: "Tambah Testimonial",
  },
  footer: {
    title: "Footer",
    description: "Atur brand closing section, kontak, social links, dan background visual footer.",
    badge: "Global Footer",
    action: "Edit Footer",
  },
  "product-parallax": {
    title: "Product Parallax",
    description: "Kelola aset produk, scene background, scroll range, dan fallback mobile visual.",
    badge: "Visual System",
    action: "Edit Parallax",
  },
  "motion-effects": {
    title: "Motion Effects",
    description: "Pantau preset motion, reveal behavior, dan kesiapan animasi ringan di frontend.",
    badge: "Motion System",
    action: "Edit Motion",
  },
  "background-scene": {
    title: "Background Scene",
    description: "Kelola scene image/video, poster, dan status aset visual cinematic.",
    badge: "Scene Control",
    action: "Edit Scene",
  },
  "seo-health": {
    title: "SEO & Health",
    description: "Pantau SEO score, missing metadata, image readiness, dan status kesehatan website.",
    badge: "Health Check",
    action: "Run Audit",
  },
  settings: {
    title: "Pengaturan",
    description: "Konfigurasi sistem admin, preferensi global, dan kesiapan integrasi berikutnya.",
    badge: "Pengaturan Sistem",
    action: "Edit Pengaturan Situs",
  },
} as const;

export const heroControlPanel = {
  header: {
    title: "Hero",
    description: "Kelola headline utama, visual pembuka, CTA, dan motion layer yang tampil di bagian pertama website.",
    badge: "Hero Control",
    action: "Edit Hero",
  },
  summary: [
    { label: "Hero Content", value: "Ready", tone: "emerald" },
    { label: "Background Asset", value: "Uploaded", tone: "blue" },
    { label: "Hero Media", value: "Active", tone: "violet" },
    { label: "Motion", value: "Enabled", tone: "emerald" },
  ],
  contentPreview: {
    title: "Membangun Fondasi Digital untuk Pertumbuhan Bisnis",
    description:
      "MIT Technology membantu perusahaan merancang, membangun, dan mengembangkan ekosistem digital yang mendukung pertumbuhan jangka panjang.",
    primaryCta: "Start Project",
    secondaryCta: "Explore Solutions",
    targetPage: "Homepage",
  },
  visualAssets: [
    ["Background Type", "Video / Image"],
    ["Background File", "hero-background.mp4"],
    ["Poster Image", "Uploaded"],
    ["Mobile Fallback", "Missing"],
    ["Hero Object", "stupa-borobudur.png"],
  ],
  motionSettings: [
    ["Enable Stars", "ON"],
    ["Enable Airplane", "ON"],
    ["Enable Stupa Float", "ON"],
    ["Parallax Intensity", "Medium"],
    ["Scroll Range", "Hero Section"],
  ],
  quickActions: [
    "Edit Hero Content",
    "Edit Background",
    "Edit Hero Media",
    "Edit Motion",
    "Preview Homepage",
    "Open Sanity",
  ],
};

export const packagesControlPanel = {
  header: {
    title: "Packages",
    description: "Kelola paket layanan, harga, benefit, dan positioning penawaran yang tampil di website.",
    badge: "Pricing Module",
    action: "Tambah Package",
  },
  summary: [
    { label: "Total Packages", value: "3", tone: "blue" },
    { label: "Active Plan", value: "Premium", tone: "emerald" },
    { label: "Price Range", value: "Rp5jt - Rp15jt+", tone: "violet" },
    { label: "Featured Package", value: "Premium", tone: "blue" },
  ],
  quickActions: [
    "Add Package",
    "Edit Starter",
    "Edit Growth",
    "Edit Premium",
    "Preview Pricing",
    "Open Sanity",
  ],
};

export const caseStudiesControlPanel = {
  header: {
    title: "Case Studies",
    description: "Kelola studi kasus, visual proyek, hasil kerja, dan bukti dampak yang tampil sebagai portofolio utama website.",
    badge: "Proof Module",
    action: "Tambah Case Study",
  },
  summary: [
    { label: "Total Case Studies", value: "12", tone: "blue" },
    { label: "Published", value: "9", tone: "emerald" },
    { label: "Draft", value: "3", tone: "violet" },
    { label: "Featured", value: "2", tone: "blue" },
  ],
  featuredCases: [
    {
      title: "MIT Technology",
      category: "Digital Framework",
      status: "Featured",
      result: "Framework website reusable untuk company profile premium.",
      metrics: ["12 Admin Routes", "3 Control Panels", "CMS Ready"],
      cta: "Preview Case",
      featured: true,
    },
    {
      title: "Chemiko Labs",
      category: "Manufacturing Website",
      status: "Draft",
      result: "Website pabrik dan product presentation untuk kebutuhan export dan makloon.",
      metrics: ["Export Ready", "Product Catalog", "Factory Profile"],
      cta: "Preview Case",
    },
    {
      title: "Narapati Journal",
      category: "Media Platform",
      status: "Published",
      result: "Journal cinematic dengan CMS editorial, artikel, visual story, dan kanal konten.",
      metrics: ["Editorial CMS", "Story System", "Visual Journal"],
      cta: "Preview Case",
    },
  ],
  readiness: [
    ["Thumbnail Image", "Ready"],
    ["Client Name", "Ready"],
    ["Challenge", "Ready"],
    ["Solution", "Ready"],
    ["Result", "Ready"],
    ["Gallery", "Pending"],
  ],
  workflow: [
    ["Draft Content", "3"],
    ["Ready to Publish", "4"],
    ["Featured Cases", "2"],
    ["Missing Thumbnail", "0"],
    ["Missing Result Copy", "1"],
  ],
  quickActions: [
    "Add Case Study",
    "Edit Featured Case",
    "Manage Drafts",
    "Upload Thumbnail",
    "Preview Case Studies",
    "Open Sanity",
  ],
};

export const productParallaxControlPanel = {
  header: {
    title: "Product Parallax",
    description: "Pantau blueprint layer produk, visual bergerak, dan efek parallax sebelum dihubungkan ke frontend.",
    badge: "Visual System",
    action: "Edit Parallax",
  },
  summary: [
    { label: "Product Parallax", value: "Future-ready", tone: "blue" },
    { label: "Product Asset", value: "Static Blueprint", tone: "blue" },
    { label: "Background Scene", value: "Static Preview", tone: "violet" },
    { label: "Mobile Fallback", value: "Missing", tone: "amber" },
  ],
  productAsset: [
    ["Product File", "botol-sabun.png"],
    ["Position", "Center Right"],
    ["Scale", "Large"],
    ["Anchor", "Product Section"],
    ["Status", "Static Blueprint"],
  ],
  backgroundScene: [
    ["Background Type", "Video"],
    ["File", "lab-chemical.mp4"],
    ["Poster Image", "Uploaded"],
    ["Overlay", "Soft Blue"],
    ["Status", "Static Preview"],
  ],
  motionBehavior: [
    ["Motion Style", "Static Blueprint"],
    ["Motion Intensity", "Medium"],
    ["Scroll Range", "Hero → Packages"],
    ["Start Section", "Hero"],
    ["End Section", "Packages"],
    ["Mobile Mode", "Future-ready"],
  ],
  readiness: [
    ["Product Asset", "Static"],
    ["Background Scene", "Static"],
    ["Poster Image", "Static"],
    ["Desktop Motion", "Future-ready"],
    ["Mobile Fallback", "Missing"],
    ["Performance Check", "Pending"],
  ],
  quickActions: [
    "Edit Product Asset",
    "Edit Background Scene",
    "Edit Motion Style",
    "Edit Start/End Section",
    "Preview Parallax",
    "Disable Parallax",
    "Open Sanity",
  ],
};

export const motionEffectsControlPanel = {
  header: {
    title: "Motion Effects",
    description:
      "Pantau transisi, efek scroll, parallax, dan gerakan visual yang aktif di frontend.",
    badge: "Motion System",
    action: "Edit Motion",
  },
  summary: [
    { label: "Motion Preset", value: "Code-level", tone: "blue" },
    { label: "Reveal Animation", value: "Code-level", tone: "emerald" },
    { label: "Scroll Behavior", value: "Code-level", tone: "violet" },
    { label: "Mobile Motion", value: "Code-level", tone: "blue" },
  ],
  presets: [
    ["Fade Up", "Active"],
    ["Soft Parallax", "Active"],
    ["Stagger Reveal", "Active"],
    ["Section Transition", "Active"],
  ],
  overview: [
    ["Global Motion", "Code-level"],
    ["Motion Source", "Frontend Components"],
    ["Usage Area", "Hero + Sections + Cards"],
    ["Performance Mode", "Reduced-motion aware"],
  ],
  effects: [
    { name: "Fade In", area: "Global", status: "Active", intensity: "Soft", source: "Motion Preset", note: "Aman untuk section intro." },
    { name: "Slide From Left", area: "Section", status: "Active", intensity: "Subtle", source: "Motion Preset", note: "Dipakai untuk variasi text reveal." },
    { name: "Slide From Right", area: "Section", status: "Active", intensity: "Subtle", source: "Motion Preset", note: "Dipakai pada layout dua kolom." },
    { name: "Slide From Bottom", area: "Card", status: "Active", intensity: "Medium", source: "Motion Preset", note: "Untuk cards dan preview content." },
    { name: "Scale / Soft Zoom", area: "Card", status: "Active", intensity: "Soft", source: "Motion Preset", note: "Hover dan visual emphasis ringan." },
    { name: "Parallax Layer", area: "Hero / Product", status: "Active", intensity: "Medium", source: "Visual Module", note: "Perlu tetap ringan di mobile." },
    { name: "Glow Effect", area: "CTA / Visual", status: "Active", intensity: "Soft", source: "Visual Style", note: "Dekoratif, bukan motion berat." },
    { name: "Stars Effect", area: "Hero", status: "Active", intensity: "Soft", source: "Hero Module", note: "Layer ambience hero." },
    { name: "Airplane Motion", area: "Hero", status: "Active", intensity: "Soft", source: "Hero Module", note: "Motion kecil untuk cinematic detail." },
    { name: "Stupa / Hero Object", area: "Hero", status: "Active", intensity: "Medium", source: "Hero Module", note: "Object motion utama hero." },
    { name: "Background Scene Motion", area: "Scene", status: "Review", intensity: "Light", source: "Background Scene", note: "Ikuti reduced motion preference." },
  ],
  animationBehavior: [
    ["Reveal on Scroll", "Enabled"],
    ["Delay", "0.08s stagger"],
    ["Duration", "0.7s"],
    ["Easing", "Premium ease-out"],
    ["Repeat / Once", "Once in view"],
  ],
  scrollInteraction: [
    ["Scroll Intensity", "Subtle"],
    ["Trigger Point", "20% viewport"],
    ["Section Start", "Hero"],
    ["Section End", "Footer CTA"],
    ["Behavior Mode", "Cinematic soft reveal"],
  ],
  mobileFallback: [
    ["Lightweight Motion", "ON"],
    ["Reduced Motion", "Supported"],
    ["Disabled Heavy Effect", "Enabled"],
    ["Status Readiness", "Ready"],
  ],
  usageStatus: [
    ["Hero Motion", "Active"],
    ["Section Motion", "Active"],
    ["Card Motion", "Active"],
    ["Background Scene Motion", "Review"],
    ["Reduced Motion Note", "Supported"],
  ],
  readiness: [
    ["Desktop Motion", "Ready"],
    ["Mobile Motion", "Ready"],
    ["Reduced Motion", "Ready"],
    ["Performance Safe", "Ready"],
    ["Animation Sync", "Ready"],
  ],
  quickActions: [
    "Edit Preset",
    "Edit Scroll Behavior",
    "Edit Mobile Motion",
    "Preview Motion",
    "Disable Heavy Motion",
    "Open Sanity",
  ],
};

export const backgroundSceneControlPanel = {
  header: {
    title: "Background Scene",
    description:
      "Pantau background visual, layer atmosfer, video, dan scene pembuka yang dibaca dari Homepage Settings.",
    badge: "Scene Control",
    action: "Edit Scene",
  },
  summary: [
    { label: "Scene Type", value: "Homepage CMS", tone: "blue" },
    { label: "Active Scene", value: "CMS / Static", tone: "violet" },
    { label: "Poster Image", value: "CMS / Static", tone: "emerald" },
    { label: "Mobile Fallback", value: "Missing", tone: "amber" },
  ],
  sceneAsset: [
    ["Background Type", "Video"],
    ["File Name", "lab-chemical.mp4"],
    ["Format", "MP4"],
    ["Poster", "lab-poster.jpg"],
    ["Status", "CMS / Static"],
  ],
  overview: [
    ["Scene Name", "MIT Cinematic Atmosphere"],
    ["Primary Area", "Hero / Visual Section"],
    ["Scene Source", "Homepage CMS + Static"],
    ["Active Mode", "Video + Poster Fallback"],
  ],
  sceneLayers: [
    { name: "Night Sky", area: "Hero / Global", status: "Active", asset: "Dark blue atmosphere", source: "Placeholder", note: "Fondasi visual untuk cinematic opening." },
    { name: "Stars Layer", area: "Hero", status: "Active", asset: "Particle ambience", source: "Static", note: "Detail halus agar hero tidak terasa kosong." },
    { name: "Nebula / Glow", area: "Hero / CTA", status: "Active", asset: "Soft blue glow", source: "Visual Style", note: "Memberi depth tanpa menutup konten." },
    { name: "Borobudur Silhouette", area: "Hero", status: "Review", asset: "Stupa layer", source: "Hero Media", note: "Dipakai jika asset tersedia dari CMS/public." },
    { name: "Background Video", area: "Hero / Section", status: "Active", asset: "MP4 video", source: "Scene Asset", note: "Video utama untuk cinematic background." },
    { name: "Poster Fallback", area: "Mobile / Reduced Motion", status: "Review", asset: "Fallback image", source: "Scene Asset", note: "Masih perlu final mobile fallback." },
    { name: "Gradient Overlay", area: "Global Scene", status: "Active", asset: "Soft blue gradient", source: "Overlay", note: "Menjaga teks tetap terbaca." },
  ],
  visualOverlay: [
    ["Overlay Style", "Soft Blue Gradient"],
    ["Opacity", "32%"],
    ["Blend Mode", "Screen"],
    ["Text Safety", "High"],
    ["Status", "CMS / Static"],
  ],
  sceneUsage: [
    ["Used On", "Hero, Product Parallax, Packages"],
    ["Start Section", "Hero"],
    ["End Section", "Case Studies"],
    ["Desktop Mode", "Frontend-dependent"],
    ["Mobile Mode", "Poster Fallback"],
  ],
  heroUsage: [
    ["Hero Scene", "Homepage CMS"],
    ["Night Atmosphere", "Ready"],
    ["Stars Layer", "Ready"],
    ["Stupa Layer", "Review"],
    ["Motion Relation", "Hero Motion"],
  ],
  sectionUsage: [
    ["Product Parallax", "Future-ready"],
    ["Packages Section", "Optional"],
    ["Case Studies Bridge", "Review"],
    ["CTA Atmosphere", "Optional"],
    ["Source", "Static Blueprint"],
  ],
  performanceReadiness: [
    ["Video Compression", "Ready"],
    ["Poster Image", "Ready"],
    ["Lazy Load", "Enabled"],
    ["Mobile Fallback", "Missing"],
    ["Reduced Motion", "Supported"],
    ["Performance Check", "Pending"],
  ],
  quickActions: [
    "Upload Scene",
    "Edit Overlay",
    "Replace Poster",
    "Set Mobile Fallback",
    "Preview Scene",
    "Disable Scene",
    "Open Sanity",
  ],
};

export const seoHealthControlPanel = {
  header: {
    title: "SEO & Health",
    description: "Pantau metadata, social preview, struktur halaman, dan kesiapan SEO dasar website dari satu panel.",
    badge: "Health Check",
    action: "Run Audit",
  },
  summary: [
    { label: "SEO Score", value: "74", tone: "amber" },
    { label: "Page Speed", value: "92", tone: "emerald" },
    { label: "Issues", value: "2", tone: "amber" },
    { label: "Draft Content", value: "3", tone: "violet" },
  ],
  seoStatus: [
    ["Meta Title", "Ready"],
    ["Meta Description", "Ready"],
    ["Open Graph Image", "Uploaded"],
    ["Sitemap", "Ready"],
    ["Robots", "Ready"],
    ["Canonical URL", "Ready"],
  ],
  overview: [
    ["Default SEO Title", "Connected"],
    ["Default SEO Description", "Needs Review"],
    ["Open Graph Image", "Uploaded"],
    ["Source", "Static Checklist"],
  ],
  pageSeoStatus: [
    { page: "Homepage", route: "/", status: "Ready", title: "Connected", description: "Connected", image: "Uploaded", source: "Homepage Settings" },
    { page: "About", route: "/about", status: "Ready", title: "Connected", description: "Connected", image: "Review", source: "About Settings" },
    { page: "Solutions", route: "/solutions", status: "Ready", title: "Connected", description: "Connected", image: "Uploaded", source: "Solutions Page Settings" },
    { page: "Packages", route: "/packages", status: "Ready", title: "Connected", description: "Connected", image: "Uploaded", source: "Packages Page Settings" },
    { page: "Case Studies", route: "/case-studies", status: "Needs Review", title: "Connected", description: "Needs Review", image: "Uploaded", source: "Case Studies Settings" },
    { page: "Portfolio", route: "/portfolio", status: "Needs Review", title: "Review", description: "Review", image: "Missing Data", source: "Placeholder" },
  ],
  metadataChecklist: [
    ["Missing Title", "0"],
    ["Missing Description", "2"],
    ["Missing Image Alt", "Review"],
    ["Duplicate Metadata", "0"],
    ["Long Description", "Review"],
  ],
  socialPreviewStatus: [
    ["Open Graph Image", "Uploaded"],
    ["OG Title", "Connected"],
    ["OG Description", "Needs Review"],
    ["Twitter Card", "Review"],
    ["Social Crop Safety", "Review"],
  ],
  sitemapRobotsStatus: [
    ["Sitemap", "Ready"],
    ["Robots", "Ready"],
    ["Canonical URL", "Ready"],
    ["Indexable Pages", "Review"],
    ["Dynamic Slugs", "Connected"],
  ],
  imageAltStatus: [
    ["Hero Media Alt", "Review"],
    ["Case Study Images", "Ready"],
    ["Client Logos", "Review"],
    ["Package Visuals", "Optional"],
    ["Fallback Alt", "Connected"],
  ],
  contentReadiness: [
    ["Published Pages", "5"],
    ["Draft Pages", "3"],
    ["Missing CTA", "0"],
    ["Missing Images", "0"],
    ["Missing SEO Copy", "2"],
    ["Empty Sections", "1"],
  ],
  performanceStatus: [
    ["Desktop Score", "98"],
    ["Mobile Score", "87"],
    ["Image Optimization", "Ready"],
    ["Lazy Load", "Enabled"],
    ["Video Weight", "Needs Review"],
    ["Motion Performance", "Safe"],
  ],
  issues: [
    "Mobile Fallback Missing",
    "2 SEO descriptions need review",
    "1 draft page not published",
  ],
  launchChecklist: [
    ["Homepage", "Ready"],
    ["About", "Ready"],
    ["Packages", "Ready"],
    ["Case Studies", "Review"],
    ["Footer", "Ready"],
    ["Contact CTA", "Ready"],
  ],
  quickActions: [
    "Run SEO Audit",
    "Review Metadata",
    "Fix Missing Copy",
    "Check Performance",
    "Preview Website",
    "Open Sanity",
  ],
};

export const testimonialsControlPanel = {
  header: {
    title: "Testimonials",
    description: "Kelola testimoni klien, kutipan utama, identitas perusahaan, dan bukti kepercayaan yang tampil di website.",
    badge: "Trust Module",
    action: "Tambah Testimonial",
  },
  summary: [
    { label: "Total Testimonials", value: "31", tone: "blue" },
    { label: "Published", value: "24", tone: "emerald" },
    { label: "Waiting Approval", value: "4", tone: "amber" },
    { label: "Featured", value: "3", tone: "violet" },
  ],
  featuredTestimonials: [
    {
      client: "Chemiko Labs",
      role: "Manufacturing Client",
      status: "Published",
      quote:
        "MIT membantu kami menyiapkan fondasi website yang lebih rapi, modern, dan siap dikembangkan untuk kebutuhan bisnis.",
      rating: "5.0",
      tag: "Featured",
    },
    {
      client: "Narapati Journal",
      role: "Media Platform",
      status: "Featured",
      quote: "Struktur CMS dan tampilan visualnya membuat proses editorial terasa lebih tertata dan profesional.",
      rating: "5.0",
      tag: "Featured",
      featured: true,
    },
    {
      client: "Pangan Kawan Nusantara",
      role: "Company Profile Client",
      status: "Waiting Approval",
      quote: "Website company profile menjadi lebih mudah dipresentasikan dan terlihat lebih siap untuk kebutuhan partnership.",
      rating: "4.8",
      tag: "Review",
    },
  ],
  readiness: [
    ["Client Name", "Ready"],
    ["Client Role", "Ready"],
    ["Quote", "Ready"],
    ["Avatar / Logo", "Uploaded"],
    ["Rating", "Ready"],
    ["Approval Status", "Review"],
  ],
  workflow: [
    ["Published", "24"],
    ["Waiting Approval", "4"],
    ["Draft", "3"],
    ["Missing Avatar", "2"],
    ["Missing Client Role", "1"],
    ["Featured Testimonials", "3"],
  ],
  displaySettings: [
    ["Homepage Section", "Active"],
    ["Case Study Detail", "Active"],
    ["Package Page", "Optional"],
    ["Carousel Mode", "Enabled"],
    ["Auto Slide", "OFF"],
    ["Mobile Layout", "Stacked Cards"],
  ],
  quickActions: [
    "Add Testimonial",
    "Review Approval",
    "Edit Featured",
    "Upload Avatar",
    "Preview Testimonials",
    "Open Sanity",
  ],
};

export const settingsControlPanel = {
  header: {
    title: "Pengaturan",
    description:
      "Konfigurasi sistem admin, preferensi global, akses internal, integrasi, dan kesiapan framework.",
    badge: "Pengaturan Sistem",
    action: "Edit Pengaturan Situs",
  },
  summary: [
    { label: "Versi Framework", value: "v2.4.1", tone: "blue" },
    { label: "Paket Aktif", value: "Premium", tone: "violet" },
    { label: "Lingkungan", value: "Lokal", tone: "amber" },
    { label: "Status Sistem", value: "Stabil", tone: "emerald" },
  ],
  generalSettings: [
    ["Nama Situs", "MIT Control"],
    ["Nama Framework", "MIT Framework"],
    ["Bahasa Default", "Indonesia"],
    ["Timezone", "Asia/Jakarta"],
    ["Mode Admin", "Internal"],
  ],
  accessControl: [
    ["Akses Admin", "Aktif"],
    ["Sistem Role", "Basic"],
    ["Akun Owner", "Aktif"],
    ["Akses Tim", "Tertunda"],
    ["Proteksi Login", "Aktif"],
  ],
  integrationStatus: [
    ["Sanity CMS", "Terhubung"],
    ["Deploy Vercel", "Siap"],
    ["Repository GitHub", "Terhubung"],
    ["Supabase Admin", "Rencana"],
    ["WhatsApp CTA", "Siap"],
    ["Analytics", "Tertunda"],
  ],
  frameworkConfiguration: [
    ["Frontend Publik", "Terlindungi"],
    ["Sanity Schema", "Terkunci"],
    ["Admin Dashboard", "Aktif"],
    ["Module Routes", "Siap"],
    ["Sistem Visual", "Aktif"],
    ["Sistem Motion", "Aktif"],
  ],
  systemReadiness: [
    ["Dashboard", "Siap"],
    ["Modul Konten", "Siap"],
    ["Modul Visual", "Siap"],
    ["SEO Health", "Siap"],
    ["Modul Footer", "Tertunda"],
    ["Handoff Produksi", "Review"],
  ],
  quickActions: [
    "Edit Pengaturan Situs",
    "Edit Navigasi",
    "Edit Kontak",
    "Kelola Akses",
    "Buka Sanity",
    "Buka Vercel",
    "Lihat Log Sistem",
  ],
};

export const footerControlPanel = {
  header: {
    title: "Footer",
    description:
      "Pantau brand closing section, informasi kontak, navigation links, social links, legal text, dan background visual footer.",
    badge: "Global Footer",
    action: "Edit Footer",
  },
  summary: [
    { label: "Footer Status", value: "Active", tone: "emerald" },
    { label: "Brand Info", value: "Ready", tone: "blue" },
    { label: "Navigation Links", value: "8", tone: "violet" },
    { label: "Social Links", value: "3", tone: "amber" },
  ],
  brandClosingPreview: [
    ["Brand Name", "MIT Technology"],
    ["Tagline", "Membangun fondasi digital untuk pertumbuhan bisnis."],
    [
      "Description",
      "Website, sistem internal, automasi, dan solusi digital yang dirancang untuk bisnis yang ingin bertumbuh secara berkelanjutan.",
    ],
    ["CTA Label", "Start Your Project"],
    ["Status", "Ready"],
  ],
  contactInformation: [
    ["WhatsApp", "Ready"],
    ["Email", "Ready"],
    ["Location", "Indonesia"],
    ["Business Hours", "Active"],
    ["Contact CTA", "Enabled"],
  ],
  navigationGroups: [
    {
      title: "Company",
      links: ["About", "Case Studies", "Portfolio", "Contact"],
    },
    {
      title: "Services",
      links: ["Solutions", "Packages", "Product Parallax", "Motion System"],
    },
  ],
  socialLinks: [
    ["Instagram", "Connected"],
    ["WhatsApp", "Connected"],
    ["Email", "Connected"],
    ["LinkedIn", "Pending"],
  ],
  legalSystem: [
    ["Copyright", "© 2026 MIT Technology"],
    ["Privacy Policy", "Pending"],
    ["Terms", "Pending"],
    ["Sitemap", "Ready"],
    ["Footer SEO", "Ready"],
  ],
  visualSettings: [
    ["Background Type", "Soft Gradient"],
    ["Logo Mode", "Monogram + Text"],
    ["Layout", "Multi Column"],
    ["Mobile Layout", "Stacked"],
    ["Motion", "Soft Reveal"],
    ["Status", "Active"],
  ],
  readinessChecklist: [
    ["Brand Copy", "Ready"],
    ["Contact Links", "Ready"],
    ["Navigation", "Ready"],
    ["Social Links", "Review"],
    ["Legal Links", "Pending"],
    ["Mobile Footer", "Ready"],
  ],
  quickActions: [
    "Edit Brand Copy",
    "Update Contact",
    "Manage Links",
    "Edit Social Links",
    "Preview Footer",
    "Open Sanity",
  ],
};

export const pagesControlPanel = {
  header: {
    title: "Halaman",
    description:
      "Kelola struktur halaman, status konten, SEO dasar, dan akses edit untuk setiap halaman website.",
    badge: "Page Control",
    action: "Tambah Page",
  },
  summary: [
    { label: "Total Pages", value: "7", tone: "blue" },
    { label: "Published", value: "5", tone: "emerald" },
    { label: "Draft", value: "1", tone: "violet" },
    { label: "Need Review", value: "1", tone: "amber" },
  ],
  pages: [
    { title: "Home", status: "Published", type: "Landing Page", visibility: "Public", action: "Edit Homepage", route: "/", source: "Homepage Settings", seoStatus: "Ready", previewHref: "/" },
    { title: "About", status: "Published", type: "Company Page", visibility: "Public", action: "Edit About", route: "/about", source: "About Page Settings", seoStatus: "Ready", previewHref: "/about" },
    { title: "Solutions", status: "Published", type: "Service Page", visibility: "Public", action: "Edit Solutions", route: "/solutions", source: "Solutions Collection", seoStatus: "Ready", previewHref: "/solutions" },
    { title: "Packages", status: "Published", type: "Pricing Page", visibility: "Public", action: "Edit Packages", route: "/packages", source: "Packages Collection", seoStatus: "Ready", previewHref: "/packages" },
    { title: "Case Studies", status: "Review", type: "Proof Page", visibility: "Public", action: "Review Cases", route: "/case-studies", source: "Case Study Collection", seoStatus: "Review", previewHref: "/case-studies" },
    { title: "Portfolio", status: "Draft", type: "Project Archive", visibility: "Hidden", action: "Review Portfolio", route: "/portfolio", source: "Portfolio Collection", seoStatus: "Review", previewHref: "/portfolio" },
    { title: "Contact", status: "Published", type: "Conversion Page", visibility: "Public", action: "Edit CTA", route: "/contact", source: "Contact Settings", seoStatus: "Ready", previewHref: "/contact" },
  ],
  readiness: [
    ["Hero Content", "Ready"],
    ["Page Copy", "Ready"],
    ["Media Asset", "Review"],
    ["CTA", "Ready"],
    ["Mobile Layout", "Ready"],
    ["Publish Status", "Review"],
  ],
  seoCoverage: [
    ["Meta Title", "Ready"],
    ["Meta Description", "Ready"],
    ["Open Graph Image", "Review"],
    ["Canonical URL", "Ready"],
    ["Sitemap", "Ready"],
    ["Schema Markup", "Planned"],
  ],
  quickActions: [
    "Add Page",
    "Review Drafts",
    "Update SEO",
    "Preview Pages",
    "Manage Visibility",
    "Open Sanity",
  ],
};

export const sectionsControlPanel = {
  header: {
    title: "Sections",
    description:
      "Kelola susunan section, sumber konten, status visual, dan blok reusable yang membentuk halaman website.",
    badge: "Section Control",
    action: "Tambah Section",
  },
  summary: [
    { label: "Total Sections", value: "8", tone: "blue" },
    { label: "Active Sections", value: "7", tone: "emerald" },
    { label: "Hidden Sections", value: "1", tone: "violet" },
    { label: "Need Attention", value: "2", tone: "amber" },
  ],
  sections: [
    { title: "Hero", status: "Active", placement: "Top", editable: "CMS Ready", readiness: "Ready", action: "Edit Hero", mediaStatus: "Visual Ready", order: "01", page: "Homepage", previewHref: "/", source: "Homepage Settings" },
    { title: "Client Logos", status: "Active", placement: "After Hero", editable: "Collection", readiness: "Ready", action: "Open Sanity", mediaStatus: "Logo Collection", order: "02", page: "Homepage", previewHref: "/", source: "Client Logos Collection" },
    { title: "Solutions", status: "Active", placement: "Homepage Preview", editable: "CMS Ready", readiness: "Ready", action: "Edit Solutions", mediaStatus: "Content", order: "03", page: "Homepage", previewHref: "/", source: "Solutions Collection" },
    { title: "Process", status: "Active", placement: "Growth Framework", editable: "Collection", readiness: "Ready", action: "Open Sanity", mediaStatus: "Process Steps", order: "04", page: "Homepage", previewHref: "/", source: "Process Collection" },
    { title: "Packages", status: "Active", placement: "Pricing Preview", editable: "Collection", readiness: "Review", action: "Edit Packages", mediaStatus: "Package Cards", order: "05", page: "Homepage", previewHref: "/", source: "Package Collection" },
    { title: "Case Studies", status: "Active", placement: "Proof Banner", editable: "CMS Ready", readiness: "Ready", action: "Review Cases", mediaStatus: "Banner", order: "06", page: "Homepage", previewHref: "/", source: "Case Study Collection" },
    { title: "Impact Metrics", status: "Active", placement: "Metrics Band", editable: "Homepage CMS", readiness: "Review", action: "Open Sanity", mediaStatus: "Metrics", order: "07", page: "Homepage", previewHref: "/", source: "Homepage Settings" },
    { title: "Testimonials", status: "Active", placement: "Social Proof", editable: "Collection", readiness: "Review", action: "Preview Testimonials", mediaStatus: "Quote Cards", order: "08", page: "Homepage", previewHref: "/", source: "Testimonials Collection" },
    { title: "CTA", status: "Active", placement: "Before Footer", editable: "CMS Ready", readiness: "Ready", action: "Edit CTA", mediaStatus: "Conversion", order: "09", page: "Homepage", previewHref: "/", source: "Homepage Settings" },
    { title: "Footer", status: "Hidden", placement: "Global Closing", editable: "Global CMS", readiness: "Ready", action: "Edit Footer", mediaStatus: "Content", order: "10", page: "Global", previewHref: "/admin/footer", source: "Footer Settings" },
  ],
  orderStatus: [
    ["Hero", "01"],
    ["Client Logos", "02"],
    ["Solutions", "03"],
    ["Case Studies", "04"],
    ["Framework", "05"],
    ["Packages", "08"],
  ],
  homepageStructure: [
    ["Hero", "Ready"],
    ["Trust / Logos", "Ready"],
    ["Solutions Preview", "Ready"],
    ["Case Studies Banner", "Ready"],
    ["Testimonials", "Review"],
    ["Final CTA", "Ready"],
  ],
  quickActions: [
    "Add Section",
    "Reorder Sections",
    "Toggle Visibility",
    "Review Readiness",
    "Preview Homepage",
    "Open Sanity",
  ],
};

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
