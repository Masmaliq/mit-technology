import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site, siteNavigation, solutions } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="relative block h-11 w-[66px] shrink-0">
              <Image
                src="/logos/mit-logo.png"
                alt="MIT - Maliq Ibrahim Technology"
                fill
                sizes="66px"
                className="object-contain"
              />
            </span>
            <span>
              <span className="block font-semibold text-navy">{site.fullName}</span>
              <span className="block text-sm text-slate-500">{site.location}</span>
            </span>
          </Link>
          <p className="mt-5 max-w-md leading-7 text-slate-600">
            Premium digital agency for corporate websites, ecommerce infrastructure, web apps,
            and AI-powered operational ecosystems.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition duration-200 hover:text-blue-700"
          >
            {site.email}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Pages</h3>
          <div className="mt-5 grid gap-3">
            {siteNavigation.map((item) => (
              <Link className="text-sm font-medium text-slate-600 hover:text-primary" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Solutions
          </h3>
          <div className="mt-5 grid gap-3">
            {solutions.map((item) => (
              <Link className="text-sm font-medium text-slate-600 hover:text-primary" href={item.href} key={item.href}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 px-6 py-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 {site.fullName}. All rights reserved.</p>
          <p>Designed for credible digital growth.</p>
        </div>
      </div>
    </footer>
  );
}
