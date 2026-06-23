import Link from "next/link";
import { sidebarSections } from "@/lib/admin-dashboard-data";

type SidebarNavigationProps = {
  onNavigate?: () => void;
};

function SidebarBrand({ onClose }: { onClose?: () => void }) {
  return (
    <div className="border-b border-slate-100 px-6 py-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20">
            MIT
          </div>
          <div>
            <div className="text-sm font-bold text-slate-950">MIT Control</div>
            <div className="text-xs text-slate-500">Framework Dashboard</div>
          </div>
        </div>

        {onClose ? (
          <button
            aria-label="Tutup menu admin"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-xl leading-none text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-950"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        ) : null}
      </div>
    </div>
  );
}

function SidebarNavigation({ onNavigate }: SidebarNavigationProps) {
  return (
    <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
      {sidebarSections.map((section) => (
        <div key={section.label}>
          <div className="px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
            {section.label}
          </div>
          <div className="mt-3 space-y-1.5">
            {section.items.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                onClick={onNavigate}
                className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition ${
                  item.active
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                <span className="flex h-6 w-6 items-center justify-center text-xs">{item.icon}</span>
                <span className="flex-1 font-semibold">{item.label}</span>
                {item.badge ? (
                  <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

function SidebarFooter() {
  return (
    <div className="border-t border-slate-100 px-6 py-5 text-xs text-slate-500">
      <div className="font-semibold text-slate-700">MIT Framework v2.4.1</div>
      <div className="mt-1">Last deploy: 2 jam lalu</div>
    </div>
  );
}

export default function AdminSidebar() {
  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-slate-200/80 bg-white/90 backdrop-blur-xl lg:sticky lg:top-0 lg:flex lg:flex-col">
      <SidebarBrand />
      <SidebarNavigation />
      <SidebarFooter />
    </aside>
  );
}

type MobileAdminSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileAdminSidebar({ isOpen, onClose }: MobileAdminSidebarProps) {
  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 lg:hidden ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <button
        aria-label="Tutup menu admin"
        className={`absolute inset-0 bg-slate-950/45 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        type="button"
      />
      <aside
        className={`relative flex h-dvh w-[min(21rem,86vw)] flex-col border-r border-slate-200/80 bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarBrand onClose={onClose} />
        <SidebarNavigation onNavigate={onClose} />
        <SidebarFooter />
      </aside>
    </div>
  );
}
