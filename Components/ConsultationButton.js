"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import CalDotComModal from "@/Components/CalDotComModal";
import { BOOKING_URL } from "@/lib/site";

export default function ConsultationButton({
  place = "page",
  label = "Book a Free Systems Consultation",
  compact = false,
  className = "",
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${compact ? "px-3.5 py-2 text-sm" : "px-5 py-3 text-sm md:text-base"} inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-cyan-500 to-pink-500 font-medium text-white shadow-md transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${className}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        data-evt="cta_click"
        data-place={place}
      >
        {compact ? <CalendarDays className="h-4 w-4" aria-hidden="true" /> : null}
        {label}
        {!compact ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
      </button>
      <CalDotComModal open={open} onClose={() => setOpen(false)} url={BOOKING_URL} place={place} />
    </>
  );
}

