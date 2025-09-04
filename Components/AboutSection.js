// Components/AboutSection.js
"use client";

import React, { useId, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import CalDotComModal from "@/Components/CalDotComModal"; // ⟵ swapped from CalendlyModal

/**
 * Flowchart with guaranteed-visible stems + wrapped diamond labels +
 * card reveal + thin traveling glow under crisp lines.
 */
export default function AboutSection() {
  const [calOpen, setCalOpen] = useState(false);

  // Cal.com event URL (transparent, dark, your brand colors)
  const calUrl =
    "https://cal.com/optimion/30min?embed=true&theme=dark&backgroundColor=transparent&primaryColor=22d3ee&textColor=e5e7eb&layout=month_view";

  return (
    <section
      id="about"
      className="
        section-fade relative
        min-h-[80svh] md:min-h-screen
        flex flex-col-reverse md:flex-row
        items-center justify-between
        px-6 md:px-16
        py-14 md:py-24
        overflow-visible text-white
      "
    >
      {/* LEFT: Flowchart — hidden on mobile */}
      <div className="hidden md:flex w-full md:w-1/2 justify-center items-center">
        <Flowchart />
      </div>

      {/* RIGHT: copy & CTA */}
      <div className="w-full md:w-1/2 md:pl-16 text-right z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-snug">
          Convert more leads <br />
          with smart automations
        </h2>

        <p className="text-gray-300 text-lg mb-6">
          We build flows that recover lost sales, automate follow-ups, and keep your funnel
          working 24/7.
        </p>

        <ul className="space-y-3 mb-6">
          {[
            "Automated email & SMS follow-up",
            "Abandoned cart recovery",
            "Mailchimp, ActiveCampaign, Klaviyo",
            "Drag-n-drop workflows",
            "Higher conversions, less manual work",
          ].map((item, i) => (
            <motion.li
              key={item}
              className="flex items-center justify-end gap-2 text-sm text-gray-200"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              viewport={{ once: true }}
            >
              <span>{item}</span>
              <CheckCircle className="text-cyan-400 w-4 h-4" />
            </motion.li>
          ))}
        </ul>

        <motion.button
          type="button"
          onClick={() => setCalOpen(true)}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          viewport={{ once: true }}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-md shadow-md hover:brightness-110 transition"
          aria-haspopup="dialog"
          aria-expanded={calOpen ? "true" : "false"}
          /* NEW: global listener picks this up as a separate cta_click event */
          data-evt="cta_click"
          data-place="about"
        >
          Schedule Your Free Consultation
        </motion.button>
      </div>

      {/* Modal (Cal.com) — centralizes cal_open / cal_loaded / cal_close tracking */}
      <CalDotComModal
        open={calOpen}
        onClose={() => setCalOpen(false)}
        url={calUrl}
        /* NEW: so modal emits events with context */
        place="about"
        /* trackOpen defaults to true in the modal */
      />
    </section>
  );
}

/* ============================= FLOWCHART ============================== */

function Flowchart() {
  // Board & grid
  const BOARD = { pad: 28, cornerR: 18, orbitStroke: "#1f2937", strokeW: 1.25, scale: 0.85 };
  const GRID = { cols: 3, rows: 9, colW: 250, rowH: 92 };

  // Node defaults
  const NODE = { rectW: 210, rectH: 56, diamond: 74, radius: 18 };

  // Edge visuals
  const STROKE = { width: 2.25 };
  const ARROW = { tipH: 8, tipW: 6, stemPad: 8 };

  // GLOBAL diamond title nudges
  const DIAMOND_TITLE_DEFAULT_DX = 0;
  const DIAMOND_TITLE_DEFAULT_DY = 3;

  const toXY = (c, r) => ({
    x: BOARD.pad + c * GRID.colW + GRID.colW / 2,
    y: BOARD.pad + r * GRID.rowH + GRID.rowH / 2,
  });

  /* ------------------------- NODES ------------------------- */
  const nodes = [
    N("start", "rect", 1, 0, "Start / Triggers", "Form • Cart • Webhook"),
    N("cap", "rect", 1, 1, "Capture Event", "Normalize fields"),
    N("enrich", "rect", 1, 2, "Enrich & De-dupe", "Verify • Merge"),

    // Force 3 lines + nudge down slightly
    N("known", "diamond", 1, 3, "Known in CRM?", "", {
      titleLines: ["Known", "in", "CRM?"],
      titleDy: 3,
    }),

    N("update", "rect", 0, 4, "Update CRM Record", "Advance stage"),
    N("seg", "rect", 2, 4, "Segment & Score", "Hot • Warm • Nurture"),

    N("win", "rect", 0, 5, "Winback / Loyalty", "Email • SMS"),
    N("cad", "rect", 2, 5, "Cadence", "Email → SMS → Wait"),

    // Force 2 lines
    N("hiQ", "diamond", 0, 6, "High intent?", "", { dy: -10, titleLines: ["High", "intent?"] }),
    N("intent", "diamond", 2, 6, "Intent check?", "", { dy: -10 }),

    N("bookL", "rect", 0, 7, "Booked / Checkout", "Calendar / Pay", { w: 188, dx: -50, dy: 20 }),
    N("esc",   "rect", 1, 7, "Escalate", "Call task", { w: 188, dx: -68, dy: 20 }),
    N("bookR", "rect", 2, 7, "Booked / Checkout", "Calendar / Pay", { w: 186, dx: -110, dy: 20 }),
    N("recy",  "rect", 2, 7, "Recycle", "Retarget • Retry", { w: 170, dx: 70, dy: 20 }),

    N("crm", "rect", 1, 8, "CRM Update & Notify", "Create/Update • Slack", { w: 238, dy: 30 }),
  ];

  /* ------------------------- EDGES ------------------------- */
  const edges = [
    // same-column chains
    E("start", "cap"),
    E("cap", "enrich"),
    E("enrich", "known"),

    // Decision → left/right (elbows)
    E("known", "update", "vh", {
      label: "YES",
      labelAt: 0.22,
      labelDx: -10,
      labelDy: -8,
      bendY: toXY(0, 4).y - GRID.rowH / 2 + 6,
    }),
    E("known", "seg", "vh", {
      label: "NO",
      labelAt: 0.78,
      labelDy: -8,
      bendY: toXY(2, 4).y - GRID.rowH / 2 + 6,
    }),

    // middle same-column
    E("update", "win"),
    E("seg", "cad"),

    // lower decisions
    E("win", "hiQ"),
    E("cad", "intent"),

    // decisions → outcomes (elbows)
    E("hiQ", "bookL", "vh", {
      label: "YES",
      labelAt: 0.14,
      labelDx: -14,
      labelDy: -8,
      bendY: toXY(0, 7).y - GRID.rowH / 2 - 10,
    }),
    E("hiQ", "esc", "vh", {
      label: "NO",
      labelAt: 0.86,
      labelDy: -8,
      bendY: toXY(1, 7).y - GRID.rowH / 2 - 10,
    }),
    E("intent", "bookR", "vh", {
      label: "YES",
      labelAt: 0.16,
      labelDx: -14,
      labelDy: -8,
      bendY: toXY(2, 7).y - GRID.rowH / 2 - 10,
    }),
    E("intent", "recy", "vh", {
      label: "NO",
      labelAt: 0.80,
      labelDy: -8,
      bendY: toXY(2, 7).y - GRID.rowH / 2 - 10,
    }),

    // collector
    E("bookL", "crm", "vh", { bend: "collector" }),
    E("esc",   "crm", "vh", { bend: "collector" }),
    E("bookR", "crm", "vh", { bend: "collector" }),
    E("recy",  "crm", "vh", { bend: "collector" }),
  ];

  /* ------------------------------- BUILD ------------------------------ */

  const W = BOARD.pad * 2 + GRID.cols * GRID.colW;
  const H = BOARD.pad * 2 + GRID.rows * GRID.rowH;

  const byId = Object.fromEntries(
    nodes.map((n) => {
      const base = toXY(n.col, n.row);
      const isDiamond = n.type === "diamond";
      const scale = (n.opts?.scale ?? 1) * BOARD.scale;
      const w = (n.opts?.w ?? (isDiamond ? NODE.diamond : NODE.rectW)) * scale;
      const h = (n.opts?.h ?? (isDiamond ? NODE.diamond : NODE.rectH)) * scale;
      const dx = n.opts?.dx ?? 0;
      const dy = n.opts?.dy ?? 0;
      return [n.id, { ...n, ...base, x: base.x + dx, y: base.y + dy, w, h, scale }];
    })
  );

  const bottomOf = (n) => ({ x: n.x, y: n.y + n.h / 2 });
  const topOf    = (n) => ({ x: n.x, y: n.y - n.h / 2 });
  const rightOf  = (n) => ({ x: n.x + n.w / 2, y: n.y });

  const pathVH = (s, t, bendY) => {
    const A = bottomOf(s);
    const B = topOf(t); // ← fixed
    const y = bendY ?? (s.y + t.y) / 2;
    const endY = B.y - ARROW.stemPad;
    return { d: `M ${A.x} ${A.y} L ${A.x} ${y} L ${B.x} ${y} L ${B.x} ${endY}`, end: { x: B.x, y: B.y } };
  };

  const pathHVH = (s, t, bendY) => {
    const A = rightOf(s);
    const B = topOf(t);
    const y = bendY ?? (s.y + t.y) / 2;
    const midX = (A.x + B.x) / 2;
    const endY = B.y - ARROW.stemPad;
    return {
      d: `M ${A.x} ${A.y} L ${midX} ${A.y} L ${midX} ${y} L ${B.x} ${y} L ${B.x} ${endY}`,
      end: { x: B.x, y: B.y },
    };
  };

  const collectorY = topOf(byId["crm"]).y - 24;

  const uid = useId().replace(/:/g, "-");
  const gradId = `grad-${uid}`;
  const discId = `disc-${uid}`;
  const glowId = `glow-${uid}`;

  return (
    <motion.div
      id="process-flowchart"
      initial={{ rotateY: -8, opacity: 0, scale: 0.98 }}
      whileInView={{ rotateY: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-[620px] max-w-full"
    >
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Automation flowchart">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>

          <radialGradient id={discId} cx="50%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#0a0a0a" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.96" />
          </radialGradient>

          {/* Thin glow that hugs the stroke width */}
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="b" />
            <feColorMatrix
              in="b"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.85 0"
            />
          </filter>

          <style>{`
            /* traveling glow: drawn UNDER the crisp line */
            .flow {
              stroke-dasharray: 26 18;
              animation: flow 1.6s linear infinite;
              filter: url(#${glowId});
              opacity: .9;
              stroke-linecap: round;
            }
            @keyframes flow { to { stroke-dashoffset: -64; } }

            .card-pop { transform-box: fill-box; transform-origin: 50% 50%; }
          `}</style>
        </defs>

        {/* --- CONNECTORS FIRST (behind nodes) --- */}
        {/* Vertical stems */}
        <g fill={`url(#${gradId})`} stroke="none" pointerEvents="none">
          {edges.map((e, i) => {
            const s = byId[e.from], t = byId[e.to];
            const sameX = Math.abs(s.x - t.x) < 0.001;
            if (!sameX) return null;

            const A = bottomOf(s);
            const B = topOf(t);
            const y1 = A.y, y2 = B.y - ARROW.stemPad;
            const h = Math.max(0, y2 - y1);
            const w = STROKE.width;
            const x0 = s.x - w / 2;

            return (
              <g key={`vrect-${e.from}-${e.to}-${i}`}>
                {/* thin glow under the shaft */}
                <motion.path
                  d={`M ${s.x} ${y1} L ${s.x} ${y2}`}
                  className="flow"
                  stroke={`url(#${gradId})`}
                  strokeWidth={STROKE.width}
                  fill="none"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.18 + i * 0.05 }}
                  viewport={{ once: true }}
                />
                {/* crisp shaft on top */}
                <motion.rect
                  x={x0}
                  y={y1}
                  width={w}
                  initial={{ height: 0 }}
                  whileInView={{ height: h }}
                  transition={{ duration: 0.6, delay: 0.22 + i * 0.05 }}
                  viewport={{ once: true }}
                  rx={w / 2}
                />
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.38 + i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <ArrowTip x={B.x} y={B.y} gradId={gradId} cfg={ARROW} />
                </motion.g>
              </g>
            );
          })}
        </g>

        {/* Elbowed edges */}
        <g
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={STROKE.width}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          pointerEvents="none"
        >
          {edges.map((e, i) => {
            const s = byId[e.from], t = byId[e.to];
            if (Math.abs(s.x - t.x) < 0.001) return null;

            const bendY = e.meta?.bend === "collector" ? collectorY : e.meta?.bendY;
            const seg = e.route === "hvh" ? pathHVH(s, t, bendY) : pathVH(s, t, bendY);

            return (
              <g key={`path-${e.from}-${e.to}-${i}`}>
                <path d={seg.d} className="flow" />
                <motion.path
                  d={seg.d}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.12 + i * 0.06 }}
                  viewport={{ once: true }}
                />
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.38 + i * 0.06 }}
                  viewport={{ once: true }}
                >
                  <ArrowTip x={seg.end.x} y={seg.end.y} gradId={gradId} cfg={ARROW} />
                </motion.g>
              </g>
            );
          })}
        </g>

        {/* --- NODES ON TOP (no lines over shapes) --- */}
        {Object.values(byId).map((n, i) => (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.14 + i * 0.03, ease: "easeOut" }}
            viewport={{ once: true }}
            className="card-pop"
          >
            {n.type === "diamond" ? (
              <Diamond cx={n.x} cy={n.y} s={n.w} />
            ) : (
              <Rounded x={n.x - n.w / 2} y={n.y - n.h / 2} w={n.w} h={n.h} r={NODE.radius} />
            )}
            <TextBlock
              node={n}
              isDiamond={n.type === "diamond"}
              defaultDx={DIAMOND_TITLE_DEFAULT_DX}
              defaultDy={DIAMOND_TITLE_DEFAULT_DY}
            />
          </motion.g>
        ))}

        {/* Edge labels */}
        <g fontSize="11" fill="#cbd5e1" textAnchor="middle" pointerEvents="none">
          {edges
            .filter((e) => e.meta?.label)
            .map((e, i) => {
              const s = byId[e.from], t = byId[e.to];
              const at = typeof e.meta.labelAt === "number" ? e.meta.labelAt : 0.5;
              const yRef = e.meta?.bend === "collector" ? collectorY : e.meta?.bendY ?? (s.y + t.y) / 2;
              const x = s.x + (t.x - s.x) * at + (e.meta?.labelDx ?? 0);
              const y = yRef + (e.meta?.labelDy ?? -8);
              return <text key={`lbl-${i}`} x={x} y={y}>{e.meta.label}</text>;
            })}
        </g>
      </svg>
    </motion.div>
  );
}

/* ------------------------------ HELPERS ------------------------------ */
function N(id, type, col, row, title, sub = "", opts = {}) {
  return { id, type, col, row, title, sub, opts };
}
function E(from, to, route = "vh", meta = {}) {
  return { from, to, route, meta };
}

function Rounded({ x, y, w, h, r }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      fill="rgba(17,17,17,.92)"
      stroke="#2a2a2a"
      strokeWidth="1.25"
      vectorEffect="non-scaling-stroke"
    />
  );
}
function Diamond({ cx, cy, s }) {
  const half = s / 2;
  const d = `M ${cx} ${cy - half} L ${cx + half} ${cy} L ${cx} ${cy + half} L ${cx - half} ${cy} Z`;
  return (
    <path
      d={d}
      fill="rgba(17,17,17,.92)"
      stroke="#2a2a2a"
      strokeWidth="1.25"
      vectorEffect="non-scaling-stroke"
    />
  );
}

/** Fallback wrapper (if no explicit titleLines are provided) */
function wrapDiamond(text, maxChars = 12, maxLines = 2) {
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    const t = cur ? cur + " " + w : w;
    if (t.length <= maxChars) cur = t;
    else {
      if (cur) lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  while (lines.length > maxLines) {
    lines[0] = (lines[0] + " " + lines[1]).trim();
    lines.splice(1, 1);
  }
  return lines;
}

/** Text inside nodes */
function TextBlock({ node, isDiamond, defaultDx = 0, defaultDy = 0 }) {
  if (isDiamond) {
    const lines = node.opts?.titleLines ?? wrapDiamond(node.title, 12, 2);

    let fs = 12;
    let lh = 12;
    if (lines.length === 3)      { fs = 10;   lh = 11; }
    else if (lines.length === 2) { fs = 11.5; lh = 12; }

    const totalH = lh * (lines.length - 1);

    const titleDx = (node.opts?.titleDx ?? 0) + defaultDx;
    const titleDy = (node.opts?.titleDy ?? 0) + defaultDy;

    const y0 = node.y - totalH / 2 + titleDy;

    return (
      <g textAnchor="middle" pointerEvents="none">
        {lines.map((ln, i) => (
          <text key={i} x={node.x + titleDx} y={y0 + i * lh} fontSize={fs} fontWeight={600} fill="#e5e7eb">
            {ln}
          </text>
        ))}
        {node.sub ? (
          <text
            x={node.x + titleDx}
            y={node.y + (lines.length === 3 ? 20 : lines.length === 2 ? 16 : 14) + titleDy}
            fontSize="10.5"
            fill="#9ca3af"
          >
            {node.sub}
          </text>
        ) : null}
      </g>
    );
  }

  return (
    <g textAnchor="middle" pointerEvents="none">
      <text x={node.x} y={node.y - 4} fontSize="15" fontWeight={600} fill="#e5e7eb">
        {node.title}
      </text>
      {node.sub ? (
        <text x={node.x} y={node.y + 14} fontSize="12" fill="#9ca3af">
          {node.sub}
        </text>
      ) : null}
    </g>
  );
}

/** Manual arrow tip (downward) */
function ArrowTip({ x, y, gradId, cfg }) {
  const { tipH, tipW } = cfg;
  const d = `M ${x - tipW} ${y - tipH} L ${x + tipW} ${y - tipH} L ${x} ${y} Z`;
  return <path d={d} fill={`url(#${gradId})`} opacity="0.98" />;
}
