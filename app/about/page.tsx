import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  Layers3,
  ShieldCheck,
  ShoppingCart,
  Workflow
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/sections/Footer";

const services = [
  {
    title: "Company Profile Website",
    description: "Premium corporate presence for credibility, trust, and lead generation.",
    icon: Building2
  },
  {
    title: "Store & E-Commerce",
    description: "Commerce systems for product discovery, checkout, and scalable operations.",
    icon: ShoppingCart
  },
  {
    title: "Web Application",
    description: "Custom dashboards, portals, CRM, ERP, and workflow systems for teams.",
    icon: Workflow
  },
  {
    title: "AI Ecosystem",
    description: "AI assistants, automation, knowledge bases, and productivity systems.",
    icon: Bot
  }
];

const whyMit = [
  "Business-first digital strategy before design execution",
  "Premium interface quality with scalable technical foundations",
  "Clear information architecture for trust and conversion",
  "Systems built for growth, content ownership, and iteration",
  "Corporate-ready delivery across web, apps, commerce, and AI"
];

export default function AboutPage() {
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
                Building Digital Systems for Growing Companies
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                MIT designs digital foundations that help companies look credible, operate more
                clearly, and scale into the next stage with confidence.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/70 bg-white/75 p-4 shadow-glass-lg backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-navy p-6 text-white">
                <Layers3 className="h-8 w-8 text-blue-200" />
                <p className="mt-10 text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">
                  Digital systems studio
                </p>
                <p className="mt-4 text-3xl font-semibold tracking-tight">
                  Web, commerce, application, and AI systems under one strategic foundation.
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
                A digital partner for companies moving from presence to systems.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-slate-600">
              <p>
                MIT helps businesses create premium digital experiences that are not only visually
                polished, but also structured for trust, conversion, operations, and long-term
                growth.
              </p>
              <p>
                From corporate websites and ecommerce to internal applications and AI ecosystems,
                MIT focuses on building clean, scalable digital systems that support real business
                needs.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Services
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl">
                Four core systems for modern companies.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <article
                    className="rounded-[1.5rem] border border-white bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-glass-lg"
                    key={service.title}
                  >
                    <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-7 text-2xl font-semibold tracking-tight text-navy">
                      {service.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-600">{service.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
            <article className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Mission
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy">
                Build digital systems that make growing companies clearer, faster, and more
                credible.
              </h2>
            </article>
            <article className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Vision
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy">
                Become a trusted digital systems partner for companies building serious growth
                infrastructure.
              </h2>
            </article>
          </div>
        </section>

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
              {whyMit.map((item) => (
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
