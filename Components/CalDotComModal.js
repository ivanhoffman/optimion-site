"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { analyticsAttribution, bookingConfig, claimBookingEvent, newEventId } from "@/lib/attribution";
import { gaEvent } from "@/lib/gtag";
import { BOOKING_URL } from "@/lib/site";

// Official Cal.com bootstrap: one shared SDK and a namespace per opening.
function calApi(namespace, onError) {
  const push = (api, args) => api.q.push(args);
  window.Cal = window.Cal || function (...args) {
    const cal = window.Cal;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      const script = document.createElement("script");
      script.src = "https://app.cal.com/embed/embed.js";
      script.async = true;
      script.onerror = onError;
      document.head.appendChild(script);
      cal.loaded = true;
    }
    if (args[0] === "init") {
      const api = (...instructions) => push(api, instructions);
      api.q = [];
      const name = args[1];
      if (typeof name === "string") {
        cal.ns[name] = cal.ns[name] || api;
        push(cal.ns[name], args);
        push(cal, ["initNamespace", name]);
      } else push(cal, args);
      return;
    }
    push(cal, args);
  };
  window.Cal("init", namespace, { origin: "https://cal.com" });
  return window.Cal.ns[namespace];
}

export default function CalDotComModal({ open, onClose, url = BOOKING_URL, place = "unknown", trackOpen = true }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [namespace, setNamespace] = useState("");
  const [testMode, setTestMode] = useState(false);
  const [fallbackUrl, setFallbackUrl] = useState(url);
  const containerRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const closeAndTrack = useCallback(() => {
    gaEvent("cal_close", { place });
    onCloseRef.current?.();
  }, [place]);

  useEffect(() => {
    if (!open) return;
    let active = true;
    let started = false;
    let ready = false;
    const trustedActions = new Map();
    const handlers = [];
    // Explicit, per-opening QA mode. It is never saved with campaign context.
    const isTestMode = new URLSearchParams(window.location.search).get("booking_test") === "1";
    setTestMode(isTestMode);
    const openingAttribution = analyticsAttribution();
    const track = (event, params = {}) => gaEvent(event, { ...openingAttribution, place, test_mode: isTestMode, ...params });
    const name = newEventId("optimion").replace(/[^A-Za-z0-9_-]/g, "");
    setNamespace(name);
    setLoaded(false);
    setFailed(false);
    const opener = document.activeElement;
    const body = document.body;
    const previousOverflow = body.style.getPropertyValue("overflow-y");
    const previousPriority = body.style.getPropertyPriority("overflow-y");
    const previousPadding = body.style.paddingRight;
    const scrollbar = Math.max(0, body.offsetWidth - body.clientWidth, window.innerWidth - document.documentElement.clientWidth);
    body.style.setProperty("overflow-y", "hidden", "important");
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    closeRef.current?.focus({ preventScroll: true });
    if (trackOpen) track("cal_open");

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeAndTrack();
      if (event.key === "Tab") {
        const focusable = [closeRef.current, containerRef.current?.querySelector("iframe")].filter(Boolean);
        if (event.shiftKey && document.activeElement === focusable[0]) {
          event.preventDefault();
          focusable.at(-1)?.focus();
        } else if (!event.shiftKey && document.activeElement === focusable.at(-1)) {
          event.preventDefault();
          focusable[0]?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);

    // The SDK turns postMessages into callbacks. Authorize callbacks only from
    // this opening's actual iframe at the exact Cal.com origin.
    const onMessage = (event) => {
      const envelope = event.data;
      if (!envelope || typeof envelope !== "object" || typeof envelope.fullType !== "string" || !envelope.fullType.startsWith(`CAL:${name}:`)) return;
      const iframe = containerRef.current?.querySelector("iframe");
      // Cal's current SDK canonicalizes cal.com embeds to app.cal.com/.../embed.
      // Match the actual frame URL exactly, never an arbitrary Cal subdomain.
      const frameOrigin = iframe ? new URL(iframe.src).origin : "";
      if (!["https://cal.com", "https://app.cal.com"].includes(frameOrigin) || event.origin !== frameOrigin || event.source !== iframe?.contentWindow) {
        event.stopImmediatePropagation();
        return;
      }
      const action = envelope.fullType.slice(`CAL:${name}:`.length);
      if (handlers.some(([type]) => type === action)) trustedActions.set(action, envelope.data);
    };
    window.addEventListener("message", onMessage, true);

    const fail = () => { if (active) setFailed(true); };
    const api = calApi(name, fail);
    const listen = (action, callback) => {
      const handler = (event) => {
        if (!active || event.detail?.namespace !== name || event.detail?.type !== action || !trustedActions.has(action) || trustedActions.get(action) !== event.detail.data) return;
        trustedActions.delete(action);
        callback(event.detail.data);
      };
      handlers.push([action, handler]);
      api("on", { action, callback: handler });
    };
    const markReady = () => {
      setLoaded(true);
      setFailed(false);
      if (!ready) {
        ready = true;
        track("cal_loaded");
      }
    };
    const markStarted = () => {
      markReady();
      if (started) return;
      started = true;
      // The user entered the ready booking interface; no slot/form claim is made.
      track("booking_started", { booking_stage: "interface_entered" });
    };
    listen("linkReady", markReady);
    listen("bookerReady", markStarted);
    listen("navigatedToBooker", markStarted);
    listen("bookerViewed", (data) => { if (data?.slotsLoaded === true) markStarted(); });
    listen("linkFailed", fail);
    listen("dryRunBookingSuccessfulV2", () => {
      containerRef.current?.setAttribute("data-cal-test-state", "complete");
      track("booking_test_completed", { test_mode: true });
    });
    listen("bookingSuccessfulV2", async (data) => {
      if (isTestMode || !data || data.status !== "ACCEPTED" || data.paymentRequired !== false) return;
      const eventId = await claimBookingEvent(data.uid);
      if (!eventId) return;
      track("booked_consult", { booking_provider: "cal.com", event_id: eventId });
      // Existing Google Ads trigger; only booked_consult sends the OpenAI event.
      track("cal_booking_success", { booking_provider: "cal.com", event_id: eventId });
    });

    const config = { theme: "dark", layout: "month_view", ...bookingConfig(), ...(isTestMode ? { "cal.isBookingDryRun": "true" } : {}), iframeAttrs: { title: "Schedule" } };
    try {
      const bookingUrl = new URL(url);
      if (bookingUrl.origin !== "https://cal.com") throw new Error("Unsupported booking origin");
      for (const [key, value] of Object.entries(config)) if (typeof value === "string") bookingUrl.searchParams.set(key, value);
      setFallbackUrl(bookingUrl.toString());
      api("inline", { elementOrSelector: containerRef.current, calLink: bookingUrl.pathname.replace(/^\//, ""), config });
      api("ui", { theme: "dark", styles: { branding: { brandColor: "#22d3ee" } }, layout: "month_view" });
    } catch {
      fail();
    }
    const timeout = setTimeout(() => { if (!ready) fail(); }, 25000);
    return () => {
      active = false;
      clearTimeout(timeout);
      handlers.forEach(([action, callback]) => api("off", { action, callback }));
      trustedActions.clear();
      window.removeEventListener("message", onMessage, true);
      window.removeEventListener("keydown", onKeyDown);
      if (previousOverflow) body.style.setProperty("overflow-y", previousOverflow, previousPriority);
      else body.style.removeProperty("overflow-y");
      body.style.paddingRight = previousPadding;
      opener?.focus?.({ preventScroll: true });
    };
  }, [open, url, place, trackOpen, closeAndTrack]);

  if (!open || typeof window === "undefined") return null;
  return createPortal(
    <div className="fixed inset-0 z-[9999]" aria-modal="true" aria-label="Book a discovery call" role="dialog">
      <button type="button" aria-label="Close scheduling backdrop" onClick={closeAndTrack} className="absolute inset-0 bg-black/65 backdrop-blur-sm" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-3 md:p-4">
        <div className="pointer-events-auto relative h-[85dvh] max-h-[850px] w-full max-w-[960px] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl">
          <button ref={closeRef} onClick={closeAndTrack} className="absolute right-2 top-2 z-30 inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-neutral-900 text-gray-200 hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300" aria-label="Close scheduling modal" type="button">✕</button>
          {testMode ? <div data-booking-test-mode className="absolute inset-x-3 top-2 z-20 mr-12 rounded-md border border-amber-300/30 bg-amber-950 px-3 py-2 text-sm text-amber-100">Test mode — no appointment will be created.</div> : null}
          <div ref={containerRef} data-cal-container data-cal-namespace={namespace} className={`h-full w-full overflow-y-auto overscroll-contain transition-opacity ${testMode ? "pt-16" : ""} ${loaded ? "opacity-100" : "opacity-0"}`} />
          {!loaded && !failed ? <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-8 text-center text-gray-300" role="status">Loading available discovery-call times…</div> : null}
          {failed ? <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-neutral-950 p-6 text-center"><p className="text-sm text-gray-300">The calendar is taking longer to load. You can also book directly with Cal.com.</p><a href={fallbackUrl} target="_blank" rel="noopener noreferrer" data-evt="booking_fallback_clicked" data-place={place} className="mt-3 inline-flex min-h-11 items-center rounded-md bg-cyan-400 px-5 py-2 font-medium text-black">Open booking calendar</a></div> : null}
        </div>
      </div>
    </div>, document.body
  );
}
