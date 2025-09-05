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

  // 2) section_view + scroll_depth (reset each pageview / route change)
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
          // sends through your existing GA/GTM bridge
          gaEvent("section_view", { section: name });
        });
      },
      {
        threshold: [0, 0.5, 1], // fire when ~50% is visible
        root: null,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    const scanSections = () => {
      document.querySelectorAll("section[id]").forEach((s) => sectionObserver.observe(s));
    };

    scanSections();
    const lateScan = setTimeout(scanSections, 400); // in case late content mounts

    // ---------- scroll_depth (25/50/75/100 once per pageview) ----------
    const marks = [25, 50, 75, 100];
    const fired = new Set();

    // push to GTM so CE — scroll_depth triggers your GA4 tag
    const pushDepth = (m) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "scroll_depth", percent: m });
    };

    // % scrolled = scrollTop / (scrollHeight - viewport) * 100
    const getPct = () => {
      const se = document.scrollingElement || document.documentElement;
      const scrollable = Math.max(se.scrollHeight - window.innerHeight, 0);
      if (scrollable === 0) return 100; // very short page
      const y = window.scrollY || se.scrollTop || 0;
      const pct = Math.round((y / scrollable) * 100);
      return Math.max(0, Math.min(100, pct));
    };

    const check = () => {
      const pct = getPct();
      for (const m of marks) {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          pushDepth(m);
        }
      }
      if (fired.size === marks.length) stop(); // all done
    };

    let raf = 0;
    const onTick = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        check();
      });
    };

    // Fallback polling for environments that throttle scroll/resize
    const poll = setInterval(() => {
      check();
      if (fired.size === marks.length) clearInterval(poll);
    }, 500);

    const stop = () => {
      window.removeEventListener("scroll", onTick);
      window.removeEventListener("resize", onTick);
      window.removeEventListener("hashchange", onTick);
      window.removeEventListener("pageshow", onTick);
      document.removeEventListener("visibilitychange", onTick);
      cancelAnimationFrame(raf);
      clearInterval(poll);
    };

    // prime + listeners
    check();
    window.addEventListener("scroll", onTick, { passive: true });
    window.addEventListener("resize", onTick);
    window.addEventListener("hashchange", onTick);
    window.addEventListener("pageshow", onTick);
    document.addEventListener("visibilitychange", onTick);

    return () => {
      clearTimeout(lateScan);
      sectionObserver.disconnect();
      stop();
    };
  }, [router.asPath]);

  return null;
}
