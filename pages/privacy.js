// pages/privacy.js
import Head from "next/head";

const UPDATED = "September 2025";

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy — Optimion</title>
        <meta
          name="description"
          content="How Optimion collects, uses, and protects information. Contact info, project details, usage data, data sharing, retention, and your rights."
        />
        <link rel="canonical" href="/privacy" />
      </Head>

      <main className="px-6 md:px-16 py-16 text-white">
        <section className="mx-auto w-full max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-semibold">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mt-1">Last updated: {UPDATED}</p>

          <p className="mt-6 text-gray-300">
            This Privacy Policy explains how <span className="text-white font-medium">Optimion</span> (“we,” “us,” “our”)
            collects, uses, and protects information when you visit our website or work with us.
          </p>

          {/* Information We Collect */}
          <h2 className="mt-10 text-xl font-semibold">Information We Collect</h2>
          <ul className="mt-3 space-y-2 text-gray-300 list-disc pl-6">
            <li>
              <span className="text-white font-medium">Contact information</span> you provide (name, email, phone) when
              requesting a consultation or contacting support.
            </li>
            <li>
              <span className="text-white font-medium">Project details</span> you share during discovery or onboarding
              (goals, tech stack, requirements).
            </li>
            <li>
              <span className="text-white font-medium">Usage data</span> such as pages viewed and referrer, used to
              improve the site and advertising performance.
            </li>
          </ul>

          {/* How We Use Information */}
          <h2 className="mt-10 text-xl font-semibold">How We Use Information</h2>
          <ul className="mt-3 space-y-2 text-gray-300 list-disc pl-6">
            <li>Respond to inquiries and schedule consultations.</li>
            <li>Deliver services under a proposal, SOW, or contract.</li>
            <li>Improve our website, ads, and communications.</li>
            <li>Comply with legal, security, and fraud-prevention requirements.</li>
          </ul>

          {/* Analytics & Tools */}
          <h2 className="mt-10 text-xl font-semibold">Analytics &amp; Tools</h2>
          <p className="mt-3 text-gray-300">
            We may use privacy-respecting analytics and advertising tools (e.g., Google products) to understand site
            performance. We don’t sell personal information.
          </p>

          {/* Calendly */}
          <h2 className="mt-10 text-xl font-semibold">Calendly</h2>
          <p className="mt-3 text-gray-300">
            When you book a meeting through Calendly, your submission is processed by Calendly per their terms and
            privacy policy. We use the data only to manage your appointment.
          </p>

          {/* Data Sharing */}
          <h2 className="mt-10 text-xl font-semibold">Data Sharing</h2>
          <ul className="mt-3 space-y-2 text-gray-300 list-disc pl-6">
            <li>We don’t sell or rent your data.</li>
            <li>
              We may share limited information with vendors that help us operate the site or deliver services (e.g.,
              hosting, scheduling, analytics), bound by confidentiality and data-processing terms.
            </li>
          </ul>

          {/* Data Retention */}
          <h2 className="mt-10 text-xl font-semibold">Data Retention</h2>
          <p className="mt-3 text-gray-300">
            We retain information only as long as needed to provide services, meet legal obligations, or resolve
            disputes. You can ask us to delete your data where applicable.
          </p>

          {/* Your Rights */}
          <h2 className="mt-10 text-xl font-semibold">Your Rights</h2>
          <ul className="mt-3 space-y-2 text-gray-300 list-disc pl-6">
            <li>Request access to, correction of, or deletion of your personal information.</li>
            <li>Object to or restrict certain processing, where permitted by law.</li>
            <li>Contact us to exercise your rights or ask questions.</li>
          </ul>

          {/* Children */}
          <h2 className="mt-10 text-xl font-semibold">Children’s Privacy</h2>
          <p className="mt-3 text-gray-300">
            Our services are not directed to children under 13. We do not knowingly collect personal information from
            children.
          </p>

          {/* Contact */}
          <h2 className="mt-10 text-xl font-semibold">Contact</h2>
          <p className="mt-3 text-gray-300">
            Email: <a className="underline hover:text-white" href="mailto:support@optimion.com">support@optimion.com</a>
          </p>
        </section>
      </main>
    </>
  );
}
