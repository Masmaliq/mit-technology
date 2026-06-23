"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import AdminSidebar, { MobileAdminSidebar } from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

type AdminShellProps = {
  children: ReactNode;
};

export default function AdminShell({ children }: AdminShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-950">
      <MobileAdminSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <div className="lg:flex">
        <AdminSidebar />
        <div className="min-w-0 flex-1">
          <AdminTopbar onOpenMenu={() => setIsMobileMenuOpen(true)} />
          <main className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
