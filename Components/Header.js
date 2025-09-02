// Components/Header.js
"use client";

import React, { useState } from "react";
import Link from "next/link";
import CalendlyModal from "@/Components/CalendlyModal";
import { CalendarDays } from "lucide-react";

export default function Header({ variant = "site" }) {
  const [calOpen, setCalOpen] = useState(false);
  const showNav = variant !== "lp"; // keep your LP behavior

  const NAV = [
    { label: "Why Optimion", href: "/#why-optimion" },
    { label: "About", href: "/#about" },
    { label: "Process", href: "/#process" },
    { label: "Stats", href: "/#stats" },
    { label: "Integrations", href: "/#integrations" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "FAQ", href: "/#faq" },
    { label: "Get Started", href: "/#get-started" },
  ];

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-black focus:text-white focus:px-3 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 md:px-16 h-14 flex items-center justify-between">
          <Link href="/#top" className="font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Optimion
            </span>
          </Link>

          {showNav && (
            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
              {NAV.map((i) => (
                <Link key={i.href} href={i.href} className="hover:text-white">
                  {i.label}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setCalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-pink-500 text-white text-sm font-medium shadow-md hover:brightness-110 transition"
              aria-haspopup="dialog"
              aria-expanded={calOpen ? "true" : "false"}
            >
              <CalendarDays className="w-4 h-4" />
              Free Consult
            </button>
          </div>
        </div>
      </header>

      <CalendlyModal
        open={calOpen}
        isOpen={calOpen}
        onClose={() => setCalOpen(false)}
        url="https://calendly.com/ivan-optimion/30min"
        colors={{ background: "#0b0b0d", text: "#e5e7eb", primary: "#22d3ee" }}
      />
    </>
  );
}
