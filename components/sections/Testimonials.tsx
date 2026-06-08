import Image from "next/image";
import { Star } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/motion/Motion";
import type { TestimonialItem } from "@/lib/sanity/queries";

type TestimonialsProps = {
  testimonials?: TestimonialItem[];
};

function getInitials(name?: string) {
  return name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function Testimonials({ testimonials = [] }: TestimonialsProps) {
  const visibleTestimonials = testimonials
    .filter((item) => item.quote && item.name && item.featured !== false)
    .slice(0, 3);

  return (
    <section id="testimonials" aria-label="Testimonials" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Testimonials
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl">
            Trusted by Ambitious Companies
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Organizations choose MIT to build digital systems that support long-term growth.
          </p>
        </div>

        {visibleTestimonials.length > 0 ? (
          <StaggerContainer className="mt-16 grid gap-5 lg:grid-cols-3">
            {visibleTestimonials.map((item) => {
              const rating = Math.max(1, Math.min(item.rating ?? 5, 5));

              return (
                <StaggerItem className="h-full" key={`${item.name}-${item.company ?? "testimonial"}`}>
                  <figure className="flex min-h-[360px] flex-col justify-between rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.06)] transition duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_32px_96px_rgba(37,99,235,0.13)]">
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
                      <blockquote className="mt-8 text-xl leading-9 tracking-tight text-navy">
                        "{item.quote}"
                      </blockquote>
                    </div>

                    <figcaption className="mt-10 flex items-center gap-4 border-t border-slate-100 pt-6">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-sm font-semibold text-navy">
                        {item.avatar?.url ? (
                          <Image
                            alt={item.avatar.alt ?? item.name ?? "MIT testimonial avatar"}
                            className="object-cover"
                            fill
                            sizes="48px"
                            src={item.avatar.url}
                          />
                        ) : (
                          getInitials(item.name)
                        )}
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
              Testimonials are ready to be managed from Sanity Studio.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
