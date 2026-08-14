"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ConsultationButton from "@/Components/ConsultationButton";

const links = [
  ["Services", "/#services"],
  ["Selected Work", "/work"],
  ["Systems", "/#systems"],
  ["Process", "/#process"],
  ["About", "/#about"],
  ["FAQ", "/#faq"],
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:rounded focus:bg-black focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-16">
          <Link href="/" aria-label="Optimion home" data-evt="nav_click" data-place="header" data-to="/" onClick={() => setMenuOpen(false)}>
            <Image src="/Optimi logo 2025 (10).png" alt="Optimion" width={120} height={28} priority draggable={false} className="h-6 w-auto select-none md:h-7" />
          </Link>

          <nav className="hidden items-center gap-5 text-sm text-gray-300 lg:flex" aria-label="Primary navigation">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="whitespace-nowrap transition hover:text-white" data-evt="nav_click" data-place="header" data-to={href}>{label}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block"><ConsultationButton place="header" label="Free Consult" compact /></div>
            <button type="button" onClick={() => setMenuOpen((value) => !value)} className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 text-white lg:hidden" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation">
              {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav id="mobile-navigation" className="border-t border-white/10 bg-black px-6 py-5 lg:hidden" aria-label="Mobile navigation">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {links.map(([label, href]) => (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="min-h-11 rounded-md px-3 py-3 text-gray-200 hover:bg-white/5 hover:text-white" data-evt="nav_click" data-place="mobile_header" data-to={href}>{label}</Link>
              ))}
              <div className="mt-3 sm:hidden"><ConsultationButton place="mobile_header" className="w-full" /></div>
            </div>
          </nav>
        ) : null}
      </header>
    </>
  );
}
