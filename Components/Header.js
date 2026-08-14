"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import ConsultationButton from "@/Components/ConsultationButton";
import { SERVICES, servicePath } from "@/lib/site";

const primaryLinks = [
  ["Work", "/work"],
  ["Technology", "/#technology"],
  ["Approach", "/#approach"],
  ["FAQ", "/#faq"],
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const closeMenus = () => {
    setMenuOpen(false);
    setDesktopServicesOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:rounded focus:bg-black focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-16">
          <Link href="/" scroll aria-label="Optimion home" data-evt="nav_click" data-place="header" data-to="/" onClick={closeMenus}>
            <Image src="/Optimi logo 2025 (10).png" alt="Optimion" width={120} height={28} priority draggable={false} className="h-6 w-auto select-none md:h-7" />
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-gray-300 lg:flex" aria-label="Primary navigation">
            <div className="relative">
              <button
                type="button"
                onClick={() => setDesktopServicesOpen((value) => !value)}
                className="inline-flex min-h-11 items-center gap-1 whitespace-nowrap transition hover:text-white"
                aria-expanded={desktopServicesOpen}
                aria-controls="desktop-services-menu"
              >
                Services <ChevronDown className={`h-4 w-4 transition ${desktopServicesOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {desktopServicesOpen ? (
                <div id="desktop-services-menu" className="absolute left-0 top-full w-[23rem] rounded-2xl border border-white/10 bg-neutral-950/95 p-3 shadow-2xl backdrop-blur-xl">
                  <div className="grid gap-1">
                    {SERVICES.map((service) => (
                      <Link key={service.slug} href={servicePath(service.slug)} scroll onClick={closeMenus} className="rounded-xl px-4 py-3 transition hover:bg-white/[0.06]">
                        <span className="block font-medium text-white">{service.name}</span>
                        <span className="mt-1 block text-xs leading-relaxed text-gray-500">{service.short}</span>
                      </Link>
                    ))}
                    <Link href="/services" scroll onClick={closeMenus} className="mt-1 rounded-xl border border-white/10 px-4 py-3 font-medium text-cyan-300 transition hover:border-white/20 hover:bg-white/[0.04]">View all services</Link>
                  </div>
                </div>
              ) : null}
            </div>
            {primaryLinks.map(([label, href]) => (
              <Link key={href} href={href} scroll className="whitespace-nowrap transition hover:text-white" data-evt="nav_click" data-place="header" data-to={href}>{label}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block"><ConsultationButton place="header" label="Book Consultation" compact /></div>
            <button type="button" onClick={() => setMenuOpen((value) => !value)} className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 text-white lg:hidden" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation">
              {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav id="mobile-navigation" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/10 bg-black px-6 py-5 lg:hidden" aria-label="Mobile navigation">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              <button type="button" onClick={() => setMobileServicesOpen((value) => !value)} className="flex min-h-11 items-center justify-between rounded-md px-3 py-3 text-left text-gray-200 hover:bg-white/5 hover:text-white" aria-expanded={mobileServicesOpen} aria-controls="mobile-services-menu">
                Services <ChevronDown className={`h-4 w-4 transition ${mobileServicesOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {mobileServicesOpen ? (
                <div id="mobile-services-menu" className="mb-2 ml-3 grid gap-1 border-l border-white/10 pl-3">
                  {SERVICES.map((service) => <Link key={service.slug} href={servicePath(service.slug)} scroll onClick={closeMenus} className="min-h-11 rounded-md px-3 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white">{service.name}</Link>)}
                  <Link href="/services" scroll onClick={closeMenus} className="min-h-11 rounded-md px-3 py-3 text-sm font-medium text-cyan-300 hover:bg-white/5">View all services</Link>
                </div>
              ) : null}
              {primaryLinks.map(([label, href]) => <Link key={href} href={href} scroll onClick={closeMenus} className="min-h-11 rounded-md px-3 py-3 text-gray-200 hover:bg-white/5 hover:text-white" data-evt="nav_click" data-place="mobile_header" data-to={href}>{label}</Link>)}
              <div className="mt-3 sm:hidden"><ConsultationButton place="mobile_header" className="w-full" /></div>
            </div>
          </nav>
        ) : null}
      </header>
    </>
  );
}
