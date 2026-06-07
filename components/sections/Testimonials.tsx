import { Quote } from "lucide-react";
import { testimonials } from "@/data/site";

export function Testimonials() {
  return (
    <section id="testimonials" aria-label="Testimonials" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Testimonials
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-5xl">
            Trusted by operators who need clarity, not decoration.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {testimonials.map((item) => (
            <figure
              className="rounded-[1.5rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-glass-lg"
              key={item.name}
            >
              <Quote className="h-8 w-8 text-primary" />
              <blockquote className="mt-6 text-xl leading-9 text-navy">"{item.quote}"</blockquote>
              <figcaption className="mt-8 border-t border-slate-200 pt-5">
                <p className="font-semibold text-navy">{item.name}</p>
                <p className="mt-1 text-sm text-slate-500">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
