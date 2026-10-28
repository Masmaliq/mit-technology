import Link from "next/link";
import { getHomepageFooterGlobals, getSiteSettings } from "@/lib/sanity/fetch";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import styles from "./HomepageEditorialFooter.module.css";

export async function HomepageEditorialFooter() {
  const [globals, settings] = await Promise.all([getHomepageFooterGlobals(), getSiteSettings()]);
  const footer = globals.footer || {};
  const contact = globals.contact || {};
  const identity = globals.identity || {};
  const social = globals.social || {};
  const navigationSource = globals.navigation?.menuItems?.filter((item) => item.label && item.href && item.href !== "/") || [];

  const companyName = identity.siteName || identity.shortName || contact.displayName || contact.companyName || settings.companyName || settings.siteTitle || "Emitech";
  const description = footer.description || identity.shortDescription || identity.tagline || settings.description || settings.tagline || "";
  const email = contact.primaryEmail || footer.email || settings.email || "";
  const phone = contact.phone || footer.phone || settings.phone || "";
  const whatsapp = contact.whatsappNumber || footer.whatsapp || settings.whatsapp || "";
  const address = [contact.addressLine1, contact.addressLine2, contact.city, contact.province, contact.postalCode, contact.country].filter(Boolean).join(", ") || footer.address || settings.address || "";

  const navigation = footer.navigationLinks?.filter((item) => item.label && item.link).length
    ? footer.navigationLinks.filter((item) => item.label && item.link).map((item) => ({ label: item.label || "", href: item.link || "/" }))
    : navigationSource.length
      ? navigationSource.map((item) => ({ label: item.label || "", href: item.href || "/" }))
      : [
        { label: "Work", href: "/work" },
        { label: "Services", href: "/services" },
        { label: "Pricing", href: "/pricing" },
        { label: "About", href: "/about" },
        ];

  const canonicalSocials = [
    { label: social.instagramLabel || "Instagram", href: social.instagramUrl },
    { label: social.tiktokLabel || "TikTok", href: social.tiktokUrl },
    { label: social.linkedinLabel || "LinkedIn", href: social.linkedinUrl },
    { label: social.youtubeLabel || "YouTube", href: social.youtubeUrl },
    { label: social.facebookLabel || "Facebook", href: social.facebookUrl },
    { label: social.twitterLabel || "X", href: social.twitterUrl },
    ...(social.additionalLinks || []).map((item) => ({ label: item.label || item.platform || "Social", href: item.url })),
  ].filter((item): item is { label: string; href: string } => Boolean(item.href));
  const socials = canonicalSocials.length
    ? canonicalSocials
    : (footer.socialLinks || []).filter((item) => item.platform && item.url).map((item) => ({ label: item.platform || "Social", href: item.url || "" }));

  const contacts = [
    whatsapp && footer.showPhone !== false ? { label: "WhatsApp", value: whatsapp, href: buildWhatsAppUrl(whatsapp, contact.whatsappDefaultMessage) } : null,
    email && footer.showEmail !== false ? { label: "Email", value: email, href: `mailto:${email}` } : null,
    phone && footer.showPhone !== false ? { label: "Phone", value: phone, href: `tel:${phone.replace(/\s/g, "")}` } : null,
  ].filter(Boolean) as Array<{ label: string; value: string; href: string }>;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/">{companyName}</Link>
            {description ? <p>{description}</p> : null}
            {address && footer.showAddress !== false ? <address>{address}</address> : null}
          </div>

          {navigation.length ? (
            <nav aria-label="Footer navigation" className={styles.column}>
              <p className={styles.label}>Navigation</p>
              {navigation.map((item) => <Link href={item.href} key={`${item.label}-${item.href}`}>{item.label}</Link>)}
            </nav>
          ) : null}

          {contacts.length ? (
            <div className={styles.column}>
              <p className={styles.label}>Contact</p>
              {contacts.map((item) => (
                <a href={item.href} key={item.label} rel={item.label === "WhatsApp" ? "noreferrer" : undefined} target={item.label === "WhatsApp" ? "_blank" : undefined}>
                  <span>{item.label}</span>{item.value}
                </a>
              ))}
            </div>
          ) : null}

          {socials.length && footer.showSocialMedia !== false ? (
            <div className={styles.column}>
              <p className={styles.label}>Social</p>
              {socials.map((item) => <a href={item.href} key={`${item.label}-${item.href}`} rel="noreferrer" target="_blank">{item.label}</a>)}
            </div>
          ) : null}
        </div>

        <div className={styles.legal}>
          <p>{footer.copyright || `© 2026 ${companyName}`}</p>
          <div>
            {footer.privacyPolicyLink ? <Link href={footer.privacyPolicyLink}>Privacy Policy</Link> : null}
            {footer.termsLink ? <Link href={footer.termsLink}>Terms</Link> : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
