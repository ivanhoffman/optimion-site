// Components/AnalyticsBridge.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { gaEvent } from "@/lib/gtag";

export default function AnalyticsBridge() {
  const router = useRouter();

  // 1) Global [data-evt] click bridge (unchanged)
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

  // 2) section_view + scroll_depth (reset per route)
  useEffect(() => {
    // ---------- section_view (once per section per pageview) ----------
    const seenSections = new Set();

    const sectionName = (el) => el.getAttribute("id") || "unknown";

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const name = sectionName(entry.target);
          if (seenSections.has(name)) return;
          seenSections.add(name);
          // keep as gaEvent since this is already working in your container
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

    const scanSections = () => {
      document.querySelectorAll("section[id]").forEach((s) => sectionObserver.observe(s));
    };

    // observe immediately and once more after layout settles
    scanSections();
    const lateScan = setTimeout(scanSections, 400);

    // ---------- scroll_depth (25/50/75/100 once per pageview) ----------
    const firedDepths = new Set([/* numbers we’ve sent: 25/50/75/100 */]);
    const marks = [25, 50, 75, 100];

    // Push to GTM dataLayer so your CE — scroll_depth trigger fires
    const dlPush = (eventName, params = {}) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: eventName, ...params });
    };

    // Percent of page reached by the bottom of the viewport
    const currentPercent = () => {
      const doc = document.documentElement;
      const body = document.body;

      const scrollTop =
        window.pageYOffset || doc.scrollTop || body.scrollTop || 0;
      const viewport = window.innerHeight;

      const fullHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        doc.clientHeight,
        doc.scrollHeight,
        doc.offsetHeight
      );

      if (fullHeight <= viewport) return 100; // very short pages

      const pct = Math.round(((scrollTop + viewport) / fullHeight) * 100);
      return Math.max(0, Math.min(100, pct));
    };

    let ticking = false;
    const fireMarksIfNeeded = () => {
      const pct = currentPercent();
      for (const m of marks) {
        if (pct >= m && !firedDepths.has(m)) {
          firedDepths.add(m);
          // IMPORTANT: send as dataLayer custom event (no gtag here to avoid GA duplicates)
          dlPush("scroll_depth", { percent: m });
        }
      }
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        fireMarksIfNeeded();
        ticking = false;
      });
    };

    // prime on load + listeners
    fireMarksIfNeeded();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      clearTimeout(lateScan);
      sectionObserver.disconnect();
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [router.asPath]);

  return null;
}
