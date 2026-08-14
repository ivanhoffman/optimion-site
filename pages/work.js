import SEO from "@/Components/SEO";
import ConsultationButton from "@/Components/ConsultationButton";
import { SelectedWork } from "@/Components/HomeSections";
import { absoluteUrl } from "@/lib/site";

const title = "Selected Systems & Automation Work | Optimion";
const description = "Verified, sanitized examples of AI automation, Business Central, Power BI, CRM workflow, and operational systems work by Optimion founder Ivan Hoffman.";

export default function WorkPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Selected Work", item: absoluteUrl("/work") },
    ],
  };
  return (
    <>
      <SEO title={title} description={description} path="/work" jsonLd={breadcrumb} />
      <main id="main">
        <section className="px-6 pb-4 pt-16 md:px-16 md:pt-24">
          <div className="mx-auto max-w-7xl">
            <p className="section-kicker">Systems we&apos;ve built</p>
            <h1 className="max-w-5xl text-4xl font-semibold leading-tight text-white md:text-6xl">Verified implementation work across automation, ERP, CRM, and business intelligence.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-300">Each example is summarized for business relevance and links to a deeper public technical case study. Sensitive identities and proprietary records remain omitted.</p>
          </div>
        </section>
        <SelectedWork expanded />
        <section className="px-6 pb-24 md:px-16 md:pb-32">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:flex-row md:items-center md:p-10">
            <div><h2 className="text-2xl font-semibold text-white">Have a similar systems problem?</h2><p className="mt-2 text-gray-400">Bring the current workflow and the tools involved. We&apos;ll map a practical first step.</p></div>
            <ConsultationButton place="work_page" />
          </div>
        </section>
      </main>
    </>
  );
}

