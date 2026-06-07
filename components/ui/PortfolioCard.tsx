import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { PortfolioProject } from "@/data/portfolio";

type PortfolioCardProps = {
  project: PortfolioProject;
  index: number;
  dark?: boolean;
};

const gradients = [
  "from-blue-500/35 via-sky-400/15 to-white/10",
  "from-cyan-400/30 via-blue-500/15 to-white/10",
  "from-indigo-400/30 via-blue-500/15 to-white/10",
  "from-slate-400/25 via-blue-500/15 to-white/10",
  "from-blue-300/30 via-primary/20 to-white/10"
];

export function PortfolioCard({ project, index, dark = false }: PortfolioCardProps) {
  const gradient = gradients[index % gradients.length];

  return (
    <article
      className={`group overflow-hidden rounded-[1.5rem] border p-4 transition duration-300 hover:-translate-y-1 hover:shadow-glass-lg ${
        dark
          ? "border-white/10 bg-white/10 text-white hover:border-blue-300/40 hover:bg-white/[0.14]"
          : "border-slate-200 bg-white text-navy hover:border-primary/40"
      }`}
    >
      <div
        className={`relative min-h-44 overflow-hidden rounded-[1.25rem] bg-gradient-to-br ${gradient}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.45),transparent_28%)]" />
        <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur-xl">
          <div className="h-2 w-24 rounded-full bg-white/70" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="h-12 rounded-xl bg-white/20" />
            <div className="h-12 rounded-xl bg-white/30" />
            <div className="h-12 rounded-xl bg-white/15" />
          </div>
        </div>
      </div>

      <div className="p-2 pt-6">
        <p className={`text-sm font-semibold ${dark ? "text-blue-200" : "text-primary"}`}>
          {project.category}
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight">{project.title}</h3>
        <p className={`mt-3 leading-7 ${dark ? "text-slate-300" : "text-slate-600"}`}>
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.highlights.map((highlight) => (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                dark ? "bg-white/10 text-slate-200" : "bg-slate-100 text-slate-600"
              }`}
              key={highlight}
            >
              <Check className="h-3 w-3 text-primary" />
              {highlight}
            </span>
          ))}
        </div>

        <Link
          href="/contact"
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
