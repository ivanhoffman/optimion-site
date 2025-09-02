// Components/Header.js
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import CalendlyModal from "@/Components/CalendlyModal";
import { CalendarDays } from "lucide-react";

/** Smoothly scroll to an element ID, accounting for sticky header height. */
function scrollToId(id) {
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;

  const header = document.querySelector("header");
  const offset = (header?.getBoundingClientRect().height ?? 0) + 12; // breathing room
  const top = window.scrollY + el.getBoundingClientRect().top - offset;

  window.scrollTo({ top, behavior: "smooth" });
}

/** Ensure initial / hash loads scroll correctly even when <body> is the scroller. */
function HashScrollFix() {
  const handle = useCallback(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.replace(/^#/, "");
    // delay to ensure layout is ready
    setTimeout(() => scrollToId(id), 0);
  }, []);

  useEffect(() => {
    // on first paint (e.g., direct load to /#get-started)
    handle();
    // respond to hash changes on the same page
    const onHash = () => handle();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [handle]);

  return null;
}

/** A nav link that works cross-page and smooth-scrolls when already on the homepage. */
function NavLink({ id, children, className = "" }) {
  const href = `/#${id}`;

  const onClick = (e) => {
    if (typeof window === "undefined") return;
    // If already on the homepage, intercept and smooth scroll instead of routing
    if (window.location.pathname === "/") {
      e.preventDefault();
      // update the hash in the URL without jumping
      history.replaceState(null, "", `#${id}`);
      scrollToId(id);
    }
    // If not on the homepage, allow normal navigation to /#id
  };

  return (
    <Link href={href} onClick={onClick} className={className}>
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
          {/* Always goes home; smooth-scroll logic happens in NavLink for section links */}
          <Link href="/" scroll={false} className="font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Optimion
            </span>
          </Link>

          {showNav && (
            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300" aria-label="Primary">
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
