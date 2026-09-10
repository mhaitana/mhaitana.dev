import { expect, test } from "@playwright/test";

test("experience details announce the panel and follow keyboard toggles", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/about#experience");
  const role = page.locator("#experience-domain");
  const details = role.locator("details");
  const summary = details.locator("summary");
  const panel = role.locator("#experience-domain-details");
  await expect(role.getByRole("heading", { name: "Senior Software Engineer" })).toBeVisible();
  await expect(summary).toHaveAttribute("aria-controls", "experience-domain-details");
  await expect(summary).toHaveAttribute("aria-expanded", "false");
  await expect(panel).toBeHidden();
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(summary).toHaveAttribute("aria-expanded", "true");
  await expect(summary).toHaveAccessibleName("Hide details for Domain");
  await expect(panel).toBeVisible();
  await expect(panel.getByText(/Architected and maintained a multi-client GraphQL BFF/)).toBeVisible();
  await page.keyboard.press("Space");
  await expect(summary).toHaveAttribute("aria-expanded", "false");
  await expect(panel).toBeHidden();
  expect(errors).toEqual([]);
});

test("experience disclosure remains operable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 900 } });
  const page = await context.newPage();
  await page.goto("/about#experience");
  const details = page.locator("#experience-domain details");
  const summary = details.locator("summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(details).toHaveAttribute("open", "");
  await expect(summary).toHaveAccessibleName("Hide details for Domain");
  await expect(page.locator("#experience-domain-details")).toBeVisible();
  await page.keyboard.press("Space");
  await expect(details).not.toHaveAttribute("open", "");
  await context.close();
});
