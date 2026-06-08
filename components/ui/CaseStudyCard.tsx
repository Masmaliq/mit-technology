import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { CaseStudyItem } from "@/lib/sanity/queries";
import { urlFor } from "@/sanity/lib/image";

type CaseStudyCardProps = {
  caseStudy: CaseStudyItem;
  dark?: boolean;
};

function getFeaturedImageUrl(caseStudy: CaseStudyItem) {
  const image = caseStudy.featuredImage;

  if (!image) {
    return "";
  }

  try {
    const imageUrl = urlFor(image)
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

  return image.url?.startsWith("http") ? image.url : "";
}

export function CaseStudyCard({ caseStudy, dark = false }: CaseStudyCardProps) {
  const href = caseStudy.slug ? `/case-studies/${caseStudy.slug}` : "/case-studies";
  const featuredImage = caseStudy.featuredImage;
  const featuredImageUrl = getFeaturedImageUrl(caseStudy);

  return (
    <article
      className={`group overflow-hidden rounded-[1.5rem] border p-4 transition duration-300 hover:-translate-y-1 hover:shadow-glass-lg ${
        dark
          ? "border-white/10 bg-white/10 text-white hover:border-blue-300/40 hover:bg-white/[0.14]"
          : "border-slate-200 bg-white text-navy hover:border-primary/40"
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-blue-500/30 via-sky-400/15 to-white/10">
        {featuredImageUrl ? (
          <Image
            src={featuredImageUrl}
            alt={featuredImage?.alt || caseStudy.title || ""}
            fill
            unoptimized
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.45),transparent_28%)]" />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur-xl">
              <div className="h-2 w-24 rounded-full bg-white/70" />
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="h-12 rounded-xl bg-white/20" />
                <div className="h-12 rounded-xl bg-white/30" />
                <div className="h-12 rounded-xl bg-white/15" />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="p-2 pt-6">
        <p className={`text-sm font-semibold ${dark ? "text-blue-200" : "text-primary"}`}>
          {caseStudy.industry || caseStudy.client || "Case Study"}
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight">
          {caseStudy.title || "Untitled Case Study"}
        </h3>
        {caseStudy.result || caseStudy.solution ? (
          <p className={`mt-3 leading-7 ${dark ? "text-slate-300" : "text-slate-600"}`}>
            {caseStudy.result || caseStudy.solution}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2">
          {[caseStudy.client, caseStudy.industry].filter(Boolean).map((item) => (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                dark ? "bg-white/10 text-slate-200" : "bg-slate-100 text-slate-600"
              }`}
              key={item}
            >
              <Check className="h-3 w-3 text-primary" />
              {item}
            </span>
          ))}
        </div>

        <Link
          href={href}
          className={`mt-7 inline-flex items-center gap-2 text-sm font-semibold transition duration-300 ${
            dark ? "text-white hover:text-blue-200" : "text-primary hover:text-blue-700"
          }`}
        >
          View Case Study
          <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
