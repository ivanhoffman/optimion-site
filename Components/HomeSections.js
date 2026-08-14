import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  Braces,
  Check,
  Database,
  Network,
  Workflow,
} from "lucide-react";
import ConsultationButton from "@/Components/ConsultationButton";
import { CASE_STUDIES, SERVICES, servicePath } from "@/lib/site";

const serviceIcons = [Workflow, Database, Bot, BarChart3, Network, Braces, Braces];

export function HomeServices() {
  return (
    <section id="services" className="section-fade scroll-mt-20 px-6 py-20 md:px-16 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="section-kicker">What we build</p>
          <h2 className="section-title">Systems engineering across the complete operating stack</h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-400">Automation works best when it understands the underlying ERP, CRM, finance, inventory, reporting, and operational process.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.slice(0, 6).map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <article key={service.slug} className="surface-card group p-6 transition hover:-translate-y-1 hover:border-white/20">
                <Icon className="h-6 w-6 text-cyan-300" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold text-white">{service.name}</h3>
                <p className="mt-3 leading-relaxed text-gray-400">{service.short}</p>
                <Link href={servicePath(service.slug)} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
                  Explore {service.name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
        <Link href={servicePath("custom-business-software")} className="mt-6 flex items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:border-white/20 hover:bg-white/[0.04]">
          <span>
            <span className="block text-lg font-semibold text-white">Custom Business Software</span>
            <span className="mt-1 block text-sm text-gray-400">Internal applications, portals, workflow tools, and AI-enabled operational software.</span>
          </span>
          <ArrowRight className="h-5 w-5 shrink-0 text-pink-300" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function ConnectedSystems() {
  const useCases = [
    "Eliminate duplicate data entry",
    "Connect CRM and ERP",
    "Automate purchase-order workflows",
    "Process emails and documents",
    "Synchronize customers and orders",
    "Create real-time operational reporting",
    "Replace spreadsheet-driven workflows",
    "Add AI to repetitive administrative work",
  ];
  const systems = [
    "Dynamics 365 Business Central", "Power Automate", "Power BI", "Azure", "SharePoint", "Zoho", "HubSpot", "Salesforce", "Pipedrive", "Odoo", "QuickBooks", "Xero", "Shopify", "PostgreSQL", "Make", "Zapier", "n8n", "REST APIs", "Webhooks",
  ];

  return (
    <section id="systems" className="scroll-mt-20 border-y border-white/10 px-6 py-20 md:px-16 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="section-kicker">One connected operation</p>
          <h2 className="section-title">Turn disconnected tools into one operating system.</h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-300">We connect the software your business already uses so information moves automatically between sales, operations, finance, inventory, and reporting.</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {useCases.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-300"><Check className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />{item}</li>)}
          </ul>
        </div>
        <div className="surface-card p-6 md:p-8">
          <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-gray-400">Experience integrating with</h3>
          <ul className="mt-6 flex flex-wrap gap-2">
            {systems.map((system) => <li key={system} className="rounded-full border border-white/10 bg-black/25 px-3 py-2 text-sm text-gray-200">{system}</li>)}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-gray-500">Platform names describe implementation experience only. Optimion does not claim an official partnership or certification unless explicitly stated.</p>
        </div>
      </div>
    </section>
  );
}

export function SelectedWork({ expanded = false }) {
  const entries = Object.values(CASE_STUDIES);
  const projects = expanded ? entries : entries.slice(0, 4);

  return (
    <section id="work" className="section-fade scroll-mt-20 px-6 py-20 md:px-16 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="section-kicker">Selected work</p>
            <h2 className="section-title">Real systems. Sanitized proof.</h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-400">Technical examples are based on public portfolio projects. Names, proprietary details, and sensitive records are omitted.</p>
          </div>
          {!expanded ? <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200">View all selected work <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link> : null}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="surface-card overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-black/40">
                <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-500 hover:scale-[1.02]" />
              </div>
              <div className="p-6 md:p-7">
                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-300">{project.summary}</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">{project.impact}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => <li key={tech} className="rounded-full bg-white/[0.05] px-2.5 py-1 text-xs text-gray-300">{tech}</li>)}
                </ul>
                <a href={project.portfolioUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-cyan-300 hover:text-cyan-200">View technical case study <span className="sr-only">for {project.title}</span><ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ImplementationProcess() {
  const steps = [
    ["Understand the operation", "Map the systems, data owners, manual handoffs, bottlenecks, exceptions, and decision points."],
    ["Design the connection", "Choose the right mix of native automation, APIs, AI, reporting, and custom software."],
    ["Build and validate", "Implement a focused slice, reconcile the data, test failure paths, and confirm the workflow with users."],
    ["Launch with ownership", "Document the solution, monitor it, and give the team a clear way to handle exceptions and future change."],
  ];
  return (
    <section id="process" className="scroll-mt-20 border-y border-white/10 px-6 py-20 md:px-16 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="section-kicker">How we work</p>
          <h2 className="section-title">From bottleneck to reliable system</h2>
        </div>
        <ol className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map(([title, text], index) => (
            <li key={title} className="surface-card p-6">
              <span className="text-sm font-semibold text-cyan-300">0{index + 1}</span>
              <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 leading-relaxed text-gray-400">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function FounderSection() {
  return (
    <section id="about" className="scroll-mt-20 px-6 py-20 md:px-16 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
        <div className="surface-card p-7">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/25 via-purple-500/25 to-pink-500/25 text-xl font-semibold text-white">IH</div>
          <h3 className="mt-5 text-xl font-semibold text-white">Ivan Hoffman</h3>
          <p className="mt-1 text-sm text-gray-400">Founder, Optimion</p>
          <a href="https://ivanhoffman.io" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm text-cyan-300 hover:text-cyan-200">Public technical portfolio <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
        </div>
        <div>
          <p className="section-kicker">Founder-led systems engineering</p>
          <h2 className="section-title">Technical depth with direct accountability</h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-300">Optimion is led by Ivan Hoffman, whose public work spans Microsoft Dynamics 365 Business Central, AL extensions, Power Automate, Power BI, DAX, purchasing and inventory analytics, AI document workflows, CRM automation, APIs, and custom business systems.</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-gray-400">That experience keeps projects grounded in how business data, transactions, exceptions, and users actually move through an operation.</p>
        </div>
      </div>
    </section>
  );
}

export const HOME_FAQS = [
  ["Can you connect our CRM and ERP?", "Yes. We define field ownership, record identifiers, lifecycle events, timing, duplicate behavior, and error handling before implementing the connection through supported APIs, webhooks, middleware, or custom code."],
  ["Can you automate Microsoft Dynamics 365 Business Central?", "Yes. Optimion works with Business Central APIs, Power Automate, Power BI, AL extensions, purchasing, sales orders, inventory, SharePoint, and Microsoft 365 workflows."],
  ["Can you automate purchase orders and vendor follow-up?", "Yes. Verified work includes vendor email and PDF intake, PO matching, expected-receipt updates, SharePoint case tracking, and purchasing analytics."],
  ["Can you build Power BI dashboards from Business Central or Odoo?", "Yes. Work includes source connection, Power Query, data modeling, DAX, reconciliation, refresh, access, and operational dashboard design."],
  ["Can AI process incoming emails and business documents?", "Yes. AI can extract and classify defined information while a controlled workflow validates the result, routes uncertain cases, and updates ERP, CRM, SharePoint, or task systems."],
  ["Can you work with the software we already use?", "Usually, yes. Optimion starts with the current stack and uses native automation, APIs, middleware, or custom software around it. Replacement is recommended only when the existing platform cannot support the process."],
  ["What if our software has no native integration?", "We inspect its API, webhook, export, database, and authentication options, then choose a custom connector, scheduled sync, or controlled file workflow with logging and failure handling."],
];

export function HomeFAQ() {
  return (
    <section id="faq" className="scroll-mt-20 border-y border-white/10 px-6 py-20 md:px-16 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="section-kicker">Frequently asked questions</p>
          <h2 className="section-title">Straight answers about systems work</h2>
        </div>
        <div className="space-y-3">
          {HOME_FAQS.map(([question, answer]) => (
            <details key={question} className="rounded-xl border border-white/10 bg-white/[0.03] p-5 open:bg-white/[0.05]">
              <summary className="cursor-pointer list-none pr-8 font-medium text-white marker:hidden">{question}</summary>
              <p className="mt-4 leading-relaxed text-gray-400">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section id="get-started" className="scroll-mt-20 px-6 py-20 md:px-16 md:py-28">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-7 md:p-12">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="section-kicker">Let&apos;s map the system</p>
            <h2 className="max-w-4xl text-3xl font-semibold leading-tight text-white md:text-5xl">Stop moving information by hand between tools that should already work together.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-300">Bring the current workflow, systems, and bottleneck. We&apos;ll identify a practical first step and tell you plainly when a different approach is a better fit.</p>
          </div>
          <ConsultationButton place="homepage_final" />
        </div>
      </div>
    </section>
  );
}
