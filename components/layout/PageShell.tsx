import type { ReactNode } from "react";
import { Footer } from "@/components/sections/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";

type PageShellProps = {
  title: string;
  children?: ReactNode;
};

export function PageShell({ title, children }: PageShellProps) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[60vh] bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            MIT Technology
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-navy md:text-6xl">
            {title}
          </h1>
          <div className="mt-8 text-lg text-slate-600">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
