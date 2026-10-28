import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { getContact, getHomepageFooterGlobals, getSiteSettings } from "@/lib/sanity/fetch";
import { createCmsMetadata } from "@/lib/sanity/metadata";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export async function generateMetadata() {
  const contact = await getContact();

  return createCmsMetadata({
    page: "contact",
    path: "/contact",
    seoTitle: contact.seoTitle,
    seoDescription: contact.seoDescription,
    seoImage: contact.seoImage,
    seoKeywords: contact.seoKeywords,
    title: contact.heroTitle || contact.title,
    description: contact.heroDescription || contact.description,
  });
}

export default async function ContactPage() {
  const [contact, globals, settings] = await Promise.all([
    getContact(),
    getHomepageFooterGlobals(),
    getSiteSettings(),
  ]);
  const whatsapp = globals.contact?.whatsappNumber || globals.footer?.whatsapp || settings.whatsapp || contact.whatsapp;
  const email = globals.contact?.primaryEmail || globals.footer?.email || settings.email || contact.email;
  const whatsappUrl = buildWhatsAppUrl(whatsapp, globals.contact?.whatsappDefaultMessage);
  const consultationTopics = contact.consultationTopics?.length ? contact.consultationTopics : ["Website", "AI Automation", "Digital Strategy", "Application", "Narapati Intelligence"];

  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden bg-white text-[#0A1330]">
        <section id="hero" className="border-b border-slate-200/80 px-5 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-36 lg:px-8 lg:pb-28 lg:pt-40" data-motion-reveal>
          <div className="mx-auto grid max-w-7xl gap-14 lg:min-h-[32rem] lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-16">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4D7FFF]">
                {contact.heroEyebrow}
              </p>
              <h1 className="mt-6 max-w-[720px] whitespace-pre-line text-[clamp(2.5rem,3.4vw,3.375rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-[#0A1330]">
                {contact.heroTitle}
              </h1>
              <p className="mt-7 max-w-xl text-base font-normal leading-[1.65] text-slate-600 sm:text-lg">
                {contact.heroDescription}
              </p>
            </div>

            <div className="border-t border-slate-300 bg-white pt-8 sm:pt-9 lg:pt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4D7FFF]">
                {contact.consultationEyebrow || "Project consultation"}
              </p>
              <h2 className="mt-5 max-w-md text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-[1.2] tracking-[-0.025em] text-[#0A1330]">
                {contact.title}
              </h2>
              <p className="mt-5 max-w-lg text-[15px] leading-[1.7] text-slate-600 sm:text-base">
                {contact.description}
              </p>
              {whatsappUrl ? (
                <a
                  className="mt-8 inline-flex h-12 w-full items-center justify-between gap-8 rounded-full bg-[#0A1330] px-5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#4D7FFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D7FFF] focus-visible:ring-offset-2 sm:w-auto"
                  href={whatsappUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>{contact.consultationButtonLabel || "Konsultasi via WhatsApp"}</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>
        </section>

        <section className="px-5 py-18 sm:px-6 sm:py-20 lg:px-8 lg:py-24" data-motion-reveal>
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4D7FFF]">
              {contact.topicsEyebrow || "We can talk about"}
            </p>
            <div className="mt-8 grid border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-5" data-motion-stagger>
              {consultationTopics.map((topic, index) => (
                <div
                  className="flex min-h-24 items-start gap-4 border-b border-slate-200 py-6 sm:pr-6 lg:min-h-32 lg:border-r lg:px-5 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
                  data-motion-item
                  data-motion-reveal
                  key={topic}
                >
                  <span className="pt-0.5 text-xs font-semibold tabular-nums text-[#4D7FFF]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-base font-semibold leading-6 text-[#0A1330]">{topic}</h2>
                </div>
              ))}
            </div>
          </div>
        </section>

        {email ? (
          <section className="border-y border-slate-200 bg-[#F7F8FA] px-5 py-16 sm:px-6 sm:py-18 lg:px-8 lg:py-20" data-motion-reveal>
            <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4D7FFF]">
                  {contact.emailEyebrow || "Other channel"}
                </p>
                <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-[#0A1330]">
                  {contact.emailPrompt || "Lebih nyaman melalui email?"}
                </h2>
              </div>
              <a
                className="group inline-flex w-fit items-center gap-3 border-b border-[#0A1330]/30 pb-2 text-base font-semibold text-[#0A1330] transition duration-300 hover:border-[#4D7FFF] hover:text-[#4D7FFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D7FFF] focus-visible:ring-offset-4"
                href={`mailto:${email}`}
              >
                {email}
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </section>
        ) : null}

        <section className="px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28" data-motion-reveal>
          <div className="mx-auto max-w-7xl">
            <h2 className="max-w-3xl text-[clamp(2.125rem,4vw,3.375rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#0A1330]">
              {contact.ctaTitle}
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-[1.7] text-slate-600 sm:text-lg">
              {contact.ctaDescription}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
