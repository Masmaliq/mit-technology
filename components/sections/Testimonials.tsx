"use client";

import { useEffect, useMemo, useState } from "react";
import { TextReveal } from "@/components/motion/Motion";
import type { TestimonialItem } from "@/lib/sanity/queries";

type TestimonialsProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  testimonials?: TestimonialItem[];
};

export function Testimonials({ eyebrow, title, description, testimonials = [] }: TestimonialsProps) {
  const visibleTestimonials = useMemo(
    () => testimonials.filter((item) => item.quote && item.name && item.featured !== false),
    [testimonials],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleTestimonials = visibleTestimonials.length > 1;
  const activeTestimonial = visibleTestimonials[activeIndex];
  const displayEyebrow = eyebrow?.trim() || (visibleTestimonials.length > 0 ? "TESTIMONIALS" : "");
  const displayTitle = title?.trim() || "";
  const displayDescription = description?.trim() || "";
  const hasHeading = Boolean(displayEyebrow || displayTitle || displayDescription);

  useEffect(() => {
    if (!hasMultipleTestimonials) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % visibleTestimonials.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [hasMultipleTestimonials, visibleTestimonials.length]);

  useEffect(() => {
    if (activeIndex > visibleTestimonials.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, visibleTestimonials.length]);

  if (!hasHeading && visibleTestimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" aria-label="Testimonials" className="bg-white py-28 lg:py-36">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 text-center lg:px-8">
        {hasHeading ? (
          <div className="mx-auto max-w-3xl">
            {displayEyebrow ? (
              <TextReveal
                as="p"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-primary"
                direction="down"
                mode="chars"
                stagger={0.018}
                text={displayEyebrow}
              />
            ) : null}
            {displayTitle ? (
              <TextReveal
                as="h2"
                className="mx-auto mt-4 max-w-[820px] text-[36px] font-bold leading-[1.12] tracking-[-0.025em] text-navy sm:text-[clamp(38px,4vw,54px)]"
                direction="up"
                mode="words"
                text={displayTitle}
              />
            ) : null}
            {displayDescription ? (
              <TextReveal
                as="p"
                className="mx-auto mt-5 max-w-[760px] text-lg font-normal leading-[1.7] text-slate-600 md:text-[19px]"
                direction="up"
                mode="lines"
                text={displayDescription}
              />
            ) : null}
          </div>
        ) : null}

        {activeTestimonial ? (
          <figure
            className="mx-auto mt-16 max-w-[900px] opacity-100 transition-opacity duration-500 ease-out"
            key={`${activeTestimonial.name}-${activeIndex}`}
          >
            <blockquote className="mx-auto max-w-[900px] text-[28px] font-medium leading-[1.45] tracking-[-0.015em] text-[#0A1330] transition-opacity duration-500 md:text-[32px] lg:text-[clamp(28px,2.7vw,40px)]">
              &ldquo;{activeTestimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-10">
              <p className="text-xl font-semibold text-navy md:text-[21px]">{activeTestimonial.name}</p>
              {[activeTestimonial.position, activeTestimonial.company].filter(Boolean).length > 0 ? (
                <p className="mt-2 text-base font-normal leading-7 text-[#5A6584]">
                  {[activeTestimonial.position, activeTestimonial.company].filter(Boolean).join(" · ")}
                </p>
              ) : null}
            </figcaption>
          </figure>
        ) : null}

        {hasMultipleTestimonials ? (
          <div className="mt-10 flex items-center justify-center gap-2.5" aria-label="Testimonial navigation">
            {visibleTestimonials.map((item, index) => (
              <button
                aria-label={`Show testimonial from ${item.name}`}
                aria-pressed={index === activeIndex}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-7 bg-navy" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
                key={`${item.name}-${index}`}
                onClick={() => setActiveIndex(index)}
                type="button"
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
