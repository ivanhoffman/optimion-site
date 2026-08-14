"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TECHNOLOGY_CATEGORIES } from "@/lib/site";

export default function TechnologyEcosystem() {
  const [activeCategory, setActiveCategory] = useState(TECHNOLOGY_CATEGORIES[0].name);
  const active = TECHNOLOGY_CATEGORIES.find((category) => category.name === activeCategory) || TECHNOLOGY_CATEGORIES[0];

  return (
    <section id="technology" className="scroll-mt-20 px-6 py-20 md:px-16 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="section-kicker">Technology ecosystem</p>
          <h2 className="section-title">We work with the systems your business already depends on.</h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-400">Optimion connects operational platforms across ERP, CRM, finance, data, commerce, communications, and Microsoft 365.</p>
        </div>

        <div role="tablist" aria-label="Technology categories" className="mt-10 flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible">
          {TECHNOLOGY_CATEGORIES.map((category, index) => {
            const selected = category.name === activeCategory;
            return (
              <button
                key={category.name}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`technology-panel-${index}`}
                onClick={() => setActiveCategory(category.name)}
                className={`min-h-11 shrink-0 rounded-full border px-4 py-2 text-sm transition ${selected ? "border-cyan-300/50 bg-cyan-300/10 text-white" : "border-white/10 bg-white/[0.025] text-gray-300 hover:border-white/25 hover:text-white"}`}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        {TECHNOLOGY_CATEGORIES.map((category) => {
          const selected = category.name === active.name;
          return (
            <motion.div
              id={`technology-panel-${TECHNOLOGY_CATEGORIES.indexOf(category)}`}
              key={category.name}
              role="tabpanel"
              hidden={!selected}
              initial={false}
              animate={selected ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-5 md:p-8"
            >
              <div className="flex flex-col gap-2 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">
                <h3 className="text-2xl font-semibold text-white">{category.name}</h3>
                <p className="text-sm text-gray-500">Platforms we work with</p>
              </div>
              <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {category.systems.map((system) => (
                  <li key={system} className="flex min-h-16 items-center gap-3 rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-gray-200">
                    <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 text-xs font-semibold text-white">{system.slice(0, 2).toUpperCase()}</span>
                    <span className="leading-snug">{system}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
        <p className="mt-5 text-xs leading-relaxed text-gray-600">Platform names indicate implementation experience and compatibility; trademarks belong to their respective owners.</p>
      </div>
    </section>
  );
}
