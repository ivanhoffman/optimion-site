import HeroSection from "@/Components/HeroSection";
import SEO from "@/Components/SEO";
import {
  ConnectedSystems,
  FinalCTA,
  FounderSection,
  HOME_FAQS,
  HomeFAQ,
  HomeServices,
  ImplementationProcess,
  SelectedWork,
} from "@/Components/HomeSections";
import { absoluteUrl, CONTACT } from "@/lib/site";

const title = "Optimion | AI Automation, Systems Integration & Business Intelligence";
const description =
  "Optimion builds business automation, ERP and CRM integrations, Power BI reporting, AI workflows, APIs, and custom systems around the software you already use.";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": absoluteUrl("/#organization"),
  name: "Optimion",
  url: absoluteUrl("/"),
  logo: absoluteUrl("/android-chrome-512x512.png"),
  image: absoluteUrl("/android-chrome-512x512.png"),
  description,
  telephone: CONTACT.phone,
  email: CONTACT.email,
  areaServed: "United States",
  founder: {
    "@type": "Person",
    "@id": absoluteUrl("/#ivan-hoffman"),
    name: "Ivan Hoffman",
    url: "https://ivanhoffman.io",
    sameAs: ["https://github.com/ivanhoffman"],
  },
  sameAs: ["https://ivanhoffman.io"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: "Optimion",
  url: absoluteUrl("/"),
  publisher: { "@id": absoluteUrl("/#organization") },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": absoluteUrl("/#ivan-hoffman"),
  name: "Ivan Hoffman",
  url: "https://ivanhoffman.io",
  jobTitle: "Founder",
  worksFor: { "@id": absoluteUrl("/#organization") },
  sameAs: ["https://github.com/ivanhoffman"],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQS.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function Home() {
  return (
    <>
      <SEO title={title} description={description} path="/" jsonLd={[organizationSchema, websiteSchema, personSchema, faqSchema]} />
      <main id="main">
        <HeroSection />
        <HomeServices />
        <ConnectedSystems />
        <SelectedWork />
        <ImplementationProcess />
        <FounderSection />
        <HomeFAQ />
        <FinalCTA />
      </main>
    </>
  );
}
