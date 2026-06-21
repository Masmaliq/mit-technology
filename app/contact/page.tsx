import Image from "next/image";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/sections/Footer";
import { getContact } from "@/lib/sanity/fetch";
import { createCmsMetadata } from "@/lib/sanity/metadata";

function clampOpacity(value?: number) {
  return Math.min(Math.max(value ?? 35, 0), 100) / 100;
}

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
  const contact = await getContact();
  const heroEyebrow = contact.heroEyebrow || "";
  const heroTitle = contact.heroTitle || contact.title || "";
  const heroDescription = contact.heroDescription || contact.description || "";
  const heroBackgroundImage = contact.heroBackgroundImage?.url;
  const heroBackgroundVideo = contact.heroBackgroundVideo?.url;
  const heroOverlayOpacity = clampOpacity(contact.heroOverlayOpacity);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white px-6 py-24 text-slate-950">
        <section className="relative isolate mx-auto max-w-3xl overflow-hidden rounded-[2rem] px-0 py-0">
          {heroBackgroundVideo ? (
            <video
              aria-hidden="true"
              autoPlay
              className="absolute inset-0 h-full w-full object-cover"
              loop
              muted
              playsInline
              poster={heroBackgroundImage || undefined}
              preload="metadata"
            >
              <source src={heroBackgroundVideo} type="video/mp4" />
            </video>
          ) : heroBackgroundImage ? (
            <Image
              alt={contact.heroBackgroundImage?.alt || ""}
              aria-hidden="true"
              className="absolute inset-0 object-cover"
              fill
              sizes="100vw"
              src={heroBackgroundImage}
              unoptimized
            />
          ) : null}
          {heroBackgroundVideo || heroBackgroundImage ? (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-white"
              style={{ opacity: heroOverlayOpacity }}
            />
          ) : null}
          <div className="relative p-0">
          {heroEyebrow ? (
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              {heroEyebrow}
            </p>
          ) : null}

          {heroTitle ? (
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              {heroTitle}
            </h1>
          ) : null}

          {heroDescription ? (
            <p className="mt-6 text-lg leading-8 text-slate-600">
              {heroDescription}
            </p>
          ) : null}

          <div className="mt-8 grid gap-3 text-sm font-medium text-slate-600">
            {contact.email ? <span>{contact.email}</span> : null}
            {contact.phone ? <span>{contact.phone}</span> : null}
            {contact.whatsapp ? <span>{contact.whatsapp}</span> : null}
            {contact.address ? <span>{contact.address}</span> : null}
          </div>

          <ContactForm
            companyPlaceholder={contact.companyPlaceholder}
            emailPlaceholder={contact.emailPlaceholder}
            errorPrefix={contact.errorPrefix}
            formDescription={contact.formDescription}
            formTitle={contact.formTitle}
            messagePlaceholder={contact.messagePlaceholder}
            namePlaceholder={contact.namePlaceholder}
            phonePlaceholder={contact.phonePlaceholder}
            submitButtonLabel={contact.submitButtonLabel}
            submittingLabel={contact.submittingLabel}
            successMessage={contact.successMessage}
          />

          {contact.ctaTitle || contact.ctaDescription ? (
            <div className="mt-12 rounded-[1.5rem] border border-slate-200 p-6">
              {contact.ctaTitle ? (
                <h2 className="text-2xl font-semibold text-slate-950">{contact.ctaTitle}</h2>
              ) : null}
              {contact.ctaDescription ? (
                <p className="mt-3 leading-7 text-slate-600">{contact.ctaDescription}</p>
              ) : null}
            </div>
          ) : null}

          {contact.googleMapsEmbed ? (
            <div
              className="mt-12 overflow-hidden rounded-[1.5rem] border border-slate-200"
              dangerouslySetInnerHTML={{ __html: contact.googleMapsEmbed }}
            />
          ) : null}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
