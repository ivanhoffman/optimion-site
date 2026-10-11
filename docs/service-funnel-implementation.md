# Optimion service advertising funnel implementation

As of October 11, 2026. This is an internal configuration and validation record; it is not a public navigation page.

## Initial implementation status and historical spending limits

Six service landing pages and their attribution implementation are deployed in website commit `edca163ad0fd96bd11cc25cb9a444d8061954558`. Full lint, production build, and the final automated suite passed: **45 passed, 3 skipped**. Vercel deployment `J6GqumYvLiZfVQgSqZyDhEeGr59v` is **Ready / Production**, with `optimion.us` assigned. Live secondary-event receipt is verified in Ads Manager and GA4. After explicit user authorization for Cal.com's Terms confirmation, the official dry run completed successfully on October 11, 2026, and the website received its test-completion callback. No real appointment or genuine completed-booking conversion receipt is claimed.

**At the conclusion of the initial six-service implementation, no new service campaigns, ad groups, or ads had been created or launched, and no new advertising spend had been initiated.** The live ChatGPT Ads interface requires a minimum average daily budget of **$25**, and its daily-budget explanation permits spending up to **2× the average daily budget** on a day. That could not guarantee the initial hard **$5 maximum per service per day**. An average daily budget is not a hard daily spending cap. No attempt was made to bypass that limit or substitute the existing broad campaign for the six service tests.

The initial six-service plan would have had a $30/day total and approximately $60 over two days only if each service could be capped at $5/day. Those were requested limits, not an available or active configuration. **The user has since explicitly superseded that initial limit for CRM Integration, ERP & Business Central, and Business Automation only**, approving $25 average/day per campaign with the disclosed potential for $50 per campaign in a day. All three are now published, ON, and shown as **Serving**; the publication follow-up below records the verified results. Zoho CRM, Power BI, and Ecommerce / Shopify remain unlaunched under the original authorization. No automatic budget increase, redistribution, scaling, or pause schedule was created. The broad campaign remains preserved in its observed OFF state.

## Dedicated landing pages and intended campaign structure

These are the six production destinations. Their live/deployment verification status is recorded at the end of this report. They are deliberately excluded from public navigation, footer links, homepage cards, service indexes, breadcrumbs, XML sitemap, and `llms.txt`. They emit `noindex,nofollow`; AdsBot is allowed to retrieve them.

The names below document the **historical six-service plan**, not verified created platform objects. That original plan requested United States targeting, Clicks objective, Maximum Results bidding, and a hard maximum of $5/day. Current settings and exact saved names for the three subsequently approved campaigns belong in the publication follow-up below and supersede these historical planning rows where applicable.

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

The following headline and subtext document the original prepared copy and are also the corresponding landing-page H1 and opening subtext. They are not a record of published ads. Exact saved ad copy for the three approved campaigns is recorded in the publication follow-up below. The live ad form's character limits were verified as **Title: 50 characters; Description: 100 characters**. All six original headline/subtext pairs fit these limits.

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

The live Ads Manager interface supports the campaign/ad-group/ad placeholders below. These are literal setup templates, not real campaign or ad IDs. The campaign-level tracking parameter value is `utm_source=chatgpt&utm_medium=paid_ai&utm_campaign=<service_value>&utm_content={ad_id}&campaign_id={campaign_id}&ad_group_id={ad_group_id}&ad_id={ad_id}`.

**Do not add `oppref={oppref}` to custom tracking parameters.** `oppref` is a reserved native click reference. The website captures and preserves a validated inbound `oppref` if the platform supplies one. Its propagation through an actual paid-ad click has not been verified. The full URLs below show the intended destination plus valid campaign-level parameter template; the actual saved UI fields must be verified separately.

```text
https://optimion.us/solutions/zoho-crm?utm_source=chatgpt&utm_medium=paid_ai&utm_campaign=zoho_crm&utm_content={ad_id}&campaign_id={campaign_id}&ad_group_id={ad_group_id}&ad_id={ad_id}
https://optimion.us/solutions/crm-integration?utm_source=chatgpt&utm_medium=paid_ai&utm_campaign=crm_integration&utm_content={ad_id}&campaign_id={campaign_id}&ad_group_id={ad_group_id}&ad_id={ad_id}
https://optimion.us/solutions/erp-business-central?utm_source=chatgpt&utm_medium=paid_ai&utm_campaign=erp_business_central&utm_content={ad_id}&campaign_id={campaign_id}&ad_group_id={ad_group_id}&ad_id={ad_id}
https://optimion.us/solutions/business-automation?utm_source=chatgpt&utm_medium=paid_ai&utm_campaign=business_automation&utm_content={ad_id}&campaign_id={campaign_id}&ad_group_id={ad_group_id}&ad_id={ad_id}
https://optimion.us/solutions/power-bi?utm_source=chatgpt&utm_medium=paid_ai&utm_campaign=power_bi&utm_content={ad_id}&campaign_id={campaign_id}&ad_group_id={ad_group_id}&ad_id={ad_id}
https://optimion.us/solutions/ecommerce-integration?utm_source=chatgpt&utm_medium=paid_ai&utm_campaign=ecommerce_integration&utm_content={ad_id}&campaign_id={campaign_id}&ad_group_id={ad_group_id}&ad_id={ad_id}
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

At the initial pre-publication validation, Ads diagnostics displayed **No active campaigns use conversion events** (expected while launch was budget-blocked) and **No recent server-to-server events** (this implementation uses the browser pixel, not Conversions API). The three subsequently published campaigns now have the booking goal attached, as recorded below; the initial warning is historical rather than a statement that no campaigns currently use the goal. No API key was created to silence the server-to-server warning.

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

Use **N/A** for an unavailable metric or undefined denominator. With no observed completed bookings, cost per booking is N/A, not $0. The initial six-service comparison was not launched; publication status and subsequent results for the three newly approved campaigns must be recorded separately. The other three service campaigns remain unlaunched.

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

## Initial implementation final verification record

- [x] Full repository lint completes successfully.
- [x] Production build completes successfully.
- [x] Landing-page and attribution tests pass on desktop and mobile.
- [x] Existing navigation, Services overlay, responsive, and removed-case-study regression tests pass. Final full suite: 45 passed, 3 skipped.
- [x] All six production destination URLs return 200 with unique metadata, one H1, three CTA placements, and exact self-canonicals.
- [x] Every solution emits HTML and response-header noindex; all 11 public sitemap pages were checked with zero solution links. Sitemap and `llms.txt` exclude solutions. Public pages remain indexable; robots allows AdsBot.
- [x] Desktop production visuals reviewed for all six pages. Six 390×844 mobile screenshots of the identical local production build were reviewed with external providers isolated; no clipping and prominent full-width CTAs. The in-app browser's viewport override did not change its actual 1280×720 viewport, so production mobile visual emulation is not claimed.
- [x] Actual Cal embeds preserve each service's UTMs and metadata and display a usable calendar. All six booking-start events were received in Ads Manager.
- [x] Official dry-run journey completes without a real appointment; the website receives its diagnostic-only completion callback and the test-mode guard excludes primary conversion dispatch.
- [x] GA4 receives secondary funnel events with distinct campaign identifiers; Realtime parameters were inspected.
- [x] Ads Manager receives page/CTA/open/start QA events. Real completed-booking ingestion remains unverified, not fabricated.
- [x] GA4 `discovery_call_booked` is marked as the key event with once-per-event counting and legacy `booked_consult` is unmarked. No real booking count is claimed.
- [x] Privacy disclosure updated to describe delivered campaign/session and booking attribution behavior.
- [x] Provider automatic-matching status and browser-only measurement limitations are disclosed above.
- [x] At completion of the initial implementation, no service campaign/ad group/ad had been created or launched; no budget had been increased and no new spend had been initiated. The three-campaign follow-up below has separate authorization and verified results.
- [x] Existing Optimion campaign preserved OFF at its observed settings.
- [x] Application funnel events include no secrets or raw attendee details; public browser pixel/measurement IDs only. Third-party automatic-collection caveat remains above.
- [x] Website source commit pushed: **`edca163ad0fd96bd11cc25cb9a444d8061954558`**.
- [x] Production deployment verified: [J6GqumYvLiZfVQgSqZyDhEeGr59v](https://vercel.com/ivans-projects-7d2664cd/optimion-site/J6GqumYvLiZfVQgSqZyDhEeGr59v), **Ready / Production**, commit `edca163`, assigned to `optimion.us`.

The explicit `?booking_test=1` flag is per opening, never persisted, and passes the provider's exact `cal.isBookingDryRun=true` configuration. Both Optimion and the real Cal.com interface visibly identify test mode. After the user explicitly authorized confirming this official dry run and accepting Cal.com's Terms, **Confirm was clicked once** with synthetic QA details on October 11, 2026. The provider displayed **Booking dry run successful** / **The dry run was completed successfully**. The website's `[data-cal-container]` also changed to `data-cal-test-state="complete"`, confirming receipt of the trusted `dryRunBookingSuccessfulV2` callback.

This callback emits only the `booking_test_completed` diagnostic, which has no GA4 funnel or OpenAI-pixel conversion mapping. The separate normal-success callback returns immediately in test mode, before either `booked_consult` or `cal_booking_success` dispatch. Isolated tests and a fresh read-only source review confirm that guard. No appointment was created by the official provider dry run. No completed server-stored booking metadata record, real primary pixel ingestion, or end-to-end paid-ad click is claimed; a successful diagnostic test is deliberately not a real conversion.

### Local evidence

Screenshots are intentionally excluded from Git because they contain authenticated account configuration. They are in `artifacts/funnel-validation/` in the local workspace:

- `production-zoho-desktop.png` and `<service-slug>-mobile.png`: production desktop / identical-build mobile visuals.
- `ads-budget-minimum.png`: live minimum-budget rejection.
- `ads-conversion-events.png` and `ga4-primary-key-event.png`: configured goals.
- `ads-live-funnel-events.png` and `ads-six-service-booking-starts.png`: actual secondary-event receipt.
- `ga4-live-campaign-ids.png`, `ga4-live-funnel-events.png`, and `ga4-service-funnel.png`: actual GA4 receipt and saved reporting setup.
- `cal-dry-run-confirmation.png`: synthetic official test-mode form before approved confirmation.
- `cal-dry-run-success.png`: provider's successful dry-run result within the Optimion test-mode modal.

## Publication follow-up — three approved service campaigns

The user explicitly approved publication of **CRM Integration**, **ERP & Business Central**, and **Business Automation** at **$25 average/day each**, understanding the platform's potential to spend **$50 per campaign in a day**. Across these three campaigns, that is **$75 average/day** and a potential **$150 in a day**, not a $75 hard daily cap. The user also explicitly approved the **Advertising Tool Terms for all three**. This authorization does not extend to launching Zoho CRM, Power BI, Ecommerce / Shopify, increasing any of these budgets, or activating the preserved broad campaign.

**All three campaigns were successfully published and the final campaign table showed all three ON and Serving at $25/day, with the old broad campaign OFF in the same view.** Each creation result confirmed one ad group and one ad. All three ad-group switches are ON. CRM and ERP ads were directly observed Serving; the Automation ad initially displayed Not Serving / Review Pending before the final campaign table showed that campaign Serving. All three ads are saved with `active` status in the Ads for edit export. The final campaign Serving state is the authoritative current delivery signal; a separate Automation-ad review-state recheck is not claimed, and no pending campaign-level review is reported. A Serving label is not a measurement of impressions, clicks, spend, or completed bookings; no new campaign-performance totals are claimed here.

| Service | Approved average daily budget | Disclosed potential in one day | Landing page | Campaign parameter | Verified publication result |
|---|---:|---:|---|---|---|
| CRM Integration | $25 | $50 | https://optimion.us/solutions/crm-integration | `crm_integration` | Published · ON · Serving |
| ERP & Business Central | $25 | $50 | https://optimion.us/solutions/erp-business-central | `erp_business_central` | Published · ON · Serving |
| Business Automation | $25 | $50 | https://optimion.us/solutions/business-automation | `business_automation` | Published · ON · Serving |

### Shared verified settings

- Average daily budget: **$25.00 per campaign**, daily budget type; the disclosed potential remains $50 per campaign in a day.
- Objective: **Clicks**; billing event: **click**; bid strategy: **Maximize Results**.
- Location: **United States**, verified in the UI; export location ID **`1000232`**.
- Platform families in the export: **`ios_app`**, **`android_app`**, and **`web`**.
- AI-generated text: **Off**. No campaign end date is set.
- Advertising Tool Terms were confirmed within the explicitly approved publication workflows.
- The only attached conversion goal is **Discovery Call Booked / `appointment_scheduled`**. All three campaign exports contain exactly `conversion_event_setting_ids=["6acbcf79021c819cb680efd52ad502c6"]`; the goal name was verified in the review UI.
- Existing goal definitions and the **30-day click / 1-day view** attribution settings were preserved; this follow-up attached the existing goal to the three campaigns rather than modifying its definition or windows.
- Campaign-level UTM/ad-identifier tracking templates were saved and validated. No reserved `oppref` custom parameter is configured.

The campaign objective is Clicks with completed-booking measurement attached; conversion-optimized bidding is not claimed. Secondary website funnel events remain available for reporting. Prior secondary-event receipt and the official dry run remain valid implementation evidence; they do not establish genuine bookings or paid-click attribution for these new campaigns.

### CRM Integration — saved configuration

- Campaign: **Optimion | CRM Integration | US** — **`cmpn_6acbe9fefc348191af033b24d18d82fd`**.
- Ad group: **CRM Integration | High Intent** — **`adgrp_4ac2936e7b108191bc81fbccdc162e0f`**.
- Ad: **CRM Integration | Systems Sync** — **`ad_6acbea0725bc819a888f852f6b2af6a1`**, export status `active`.
- Configured start timestamp: **October 11, 2026, 3:41:31 PM Eastern** (`2026-10-11T19:41:31Z` in the export).
- Title: **CRM Integration & Automation**.
- Description: **Connect HubSpot, Zoho and business systems. Automate routing and customer handoffs.**
- Saved ad destination: **https://optimion.us/solutions/crm-integration**.

Saved campaign-level tracking parameters:

```text
utm_source=chatgpt&utm_medium=paid_ai&utm_campaign=crm_integration&utm_content={ad_id}&campaign_id={campaign_id}&ad_group_id={ad_group_id}&ad_id={ad_id}
```

Exact ten saved context hints:

- Businesses seeking CRM integration consulting
- Teams connecting HubSpot or Zoho CRM to accounting and ecommerce
- Companies automating lead assignment and routing
- Sales teams automating lifecycle and onboarding handoffs
- Teams resolving duplicate contacts and inconsistent customer records
- Companies synchronizing customer records and sales orders between CRM and accounting
- Businesses replacing manual handoffs after a deal is won
- Teams planning CRM field mapping or data migration
- Companies connecting custom CRMs through APIs or webhooks
- Teams needing visible CRM integration failures and exception handling

### ERP & Business Central — saved configuration

- Campaign: **Optimion | ERP & Business Central | US** — **`cmpn_6acbea5674d88199858333c39636e2f8`**.
- Ad group: **ERP & Business Central | High Intent** — **`adgrp_b41d0dfd0d208199bdbd9b1022176d7a`**.
- Ad: **Business Central | ERP Integration** — **`ad_6acbea5e9fac81a290fde7fbf12e5ee7`**, export status `active`.
- Configured start timestamp: **October 11, 2026, 3:57:15 PM Eastern** (`2026-10-11T19:57:15Z` in the export).
- Title: **Business Central Integration**.
- Description: **Connect Business Central with CRM, inventory and operations. Book a free discovery call.**
- Saved ad destination: **https://optimion.us/solutions/erp-business-central**.

Saved campaign-level tracking parameters:

```text
utm_source=chatgpt&utm_medium=paid_ai&utm_campaign=erp_business_central&utm_content={ad_id}&campaign_id={campaign_id}&ad_group_id={ad_group_id}&ad_id={ad_id}
```

Exact ten saved context hints:

- Businesses seeking Microsoft Dynamics 365 Business Central integration consulting
- Teams connecting Business Central with CRM or ecommerce or warehouse systems
- Companies automating ERP sales-order and purchasing workflows
- Businesses synchronizing inventory across ERP and operational platforms
- Teams integrating Business Central through APIs and OData and custom endpoints
- Purchasing teams automating vendor updates with Power Automate
- Companies connecting ERP approvals and documents to Microsoft 365
- Teams assessing EDI provider interfaces and transaction mapping
- Businesses needing focused Business Central AL extensions
- Companies reducing manual ERP data entry and disconnected handoffs

### Business Automation — saved configuration

- Campaign: **Optimion | Business Automation | US** — **`cmpn_6acbea8f042c81a1849806884cd81090`**.
- Ad group: **Business Automation | High Intent** — **`adgrp_5af0fbc2853481a186d4332357e9d79c`**.
- Ad: **Business Automation | Custom Workflows** — **`ad_6acbea96430c819585062dbd8b7fff78`**, export status `active`.
- Configured start timestamp: **October 11, 2026, 3:58:40 PM Eastern** (`2026-10-11T19:58:40Z` in the export).
- Title: **Business Process Automation**.
- Description: **Automate approvals, documents and system handoffs with workflows built for your business.**
- Saved ad destination: **https://optimion.us/solutions/business-automation**.

Saved campaign-level tracking parameters:

```text
utm_source=chatgpt&utm_medium=paid_ai&utm_campaign=business_automation&utm_content={ad_id}&campaign_id={campaign_id}&ad_group_id={ad_group_id}&ad_id={ad_id}
```

Exact ten saved context hints:

- Businesses seeking workflow and process automation consulting
- Teams building Power Automate approval workflows
- Companies automating email and PDF document intake
- Teams automating routine notifications and follow-ups and escalations
- Businesses connecting applications through APIs and webhooks
- Companies replacing spreadsheet-driven operational handoffs
- Teams automating task creation and business-system updates
- Businesses using AI document extraction with human review
- Companies reducing repetitive back-office administration
- Teams needing workflow validation and retries and exception handling

The comma-free entries above were read back from the saved ad-group tables. Context hints guide conversational matching; they are not exact-match search keywords. See the official [ChatGPT Ads campaign targeting documentation](https://developers.openai.com/ads/campaign-targeting).

### Publication and validation evidence

Read-only campaign and ad exports independently confirm the saved IDs, budget/objective/goal fields, launch timestamps, creative text, active ad status, and base destination URLs:

- `C:/Users/ivan/Downloads/campaigns-for-edit.csv`
- `C:/Users/ivan/Downloads/ads-for-edit.csv`

Ignored local evidence copies are retained as `artifacts/funnel-validation/published-campaigns-for-edit-2026-10-11.csv` and `artifacts/funnel-validation/published-ads-for-edit-2026-10-11.csv`.

The authenticated UI verified campaign ON/Serving status, group switches, ten saved hints per group, bidding/location/AI-text settings, conversion-goal association, and the tracking-parameter templates. Local evidence screenshots are `artifacts/funnel-validation/ads-three-campaigns-serving.png` and `artifacts/funnel-validation/ads-three-published-creatives.png`. These local exports and screenshots are not embedded in the repository report.

Independent production checks returned **200** for all three destinations with matching service content, consultation CTAs, and noindex response headers. A read-only tracking review reconfirmed the test-mode guard, session deduplication, attribution preservation, and browser-only limits. The other three service campaigns remain unlaunched, and the original **Optimion campaign** remains OFF and unchanged.

The website continues to capture native inbound `oppref` where supplied and to preserve campaign context through the booking flow. Macro substitution, native click-reference propagation, genuine booking receipt, and attributed campaign performance require actual delivery evidence and are not inferred from a successful save.

### Follow-up validation record

- [x] All three publication results and exact campaign/ad-group/ad identifiers recorded. All three campaign switches are ON and the final campaign table shows Serving.
- [x] All three saved budgets are $25 average/day; potential $50/day each remains disclosed.
- [x] United States location, Clicks objective, Maximize Results bid strategy, only Discovery Call Booked conversion goal, and saved state verified for each.
- [x] Exact ad copy, ten context hints, base destination, and valid campaign tracking parameters recorded for each.
- [x] Other three service campaigns remain unlaunched; the broad Optimion campaign remains OFF.
- [x] Initial Automation-ad review status is distinguished from the latest campaign Serving status; no separate Automation-ad reevaluation or delivery totals are inferred.
- [x] All three production landing pages return 200 with the expected content, CTA, and noindex response header; tracking guard/deduplication/attribution review passed.
- [x] No genuine booking, paid-click propagation, or campaign performance result claimed without observed evidence.

Still unverified: a genuine completed-booking ingestion and an actual paid click's macro substitution/native `oppref` propagation. These are measurement limitations to observe during real delivery, not fabricated results or additional publication blockers.
