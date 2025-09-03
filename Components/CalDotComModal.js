// Components/CalDotComModal.js
"use client";

export default function CalDotComModal({
  open,
  onClose,
  url = "https://cal.com/optimion/30min?embed=true&theme=dark&backgroundColor=transparent&primaryColor=22d3ee&textColor=e5e7eb&layout=month_view",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000]" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
      />

      {/* Your glass shell */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-[960px] h-[82vh] rounded-2xl border border-white/10 bg-neutral-950/90 shadow-2xl overflow-hidden
                     before:absolute before:inset-0 before:pointer-events-none
                     before:bg-[radial-gradient(80%_50%_at_50%_0%,rgba(34,211,238,.12),rgba(139,92,246,.08)_45%,rgba(236,72,153,.06)_70%,transparent_80%)]"
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-md
                       bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200"
            aria-label="Close scheduling modal"
            type="button"
          >
            ✕
          </button>

          <iframe
            title="Schedule"
            src={url}
            className="w-full h-full block"
            style={{ background: "transparent" }}
            allow="camera; microphone; fullscreen; geolocation"
            frameBorder="0"
          />
        </div>
      </div>
    </div>
  );
}
