// pages/terms.js
import Head from "next/head";

const UPDATED = "September 2025";

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Service — Optimion</title>
        <meta
          name="description"
          content="Terms governing access to and use of Optimion’s website and services, including proposals, payment, confidentiality, IP, warranties, and liability."
        />
        <link rel="canonical" href="/terms" />
      </Head>

      <main className="px-6 md:px-16 py-16 text-white">
        <section className="mx-auto w-full max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-semibold">Terms of Service</h1>
          <p className="text-sm text-gray-400 mt-1">Last updated: {UPDATED}</p>

          <p className="mt-6 text-gray-300">
            These Terms of Service (“Terms”) govern your access to and use of the website and any services provided by{" "}
            <span className="text-white font-medium">Optimion</span> (“we,” “us,” “our”). By using the site or engaging
            our services, you agree to these Terms.
          </p>

          <ol className="mt-8 space-y-6 list-decimal pl-6">
            <li>
              <h2 className="text-lg font-semibold">Use of the Site</h2>
              <p className="mt-2 text-gray-300">
                You may use the site only for lawful purposes. We may modify or discontinue any part of the site at any
                time without notice.
              </p>
            </li>

            <li>
              <h2 className="text-lg font-semibold">Proposals, SOWs &amp; Services</h2>
              <p className="mt-2 text-gray-300">
                Services are described in a proposal or statement of work (SOW). If there is a conflict between these
                Terms and a signed SOW, the SOW controls for that project.
              </p>
            </li>

            <li>
              <h2 className="text-lg font-semibold">Fees &amp; Payment</h2>
              <p className="mt-2 text-gray-300">
                Fees, milestones, and payment schedules are set out in the proposal/SOW. Invoices are due upon receipt
                unless otherwise stated. Late amounts may accrue interest as permitted by law.
              </p>
            </li>

            <li>
              <h2 className="text-lg font-semibold">Client Responsibilities</h2>
              <p className="mt-2 text-gray-300">
                You agree to provide timely access, information, and approvals. Delays may affect timelines and
                delivery.
              </p>
            </li>

            <li>
              <h2 className="text-lg font-semibold">Confidentiality</h2>
              <p className="mt-2 text-gray-300">
                Each party may receive confidential information from the other. The receiving party will protect it and
                use it only to perform under these Terms or an SOW.
              </p>
            </li>

            <li>
              <h2 className="text-lg font-semibold">Intellectual Property</h2>
              <p className="mt-2 text-gray-300">
                Unless otherwise stated in an SOW, upon full payment you own the specific work product delivered for
                your project. Our pre-existing tools, know-how, and libraries remain ours; we may reuse generalized
                learnings that don’t reveal your confidential information.
              </p>
            </li>

            <li>
              <h2 className="text-lg font-semibold">Warranties &amp; Disclaimers</h2>
              <p className="mt-2 text-gray-300">
                We provide the site and services “as is.” To the maximum extent permitted by law, we disclaim all
                warranties, express or implied, including merchantability, fitness for a particular purpose, and
                non-infringement.
              </p>
            </li>

            <li>
              <h2 className="text-lg font-semibold">Limitation of Liability</h2>
              <p className="mt-2 text-gray-300">
                To the fullest extent permitted by law, Optimion will not be liable for indirect, incidental,
                consequential, special, or exemplary damages. Our total liability for any claim is limited to the
                amounts you paid for the applicable services in the 3 months before the claim.
              </p>
            </li>

            <li>
              <h2 className="text-lg font-semibold">Independent Contractors</h2>
              <p className="mt-2 text-gray-300">
                The parties are independent contractors. These Terms do not create a partnership, joint venture, or
                employment relationship.
              </p>
            </li>

            <li>
              <h2 className="text-lg font-semibold">Governing Law</h2>
              <p className="mt-2 text-gray-300">
                These Terms are governed by the laws of your and our principal place of business unless otherwise stated
                in an SOW. Venue and jurisdiction will be in the courts of that location.
              </p>
            </li>

            <li>
              <h2 className="text-lg font-semibold">Changes to Terms</h2>
              <p className="mt-2 text-gray-300">
                We may update these Terms from time to time. Material changes will be posted on this page with an
                updated date.
              </p>
            </li>

            <li>
              <h2 className="text-lg font-semibold">Contact</h2>
              <p className="mt-2 text-gray-300">
                Questions? Email <a className="underline hover:text-white" href="mailto:support@optimion.com">support@optimion.com</a>.
              </p>
            </li>
          </ol>
        </section>
      </main>
    </>
  );
}
