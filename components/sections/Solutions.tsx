import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, Check, Compass, MonitorSmartphone, Workflow } from "lucide-react";
import { StaggerContainer, StaggerItem, TextReveal } from "@/components/motion/Motion";
import type { SanityImageValue, SolutionItem } from "@/lib/sanity/queries";
import { urlFor } from "@/sanity/lib/image";

type SolutionsProps = {
  solutions?: SolutionItem[];
  previewImage?: SanityImageValue;
  variant?: "default" | "preview";
  previewEyebrow?: string;
  previewTitle?: string;
  previewDescription?: string;
  previewVisualEyebrow?: string;
  previewVisualTitle?: string;
  previewRows?: Array<{
    title?: string;
    href?: string;
    icon?: string;
  }>;
  introEyebrow?: string;
  introTitle?: string;
  introDescription?: string;
  serviceCards?: Array<{
    title?: string;
    description?: string;
    icon?: string;
    image?: SanityImageValue;
    linkLabel?: string;
    linkUrl?: string;
    link?: string;
    order?: number;
    items?: string[];
  }>;
  emptyStateText?: string;
};

type PreviewRow = {
  title?: string;
  href?: string;
  icon?: string;
};

const solutionsIntroFallback = {
  eyebrow: "",
  title: "",
  description: "",
};

const iconMap = {
  website: MonitorSmartphone,
  application: Workflow,
  ai: Bot,
  strategy: Compass,
  workflow: Workflow,
};

function getPreviewImageUrl(image?: SanityImageValue) {
  if (!image) {
    return "";
  }

  try {
    const imageUrl = urlFor(image).width(1200).height(900).fit("crop").auto("format").quality(88).url();

    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }
  } catch {
    // Fall through to the resolved Sanity asset URL.
  }

  return image.url?.startsWith("http") ? image.url : "";
}

function getIcon(icon?: string) {
  return iconMap[(icon || "").toLowerCase() as keyof typeof iconMap] || ArrowRight;
}

function SolutionsPreview({
  previewImage,
  solutions,
  eyebrow,
  title,
  description,
  visualEyebrow,
  visualTitle,
  rows,
}: {
  previewImage?: SanityImageValue;
  solutions?: SolutionItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
  visualEyebrow?: string;
  visualTitle?: string;
  rows?: PreviewRow[];
}) {
  const fallbackImage = solutions?.find((item) => item.thumbnail?.url || item.thumbnail?.asset)?.thumbnail;
  const image = previewImage || fallbackImage;
  const previewImageUrl = getPreviewImageUrl(image);
  const cmsRows = rows?.filter((item) => item.title) ?? [];
  const solutionRows =
    cmsRows.length > 0
      ? cmsRows
      : solutions
          ?.filter((item) => item.title)
          .slice(0, 3)
          .map((item) => ({
            title: item.title,
            href: item.slug ? `/solutions/${item.slug}` : "/solutions",
            icon: item.icon,
          })) ?? [];
  const displayRows = solutionRows;
  const displayEyebrow = eyebrow?.trim() || solutionsIntroFallback.eyebrow;
  const displayTitle = title?.trim() || solutionsIntroFallback.title;
  const displayDescription = description?.trim() || "";
  const displayVisualEyebrow = visualEyebrow?.trim() || "";
  const displayVisualTitle = visualTitle?.trim() || "";

  return (
    <section id="solutions" aria-label="Solutions" className="bg-white py-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
        <div className="relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-slate-200/70 bg-slate-100 shadow-[0_24px_90px_rgba(15,23,42,0.08)]">
          {previewImageUrl ? (
            <Image
              alt={image?.alt || displayTitle || "Solutions preview image"}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              src={previewImageUrl}
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_18%,rgba(37,99,235,0.22),transparent_30%),linear-gradient(135deg,#f8fbff_0%,#e9eff8_52%,#dbe7f6_100%)]" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_42%,rgba(15,23,42,0.18)_100%)]" />
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/50 bg-white/72 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {displayVisualEyebrow}
            </p>
            {displayVisualTitle ? (
              <p className="mt-2 text-lg font-semibold tracking-tight text-navy">
                {displayVisualTitle}
              </p>
            ) : null}
          </div>
        </div>

        <div className="lg:pl-6">
          {displayEyebrow ? (
            <TextReveal
              as="p"
              className="text-sm font-semibold uppercase tracking-[0.24em] text-primary"
              direction="down"
              mode="chars"
              stagger={0.018}
              text={displayEyebrow}
            />
          ) : null}
          {displayTitle ? (
            <TextReveal
              as="h2"
              className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-navy md:text-5xl"
              direction="left"
              mode="words"
              text={displayTitle}
            />
          ) : null}
          {displayDescription ? (
            <TextReveal
              as="p"
              className="mt-5 max-w-2xl text-lg leading-8 text-slate-600"
              direction="up"
              mode="lines"
              text={displayDescription}
            />
          ) : null}

          {displayRows.length > 0 ? (
            <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
              {displayRows.map((item) => {
              const Icon = getIcon(item.icon);

              return (
                <Link
                  className="group -mx-3 flex items-center gap-5 rounded-2xl px-3 py-5 transition duration-300 hover:bg-slate-50"
                  href={item.href || "/solutions"}
                  key={item.title}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex-1 text-lg font-semibold tracking-tight text-navy">
                    {item.title}
                  </span>
                  <ArrowRight className="h-5 w-5 text-slate-400 transition duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function Solutions({
  solutions,
  previewImage,
  variant = "default",
  previewEyebrow,
  previewTitle,
  previewDescription,
  previewVisualEyebrow,
  previewVisualTitle,
  previewRows,
  introEyebrow,
  introTitle,
  introDescription,
  serviceCards,
  emptyStateText,
}: SolutionsProps) {
  const eyebrow = introEyebrow?.trim() || solutionsIntroFallback.eyebrow;
  const title = introTitle?.trim() || solutionsIntroFallback.title;
  const description = introDescription?.trim() || solutionsIntroFallback.description;
  const cards = serviceCards?.filter((card) => card.title) ?? [];

  if (variant === "preview") {
    return (
      <SolutionsPreview
        description={introDescription || previewDescription}
        eyebrow={introEyebrow || previewEyebrow}
        previewImage={previewImage}
        rows={previewRows}
        solutions={solutions}
        title={introTitle || previewTitle}
        visualEyebrow={previewVisualEyebrow}
        visualTitle={previewVisualTitle}
      />
    );
  }

  return (
    <section id="solutions" aria-label="Solutions" className="bg-slate-50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            {eyebrow ? (
              <TextReveal
                as="p"
                className="text-sm font-semibold uppercase tracking-[0.24em] text-primary"
                direction="down"
                mode="chars"
                stagger={0.018}
                text={eyebrow}
              />
            ) : null}
            {title ? (
              <TextReveal
                as="h2"
                className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl"
                direction="left"
                mode="words"
                text={title}
              />
            ) : null}
            {description ? (
              <TextReveal
                as="p"
                className="mt-5 text-lg leading-8 text-slate-600"
                direction="up"
                mode="lines"
                text={description}
              />
            ) : null}
          </div>
        </div>

        <StaggerContainer className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {cards.length > 0 ? cards.map((card) => {
            const Icon = getIcon(card.icon);
            const cardHref = card.linkUrl || card.link || "/solutions";
            const cardItems = card.items?.filter(Boolean) ?? [];
            const cardImageUrl = getPreviewImageUrl(card.image);

            return (
              <StaggerItem className="h-full" key={card.title}>
                <Link
                  href={cardHref}
                  className="group flex min-h-full flex-col rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.055)] transition duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-[0_28px_86px_rgba(37,99,235,0.11)]"
                >
                  <div className="flex items-start justify-between gap-6">
                    {cardImageUrl ? (
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
                        <Image
                          alt={card.image?.alt || card.title || ""}
                          className="object-cover"
                          fill
                          sizes="56px"
                          src={cardImageUrl}
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="rounded-2xl bg-primary/10 p-3 text-primary transition duration-300 group-hover:bg-primary group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                    )}
                    <ArrowRight className="h-5 w-5 text-slate-400 transition duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                  <h3 className="mt-7 text-2xl font-semibold tracking-tight text-navy">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
                  <div className="mt-6 space-y-2.5">
                    {cardItems.map((feature) => (
                      <div
                        className="flex items-center gap-3 text-sm font-medium text-slate-600"
                        key={`${card.title}-${feature}`}
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {feature}
                      </div>
                    ))}
                  </div>
                  {card.linkLabel ? (
                    <span className="mt-auto pt-6 text-sm font-semibold text-primary">
                      {card.linkLabel}
                    </span>
                  ) : null}
                </Link>
              </StaggerItem>
            );
          }) : (
            <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600 md:col-span-2 xl:col-span-4">
              {emptyStateText || "Konten solusi belum tersedia."}
            </div>
          )}
        </StaggerContainer>
      </div>
    </section>
  );
}
