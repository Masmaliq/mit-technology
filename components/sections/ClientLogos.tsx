import type { ClientLogoItem } from "@/lib/sanity/queries";
import { TextReveal } from "@/components/motion/Motion";
import { urlFor } from "@/sanity/lib/image";

type ClientLogosProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  logos?: ClientLogoItem[];
};

function getLogoUrl(logo?: ClientLogoItem["logo"]) {
  if (!logo) {
    return "";
  }

  const isSvg =
    logo.asset?.extension === "svg" ||
    logo.asset?.mimeType === "image/svg+xml" ||
    logo.url?.endsWith(".svg");

  if (isSvg && logo.url) {
    return logo.url;
  }

  try {
    // CMS workflow: if an uploaded logo has too much empty canvas, crop/focus it in the Sanity image editor.
    return urlFor(logo).width(900).height(300).fit("max").auto("format").quality(90).url();
  } catch {
    return logo.url?.startsWith("http") ? logo.url : "";
  }
}

function ClientLogoImage({ item, logoUrl }: { item: ClientLogoItem; logoUrl: string }) {
  if (!logoUrl) {
    return (
      <span className="max-w-full text-center text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
        {item.name}
      </span>
    );
  }

  return (
    <img
      alt={item.logo?.alt ?? item.name ?? "Client logo"}
      className="block max-h-[70px] max-w-[86%] object-contain object-center opacity-[0.55] grayscale transition duration-200 ease-out group-hover:opacity-100 group-hover:grayscale-0"
      src={logoUrl}
    />
  );
}

export function ClientLogos({ eyebrow, title, description, logos = [] }: ClientLogosProps) {
  const visibleLogos = logos.filter((item) => item.name && item.featured !== false);
  const sectionEyebrow = eyebrow?.trim() || "";
  const sectionTitle = title?.trim() || "";
  const sectionDescription = description?.trim() || "";

  return (
    <section
      aria-label="Client logos"
      id="client-logos"
      className="bg-[linear-gradient(180deg,#020817_0%,#020817_88%,#ffffff_100%)] py-12 pb-14 lg:py-16 lg:pb-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {sectionEyebrow ? (
            <TextReveal
              as="p"
              className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300/80"
              direction="down"
              mode="chars"
              stagger={0.018}
              text={sectionEyebrow}
            />
          ) : null}
          {sectionTitle ? (
            <TextReveal
              as="h2"
              className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.75rem]"
              direction="up"
              mode="words"
              text={sectionTitle}
            />
          ) : null}
          {sectionDescription ? (
            <TextReveal
              as="p"
              className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-400 md:text-base md:leading-7"
              direction="up"
              mode="lines"
              text={sectionDescription}
            />
          ) : null}
        </div>

        {visibleLogos.length > 0 ? (
          <div className="mx-auto mt-10 grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {visibleLogos.map((item) => {
              const logoUrl = getLogoUrl(item.logo);
              const logo = <ClientLogoImage item={item} logoUrl={logoUrl} />;

              return item.websiteUrl ? (
                <a
                  aria-label={item.name}
                  className="client-logo-card group flex h-[106px] w-full items-center justify-center overflow-hidden rounded-[22px] bg-white px-10 py-6"
                  href={item.websiteUrl}
                  key={item.name}
                  rel="noreferrer"
                  target="_blank"
                >
                  {logo}
                </a>
              ) : (
                <div
                  className="client-logo-card group flex h-[106px] w-full items-center justify-center overflow-hidden rounded-[22px] bg-white px-10 py-6"
                  key={item.name}
                >
                  {logo}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-2xl rounded-[1.5rem] border border-dashed border-white/20 bg-white/5 px-8 py-8 text-center">
            <p className="text-sm font-medium text-slate-300">
              Client logos are ready to be managed from Sanity Studio.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
