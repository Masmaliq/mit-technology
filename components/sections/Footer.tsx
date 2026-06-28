import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getFooter, getSiteSettings } from "@/lib/sanity/fetch";
import { StaggerContainer, StaggerItem, TextReveal } from "@/components/motion/Motion";

function getWhatsappUrl(whatsapp?: string) {
  if (!whatsapp) return "";

  const cleaned = whatsapp.replace(/\D/g, "");
  const normalized = cleaned.startsWith("0") ? `62${cleaned.slice(1)}` : cleaned;

  return normalized ? `https://wa.me/${normalized}` : "";
}

function getObjectPosition(position?: string) {
  const positions = {
    center: "object-center",
    top: "object-top",
    bottom: "object-bottom",
    left: "object-left",
    right: "object-right",
  };

  return positions[(position || "center") as keyof typeof positions] || positions.center;
}

function getObjectFit(size?: string) {
  const sizes = {
    cover: "object-cover",
    contain: "object-contain",
    auto: "object-none",
  };

  return sizes[(size || "cover") as keyof typeof sizes] || sizes.cover;
}

function clampOpacity(value?: number) {
  return Math.min(Math.max(value ?? 86, 0), 100) / 100;
}

export async function Footer() {
  const [footer, settings] = await Promise.all([
    getFooter(),
    getSiteSettings(),
  ]);
  const companyName = settings.companyName || settings.siteTitle || "MIT Technology";
  const description =
    footer.description ||
    settings.description ||
    "";
  const address =
    footer.address || settings.address || "";
  const email = footer.email || settings.email || "";
  const phone = footer.phone || settings.phone;
  const whatsapp = footer.whatsapp || settings.whatsapp;
  const whatsappUrl = getWhatsappUrl(whatsapp);
  const whatsappLabel = whatsapp || "";
  const hasBackground = Boolean(footer.enableFooterBackground && footer.footerBackgroundImage?.url);
  const overlayOpacity = clampOpacity(footer.footerOverlayOpacity);
  const contactItems = [
    whatsapp || whatsappUrl
      ? {
          icon: MessageCircle,
          label: whatsappLabel || "WhatsApp",
          href: whatsappUrl || "#",
          external: Boolean(whatsappUrl),
        }
      : null,
    email
      ? {
          icon: Mail,
          label: email,
          href: `mailto:${email}`,
          external: false,
        }
      : null,
    phone
      ? {
          icon: Phone,
          label: phone,
          href: `tel:${phone.replace(/\s/g, "")}`,
          external: false,
        }
      : null,
    address
      ? {
          icon: MapPin,
          label: address,
          href: "",
          external: false,
        }
      : null,
  ].filter(Boolean) as Array<{
    icon: typeof MessageCircle;
    label: string;
    href: string;
    external: boolean;
  }>;

  return (
    <footer className="relative isolate overflow-hidden bg-[#020817] text-white">
      {hasBackground ? (
        <>
          <Image
            alt={footer.footerBackgroundImage?.alt || "Footer background"}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 -z-30 opacity-35 ${getObjectFit(footer.footerBackgroundSize)} ${getObjectPosition(footer.footerBackgroundPosition)}`}
            fill
            sizes="100vw"
            src={footer.footerBackgroundImage?.url || ""}
            unoptimized
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-20 bg-[#020817]"
            style={{ opacity: overlayOpacity }}
          />
        </>
      ) : null}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_34%,rgba(37,99,235,0.34),transparent_34%),linear-gradient(135deg,#020817_0%,#061a3f_48%,#020817_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:54px_54px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 bottom-[-10rem] h-[32rem] w-[32rem] rounded-full border border-sky-300/18 sm:-right-20 lg:h-[42rem] lg:w-[42rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-[-6rem] h-[22rem] w-[22rem] rounded-full border border-sky-300/12 lg:h-[30rem] lg:w-[30rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-16 right-10 h-2 w-2 rounded-full bg-sky-300/70 shadow-[0_0_44px_18px_rgba(56,189,248,0.18)]"
      />

      <div className="relative z-10 mx-auto flex min-h-[26rem] max-w-7xl flex-col justify-between px-5 py-12 sm:px-6 lg:min-h-[32rem] lg:px-8 lg:py-16">
        <div className="max-w-5xl">
          {description ? (
            <TextReveal
              as="p"
              className="mt-6 max-w-2xl text-base leading-8 text-slate-200/88 sm:text-[1.0625rem] sm:leading-8"
              direction="up"
              mode="lines"
              text={description}
            />
          ) : null}
          {footer.socialLinks?.some((socialLink) => socialLink.platform && socialLink.url) ? (
            <div className="mt-7 flex flex-wrap gap-3">
              {footer.socialLinks?.map((socialLink) =>
                socialLink.platform && socialLink.url ? (
                  <Link
                    className="rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/78 transition duration-300 hover:border-white/24 hover:bg-white/10 hover:text-white"
                    href={socialLink.url}
                    key={`${socialLink.platform}-${socialLink.url}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {socialLink.platform}
                  </Link>
                ) : null
              )}
            </div>
          ) : null}
        </div>

        <div className="mt-14 grid gap-8 border-t border-white/12 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="order-2 text-sm text-white/50 lg:order-1">
            {footer.copyright || `© 2026 ${companyName}.`}
          </p>

          {contactItems.length > 0 ? (
            <StaggerContainer className="order-1 grid gap-3 sm:grid-cols-2 lg:order-2 lg:flex lg:max-w-3xl lg:flex-wrap lg:justify-end">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <Icon className="h-4 w-4 shrink-0 text-sky-300" />
                    <span className="line-clamp-2">{item.label}</span>
                  </>
                );

                return (
                  <StaggerItem key={`${item.label}-${item.href || "location"}`}>
                    {item.href ? (
                      <Link
                        className="flex min-h-12 items-center gap-3 rounded-full border border-white/12 bg-white/[0.07] px-4 py-3 text-sm font-semibold leading-5 text-white/78 backdrop-blur transition duration-300 hover:border-sky-300/30 hover:bg-white/[0.11] hover:text-white"
                        href={item.href}
                        rel={item.external ? "noreferrer" : undefined}
                        target={item.external ? "_blank" : undefined}
                      >
                        {content}
                      </Link>
                    ) : (
                      <span className="flex min-h-12 items-center gap-3 rounded-full border border-white/12 bg-white/[0.07] px-4 py-3 text-sm font-semibold leading-5 text-white/78 backdrop-blur">
                        {content}
                      </span>
                    )}
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
