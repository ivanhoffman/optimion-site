import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronRight } from "lucide-react";
import ConsultationButton from "@/Components/ConsultationButton";
import SEO from "@/Components/SEO";
import {
  absoluteUrl,
  CASE_STUDIES,
  SERVICES,
  servicePath,
} from "@/lib/site";

const approachLabels = [
  "Map the process",
  "Design the system",
  "Build and validate",
  "Launch with ownership",
  "Monitor and improve",
];

export default function ServicePage({ service, slug }) {
  const path = servicePath(slug);
  const projects = service.projectKeys.map((key) => CASE_STUDIES[key]);
  const relatedServices = service.related
    .map((relatedSlug) => SERVICES.find((item) => item.slug === relatedSlug))
    .filter(Boolean);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.h1,
    description: service.description,
    url: absoluteUrl(path),
    provider: {
      "@type": "ProfessionalService",
      "@id": absoluteUrl("/#organization"),
      name: "Optimion",
      url: absoluteUrl("/"),
    },
    areaServed: "United States",
    serviceType: service.h1,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/#services") },
      { "@type": "ListItem", position: 3, name: service.h1, item: absoluteUrl(path) },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <SEO
        title={service.metaTitle}
        description={service.description}
        path={path}
        jsonLd={[serviceSchema, breadcrumbSchema, faqSchema]}
      />
      <main id="main">
        <section className="relative overflow-hidden px-6 pb-20 pt-16 md:px-16 md:pb-28 md:pt-24">
          <div className="pointer-events-none absolute right-[-18rem] top-[-14rem] h-[42rem] w-[42rem] rounded-full bg-gradient-to-br from-cyan-500/20 via-purple-500/15 to-pink-500/20 blur-3xl" />
          <div className="relative mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <Link href="/#services" className="hover:text-white">Services</Link>
              <ChevronRight className="hidden h-4 w-4 sm:block" aria-hidden="true" />
              <span className="hidden text-gray-300 sm:inline">{service.h1}</span>
            </nav>

            <div className="max-w-4xl">
              <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">{service.eyebrow}</p>
              <h1 className="text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">{service.h1}</h1>
              <p className="mt-7 max-w-3xl text-xl leading-relaxed text-gray-200">{service.lead}</p>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-400 md:text-lg">{service.intro}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ConsultationButton place={`service_${slug}`} />
                <Link href="/work" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5">
                  View verified work <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <ul aria-label="Relevant systems and categories" className="mt-12 flex flex-wrap gap-2">
              {service.categories.map((item) => (
                <li key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-gray-300">{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-y border-white/10 px-6 py-20 md:px-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="section-kicker">Operational needs</p>
              <h2 className="section-title">{service.problemsTitle}</h2>
              <p className="mt-5 max-w-xl text-gray-400">The work starts with the actual handoff, exception, or decision that is slowing the team down—not with a predetermined platform.</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {service.problems.map((problem) => (
                <li key={problem} className="surface-card flex gap-3 p-4 text-gray-200">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="section-kicker">Selected work</p>
              <h2 className="section-title">Evidence from systems already built</h2>
              <p className="mt-5 text-gray-400">These sanitized examples come from the founder&apos;s public technical portfolio. Client and employer identities are intentionally omitted.</p>
            </div>
            <div className={`mt-10 grid gap-6 ${projects.length === 1 ? "max-w-2xl" : "lg:grid-cols-3"}`}>
              {projects.map((project) => (
                <article key={project.title} className="surface-card overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-black/40">
                    <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-300">{project.summary}</p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-400">{project.impact}</p>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                      {project.technologies.map((tech) => <li key={tech} className="rounded-full bg-white/[0.05] px-2.5 py-1 text-xs text-gray-300">{tech}</li>)}
                    </ul>
                    <a href={project.portfolioUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-cyan-300 hover:text-cyan-200">
                      View technical case study <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 px-6 py-20 md:px-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="section-kicker">Implementation approach</p>
                <h2 className="section-title">Built around the system of record and the people using it</h2>
                <ol className="mt-8 space-y-4">
                  {service.capabilities.map((item, index) => (
                    <li key={item} className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/25 to-pink-500/25 text-sm font-semibold text-white">{index + 1}</span>
                      <div>
                        <h3 className="font-medium text-white">{approachLabels[index]}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-gray-400">{item}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="space-y-10">
                <div>
                  <p className="section-kicker">Systems we work with</p>
                  <h2 className="text-3xl font-medium text-white">Experience integrating with your operating stack</h2>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.systems.map((system) => <li key={system} className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-sm text-gray-300">{system}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="section-kicker">Good fit</p>
                  <h2 className="text-3xl font-medium text-white">Who this service is for</h2>
                  <ul className="mt-6 space-y-3">
                    {service.fit.map((item) => <li key={item} className="flex gap-3 text-gray-300"><Check className="mt-0.5 h-5 w-5 shrink-0 text-pink-300" aria-hidden="true" />{item}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="section-kicker">Frequently asked questions</p>
              <h2 className="section-title">Straight answers before we talk</h2>
            </div>
            <div className="space-y-3">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 open:bg-white/[0.05]">
                  <summary className="cursor-pointer list-none pr-8 font-medium text-white marker:hidden">{faq.question}</summary>
                  <p className="mt-4 leading-relaxed text-gray-400">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 md:px-16 md:pb-32">
          <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-7 md:p-12">
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="section-kicker">Start with the real process</p>
                <h2 className="max-w-3xl text-3xl font-semibold text-white md:text-4xl">Bring the workflow, systems, and bottleneck. We&apos;ll map a practical path forward.</h2>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-300">
                  {relatedServices.map((item) => <Link key={item.slug} href={servicePath(item.slug)} className="hover:text-white">Related: {item.name}</Link>)}
                </div>
              </div>
              <ConsultationButton place={`service_${slug}_final`} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

