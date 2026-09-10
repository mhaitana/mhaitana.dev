import { expect, test } from "@playwright/test";

test("Worklog puts original tools first and reveals additional repositories by keyboard", async ({ page }) => {
  await page.goto("/github");
  const main = page.getByRole("main");
  await expect(main.locator("article:visible")).toHaveCount(3);
  await expect(main.locator("article:visible").first().getByRole("heading")).toHaveText("agentlens");
  const summary = main.locator("summary").filter({ hasText: "More public repositories" });
  const disclosure = summary.locator("..");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(disclosure).toHaveAttribute("open", "");
  await expect(disclosure.getByRole("link", { name: /View repository\s*:\s*headroom/ })).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(disclosure).not.toHaveAttribute("open", "");
  await expect(summary).toBeFocused();
});

test("Worklog groups repeated events and makes earlier activity optional", async ({ page }) => {
  await page.goto("/github");
  const earlier = page.locator("main summary").filter({ hasText: "View earlier activity" });
  const disclosure = earlier.locator("..");
  const activitySection = page.locator("section").filter({ has: page.getByRole("heading", { name: "Recent public work" }) });
  await expect(activitySection.locator("ol").first().locator("li")).toHaveCount(4);
  await expect(activitySection.locator("ol").first()).toContainText(/\d+ code pushes/);
  await expect(disclosure.locator("ol")).toBeHidden();
  await earlier.focus();
  await page.keyboard.press("Space");
  await expect(disclosure.locator("ol")).toBeVisible();
  await expect(earlier).toBeFocused();
});

test("Contribution history offers a mobile summary and one keyboard-accessible table", async ({ page }) => {
  await page.goto("/github");
  const figure = page.locator("main figure");
  await expect(figure.locator('[tabindex="0"]')).toHaveCount(0);
  await expect(figure.locator("svg")).toHaveAttribute("focusable", "false");
  const summary = figure.locator("summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(figure.getByRole("table")).toBeVisible();
  await expect(figure.getByRole("columnheader", { name: "Month", exact: true })).toBeVisible();
  await expect(figure.getByRole("columnheader", { name: "Active days", exact: true })).toBeVisible();
  await expect(figure.getByRole("rowheader", { name: /^Jul(?:y)? 2026$/ })).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(summary).not.toBeFocused();

  await page.setViewportSize({ width: 320, height: 850 });
  await expect(figure.locator("svg")).toBeHidden();
  await expect(figure.getByText("Latest six recorded months")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("Worklog disclosures and saved projects work without JavaScript or GitHub access", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 900 } });
  const page = await context.newPage();
  await page.route("https://**.github.com/**", (route) => route.abort());
  await page.goto("/github");
  await expect(page.getByRole("heading", { name: "Featured public projects", exact: true })).toBeVisible();
  await expect(page.getByText(/Snapshot saved/)).toBeVisible();
  const summary = page.locator("main figure summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("main figure").getByRole("table")).toBeVisible();
  await context.close();
});
