import { TESTIMONIALS } from "@/lib/site";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-fade scroll-mt-20 px-6 py-20 md:px-16 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="section-kicker">Client perspectives</p>
          <h2 className="section-title">Built around the way organizations actually operate.</h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-400">Approved client perspectives on operational automation, connected systems, and reliable business data.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <figure key={`${testimonial.name}-${testimonial.industry}`} className="surface-card flex h-full flex-col p-6">
              <span className="w-fit rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-gray-400">{testimonial.industry}</span>
              <blockquote className="mt-6 flex-1 text-base leading-relaxed text-gray-200">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4 text-sm text-gray-400">
                <span className="font-medium text-white">{testimonial.name}</span>
                <span aria-hidden="true"> · </span>
                {testimonial.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
