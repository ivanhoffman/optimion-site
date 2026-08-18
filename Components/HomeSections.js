import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Braces,
  Check,
  Database,
  Network,
  Workflow,
} from "lucide-react";
import ConsultationButton from "@/Components/ConsultationButton";
import { SERVICES, servicePath } from "@/lib/site";

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
                <Link href={servicePath(service.slug)} scroll className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
                  Explore {service.name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
        <Link href={servicePath("custom-business-software")} scroll className="mt-6 flex items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:border-white/20 hover:bg-white/[0.04]">
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
        <div className="surface-card overflow-hidden p-6 md:p-8">
          <p className="section-kicker">Operating model</p>
          <h3 className="text-2xl font-semibold text-white">One dependable flow of operational information</h3>
          <div className="mt-7 space-y-3">
            {["Customer and order data enters once", "Systems of record retain clear ownership", "Automations handle routine movement and validation", "Exceptions reach the right team with context", "Reporting reconciles to operational sources"].map((item, index) => (
              <div key={item} className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/20 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-pink-500/20 text-xs font-semibold text-white">0{index + 1}</span>
                <span className="text-sm text-gray-200">{item}</span>
              </div>
            ))}
          </div>
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
    <section id="approach" className="scroll-mt-20 border-y border-white/10 px-6 py-20 md:px-16 md:py-28">
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

export function EngineeringPrinciples() {
  const principles = [
    ["Systems-first architecture", "Understand systems of record, ownership, data flow, and operational process before adding automation."],
    ["Reliability by design", "Build validation, exception handling, logging, retry behavior, and human review into critical workflows."],
    ["Integrate before replacing", "Use the software an organization already owns whenever it can reliably support the required process."],
    ["Built for ownership", "Deliver systems that can be documented, monitored, maintained, and extended instead of fragile one-off automations."],
  ];
  return (
    <section id="principles" className="scroll-mt-20 px-6 py-20 md:px-16 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="section-kicker">Engineering principles</p>
          <h2 className="section-title">Built for operational complexity.</h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-300">Optimion designs systems around how data, transactions, exceptions, and teams actually move through an organization.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {principles.map(([title, description], index) => (
            <article key={title} className="surface-card p-6 md:p-7">
              <span className="text-xs font-semibold text-cyan-300">0{index + 1}</span>
              <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 leading-relaxed text-gray-400">{description}</p>
            </article>
          ))}
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
