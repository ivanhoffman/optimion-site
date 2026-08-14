import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import SEO from "@/Components/SEO";
import ConsultationButton from "@/Components/ConsultationButton";
import { SERVICES, absoluteUrl, servicePath } from "@/lib/site";

const title = "Business Systems, AI & Integration Services | Optimion";
const description = "Explore Optimion services for business systems automation, Business Central, AI workflows, Power BI, CRM, APIs, and custom operational software.";

export default function ServicesPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
    ],
  };
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Optimion business systems services",
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      url: absoluteUrl(servicePath(service.slug)),
    })),
  };

  return (
    <>
      <SEO title={title} description={description} path="/services" jsonLd={[breadcrumb, itemList]} />
      <main id="main">
        <section className="relative overflow-hidden px-6 pb-16 pt-16 md:px-16 md:pb-24 md:pt-24">
          <div className="pointer-events-none absolute right-[-18rem] top-[-14rem] h-[42rem] w-[42rem] rounded-full bg-gradient-to-br from-cyan-500/20 via-purple-500/15 to-pink-500/20 blur-3xl" />
          <div className="relative mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-gray-400">
              <Link href="/" scroll className="hover:text-white">Home</Link><span aria-hidden="true">/</span><span className="text-gray-200">Services</span>
            </nav>
            <p className="section-kicker">Enterprise systems capabilities</p>
            <h1 className="max-w-5xl text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">Engineering services for connected, reliable business operations.</h1>
            <p className="mt-7 max-w-3xl text-xl leading-relaxed text-gray-300">Optimion designs and implements automation, integration, analytics, and custom software around the systems that run sales, operations, finance, inventory, and customer work.</p>
          </div>
        </section>

        <section className="border-y border-white/10 px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {SERVICES.map((service, index) => (
                <article key={service.slug} className="surface-card group flex flex-col p-6 md:p-7">
                  <span className="text-xs font-semibold text-cyan-300">0{index + 1}</span>
                  <h2 className="mt-4 text-2xl font-semibold text-white">{service.name}</h2>
                  <p className="mt-4 flex-1 leading-relaxed text-gray-400">{service.short}</p>
                  <Link href={servicePath(service.slug)} scroll className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200">
                    Explore the capability <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="section-kicker">One engineering process</p>
              <h2 className="section-title">Specialized services, designed as one operating system.</h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-400">A project may begin with one workflow and touch several capabilities. The architecture keeps system ownership, data movement, controls, reporting, and maintainability aligned.</p>
            </div>
            <ul className="surface-card grid gap-3 p-6">
              {["Systems-of-record and data-flow mapping", "Validation, exception handling, and traceability", "Focused delivery without unnecessary platform replacement", "Documentation and operational ownership"].map((item) => <li key={item} className="flex gap-3 text-gray-300"><Check className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="px-6 pb-24 md:px-16 md:pb-32">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-7 md:flex-row md:items-center md:p-10">
            <div><h2 className="text-2xl font-semibold text-white">Start with the operational bottleneck.</h2><p className="mt-2 text-gray-300">We’ll map the systems involved and identify a practical first implementation.</p></div>
            <ConsultationButton place="services_overview" />
          </div>
        </section>
      </main>
    </>
  );
}
