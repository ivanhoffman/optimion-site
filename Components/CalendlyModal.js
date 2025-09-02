// Components/CalendlyModal.js
"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/**
 * Props:
 *  - open / isOpen: boolean
 *  - onClose: () => void
 *  - url: Calendly scheduling link (e.g., "https://calendly.com/ivan-optimion/30min")
 *  - title?: string
 *  - colors?: { background?: "#0b0b0d", text?: "#e5e7eb", primary?: "#22d3ee" }
 *
 * Notes:
 *  - Dark overlay (blurred) is drawn behind the iframe to avoid white backgrounds.
 *  - Body scroll is locked while open to prevent double scrollbars.
 */
export default function CalendlyModal(props) {
  const open = props.open ?? props.isOpen ?? false;
  const { onClose, url, title = "30 Minute Meeting", colors } = props;

  // Map color props to Calendly query params
  const clean = (hex) => (hex || "").replace("#", "").trim();
  const bg = clean(colors?.background ?? "#0b0b0d");
  const txt = clean(colors?.text ?? "#e5e7eb");
  const pri = clean(colors?.primary ?? "#22d3ee");

  const embedUrl =
    (url || "").replace(/\?$/, "") +
    `${url?.includes("?") ? "&" : "?"}` +
    `hide_gdpr_banner=1&background_color=${bg}&text_color=${txt}&primary_color=${pri}`;

  // Close on ESC + lock body scroll
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      aria-modal="true"
      role="dialog"
      aria-label={title}
      className="fixed inset-0 z-[9999]"
    >
      {/* Dark, stylized overlay */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        // subtle color glow behind the modal
        style={{
          background:
            "radial-gradient(60% 60% at 50% 30%, rgba(34,211,238,.12), rgba(139,92,246,.12) 40%, rgba(236,72,153,.12) 70%, transparent 75%)",
        }}
      />

      {/* Modal container */}
      <div className="relative mx-auto w-[min(1000px,calc(100vw-2rem))] h-[min(86svh,calc(100svh-2rem))] mt-[1rem] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0b0b0d]">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-md bg-white/10 hover:bg-white/15 text-white p-2"
          aria-label="Close scheduling dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Calendly iframe */}
        <iframe
          title={title}
          src={embedUrl}
          className="w-full h-full block bg-[#0b0b0d]"
          frameBorder="0"
        />
      </div>
    </div>,
    document.body
  );
}
