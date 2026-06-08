import Image from "next/image";
import type { ClientLogoItem } from "@/lib/sanity/queries";

type ClientLogosProps = {
  logos?: ClientLogoItem[];
};

export function ClientLogos({ logos = [] }: ClientLogosProps) {
  const visibleLogos = logos.filter((item) => item.name && item.logo?.url && item.featured !== false);

  return (
    <section aria-label="Client logos" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Trusted Infrastructure Partner
          </p>
        </div>

        {visibleLogos.length > 0 ? (
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 items-center gap-x-10 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {visibleLogos.map((item) => {
              const logoUrl = item.logo?.url;

              if (!logoUrl) {
                return null;
              }

              const logo = (
                <div className="relative mx-auto h-12 w-full max-w-[150px] opacity-55 grayscale transition duration-300 hover:opacity-90 hover:grayscale-0">
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
                  className="flex min-h-16 items-center justify-center"
                  href={item.websiteUrl}
                  key={item.name}
                  rel="noreferrer"
                  target="_blank"
                >
                  {logo}
                </a>
              ) : (
                <div className="flex min-h-16 items-center justify-center" key={item.name}>
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
