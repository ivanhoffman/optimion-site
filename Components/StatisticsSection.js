// Components/StatisticsSection.js
"use client";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

/** Reusable animated counter */
function Counter({ to, duration = 1.4, suffix = "+" }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration, ease: "easeOut" });
    return controls.stop;
  }, [inView, mv, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const stats = [
  { label: "Integrations Connected", value: 2000 },
  { label: "Custom Workflows Implemented", value: 3000 },
  { label: "Dashboards & Reports Deployed", value: 900 },
  { label: "Average Response Time Reduction", value: 78, suffix: "%↓" },
];

export default function StatisticsSection() {
  return (
    <section id="stats" className="section-fade relative w-full px-6 md:px-16 py-24 text-white">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <p className="uppercase text-sm text-gray-400 tracking-widest mb-3">By the Numbers</p>
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-transparent bg-clip-text gradient-text antialiased">
          Systems that scale—measurably.
        </h2>
        <p className="text-gray-300 text-lg mt-4">
          We connect stacks, automate the busywork, and surface the metrics that matter.
        </p>
      </motion.div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="rounded-xl border border-neutral-800 bg-black/20 p-6"
          >
            <div className="text-3xl md:text-4xl font-semibold">
              <Counter to={s.value} suffix={s.suffix ?? "+"} />
            </div>
            <div className="text-sm text-gray-400 mt-2">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
