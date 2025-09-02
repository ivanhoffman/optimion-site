// components/LogoWallSection.js
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import CalendlyModal from "@/Components/CalendlyModal"; // ← added

/* ------------------------------- DATA ---------------------------------- */
// Chips reordered: CRM first, All last
const CHIPS = [
  "CRM",
  "E-commerce & Sites",
  "Messaging / Marketing",
  "Payments",
  "Projects & Ops",
  "Support / Helpdesk",
  "Analytics",
  "All",
];

// Remapped & expanded tools
const TOOLS = [
  // E-commerce & Sites
  { name: "Shopify", cat: "E-commerce & Sites" },
  { name: "WooCommerce", cat: "E-commerce & Sites" },
  { name: "Webflow", cat: "E-commerce & Sites" },
  { name: "WordPress", cat: "E-commerce & Sites" },
  { name: "BigCommerce", cat: "E-commerce & Sites" },
  { name: "Magento / Adobe Commerce", cat: "E-commerce & Sites" },
  { name: "Squarespace", cat: "E-commerce & Sites" },
  { name: "Wix", cat: "E-commerce & Sites" },

  // Payments
  { name: "Stripe", cat: "Payments" },
  { name: "PayPal", cat: "Payments" },
  { name: "Square", cat: "Payments" },
  { name: "QuickBooks", cat: "Payments" },
  { name: "Xero", cat: "Payments" },

  // CRM
  { name: "HubSpot", cat: "CRM" },
  { name: "Salesforce", cat: "CRM" },
  { name: "Pipedrive", cat: "CRM" },
  { name: "Zoho CRM", cat: "CRM" },
  { name: "Airtable", cat: "CRM" },

  // Messaging / Marketing
  { name: "ActiveCampaign", cat: "Messaging / Marketing" },
  { name: "Klaviyo", cat: "Messaging / Marketing" },
  { name: "Mailchimp", cat: "Messaging / Marketing" },
  { name: "SendGrid", cat: "Messaging / Marketing" },
  { name: "Twilio", cat: "Messaging / Marketing" },
  { name: "Slack", cat: "Messaging / Marketing" },
  { name: "Calendly", cat: "Messaging / Marketing" },
  { name: "Zoom", cat: "Messaging / Marketing" },

  // Projects & Ops
  { name: "Monday.com", cat: "Projects & Ops" },
  { name: "ClickUp", cat: "Projects & Ops" },
  { name: "Trello", cat: "Projects & Ops" },
  { name: "Asana", cat: "Projects & Ops" },

  // Support / Helpdesk
  { name: "Zendesk", cat: "Support / Helpdesk" },
  { name: "Freshdesk", cat: "Support / Helpdesk" },

  // Analytics / Integrations
  { name: "GA4", cat: "Analytics" },
  { name: "Google Ads", cat: "Analytics" },
  { name: "Meta Ads", cat: "Analytics" },
  { name: "Segment", cat: "Analytics" },
  { name: "Zapier", cat: "Analytics" },
  { name: "Make (Integromat)", cat: "Analytics" },
  { name: "Notion", cat: "Analytics" },
];

/* ----------------------------- ANIMATION -------------------------------- */
const listReveal = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
};

const containerStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

/* ------------------------------ COMPONENT -------------------------------- */
export default function LogoWallSection() {
  // Default to CRM
  const [active, setActive] = useState("CRM");
  // Calendly modal state (local to this section)
  const [calOpen, setCalOpen] = useState(false); // ← added

  const filtered = useMemo(() => {
    if (active === "All") return TOOLS;
    return TOOLS.filter((t) => t.cat === active);
  }, [active]);

  return (
    <section
      id="integrations"
      className="section-fade relative w-full px-6 md:px-16 py-20 text-white"
    >
      <div className="max-w-5xl">
        <p className="uppercase text-sm text-gray-400 tracking-widest mb-3">
          Compatibility
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold mb-3">
          We work with the tools you already use.
        </h2>
        <p className="text-gray-300 mb-8">
          You keep your data &amp; accounts. We wire them together.
        </p>

        {/* Filter chips */}
        <div
          role="tablist"
          aria-label="Tool categories"
          className="flex flex-wrap gap-2 mb-6"
        >
          {CHIPS.map((label) => {
            const isActive = label === active;
            return (
              <button
                key={label}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(label)}
                className={`px-3.5 py-2 rounded-full text-sm border transition outline-none
                  ${
                    isActive
                      ? "bg-white/10 border-white/25 text-white"
                      : "bg-transparent border-white/10 text-gray-200 hover:border-white/20 focus-visible:ring-2 focus-visible:ring-white/20"
                  }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Logo grid (keyed by active so the stagger replay is guaranteed) */}
      <motion.div
        key={active}
        variants={containerStagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5"
      >
        {filtered.map((t) => (
          <motion.div
            key={`${t.name}-${t.cat}`}
            variants={listReveal}
            whileHover={{ y: -4, scale: 1.01 }}
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm h-16 md:h-18 flex items-center justify-center px-3"
            style={{ willChange: "transform" }}
            aria-label={`${t.name} logo`}
            title={t.name}
          >
            {/* Placeholder text mark — swap for SVG logos later */}
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-cyan-500/30 to-pink-500/30 text-[11px] leading-none text-white/90">
                {t.name.slice(0, 2)}
              </span>
              <span className="text-sm md:text-[15px] text-gray-100/90 tracking-wide">
                {t.name}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Microcopy */}
      <p className="text-sm text-gray-400 mt-6">
        Don’t see your tool? We’ve probably connected it.{" "}
        <span className="text-gray-200">Ask us.</span>
      </p>

      {/* Slim CTA band */}
      <div className="mt-8 rounded-xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="text-sm text-gray-200">
          See your stack working together in a free consult.
        </span>
        <button
          type="button"
          onClick={() => setCalOpen(true)} // ← open Calendly modal
          className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-pink-500 text-white text-sm hover:brightness-110 transition shadow-md"
          aria-haspopup="dialog"
          aria-expanded={calOpen ? "true" : "false"}
        >
          See your stack → Book a free consult
        </button>
      </div>

      {/* Calendly Modal */}
      <CalendlyModal
        open={calOpen}
        isOpen={calOpen} // defensive: supports either prop name
        onClose={() => setCalOpen(false)}
        url="https://calendly.com/ivan-optimion/30min"
        colors={{
          background: "#0b0b0d",
          text: "#e5e7eb",
          primary: "#22d3ee",
        }}
      />
    </section>
  );
}
