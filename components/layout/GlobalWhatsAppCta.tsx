import { getContact, getHomepageFooterGlobals, getSiteSettings } from "@/lib/sanity/fetch";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { FloatingWhatsAppCta } from "./FloatingWhatsAppCta";

export async function GlobalWhatsAppCta() {
  const [globals, settings, contactPage] = await Promise.all([
    getHomepageFooterGlobals(),
    getSiteSettings(),
    getContact(),
  ]);
  const whatsapp = globals.contact?.whatsappNumber || globals.footer?.whatsapp || settings.whatsapp || contactPage.whatsapp;
  const href = buildWhatsAppUrl(whatsapp, globals.contact?.whatsappDefaultMessage);

  return href ? <FloatingWhatsAppCta href={href} /> : null;
}
