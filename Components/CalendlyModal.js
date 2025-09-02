// Components/CalendlyModal.js
"use client";

import { useMemo } from "react";

/**
 * A stylized modal that hosts Calendly via a direct iframe (no widget.js),
 * which avoids the light wrapper (“white sheet”) entirely.
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
    background: "#0b0b0d",
    text: "#e5e7eb",
    primary: "#22d3ee",
  },
}) {
  // Build a themed embed URL (works without widget.js)
  const embedUrl = useMemo(() => {
    if (!url) return "";
    const u = new URL(url);
    u.searchParams.set("hide_gdpr_banner", "1");
    u.searchParams.set("embed_type", "Inline");
    // embed_domain helps Calendly size correctly
    const domain =
      typeof window !== "undefined" ? window.location.hostname : "optimion.us";
    u.searchParams.set("embed_domain", domain);

    // Theme
    u.searchParams.set("background_color", stripHash(colors.background));
    u.searchParams.set("text_color", stripHash(colors.text));
    u.searchParams.set("primary_color", stripHash(colors.primary));
    return u.toString();
  }, [url, colors.background, colors.text, colors.primary]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999] calendly-modal" aria-modal="true" role="dialog">
      {/* Backdrop (unchanged) */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
      />

      {/* Modal shell (your exact glass UI) */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-[960px] h-[82vh] rounded-2xl border border-white/10 bg-neutral-950/90 shadow-2xl overflow-hidden
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

          {/* Calendly iframe (no widget.js wrapper = no white sheet) */}
          <div className="w-full h-full calendly-host">
            <iframe
              title="Schedule with Optimion"
              src={embedUrl}
              className="w-full h-full block"
              frameBorder="0"
              allow="camera; microphone; fullscreen; geolocation"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function stripHash(hex) {
  return (hex || "").replace("#", "");
}
