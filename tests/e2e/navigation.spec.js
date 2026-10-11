const { test, expect } = require("./fixtures");

const services = [
  ["business-systems-automation", "Business Systems Automation & Integration"],
  ["business-central-integration", "Microsoft Dynamics 365 Business Central Automation & Integration"],
  ["ai-automation", "AI Automation for Business Processes"],
  ["power-bi-business-intelligence", "Power BI & Business Intelligence"],
  ["crm-automation", "CRM Automation & Integration"],
  ["api-integrations", "API & Systems Integration"],
  ["custom-business-software", "Custom Business Software"],
];

const removedCaseStudyRoutes = [
  "/work",
  "ai-vendor-follow-up-automation",
  "ai-contract-analysis",
  "inventory-velocity-analytics",
  "invoice-profitability-analytics",
  "business-central-purchasing-guardrail",
  "crm-intake-routing-automation",
].map((path) => path.startsWith("/") ? path : `/work/${path}`);

async function expectPageAtTop(page) {
  await expect.poll(async () => page.evaluate(() => ({
    windowY: window.scrollY,
    bodyY: document.body.scrollTop,
    documentY: document.documentElement.scrollTop,
  }))).toEqual({ windowY: 0, bodyY: 0, documentY: 0 });
}

test("A — every footer service navigates to its page and restores the top", async ({ page }) => {
  for (const [slug, heading] of services) {
    await page.goto("/");
    await page.evaluate(() => {
      document.body.scrollTop = document.body.scrollHeight;
      window.scrollTo(0, document.documentElement.scrollHeight);
    });
    await page.locator(`footer [data-footer-service="${slug}"]`).click();
    await expect(page).toHaveURL(new RegExp(`/services/${slug}$`));
    await expect(page.getByRole("heading", { level: 1, name: heading, exact: true })).toBeVisible();
    await expectPageAtTop(page);
    await expect(page.locator("[data-work-filter][aria-selected='true']")).toHaveCount(0);
  }
});

test("B — every homepage service card opens its dedicated route", async ({ page }) => {
  for (const [slug, heading] of services) {
    await page.goto("/");
    await page.locator(`#services a[href="/services/${slug}"]`).first().click();
    await expect(page).toHaveURL(new RegExp(`/services/${slug}$`));
    await expect(page.getByRole("heading", { level: 1, name: heading, exact: true })).toBeVisible();
    await expectPageAtTop(page);
  }
});

test("C — the services overview links to all seven service routes", async ({ page }) => {
  for (const [slug, heading] of services) {
    await page.goto("/services");
    await page.locator(`main a[href="/services/${slug}"]`).first().click();
    await expect(page).toHaveURL(new RegExp(`/services/${slug}$`));
    await expect(page.getByRole("heading", { level: 1, name: heading, exact: true })).toBeVisible();
    await expectPageAtTop(page);
  }
});

test("D — service breadcrumbs use Home → Services → Current Service", async ({ page }) => {
  for (const [slug, heading] of services) {
    await page.goto(`/services/${slug}`);
    const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(breadcrumb.getByRole("link", { name: "Home", exact: true })).toHaveAttribute("href", "/");
    await expect(breadcrumb.getByRole("link", { name: "Services", exact: true })).toHaveAttribute("href", "/services");
    await expect(breadcrumb).toContainText(heading);
    await breadcrumb.getByRole("link", { name: "Services", exact: true }).click();
    await expect(page).toHaveURL(/\/services$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Engineering services");
  }
});

test("E — selected work and case studies are completely removed", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#work")).toHaveCount(0);
  await expect(page.locator('a[href="/work"], a[href^="/work/"]')).toHaveCount(0);
  await expect(page.locator("body")).not.toContainText(/selected work|case stud/i);

  for (const route of removedCaseStudyRoutes) {
    const response = await page.goto(route);
    expect(response.status(), route).toBe(404);
  }
});
