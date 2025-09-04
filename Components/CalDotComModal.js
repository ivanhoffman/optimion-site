// Components/CalDotComModal.js
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function CalDotComModal({
  open,
  onClose,
  url = "https://cal.com/optimion/30min?embed=true&theme=dark&backgroundColor=transparent&primaryColor=22d3ee&textColor=e5e7eb&layout=month_view",
}) {
  const [mounted, setMounted] = useState(false); // panel fade-in
  const [loaded, setLoaded] = useState(false);   // iframe fade-in after load

  // Lock body scroll while modal is open (prevents background bleed/stacking issues)
  useEffect(() => {
    if (!open || typeof window === "undefined") return;

    const { body, documentElement } = document;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;

    // Prevent layout shift when scrollbar disappears
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const onKeyDown = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKeyDown);

    // trigger panel fade-in on mount
    setMounted(true);

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
      window.removeEventListener("keydown", onKeyDown);
      setMounted(false);
      setLoaded(false);
    };
  }, [open, onClose]);

  if (!open || typeof window === "undefined") return null;

  // Small delay after iframe 'load' lets Cal render the timeslots before we reveal it
  const handleIframeLoad = () => {
    setTimeout(() => setLoaded(true), 250);
  };

  const modal = (
    <div className="fixed inset-0 z-[9999]" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className={`absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel container */}
      <div
        className={`absolute inset-0 flex items-center justify-center p-4 transition-opacity duration-300 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`relative w-full max-w-[960px] h-[82vh] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/90 shadow-2xl
                      before:absolute before:inset-0 before:pointer-events-none
                      before:bg-[radial-gradient(80%_50%_at_50%_0%,rgba(34,211,238,.12),rgba(139,92,246,.08)_45%,rgba(236,72,153,.06)_70%,transparent_80%)]
                      transition-transform duration-300 ${
                        mounted ? "scale-100" : "scale-[0.98]"
                      }`}
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

          {/* Skeleton overlay (shown until iframe is ready) */}
          <div
            className={`absolute inset-0 bg-neutral-950/90 transition-opacity duration-300 ${
              loaded ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <div className="h-full w-full p-5 md:p-6 animate-pulse">
              {/* top bar skeleton */}
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-white/10" />
                <div className="h-4 w-40 bg-white/10 rounded" />
              </div>

              {/* calendar grid skeleton */}
              <div className="mt-4 grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} className="h-8 rounded bg-white/5" />
                ))}
              </div>

              {/* timeslots column skeleton */}
              <div className="mt-4 grid gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-8 rounded bg-white/5" />
                ))}
              </div>
            </div>
          </div>

          {/* Cal.com iframe (fades in when loaded) */}
          <iframe
            title="Schedule"
            src={url}
            onLoad={handleIframeLoad}
            className={`block h-full w-full transition-opacity duration-300 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ background: "transparent" }}
            allow="camera; microphone; fullscreen; geolocation"
            frameBorder="0"
          />
        </div>
      </div>
    </div>
  );

  // Render at document.body so it isn’t clipped by parent stacking contexts
  return createPortal(modal, document.body);
}
