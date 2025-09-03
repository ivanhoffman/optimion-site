// Components/Header.js
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import CalDotComModal from "@/Components/CalDotComModal"; // ⟵ swapped from CalendlyModal
import { CalendarDays } from "lucide-react";

/** Smooth scroll to an element ID, accounting for sticky header height. */
function scrollToId(id) {
  if (typeof document === "undefined" || !id) return;
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector("header");
  const offset = (header?.getBoundingClientRect().height ?? 0) + 12;
  const top = window.scrollY + el.getBoundingClientRect().top - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

/** On initial load & whenever hash changes, perform the offset scroll. */
function HashScrollFix() {
  const handle = useCallback(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.slice(1);
    // run twice to cover lazy content/layout shifts
    requestAnimationFrame(() => scrollToId(id));
    setTimeout(() => scrollToId(id), 180);
  }, []);

  useEffect(() => {
    handle(); // direct visit like /#get-started
    const onHash = () => handle();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [handle]);

  return null;
}

/** NavLink: cross-page route; on home, set hash (fires hashchange) and scroll. */
function NavLink({ id, children, className = "" }) {
  const href = `/#${id}`;
  const onClick = (e) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      const newHash = `#${id}`;
      // If the hash is already the same, force the handler to run
      if (window.location.hash === newHash) {
        // trigger the handler manually
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      } else {
        window.location.hash = newHash; // will fire hashchange
      }
    }
  };
  return (
    <Link href={href} scroll={false} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}

export default function Header({ variant = "site" }) {
  const [calOpen, setCalOpen] = useState(false);
  const showNav = variant !== "lp";

  const NAV = [
    { label: "Why Optimion", id: "why-optimion" },
    { label: "About", id: "about" },
    { label: "Process", id: "process" },
    { label: "Stats", id: "stats" },
    { label: "Integrations", id: "integrations" },
    { label: "Testimonials", id: "testimonials" },
    { label: "FAQ", id: "faq" },
    { label: "Get Started", id: "get-started" },
  ];

  // Cal.com event URL (transparent, dark, your brand colors)
  const calUrl =
    "https://cal.com/optimion/30min?embed=true&theme=dark&backgroundColor=transparent&primaryColor=22d3ee&textColor=e5e7eb&layout=month_view";

  return (
    <>
      <HashScrollFix />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-black focus:text-white focus:px-3 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 md:px-16 h-14 flex items-center justify-between">
          <Link href="/" scroll={false} className="font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Optimion
            </span>
          </Link>

          {showNav && (
            <nav
              className="hidden md:flex items-center gap-6 text-sm text-gray-300"
              aria-label="Primary"
            >
              {NAV.map((item) => (
                <NavLink key={item.id} id={item.id} className="hover:text-white">
                  {item.label}
                </NavLink>
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

      {/* New modal (Cal.com) – UI unchanged */}
      <CalDotComModal
        open={calOpen}
        onClose={() => setCalOpen(false)}
        url={calUrl}
      />
    </>
  );
}
