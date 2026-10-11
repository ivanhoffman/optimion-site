// First-party, anonymous campaign context. Never store form or booking attendee data here.
export const ATTRIBUTION_STORAGE_KEY = "optimion:attribution:v1";
export const BOOKING_STORAGE_KEY = "optimion:bookings:v1";

const SERVICE_CAMPAIGNS = {
  "zoho-crm": "zoho_crm",
  "crm-integration": "crm_integration",
  "erp-business-central": "erp_business_central",
  "business-automation": "business_automation",
  "power-bi": "power_bi",
  "ecommerce-integration": "ecommerce_integration",
};
const CAMPAIGN_FIELDS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id",
  "campaign_id", "ad_group_id", "ad_id",
];
let memoryAttribution = null;
const rememberedBookings = new Set();

function randomId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

function readStored(key) {
  try {
    return JSON.parse(window.sessionStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}

function store(key, value) {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Restricted storage must never prevent a consultation booking.
  }
}

function campaignValue(value) {
  // Campaign identifiers are labels, never arbitrary query strings or personal data.
  return typeof value === "string" && value.length <= 160 && /^[A-Za-z0-9][A-Za-z0-9._~ -]*$/.test(value)
    ? value
    : "";
}

export function serviceFromPath(path = "") {
  const slug = path.split("?")[0].replace(/\/$/, "").split("/");
  return slug.length === 3 && slug[1] === "solutions" && SERVICE_CAMPAIGNS[slug[2]] ? slug[2] : "";
}

export function captureAttribution() {
  if (typeof window === "undefined") return null;
  const previous = memoryAttribution || readStored(ATTRIBUTION_STORAGE_KEY);
  const query = new URLSearchParams(window.location.search);
  const incoming = Object.fromEntries(CAMPAIGN_FIELDS.map((key) => [key, campaignValue(query.get(key))]).filter(([, value]) => value));
  const clickReference = query.get("oppref");
  if (clickReference && clickReference.length <= 2048 && /^[A-Za-z0-9._~+/=-]+$/.test(clickReference)) incoming.oppref = clickReference;
  const service = serviceFromPath(window.location.pathname);
  const explicitCampaign = Boolean(incoming.utm_campaign || incoming.campaign_id || incoming.oppref);
  const changedCampaign = explicitCampaign && (
    !previous || ["utm_campaign", "campaign_id", "ad_group_id", "ad_id", "utm_content", "oppref"].some((key) => incoming[key] && incoming[key] !== previous[key])
  );
  const startTouch = !previous || changedCampaign;
  const context = startTouch ? {
    version: 1,
    session_id: previous?.session_id || randomId(),
    attribution_id: randomId(),
    captured_at: Date.now(),
    landing_page: window.location.pathname,
    service,
    ...incoming,
  } : { ...previous, ...incoming, service: previous.service || service };
  memoryAttribution = context;
  store(ATTRIBUTION_STORAGE_KEY, context);
  return context;
}

export function analyticsAttribution() {
  const context = captureAttribution();
  if (!context) return {};
  return {
    session_id: context.session_id,
    attribution_id: context.attribution_id,
    landing_page: context.landing_page,
    service: context.service || "",
    page_service: serviceFromPath(window.location.pathname),
    source: context.utm_source || "direct",
    medium: context.utm_medium || "none",
    campaign: context.utm_campaign || "",
    campaign_id: context.campaign_id || context.utm_id || context.utm_campaign || "",
    ad_group_id: context.ad_group_id || "",
    ad_id: context.ad_id || context.utm_content || "",
    utm_source: context.utm_source || "",
    utm_medium: context.utm_medium || "",
    utm_campaign: context.utm_campaign || "",
    utm_content: context.utm_content || "",
    utm_term: context.utm_term || "",
    has_oppref: Boolean(context.oppref),
  };
}

export function bookingConfig() {
  const context = captureAttribution();
  if (!context) return {};
  const config = {};
  for (const field of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    if (context[field]) config[field] = context[field];
  }
  for (const field of ["session_id", "attribution_id", "landing_page", "service", "campaign_id", "ad_group_id", "ad_id", "oppref"]) {
    const value = context[field] || (field === "campaign_id" ? context.utm_id || context.utm_campaign : field === "ad_id" ? context.utm_content : "");
    if (value) config[`metadata[optimion_${field}]`] = value;
  }
  return config;
}

export function newEventId(prefix = "evt") {
  return `${prefix}_${randomId()}`;
}

export async function claimBookingEvent(uid) {
  if (typeof uid !== "string" || !/^[A-Za-z0-9_-]{6,200}$/.test(uid) || !globalThis.crypto?.subtle) return null;
  const bytes = await globalThis.crypto.subtle.digest("SHA-256", new TextEncoder().encode(`optimion:cal:${uid}`));
  const eventId = `cal_${Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
  const stored = readStored(BOOKING_STORAGE_KEY);
  const bookings = Array.isArray(stored) ? stored.filter((id) => typeof id === "string") : [];
  if (rememberedBookings.has(eventId) || bookings.includes(eventId)) return null;
  rememberedBookings.add(eventId);
  store(BOOKING_STORAGE_KEY, [...bookings, eventId].slice(-200));
  return eventId;
}
