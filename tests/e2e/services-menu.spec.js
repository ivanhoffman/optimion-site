const { test, expect } = require("./fixtures");

const desktopViewports = [
  { width: 1366, height: 599 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
];

test("desktop Services overlay is bounded, dismissible, and locks the page", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "Desktop overlay test runs once in Chrome.");
  test.setTimeout(90_000);

  for (const viewport of desktopViewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.evaluate(() => { document.body.scrollTop = 700; });
    expect(await page.evaluate(() => document.body.scrollTop)).toBe(700);

    const servicesButton = page.getByRole("button", { name: "Services", exact: true });
    const openServices = async () => {
      const buttonBounds = await servicesButton.boundingBox();
      await page.mouse.click(buttonBounds.x + buttonBounds.width / 2, buttonBounds.y + buttonBounds.height / 2);
    };
    await openServices();

    const dialog = page.getByRole("dialog", { name: "Services" });
    await expect(dialog).toBeVisible();
    const lockedScroll = await page.evaluate(() => document.body.scrollTop);
    await expect(page.getByRole("button", { name: "Close services menu", exact: true })).toBeVisible();
    await expect(servicesButton).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("body")).toHaveClass(/navigation-overlay-open/);

    const bounds = await dialog.boundingBox();
    expect(bounds.y).toBeGreaterThanOrEqual(64);
    expect(bounds.y + bounds.height).toBeLessThanOrEqual(viewport.height + 1);
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(viewport.width + 1);

    const clippedText = await dialog.locator("a span").evaluateAll((spans) => spans.filter((span) => span.scrollWidth > span.clientWidth + 1 || span.scrollHeight > span.clientHeight + 1).length);
    expect(clippedText).toBe(0);

    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(100);
    await expect.poll(() => page.evaluate(() => document.body.scrollTop)).toBe(lockedScroll);

    const menuScroller = dialog.locator(".overflow-y-auto");
    await menuScroller.evaluate((element) => { element.scrollTop = element.scrollHeight; });
    await expect(dialog.getByRole("link", { name: "View all services" })).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.body.scrollTop)).toBe(lockedScroll);

    await page.getByRole("button", { name: "Close services menu", exact: true }).click();
    await expect(dialog).toBeHidden();
    await expect(servicesButton).toBeFocused();
    await expect.poll(() => page.evaluate(() => document.body.scrollTop)).toBe(lockedScroll);

    await openServices();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    await openServices();
    await page.mouse.click(10, 100);
    await expect(dialog).toBeHidden();
  }
});
