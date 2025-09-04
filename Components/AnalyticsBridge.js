// Components/AnalyticsBridge.js
"use client";
import { useEffect } from "react";
import { gaEvent } from "@/lib/gtag";

export default function AnalyticsBridge() {
  useEffect(() => {
    const onClick = (e) => {
      const el = e.target.closest?.("[data-evt]");
      if (!el) return;
      const { evt, place, id, method, to, percent, question, source } = el.dataset;
      gaEvent(evt, {
        place, id, method, to, question, source,
        ...(percent ? { percent: Number(percent) } : {})
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
