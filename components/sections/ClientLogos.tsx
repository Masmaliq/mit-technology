import Image from "next/image";
import type { ClientLogoItem } from "@/lib/sanity/queries";
import { urlFor } from "@/sanity/lib/image";

type ClientLogosProps = {
  logos?: ClientLogoItem[];
};

function getLogoUrl(logo?: ClientLogoItem["logo"]) {
  if (!logo) {
    return "";
  }

  try {
    return urlFor(logo).width(300).height(96).fit("max").auto("format").url();
  } catch {
    return logo.url ?? "";
  }
}

export function ClientLogos({ logos = [] }: ClientLogosProps) {
  const visibleLogos = logos.filter((item) => item.name && getLogoUrl(item.logo) && item.featured !== false);

  return (
    <section aria-label="Client logos" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Trusted Infrastructure Partner
          </p>
        </div>

        {visibleLogos.length > 0 ? (
          <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleLogos.map((item) => {
              const logoUrl = getLogoUrl(item.logo);

              if (!logoUrl) {
                return null;
              }

              const logo = (
                <div className="relative h-[72px] w-full max-w-[220px] opacity-65 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0">
                  <Image
                    alt={item.logo?.alt ?? item.name ?? "Client logo"}
                    className="object-contain"
                    fill
                    sizes="150px"
                    src={logoUrl}
                  />
                </div>
              );

              return item.websiteUrl ? (
                <a
                  aria-label={item.name}
                  className="group flex h-[120px] w-full max-w-[300px] items-center justify-center rounded-2xl border border-slate-200/60 bg-white px-10 shadow-[0_10px_30px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-1 hover:border-slate-300/70 hover:shadow-[0_18px_48px_rgba(15,23,42,0.07)]"
                  href={item.websiteUrl}
                  key={item.name}
                  rel="noreferrer"
                  target="_blank"
                >
                  {logo}
                </a>
              ) : (
                <div
                  className="group flex h-[120px] w-full max-w-[300px] items-center justify-center rounded-2xl border border-slate-200/60 bg-white px-10 shadow-[0_10px_30px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-1 hover:border-slate-300/70 hover:shadow-[0_18px_48px_rgba(15,23,42,0.07)]"
                  key={item.name}
                >
                  {logo}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-2xl rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 px-8 py-8 text-center">
            <p className="text-sm font-medium text-slate-500">
              Client logos are ready to be managed from Sanity Studio.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
