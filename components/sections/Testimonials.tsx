import { Star } from "lucide-react";
import { StaggerContainer, StaggerItem, TextReveal } from "@/components/motion/Motion";
import type { SanityImageValue, TestimonialItem } from "@/lib/sanity/queries";
import { TestimonialAvatar } from "@/components/sections/TestimonialAvatar";

type TestimonialsProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  testimonials?: TestimonialItem[];
};

function isSvgImage(image?: SanityImageValue) {
  const extension = image?.asset?.extension?.toLowerCase();
  const mimeType = image?.asset?.mimeType?.toLowerCase();
  const url = image?.asset?.url || image?.url || "";

  return extension === "svg" || mimeType === "image/svg+xml" || url.toLowerCase().includes(".svg");
}

function getAvatarImageUrl(testimonial: TestimonialItem) {
  const imageUrl =
    testimonial.image?.asset?.url ||
    testimonial.photo?.asset?.url ||
    testimonial.avatar?.asset?.url ||
    testimonial.logo?.asset?.url ||
    testimonial.clientLogo?.asset?.url ||
    testimonial.image?.url ||
    testimonial.photo?.url ||
    testimonial.avatar?.url ||
    testimonial.logo?.url ||
    testimonial.clientLogo?.url ||
    null;

  return typeof imageUrl === "string" && imageUrl.startsWith("http") ? imageUrl : null;
}

function getAvatarImage(testimonial: TestimonialItem) {
  return (
    testimonial.avatar ||
    testimonial.image ||
    testimonial.logo ||
    testimonial.photo ||
    testimonial.clientLogo
  );
}

export function Testimonials({ eyebrow, title, description, testimonials = [] }: TestimonialsProps) {
  const visibleTestimonials = testimonials
    .filter((item) => item.quote && item.name && item.featured !== false)
    .slice(0, 3);
  const displayEyebrow = eyebrow?.trim() || "";
  const displayTitle = title?.trim() || "";
  const displayDescription = description?.trim() || "";
  const hasHeading = Boolean(displayEyebrow || displayTitle || displayDescription);

  if (!hasHeading && visibleTestimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" aria-label="Testimonials" className="bg-white py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {hasHeading ? (
          <div className="mx-auto max-w-3xl text-center">
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
                className="mt-4 text-3xl font-semibold tracking-tight text-navy md:text-5xl"
                direction="up"
                mode="words"
                text={displayTitle}
              />
            ) : null}
            {displayDescription ? (
              <TextReveal
                as="p"
                className="mt-5 text-lg leading-8 text-slate-600"
                direction="up"
                mode="lines"
                text={displayDescription}
              />
            ) : null}
          </div>
        ) : null}

        {visibleTestimonials.length > 0 ? (
          <StaggerContainer className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-3">
            {visibleTestimonials.map((item) => {
              const rating = Math.max(1, Math.min(item.rating ?? 5, 5));
              const testimonialImage = getAvatarImage(item);
              const avatarUrl = getAvatarImageUrl(item);
              const isLogoAvatar = isSvgImage(testimonialImage);

              return (
                <StaggerItem
                  className="group flex min-h-[300px] flex-col justify-between rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] transition duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/35 hover:shadow-[0_34px_96px_rgba(37,99,235,0.14)] md:min-h-[360px] md:p-7"
                  key={`${item.name}-${item.company ?? "testimonial"}`}
                >
                  <figure className="flex h-full flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-primary">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            aria-hidden="true"
                            className={index < rating ? "h-4 w-4 fill-current" : "h-4 w-4 text-slate-200"}
                            key={index}
                          />
                        ))}
                      </div>
                      <blockquote className="mt-6 text-lg leading-8 tracking-tight text-navy md:mt-8 md:text-xl md:leading-9">
                        "{item.quote}"
                      </blockquote>
                    </div>

                    <figcaption className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-5 md:mt-10 md:pt-6">
                      <div className="shrink-0 transition duration-300 ease-out group-hover:scale-[1.03]">
                        <TestimonialAvatar
                          imageUrl={avatarUrl}
                          isLogo={isLogoAvatar}
                          name={item.name}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-navy">{item.name}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          {[item.position, item.company].filter(Boolean).join(", ")}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        ) : (
          <div className="mx-auto mt-14 max-w-2xl rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 px-8 py-10 text-center">
            <p className="text-sm font-medium text-slate-500">
              Testimonials are not available yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
