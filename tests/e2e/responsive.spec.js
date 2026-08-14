const { test, expect } = require("@playwright/test");

const viewports = [
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];

async function expectNoOverflow(page) {
  const metrics = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
    offenders: [...document.querySelectorAll("body *")]
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return { tag: element.tagName, id: element.id, className: String(element.className).slice(0, 120), left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) };
      })
      .filter((element) => element.right > window.innerWidth + 2 || element.left < -2)
      .slice(0, 12),
  }));
  expect(Math.max(metrics.document, metrics.body), JSON.stringify(metrics.offenders, null, 2)).toBeLessThanOrEqual(metrics.viewport + 1);
}

test("required mobile, tablet, and Windows desktop viewports remain usable", async ({ page }, testInfo) => {
  test.setTimeout(180_000);
  test.skip(testInfo.project.name !== "desktop-chromium", "Run the exact viewport matrix once in Chrome.");

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#work article")).toHaveCount(4);
    await expect(page.locator("#testimonials figure")).toHaveCount(6);
    await expect(page.locator("footer [data-footer-service]")).toHaveCount(7);
    await expect(page.getByRole("tablist", { name: "Technology categories" })).toBeVisible();
    await page.getByRole("tab", { name: "Integration & Workflow", exact: true }).click();
    const activeTechnologyPanel = page.locator("#technology [role='tabpanel']:not([hidden])");
    await expect(activeTechnologyPanel).toContainText("n8n");
    await expect(activeTechnologyPanel.locator("li")).toHaveCount(8);
    const minimumTileWidth = await activeTechnologyPanel.locator("li").evaluateAll((tiles) => Math.min(...tiles.map((tile) => tile.getBoundingClientRect().width)));
    expect(minimumTileWidth).toBeGreaterThan(120);
    await expectNoOverflow(page);
    await expect(page.locator("img")).toHaveCount(await page.locator("img").count());
    const brokenImages = await page.locator("img").evaluateAll((images) => images.filter((image) => image.complete && image.naturalWidth === 0).length);
    expect(brokenImages).toBe(0);
    await expect(page.locator("body")).not.toContainText("Ivan Hoffman");
    await expect(page.locator("a[href*='ivanhoffman.io']")).toHaveCount(0);

    if (viewport.width < 1024) {
      await page.getByRole("button", { name: "Open navigation menu" }).click();
      await page.getByRole("button", { name: "Services", exact: true }).click();
      await expect(page.locator("#mobile-services-menu a")).toHaveCount(8);
    } else {
      await page.getByRole("button", { name: "Services", exact: true }).click();
      await expect(page.locator("#desktop-services-menu a")).toHaveCount(8);
    }

    await page.goto("/services");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Engineering services");
    await expect(page.locator("main article")).toHaveCount(7);
    await expectNoOverflow(page);

    await page.goto("/work/ai-vendor-follow-up-automation");
    await expect(page.getByRole("heading", { level: 1, name: "AI Vendor Follow-Up Automation" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "The operational problem" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "The implemented architecture" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Book a Free Systems Consultation" })).toBeVisible();
    await expectNoOverflow(page);
  }
});
