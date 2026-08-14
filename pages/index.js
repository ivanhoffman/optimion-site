import HeroSection from "@/Components/HeroSection";
import SEO from "@/Components/SEO";
import TechnologyEcosystem from "@/Components/TechnologyEcosystem";
import TestimonialsSection from "@/Components/TestimonialsSection";
import {
  ConnectedSystems,
  EngineeringPrinciples,
  FinalCTA,
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
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: "Optimion",
  url: absoluteUrl("/"),
  publisher: { "@id": absoluteUrl("/#organization") },
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
      <SEO title={title} description={description} path="/" jsonLd={[organizationSchema, websiteSchema, faqSchema]} />
      <main id="main">
        <HeroSection />
        <HomeServices />
        <ConnectedSystems />
        <TechnologyEcosystem />
        <SelectedWork />
        <EngineeringPrinciples />
        <TestimonialsSection />
        <ImplementationProcess />
        <HomeFAQ />
        <FinalCTA />
      </main>
    </>
  );
}
