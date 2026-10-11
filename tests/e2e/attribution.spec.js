const { test, expect } = require("./fixtures");

const ATTRIBUTION_KEY = "optimion:attribution:v1";
const BOOKING_KEY = "optimion:bookings:v1";
const funnels = [
  ["zoho-crm", "zoho_crm"],
  ["crm-integration", "crm_integration"],
  ["erp-business-central", "erp_business_central"],
  ["business-automation", "business_automation"],
  ["power-bi", "power_bi"],
  ["ecommerce-integration", "ecommerce_integration"],
];

// Minimal official-command-contract fixture. Nothing is sent to Cal or an ad provider.
const calSdkFixture = `(() => {
  const old = window.Cal;
  const queuedRoot = Array.from(old?.q || []);
  const queuedNamespaces = Object.fromEntries(Object.entries(old?.ns || {}).map(([name, api]) => [name, Array.from(api.q || [])]));
  const handlers = {};
  function makeNamespace(namespace) {
    if (Cal.ns[namespace]) return Cal.ns[namespace];
    handlers[namespace] = [];
    const api = function(command, options) {
      if (command === 'on') handlers[namespace].push(options);
      if (command === 'off') handlers[namespace] = handlers[namespace].filter(handler => handler.callback !== options.callback);
      if (command === 'inline') {
        const container = typeof options.elementOrSelector === 'string' ? document.querySelector(options.elementOrSelector) : options.elementOrSelector;
        const frame = document.createElement('iframe');
        const query = new URLSearchParams(options.config || {});
        query.set('embed', namespace);
        // The production Cal SDK canonicalizes hosted embeds to app.cal.com.
        frame.src = 'https://app.cal.com/' + options.calLink + '/embed?' + query;
        frame.title = 'Book a call';
        frame.style.cssText = 'width:100%;height:100%;border:0';
        const inline = document.createElement('cal-inline');
        inline.style.cssText = 'display:block;width:100%;height:100%';
        inline.append(frame);
        container.replaceChildren(inline);
      }
    };
    Cal.ns[namespace] = api;
    return api;
  }
  function Cal(command, namespace) {
    if (command === 'init' || command === 'initNamespace') makeNamespace(namespace);
  }
  Cal.ns = {}; Cal.loaded = true; Cal.q = [];
  window.Cal = Cal;
  window.addEventListener('message', event => {
    if (!event.data || typeof event.data.fullType !== 'string') return;
    const [prefix, namespace, action] = event.data.fullType.split(':');
    if (prefix !== 'CAL') return;
    for (const handler of handlers[namespace] || []) {
      if (handler.action === action || handler.action === '*') {
        handler.callback({ detail: { type: action, namespace, fullType: event.data.fullType, data: event.data.data } });
      }
    }
  });
  for (const args of queuedRoot) Cal(...args);
  for (const [namespace, queue] of Object.entries(queuedNamespaces)) {
    const api = makeNamespace(namespace);
    for (const args of queue) api(...args);
  }
})();`;

async function installIsolatedProviders(page) {
  await page.route("https://app.cal.com/embed/embed.js", (route) => route.fulfill({ contentType: "application/javascript", body: calSdkFixture }));
  await page.route("https://app.cal.com/optimion/**", (route) => route.fulfill({
    contentType: "text/html",
    body: "<!doctype html><html><body><p>Isolated Cal booking fixture — no booking is created.</p></body></html>",
  }));
}

async function events(page, event) {
  return page.evaluate((name) => window.dataLayer.filter((entry) => entry?.event === name), event);
}

async function openBooking(page, slug) {
  await page.locator(`main [data-place="solution_${slug}_hero"]`).click();
  const container = page.locator("[data-cal-container]");
  await expect(container).toBeVisible();
  const iframe = container.locator("iframe");
  await expect(iframe).toHaveCount(1);
  const frame = await (await iframe.elementHandle()).contentFrame();
  await frame.waitForLoadState("domcontentloaded");
  return { container, iframe, frame, namespace: await container.getAttribute("data-cal-namespace") };
}

async function sendCalEvent(booking, action, data = {}) {
  await booking.frame.evaluate(({ namespace, action, data }) => {
    window.parent.postMessage({ fullType: `CAL:${namespace}:${action}`, data }, "*");
  }, { namespace: booking.namespace, action, data });
}

test.beforeEach(async ({ page }) => {
  await installIsolatedProviders(page);
});

for (const [slug, campaign] of funnels) {
  test(`${slug} retains campaign, ad group, ad, and click reference in its booking funnel`, async ({ page }) => {
    const query = new URLSearchParams({
      utm_source: "chatgpt", utm_medium: "paid_ai", utm_campaign: campaign,
      utm_content: `${campaign}_ad_01`, campaign_id: `${campaign}_campaign`,
      ad_group_id: `${campaign}_group`, ad_id: `${campaign}_ad_01`, oppref: "fixture-click-reference-01",
      email: "private-attendee@example.test", name: "Private Attendee", unknown_tracking: "not-allowed",
    });
    await page.goto(`/solutions/${slug}?${query}`);
    await expect.poll(() => events(page, "landing_page_view")).not.toEqual([]);
    const landingEvents = await events(page, "landing_page_view");
    expect(landingEvents).toHaveLength(1);
    expect(landingEvents[0]).toMatchObject({ source: "chatgpt", medium: "paid_ai", campaign, ad_group_id: `${campaign}_group`, ad_id: `${campaign}_ad_01`, service: slug, landing_page: `/solutions/${slug}`, has_oppref: true });

    const booking = await openBooking(page, slug);
    const bookingUrl = new URL(await booking.iframe.getAttribute("src"));
    expect(bookingUrl.searchParams.has("cal.isBookingDryRun")).toBe(false);
    await expect(page.locator("[data-booking-test-mode]")).toHaveCount(0);
    expect(bookingUrl.searchParams.get("utm_campaign")).toBe(campaign);
    expect(bookingUrl.searchParams.get("utm_source")).toBe("chatgpt");
    expect(bookingUrl.searchParams.get("metadata[optimion_landing_page]")).toBe(`/solutions/${slug}`);
    expect(bookingUrl.searchParams.get("metadata[optimion_ad_group_id]")).toBe(`${campaign}_group`);
    expect(bookingUrl.searchParams.get("metadata[optimion_ad_id]")).toBe(`${campaign}_ad_01`);
    expect(bookingUrl.searchParams.get("metadata[optimion_oppref]")).toBe("fixture-click-reference-01");
    expect(bookingUrl.searchParams.has("email")).toBe(false);
    expect(bookingUrl.searchParams.has("name")).toBe(false);
    expect(bookingUrl.searchParams.has("unknown_tracking")).toBe(false);

    await sendCalEvent(booking, "linkReady");
    await sendCalEvent(booking, "bookerReady");
    await expect.poll(async () => (await events(page, "booking_started")).length).toBe(1);
    expect(await events(page, "cta_click")).toHaveLength(1);
    expect(await events(page, "cal_open")).toHaveLength(1);
    for (const name of ["cta_click", "cal_open", "booking_started"]) {
      expect((await events(page, name))[0]).toMatchObject({ campaign, service: slug, landing_page: `/solutions/${slug}`, ad_id: `${campaign}_ad_01` });
    }
    const stored = await page.evaluate((key) => JSON.parse(sessionStorage.getItem(key)), ATTRIBUTION_KEY);
    expect(stored).toMatchObject({ utm_campaign: campaign, landing_page: `/solutions/${slug}`, service: slug });
    expect(JSON.stringify(stored)).not.toMatch(/private-attendee|Private Attendee|unknown_tracking/);
    expect(JSON.stringify(await page.evaluate(() => window.dataLayer))).not.toMatch(/private-attendee|Private Attendee|fixture-click-reference-01/);
  });
}

test("campaign context survives public-page navigation and changes only for an explicit new campaign touch", async ({ page }) => {
  await page.goto("/solutions/zoho-crm?utm_source=chatgpt&utm_medium=paid_ai&utm_campaign=zoho_crm&utm_content=zoho_ad_01&ad_group_id=zoho_group");
  await expect.poll(() => events(page, "landing_page_view")).not.toEqual([]);
  const first = await page.evaluate((key) => JSON.parse(sessionStorage.getItem(key)), ATTRIBUTION_KEY);
  await page.locator("header a[href='/']").first().click();
  await expect(page).toHaveURL(/\/$/);
  await page.locator("main button[data-evt='cta_click']").first().click();
  const container = page.locator("[data-cal-container]");
  await expect(container.locator("iframe")).toHaveCount(1);
  const url = new URL(await container.locator("iframe").getAttribute("src"));
  expect(url.searchParams.get("utm_campaign")).toBe("zoho_crm");
  expect(url.searchParams.get("metadata[optimion_landing_page]")).toBe("/solutions/zoho-crm");
  expect(url.searchParams.get("metadata[optimion_session_id]")).toBe(first.session_id);
  await page.getByRole("button", { name: "Close scheduling modal", exact: true }).click();

  await page.goto("/solutions/power-bi?utm_source=chatgpt&utm_medium=paid_ai&utm_campaign=power_bi&utm_content=power_bi_ad_01");
  await expect.poll(() => events(page, "landing_page_view")).not.toEqual([]);
  const second = await page.evaluate((key) => JSON.parse(sessionStorage.getItem(key)), ATTRIBUTION_KEY);
  expect(second.session_id).toBe(first.session_id);
  expect(second.attribution_id).not.toBe(first.attribution_id);
  expect(second.landing_page).toBe("/solutions/power-bi");
  expect(second.utm_campaign).toBe("power_bi");
  expect(second.ad_group_id).toBeUndefined();
});

test("official booking dry-run is explicit, visibly marked, nonconverting, and never session-persistent", async ({ page }) => {
  await page.goto("/solutions/zoho-crm?booking_test=1&utm_source=chatgpt&utm_medium=paid_ai&utm_campaign=zoho_crm");
  let booking = await openBooking(page, "zoho-crm");
  let url = new URL(await booking.iframe.getAttribute("src"));
  expect(url.searchParams.get("cal.isBookingDryRun")).toBe("true");
  await expect(page.locator("[data-booking-test-mode]")).toContainText("no appointment will be created");
  await sendCalEvent(booking, "dryRunBookingSuccessfulV2", { uid: "dry-run-booking-001", status: "ACCEPTED", paymentRequired: false });
  await expect(booking.container).toHaveAttribute("data-cal-test-state", "complete");
  await expect.poll(async () => (await events(page, "booking_test_completed")).length).toBe(1);
  // A test opening must fail closed even if the provider emits the normal action.
  await sendCalEvent(booking, "bookingSuccessfulV2", { uid: "dry-run-booking-001", status: "ACCEPTED", paymentRequired: false });
  await page.waitForTimeout(100);
  expect(await events(page, "booked_consult")).toHaveLength(0);
  expect(await events(page, "cal_booking_success")).toHaveLength(0);
  expect(await page.evaluate(() => window.__openAIEvents.filter((args) => args[1] === "appointment_scheduled"))).toHaveLength(0);
  expect(await page.evaluate((key) => sessionStorage.getItem(key), BOOKING_KEY)).toBeNull();
  expect(await page.evaluate((key) => sessionStorage.getItem(key), ATTRIBUTION_KEY)).not.toContain("booking_test");
  await page.getByRole("button", { name: "Close scheduling modal", exact: true }).click();

  await page.goto("/solutions/zoho-crm");
  booking = await openBooking(page, "zoho-crm");
  url = new URL(await booking.iframe.getAttribute("src"));
  expect(url.searchParams.has("cal.isBookingDryRun")).toBe(false);
  await expect(page.locator("[data-booking-test-mode]")).toHaveCount(0);
});

test("only an accepted nonpayment booking from the correct Cal iframe converts, once per UID", async ({ page }) => {
  await page.goto("/solutions/zoho-crm?utm_source=chatgpt&utm_medium=paid_ai&utm_campaign=zoho_crm&utm_content=zoho_ad_01");
  let booking = await openBooking(page, "zoho-crm");
  const valid = { uid: "test-booking-unique-001", status: "ACCEPTED", paymentRequired: false, name: "Private Attendee", email: "private-attendee@example.test" };

  // Even a plausible payload/origin is not trusted if it did not come from the rendered iframe.
  await page.evaluate(({ namespace, data }) => {
    window.dispatchEvent(new MessageEvent("message", { origin: "https://app.cal.com", source: window, data: { fullType: `CAL:${namespace}:bookingSuccessfulV2`, data } }));
  }, { namespace: booking.namespace, data: valid });
  await page.evaluate(({ namespace, data }) => {
    const iframe = document.querySelector("[data-cal-container] iframe");
    window.dispatchEvent(new MessageEvent("message", { origin: "https://app.cal.com.attacker.test", source: iframe.contentWindow, data: { fullType: `CAL:${namespace}:bookingSuccessfulV2`, data } }));
  }, { namespace: booking.namespace, data: valid });
  await page.evaluate(({ namespace, data }) => {
    const iframe = document.querySelector("[data-cal-container] iframe");
    // An allowlisted Cal origin is still invalid if it is not this iframe's origin.
    window.dispatchEvent(new MessageEvent("message", { origin: "https://cal.com", source: iframe.contentWindow, data: { fullType: `CAL:${namespace}:bookingSuccessfulV2`, data } }));
  }, { namespace: booking.namespace, data: valid });
  await sendCalEvent({ ...booking, namespace: "wrong-namespace" }, "bookingSuccessfulV2", valid);
  await sendCalEvent(booking, "bookingSuccessfulV2", { ...valid, status: "PENDING" });
  await sendCalEvent(booking, "bookingSuccessfulV2", { ...valid, paymentRequired: true });
  await sendCalEvent(booking, "bookingSuccessfulV2", { ...valid, paymentRequired: undefined });
  await sendCalEvent(booking, "bookingSuccessfulV2", { ...valid, uid: undefined });
  await sendCalEvent(booking, "dryRunBookingSuccessfulV2", valid);
  await sendCalEvent(booking, "rescheduleBookingSuccessfulV2", valid);
  // Allow asynchronous SHA-256 work to settle before asserting rejected messages.
  await page.waitForTimeout(100);
  await expect.poll(async () => (await events(page, "booked_consult")).length).toBe(0);

  await sendCalEvent(booking, "bookingSuccessfulV2", valid);
  await expect.poll(async () => (await events(page, "booked_consult")).length).toBe(1);
  const conversion = (await events(page, "booked_consult"))[0];
  expect(conversion).toMatchObject({ campaign: "zoho_crm", ad_id: "zoho_ad_01", landing_page: "/solutions/zoho-crm", service: "zoho-crm" });
  expect(conversion.event_id).toMatch(/^cal_[a-f0-9]{64}$/);
  expect(await events(page, "cal_booking_success")).toHaveLength(1);
  expect((await events(page, "cal_booking_success"))[0].event_id).toBe(conversion.event_id);
  expect(JSON.stringify(await page.evaluate(() => window.dataLayer))).not.toMatch(/test-booking-unique-001|private-attendee|Private Attendee/);

  await sendCalEvent(booking, "bookingSuccessfulV2", valid);
  await page.getByRole("button", { name: "Close scheduling modal", exact: true }).click();
  booking = await openBooking(page, "zoho-crm");
  await sendCalEvent(booking, "bookingSuccessfulV2", valid);
  await page.waitForTimeout(100);
  await expect.poll(async () => (await events(page, "booked_consult")).length).toBe(1);
  const pixelConversions = await page.evaluate(() => window.__openAIEvents.filter((args) => args[0] === "measure" && args[1] === "appointment_scheduled"));
  expect(pixelConversions).toHaveLength(1);
  expect(pixelConversions[0][3].event_id).toBe(conversion.event_id);
  const googleConversions = await page.evaluate(() => window.dataLayer
    .filter((entry) => entry?.[0] === "event" && entry?.[1] === "discovery_call_booked")
    .map((entry) => entry[2]));
  expect(googleConversions).toHaveLength(1);
  expect(googleConversions[0]).toMatchObject({ event_id: conversion.event_id, utm_campaign: "zoho_crm", landing_page: "/solutions/zoho-crm" });
  expect(googleConversions[0]).not.toHaveProperty("session_id");
  expect(await page.evaluate((key) => JSON.parse(sessionStorage.getItem(key)), BOOKING_KEY)).toEqual([conversion.event_id]);

  // Page reloads discard in-memory dedupe, so the first-party session ledger must also guard it.
  await page.reload();
  booking = await openBooking(page, "zoho-crm");
  await sendCalEvent(booking, "bookingSuccessfulV2", valid);
  await page.waitForTimeout(100);
  await expect.poll(async () => (await events(page, "booked_consult")).length).toBe(0);
});
