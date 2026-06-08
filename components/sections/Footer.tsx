import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getFooter, getNavbar, getSiteSettings } from "@/lib/sanity/fetch";

function getWhatsappUrl(whatsapp?: string) {
  if (!whatsapp) return "";

  const cleaned = whatsapp.replace(/\D/g, "");
  const normalized = cleaned.startsWith("0") ? `62${cleaned.slice(1)}` : cleaned;

  return normalized ? `https://wa.me/${normalized}` : "";
}

export async function Footer() {
  const [footer, navbar, settings] = await Promise.all([
    getFooter(),
    getNavbar(),
    getSiteSettings(),
  ]);
  const companyName = settings.companyName || "MIT";
  const email = footer.email || settings.email;
  const phone = footer.phone || settings.phone;
  const whatsapp = settings.whatsapp;
  const whatsappUrl = getWhatsappUrl(whatsapp);
  const logo = settings.logo;
  const menuItems = navbar.menuItems?.filter((item) => item.label && item.href) ?? [];
  const socialLinks = footer.socialLinks?.filter((item) => item.platform && item.url) ?? [];

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="relative block h-11 w-[66px] shrink-0">
              <Image
                src={logo?.url || "/logos/mit-logo.png"}
                alt={logo?.alt || companyName}
                fill
                sizes="66px"
                className="object-contain"
              />
            </span>
            <span>
              <span className="block font-semibold text-navy">{companyName}</span>
              {footer.address || settings.address ? (
                <span className="block text-sm text-slate-500">
                  {footer.address || settings.address}
                </span>
              ) : null}
            </span>
          </Link>
          {footer.description || settings.description ? (
            <p className="mt-5 max-w-md leading-7 text-slate-600">
              {footer.description || settings.description}
            </p>
          ) : null}
          {email ? (
            <Link
              href={`mailto:${email}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition duration-200 hover:text-blue-700"
            >
              {email}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : null}
          {phone ? <p className="mt-3 text-sm font-semibold text-slate-600">{phone}</p> : null}
          {whatsappUrl ? (
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex w-fit items-center gap-2 text-sm font-semibold text-slate-600 transition duration-200 hover:text-primary"
            >
              {whatsapp}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
        {menuItems.length > 0 ? (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Pages
            </h3>
            <div className="mt-5 grid gap-3">
              {menuItems.map((item) => (
                <Link
                  className="text-sm font-medium text-slate-600 hover:text-primary"
                  href={item.href || "/"}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
        {socialLinks.length > 0 ? (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Social
            </h3>
            <div className="mt-5 grid gap-3">
              {socialLinks.map((item) => (
                <Link
                  className="text-sm font-medium text-slate-600 hover:text-primary"
                  href={item.url || "/"}
                  key={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.platform}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
        {menuItems.length === 0 && socialLinks.length === 0 ? (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Contact
            </h3>
            <div className="mt-5 grid gap-3 text-sm font-medium text-slate-600">
              {email ? <span>{email}</span> : null}
              {phone ? <span>{phone}</span> : null}
            </div>
          </div>
        ) : null}
      </div>
      <div className="border-t border-slate-200 px-6 py-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright || `© 2026 ${companyName}. All rights reserved.`}</p>
          {settings.tagline ? <p>{settings.tagline}</p> : null}
        </div>
      </div>
    </footer>
  );
}
