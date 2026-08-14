export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://optimion.us").replace(/\/$/, "");
export const BOOKING_URL =
  "https://cal.com/optimion/30min?embed=true&theme=dark&backgroundColor=transparent&primaryColor=22d3ee&textColor=e5e7eb&layout=month_view";

export const CONTACT = {
  phone: "+1-954-543-0779",
  phoneDisplay: "(954) 543-0779",
  email: "hello@optimion.us",
};

export const SERVICE_SLUGS = [
  "business-systems-automation",
  "business-central-integration",
  "ai-automation",
  "power-bi-business-intelligence",
  "crm-automation",
  "api-integrations",
  "custom-business-software",
];

export const SERVICES = [
  {
    slug: "business-systems-automation",
    name: "Business Systems Automation",
    short: "Connect CRM, ERP, finance, inventory, reporting, and operations so information moves without duplicate entry.",
  },
  {
    slug: "business-central-integration",
    name: "Business Central Integration",
    short: "Automate Microsoft Dynamics 365 Business Central with APIs, Power Automate, Power BI, and AL extensions.",
  },
  {
    slug: "ai-automation",
    name: "AI & Workflow Automation",
    short: "Put document extraction, classification, routing, and structured AI inside real operational workflows.",
  },
  {
    slug: "power-bi-business-intelligence",
    name: "Power BI & Business Intelligence",
    short: "Build trustworthy operational dashboards for inventory, purchasing, profitability, fulfillment, and finance.",
  },
  {
    slug: "crm-automation",
    name: "CRM & Revenue Systems",
    short: "Design cleaner intake, routing, lifecycle automation, field mapping, integrations, and reporting across leading CRMs.",
  },
  {
    slug: "api-integrations",
    name: "Systems & API Integration",
    short: "Connect software through REST APIs, OAuth, webhooks, scheduled syncs, middleware, and custom connectors.",
  },
  {
    slug: "custom-business-software",
    name: "Custom Business Software",
    short: "Replace fragile spreadsheet processes with focused internal applications, portals, and workflow tools.",
  },
];

export const CASE_STUDIES = {
  vendorAutomation: {
    title: "AI Vendor Follow-Up Automation",
    summary:
      "A Power Automate workflow reads vendor emails and PDFs, extracts purchase-order details, matches Business Central records, and maintains SharePoint ETA cases.",
    impact:
      "Replaced daily manual vendor chasing with a consistent operational case trail and more reliable expected-receipt updates.",
    technologies: ["Power Automate", "Azure document extraction", "Business Central", "SharePoint", "AI extraction"],
    image: "/images/case-studies/ai-vendor-follow-up.png",
    imageAlt: "Sanitized Power Automate flow for vendor email and purchase-order follow-up",
    portfolioUrl: "https://ivanhoffman.io/projects/automations/ai-vendor-follow-up",
  },
  contractAutomation: {
    title: "AI Contract Analysis & Renewal Workflow",
    summary:
      "A document workflow extracts contract fields, creates structured SharePoint records, schedules renewal milestones, and sends email and Teams reminders.",
    impact:
      "Created repeatable ownership, reminder, and response tracking around contract renewal work that previously depended on manual review.",
    technologies: ["Power Automate", "Azure document extraction", "Structured AI", "SharePoint", "Teams"],
    image: "/images/case-studies/ai-contract-workflow.png",
    imageAlt: "Sanitized contract extraction and renewal reminder workflow",
    portfolioUrl: "https://ivanhoffman.io/projects/automations/ai-contract-analyze-reminders",
  },
  inventoryVelocity: {
    title: "Inventory Velocity Analytics",
    summary:
      "A Power BI model classifies fast-moving, slow-moving, and dead inventory using 90-day and 365-day movement windows.",
    impact:
      "Turned inventory intuition into an auditable view of SKU movement and working-capital concentration.",
    technologies: ["Power BI", "DAX", "Inventory data", "ERP modeling"],
    image: "/images/case-studies/inventory-velocity.png",
    imageAlt: "Sanitized Power BI inventory velocity dashboard",
    portfolioUrl: "https://ivanhoffman.io/projects/power-bi/inventory-velocity",
  },
  profitability: {
    title: "Invoice Profitability Analytics",
    summary:
      "A line-level Power BI model combines Business Central Value Entry COGS, vendor attribution, charges, and invoice details without double counting.",
    impact:
      "Produced a drillable and defensible invoice-to-item profitability view for operational review.",
    technologies: ["Power BI", "Business Central", "Power Query", "DAX"],
    image: "/images/case-studies/invoice-profitability.png",
    imageAlt: "Sanitized Power BI invoice profitability report",
    portfolioUrl: "https://ivanhoffman.io/projects/power-bi/invoice-profit",
  },
  businessCentralGuardrail: {
    title: "Business Central Purchasing Guardrail",
    summary:
      "An AL extension evaluates purchase-order lines during entry and warns when the resulting quantity would exceed an item's maximum inventory level.",
    impact:
      "Added a real-time operational guardrail while preserving the user's ability to proceed intentionally.",
    technologies: ["Dynamics 365 Business Central", "AL", "Purchasing", "Inventory"],
    image: "/images/case-studies/business-central-guardrail.png",
    imageAlt: "Business Central maximum inventory warning from a sanitized AL extension",
    portfolioUrl: "https://ivanhoffman.io/projects/business-central/max-stock-level-warning",
  },
  crmWorkflow: {
    title: "CRM Intake & Routing Automation",
    summary:
      "Zoho Bookings and Zoho Forms workflows map structured intake into CRM, preserve context, and assign the right owner automatically.",
    impact:
      "Removed manual handoffs between intake and follow-up while improving CRM record consistency.",
    technologies: ["Zoho Bookings", "Zoho Forms", "Zoho CRM", "Zoho Flow", "Workflow rules"],
    image: "/images/case-studies/crm-workflow.png",
    imageAlt: "Sanitized Zoho booking-to-CRM automation workflow",
    portfolioUrl: "https://ivanhoffman.io/projects/crm/zoho-bookings-workflow",
  },
};

const commonFaq = {
  existingSoftware: {
    question: "Can you work with the software we already use?",
    answer:
      "Yes. Optimion normally starts with the current stack, maps how information should move, and then uses native automation, APIs, middleware, or custom code to connect it. Replacing a platform is recommended only when the existing system cannot support the required process.",
  },
  noNativeIntegration: {
    question: "What if our software does not have a native integration?",
    answer:
      "We inspect its API, webhook, export, database, and authentication options. Depending on the system, we can build a custom connector, use scheduled synchronization, or create a controlled import/export workflow with logging and error handling.",
  },
};

export const SERVICE_PAGES = {
  "business-systems-automation": {
    eyebrow: "AI • Automation • ERP/CRM • Business Intelligence",
    h1: "Business Systems Automation & Integration",
    metaTitle: "Business Systems Automation & Integration | Optimion",
    description:
      "Connect CRM, ERP, finance, inventory and reporting with practical automation, API integrations, Power Automate, AI workflows and operational dashboards.",
    lead:
      "Connect your CRM, ERP, finance, reporting, and operations tools so data moves automatically and your team stops doing repetitive work by hand.",
    intro:
      "Optimion builds API integrations, Power Automate workflows, AI-enabled processes, and operational dashboards around the systems your business already uses.",
    categories: ["CRM", "ERP", "Accounting", "Inventory", "E-commerce", "Microsoft 365", "Reporting", "AI", "APIs"],
    problemsTitle: "Problems we automate",
    problems: [
      "Moving information manually between systems",
      "CRM and ERP synchronization",
      "Purchase-order and approval workflows",
      "Vendor and customer follow-up",
      "Invoice, email, and document processing",
      "Inventory and operational reporting",
      "Spreadsheet-driven back-office processes",
      "AI-assisted administrative work",
    ],
    systems: ["Business Central", "Power Automate", "Power BI", "Zoho", "HubSpot", "Salesforce", "Odoo", "QuickBooks", "Shopify", "SharePoint", "REST APIs", "Webhooks"],
    capabilities: [
      "Map the current process, system owners, handoffs, and exception paths",
      "Design reliable data movement with validation, retries, and traceability",
      "Automate repetitive approvals, notifications, document work, and updates",
      "Surface operational status through dashboards and structured records",
      "Roll out in focused stages without replacing the entire software stack",
    ],
    projectKeys: ["vendorAutomation", "inventoryVelocity", "crmWorkflow"],
    fit: ["Teams entering the same data into multiple applications", "Organizations with disconnected CRM, ERP, accounting, or inventory tools", "Operations still coordinated through shared spreadsheets and email", "Businesses seeking practical AI automation inside existing workflows"],
    faqs: [
      { question: "Can you connect our CRM and ERP?", answer: "Yes. We map the records and lifecycle events that must stay aligned, then implement the connection through supported APIs, webhooks, middleware, or a custom integration. The design includes duplicate handling, field ownership, validation, and failure reporting." },
      { question: "Can you replace spreadsheet-based business processes?", answer: "Yes. We first preserve the useful logic in the spreadsheet, then move the process into a controlled workflow, database, dashboard, or internal application with clearer ownership and fewer version conflicts." },
      commonFaq.existingSoftware,
      commonFaq.noNativeIntegration,
    ],
    related: ["ai-automation", "api-integrations", "custom-business-software"],
  },
  "business-central-integration": {
    eyebrow: "Microsoft ERP engineering",
    h1: "Microsoft Dynamics 365 Business Central Automation & Integration",
    metaTitle: "Business Central Automation & Integration | Optimion",
    description:
      "Business Central automation, APIs, Power Automate, Power BI, AL extensions, purchasing, inventory, sales-order and Microsoft 365 workflow integration.",
    lead:
      "Extend Business Central beyond core ERP transactions with reliable automations, operational guardrails, integrations, and decision-ready reporting.",
    intro:
      "Optimion works across Business Central APIs, custom endpoints, Power Automate, Power BI, AL extensions, SharePoint, Outlook, and Teams to improve the processes surrounding ERP data.",
    categories: ["Purchasing", "Inventory", "Sales orders", "Finance", "Power BI", "Power Automate", "AL", "Microsoft 365"],
    problemsTitle: "Business Central work we handle",
    problems: ["Purchase-order and vendor follow-up workflows", "Sales-order handoffs and customer statements", "Custom API endpoints and external system synchronization", "Inventory warnings and purchasing guardrails", "SharePoint and Microsoft 365 document workflows", "Power BI models using Business Central and Value Entry data", "Approval, notification, and exception processes", "Operational reporting across ERP entities"],
    systems: ["Dynamics 365 Business Central", "AL", "Power Automate", "Power BI", "DAX", "Power Query", "OData", "REST APIs", "SharePoint", "Outlook", "Teams", "Azure"],
    capabilities: ["Trace the operational process to the relevant Business Central entities", "Choose the right extension point: API, event, Power Automate, reporting model, or AL", "Keep guardrails separate from core posting logic where possible", "Validate data grain, permissions, error paths, and posting implications", "Document and hand off the solution for ongoing support"],
    projectKeys: ["vendorAutomation", "businessCentralGuardrail", "profitability"],
    fit: ["Business Central teams with manual work around purchasing, sales, finance, or inventory", "Organizations integrating Business Central with CRM, procurement, commerce, or Microsoft 365", "Operations that need custom controls without changing core posting behavior", "Management teams that need trustworthy ERP reporting"],
    faqs: [
      { question: "Can you automate Microsoft Dynamics 365 Business Central?", answer: "Yes. Depending on the process, we use standard APIs, custom endpoints, Power Automate, AL extensions, Power BI, or Microsoft 365 services. The implementation is selected around transaction risk, maintainability, and the required timing." },
      { question: "Can you automate purchase orders and vendor follow-up?", answer: "Yes. Work can include PO status tracking, vendor email intake, expected-receipt updates, approval routing, exception queues, and Power BI purchasing views." },
      { question: "Do you build Business Central AL extensions?", answer: "Yes. Verified work includes warning-only purchasing and sales-order guardrails. Extensions are designed around a focused business rule and tested so they do not unnecessarily interfere with core posting logic." },
      commonFaq.noNativeIntegration,
    ],
    related: ["business-systems-automation", "power-bi-business-intelligence", "api-integrations"],
  },
  "ai-automation": {
    eyebrow: "Practical AI inside real workflows",
    h1: "AI Automation for Business Processes",
    metaTitle: "AI Workflow Automation for Business Processes | Optimion",
    description:
      "Practical AI automation for business email, document extraction, vendor follow-up, contract analysis, task creation, classification and ERP/CRM workflows.",
    lead:
      "Use AI to read, classify, and structure business information—then move the result through a controlled workflow your team can review and trust.",
    intro:
      "Optimion integrates AI with Power Automate, ERP, CRM, SharePoint, Outlook, and Teams. The goal is a dependable operating process, not a novelty chatbot.",
    categories: ["Email", "Documents", "Extraction", "Classification", "ERP", "CRM", "SharePoint", "Teams", "Approvals"],
    problemsTitle: "AI processes we build",
    problems: ["Extracting structured data from incoming email and PDFs", "Matching document details to ERP or CRM records", "Contract analysis and renewal reminders", "Email-to-task and email-to-case processing", "Classification, routing, and exception handling", "Vendor follow-up and expected-date workflows", "Human review for low-confidence or sensitive decisions", "Structured AI output for downstream automation"],
    systems: ["Power Automate", "Azure AI document technologies", "OpenAI structured extraction", "Business Central", "SharePoint", "Outlook", "Teams", "CRM systems", "REST APIs"],
    capabilities: ["Define the exact fields, confidence thresholds, and review conditions", "Separate extraction from business-rule decisions and system updates", "Use structured outputs that downstream systems can validate", "Design exception queues, audit trails, and human approval points", "Monitor prompts, mappings, and workflow failures after launch"],
    projectKeys: ["vendorAutomation", "contractAutomation"],
    fit: ["Teams manually reading repeatable business documents", "Operations that receive high volumes of structured or semi-structured email", "Processes where AI output must update ERP, CRM, or SharePoint", "Businesses that need practical AI without replacing their current stack"],
    faqs: [
      { question: "Can AI process incoming emails and business documents?", answer: "Yes. A workflow can collect message text and attachments, extract defined fields, validate the result, route uncertain cases for review, and update the relevant ERP, CRM, SharePoint, or task system." },
      { question: "How do you keep AI automation reliable?", answer: "We constrain outputs to a defined schema, validate required fields, preserve source references, add confidence or exception rules, and keep a human approval step where an automated decision would create unacceptable risk." },
      { question: "Can AI work with Business Central or our CRM?", answer: "Yes. AI handles the unstructured input; APIs and workflow tools handle the controlled record lookup, matching, and update steps." },
      commonFaq.existingSoftware,
    ],
    related: ["business-systems-automation", "business-central-integration", "custom-business-software"],
  },
  "power-bi-business-intelligence": {
    eyebrow: "Operational analytics and data modeling",
    h1: "Power BI & Business Intelligence",
    metaTitle: "Power BI & Business Intelligence Consulting | Optimion",
    description:
      "Power BI dashboards and data models for Business Central, Odoo, inventory, purchasing, profitability, fulfillment, finance and operational KPIs.",
    lead:
      "Turn ERP and operational data into decision-ready dashboards with defensible measures, clear definitions, and drill-through to the business detail.",
    intro:
      "Optimion builds Power BI models for inventory, purchasing, profitability, fulfillment, finance, support operations, and management reporting using DAX, Power Query, and well-defined data grains.",
    categories: ["Inventory", "Purchasing", "Profitability", "Fulfillment", "Finance", "Support", "ERP data", "Management KPIs"],
    problemsTitle: "Reporting problems we solve",
    problems: ["Manually assembled weekly and monthly reports", "Conflicting KPI definitions across departments", "Inventory movement and working-capital visibility", "Purchase-order risk and vendor follow-up priority", "Invoice, item, vendor, and salesperson profitability", "Business Central and Odoo/PostgreSQL reporting", "Fulfillment and sales-order performance", "Row-level access and management reporting"],
    systems: ["Power BI", "DAX", "Power Query", "Business Central", "Odoo", "PostgreSQL", "OData", "ODBC", "Zendesk", "SharePoint"],
    capabilities: ["Define the business decision and grain before building visuals", "Model dimensions and facts so measures aggregate correctly", "Document KPI definitions and time-window logic", "Reconcile totals to the operational source", "Design focused dashboards, filters, drill-through, refresh, and access"],
    projectKeys: ["inventoryVelocity", "profitability"],
    fit: ["Leaders spending too much time assembling operational reports", "Teams that do not trust their current dashboards", "Business Central or Odoo users needing cross-functional reporting", "Organizations analyzing large item, invoice, order, or support datasets"],
    faqs: [
      { question: "Can you build Power BI dashboards from Business Central or Odoo?", answer: "Yes. Work includes source connection, Power Query shaping, dimensional modeling, DAX measures, reconciliation, refresh design, and the report experience. For Business Central, we also work with OData, APIs, and Value Entry data where needed." },
      { question: "Can you report on inventory and purchasing?", answer: "Yes. Verified work includes inventory velocity, top stocked items, purchase-order health, daily sales-order reporting, drop-ship fulfillment, and invoice profitability." },
      { question: "Do you support row-level security?", answer: "Yes, where the reporting audience and data model require it. Access rules are designed alongside the semantic model and tested with representative roles." },
      commonFaq.existingSoftware,
    ],
    related: ["business-central-integration", "business-systems-automation", "api-integrations"],
  },
  "crm-automation": {
    eyebrow: "CRM architecture, intake, and lifecycle workflows",
    h1: "CRM Automation & Integration",
    metaTitle: "CRM Automation & Integration | Optimion",
    description:
      "CRM automation and integration for Zoho, HubSpot, Salesforce and Pipedrive: intake, routing, field mapping, lifecycle workflows and system synchronization.",
    lead:
      "Build a CRM process that captures clean information, assigns ownership, advances work consistently, and connects with the rest of the business stack.",
    intro:
      "Optimion designs CRM intake, field mapping, routing, workflow rules, lifecycle automation, reporting, and CRM-to-ERP or accounting integrations without positioning the CRM as the entire operating system.",
    categories: ["Zoho", "HubSpot", "Salesforce", "Pipedrive", "Lead intake", "Routing", "Lifecycle", "Reporting", "Integration"],
    problemsTitle: "CRM problems we solve",
    problems: ["Inconsistent lead or customer intake", "Manual owner assignment and handoffs", "Booking and form data that never reaches CRM cleanly", "Duplicate or incomplete records", "Lifecycle stages that do not reflect the real process", "CRM data disconnected from ERP or accounting", "Follow-up rules that depend on individual memory", "Reporting that lacks reliable field definitions"],
    systems: ["Zoho CRM", "Zoho Bookings", "Zoho Forms", "Zoho Flow", "HubSpot", "Salesforce", "Pipedrive", "Power Automate", "REST APIs", "Webhooks"],
    capabilities: ["Map intake sources, field ownership, stages, and handoffs", "Standardize field and attachment mapping", "Automate routing, status changes, reminders, and notifications", "Connect CRM records with ERP, finance, booking, or support systems", "Test duplicate handling and report on workflow exceptions"],
    projectKeys: ["crmWorkflow"],
    fit: ["Sales or service teams manually sorting new inquiries", "Organizations with unreliable CRM data or unclear ownership", "Businesses connecting booking, forms, ERP, or accounting to CRM", "Teams needing lifecycle automation grounded in their actual process"],
    faqs: [
      { question: "Which CRM platforms do you work with?", answer: "Optimion has experience with Zoho CRM, HubSpot, Salesforce, and Pipedrive, as well as booking, form, email, and integration tools around those platforms." },
      { question: "Can you connect our CRM and ERP?", answer: "Yes. We define which system owns each field and business event, then design a synchronization pattern that handles mapping, duplicates, errors, and timing." },
      { question: "Can you automate CRM lead routing and follow-up?", answer: "Yes. Verified work includes booking-to-CRM intake, form mapping, owner assignment, lead-status workflows, notifications, and follow-up automation." },
      commonFaq.noNativeIntegration,
    ],
    related: ["business-systems-automation", "api-integrations", "ai-automation"],
  },
  "api-integrations": {
    eyebrow: "Custom connections when native integrations fall short",
    h1: "API & Systems Integration",
    metaTitle: "API & Systems Integration Services | Optimion",
    description:
      "Connect business software with REST APIs, OAuth, webhooks, custom connectors, scheduled synchronization, Power Automate, Make, Zapier and n8n.",
    lead:
      "Connect software that does not communicate through reliable APIs, webhooks, middleware, scheduled synchronization, and custom integration logic.",
    intro:
      "Optimion handles the mapping, authentication, duplicate behavior, retries, logging, and operational ownership required to make integrations dependable after the happy-path demo.",
    categories: ["REST APIs", "OAuth", "Webhooks", "Scheduled sync", "Power Automate", "Make", "Zapier", "n8n", "Custom connectors"],
    problemsTitle: "Integration work we handle",
    problems: ["CRM, ERP, accounting, and commerce synchronization", "Systems with APIs but no useful native connector", "Event-driven updates through webhooks", "Scheduled imports, exports, and reconciliations", "OAuth and token lifecycle implementation", "Field transformation and identifier mapping", "Duplicate detection and idempotent updates", "Retries, logging, alerts, and exception queues"],
    systems: ["REST APIs", "Webhooks", "OAuth", "Power Automate", "Make", "Zapier", "n8n", "Zoho Flow", "Business Central APIs", "Custom middleware"],
    capabilities: ["Document source and destination objects, identifiers, and field ownership", "Choose event-driven, scheduled, or hybrid synchronization", "Implement authentication without exposing credentials to the client", "Make writes idempotent and failures observable", "Test rate limits, retries, partial failures, and reconciliation"],
    projectKeys: ["vendorAutomation", "crmWorkflow"],
    fit: ["Businesses whose systems do not have a suitable native connector", "Teams moving information through CSV files or copy-and-paste", "Organizations needing custom Business Central, CRM, or commerce connections", "Workflows that require predictable error handling and auditability"],
    faqs: [
      commonFaq.noNativeIntegration,
      { question: "Do you work with webhooks and OAuth?", answer: "Yes. Integrations can use webhook-driven events, OAuth authorization flows, token refresh, signed requests, and scheduled polling depending on the platform's supported model." },
      { question: "How do you prevent duplicate records?", answer: "We define stable external identifiers, use idempotent create-or-update patterns, persist mapping keys when needed, and test retry behavior so the same event does not create repeated records." },
      { question: "Can you use Power Automate, Make, Zapier, or n8n?", answer: "Yes. The choice depends on the systems, required control, expected volume, internal ownership, and error-handling needs. Custom code is used when a workflow tool cannot meet those requirements cleanly." },
    ],
    related: ["business-systems-automation", "business-central-integration", "crm-automation"],
  },
  "custom-business-software": {
    eyebrow: "Focused tools for the way your operation actually works",
    h1: "Custom Business Software",
    metaTitle: "Custom Internal Business Software | Optimion",
    description:
      "Custom internal business applications, portals, administrative tools and AI-enabled workflows that replace fragile spreadsheet and email processes.",
    lead:
      "Build the focused internal application your process needs—without forcing the whole business into an oversized replacement platform.",
    intro:
      "Optimion creates portals, administrative systems, workflow applications, and AI-enabled operational software that sit cleanly around existing ERP, CRM, accounting, and data platforms.",
    categories: ["Internal apps", "Portals", "Admin tools", "Workflow software", "Approvals", "Dashboards", "AI-enabled tools", "APIs"],
    problemsTitle: "When custom software makes sense",
    problems: ["A critical process lives in a fragile shared spreadsheet", "Teams coordinate status through long email threads", "Existing systems hold the data but not the operational workflow", "Staff need a simpler role-specific interface", "A portal must combine data from several systems", "Approval and exception rules are unique to the business", "AI extraction needs a controlled review screen", "Off-the-shelf tools add complexity without fitting the process"],
    systems: ["Web applications", "Internal portals", "PostgreSQL", "REST APIs", "Business Central", "CRM platforms", "Microsoft 365", "Power BI", "Authentication", "Workflow engines"],
    capabilities: ["Define the smallest application that resolves the operational bottleneck", "Design roles, permissions, records, states, and exception paths", "Connect the application to systems of record through supported interfaces", "Build accessible, responsive interfaces for daily use", "Deploy with logging, documentation, and a practical ownership model"],
    projectKeys: ["contractAutomation", "inventoryVelocity"],
    fit: ["Businesses outgrowing spreadsheet-driven operations", "Teams needing a portal across several systems", "Processes that require unique rules, approvals, or review queues", "Organizations that want to add AI without losing human oversight"],
    faqs: [
      { question: "Do you build custom internal business applications?", answer: "Yes. The focus is operational software such as administrative tools, portals, workflow applications, approval queues, and role-specific interfaces connected to existing systems." },
      { question: "Can you replace a spreadsheet-based workflow?", answer: "Yes. We identify the real data model, rules, ownership, and reports behind the spreadsheet, then build the smallest controlled application that preserves what works and removes the fragile parts." },
      { question: "Will the application connect to our ERP or CRM?", answer: "Yes, where the platform exposes a supported API, webhook, database, or controlled file interface. The application can leave the ERP or CRM as the system of record while providing a better operational experience." },
      commonFaq.existingSoftware,
    ],
    related: ["business-systems-automation", "api-integrations", "ai-automation"],
  },
};

export function servicePath(slug) {
  return `/services/${slug}`;
}

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
