"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu } from "lucide-react";

const navigation = [
  { href: "/about", label: "About" },
  { href: "/solutions", label: "Solutions" },
  { href: "/packages", label: "Packages" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-8"
      >
        <Link href="/" className="flex h-20 items-center">
          <div className="flex h-12 w-[128px] items-center overflow-hidden">
            <Image
              src="/mit-logo.png"
              alt="MIT"
              width={1536}
              height={1024}
              priority
              sizes="128px"
              className="h-auto w-[128px] object-contain"
            />
          </div>
        </Link>

        <div className="hidden items-center justify-center gap-9 lg:flex">
          {navigation.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                href={item.href}
                key={item.href}
                className={`group/nav relative py-2 text-[15px] font-medium transition duration-300 ${
                  active ? "text-primary" : "text-slate-600 hover:text-navy"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-primary transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover/nav:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/contact"
            className="hidden items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white shadow-glass-lg transition duration-300 hover:-translate-y-0.5 hover:bg-primary md:inline-flex"
          >
            Mulai Proyek
            <ArrowRight className="h-4 w-4" />
          </Link>

          <details className="group relative lg:hidden">
            <summary className="inline-flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-slate-200 bg-white text-navy transition duration-200 hover:border-primary/40 hover:text-primary [&::-webkit-details-marker]:hidden">
              <span className="sr-only">Buka navigasi</span>
              <Menu className="h-5 w-5" />
            </summary>

            <div className="absolute right-0 mt-3 w-72 rounded-3xl border border-slate-200 bg-white/95 p-3 shadow-glass-lg backdrop-blur-xl">
              <div className="grid gap-1">
                {navigation.map((item) => {
                  const active = isActivePath(pathname, item.href);

                  return (
                    <Link
                      href={item.href}
                      key={item.href}
                      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200 ${
                        active
                          ? "bg-blue-50 text-primary"
                          : "text-slate-600 hover:bg-blue-50 hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <Link
                  href="/contact"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white"
                >
                  Mulai Proyek
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}