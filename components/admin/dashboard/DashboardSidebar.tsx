import Link from "next/link";

type DashboardNavItem = {
  label: string;
  href: string;
  icon: string;
  active?: boolean;
  badge?: string;
};

type DashboardNavSection = {
  label: string;
  items: DashboardNavItem[];
};

const sections: DashboardNavSection[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: "⌂", active: true },
      { label: "Halaman", href: "/admin/pages", icon: "◫" },
      { label: "Sections", href: "/admin/sections", icon: "⬡" },
    ],
  },
  {
    label: "Konten",
    items: [
      { label: "Hero", href: "/admin/hero", icon: "✦" },
      { label: "Packages", href: "/admin/packages", icon: "◈" },
      { label: "Case Studies", href: "/admin/case-studies", icon: "◉" },
      { label: "Testimonials", href: "/admin/testimonials", icon: "❝" },
      { label: "Footer", href: "/admin/footer", icon: "⊞" },
    ],
  },
  {
    label: "Visual",
    items: [
      { label: "Product Parallax", href: "/admin/parallax", icon: "◑", badge: "!" },
      { label: "Motion Effects", href: "/admin/motion", icon: "◈" },
      { label: "Background Scene", href: "/admin/background", icon: "▣" },
    ],
  },
  {
    label: "Sistem",
    items: [
      { label: "SEO & Health", href: "/admin/health", icon: "◎" },
      { label: "Pengaturan", href: "/admin/settings", icon: "⚙" },
    ],
  },
];

export default function DashboardSidebar() {
  return (
    <nav className="px-2 py-4">
      {sections.map((sec) => (
        <div key={sec.label} className="mb-3">
          <div className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{sec.label}</div>

          <div className="mt-1 flex flex-col">
            {sec.items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-slate-50 hover:text-slate-900 ${item.active ? 'bg-blue-50 text-blue-600 font-medium border-l-2 border-blue-600' : 'text-slate-600'}`}
              >
                <span className="w-4 text-xs opacity-80">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge && <span className="ml-2 inline-flex items-center rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">{item.badge}</span>}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
