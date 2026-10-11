const { test, expect } = require("./fixtures");

const solutions = [
  ["zoho-crm", "Get More From Zoho CRM", ["Zoho Flow", "Zoho Books", "Zoho Inventory", "Zoho Creator"]],
  ["crm-integration", "Make Your CRM Work Better", ["HubSpot", "Zoho", "lead routing"]],
  ["erp-business-central", "Connect Your ERP Systems", ["Business Central", "EDI", "Power Automate"]],
  ["business-automation", "Automate Repetitive Work", ["Power Automate", "approvals", "document"]],
  ["power-bi", "Turn Your Data Into Answers", ["Power BI", "Excel", "KPI"]],
  ["ecommerce-integration", "Connect Shopify to Your Systems", ["Shopify", "QuickBooks", "WMS"]],
];

const publicPaths = [
  "/", "/services", "/privacy", "/terms",
  "/services/business-systems-automation",
  "/services/business-central-integration",
  "/services/ai-automation",
  "/services/power-bi-business-intelligence",
  "/services/crm-automation",
  "/services/api-integrations",
  "/services/custom-business-software",
];

for (const [slug, heading, technologies] of solutions) {
  test(`hidden landing page ${slug} is direct-accessible, focused, and responsive`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(`/solutions/${slug}`);
    expect(response.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('meta[name="googlebot"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://optimion.us/solutions/${slug}`);

    for (const technology of technologies) {
      await expect(page.locator("main")).toContainText(new RegExp(technology, "i"));
    }
    await expect(page.locator("main")).toContainText("Tell us what systems you use and what's not working.");
    await expect(page.locator('header a[href^="/solutions"], footer a[href^="/solutions"]')).toHaveCount(0);
    await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toHaveCount(0);
    await expect(page.locator('#work, a[href="/work"], a[href^="/work/"]')).toHaveCount(0);

    const primaryCta = page.locator("main button[data-evt='cta_click']").first();
    await expect(primaryCta).toBeVisible();
    await expect(primaryCta).toHaveAccessibleName(/Book.*(Discovery Call|Consultation)/i);
    const buttonBounds = await primaryCta.boundingBox();
    expect(buttonBounds.height).toBeGreaterThanOrEqual(44);
    expect(buttonBounds.x).toBeGreaterThanOrEqual(0);
    expect(buttonBounds.x + buttonBounds.width).toBeLessThanOrEqual(page.viewportSize().width + 1);

    const overflow = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));
    expect(Math.max(overflow.document, overflow.body)).toBeLessThanOrEqual(overflow.viewport + 1);
    const brokenImages = await page.locator("img").evaluateAll((images) => images.filter((image) => image.complete && image.naturalWidth === 0).length);
    expect(brokenImages).toBe(0);
    expect(errors).toEqual([]);
  });
}

test("paid landing pages have no links from any public page or public indexes", async ({ page, request }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "The same public navigation is checked once.");
  test.setTimeout(120_000);
  for (const path of publicPaths) {
    await page.goto(path);
    const exposedLinks = await page.locator("a[href]").evaluateAll((links) => links
      .map((link) => link.getAttribute("href"))
      .filter((href) => {
        try { return new URL(href, window.location.origin).pathname.startsWith("/solutions"); }
        catch { return false; }
      }));
    expect(exposedLinks, `Paid-page links exposed at ${path}`).toEqual([]);
  }
  for (const path of ["/sitemap.xml", "/llms.txt"]) {
    const response = await request.get(path);
    expect(response.ok()).toBeTruthy();
    expect(await response.text()).not.toContain("/solutions");
  }
  const response = await request.get("/robots.txt");
  expect(await response.text()).not.toMatch(/Disallow:\s*\/solutions/i);
});

test("the paid-page namespace is not a public service index", async ({ request }) => {
  expect((await request.get("/solutions")).status()).toBe(404);
  expect((await request.get("/solutions/not-a-service")).status()).toBe(404);
});
