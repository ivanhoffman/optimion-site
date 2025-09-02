// Components/CalendlyModal.js
"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * Stylized Calendly modal (glass look preserved).
 * Fix: ensure no white background shows behind the blur while open.
 */
export default function CalendlyModal({
  open,
  onClose,
  url,
  colors = {
    background: "#0b0b0d",
    text: "#e5e7eb",
    primary: "#22d3ee",
  },
}) {
  const containerRef = useRef(null);

  // Build a URL with Calendly color params (dark inside iframe)
  const themedUrl = (() => {
    const params = new URLSearchParams({
      background_color: stripHash(colors.background),
      text_color: stripHash(colors.text),
      primary_color: stripHash(colors.primary),
      hide_gdpr_banner: "1",
    });
    return `${url}${url.includes("?") ? "&" : "?"}${params.toString()}`;
  })();

  useEffect(() => {
    if (!open) return;

    // lock page scroll (prevents page scrollbar + any paint glitches)
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // ensure Calendly CSS
    if (!document.getElementById("calendly-widget-css")) {
      const link = document.createElement("link");
      link.id = "calendly-widget-css";
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    // init inline widget into our container
    const initInline = () => {
      if (!containerRef.current) return;
      containerRef.current.innerHTML = "";
      window.Calendly?.initInlineWidget?.({
        url: themedUrl,
        parentElement: containerRef.current,
      });
    };

    const existing = document.getElementById("calendly-widget-script");
    if (window.Calendly?.initInlineWidget) {
      initInline();
    } else if (existing) {
      existing.addEventListener("load", initInline, { once: true });
    } else {
      const s = document.createElement("script");
      s.id = "calendly-widget-script";
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      s.onload = initInline;
      document.head.appendChild(s);
    }

    return () => {
      document.body.style.overflow = prev;
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [open, themedUrl]);

  if (!open) return null;

  // Render at body root; add a dark base on the wrapper to avoid any white flash
  return createPortal(
    <div
      className="fixed inset-0 z-[1000] bg-[#0b0b0d]/80"   // ← dark base layer
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop (click to close) */}
      <div
        onClick={onClose}
        aria-label="Close"
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
      />

      {/* Glass shell (unchanged look) */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-[960px] h-[82vh] rounded-2xl border border-white/10 bg-neutral-950/90 shadow-2xl overflow-hidden
                     before:absolute before:inset-0 before:pointer-events-none
                     before:bg-[radial-gradient(80%_50%_at_50%_0%,rgba(34,211,238,.12),rgba(139,92,246,.08)_45%,rgba(236,72,153,.06)_70%,transparent_80%)]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-md
                       bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200"
            aria-label="Close scheduling modal"
            type="button"
          >
            ✕
          </button>

          {/* Calendly inline container */}
          <div ref={containerRef} className="w-full h-full" />
        </div>
      </div>
    </div>,
    document.body
  );
}

function stripHash(hex) {
  return (hex || "").replace("#", "");
}
