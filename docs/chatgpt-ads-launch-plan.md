# ChatGPT Ads launch plan

Internal planning document. Do not publish this file through the website.

Last reviewed: August 13, 2026

## Current official guidance used

- [Ads in ChatGPT: The Basics](https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics)
- [Create Campaigns for ChatGPT Ads](https://help.openai.com/en/articles/20001210-create-campaigns-for-chatgpt)
- [Create Ad Groups for ChatGPT Ads](https://help.openai.com/en/articles/20001211)
- [Create Ads for ChatGPT Ads](https://help.openai.com/en/articles/20001212-create-ads-and-creative-variations)
- [Advertiser Guidance for Allowing OpenAI Web Crawlers](https://help.openai.com/en/articles/20001243-advertiser-guidance-for-allowing-openai-web-crawlers)
- [Conversion Measurement](https://help.openai.com/en/articles/20001409-conversion-measurement)
- [Measurement Pixel](https://developers.openai.com/ads/measurement-pixel)
- [Conversions API](https://developers.openai.com/ads/conversions-api)
- [Supported Events](https://developers.openai.com/ads/supported-events)

OpenAI currently treats context hints as thematic relevance signals, not exact-match keywords. Landing-page content, ad title, ad copy, creative, context hints, and conversational intent all contribute to relevance. OAI-AdsBot must be allowed; OpenAI recommends allowing OAI-SearchBot as well.

## Initial $100 test

Do not divide the first $100 across six unrelated campaigns. Start with one CPC campaign and one focused ad group:

- Campaign: `US | Business Systems Automation | CPC | Test 01`
- Ad group: `Business Systems Automation`
- Landing page: `https://optimion.us/services/business-systems-automation`
- Budget: one four-day test at the current documented US minimum of $25/day, subject to the live Ads Manager requirement at launch
- Primary conversion: `appointment_scheduled` when Cal.com reports a completed booking
- Secondary signals in GA4/GTM: `cal_open`, `cta_click`, `contact_click`, engaged landing-page view
- Creative strategy: run genuinely different angles rather than small wording changes

Keep static UTM parameters on every destination URL. OpenAI's `oppref` click reference must remain in the landing-page URL; the optional OpenAI Pixel automatically captures it when a real Pixel ID is configured.

## Shared UTM structure

`utm_source=chatgpt&utm_medium=paid&utm_campaign=<campaign>&utm_content=<creative_id>`

Recommended campaign values:

- `business_systems_automation`
- `business_central_integration`
- `ai_workflow_automation`
- `power_bi_business_intelligence`
- `crm_automation_integration`
- `api_systems_integration`

Use stable creative IDs such as `manual_entry_v1`, `connected_stack_v1`, `erp_ops_v1`, or `visibility_v1`. Do not use unsupported dynamic UTM macros.

## Ad group 1 — Business Systems Automation

**Commercial intent:** A business has several operational systems, repeated manual handoffs, or spreadsheet-driven back-office work and is actively looking for an automation company or systems integrator.

**Landing page:** `https://optimion.us/services/business-systems-automation`

**Context hints:**

- company to automate business systems
- employees entering the same information into multiple applications
- disconnected CRM ERP and accounting software
- replace spreadsheet-driven back-office workflows
- automate purchase-order and approval processes
- connect existing business software instead of replacing it
- reduce repetitive administrative work
- operations systems that do not communicate
- practical AI automation for business processes
- Power Automate consultant for operational workflows
- integrate inventory finance sales and reporting systems
- automate data movement between departments

**Headline concepts:**

1. `Connect Your Business Tools` — disconnected-stack angle
2. `Stop Duplicate Data Entry` — manual-work angle
3. `Automate Back-Office Work` — operations angle
4. `Build One Connected System` — operating-system angle

**Description concepts:**

1. `Connect CRM, ERP, finance, and reporting.`
2. `Replace repetitive handoffs with reliable workflows.`
3. `Add AI and automation around tools you already use.`
4. `Map your bottleneck with a systems engineer.`

**Suggested URL:** `https://optimion.us/services/business-systems-automation?utm_source=chatgpt&utm_medium=paid&utm_campaign=business_systems_automation&utm_content=<creative_id>`

**Primary conversion:** `appointment_scheduled`

**Secondary conversion:** consultation CTA / `cal_open`

## Ad group 2 — Business Central Automation & Integration

**Commercial intent:** A Microsoft Dynamics 365 Business Central user needs ERP automation, integration, reporting, Power Automate work, or a focused AL extension.

**Landing page:** `https://optimion.us/services/business-central-integration`

**Context hints:**

- Microsoft Dynamics 365 Business Central automation consultant
- connect Business Central to another business system
- automate Business Central purchase orders
- Power Automate workflow using Business Central
- Business Central API and custom endpoint integration
- AL extension for an operational warning or guardrail
- Business Central inventory and purchasing reporting
- Power BI dashboards using Business Central data
- automate vendor follow-up from purchase orders
- Business Central sales-order workflow integration
- connect Business Central and SharePoint or Teams
- improve Business Central operational processes without replacing ERP

**Headline concepts:**

1. `Automate Business Central` — direct platform intent
2. `Connect Business Central` — integration angle
3. `Extend ERP Operations` — process-extension angle
4. `Business Central + Power BI` — reporting angle

**Description concepts:**

1. `APIs, Power Automate, AL, and Power BI expertise.`
2. `Improve purchasing, inventory, and sales workflows.`
3. `Add focused ERP guardrails without replacing core logic.`
4. `Connect Business Central with Microsoft 365 and more.`

**Suggested URL:** `https://optimion.us/services/business-central-integration?utm_source=chatgpt&utm_medium=paid&utm_campaign=business_central_integration&utm_content=<creative_id>`

**Primary conversion:** `appointment_scheduled`

**Secondary conversion:** consultation CTA / `cal_open`

## Ad group 3 — AI Workflow Automation

**Commercial intent:** A business wants AI to process real email, document, contract, vendor, or task workflows with system updates and human oversight.

**Landing page:** `https://optimion.us/services/ai-automation`

**Context hints:**

- AI process automation for business documents
- extract structured data from incoming emails and PDFs
- AI vendor follow-up workflow
- AI contract analysis and renewal reminders
- connect AI extraction to ERP or CRM
- automate email-to-task or email-to-case processing
- Power Automate workflow with AI document extraction
- AI classification and routing for back-office work
- human review workflow for low-confidence AI results
- practical AI automation using existing business systems
- structured AI output for SharePoint and Teams workflows
- automate repetitive document review without a chatbot

**Headline concepts:**

1. `Put AI Inside Workflows` — embedded-AI angle
2. `Automate Document Intake` — document angle
3. `Turn Email Into Action` — email-processing angle
4. `Practical AI for Operations` — anti-novelty angle

**Description concepts:**

1. `Extract, validate, route, and update business systems.`
2. `Connect AI with ERP, CRM, SharePoint, and Teams.`
3. `Build controlled workflows with human review paths.`
4. `Automate contracts, vendor emails, and task intake.`

**Suggested URL:** `https://optimion.us/services/ai-automation?utm_source=chatgpt&utm_medium=paid&utm_campaign=ai_workflow_automation&utm_content=<creative_id>`

**Primary conversion:** `appointment_scheduled`

**Secondary conversion:** consultation CTA / `cal_open`

## Ad group 4 — Power BI / Business Intelligence

**Commercial intent:** A team needs trustworthy operational dashboards or data models for ERP, inventory, purchasing, profitability, fulfillment, finance, or support.

**Landing page:** `https://optimion.us/services/power-bi-business-intelligence`

**Context hints:**

- Power BI consultant for operational dashboards
- Power BI reporting from Business Central
- Power BI reporting from Odoo or PostgreSQL
- inventory velocity and dead stock analytics
- purchase-order health and vendor performance dashboard
- invoice profitability model using ERP data
- management KPI reporting with trusted definitions
- replace manually assembled operational reports
- Power BI DAX and Power Query data modeling
- fulfillment and sales-order performance reporting
- row-level security for management reporting
- reconcile dashboard measures to ERP source data

**Headline concepts:**

1. `Trust Your Power BI Data` — reliability angle
2. `See Inventory Clearly` — inventory angle
3. `Model Real Profitability` — profitability angle
4. `Replace Manual Reports` — reporting-effort angle

**Description concepts:**

1. `Build defensible models from ERP and operations data.`
2. `See inventory, purchasing, profit, and fulfillment.`
3. `DAX, Power Query, reconciliation, and clear KPI logic.`
4. `Turn recurring spreadsheets into managed dashboards.`

**Suggested URL:** `https://optimion.us/services/power-bi-business-intelligence?utm_source=chatgpt&utm_medium=paid&utm_campaign=power_bi_business_intelligence&utm_content=<creative_id>`

**Primary conversion:** `appointment_scheduled`

**Secondary conversion:** consultation CTA / `cal_open`

## Ad group 5 — CRM Automation & Integration

**Commercial intent:** A business has unreliable CRM intake, manual routing, disconnected booking/forms, inconsistent lifecycle work, or a CRM that must connect with ERP/accounting.

**Landing page:** `https://optimion.us/services/crm-automation`

**Context hints:**

- CRM automation consultant for Zoho HubSpot Salesforce or Pipedrive
- automate lead intake and owner assignment
- connect booking forms to CRM records
- map form attachments and fields into CRM
- integrate CRM with ERP or accounting system
- automate CRM lifecycle stages and reminders
- fix duplicate and incomplete CRM records
- connect Zoho Bookings and Zoho CRM
- automate lead routing based on source or territory
- design reliable CRM field mapping and workflow rules
- CRM reporting with consistent stage definitions
- improve CRM operations without a marketing agency

**Headline concepts:**

1. `Clean Up CRM Handoffs` — ownership angle
2. `Route Every Lead Clearly` — routing angle
3. `Connect CRM With ERP` — systems angle
4. `Build a Reliable CRM Flow` — process angle

**Description concepts:**

1. `Automate intake, mapping, ownership, and lifecycle work.`
2. `Connect booking, forms, ERP, and accounting to CRM.`
3. `Reduce incomplete records and manual assignment.`
4. `Design CRM workflows around your real sales process.`

**Suggested URL:** `https://optimion.us/services/crm-automation?utm_source=chatgpt&utm_medium=paid&utm_campaign=crm_automation_integration&utm_content=<creative_id>`

**Primary conversion:** `appointment_scheduled`

**Secondary conversion:** consultation CTA / `cal_open`

## Ad group 6 — API / Systems Integration

**Commercial intent:** Two or more business applications need a dependable custom connection because native connectors are absent or inadequate.

**Landing page:** `https://optimion.us/services/api-integrations`

**Context hints:**

- custom API integration company for business software
- connect systems without a native integration
- REST API and webhook integration consultant
- OAuth integration and token refresh implementation
- scheduled synchronization between business applications
- connect CRM ERP accounting and commerce software
- Power Automate custom connector development
- Make Zapier or n8n integration with error handling
- prevent duplicate records during system synchronization
- add retries logging and alerts to an integration
- map fields and identifiers between software platforms
- replace CSV exports and manual imports with an API

**Headline concepts:**

1. `Connect Software by API` — direct technical angle
2. `No Native Integration?` — gap angle
3. `Make System Sync Reliable` — reliability angle
4. `Replace Manual Imports` — operational angle

**Description concepts:**

1. `REST, OAuth, webhooks, mapping, retries, and logging.`
2. `Build the connection your native apps do not provide.`
3. `Synchronize records without duplicate writes.`
4. `Replace CSV handoffs with controlled data movement.`

**Suggested URL:** `https://optimion.us/services/api-integrations?utm_source=chatgpt&utm_medium=paid&utm_campaign=api_systems_integration&utm_content=<creative_id>`

**Primary conversion:** `appointment_scheduled`

**Secondary conversion:** consultation CTA / `cal_open`

## Measurement implementation status

Existing and preserved:

- Google Tag Manager container initialization
- GA/GTM event bridge
- `cta_click`
- `cal_open`, `cal_loaded`, and `cal_close`
- Cal.com completion detection with `booked_consult` and `cal_booking_success`
- `contact_click` for phone and email
- SPA page-view events

Prepared but intentionally inactive:

- `Components/OpenAIAdsPixel.js` loads the official browser SDK only when `NEXT_PUBLIC_OPENAI_ADS_PIXEL_ID` exists.
- Initial and client-side route page views use the standard `page_viewed` event.
- A successful Cal.com booking maps to the standard `appointment_scheduled` event.
- The pixel captures `oppref` automatically and stores it in its first-party attribution cookie according to the current official documentation.

External setup still required:

1. Create the web data source in OpenAI Ads Manager.
2. Add the real Pixel ID to Vercel as `NEXT_PUBLIC_OPENAI_ADS_PIXEL_ID` for Preview and Production.
3. Review consent requirements before enabling the data source. The site currently has no dedicated consent-management platform.
4. Configure `appointment_scheduled` as the primary campaign conversion.
5. Test the Pixel in debug mode from Ads Manager before launch.
6. If server-side Conversions API measurement is added later, provision the API key in Ads Manager, store it only as a server-side secret, and reuse one event ID between browser and server events for deduplication.

Do not send raw personal information to a browser event. Do not expose a Conversions API key in client code.

