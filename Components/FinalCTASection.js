// components/FinalCTASection.js
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Sparkles, Check } from "lucide-react";
import CalendlyModal from "@/Components/CalendlyModal"; // ← added

export default function FinalCTASection() {
  // Calendly modal state (local to this section)
  const [calOpen, setCalOpen] = useState(false); // ← added

  return (
    <section id="final-cta" className="relative w-full px-6 md:px-16 py-24 text-white">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-8 md:p-10 overflow-hidden"
      >
        {/* subtle backdrop glow */}
        <div className="pointer-events-none absolute -right-32 -bottom-32 h-80 w-80 rounded-full bg-gradient-to-br from-cyan-500/20 to-pink-500/20 blur-3xl" />

        <div className="relative grid md:grid-cols-[1.1fr_.9fr] gap-8 items-center">
          <div>
            <p className="uppercase text-sm text-gray-300 tracking-widest mb-2">
              Let’s build your system
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-3">
              Ready to stop fighting tools and start scaling?
            </h2>
            <p className="text-gray-300 mb-6">
              Book a quick consult. We’ll map your stack, outline a build plan,
              and show you the fastest path to ROI.
            </p>

            <ul className="space-y-2 mb-6 text-gray-200">
              {[
                "Fixed-scope plan with clear milestones",
                "Your tools, your accounts — you own everything",
                "Go live in weeks, not months",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                    <Check className="w-3.5 h-3.5 text-cyan-300" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setCalOpen(true)} // ← open Calendly modal
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-medium hover:brightness-110 transition shadow-md"
                aria-haspopup="dialog"
                aria-expanded={calOpen ? "true" : "false"}
              >
                <CalendarDays className="w-4 h-4" />
                Schedule Your Free Consultation
              </button>
              <span className="text-sm text-gray-300">
                <Sparkles className="inline w-4 h-4 mr-1 text-purple-300" />
                First roadmap in 1–2 days.
              </span>
            </div>
          </div>

          {/* simple right column “card” for credibility */}
          <div className="rounded-xl border border-white/10 bg-black/30 p-5 md:p-6">
            <p className="text-sm text-gray-400 mb-3">What you’ll get</p>
            <ul className="space-y-3 text-gray-200">
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-400" />
                Stack review + bottleneck map
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-purple-400" />
                Build plan with timeline & milestones
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-pink-400" />
                Outcome targets (+27% booked calls, −43% manual tasks)
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Optional small sticky CTA for mobile */}
      <div className="md:hidden sticky bottom-4 mt-6">
        <button
          type="button"
          onClick={() => setCalOpen(true)} // ← open Calendly modal
          className="block text-center mx-auto max-w-[520px] px-5 py-3 rounded-md bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-medium shadow-lg hover:brightness-110 transition"
          aria-haspopup="dialog"
          aria-expanded={calOpen ? "true" : "false"}
        >
          Book your free consult
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
