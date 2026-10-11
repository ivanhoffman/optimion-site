const { test: base, expect } = require("@playwright/test");

const test = base.extend({
  page: async ({ page }, runPage) => {
    await page.route("**/*", (route) => {
      const hostname = new URL(route.request().url()).hostname;
      if (hostname === "127.0.0.1" || hostname === "localhost") return route.continue();
      return route.abort();
    });
    // Exercise the site's queues without creating localhost traffic in live accounts.
    await page.addInitScript(() => {
      window.dataLayer = [];
      window.__openAIEvents = [];
      window.oaiq = (...args) => window.__openAIEvents.push(args);
    });
    await page.route(/^https:\/\/([^/]+\.)?(googletagmanager\.com|google-analytics\.com|doubleclick\.net|googleadservices\.com|googlesyndication\.com|bzrcdn\.openai\.com|t\.openai\.com)(\/|$)/, (route) => route.fulfill({
      contentType: "application/javascript",
      body: "/* local regression: analytics network disabled */",
    }));
    // Individual booking-contract tests install a deterministic Cal fixture over this.
    await page.route(/^https:\/\/([^/]+\.)?cal\.com(\/|$)/, (route) => route.abort());
    await runPage(page);
  },
});

module.exports = { test, expect };
