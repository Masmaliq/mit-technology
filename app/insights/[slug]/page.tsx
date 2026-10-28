import Image from "next/image";
import { notFound } from "next/navigation";
import { HomepageEditorialFooter } from "@/components/home/HomepageEditorialFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getInsightBySlug, getInsights } from "@/lib/sanity/fetch";
import { createCmsMetadata } from "@/lib/sanity/metadata";

export const revalidate = 10;

export async function generateStaticParams() {
  const insights = await getInsights();
  return insights.flatMap((insight) => insight.slug ? [{ slug: insight.slug }] : []);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);

  return createCmsMetadata({
    path: `/insights/${slug}`,
    seoTitle: insight?.seoTitle,
    seoDescription: insight?.seoDescription,
    seoImage: insight?.seoImage,
    title: insight?.title,
    description: insight?.excerpt,
  });
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);
  if (!insight) notFound();

  const paragraphs = (insight.body || [])
    .map((block) => (block.children || []).map((child) => child.text || "").join(""))
    .filter(Boolean);

  return (
    <>
      <SiteHeader light />
      <main className="bg-[#f5f3ed] px-5 pb-24 pt-36 text-[#071923] sm:px-8 lg:pb-32 lg:pt-44">
        <article className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0788c9]">{insight.category}</p>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.055em]">{insight.title}</h1>
          {insight.excerpt ? <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">{insight.excerpt}</p> : null}
          <div className="mt-8 flex gap-5 text-sm text-slate-500">
            {insight.author ? <span>{insight.author}</span> : null}
            {insight.publishedAt ? <time dateTime={insight.publishedAt}>{new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(new Date(insight.publishedAt))}</time> : null}
          </div>
          {insight.coverImage?.url ? <div className="relative mt-12 aspect-[16/9] overflow-hidden"><Image alt={insight.coverImage.alt || insight.title || ""} fill priority sizes="(max-width: 1024px) 100vw, 1024px" src={insight.coverImage.url} style={{ objectFit: "cover" }} unoptimized /></div> : null}
          {paragraphs.length ? <div className="mx-auto mt-14 max-w-3xl space-y-7 text-[17px] leading-8 text-slate-700">{paragraphs.map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>)}</div> : null}
        </article>
      </main>
      <HomepageEditorialFooter />
    </>
  );
}
