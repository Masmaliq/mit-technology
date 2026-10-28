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

function toSafeAnchor(value?: string) {
  return (value || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getSolutionAnchor(title?: string, slug?: string) {
  const titleAnchorMap: Record<string, string> = {
    "website-development": "website-development",
    "web-applications": "web-applications",
    "ai-automation": "ai-automation",
    "digital-strategy": "digital-strategy",
    "narapati-intelligence": "narapati-intelligence",
  };
  const titleSlug = toSafeAnchor(title);
  const mappedTitle = titleAnchorMap[titleSlug];
  const safeSlug = toSafeAnchor(slug);
  const slugLooksLikeDescription = safeSlug.length > 48 || safeSlug.split("-").length > 6;

  return mappedTitle || (!slugLooksLikeDescription ? safeSlug : "") || titleSlug;
}

function getPreviewRowHref(row: PreviewRow) {
  const href = row.href?.trim();

  if (!href) {
    return `/solutions#${toSafeAnchor(row.title)}`;
  }

  if (href.startsWith("http") || href.startsWith("/")) {
    return href;
  }

  if (href.startsWith("#")) {
    return `/solutions${href}`;
  }

  return `/solutions#${toSafeAnchor(href)}`;
}

function SolutionsPreview({
  solutions,
  eyebrow,
  title,
  description,
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
  const cmsRows = rows
    ?.filter((item) => item.title)
    .map((item) => ({
      title: item.title,
      description: undefined as string | undefined,
      href: getPreviewRowHref(item),
      icon: item.icon,
    })) ?? [];
  const solutionItems = solutions?.filter((item) => item.title) ?? [];
  const narapatiItem = solutionItems.find((item) => toSafeAnchor(item.title) === "narapati-intelligence");
  const visibleSolutionItems = narapatiItem
    ? [...solutionItems.filter((item) => item !== narapatiItem).slice(0, 4), narapatiItem]
    : solutionItems.slice(0, 5);
  const solutionRows = visibleSolutionItems
    .map((item) => ({
      title: item.title,
      description: item.shortDescription || item.fullDescription,
      href: `/solutions#${getSolutionAnchor(item.title, item.slug)}`,
      icon: item.icon,
    }));
  const displayRows = cmsRows.length > 0 ? cmsRows : solutionRows;
  const displayEyebrow = eyebrow?.trim() || solutionsIntroFallback.eyebrow;
  const displayTitle = title?.trim() || solutionsIntroFallback.title;
  const displayDescription = description?.trim() || "";
  const hasContent = Boolean(displayEyebrow || displayTitle || displayDescription || displayRows.length > 0);

  if (!hasContent) {
    return null;
  }

  return (
    <section id="solutions" aria-label="Solutions" className="solutions-section">
      <div className="solutions-wrap">
        <div className="solutions-head">
          <div>
            {displayEyebrow ? (
            <TextReveal
              as="p"
                className="solutions-eyebrow"
              direction="down"
              mode="chars"
              stagger={0.018}
              text={displayEyebrow}
            />
          ) : null}
          {displayTitle ? (
            <TextReveal
              as="h2"
                className="solutions-title"
              direction="left"
              mode="words"
              text={displayTitle}
            />
          ) : null}
          </div>
          {displayDescription ? (
            <TextReveal
              as="p"
              className="solutions-description"
              direction="up"
              mode="lines"
              text={displayDescription}
            />
          ) : null}
        </div>

        {displayRows.length > 0 ? (
          <StaggerContainer className="solution-grid">
            {displayRows.map((item, index) => (
              <StaggerItem className="solution-card-wrap" key={item.title}>
                <Link className="solution-card" href={item.href || "/solutions"}>
                  <span className="solution-num">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="solution-card-title">
                    {item.title}
                  </span>
                    {item.description ? (
                      <span className="solution-card-description">{item.description}</span>
                    ) : null}
                  </span>
                  <span className="solution-arrow">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : null}
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
