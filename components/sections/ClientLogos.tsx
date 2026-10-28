import type { ClientLogoItem } from "@/lib/sanity/queries";
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
      <span className="text-logo">
        {item.name}
      </span>
    );
  }

  return (
    <img
      alt={item.logo?.alt ?? item.name ?? "Client logo"}
      src={logoUrl}
    />
  );
}

export function ClientLogos({ eyebrow, title, logos = [] }: ClientLogosProps) {
  const visibleLogos = logos.filter((item) => item.name && item.featured !== false);
  const sectionEyebrow = eyebrow?.trim() || "";
  const sectionTitle = title?.trim() || "";
  const stripLabel = sectionEyebrow || sectionTitle || "";
  const repeatCount = visibleLogos.length > 0 && visibleLogos.length < 4 ? 4 : 2;
  const marqueeLogos = visibleLogos.length > 0
    ? Array.from({ length: repeatCount }, () => visibleLogos).flat()
    : [];

  if (!stripLabel && visibleLogos.length === 0) {
    return null;
  }

  return (
    <section aria-label="Client logos" className="strip" id="client-logos">
      {stripLabel ? <div className="strip-label">{stripLabel}</div> : null}

      {marqueeLogos.length > 0 ? (
        <div className="strip-track">
          {marqueeLogos.map((item, index) => {
            const logoUrl = getLogoUrl(item.logo);
            const logo = <ClientLogoImage item={item} logoUrl={logoUrl} />;

            return item.websiteUrl ? (
              <a
                aria-label={item.name}
                className="client-logo-card"
                href={item.websiteUrl}
                key={`${item.name}-${index}`}
                rel="noreferrer"
                target="_blank"
              >
                {logo}
              </a>
            ) : (
              <div
                className="client-logo-card"
                key={`${item.name}-${index}`}
              >
                {logo}
              </div>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
