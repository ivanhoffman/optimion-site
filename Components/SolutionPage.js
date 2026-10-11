import { ArrowDown, ArrowRight, BarChart3, Check, Database, Network, Quote, ShoppingBag, Workflow } from "lucide-react";
import ConsultationButton from "@/Components/ConsultationButton";
import SEO from "@/Components/SEO";
import { TESTIMONIALS } from "@/lib/site";
import { solutionPath } from "@/lib/solutions";

const icons = { crm: Network, erp: Database, automation: Workflow, analytics: BarChart3, commerce: ShoppingBag };

const deliveryPrinciples = [
  ["Understand the real process", "Map the current tools, data owners, manual steps, and exceptions before choosing the implementation."],
  ["Build with clear controls", "Define validation, record matching, permissions, and failure handling alongside the normal workflow."],
  ["Launch with ownership", "Validate with the team, document the solution, and make operational status and exceptions understandable."],
];

export default function SolutionPage({ solution, slug }) {
  const Icon = icons[solution.icon] || Workflow;
  const testimonial = TESTIMONIALS.find((item) => item.name === solution.testimonialName);

  return (
    <>
      <SEO
        title={`${solution.name} Consulting & Integration | Optimion`}
        description={solution.description}
        path={solutionPath(slug)}
        noIndex
      />
      <main id="main" data-solution={slug}>
        <section className="relative overflow-hidden border-b border-white/10 px-6 pb-16 pt-12 md:px-16 md:pb-24 md:pt-20">
          <div aria-hidden="true" className="pointer-events-none absolute right-[-16rem] top-[-18rem] h-[44rem] w-[44rem] rounded-full bg-gradient-to-br from-cyan-500/15 via-purple-500/15 to-pink-500/15 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.18fr_0.82fr] lg:gap-16">
            <div>
              <p className="section-kicker max-w-xl leading-relaxed">{solution.eyebrow}</p>
              <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">{solution.h1}</h1>
              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-gray-200 md:text-2xl">{solution.subtext}</p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">{solution.lead}</p>
              <div className="mt-8">
                <ConsultationButton place={`solution_${slug}_hero`} label="Book a Free Discovery Call" className="w-full sm:w-auto" />
                <p className="mt-3 text-sm text-gray-500">30 minutes to map your systems and a practical next step.</p>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-400" aria-label="Implementation priorities">
                {["Your existing systems", "Clear data ownership", "Maintainable workflows"].map((item) => (
                  <li key={item} className="inline-flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />{item}</li>
                ))}
              </ul>
            </div>

            <aside className="relative rounded-2xl border border-white/15 bg-white/[0.025] p-6 shadow-2xl md:p-8" aria-label={`${solution.name} workflow`}>
              <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06]"><Icon className="h-6 w-6 text-cyan-300" aria-hidden="true" /></span>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-gray-500">The operating flow</p>
                  <h2 className="mt-2 text-xl font-medium leading-snug text-white">{solution.workflowTitle}</h2>
                </div>
              </div>
              <ol className="mt-7">
                {solution.workflow.map(([title, text], index) => (
                  <li key={title}>
                    <div className="flex gap-4 rounded-xl border border-white/10 bg-black/30 p-4">
                      <span className="pt-0.5 text-xs font-semibold tabular-nums text-cyan-300">0{index + 1}</span>
                      <div>
                        <h3 className="text-sm font-medium text-white">{title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-gray-400">{text}</p>
                      </div>
                    </div>
                    {index < solution.workflow.length - 1 ? <ArrowDown className="mx-auto my-2 h-4 w-4 text-gray-600" aria-hidden="true" /> : null}
                  </li>
                ))}
              </ol>
              <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-gray-500">Designed around your process, supported interfaces, and the people responsible for the result.</p>
            </aside>
          </div>
        </section>

        <section className="px-6 py-16 md:px-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="section-kicker">Where the friction shows up</p>
              <h2 className="section-title">{solution.problemsTitle}</h2>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {solution.problems.map(([title, text], index) => (
                <article key={title} className="border-t border-white/15 pt-5">
                  <span className="text-xs font-medium text-gray-600">0{index + 1}</span>
                  <h3 className="mt-3 text-lg font-medium text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 px-6 py-16 md:px-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <div>
                <p className="section-kicker">Focused implementation</p>
                <h2 className="section-title">What we can build with you</h2>
              </div>
              <p className="max-w-xl leading-relaxed text-gray-400">Start with the bottleneck that matters most. We define the scope around your systems, the required handoff, and a clear way to validate the result.</p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {solution.capabilities.map(([title, text]) => (
                <article key={title} className="surface-card p-6 md:p-7">
                  <Check className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-medium text-white">{title}</h3>
                  <p className="mt-3 leading-relaxed text-gray-400">{text}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 border-t border-white/10 pt-8">
              <h3 className="text-sm font-medium text-gray-300">Relevant platforms & capabilities</h3>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${solution.name} platforms and capabilities`}>
                {solution.systems.map((system) => <li key={system} className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-2 text-sm text-gray-300">{system}</li>)}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-gray-600">Integration scope depends on the platforms&apos; supported interfaces, access, and business requirements.</p>
            </div>
          </div>
        </section>

        <section className="px-6 py-12 md:px-16 md:py-16">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-2xl border border-cyan-300/15 bg-gradient-to-r from-cyan-500/[0.06] to-purple-500/[0.06] p-6 md:p-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="max-w-2xl text-2xl font-medium leading-snug text-white">Tell us what systems you use and what&apos;s not working.</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-gray-400">We&apos;ll identify where integration, automation, or reporting can help—and what a sensible first step looks like.</p>
            </div>
            <ConsultationButton place={`solution_${slug}_mid`} label="Book a Free Discovery Call" className="w-full shrink-0 sm:w-auto" />
          </div>
        </section>

        <section className="px-6 pb-16 pt-4 md:px-16 md:pb-24 md:pt-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p className="section-kicker">Built for operational ownership</p>
              <h2 className="section-title">A clear process behind the implementation.</h2>
              <ol className="mt-8 space-y-6">
                {deliveryPrinciples.map(([title, text], index) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-xs text-cyan-300">0{index + 1}</span>
                    <div><h3 className="font-medium text-white">{title}</h3><p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-400">{text}</p></div>
                  </li>
                ))}
              </ol>
            </div>
            {testimonial ? (
              <figure className="surface-card flex flex-col justify-center p-7 md:p-10">
                <Quote className="h-8 w-8 text-cyan-300/70" aria-hidden="true" />
                <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-gray-500">Client perspective · {testimonial.industry}</p>
                <blockquote className="mt-4 text-xl leading-relaxed text-gray-200">“{testimonial.quote}”</blockquote>
                <figcaption className="mt-7 border-t border-white/10 pt-5 text-sm text-gray-400"><span className="font-medium text-white">{testimonial.name}</span> · {testimonial.role}</figcaption>
              </figure>
            ) : null}
          </div>
        </section>

        <section className="border-t border-white/10 px-6 py-16 md:px-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div><p className="section-kicker">Before we talk</p><h2 className="section-title">A few practical answers.</h2></div>
            <div className="space-y-3">
              {solution.faqs.map(([question, answer]) => (
                <details key={question} className="rounded-xl border border-white/10 bg-white/[0.025] p-5 open:bg-white/[0.04]">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-white marker:hidden"><span>{question}</span><ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gray-500" aria-hidden="true" /></summary>
                  <p className="mt-4 leading-relaxed text-gray-400">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 md:px-16 md:pb-28">
          <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-7 md:p-12">
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="section-kicker">Your systems. A clearer next step.</p>
                <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-tight text-white md:text-4xl">Let&apos;s look at the handoff that is slowing you down.</h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-300">Bring the workflow, the systems involved, and the outcome you need. We&apos;ll map a practical path forward.</p>
              </div>
              <ConsultationButton place={`solution_${slug}_final`} label="Book a Free Discovery Call" className="w-full sm:w-auto" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
