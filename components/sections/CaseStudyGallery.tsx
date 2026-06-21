"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export type CaseStudyGalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

type CaseStudyGalleryProps = {
  images: CaseStudyGalleryImage[];
};

export function CaseStudyGallery({ images }: CaseStudyGalleryProps) {
  const [activeImage, setActiveImage] = useState<CaseStudyGalleryImage | null>(null);

  useEffect(() => {
    if (!activeImage) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage]);

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <section className="mt-12 px-6 py-20 lg:mt-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              PROJECT SHOWCASE
            </p>
            <p className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-navy md:text-4xl">
              Explore key screens, user journeys, and digital experiences developed for this project.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {images.map((image, index) => (
              <figure className="group" key={image.src}>
                <button
                  aria-label={`Open ${image.alt}`}
                  className="relative block aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100 text-left shadow-lg shadow-slate-900/10"
                  onClick={() => setActiveImage(image)}
                  type="button"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={index === 0}
                    unoptimized
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                  />
                </button>
                {image.caption ? (
                  <figcaption className="mt-4 text-sm font-medium text-slate-600">
                    {image.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </div>
      </section>

      {activeImage ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
          onClick={() => setActiveImage(null)}
          role="dialog"
        >
          <button
            aria-label="Close gallery image"
            className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 p-3 text-white transition duration-300 hover:bg-white/20"
            onClick={() => setActiveImage(null)}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative h-[82vh] w-full max-w-6xl overflow-hidden rounded-[1.5rem]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              unoptimized
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
