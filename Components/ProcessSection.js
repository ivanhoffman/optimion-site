// Components/ProcessSection.js
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PhoneCall, Cog, Rocket } from "lucide-react";
import CalendlyModal from "@/Components/CalendlyModal"; // ← added

const steps = [
  {
    icon: PhoneCall,
    title: "1) Book a Discovery Call",
    desc: "We learn your goals, tech stack, and bottlenecks to map the fastest path to ROI.",
  },
  {
    icon: Cog,
    title: "2) Build & Integrate",
    desc: "We design your custom CRM, automations, and integrations—then connect everything end-to-end.",
  },
  {
    icon: Rocket,
    title: "3) Launch & Scale",
    desc: "We deploy, monitor, and optimize dashboards and workflows so your team can focus on growth.",
  },
];

/** Instant hover-in, smooth hover-out */
const cardVariants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: "0 0 0 rgba(0,0,0,0)",
    borderColor: "rgba(38,38,38,1)", // neutral-800
    transition: { duration: 0.2, ease: "easeOut" }, // <-- smooth out
  },
  hover: {
    y: -8,
    scale: 1.03,
    boxShadow: "0 8px 25px rgba(0, 200, 255, 0.25)",
    borderColor: "rgba(34,211,238,0.9)", // cyan
    transition: { duration: 0 }, // <-- instant in
  },
};

export default function ProcessSection() {
  // Calendly modal state (local to this section)
  const [calOpen, setCalOpen] = useState(false);

  return (
    <section id="process" className="section-fade relative w-full px-6 md:px-16 py-24 text-white">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl"
      >
        <p className="uppercase text-sm text-gray-400 tracking-widest mb-3">
          How It Works
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-transparent bg-clip-text gradient-text antialiased">
          From Call → System → Scale
        </h2>
        <p className="text-gray-300 text-lg mt-4">
          A simple, battle-tested process that gets you real outcomes without the chaos.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              variants={cardVariants}
              initial="rest"
              animate="rest"
              whileHover="hover"
              className="relative rounded-xl border border-neutral-800 bg-black/20 p-6"
              style={{ willChange: "transform, box-shadow, border-color" }}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-xl border border-neutral-800 bg-neutral-950 p-3">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  <p className="text-gray-300 mt-2 leading-relaxed">{s.desc}</p>
                </div>
              </div>
              <div className="absolute left-6 right-6 bottom-0 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12"
      >
        <button
          type="button"
          onClick={() => setCalOpen(true)} // ← open Calendly modal
          className="inline-flex items-center justify-center px-6 py-3 rounded-md text-white bg-gradient-to-r from-cyan-500 to-pink-500 hover:brightness-110 transition shadow-md"
          aria-haspopup="dialog"
          aria-expanded={calOpen ? "true" : "false"}
        >
          Schedule Your Free Consultation
        </button>
      </motion.div>

      {/* Calendly Modal */}
      <CalendlyModal
        open={calOpen}
        isOpen={calOpen} // (defensive) supports either prop name
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
