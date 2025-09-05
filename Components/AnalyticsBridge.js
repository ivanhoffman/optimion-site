// Components/AnalyticsBridge.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { gaEvent } from "@/lib/gtag";

export default function AnalyticsBridge() {
  const router = useRouter();

  // 1) Your existing [data-evt] click bridge (kept intact)
  useEffect(() => {
    const onClick = (e) => {
      const el = e.target.closest?.("[data-evt]");
      if (!el) return;

      const { evt, place, id, method, to, percent, question, source } = el.dataset;
      gaEvent(evt, {
        place,
        id,
        method,
        to,
        question,
        source,
        ...(percent ? { percent: Number(percent) } : {}),
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // 2) section_view + scroll_depth (reset each pageview / route change)
  useEffect(() => {
    // ----- section_view (once per section per pageview) -----
    const seenSections = new Set();

    const sectionName = (el) => el.getAttribute("id") || "unknown";

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const name = sectionName(entry.target);
          if (seenSections.has(name)) return;
          seenSections.add(name);
          gaEvent("section_view", { section: name });
        });
      },
      {
        // fire when roughly half the section is visible
        threshold: 0.5,
        root: null,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    const trackSections = () => {
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((s) => sectionObserver.observe(s));
    };

    // Observe now and once again shortly after layout settles
    trackSections();
    const lateScan = setTimeout(trackSections, 400);

    // ----- scroll_depth (25/50/75/100 once per pageview) -----
    const firedDepths = new Set();
    const marks = [25, 50, 75, 100];

    const currentPercent = () => {
      const doc = document.documentElement;
      const body = document.body;
      const scrollTop = window.pageYOffset || doc.scrollTop || body.scrollTop || 0;
      const viewport = window.innerHeight;
      const total = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        doc.clientHeight,
        doc.scrollHeight,
        doc.offsetHeight
      );
      if (total <= viewport) return 100; // short pages: already at bottom
      const pct = Math.round(((scrollTop + viewport) / total) * 100);
      return Math.max(0, Math.min(100, pct));
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const pct = currentPercent();
        for (const m of marks) {
          if (pct >= m && !firedDepths.has(m)) {
            firedDepths.add(m);
            gaEvent("scroll_depth", { percent: m });
          }
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll(); // prime on load

    return () => {
      clearTimeout(lateScan);
      sectionObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [router.asPath]);

  return null;
}
