import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { getFooter, getNavbar, getSiteSettings, getSolutions } from "@/lib/sanity/fetch";

type FooterLink = {
  label: string;
  href: string;
};

function getWhatsappUrl(whatsapp?: string) {
  if (!whatsapp) return "";

  const cleaned = whatsapp.replace(/\D/g, "");
  const normalized = cleaned.startsWith("0") ? `62${cleaned.slice(1)}` : cleaned;

  return normalized ? `https://wa.me/${normalized}` : "";
}

function uniqueLinks(links: FooterLink[]) {
  const seen = new Set<string>();

  return links.filter((link) => {
    if (!link.label || !link.href || seen.has(link.href)) {
      return false;
    }

    seen.add(link.href);
    return true;
  });
}

function getSocialLinks(
  footerLinks?: Array<{ platform?: string; url?: string }>,
  settings?: {
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    facebook?: string;
  }
) {
  const cmsLinks =
    footerLinks
      ?.filter((item) => item.platform && item.url)
      .map((item) => ({
        label: item.platform as string,
        href: item.url as string,
      })) ?? [];

  const settingsLinks = [
    { label: "Instagram", href: settings?.instagram },
    { label: "LinkedIn", href: settings?.linkedin },
    { label: "YouTube", href: settings?.youtube },
    { label: "Facebook", href: settings?.facebook },
  ]
    .filter((item): item is FooterLink => Boolean(item.href))
    .map((item) => ({ label: item.label, href: item.href }));

  return uniqueLinks([...cmsLinks, ...settingsLinks]);
}

export async function Footer() {
  const [footer, navbar, settings, solutions] = await Promise.all([
    getFooter(),
    getNavbar(),
    getSiteSettings(),
    getSolutions(),
  ]);
  const companyName = settings.companyName || "MIT Technology";
  const description = footer.description || settings.description || settings.siteDescription;
  const tagline = settings.tagline;
  const address = footer.address || settings.address;
  const email = footer.email || settings.email;
  const phone = footer.phone || settings.phone;
  const whatsapp = settings.whatsapp;
  const whatsappUrl = getWhatsappUrl(whatsapp);
  const logo = navbar.logo || settings.logo;
  const menuItems =
    navbar.menuItems
      ?.filter((item): item is FooterLink => Boolean(item.label && item.href))
      .map((item) => ({ label: item.label as string, href: item.href as string })) ?? [];
  const solutionLinks = uniqueLinks(
    solutions
      .filter((item) => item.title && item.slug)
      .map((item) => ({
        label: item.title as string,
        href: `/solutions/${item.slug}`,
      }))
  );
  const companyLinks = uniqueLinks(
    menuItems.filter((item) => ["/about", "/contact"].includes(item.href))
  );
  const resourceLinks = uniqueLinks(
    menuItems.filter((item) => ["/portfolio", "/case-studies", "/packages"].includes(item.href))
  );
  const socialLinks = getSocialLinks(footer.socialLinks, settings);
  const ctaLabel = navbar.ctaLabel || "Start Consultation";
  const ctaHref = navbar.ctaHref || "/contact";

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.25fr_1.45fr_0.9fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="relative block h-12 w-[72px] shrink-0">
              <Image
                src={logo?.url || "/logos/mit-logo.png"}
                alt={logo?.alt || companyName}
                fill
                sizes="72px"
                className="object-contain"
              />
            </span>
            <span>
              <span className="block text-base font-semibold tracking-tight text-slate-950">
                {companyName}
              </span>
              {tagline ? <span className="block text-sm text-slate-500">{tagline}</span> : null}
            </span>
          </Link>

          {description ? (
            <p className="mt-6 max-w-md leading-7 text-slate-600">{description}</p>
          ) : null}

          {address ? (
            <p className="mt-6 max-w-sm text-sm leading-6 text-slate-500">{address}</p>
          ) : null}

          {socialLinks.length > 0 ? (
            <div className="mt-7 flex flex-wrap gap-2">
              {socialLinks.map((item) => (
                <Link
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition duration-200 hover:border-primary/30 hover:text-primary"
                  href={item.href}
                  key={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Solutions
            </h3>
            <div className="mt-5 grid gap-3">
              {(solutionLinks.length > 0
                ? solutionLinks
                : [{ label: "Solutions", href: "/solutions" }]
              ).map((item) => (
                <Link
                  className="text-sm font-medium leading-6 text-slate-600 transition duration-200 hover:text-primary"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Company
            </h3>
            <div className="mt-5 grid gap-3">
              {(companyLinks.length > 0
                ? companyLinks
                : [
                    { label: "About", href: "/about" },
                    { label: "Contact", href: "/contact" },
                  ]
              ).map((item) => (
                <Link
                  className="text-sm font-medium leading-6 text-slate-600 transition duration-200 hover:text-primary"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Resources
            </h3>
            <div className="mt-5 grid gap-3">
              {(resourceLinks.length > 0
                ? resourceLinks
                : [
                    { label: "Portfolio", href: "/portfolio" },
                    { label: "Packages", href: "/packages" },
                  ]
              ).map((item) => (
                <Link
                  className="text-sm font-medium leading-6 text-slate-600 transition duration-200 hover:text-primary"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-[#FBFAF7] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9A7B38]">
            Contact
          </p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
            Ready to build a serious digital foundation?
          </h3>
          <Link
            href={ctaHref}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#1c1c1c]"
          >
            {ctaLabel}
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <div className="mt-6 grid gap-3 border-t border-slate-200 pt-6">
            {email ? (
              <Link
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-sm font-medium text-slate-600 transition duration-200 hover:text-primary"
              >
                <Mail className="h-4 w-4 text-slate-400" />
                {email}
              </Link>
            ) : null}
            {phone ? (
              <Link
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-sm font-medium text-slate-600 transition duration-200 hover:text-primary"
              >
                <Phone className="h-4 w-4 text-slate-400" />
                {phone}
              </Link>
            ) : null}
            {whatsappUrl ? (
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm font-medium text-slate-600 transition duration-200 hover:text-primary"
              >
                <MessageCircle className="h-4 w-4 text-slate-400" />
                {whatsapp}
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 px-6 py-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright || `© 2026 ${companyName}. All rights reserved.`}</p>
          {tagline ? <p>{tagline}</p> : null}
        </div>
      </div>
    </footer>
  );
}
