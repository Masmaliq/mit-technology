import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Layers3,
  ShieldCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { getAbout } from "@/lib/sanity/fetch";
import { createCmsMetadata } from "@/lib/sanity/metadata";

export async function generateMetadata() {
  const about = await getAbout();

  return createCmsMetadata({
    page: "about",
    path: "/about",
    seoTitle: about.seoTitle,
    seoDescription: about.seoDescription,
    seoImage: about.seoImage,
    seoKeywords: about.seoKeywords,
    title: about.heroTitle,
    description: about.heroDescription,
  });
}

export default async function AboutPage() {
  const about = await getAbout();
  const mission = about.mission?.filter(Boolean) ?? [];
  const coreValues = about.coreValues?.filter(Boolean) ?? [];
  const statistics = about.statistics?.filter((item) => item.value || item.label) ?? [];

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-6 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.82fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                About MIT
              </p>
              <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-navy md:text-7xl">
                {about.heroTitle || "About content is not available yet."}
              </h1>
              {about.heroDescription ? (
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  {about.heroDescription}
                </p>
              ) : null}
            </div>
            <div className="rounded-[2rem] border border-white/70 bg-white/75 p-4 shadow-glass-lg backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-navy p-6 text-white">
                <Layers3 className="h-8 w-8 text-blue-200" />
                <p className="mt-10 text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">
                  {statistics[0]?.label || "CMS Overview"}
                </p>
                <p className="mt-4 text-3xl font-semibold tracking-tight">
                  {statistics[0]?.value || about.storyTitle || about.heroTitle}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                About MIT
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl">
                {about.storyTitle || about.heroTitle || "About"}
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-slate-600">
              {about.storyDescription ? <p>{about.storyDescription}</p> : null}
              {about.heroDescription ? <p>{about.heroDescription}</p> : null}
            </div>
          </div>
        </section>

        {coreValues.length > 0 ? (
          <section className="bg-slate-50 px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Core Values
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl">
                The principles behind how MIT builds digital systems.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {coreValues.map((value) => (
                  <article
                    className="rounded-[1.5rem] border border-white bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-glass-lg"
                    key={value}
                  >
                    <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <h3 className="mt-7 text-2xl font-semibold tracking-tight text-navy">
                      {value}
                    </h3>
                  </article>
                ))}
            </div>
          </div>
        </section>
        ) : null}

        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
            <article className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Mission
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy">
                {mission[0] || "Mission content is not available yet."}
              </h2>
            </article>
            <article className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Vision
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy">
                {about.vision || "Vision content is not available yet."}
              </h2>
            </article>
          </div>
        </section>

        {mission.length > 1 ? (
          <section className="bg-navy px-6 py-20 text-white lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">
                Why MIT
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Built for companies that need more than a good-looking website.
              </h2>
            </div>
            <div className="grid gap-3">
              {mission.slice(1).map((item) => (
                <div
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"
                  key={item}
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-200" />
                  <p className="font-medium leading-7 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        ) : null}

        <section className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.32),transparent_34%),linear-gradient(135deg,#0f172a_0%,#172554_100%)] p-8 text-white shadow-glass-lg md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
                  <ShieldCheck className="h-4 w-4" />
                  Strategic digital foundation
                </div>
                <h2 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
                  Ready to build your next digital system?
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                  Let's discuss your business goals and create the right digital foundation for
                  growth.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold text-navy transition duration-300 hover:-translate-y-1 hover:bg-blue-50"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
