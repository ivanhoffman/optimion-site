// Components/HeroSection.js
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import CalendlyModal from "@/Components/CalendlyModal";

/**
 * Per-chip controls:
 *  - angle: degrees around the circle (0=top, 90=right, 180=bottom, 270=left)
 *  - radius: absolute distance from center (optional)
 *  - rFromRing: distance from the animated ring (overrides radius if present)
 *  - dx/dy: screen-space nudges (px). Negative dx = left, negative dy = up.
 *  - outward: push along the angle’s normal (positive = farther from center)
 *  - anchor: "auto" | "left" | "right" | "top" | "bottom" | "center"
 */
function HeroVisual() {
  // --- Circle geometry ---
  const SIZE = 520;
  const cx = SIZE / 2, cy = SIZE / 2;
  const R_DISC = 245;
  const R_RING = 235;

  // Default chip radius (a little outside the ring)
  const R_DEFAULT = R_RING + 12;

  // === CHIP CONTROLS (angles unchanged) ===
  const CHIPS = [
    { label: "Assessment",    angle: 350, rFromRing: 12, dx: -14, anchor: "top" },
    { label: "Configuration", angle:  50, rFromRing: 12, dx: -10, anchor: "auto" },
    { label: "Integration",   angle: 115, rFromRing: 12, dx: -6,  anchor: "auto" },
    { label: "Training",      angle: 189, rFromRing: 12, dx: -12, anchor: "bottom" },
    { label: "Optimization",  angle: 245, rFromRing: 0,  dx: -130, dy: -2, outward: 0, anchor: "center" },
    { label: "Process Design",angle: 310, rFromRing: 12, dx: -136, outward: 4, anchor: "left" },
  ];

  // Helpers
  const toXY = (angleDeg, radius) => {
    const a = ((angleDeg - 90) * Math.PI) / 180; // 0° at top
    return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a), a };
  };

  const anchorTransform = (a, forced) => {
    if (forced && forced !== "auto") {
      switch (forced) {
        case "left": return "translate(-100%, -50%)";
        case "right": return "translate(0, -50%)";
        case "top": return "translate(-50%, -100%)";
        case "bottom": return "translate(-50%, 0)";
        case "center": return "translate(-50%, -50%)";
        default: break;
      }
    }
    const cos = Math.cos(a), sin = Math.sin(a);
    if (Math.abs(cos) > Math.abs(sin)) {
      return cos > 0 ? "translate(0, -50%)" : "translate(-100%, -50%)";
    } else {
      return sin > 0 ? "translate(-50%, 0)" : "translate(-50%, -100%)";
    }
  };

  // Build chip positions (no clamping — your dx/dy are literal)
  const chips = CHIPS.map((c, i) => {
    const baseR = c.rFromRing !== undefined ? R_RING + c.rFromRing : (c.radius ?? R_DEFAULT);
    const { x: px, y: py, a } = toXY(c.angle, baseR);
    const out = c.outward ?? 0;

    let x = px + out * Math.cos(a);
    let y = py + out * Math.sin(a);
    x += c.dx ?? 0;
    y += c.dy ?? 0;

    return {
      label: c.label,
      left: `${x}px`,
      top: `${y}px`,
      transform: anchorTransform(a, c.anchor),
      delay: 0.25 + i * 0.12,
    };
  });

  return (
    <div className="relative w-[520px] h-[520px] pointer-events-none">
      {/* DISC + NETWORK (bottom layer) */}
      <div className="absolute inset-0 rounded-full overflow-hidden opacity-90 z-0">
        <svg
          width="100%" height="100%" viewBox={`0 0 ${SIZE} ${SIZE}`}
          xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Animated system network"
        >
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <radialGradient id="disc" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.85" />
            </radialGradient>
          </defs>

          {/* Dark disc */}
          <circle cx={cx} cy={cy} r={R_DISC} fill="url(#disc)" />

          {/* Orbit ring */}
          <circle cx={cx} cy={cy} r={R_RING} fill="none" stroke="url(#g1)" strokeWidth="2" strokeLinecap="round" className="orbit" />

          {/* Connections */}
          <g stroke="url(#g1)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9">
            <path className="draw d1" d={`M150 180 L260 120 L370 180`} />
            <path className="draw d2" d={`M150 180 L160 320 L260 380`} />
            <path className="draw d3" d={`M370 180 L370 320 L260 380`} />
            <path className="draw d4" d={`M160 320 L260 260 L370 320`} />
            <path className="draw d5" d={`M260 120 L260 260`} />
          </g>

          {/* Nodes */}
          <g fill="none" stroke="url(#g1)" strokeWidth="2">
            {[[150,180],[260,120],[370,180],[160,320],[260,380],[370,320],[260,260]].map(([x,y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="9" opacity="0.35" />
                <circle className="pulse" cx={x} cy={y} r="4.5" />
              </g>
            ))}
          </g>

          {/* Central tick */}
          <g stroke="url(#g1)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.95">
            <path className="tick" d={`M244 262 L256 274 L280 248`} />
          </g>

          <style>{`
            .orbit{ stroke-dasharray: 280 1500; animation: orbit 6s linear infinite }
            @keyframes orbit { to { stroke-dashoffset: -1780 } }
            .draw{ stroke-dasharray:400; stroke-dashoffset:400; animation:draw 2.2s ease-out infinite }
            .d2{ animation-delay:.35s } .d3{ animation-delay:.7s } .d4{ animation-delay:1.05s } .d5{ animation-delay:1.4s }
            .pulse{ animation:pulse 2.4s ease-in-out infinite; transform-origin:center }
            .tick{ stroke-dasharray:80; stroke-dashoffset:80; animation:tick 1.2s ease-out infinite; animation-delay:1.9s }
            @keyframes draw{ 0%{stroke-dashoffset:400;opacity:0} 15%{opacity:.9} 60%{stroke-dashoffset:0;opacity:.9} 100%{stroke-dashoffset:0;opacity:.15} }
            @keyframes pulse{ 0%,100%{r:4.5;opacity:1} 50%{r:7.5;opacity:.5} }
            @keyframes tick{ 0%{stroke-dashoffset:80;opacity:0} 40%{stroke-dashoffset:0;opacity:1} 100%{stroke-dashoffset:0;opacity:.2} }
            @media (prefers-reduced-motion: reduce){ .orbit,.draw,.pulse,.tick{ animation:none !important } }
          `}</style>
        </svg>
      </div>

      {/* Chips (with subtle shadow for readability) */}
      <div className="absolute inset-0 z-10">
        {chips.map((p) => (
          <motion.span
            key={p.label}
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, delay: p.delay }}
            className="absolute flex items-center gap-1.5 rounded-full border border-neutral-800 bg-black/60 text-gray-200 text-xs md:text-sm px-3 py-1 backdrop-blur-[2px] whitespace-nowrap shadow-[0_0_12px_rgba(0,0,0,0.35)]"
            style={{ top: p.top, left: p.left, transform: p.transform }}
          >
            <Check className="w-3.5 h-3.5 text-cyan-400" />
            {p.label}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [showCal, setShowCal] = useState(false);

  return (
    <section id="hero" className="section-fade relative min-h-screen text-white flex items-center justify-between px-6 md:px-16 overflow-visible">
      <div className="max-w-2xl z-10">
        <motion.h1
          initial={{opacity:0,x:-50}}
          whileInView={{opacity:1,x:0}}
          transition={{duration:.8}}
          viewport={{once:true}}
          className="mb-4"
        >
          <span className="text-4xl md:text-5xl font-medium leading-tight text-transparent bg-clip-text gradient-text antialiased">
            Welcome to the
          </span>
        </motion.h1>

        <motion.h2
          initial={{opacity:0,x:-50}}
          whileInView={{opacity:1,x:0}}
          transition={{delay:.2,duration:.8}}
          viewport={{once:true}}
          className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 text-transparent bg-clip-text"
        >
          Optimion System
        </motion.h2>

        <motion.p
          initial={{opacity:0,x:-50}}
          whileInView={{opacity:1,x:0}}
          transition={{delay:.4,duration:.8}}
          viewport={{once:true}}
          className="text-gray-300 text-lg max-w-lg mb-6"
        >
          We build custom CRMs, powerful automations, and optimized workflows for any business. Eliminate bottlenecks. Unlock growth.
        </motion.p>

        <motion.button
          type="button"
          onClick={() => setShowCal(true)}
          initial={{opacity:0,y:20}}
          whileInView={{opacity:1,y:0}}
          transition={{delay:.6,duration:.6}}
          viewport={{once:true}}
          className="group inline-flex items-center gap-2 px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 rounded-md text-sm transition-colors"
        >
          Book a Free Call
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>

      {/* RIGHT VISUAL */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 flex items-center justify-center">
        <HeroVisual />
      </div>

      {/* Stylized Calendly modal */}
      <CalendlyModal
        open={showCal}
        onClose={() => setShowCal(false)}
        url="https://calendly.com/ivan-optimion/30min"
        colors={{
          background: "#0b0b0d",
          text: "#e5e7eb",
          primary: "#22d3ee", // try "#8b5cf6" or "#ec4899" to match your gradient accents
        }}
      />
    </section>
  );
}
