"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Repeat, Link, BarChart, Calendar, Clock, ArrowRight } from "lucide-react";
import CalendlyModal from "@/Components/CalendlyModal";

/* ---------- tiny utils ---------- */
function pad(n) { return n < 10 ? `0${n}` : `${n}`; }
function formatAMPM(d) {
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12; if (h === 0) h = 12;
  return `${h}:${pad(m)} ${ampm}`;
}
function dayLabel(d, now = new Date()) {
  const a = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const b = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diff = Math.round((b - a) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return d.toLocaleDateString(undefined, { weekday: "short" });
}
function roundToNextHalfHour(date = new Date()) {
  const d = new Date(date);
  d.setSeconds(0, 0);
  const m = d.getMinutes();
  if (m === 0 || m === 30) return d;
  if (m < 30) d.setMinutes(30);
  else { d.setHours(d.getHours() + 1); d.setMinutes(0); }
  return d;
}
function generateSlots(count = 3) {
  const slots = [];
  let t = roundToNextHalfHour();
  const open = 10; // 10:00
  const close = 17; // 5:00 PM (last start 4:30)
  while (slots.length < count) {
    const hour = t.getHours();
    const min = t.getMinutes();
    const next = new Date(t);
    if (hour < open) { next.setHours(open, 0, 0, 0); }
    else if (hour > close || (hour === close && min > 0)) {
      next.setDate(next.getDate() + 1);
      next.setHours(open, 0, 0, 0);
    }
    t = next;
    slots.push(new Date(t));
    const step = [1, 2, 3][slots.length % 3];
    t = new Date(t.getTime() + step * 30 * 60000);
  }
  return slots;
}

/* ---------- micro sparkline ---------- */
function Sparkline({ points = [], width = 84, height = 28 }) {
  if (!points.length) return null;
  const min = Math.min(...points), max = Math.max(...points);
  const nx = i => (i / (points.length - 1)) * (width - 2) + 1;
  const ny = v => height - 1 - ((v - min) / (max - min || 1)) * (height - 2);
  const d = points.map((v, i) => `${i ? "L" : "M"} ${nx(i)} ${ny(v)}`).join(" ");
  return (
    <svg width={width} height={height} aria-hidden className="-mb-1">
      <path d={d} fill="none" stroke="url(#sparkGrad)" strokeWidth="2" />
      <defs>
        <linearGradient id="sparkGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ---------- KPI stack (auto-cycling) ---------- */
const KPI_DATA = [
  { value: "+27%", label: "Booked calls", series: [10,12,11,13,15,16,17,18,19] },
  { value: "−43%", label: "Manual tasks", series: [19,18,16,15,13,12,10,9,8] },
  { value: "3.8×", label: "ROI",          series: [1.1,1.2,1.6,2.1,2.4,2.9,3.2,3.6,3.8] },
];

function KPIStack() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % KPI_DATA.length), 3800);
    return () => clearInterval(id);
  }, []);
  const item = KPI_DATA[idx];

  return (
    <div className="w-full">
      <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">Results</div>
      <div className="relative h-[84px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="rounded-xl border border-neutral-800 bg-black/30 p-4 flex items-center justify-between shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]"
          >
            <div>
              <div className="text-2xl font-semibold text-white">{item.value}</div>
              <div className="text-[12px] text-gray-400">{item.label}</div>
            </div>
            <Sparkline points={item.series} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex gap-1 mt-2">
        {KPI_DATA.map((_, i) => (
          <div key={i} className={`h-1.5 w-1.5 rounded-full ${i===idx ? "bg-white/80" : "bg-white/20"}`} />
        ))}
      </div>
    </div>
  );
}

/* ---------- schedule card (CTA) ---------- */
function ScheduleCard({ onOpenCalendly }) {
  const slots = useMemo(() => generateSlots(3), []);
  const [floating, setFloating] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFloating(f => (f + 1) % 3600), 50);
    return () => clearInterval(id);
  }, []);

  const floatY = Math.sin(floating / 35) * 4;

  return (
    <motion.div
      style={{ translateY: floatY }}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent"
        style={{
          background:
            "linear-gradient(120deg, rgba(34,211,238,.14), rgba(139,92,246,.12), rgba(236,72,153,.14)) border-box",
          WebkitMask:
            "linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="flex items-center gap-2 text-white">
        <Calendar className="w-5 h-5 text-cyan-400" />
        <div className="font-medium">Book a free consult</div>
      </div>
      <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
        <Clock className="w-3.5 h-3.5" /> 30 minutes • Strategy & next steps
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2">
        {slots.map((d, i) => (
          <motion.button
            key={i}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            onClick={onOpenCalendly}
            className="w-full text-left rounded-lg px-3 py-2 border border-white/10 bg-black/30 hover:bg-black/40 text-gray-200 flex items-center justify-between"
          >
            <span className="text-[13px]">
              <span className="text-white">{dayLabel(d)}</span> · {formatAMPM(d)}
            </span>
            <ArrowRight className="w-4 h-4 text-white/60" />
          </motion.button>
        ))}
      </div>

      <motion.button
        type="button"
        onClick={onOpenCalendly}
        whileHover={{ y: -1 }}
        className="mt-4 inline-flex items-center justify-center w-full rounded-md px-3 py-2 text-sm text-white bg-gradient-to-r from-cyan-500 to-pink-500 hover:brightness-110"
      >
        See all times
      </motion.button>
    </motion.div>
  );
}

/* ===================================================================== */
export default function WhyOptimion() {
  const [calOpen, setCalOpen] = useState(false);

  return (
    <section
      id="why-optimion"
      className="
        section-fade relative w-full
        px-6 md:px-16
        pt-10 pb-16 md:py-24     /* ⬅️ tighter top/bottom on mobile */
        overflow-visible
        flex flex-col md:flex-row items-center justify-between gap-12
      "
    >
      {/* Left: Text Content */}
      <motion.div
        className="max-w-xl z-10 text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="uppercase text-sm text-gray-400 tracking-widest mb-4">What We Do</p>

        <h2 className="mb-4 md:mb-6 text-4xl md:text-5xl font-medium leading-tight text-transparent bg-clip-text gradient-text antialiased">
          We Build <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Systems</span> That Cut Busywork By Half.
        </h2>

        <p className="text-lg text-gray-300 mb-8">
          Our team of experts build custom CRMs, powerful automations, and seamless integrations so you can stop fighting your tools and start scaling operations.
        </p>

        <ul className="space-y-4 text-gray-200">
          <motion.li className="flex items-center gap-3" whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Repeat className="w-5 h-5 text-cyan-400" />
            Advanced Workflow Automation
          </motion.li>
          <motion.li className="flex items-center gap-3" whileHover={{ scale: 1.03 }}>
            <Settings className="w-5 h-5 text-blue-400" />
            Custom CRM Development
          </motion.li>
          <motion.li className="flex items-center gap-3" whileHover={{ scale: 1.03 }}>
            <Link className="w-5 h-5 text-purple-400" />
            Multi-System Integration
          </motion.li>
          <motion.li className="flex items-center gap-3" whileHover={{ scale: 1.03 }}>
            <BarChart className="w-5 h-5 text-pink-400" />
            Real-Time Reporting & Dashboards
          </motion.li>
        </ul>
      </motion.div>

      {/* Right: KPI stack + Schedule card */}
      <div className="relative z-10 w-full md:max-w-sm lg:max-w-md">
        <KPIStack />
        <ScheduleCard onOpenCalendly={() => setCalOpen(true)} />
      </div>

      {/* Soft gradient backdrop */}
      <motion.div
        className="pointer-events-none absolute right-[-15%] md:right-[-8%] top-1/2 -translate-y-1/2 w-[55vw] md:w-[40vw] h-[55vw] md:h-[40vw] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-20"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        viewport={{ once: true }}
      />

      {/* Calendly Modal (styled) */}
      <CalendlyModal
        open={calOpen}
        isOpen={calOpen}
        onClose={() => setCalOpen(false)}
        url="https://calendly.com/ivan-optimion/30min"
        title="Book a free consult"
      />
    </section>
  );
}
