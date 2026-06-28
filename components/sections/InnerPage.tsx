import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/Motion";
import type { InnerPage, SanityImageValue } from "@/lib/sanity/queries";
import { urlFor } from "@/sanity/lib/image";

type InnerPageHeroFallback = {
  eyebrow: string;
  title: string;
  description?: string;
  primaryButtonLabel?: string;
  primaryButtonLink?: string;
};

type InnerPageHeroProps = {
  page?: InnerPage;
  fallback: InnerPageHeroFallback;
  compact?: boolean;
  editorial?: boolean;
  centered?: boolean;
};

function clean(value?: string) {
  return value?.trim() || "";
}

function clampOpacity(value?: number) {
  return Math.min(Math.max(value ?? 45, 0), 100) / 100;
}

function imageUrl(image?: SanityImageValue, width = 1800, height = 1100) {
  if (!image) {
    return "";
  }

  try {
    return urlFor(image).width(width).height(height).fit("crop").auto("format").quality(88).url();
  } catch {
    return image.url?.startsWith("http") ? image.url : "";
  }
}

export function InnerPageHero({ page, fallback, compact = false, editorial = false, centered = false }: InnerPageHeroProps) {
  const eyebrow = clean(page?.heroEyebrow) || fallback.eyebrow;
  const title = clean(page?.heroTitle) || fallback.title;
  const description = clean(page?.heroDescription) || fallback.description;
  const buttonLabel = clean(page?.heroPrimaryButtonLabel) || fallback.primaryButtonLabel;
  const buttonLink = clean(page?.heroPrimaryButtonLink) || fallback.primaryButtonLink;
  const secondaryButtonLabel = clean(page?.heroSecondaryButtonLabel);
  const secondaryButtonLink = clean(page?.heroSecondaryButtonLink);
  const buttonHref = buttonLink || "";
  const backgroundUrl = imageUrl(page?.heroBackgroundImage);
  const sliderBackgroundUrl = imageUrl(page?.heroSliderImages?.[0]);
  const posterUrl = imageUrl(page?.heroPosterImage);
  const videoUrl = page?.heroMotionVideoMp4?.url;
  const overlayOpacity = clampOpacity(page?.heroOverlayOpacity);
  const hasButton = Boolean(buttonLabel && buttonHref);
  const hasSecondaryButton = Boolean(secondaryButtonLabel && secondaryButtonLink);

  return (
    <section
      className={`relative isolate overflow-hidden bg-slate-950 px-6 text-white lg:px-8 ${
        editorial ? "flex min-h-[40vh] items-center py-12 lg:min-h-[46vh] lg:py-16" : compact ? "py-16 lg:py-20" : "py-24 lg:py-28"
      }`}
    >
      {videoUrl ? (
        <video
          aria-hidden="true"
          autoPlay
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          loop
          muted
          playsInline
          poster={posterUrl || backgroundUrl || sliderBackgroundUrl || undefined}
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : backgroundUrl || sliderBackgroundUrl ? (
        <Image
          alt={page?.heroBackgroundImage?.alt || title || "Page media"}
          className="absolute inset-0 object-cover opacity-75"
          fill
          priority
          sizes="100vw"
          src={backgroundUrl || sliderBackgroundUrl}
          unoptimized
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(37,99,235,0.34),transparent_32%),linear-gradient(135deg,#020617_0%,#0f2558_54%,#071225_100%)]" />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.98)_0%,rgba(3,18,48,0.78)_46%,rgba(15,23,42,0.42)_100%)]"
        style={{ opacity: overlayOpacity }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.2),transparent_30%)]"
      />
      <FadeUp className={`relative mx-auto w-full ${
        editorial || centered ? "flex max-w-[56.25rem] flex-col items-center justify-center text-center" : "max-w-7xl"
      }`}>
        <p className={`${editorial ? "text-xs tracking-[0.25em]" : "text-sm tracking-[0.24em]"} ${editorial || centered ? "mx-auto text-center" : ""} font-semibold uppercase text-blue-200`}>
          {eyebrow}
        </p>
        <h1 className={`font-semibold tracking-tight ${
          editorial
            ? "mx-auto mt-5 max-w-[42rem] text-center text-[2.25rem] font-bold leading-[1.06] md:text-[2.5rem] lg:text-[2.625rem]"
            : `${centered ? "max-w-[56.25rem]" : "max-w-5xl"} ${compact ? "mt-4 text-4xl md:text-6xl" : "mt-5 text-5xl md:text-7xl"}`
        }`}>
          {title}
        </h1>
        {description ? (
          <p className={`${compact || editorial ? "mt-5" : "mt-6"} ${editorial ? "mx-auto max-w-[45rem] text-center text-[17px] leading-[1.8] text-slate-200/85 md:text-lg" : `${centered ? "mx-auto max-w-[45rem] text-center" : "max-w-3xl"} text-lg leading-8 text-slate-200`}`}>
            {description}
          </p>
        ) : null}
        {hasButton || hasSecondaryButton ? (
          <div className={`${compact ? "mt-7" : "mt-9"} flex flex-wrap gap-3 ${centered || editorial ? "justify-center" : ""}`}>
            {hasButton ? (
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold text-navy transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50"
                href={buttonHref}
              >
                {buttonLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
            {hasSecondaryButton ? (
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-4 text-sm font-semibold text-white backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                href={secondaryButtonLink}
              >
                {secondaryButtonLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
        ) : null}
      </FadeUp>
    </section>
  );
}

export function InnerPageCmsSections({ page }: { page?: InnerPage }) {
  const mediaTitle = clean(page?.sectionTitle);
  const mediaDescription = clean(page?.sectionDescription);
  const mediaEyebrow = clean(page?.sectionEyebrow);
  const mediaImageUrl = imageUrl(page?.sectionMediaImage, 1400, 1000);
  const mediaVideoUrl = page?.sectionMediaVideo?.url;
  const mediaLayout = page?.mediaLayout || "right";
  const hasMediaSection = Boolean(mediaTitle || mediaDescription || mediaImageUrl || mediaVideoUrl);
  const blocks = page?.contentBlocks?.filter((block) => block.blockTitle || block.blockDescription || block.items?.length) ?? [];
  const builderItems = page?.sectionBuilder?.items?.filter((item) => item.title || item.description) ?? [];
  const cardBuilderItems = page?.cardBuilder?.filter((item) => item.title || item.description) ?? [];
  const reusableCards = builderItems.length > 0 ? builderItems : cardBuilderItems;

  return (
    <>
      {hasMediaSection ? (
        <section className="bg-white px-6 py-16 lg:px-8 lg:py-20">
          <div
            className={`mx-auto grid max-w-7xl gap-10 lg:items-center ${
              mediaLayout === "full" ? "" : "lg:grid-cols-2"
            }`}
          >
            <div className={mediaLayout === "left" ? "lg:order-2" : ""}>
              {mediaEyebrow ? (
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                  {mediaEyebrow}
                </p>
              ) : null}
              {mediaTitle ? (
                <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-navy md:text-5xl">
                  {mediaTitle}
                </h2>
              ) : null}
              {mediaDescription ? (
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                  {mediaDescription}
                </p>
              ) : null}
            </div>
            {(mediaImageUrl || mediaVideoUrl) ? (
              <div
                className={`relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-[0_24px_90px_rgba(15,23,42,0.08)] ${
                  mediaLayout === "full" ? "lg:min-h-[30rem]" : ""
                } ${mediaLayout === "left" ? "lg:order-1" : ""}`}
              >
                {mediaVideoUrl ? (
                  <video
                    autoPlay
                    className="h-full min-h-[22rem] w-full object-cover"
                    loop
                    muted
                    playsInline
                    poster={mediaImageUrl || undefined}
                    preload="metadata"
                  >
                    <source src={mediaVideoUrl} />
                  </video>
                ) : (
                  <Image
                    alt={page?.sectionMediaImage?.alt || mediaTitle || "Page media"}
                    className="object-cover"
                    fill
                    sizes={mediaLayout === "full" ? "100vw" : "(min-width: 1024px) 50vw, 100vw"}
                    src={mediaImageUrl}
                    unoptimized
                  />
                )}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {blocks.length > 0 ? (
        <section className="bg-slate-50 px-6 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl space-y-12">
            {blocks.map((block) => {
              const items = block.items?.filter((item) => item.itemTitle || item.itemDescription) ?? [];

              return (
                <div key={`${block.blockTitle}-${block.blockDescription}`}>
                  <div className="max-w-3xl">
                    {block.blockTitle ? (
                      <h2 className="text-4xl font-semibold tracking-tight text-navy md:text-5xl">
                        {block.blockTitle}
                      </h2>
                    ) : null}
                    {block.blockDescription ? (
                      <p className="mt-5 text-lg leading-8 text-slate-600">
                        {block.blockDescription}
                      </p>
                    ) : null}
                  </div>
                  {items.length > 0 ? (
                    <StaggerContainer className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                      {items.map((item) => {
                        const itemImageUrl = imageUrl(item.itemImage, 900, 650);
                        const content = (
                          <article className="h-full rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.055)] transition duration-300 hover:-translate-y-1 hover:border-primary/25">
                            {itemImageUrl ? (
                              <div className="relative mb-6 h-40 overflow-hidden rounded-2xl bg-slate-100">
                                <Image
                                  alt={item.itemImage?.alt || item.itemTitle || "Content image"}
                                  className="object-cover"
                                  fill
                                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                                  src={itemImageUrl}
                                  unoptimized
                                />
                              </div>
                            ) : (
                              <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <CheckCircle2 className="h-5 w-5" />
                              </div>
                            )}
                            {item.itemTitle ? (
                              <h3 className="text-xl font-semibold tracking-tight text-navy">
                                {item.itemTitle}
                              </h3>
                            ) : null}
                            {item.itemDescription ? (
                              <p className="mt-3 text-sm leading-6 text-slate-600">
                                {item.itemDescription}
                              </p>
                            ) : null}
                          </article>
                        );

                        return (
                          <StaggerItem className="h-full" key={`${block.blockTitle}-${item.itemTitle}`}>
                            {item.itemLink ? <Link href={item.itemLink}>{content}</Link> : content}
                          </StaggerItem>
                        );
                      })}
                    </StaggerContainer>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {reusableCards.length > 0 ? (
        <section className="bg-slate-50 px-6 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            {(clean(page?.sectionBuilder?.eyebrow) || clean(page?.sectionBuilder?.title) || clean(page?.sectionBuilder?.description)) ? (
              <div className="max-w-3xl">
                {page?.sectionBuilder?.eyebrow ? (
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                    {page.sectionBuilder.eyebrow}
                  </p>
                ) : null}
                {page?.sectionBuilder?.title ? (
                  <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl">
                    {page.sectionBuilder.title}
                  </h2>
                ) : null}
                {page?.sectionBuilder?.description ? (
                  <p className="mt-5 text-lg leading-8 text-slate-600">
                    {page.sectionBuilder.description}
                  </p>
                ) : null}
              </div>
            ) : null}

            <StaggerContainer className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {reusableCards.map((item) => {
                const itemImageUrl = imageUrl(item.image, 900, 650);
                const content = (
                  <article className="h-full rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.055)] transition duration-300 hover:-translate-y-1 hover:border-primary/25">
                    {itemImageUrl ? (
                      <div className="relative mb-6 h-40 overflow-hidden rounded-2xl bg-slate-100">
                        <Image
                          alt={item.image?.alt || item.title || "Content image"}
                          className="object-cover"
                          fill
                          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                          src={itemImageUrl}
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                    )}
                    {item.title ? (
                      <h3 className="text-xl font-semibold tracking-tight text-navy">
                        {item.title}
                      </h3>
                    ) : null}
                    {item.description ? (
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    ) : null}
                  </article>
                );

                return (
                  <StaggerItem className="h-full" key={`${item.title}-${item.order ?? "card"}`}>
                    {item.ctaUrl ? <Link href={item.ctaUrl}>{content}</Link> : content}
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            {page?.sectionBuilder?.ctaLabel && page.sectionBuilder.ctaUrl ? (
              <Link
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#1c1c1c]"
                href={page.sectionBuilder.ctaUrl}
              >
                {page.sectionBuilder.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}

    </>
  );
}

export function InnerPageFooterCta({ page }: { page?: InnerPage }) {
  const ctaTitle = clean(page?.ctaTitle);
  const ctaDescription = clean(page?.ctaDescription);
  const ctaButtonLabel = clean(page?.ctaButtonLabel);
  const ctaButtonLink = clean(page?.ctaButtonLink);
  const hasCta = Boolean(ctaTitle || ctaDescription || (ctaButtonLabel && ctaButtonLink));

  if (!hasCta) {
    return null;
  }

  return (
    <section className="bg-white px-6 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_18%_24%,rgba(37,99,235,0.32),transparent_34%),linear-gradient(135deg,#020617_0%,#172554_100%)] p-8 text-white shadow-glass-lg md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            {ctaTitle ? (
              <h2 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
                {ctaTitle}
              </h2>
            ) : null}
            {ctaDescription ? (
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                {ctaDescription}
              </p>
            ) : null}
          </div>
          {ctaButtonLabel && ctaButtonLink ? (
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold text-navy transition duration-300 hover:-translate-y-1 hover:bg-blue-50"
              href={ctaButtonLink}
            >
              {ctaButtonLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
