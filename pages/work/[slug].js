import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import SEO from "@/Components/SEO";
import ConsultationButton from "@/Components/ConsultationButton";
import { CASE_STUDIES, CASE_STUDY_SLUGS, SERVICES, absoluteUrl, caseStudyPath, servicePath } from "@/lib/site";

export default function CaseStudyPage({ project }) {
  const path = caseStudyPath(project.slug);
  const related = project.related.map((slug) => SERVICES.find((service) => service.slug === slug)).filter(Boolean);
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Work", item: absoluteUrl("/work") },
      { "@type": "ListItem", position: 3, name: project.title, item: absoluteUrl(path) },
    ],
  };
  const creativeWork = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: absoluteUrl(path),
    image: absoluteUrl(project.image),
    creator: { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: "Optimion" },
    keywords: project.technologies.join(", "),
  };

  return (
    <>
      <SEO title={`${project.title} | Optimion`} description={project.summary} path={path} image={project.image} jsonLd={[breadcrumb, creativeWork]} />
      <main id="main">
        <section className="relative overflow-hidden px-6 pb-16 pt-16 md:px-16 md:pb-24 md:pt-24">
          <div className="pointer-events-none absolute right-[-18rem] top-[-14rem] h-[42rem] w-[42rem] rounded-full bg-gradient-to-br from-cyan-500/20 via-purple-500/15 to-pink-500/20 blur-3xl" />
          <div className="relative mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-400">
              <Link href="/" scroll className="hover:text-white">Home</Link><ChevronRight className="h-4 w-4" aria-hidden="true" />
              <Link href="/work" scroll className="hover:text-white">Work</Link><ChevronRight className="hidden h-4 w-4 sm:block" aria-hidden="true" />
              <span className="hidden text-gray-200 sm:inline">{project.title}</span>
            </nav>
            <p className="section-kicker">Representative implementation experience</p>
            <h1 className="max-w-5xl text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">{project.title}</h1>
            <p className="mt-7 max-w-3xl text-xl leading-relaxed text-gray-300">{project.summary}</p>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Project technologies">
              {project.technologies.map((technology) => <li key={technology} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-gray-300">{technology}</li>)}
            </ul>
          </div>
        </section>

        <section className="border-y border-white/10 px-6 py-16 md:px-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <Image src={project.image} alt={project.imageAlt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="space-y-10">
              <div><p className="section-kicker">The challenge</p><h2 className="text-3xl font-semibold text-white">The operational problem</h2><p className="mt-4 leading-relaxed text-gray-300">{project.challenge}</p></div>
              <div><p className="section-kicker">The solution</p><h2 className="text-3xl font-semibold text-white">The implemented architecture</h2><p className="mt-4 leading-relaxed text-gray-300">{project.solution}</p></div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
            <div>
              <p className="section-kicker">How it works</p>
              <h2 className="section-title">A controlled operational workflow</h2>
              <ol className="mt-8 space-y-3">
                {project.workflow.map((step, index) => <li key={step} className="surface-card flex gap-4 p-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-pink-500/20 text-sm font-semibold text-white">{index + 1}</span><span className="pt-1 text-gray-300">{step}</span></li>)}
              </ol>
            </div>
            <div className="space-y-10">
              <div><p className="section-kicker">Operational impact</p><h2 className="text-3xl font-semibold text-white">What changed</h2><p className="mt-4 text-lg leading-relaxed text-gray-300">{project.impact}</p></div>
              <div><p className="section-kicker">Technologies</p><ul className="mt-5 grid gap-3 sm:grid-cols-2">{project.technologies.map((technology) => <li key={technology} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-gray-300"><Check className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />{technology}</li>)}</ul></div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 px-6 py-16 md:px-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="section-kicker">Related capabilities</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((service) => <Link key={service.slug} href={servicePath(service.slug)} scroll className="surface-card group flex items-center justify-between gap-4 p-5 text-white transition hover:border-white/25"><span>{service.name}</span><ArrowRight className="h-4 w-4 text-cyan-300 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>)}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-7 md:flex-row md:items-center md:p-10">
            <div><p className="section-kicker">Discuss a similar project</p><h2 className="text-3xl font-semibold text-white">Bring the workflow, systems, and operational constraint.</h2></div>
            <ConsultationButton place={`case_study_${project.slug}`} label="Book a Free Systems Consultation" />
          </div>
        </section>
      </main>
    </>
  );
}

export function getStaticPaths() {
  return { paths: CASE_STUDY_SLUGS.map((slug) => ({ params: { slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  const project = Object.values(CASE_STUDIES).find((entry) => entry.slug === params.slug);
  if (!project) return { notFound: true };
  return { props: { project } };
}
