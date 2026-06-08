import type { ClientLogoItem } from "@/lib/sanity/queries";
import { ScaleIn } from "@/components/motion/Motion";
import { urlFor } from "@/sanity/lib/image";

type ClientLogosProps = {
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
    <div className="flex h-full w-full items-center justify-center overflow-visible">
      <img
        alt={item.logo?.alt ?? item.name ?? "Client logo"}
        className="block h-full w-full object-contain object-center opacity-[0.85] grayscale transition duration-300 ease-out group-hover:opacity-100 group-hover:grayscale-0"
        src={logoUrl}
      />
    </div>
  );
}

export function ClientLogos({ logos = [] }: ClientLogosProps) {
  const visibleLogos = logos.filter((item) => item.name && item.featured !== false);

  return (
    <section aria-label="Client logos" className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-300">
            TRUSTED INFRASTRUCTURE PARTNER
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            Selected companies, platforms, and internal brands supported by MIT Technology.
          </p>
        </div>

        {visibleLogos.length > 0 ? (
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {visibleLogos.map((item, index) => {
              const logoUrl = getLogoUrl(item.logo);

              const logo = <ClientLogoImage item={item} logoUrl={logoUrl} />;

              return item.websiteUrl ? (
                <ScaleIn className="h-full" key={item.name}>
                  <a
                    aria-label={item.name}
                    className="client-logo-card group flex aspect-[2.4/1] w-full items-center justify-center rounded-[24px] border border-slate-200/70 bg-white px-[22px] py-4 shadow-[0_16px_48px_rgba(0,0,0,0.18)] transition duration-[350ms] ease-out hover:-translate-y-2.5 hover:scale-[1.015] hover:border-slate-300 hover:shadow-[0_34px_86px_rgba(0,0,0,0.34)] lg:aspect-[2.7/1] lg:px-7 lg:py-[18px]"
                    href={item.websiteUrl}
                    rel="noreferrer"
                    style={{ animationDelay: `${index * 100}ms` }}
                    target="_blank"
                  >
                    {logo}
                  </a>
                </ScaleIn>
              ) : (
                <ScaleIn className="h-full" key={item.name}>
                  <div
                    className="client-logo-card group flex aspect-[2.4/1] w-full items-center justify-center rounded-[24px] border border-slate-200/70 bg-white px-[22px] py-4 shadow-[0_16px_48px_rgba(0,0,0,0.18)] transition duration-[350ms] ease-out hover:-translate-y-2.5 hover:scale-[1.015] hover:border-slate-300 hover:shadow-[0_34px_86px_rgba(0,0,0,0.34)] lg:aspect-[2.7/1] lg:px-7 lg:py-[18px]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {logo}
                  </div>
                </ScaleIn>
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
