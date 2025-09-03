// Components/CalendlyModal.js
"use client";

import { useEffect, useRef } from "react";

/**
 * A stylized modal that hosts Calendly's inline widget.
 * Keeps glass UI; enforces dark background fallback (#0b0b0d).
 *
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
    background: "#0b0b0d", // page background inside iframe
    text: "#e5e7eb",       // text color
    primary: "#22d3ee",    // accent (buttons/links)
  },
}) {
  const containerRef = useRef(null);

  // Build a URL with Calendly color + cleanup params
  const themedUrl = (() => {
    const params = new URLSearchParams({
      background_color: stripHash(colors.background),
      text_color: stripHash(colors.text),
      primary_color: stripHash(colors.primary),
      hide_gdpr_banner: "1",
      hide_landing_page_details: "1",
      hide_event_type_details: "1",
      embed_type: "Inline",
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

    // Helper: enforce dark backdrop around/in the iframe element (not inside)
    const enforceDarkShell = () => {
      if (!containerRef.current) return;
      // Dark behind the iframe
      containerRef.current.style.background = colors.background;
      containerRef.current.style.setProperty("background", colors.background, "important");

      // Dark on the iframe element itself (prevents white gutters)
      const iframe = containerRef.current.querySelector('iframe[src*="calendly.com"]');
      if (iframe) {
        iframe.style.background = colors.background;
        iframe.style.display = "block";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "0";
        iframe.style.borderRadius = "0";
      }
    };

    // Ensure Calendly script, then init inline widget
    const initInline = () => {
      if (!containerRef.current) return;
      // Clear any previous iframe
      containerRef.current.innerHTML = "";
      // Make sure our shell is dark before Calendly paints
      enforceDarkShell();

      window.Calendly?.initInlineWidget?.({
        url: themedUrl,
        parentElement: containerRef.current,
      });

      // Watch for Calendly injecting/replacing the iframe
      const obs = new MutationObserver(enforceDarkShell);
      obs.observe(containerRef.current, { childList: true, subtree: true });
      // Store observer for cleanup
      containerRef.current.__calObs = obs;
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
      // Cleanup: remove iframe + disconnect observer
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        containerRef.current.__calObs?.disconnect?.();
        delete containerRef.current.__calObs;
      }
    };
  }, [open, themedUrl, colors.background]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000]" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
      />

      {/* Modal shell */}
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

          {/* Calendly inline container (we also paint it dark as a fallback) */}
          <div
            ref={containerRef}
            className="w-full h-full"
            style={{ background: colors.background }}
          />
        </div>
      </div>
    </div>
  );
}

function stripHash(hex) {
  return (hex || "").replace("#", "");
}
