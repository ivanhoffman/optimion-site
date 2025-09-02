// Components/CalendlyModal.js
"use client";

import { useEffect, useRef } from "react";

/**
 * A stylized modal that hosts Calendly's inline widget.
 * Props:
 *  - open: boolean
 *  - onClose: () => void
 *  - url: Calendly event URL (e.g., "https://calendly.com/ivan-optimion/30min")
 *  - colors?: { background?: string, text?: string, primary?: string }
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

  // Build a URL with Calendly color params
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

    // Ensure Calendly CSS
    if (!document.getElementById("calendly-widget-css")) {
      const link = document.createElement("link");
      link.id = "calendly-widget-css";
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    // Ensure Calendly script, then init inline widget
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
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [open, themedUrl]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[99999]"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop (unchanged) */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
      />

      {/* Modal shell (unchanged glass) */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className="relative isolate w-full max-w-[960px] h-[82vh] rounded-2xl border border-white/10 bg-neutral-950/90 shadow-2xl overflow-hidden
                     before:absolute before:inset-0 before:pointer-events-none
                     before:bg-[radial-gradient(80%_50%_at_50%_0%,rgba(34,211,238,.12),rgba(139,92,246,.08)_45%,rgba(236,72,153,.06)_70%,transparent_80%)]"
        >
          {/* Close button (unchanged) */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-20 inline-flex h-9 w-9 items-center justify-center rounded-md
                       bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200"
            aria-label="Close scheduling modal"
            type="button"
          >
            ✕
          </button>

          {/* Calendly inline container */}
          <div className="relative w-full h-full">
            {/* Always-on anti-sheet veil (covers Calendly's white gutters but leaves center clear) */}
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                // side gutters darken + top/bottom fade; center remains transparent
                background: [
                  // side vignette to remove white side sheets
                  "linear-gradient(to right, rgba(11,11,13,.96) 0%, rgba(11,11,13,.92) 10%, rgba(11,11,13,0) 24%, rgba(11,11,13,0) 76%, rgba(11,11,13,.92) 90%, rgba(11,11,13,.96) 100%)",
                  // top fade (Calendly has a light header glow)
                  "linear-gradient(to bottom, rgba(11,11,13,.95) 0px, rgba(11,11,13,0) 140px)",
                  // bottom fade (just in case)
                  "linear-gradient(to top, rgba(11,11,13,.95) 0px, rgba(11,11,13,0) 140px)",
                ].join(", "),
              }}
            />
            <div ref={containerRef} className="w-full h-full bg-[#0b0b0d]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function stripHash(hex) {
  return (hex || "").replace("#", "");
}
