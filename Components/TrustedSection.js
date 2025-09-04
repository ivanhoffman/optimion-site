// components/TrustedSection.js
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import CalDotComModal from "@/Components/CalDotComModal"; // ⟵ swapped from CalendlyModal

/* One variants object for both reveal + hover states */
const cardVariants = {
  // on-enter reveal
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: "easeOut" },
  },
  // hover polish
  rest: {
    y: 0,
    scale: 1,
    borderColor: "rgba(38,38,38,1)",
    boxShadow: "0 0 0 rgba(0,0,0,0)",
    transition: { duration: 0.18, ease: "easeOut" },
  },
  hover: {
    y: -6,
    scale: 1.01,
    borderColor: "rgba(82,82,91,1)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.35)",
    transition: { duration: 0.18, ease: "easeOut" },
  },
};

const containerStagger = {
  show: { transition: { staggerChildren: 0.06 } },
};

const testimonials = [
  {
    quote:
      "Optimion rebuilt our CRM and automations in weeks. Our team finally trusts the data—and bookings went up immediately.",
    name: "Domini S.",
    role: "CEO",
    industry: "Professional Services",
  },
  {
    quote:
      "The integrations just work. Dashboards show exactly what we need and our follow-ups run 24/7 without babysitting.",
    name: "Ryan M.",
    role: "Founder",
    industry: "E-Commerce",
  },
  {
    quote:
      "We replaced spreadsheets with reliable automations. Technicians get the right jobs and customers get instant updates.",
    name: "Kayla P.",
    role: "CEO",
    industry: "Pest Control",
  },
  {
    quote:
      "From leads to signed contracts—every handoff is automated. It’s cut our admin time by half.",
    name: "Miguel A.",
    role: "Founder",
    industry: "Roofing",
  },
  {
    quote:
      "Pipeline, showings, and follow-ups live in one place now. Our agents move faster and close more.",
    name: "Priya N.",
    role: "CEO",
    industry: "Real Estate",
  },
  {
    quote:
      "Production runs are scheduled automatically and the shop floor stays in sync. Huge step up for ops.",
    name: "Owen K.",
    role: "Founder",
    industry: "Manufacturing",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-yellow-400" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
      ))}
    </div>
  );
}

export default function TrustedSection() {
  const [calOpen, setCalOpen] = useState(false);

  // Cal.com event URL (transparent, themed, embedded)
  const calUrl =
    "https://cal.com/optimion/30min?embed=true&theme=dark&backgroundColor=transparent&primaryColor=22d3ee&textColor=e5e7eb&layout=month_view";

  return (
    <section id="testimonials" className="section-fade relative w-full px-6 md:px-16 py-24 text-white">
      {/* Header & copy */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <p className="uppercase text-sm text-gray-400 tracking-widest mb-3">
          Trusted Across Industries
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-transparent bg-clip-text gradient-text antialiased">
          Built for the way your business runs.
        </h2>
        <p className="text-gray-300 text-lg mt-4">
          From small businesses to enterprises—spanning Healthcare, Hospitality, SaaS, Financial Services, Real Estate, Home Services, Roofing,
          E-Commerce, Manufacturing, and more—we connect the stack, automate the work, and surface the metrics that matter.
        </p>
      </motion.div>

      {/* Testimonials — compact, 3 per row on lg */}
      <motion.div
        variants={containerStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name + i}
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            animate="rest"
            whileHover="hover"
            className="h-full rounded-xl border border-neutral-800 bg-black/25 p-5"
            style={{ willChange: "transform, box-shadow, border-color" }}
          >
            <div className="flex items-center justify-between mb-3">
              <Stars />
              <span className="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                {t.industry}
              </span>
            </div>

            <blockquote className="text-sm text-gray-200 leading-relaxed">
              “{t.quote}”
            </blockquote>

            <figcaption className="mt-4 text-xs text-gray-400">
              <span className="font-medium text-gray-200">{t.name}</span> — {t.role}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-12"
      >
        <button
          type="button"
          onClick={() => setCalOpen(true)}
          className="inline-flex items-center justify-center px-6 py-3 rounded-md text-white bg-gradient-to-r from-cyan-500 to-pink-500 hover:brightness-110 transition shadow-md"
          aria-haspopup="dialog"
          aria-expanded={calOpen ? "true" : "false"}
          data-evt="cta_click"
          data-place="testimonials"
        >
          Book a Free Consultation
        </button>
      </motion.div>

      {/* Modal (Cal.com) */}
      <CalDotComModal
        open={calOpen}
        onClose={() => setCalOpen(false)}
        url={calUrl}
        place="testimonials"
      />
    </section>
  );
}
