import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScaleIn, StaggerContainer, StaggerItem } from "@/components/motion/Motion";
import type { PortfolioItem } from "@/lib/sanity/queries";
import { urlFor } from "@/sanity/lib/image";

type PortfolioProps = {
  projects?: PortfolioItem[];
};

function getThumbnailUrl(project: PortfolioItem) {
  const thumbnail = project.thumbnail;

  if (!thumbnail) {
    return "";
  }

  try {
    const imageUrl = urlFor(thumbnail)
      .width(1200)
      .height(750)
      .fit("crop")
      .quality(85)
      .auto("format")
      .url();

    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }
  } catch {
    // Fall through to the resolved asset URL from the Sanity query.
  }

  return thumbnail.url?.startsWith("http") ? thumbnail.url : "";
}

function getProjectHref(project: PortfolioItem) {
  if (project.caseStudySlug) {
    return `/case-studies/${project.caseStudySlug}`;
  }

  if (project.projectUrl) {
    return project.projectUrl;
  }

  return `/portfolio#${project.slug}`;
}

export function Portfolio({ projects }: PortfolioProps) {
  const previewProjects = projects?.filter((project) => project.title && project.slug) ?? [];

  return (
    <section id="portfolio" aria-label="Portfolio" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Selected Work
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl">
              Digital Systems Built For Real Business Needs
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Explore selected concepts and platforms across corporate websites, ecommerce, web
              applications, and AI ecosystems.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white shadow-glass-lg transition duration-300 hover:-translate-y-0.5 hover:bg-primary"
          >
            View Portfolio
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <StaggerContainer className="mt-12 grid gap-5 lg:grid-cols-3">
          {previewProjects.length > 0 ? (
            previewProjects.map((project) => {
              const thumbnailUrl = getThumbnailUrl(project);
              const category = project.category || "Selected Work";
              const href = getProjectHref(project);
              const isExternal = href.startsWith("http");
              const cardContent = (
                <>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[1.35rem] bg-[linear-gradient(135deg,#f8fbff_0%,#e8f0ff_100%)]">
                    {thumbnailUrl ? (
                      <Image
                        alt={project.thumbnail?.alt || project.title || "Portfolio project"}
                        className="object-cover transition duration-[350ms] ease-out group-hover:scale-[1.04]"
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        src={thumbnailUrl}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(37,99,235,0.18),transparent_30%),linear-gradient(135deg,#ffffff_0%,#eef4ff_100%)]" />
                    )}
                    <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        {category}
                      </p>
                      {project.client ? (
                        <p className="mt-2 text-sm font-semibold text-navy">{project.client}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="p-2 pt-6">
                    <div className="flex items-start justify-between gap-5">
                      <h3 className="text-2xl font-semibold tracking-tight text-navy">
                        {project.title}
                      </h3>
                      <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition duration-300 group-hover:border-primary/30 group-hover:text-primary">
                        <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                    {project.description ? (
                      <p className="mt-4 leading-7 text-slate-600">{project.description}</p>
                    ) : null}
                  </div>
                </>
              );

              return isExternal ? (
                <StaggerItem className="h-full" key={project.slug}>
                  <ScaleIn className="h-full">
                    <a
                      className="group block h-full overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-[0_20px_80px_rgba(15,23,42,0.06)] transition duration-[350ms] ease-out hover:-translate-y-2.5 hover:scale-[1.015] hover:border-primary/35 hover:shadow-[0_34px_108px_rgba(15,23,42,0.14)]"
                      href={href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {cardContent}
                    </a>
                  </ScaleIn>
                </StaggerItem>
              ) : (
                <StaggerItem className="h-full" key={project.slug}>
                  <ScaleIn className="h-full">
                    <Link
                      className="group block h-full overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-[0_20px_80px_rgba(15,23,42,0.06)] transition duration-[350ms] ease-out hover:-translate-y-2.5 hover:scale-[1.015] hover:border-primary/35 hover:shadow-[0_34px_108px_rgba(15,23,42,0.14)]"
                      href={href}
                    >
                      {cardContent}
                    </Link>
                  </ScaleIn>
                </StaggerItem>
              );
            })
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600 lg:col-span-3">
              Portfolio content is not available yet.
            </div>
          )}
        </StaggerContainer>
      </div>
    </section>
  );
}
