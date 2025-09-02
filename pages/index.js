// pages/index.js
import Head from "next/head";

import HeroSection from "@/Components/HeroSection";
import WhyOptimion from "@/Components/WhyOptimion";
import AboutSection from "@/Components/AboutSection";
import ProcessSection from "@/Components/ProcessSection";
import StatisticsSection from "@/Components/StatisticsSection";
import LogoWallSection from "@/Components/LogoWallSection";
import FAQSection from "@/Components/FAQSection";
import FinalCTASection from "@/Components/FinalCTASection";
import TrustedSection from "@/Components/TrustedSection";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.optimion.com";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`; // ensure this exists
const LOGO_URL = `${SITE_URL}/logo.png`;     // ensure this exists (512x512+)

const TITLE = "Optimion — CRM, Automations & Integrations that Scale";
const DESC =
  "We build custom CRMs, workflow automations, and integrations that cut busywork and boost conversions. Book a free consult to map your fastest path to ROI.";

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Optimion",
  url: SITE_URL,
  logo: LOGO_URL,
  // no sameAs yet (no social profiles)
};

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you price projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Most builds are a fixed-scope, fixed-fee engagement with clear milestones. Larger or ongoing work can switch to a monthly retainer. No surprise overages—any change of scope is quoted first.",
      },
    },
    {
      "@type": "Question",
      name: "Is our data secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. We use best-practice auth, least-privilege access, and store credentials in vaults. You keep control of accounts, and we can sign NDAs and DPAs on request.",
      },
    },
    {
      "@type": "Question",
      name: "Who owns the accounts and the IP?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "You do. All platforms remain in your name, and you retain full ownership of workflows, dashboards, and custom code delivered.",
      },
    },
    {
      "@type": "Question",
      name: "How fast can we go live?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Discovery in 1–2 days, a first working slice within 1–2 weeks for most stacks, and full rollout in 3–6 weeks depending on complexity.",
      },
    },
    {
      "@type": "Question",
      name: "What does support look like after launch?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "We offer a light retainer for monitoring, tweaks, and new integrations. You’ll also get runbooks and handoff videos so your team is self-sufficient.",
      },
    },
    {
      "@type": "Question",
      name: "Can we pause or cancel?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Fixed-fee projects are milestone-based—pause between milestones anytime. Retainers are month-to-month.",
      },
    },
    {
      "@type": "Question",
      name: "Will this work with our existing tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Almost certainly. We’ve connected 2000+ integrations. If a tool isn’t native, we can bridge through APIs or middleware.",
      },
    },
  ],
};

function Home() {
  return (
    <>
      <Head>
        {/* Basic */}
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta name="theme-color" content="#0b0b0d" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Optimion" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:locale" content="en_US" />

        {/* Preconnect for Calendly assets (modal) */}
        <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
        />
      </Head>

      <main id="main">
        <HeroSection />
        <WhyOptimion />
        <AboutSection />
        <ProcessSection />
        <StatisticsSection />
        <LogoWallSection />
        <TrustedSection />
        <FAQSection />
        <FinalCTASection />
      </main>
    </>
  );
}

// Optional: uncomment to hide deep nav (ad landing variant)
// Home.headerVariant = "lp";

export default Home;
