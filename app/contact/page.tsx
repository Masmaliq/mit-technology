import { SiteHeader } from "@/components/layout/SiteHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/sections/Footer";
import { getContact } from "@/lib/sanity/fetch";
import { createCmsMetadata } from "@/lib/sanity/metadata";

export async function generateMetadata() {
  const contact = await getContact();

  return createCmsMetadata({
    page: "contact",
    path: "/contact",
    seoTitle: contact.seoTitle,
    seoDescription: contact.seoDescription,
    seoImage: contact.seoImage,
    seoKeywords: contact.seoKeywords,
    title: contact.title,
    description: contact.description,
  });
}

export default async function ContactPage() {
  const contact = await getContact();

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white px-6 py-24 text-slate-950">
        <section className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Contact MIT
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            {contact.title || "Contact content is not available yet."}
          </h1>

          {contact.description ? (
            <p className="mt-6 text-lg leading-8 text-slate-600">{contact.description}</p>
          ) : null}

          <div className="mt-8 grid gap-3 text-sm font-medium text-slate-600">
            {contact.email ? <span>{contact.email}</span> : null}
            {contact.phone ? <span>{contact.phone}</span> : null}
            {contact.whatsapp ? <span>{contact.whatsapp}</span> : null}
            {contact.address ? <span>{contact.address}</span> : null}
          </div>

          <ContactForm formTitle={contact.formTitle} formDescription={contact.formDescription} />

          {contact.googleMapsEmbed ? (
            <div
              className="mt-12 overflow-hidden rounded-[1.5rem] border border-slate-200"
              dangerouslySetInnerHTML={{ __html: contact.googleMapsEmbed }}
            />
          ) : null}
        </section>
      </main>
      <Footer />
    </>
  );
}
