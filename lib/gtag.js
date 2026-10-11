import { analyticsAttribution, newEventId } from "@/lib/attribution";

export const GA_ID = 'G-GWBX9F3PLV';
const pendingPixelEvents = [];

function googleTagCommand() {
  // Google Tag Manager's existing Google tag consumes the shared command queue.
  window.dataLayer.push(arguments);
}

function sendGoogleFunnel(name, attribution, params, eventId) {
  const event = { ...attribution, ...params, event_id: eventId };
  const allowed = [
    "service", "page_service", "landing_page", "campaign_id", "ad_group_id", "ad_id",
    "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "attribution_id",
    "event_id", "place", "booking_stage", "has_oppref", "test_mode", "page_path", "page_location", "page_title",
  ];
  const safeParams = Object.fromEntries(allowed.filter((key) => event[key] !== undefined && event[key] !== "").map((key) => [key, event[key]]));
  // GA4's reserved session_id must stay numeric and under Google's control.
  safeParams.anonymous_session_id = event.session_id;
  safeParams.send_to = GA_ID;
  googleTagCommand("event", name, safeParams);
}

export function flushOpenAIEvents() {
  if (typeof window === "undefined" || typeof window.oaiq !== "function") return;
  pendingPixelEvents.splice(0).forEach((args) => window.oaiq(...args));
}

export function measureOpenAI(eventName, eventData, options = {}) {
  if (typeof window === "undefined") return;
  const args = ["measure", eventName, eventData, { opt_out: true, ...options }];
  if (typeof window.oaiq === "function") window.oaiq(...args);
  else if (pendingPixelEvents.length < 100) pendingPixelEvents.push(args);
}

export const gaEvent = (action, params = {}) => {
  if (typeof window === 'undefined') return;

  const attribution = analyticsAttribution();
  const cleanParams = Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined));
  const eventId = params.event_id || newEventId(action);
  // The published GTM container owns GA4 dispatch. Sending gtag as well duplicates events.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ...attribution, ...cleanParams, event: action, event_id: eventId });

  const funnelEvents = {
    landing_page_view: "landing_page_view",
    cta_click: "consultation_click",
    cal_open: "booking_opened",
    booking_started: "booking_started",
    booked_consult: "discovery_call_booked",
  };
  if (funnelEvents[action]) {
    window.dataLayer.push({ ...attribution, ...cleanParams, event: "optimion_funnel", funnel_event_name: funnelEvents[action], event_id: eventId });
    // New funnel events use this one explicit command. No generic GTM event tag
    // should also send optimion_funnel; legacy triggers have different names.
    sendGoogleFunnel(funnelEvents[action], attribution, cleanParams, eventId);
  }

  if (action === 'booked_consult') {
    measureOpenAI('appointment_scheduled', { type: 'customer_action' }, { event_id: eventId });
  } else if (['cta_click', 'cal_open', 'booking_started'].includes(action)) {
    const eventName = action === 'cta_click' ? 'consultation_cta_clicked' : action === 'cal_open' ? 'booking_opened' : 'booking_started';
    measureOpenAI('custom', {
      type: 'custom',
      contents: [{ id: attribution.landing_page || window.location.pathname, content_type: 'page' }],
    }, { custom_event_name: eventName, event_id: eventId });
  }
};
