import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { FadeUp, ScaleIn, StaggerContainer, StaggerItem, TextReveal } from "@/components/motion/Motion";
import type { PackageItem } from "@/lib/sanity/queries";

type PricingProps = {
  packages?: PackageItem[];
  variant?: "default" | "preview";
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  supportItems?: Array<{
    title?: string;
    description?: string;
  }>;
  cardLabel?: string;
  featuredCardLabel?: string;
  featuredBadgeLabel?: string;
  priceLabel?: string;
  scopeLabel?: string;
  packageCtaLabel?: string;
  packageCtaHref?: string;
  emptyStateText?: string;
};

function PricingPreview({
  packages,
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  supportItems,
  cardLabel,
  featuredCardLabel,
  featuredBadgeLabel,
  priceLabel,
  packageCtaLabel,
  packageCtaHref,
  emptyStateText,
}: PricingProps) {
  const items = packages?.filter((item) => item.title).slice(0, 3) ?? [];
  const displayEyebrow = eyebrow?.trim() || "";
  const displayTitle = title?.trim() || "";
  const displayDescription = description?.trim() || "";
  const displayCtaLabel = ctaLabel?.trim() || "";
  const displayCtaHref = ctaHref?.trim() || "";
  const displayCardLabel = cardLabel?.trim() || "Engagement";
  const displayFeaturedCardLabel = featuredCardLabel?.trim() || displayCardLabel;
  const displayFeaturedBadgeLabel = featuredBadgeLabel?.trim() || "Featured";
  const displayPriceLabel = priceLabel?.trim() || "Starting from";
  const displayPackageCtaLabel = packageCtaLabel?.trim() || "";
  const displayPackageCtaHref = packageCtaHref?.trim() || "";
  const displaySupportItems = supportItems?.filter((item) => item.title || item.description) ?? [];
  const cleanDescription = (value?: string) => value?.replace(/\s+D\s*$/, "").trim();
  const hasHeading = Boolean(displayEyebrow || displayTitle || displayDescription || (displayCtaLabel && displayCtaHref));
  const hasPackageCta = Boolean(displayPackageCtaLabel && displayPackageCtaHref);

  if (!hasHeading && items.length === 0 && displaySupportItems.length === 0) {
    return null;
  }

  return (
    <section id="pricing" aria-label="Packages" className="bg-white py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {hasHeading ? (
        <FadeUp subtle className="grid gap-5 md:gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            {displayEyebrow ? (
              <TextReveal
                as="p"
                className="text-xs font-semibold uppercase tracking-[0.32em] text-primary"
                direction="down"
                mode="chars"
                stagger={0.018}
                text={displayEyebrow}
              />
            ) : null}
            {displayTitle ? (
              <TextReveal
                as="h2"
                className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 md:mt-4 md:text-5xl"
                direction="left"
                mode="words"
                text={displayTitle}
              />
            ) : null}
          </div>
          <div className="max-w-2xl lg:justify-self-end">
            {displayDescription ? (
                <TextReveal
                  as="p"
                  className="text-base leading-7 text-slate-600 md:text-lg md:leading-8"
                  direction="up"
                  mode="lines"
                  text={displayDescription}
                />
              ) : null}
              {displayCtaLabel && displayCtaHref ? (
              <Link
                href={displayCtaHref}
                className="group mt-6 hidden items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_44px_rgba(15,23,42,0.14)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1c1c1c] md:inline-flex"
              >
                {displayCtaLabel}
                <ArrowRight className="h-4 w-4 transition duration-300 ease-out group-hover:translate-x-1" />
              </Link>
              ) : null}
          </div>
        </FadeUp>
        ) : null}

        <StaggerContainer className="mt-8 grid gap-4 lg:grid-cols-3">
          {items.length > 0 ? items.map((item) => {
            const features = item.features?.filter(Boolean) ?? [];
            const pills = features.slice(0, 4);
            const details = features.slice(4);

            return (
            <StaggerItem
              className={`group flex min-h-0 flex-col rounded-[1.5rem] border bg-white p-4 shadow-[0_16px_56px_rgba(15,23,42,0.055)] transition duration-[350ms] ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_86px_rgba(15,23,42,0.11)] focus-within:-translate-y-1.5 focus-within:shadow-[0_28px_86px_rgba(15,23,42,0.11)] md:min-h-[25rem] md:p-5 ${
                item.featured
                  ? "border-primary/40 shadow-[0_22px_76px_rgba(37,99,235,0.09)] ring-1 ring-primary/10 hover:border-primary/55 hover:shadow-[0_34px_104px_rgba(37,99,235,0.16)]"
                  : "border-slate-200/85 hover:border-primary/20 focus-within:border-primary/20"
              }`}
              key={item.title}
            >
              <article className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <p className={`text-[0.68rem] font-semibold uppercase tracking-[0.22em] ${item.featured ? "text-primary" : "text-slate-500"}`}>
                    {item.featured ? displayFeaturedCardLabel : displayCardLabel}
                  </p>
                  {item.featured ? (
                    <span className="rounded-full border border-primary/25 bg-primary/5 px-2.5 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-primary md:px-3 md:py-1 md:text-[0.65rem] md:tracking-[0.18em]">
                      {displayFeaturedBadgeLabel}
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 md:mt-5">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 md:mt-3 md:min-h-[4.75rem]">
                    {cleanDescription(item.description)}
                </p>

                <div className="mt-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 px-4 py-3 md:mt-5 md:py-4">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {displayPriceLabel}
                  </p>
                  <p className="mt-1.5 text-3xl font-semibold tracking-tight text-slate-950 md:mt-2">
                    {item.startingPrice}
                  </p>
                </div>

                <div className="mt-3 grid gap-1.5 md:mt-5 md:flex md:flex-wrap md:gap-2">
                  {pills.map((pill) => (
                    <span
                      className="rounded-xl border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 md:rounded-full md:py-1.5"
                      key={`${item.title}-${pill}`}
                    >
                      {pill}
                    </span>
                  ))}
                </div>

                <div className="mt-3 overflow-hidden opacity-100 transition-all duration-500 ease-out md:mt-4 md:max-h-0 md:opacity-0 md:group-hover:max-h-72 md:group-hover:opacity-100 md:group-focus-within:max-h-72 md:group-focus-within:opacity-100">
                  <div className="grid gap-1.5 border-t border-slate-200 pt-3 md:gap-2 md:pt-4">
                  {details.map((detail) => (
                      <div className="flex items-start gap-2 text-xs font-medium leading-5 text-slate-600" key={`${item.title}-${detail}`}>
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>

                {hasPackageCta ? (
                <div className="mt-auto pt-4 md:pt-5">
                  <Link
                    className={`group/package-cta inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition duration-300 ${
                      item.featured
                        ? "bg-slate-950 text-white hover:-translate-y-0.5 hover:bg-[#1c1c1c]"
                        : "border border-slate-300 bg-white text-slate-950 hover:-translate-y-0.5 hover:border-slate-950"
                    }`}
                    href={displayPackageCtaHref}
                  >
                    {displayPackageCtaLabel}
                    <ArrowRight className="h-4 w-4 transition duration-300 ease-out group-hover/package-cta:translate-x-1" />
                  </Link>
                </div>
                ) : null}
              </article>
            </StaggerItem>
          );
          }) : (
            <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600 lg:col-span-3">
              {emptyStateText || "Packages are not available yet."}
            </div>
          )}
        </StaggerContainer>

        {displaySupportItems.length > 0 ? (
        <div className="mt-6 rounded-[1.35rem] border border-slate-200 bg-slate-50/80 px-5 py-4">
          <div className="grid gap-3 text-sm text-slate-600 md:grid-cols-3">
            {displaySupportItems.map((item) => (
              <p key={`${item.title}-${item.description}`}>
                {item.title ? <span className="font-semibold text-slate-950">{item.title}</span> : null}
                {item.title && item.description ? " " : null}
                {item.description}
              </p>
            ))}
          </div>
        </div>
        ) : null}
      </div>
    </section>
  );
}

export function Pricing({
  packages,
  variant = "default",
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  supportItems,
  cardLabel,
  featuredCardLabel,
  featuredBadgeLabel,
  priceLabel,
  scopeLabel,
  packageCtaLabel,
  packageCtaHref,
  emptyStateText,
}: PricingProps) {
  if (variant === "preview") {
    return (
      <PricingPreview
        cardLabel={cardLabel}
        ctaHref={ctaHref}
        ctaLabel={ctaLabel}
        description={description}
        emptyStateText={emptyStateText}
        eyebrow={eyebrow}
        featuredBadgeLabel={featuredBadgeLabel}
        featuredCardLabel={featuredCardLabel}
        packageCtaHref={packageCtaHref}
        packageCtaLabel={packageCtaLabel}
        packages={packages}
        priceLabel={priceLabel}
        supportItems={supportItems}
        title={title}
      />
    );
  }

  const items = packages?.filter((item) => item.title) ?? [];

  return (
    <section id="pricing" aria-label="Pricing" className="bg-white pt-10 pb-8 lg:pt-16 lg:pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
              {eyebrow || "Packages"}
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
              {title || "Packages"}
            </h2>
          </div>
          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-lg leading-8 text-slate-600">
              {description}
            </p>
            <Link
              href={ctaHref || "/contact"}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(15,23,42,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1c1c1c] md:px-6 md:py-4"
            >
              {ctaLabel || "Contact"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <StaggerContainer className="mt-8 grid auto-rows-fr gap-5 lg:grid-cols-3">
          {items.length > 0 ? (
            items.map((item) => {
              const features = item.features?.filter(Boolean) ?? [];
              const previewFeatures = features.slice(0, 6);

              return (
                <StaggerItem className="h-full" key={item.slug || item.title}>
                  <ScaleIn className="h-full">
                    <article
                      className={`group flex h-full min-h-full flex-col rounded-[1.75rem] border bg-white p-4 shadow-[0_22px_80px_rgba(15,23,42,0.055)] transition duration-[350ms] ease-out hover:-translate-y-2.5 hover:scale-[1.015] hover:shadow-[0_36px_110px_rgba(15,23,42,0.12)] ${
                        item.featured
                          ? "border-primary/35 ring-1 ring-primary/15 hover:border-primary/55"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                          {item.featured ? featuredCardLabel || cardLabel || "Featured" : cardLabel || "Package"}
                        </p>
                        <h3 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                          {item.title}
                        </h3>
                      </div>
                      {item.featured ? (
                        <span className="rounded-full border border-primary/25 bg-primary/5 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                          {featuredBadgeLabel || "Featured"}
                        </span>
                      ) : null}
                    </div>

                    {item.description ? (
                      <p className="mt-2 min-h-[4.5rem] max-w-2xl overflow-hidden text-sm leading-6 text-slate-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                        {item.description}
                      </p>
                    ) : null}

                    <div className="mt-3 border-y border-slate-200 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        {priceLabel || "Price"}
                      </p>
                      <p className="mt-1.5 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                        {item.startingPrice || "Custom"}
                      </p>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-semibold text-slate-950">{scopeLabel || "Scope"}</p>
                        <p className="text-sm text-slate-500">{features.length} items</p>
                      </div>
                      <div className="mt-2.5 grid gap-1.5">
                        {previewFeatures.map((feature) => (
                          <div
                            className="flex items-start gap-2 rounded-lg border border-slate-200/80 bg-slate-50/70 px-2.5 py-1.5 md:px-3"
                            key={`${item.title}-${feature}`}
                          >
                            <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-[0_6px_18px_rgba(15,23,42,0.08)]">
                              <Check className="h-2.5 w-2.5" />
                            </span>
                            <span className="text-[13px] font-medium leading-5 text-slate-700 md:text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                      {features.length > previewFeatures.length ? (
                        <p className="mt-2 text-sm font-medium text-slate-500">
                          +{features.length - previewFeatures.length} additional scope items
                        </p>
                      ) : null}
                    </div>

                    <div className="mt-auto pt-3">
                      <Link
                        href={packageCtaHref || ctaHref || "/contact"}
                        className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 ${
                          item.featured
                            ? "bg-slate-950 text-white hover:-translate-y-0.5 hover:bg-[#1c1c1c]"
                            : "border border-slate-300 bg-white text-slate-950 hover:-translate-y-0.5 hover:border-slate-950"
                        }`}
                      >
                        {packageCtaLabel || ctaLabel || "Contact"}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    </article>
                  </ScaleIn>
                </StaggerItem>
              );
            })
          ) : (
            <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600 lg:col-span-2">
              {emptyStateText || "Content is not available."}
            </div>
          )}
        </StaggerContainer>

        {supportItems?.length ? (
        <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-slate-50/80 px-6 py-5 sm:px-8">
          <div className="grid gap-4 text-sm text-slate-600 md:grid-cols-3">
            {supportItems.map((item) => (
              <p key={`${item.title}-${item.description}`}>
                {item.title ? <span className="font-semibold text-slate-950">{item.title}</span> : null}
                {item.title && item.description ? " " : null}
                {item.description}
              </p>
            ))}
          </div>
        </div>
        ) : null}
      </div>
    </section>
  );
}
