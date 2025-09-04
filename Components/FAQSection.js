// components/FAQSection.js
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Clock3,
  FileBadgeCheck,
  Headphones,
  XCircle,
  Layers,
} from "lucide-react";
import CalDotComModal from "@/Components/CalDotComModal"; // switched to Cal.com modal
import { gaEvent } from "@/lib/gtag"; // <-- NEW: analytics helper

const faqs = [
  {
    icon: CreditCard,
    q: "How do you price projects?",
    a: "Most builds are a fixed-scope, fixed-fee engagement with clear milestones. Larger or ongoing work can switch to a monthly retainer. No surprise overages—any change of scope is quoted first.",
  },
  {
    icon: Lock,
    q: "Is our data secure?",
    a: "Yes. We use best-practice auth, least-privilege access, and store credentials in vaults. You keep control of accounts, and we can sign NDAs and DPAs on request.",
  },
  {
    icon: FileBadgeCheck,
    q: "Who owns the accounts and the IP?",
    a: "You do. All platforms remain in your name, and you retain full ownership of workflows, dashboards, and custom code delivered.",
  },
  {
    icon: Clock3,
    q: "How fast can we go live?",
    a: "Discovery in 1–2 days, a first working slice within 1–2 weeks for most stacks, and full rollout in 3–6 weeks depending on complexity.",
  },
  {
    icon: Headphones,
    q: "What does support look like after launch?",
    a: "We offer a light retainer for monitoring, tweaks, and new integrations. You’ll also get runbooks and handoff videos so your team is self-sufficient.",
  },
  {
    icon: XCircle,
    q: "Can we pause or cancel?",
    a: "Yes. Fixed-fee projects are milestone-based—pause between milestones anytime. Retainers are month-to-month.",
  },
  {
    icon: Layers,
    q: "Will this work with our existing tools?",
    a: "Almost certainly. We’ve connected 2000+ integrations. If a tool isn’t native, we can bridge through APIs or middleware.",
  },
];

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function FAQSection() {
  const [open, setOpen] = useState(0);
  const [calOpen, setCalOpen] = useState(false);

  // Cal.com event URL (dark theme + transparent bg for your glass UI)
  const calUrl =
    "https://cal.com/optimion/30min?embed=true&theme=dark&backgroundColor=transparent&primaryColor=22d3ee&textColor=e5e7eb&layout=month_view";

  return (
    <section id="faq" className="section-fade w-full px-6 md:px-16 py-24 text-white">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="max-w-4xl"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Frequently asked questions
        </h2>
        <p className="text-gray-300 mb-8">
          Straight answers to the things people ask before they book.
        </p>
      </motion.div>

      <div className="max-w-4xl space-y-3">
        {faqs.map((f, i) => {
          const Icon = f.icon ?? ShieldCheck;
          const isOpen = open === i;
          const panelId = `faq-panel-${i}`;
          const buttonId = `faq-button-${i}`;

          return (
            <motion.div
              key={f.q}
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm"
            >
              <button
                id={buttonId}
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => {
                  const willOpen = !isOpen;
                  setOpen(willOpen ? i : -1);
                  if (willOpen) {
                    // fire only when opening
                    gaEvent("faq_open", { question: f.q });
                  }
                }}
                className="w-full text-left px-5 py-4 flex items-center gap-3 hover:bg-white/5 rounded-xl"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                  <Icon className="w-4 h-4 text-cyan-300" />
                </span>
                <span className="font-medium">{f.q}</span>
                <span className="ml-auto text-sm text-gray-400">
                  {isOpen ? "Hide" : "Show"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0 text-gray-300">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* tiny CTA under FAQs */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-4xl mt-8 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-4"
      >
        <span className="text-sm text-gray-200">
          Still have questions? We’ll walk you through your stack.
        </span>
        <button
          type="button"
          onClick={() => setCalOpen(true)}
          className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-pink-500 text-white text-sm hover:brightness-110 transition shadow-md"
          aria-haspopup="dialog"
          aria-expanded={calOpen ? "true" : "false"}
          data-evt="cta_click"     // <-- picked up by global listener
          data-place="faq"         // <-- context for the CTA location
        >
          Ask us on a quick call
        </button>
      </motion.div>

      {/* Modal (Cal.com) */}
      <CalDotComModal
        open={calOpen}
        onClose={() => setCalOpen(false)}
        url={calUrl}
        place="faq"           // <-- context for cal_open/cal_loaded/cal_close
      />
    </section>
  );
}
