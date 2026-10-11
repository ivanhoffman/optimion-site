# Optimion service advertising funnel implementation

As of October 11, 2026. This is an internal configuration and validation record; it is not a public navigation page.

## Status and spending limits

Six service landing pages and their attribution implementation are deployed in website commit `edca163ad0fd96bd11cc25cb9a444d8061954558`. Full lint, production build, and the final automated suite passed: **45 passed, 3 skipped**. Vercel deployment `J6GqumYvLiZfVQgSqZyDhEeGr59v` is **Ready / Production**, with `optimion.us` assigned. Live secondary-event receipt is verified in Ads Manager and GA4. A genuine completed-booking receipt is not claimed; the official dry-run submission is held at Cal.com's Terms confirmation, awaiting separate authorization.

**No new service campaigns, ad groups, or ads have been created or launched. No new advertising spend was initiated.** The live ChatGPT Ads interface requires a minimum average daily budget of **$25**, and its daily-budget explanation permits spending up to **2× the average daily budget** on a day. That cannot guarantee the user's hard **$5 maximum per service per day**. An average daily budget is not a hard daily spending cap. No attempt was made to bypass this limit or substitute the existing broad campaign for the six service tests.

The requested six-service plan would have a $30/day total and approximately $60 over two days only if each service could be capped at $5/day. Those are requested limits, not a configuration that is currently available or active. No automatic budget increase, redistribution, scaling, or pause schedule was created. The broad campaign remains preserved in its observed OFF state.

## Dedicated landing pages and intended campaign structure

These are the six production destinations. Their live/deployment verification status is recorded at the end of this report. They are deliberately excluded from public navigation, footer links, homepage cards, service indexes, breadcrumbs, XML sitemap, and `llms.txt`. They emit `noindex,nofollow`; AdsBot is allowed to retrieve them.

All names below are **intended names only**, not created platform objects. Each proposed campaign requests United States targeting, Clicks objective, Maximum Results bidding, and a hard maximum of $5/day, subject to a platform mechanism that can enforce that limit.

| Service | Landing page | Intended campaign | Intended ad group | Intended ad | Campaign parameter |
|---|---|---|---|---|---|
| Zoho CRM | https://optimion.us/solutions/zoho-crm | US \| Zoho CRM \| Clicks \| Comparison 01 | Zoho CRM \| Service intent | Zoho CRM \| Integration 01 | `zoho_crm` |
| CRM Integration | https://optimion.us/solutions/crm-integration | US \| CRM Integration \| Clicks \| Comparison 01 | CRM Integration \| Service intent | CRM Integration \| Workflow 01 | `crm_integration` |
| ERP / Business Central | https://optimion.us/solutions/erp-business-central | US \| ERP / Business Central \| Clicks \| Comparison 01 | ERP / Business Central \| Service intent | ERP / Business Central \| Operations 01 | `erp_business_central` |
| Business Automation | https://optimion.us/solutions/business-automation | US \| Business Automation \| Clicks \| Comparison 01 | Business Automation \| Service intent | Business Automation \| Workflow 01 | `business_automation` |
| Power BI | https://optimion.us/solutions/power-bi | US \| Power BI \| Clicks \| Comparison 01 | Power BI \| Service intent | Power BI \| Reporting 01 | `power_bi` |
| Ecommerce / Shopify | https://optimion.us/solutions/ecommerce-integration | US \| Ecommerce / Shopify \| Clicks \| Comparison 01 | Ecommerce / Shopify \| Service intent | Ecommerce / Shopify \| Integration 01 | `ecommerce_integration` |

Every page uses Optimion's existing dark visual style, a service-specific workflow diagram, implementation capabilities, relevant platforms, existing testimonial text, FAQs, and three “Book a Free Discovery Call” buttons. There are no case studies or case-study images. No public service or navigation catalog was expanded.

## Exact prepared ad copy and context hints

The following headline and subtext are also the corresponding landing-page H1 and opening subtext. They remain prepared copy, not published ads. The live ad form's character limits were verified as **Title: 50 characters; Description: 100 characters**. All six prepared headline/subtext pairs fit these limits.

### Zoho CRM

Headline: **Get More From Zoho CRM**

Subtext: **Setup, automation & integrations for your business.**

Context hints from the user's request:

- businesses implementing Zoho CRM
- businesses needing Zoho customization
- businesses integrating Zoho with accounting, ecommerce, inventory, email, or other systems
- teams experiencing duplicate entry or manual workflows in Zoho
- companies needing Zoho Flow automation
- teams needing lead-routing or sales-process automation

### CRM Integration

Headline: **Make Your CRM Work Better**

Subtext: **Automation, integrations and custom CRM workflows.**

Context hints from the user's request:

- CRM setup
- CRM migration
- HubSpot
- Zoho
- disconnected CRM systems
- lead routing
- lifecycle workflows
- duplicate entry
- syncing CRM with accounting, ecommerce, or operational systems
- companies trying to automate CRM processes

### ERP / Business Central

Headline: **Connect Your ERP Systems**

Subtext: **Automate orders, inventory and operational data.**

Context hints from the user's request:

- Microsoft Dynamics 365 Business Central
- ERP integrations
- inventory systems
- order workflows
- EDI
- ERP automation
- external system synchronization
- companies trying to connect Business Central to other platforms
- companies with manual ERP data entry

### Business Automation

Headline: **Automate Repetitive Work**

Subtext: **Custom workflows built around your business.**

Context hints from the user's request:

- repetitive tasks
- manual processes
- approvals
- document workflows
- notifications
- system integration
- process automation
- businesses trying to reduce manual administrative work
- companies trying to connect multiple software platforms
- workflow automation

### Power BI

Headline: **Turn Your Data Into Answers**

Subtext: **Power BI dashboards and automated reporting.**

Context hints from the user's request:

- Power BI
- dashboards
- reporting
- KPI visibility
- Business Central reporting
- CRM analytics
- automated reporting
- teams struggling with manual Excel reports
- organizations needing consolidated dashboards
- executives needing better visibility

### Ecommerce / Shopify

Headline: **Connect Shopify to Your Systems**

Subtext: **Automate orders, inventory and customer data.**

Context hints from the user's request:

- Shopify
- ERP
- CRM
- WMS
- inventory
- accounting
- ecommerce automation
- order synchronization
- customer synchronization
- companies manually moving Shopify order data into other systems
- businesses connecting ecommerce to Business Central, QuickBooks, CRM, or warehouse systems

## Destination URL parameter templates

The live Ads Manager interface confirmed support for the platform placeholders shown here. These are literal setup templates, not real campaign or ad IDs. Apply the service's `utm_campaign` value from the table above; the platform fills the identifiers and click reference for actual ads.

```text
https://optimion.us/solutions/zoho-crm?utm_source=chatgpt&utm_medium=paid_ai&utm_campaign=zoho_crm&utm_content={ad_id}&campaign_id={campaign_id}&ad_group_id={ad_group_id}&ad_id={ad_id}&oppref={oppref}
https://optimion.us/solutions/crm-integration?utm_source=chatgpt&utm_medium=paid_ai&utm_campaign=crm_integration&utm_content={ad_id}&campaign_id={campaign_id}&ad_group_id={ad_group_id}&ad_id={ad_id}&oppref={oppref}
https://optimion.us/solutions/erp-business-central?utm_source=chatgpt&utm_medium=paid_ai&utm_campaign=erp_business_central&utm_content={ad_id}&campaign_id={campaign_id}&ad_group_id={ad_group_id}&ad_id={ad_id}&oppref={oppref}
https://optimion.us/solutions/business-automation?utm_source=chatgpt&utm_medium=paid_ai&utm_campaign=business_automation&utm_content={ad_id}&campaign_id={campaign_id}&ad_group_id={ad_group_id}&ad_id={ad_id}&oppref={oppref}
https://optimion.us/solutions/power-bi?utm_source=chatgpt&utm_medium=paid_ai&utm_campaign=power_bi&utm_content={ad_id}&campaign_id={campaign_id}&ad_group_id={ad_group_id}&ad_id={ad_id}&oppref={oppref}
https://optimion.us/solutions/ecommerce-integration?utm_source=chatgpt&utm_medium=paid_ai&utm_campaign=ecommerce_integration&utm_content={ad_id}&campaign_id={campaign_id}&ad_group_id={ad_group_id}&ad_id={ad_id}&oppref={oppref}
```

## Preserved broad Optimion campaign

Observed in the authenticated Ads Manager session, unchanged:

| Setting | Observed value |
|---|---|
| Campaign | Optimion campaign |
| Campaign state | OFF |
| Average daily budget | $25 |
| Location | United States |
| Objective | Clicks |
| Bid strategy | Maximum Results |
| Ad group | Recommended ad group |
| Ad-group state | Active, but the parent campaign is OFF |
| Ad | Optimion systems integration |
| Headline | We Connect Your Systems |
| Description | Automate repetitive work and eliminate manual tasks. |
| Destination | https://optimion.us/ |

Exact existing context hints:

- US businesses seeking automation, ERP/CRM integration, and business intelligence.
- Teams looking to connect existing systems without duplicate data entry.
- Companies needing Power BI dashboards and operational reporting.
- Organizations exploring AI workflows, APIs, and custom business software.

Historical performance for **September 28–October 11, 2026**, as displayed in Ads Manager:

| Impressions | Clicks | Spend | CPC | CTR |
|---:|---:|---:|---:|---:|
| 2,336 | 29 | $88.03 | $3.04 | 1.24% |

Historical spend is not spend initiated by this implementation. Do not combine it with the unlaunched six-service comparison.

## Conversion and attribution configuration

The real OpenAI browser pixel ID is **`5M223HtAJyA36W5hVDC4SE`**. This is a public browser identifier, not a secret or Conversions API credential. Ads Manager's primary goal is **Discovery Call Booked**, using **`appointment_scheduled`**, with **30-day click** and **1-day view** attribution windows.

Five named events are configured in the live Ads Manager data source:

| Ads Manager event name | Measured event identifier |
|---|---|
| Website Page View | `page_viewed` |
| Consultation CTA Click | `consultation_cta_clicked` |
| Booking Interface Opened | `booking_opened` |
| Booking Started | `booking_started` |
| Discovery Call Booked | `appointment_scheduled` |

Ads Manager's Event Stream verified production `page_viewed`, `consultation_cta_clicked`, `booking_opened`, and `booking_started` events. Booking-start receipt was observed for every service: Zoho at 18:22:14 UTC, CRM at 18:23:21, ERP at 18:23:45, Power BI at 18:24:08, Ecommerce at 18:24:19, and Automation at 18:27:40 on October 11. These are intentional QA visits, not ad-generated results. Early local tests also sent initialization/page-view events before all suites were isolated; the final automated suite blocked all external providers. No `appointment_scheduled` test conversion was deliberately sent.

GA4 Realtime verified `landing_page_view`, `consultation_click`, `booking_opened`, and `booking_started` receipt. Drilling into `landing_page_view` showed campaign/ad-group/ad, anonymous-session, and attribution parameters; campaign-ID values distinguished the synthetic QA service sources. Newly registered custom dimensions can take time to populate standard/exploration reports; Realtime receipt is separate from processed reporting.

The remaining Ads diagnostics warnings are **No active campaigns use conversion events** (expected because launch is budget-blocked) and **No recent server-to-server events** (this implementation uses the browser pixel, not Conversions API). No API key was created to silence that warning.

The remote pixel's automatic matching setting is enabled. The visible edit interface offered a name field but no toggle to disable automatic matching. The application does not deliberately send attendee names, emails, or phone numbers in funnel events; that is not a claim that the provider's automatic matching feature is disabled. Event calls set `opt_out: true`, which restricts future personalization, not measurement.

### Event map

| User action | Application / data-layer event | GA4 funnel event | OpenAI measurement event |
|---|---|---|---|
| Visit a service landing page | `landing_page_view` | `landing_page_view` | `page_viewed` |
| Click consultation CTA | `cta_click` | `consultation_click` | `custom` with `consultation_cta_clicked` |
| Open scheduling interface | `cal_open` | `booking_opened` | `custom` with `booking_opened` |
| Enter ready booking interface | `booking_started` | `booking_started` | `custom` with `booking_started` |
| Accepted, non-payment booking callback | `booked_consult` | `discovery_call_booked` | `appointment_scheduled` |
| Legacy completion compatibility | `cal_booking_success` | Existing legacy integration only | No second OpenAI conversion |
| Official dry-run completion | `booking_test_completed` | Diagnostic event only | No real booking conversion |

“Booking started” means the ready booking interface was entered (`booking_stage=interface_entered`). It does not assert that the visitor selected a slot or submitted a form.

GA4 property: **498394700**. Google Analytics account: **362811836**. Existing measurement ID: **G-GWBX9F3PLV**. Existing Google Tag Manager container: **GTM-PQJFJPTW**.

The following event-scoped custom dimensions were added in GA4:

| Display name | Event parameter |
|---|---|
| Service | `service` |
| Landing page | `landing_page` |
| Campaign ID | `campaign_id` |
| Ad group ID | `ad_group_id` |
| Ad ID | `ad_id` |
| Campaign name | `utm_campaign` |
| Campaign source | `utm_source` |
| Campaign medium | `utm_medium` |
| Campaign creative | `utm_content` |

The new **`discovery_call_booked`** event is verified as a GA4 key event with **once-per-event** counting. The legacy **`booked_consult`** key-event designation was removed and verified. This avoids counting both legacy and new names as two business key events for one booking. This configuration change does not assert that a real booking has been received.

### How the source survives the journey

`lib/attribution.js` accepts only recognized campaign labels and a validated OpenAI `oppref`. It stores the landing-page path, service, campaign/ad-group/ad values, random anonymous session ID, and attribution-touch ID in first-party `sessionStorage` under `optimion:attribution:v1`. Arbitrary query parameters, attendee details, and full referral URLs are not copied into this record.

Navigating to a public page preserves the original campaign source. A new explicit campaign touch replaces the attribution context while retaining the anonymous session ID. The original landing-page/service fields remain separate from the currently viewed service. Blocked browser storage falls back to in-memory context so booking still works, but a reload can then lose attribution.

The booking embed receives supported UTM fields and `metadata[optimion_*]` values for the session, attribution touch, original landing page, service, campaign ID, ad-group ID, ad ID, and click reference. Cal.com can retain these alongside a submitted booking through its UTM and metadata support. The exact completed production booking record still needs verification without creating an unwanted real appointment.

The application accepts booking callbacks only from the actual rendered Cal.com iframe at the exact trusted origin and current embed namespace. A real conversion requires `bookingSuccessfulV2` with an accepted status, `paymentRequired=false`, and a booking UID. It hashes the UID to create an event ID and deduplicates that ID in memory and a session-storage ledger. Dry runs, reschedules, pending bookings, payment-required callbacks, and unrelated messages do not count as new completed consultations.

### Practical limits

- Measurement is browser-based. There is no server-side webhook ledger or Conversions API implementation in this change.
- Session deduplication is not server-confirmed, cross-device, or permanent deduplication. A different browser session may not share the ledger.
- Ad blockers, browser privacy settings, network failures, storage restrictions, or a visitor closing the page can prevent event delivery.
- The direct Cal.com fallback opens a new tab with attribution parameters. The website cannot observe that tab's booking completion callback; a completed fallback booking may require reconciliation from Cal.com's record.
- A dry-run booking validates the test journey; it is not a real appointment and must not be counted as a real conversion.
- Local isolated-provider tests validate application logic, not provider ingestion. Pixel/GA4 test-event receipt and a server-stored booking attribution record are separate checks.
- No anonymous visitor is identified by name by this application. Names and contact details belong to records the person explicitly submits through booking.
- Existing GTM/third-party automatic page-view collection is not proven to redact arbitrary PII a third party might put in a URL. Our ad templates contain only approved anonymous parameters; application funnel commands sanitize page URLs and do not send raw attendee details, raw booking UIDs, or raw `oppref`.

## Internal reporting method

Use three existing sources together: ChatGPT Ads Manager campaign/ad-group/ad reporting and exports for delivery and cost; GA4 property 498394700 for the website funnel by the custom dimensions above; and Cal.com booking UTM/metadata for booking-record reconciliation. No new analytics vendor was added.

Build a comparison row for each service/campaign/date range with:

| Field | Source or calculation |
|---|---|
| Campaign, service, landing page | Campaign mapping above plus GA4 dimensions |
| Impressions, clicks, spend, CPC, CTR | Ads Manager campaign/ad-group/ad report or export |
| Landing-page visits | GA4 `landing_page_view`, filtered/grouped by original landing page and campaign |
| CTA clicks | GA4 `consultation_click` |
| Booking-interface opens | GA4 `booking_opened` |
| Booking starts | GA4 `booking_started` |
| Completed discovery calls | GA4 `discovery_call_booked`, checked against attributed Cal.com records |
| Website conversion rate | Completed bookings ÷ landing-page visits, using a consistent counting method/date range |
| Cost per booking | Campaign spend ÷ attributed completed bookings |

A saved GA4 exploration is configured and persisted after reload: [Optimion | Service campaign funnel](https://analytics.google.com/analytics/web/#/analysis/a362811836p498394700/edit/z0gx4LwzTtSwnIOoXRelHA), tab **Service conversion funnel**. It is a closed funnel with four exact-event steps: `landing_page_view → consultation_click → booking_started → discovery_call_booked`, broken down by **Service**, with **10 rows** and all **nine attribution dimensions** available.

The copied NonConverters segment and Paid Search filter were removed so `paid_ai` traffic is not excluded if GA4 assigns it to Unassigned. The exploration uses **Last 28 days, excluding Today**. Its saved configuration was verified after reload; newly populated campaign data is not claimed, and today's validation traffic will not appear in that default date range.

For manual reconciliation, match Cal.com's stored UTM campaign/content and metadata campaign/ad identifiers to the campaign export and the GA4 funnel. Aggregate counts at the same reporting dates and attribution window. Avoid summing the legacy completion event and the new completion event as separate bookings. Different platforms can report different counts because of attribution windows, delivery loss, and privacy settings.

Use **N/A** for an unavailable metric or undefined denominator. With no observed completed bookings, cost per booking is N/A, not $0. With the six service campaigns unlaunched, their delivery, spend, and conversion results are not yet a completed comparison test.

## Repository implementation

- `lib/solutions.js`: isolated six-page content and slug list.
- `Components/SolutionPage.js`: shared responsive paid landing-page layout.
- `pages/solutions/[slug].js`: static direct routes; unknown slugs return 404.
- `lib/attribution.js`: recognized campaign capture, session context, Cal config, and booking-event deduplication.
- `lib/gtag.js`: enriched data-layer events, explicit GA4 funnel events, and OpenAI event mapping.
- `Components/CalDotComModal.js`: official Cal embed callbacks, source validation, attribution, test-mode exclusion, and direct-booking fallback.
- `Components/OpenAIAdsPixel.js` and `pages/_app.js`: real pixel initialization, page measurement, and SPA attribution handling.
- `next.config.mjs`: noindex response-header defense for solution routes.
- `pages/privacy.js`: updated October 2026 disclosure of first-party campaign storage, measurement, and booking attribution.
- `tests/e2e/solutions.spec.js` and `tests/e2e/attribution.spec.js`: hidden-page/responsive checks and isolated attribution/callback tests.

CTA identifiers are `solution_<slug>_hero`, `solution_<slug>_mid`, and `solution_<slug>_final`; the page exposes `main[data-solution="<slug>"]`. Existing case-study removal remains in force.

## Audit baseline

The existing site is Next.js 15.5.23 / React 19, using the Pages Router and Tailwind 3. Public service routes and SEO catalogs were preserved. The existing stack is GTM / GA4 plus Cal.com (`optimion/30min`) for booking; there is no native contact form on the parent website. The prior source included optional OpenAI-pixel wiring without a configured real pixel, legacy CTA/calendar events, and booking callbacks without the new source-validation, session attribution, or UID ledger. Campaign parameters were not previously retained across the website journey. This change reuses that stack rather than adding another reporting vendor.

## Final verification record

- [x] Full repository lint completes successfully.
- [x] Production build completes successfully.
- [x] Landing-page and attribution tests pass on desktop and mobile.
- [x] Existing navigation, Services overlay, responsive, and removed-case-study regression tests pass. Final full suite: 45 passed, 3 skipped.
- [x] All six production destination URLs return 200 with unique metadata, one H1, three CTA placements, and exact self-canonicals.
- [x] Every solution emits HTML and response-header noindex; all 11 public sitemap pages were checked with zero solution links. Sitemap and `llms.txt` exclude solutions. Public pages remain indexable; robots allows AdsBot.
- [x] Desktop production visuals reviewed for all six pages. Six 390×844 mobile screenshots of the identical local production build were reviewed with external providers isolated; no clipping and prominent full-width CTAs. The in-app browser's viewport override did not change its actual 1280×720 viewport, so production mobile visual emulation is not claimed.
- [x] Actual Cal embeds preserve each service's UTMs and metadata and display a usable calendar. All six booking-start events were received in Ads Manager.
- [ ] Official dry-run journey completes without a real appointment or primary conversion.
- [x] GA4 receives secondary funnel events with distinct campaign identifiers; Realtime parameters were inspected.
- [x] Ads Manager receives page/CTA/open/start QA events. Real completed-booking ingestion remains unverified, not fabricated.
- [x] GA4 `discovery_call_booked` is marked as the key event with once-per-event counting and legacy `booked_consult` is unmarked. No real booking count is claimed.
- [x] Privacy disclosure updated to describe delivered campaign/session and booking attribution behavior.
- [x] Provider automatic-matching status and browser-only measurement limitations are disclosed above.
- [x] No service campaign/ad group/ad created or launched; no budget increased and no new spend initiated.
- [x] Existing Optimion campaign preserved OFF at its observed settings.
- [x] Application funnel events include no secrets or raw attendee details; public browser pixel/measurement IDs only. Third-party automatic-collection caveat remains above.
- [x] Website source commit pushed: **`edca163ad0fd96bd11cc25cb9a444d8061954558`**.
- [x] Production deployment verified: [J6GqumYvLiZfVQgSqZyDhEeGr59v](https://vercel.com/ivans-projects-7d2664cd/optimion-site/J6GqumYvLiZfVQgSqZyDhEeGr59v), **Ready / Production**, commit `edca163`, assigned to `optimion.us`.

The explicit `?booking_test=1` flag is per opening, never persisted, and passes the provider's exact `cal.isBookingDryRun=true` configuration. Both Optimion and the real Cal.com interface visibly identify test mode. The live journey reached the final form with synthetic QA details, but **Confirm was not clicked** because it includes agreement to Cal.com's Terms; separate user approval was requested. Isolated tests verify `dryRunBookingSuccessfulV2` is diagnostic only and that even a normal-success callback fails closed in test mode. No appointment was created. No completed server-stored booking metadata record, real primary pixel ingestion, or end-to-end paid-ad click is claimed.

### Local evidence

Screenshots are intentionally excluded from Git because they contain authenticated account configuration. They are in `artifacts/funnel-validation/` in the local workspace:

- `production-zoho-desktop.png` and `<service-slug>-mobile.png`: production desktop / identical-build mobile visuals.
- `ads-budget-minimum.png`: live minimum-budget rejection.
- `ads-conversion-events.png` and `ga4-primary-key-event.png`: configured goals.
- `ads-live-funnel-events.png` and `ads-six-service-booking-starts.png`: actual secondary-event receipt.
- `ga4-live-campaign-ids.png`, `ga4-live-funnel-events.png`, and `ga4-service-funnel.png`: actual GA4 receipt and saved reporting setup.
- `cal-dry-run-confirmation.png`: official test-mode form held at Terms confirmation.

Remaining external decision: the requested advertising test cannot be launched under the platform's observed budget rules without a supported hard-cap mechanism or a different explicit user authorization. No higher budget is authorized by this implementation report.
