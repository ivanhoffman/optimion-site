"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const desktopServicesButtonRef = useRef(null);
  const desktopServicesCloseRef = useRef(null);
  const desktopServicesScrollRef = useRef(null);
  const mobileNavigationRef = useRef(null);
  const desktopPageScrollRef = useRef(null);

  const closeMenus = useCallback(() => {
    setMenuOpen(false);
    setDesktopServicesOpen(false);
    setMobileServicesOpen(false);
    desktopPageScrollRef.current = null;
  }, []);

  const closeDesktopServices = useCallback(() => {
    setDesktopServicesOpen(false);
    desktopPageScrollRef.current = null;
    requestAnimationFrame(() => desktopServicesButtonRef.current?.focus({ preventScroll: true }));
  }, []);

  const captureDesktopPageScroll = useCallback(() => {
    desktopPageScrollRef.current = {
      body: document.body.scrollTop,
      document: document.documentElement.scrollTop,
      window: window.scrollY,
    };
  }, []);

  const toggleDesktopServices = useCallback(() => {
    if (desktopServicesOpen) {
      closeDesktopServices();
      return;
    }
    if (!desktopPageScrollRef.current) captureDesktopPageScroll();
    setDesktopServicesOpen(true);
  }, [captureDesktopPageScroll, closeDesktopServices, desktopServicesOpen]);

  useLayoutEffect(() => {
    if (!desktopServicesOpen || !desktopPageScrollRef.current) return;
    const position = desktopPageScrollRef.current;
    document.body.scrollTop = position.body;
    document.documentElement.scrollTop = position.document;
    window.scrollTo(0, position.window);
  }, [desktopServicesOpen]);

  useEffect(() => {
    if (!desktopServicesOpen && !menuOpen) return;

    const body = document.body;
    body.classList.add("navigation-overlay-open");
    const lockedPosition = {
      body: body.scrollTop,
      document: document.documentElement.scrollTop,
      window: window.scrollY,
    };

    const activeScrollArea = () => desktopServicesOpen
      ? desktopServicesScrollRef.current
      : mobileNavigationRef.current;

    const preventBackgroundScroll = (event) => {
      if (activeScrollArea()?.contains(event.target)) return;
      event.preventDefault();
    };

    const enforceBackgroundPosition = () => {
      if (body.scrollTop !== lockedPosition.body) body.scrollTop = lockedPosition.body;
      if (document.documentElement.scrollTop !== lockedPosition.document) document.documentElement.scrollTop = lockedPosition.document;
      if (window.scrollY !== lockedPosition.window) window.scrollTo(0, lockedPosition.window);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (desktopServicesOpen) closeDesktopServices();
        else closeMenus();
        return;
      }

      const scrollKeys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
      if (scrollKeys.includes(event.key) && !activeScrollArea()?.contains(document.activeElement)) {
        event.preventDefault();
      }
    };
    document.addEventListener("wheel", preventBackgroundScroll, { passive: false });
    document.addEventListener("touchmove", preventBackgroundScroll, { passive: false });
    document.addEventListener("keydown", handleKeyDown);
    body.addEventListener("scroll", enforceBackgroundPosition, { passive: true });
    window.addEventListener("scroll", enforceBackgroundPosition, { passive: true });

    return () => {
      document.removeEventListener("wheel", preventBackgroundScroll);
      document.removeEventListener("touchmove", preventBackgroundScroll);
      document.removeEventListener("keydown", handleKeyDown);
      body.removeEventListener("scroll", enforceBackgroundPosition);
      window.removeEventListener("scroll", enforceBackgroundPosition);
      body.classList.remove("navigation-overlay-open");
    };
  }, [closeDesktopServices, closeMenus, desktopServicesOpen, menuOpen]);

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
                ref={desktopServicesButtonRef}
                type="button"
                onMouseDown={captureDesktopPageScroll}
                onClick={toggleDesktopServices}
                className="inline-flex min-h-11 items-center gap-1 whitespace-nowrap transition hover:text-white"
                aria-expanded={desktopServicesOpen}
                aria-haspopup="dialog"
                aria-controls="desktop-services-menu"
              >
                Services <ChevronDown className={`h-4 w-4 transition ${desktopServicesOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
            </div>
            {primaryLinks.map(([label, href]) => (
              <Link key={href} href={href} scroll onClick={closeMenus} className="whitespace-nowrap transition hover:text-white" data-evt="nav_click" data-place="header" data-to={href}>{label}</Link>
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
          <nav ref={mobileNavigationRef} id="mobile-navigation" className="max-h-[calc(100vh-4rem)] overscroll-contain overflow-y-auto border-t border-white/10 bg-black px-6 py-5 lg:hidden" aria-label="Mobile navigation">
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

      {desktopServicesOpen ? (
        <div
          className="fixed inset-x-0 bottom-0 top-16 z-40 hidden bg-black/65 px-6 backdrop-blur-sm lg:block"
          data-services-overlay
        >
          <button
            type="button"
            aria-label="Close services menu backdrop"
            onClick={closeDesktopServices}
            className="absolute inset-0 cursor-default"
          />
          <section
            id="desktop-services-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="desktop-services-title"
            className="relative z-10 mx-auto mt-3 flex max-h-[calc(100dvh-5rem)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/[0.98] shadow-2xl"
          >
            <div className="flex items-start justify-between gap-6 border-b border-white/10 px-5 py-4 md:px-6">
              <div>
                <p id="desktop-services-title" className="text-lg font-semibold text-white">Services</p>
                <p className="mt-1 text-sm text-gray-400">Explore the systems, automation, data, and software capabilities Optimion provides.</p>
              </div>
              <button
                ref={desktopServicesCloseRef}
                type="button"
                onClick={closeDesktopServices}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-gray-300 transition hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                aria-label="Close services menu"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div ref={desktopServicesScrollRef} className="overscroll-contain overflow-y-auto p-3 md:p-4">
              <div className="grid grid-cols-2 gap-1.5">
                {SERVICES.map((service) => (
                  <Link key={service.slug} href={servicePath(service.slug)} scroll onClick={closeMenus} className="rounded-xl px-4 py-3 transition hover:bg-white/[0.06]">
                    <span className="block font-medium text-white">{service.name}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-gray-500">{service.short}</span>
                  </Link>
                ))}
                <Link href="/services" scroll onClick={closeMenus} className="col-span-2 mt-1 rounded-xl border border-white/10 px-4 py-3 text-center font-medium text-cyan-300 transition hover:border-white/20 hover:bg-white/[0.04]">View all services</Link>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
