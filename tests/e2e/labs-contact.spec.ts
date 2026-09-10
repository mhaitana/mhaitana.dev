import { expect, test } from "@playwright/test";

test.describe("Labs project filters", () => {
  test("keeps counts, pressed state, results and keyboard focus in sync", async ({ page }) => {
    await page.goto("/labs");
    const cards = page.locator("#lab-projects article");
    const results = page.getByRole("status");
    await expect(cards).toHaveCount(5);
    await expect(results).toHaveText("Showing all 5 projects.");

    for (const stage of [
      { name: "Live: 1 project", count: 1, message: "Showing 1 of 5 projects: live." },
      { name: "Alpha / waitlist: 2 projects", count: 2, message: "Showing 2 of 5 projects: alpha / waitlist." },
      { name: "In development: 2 projects", count: 2, message: "Showing 2 of 5 projects: in development." },
      { name: "All: 5 projects", count: 5, message: "Showing all 5 projects." },
    ]) {
      const control = page.getByRole("button", { name: stage.name, exact: true });
      await control.focus();
      await control.press("Enter");
      await expect(control).toHaveAttribute("aria-pressed", "true");
      await expect(control).toBeFocused();
      await expect(cards).toHaveCount(stage.count);
      await expect(results).toHaveText(stage.message);
      await expect(page.locator('[aria-label="Filter projects by stage"] [aria-pressed="true"]')).toHaveCount(1);
    }

    await page.getByRole("button", { name: "All: 5 projects", exact: true }).click();
    await expect(cards).toHaveCount(5);
    await expect(page.getByText("Case study coming soon", { exact: true })).toHaveCount(5);
    await expect(page.locator("#lab-projects a")).toHaveCount(0);
  });
});

test.describe("Contact email actions", () => {
  test("copies successfully, announces the result and retains focus on repeated use", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText: async (value: string) => { document.documentElement.dataset.copiedEmail = value; } },
      });
    });
    await page.goto("/contact");
    await expect(page.getByRole("link", { name: "Send an email", exact: true })).toHaveAttribute("href", "mailto:mhaitana@gmail.com");
    const button = page.getByRole("button", { name: "Copy email", exact: true });
    await button.focus();
    await button.press("Enter");
    await expect(page.getByRole("status")).toHaveText("Email copied to clipboard.");
    await expect(page.locator("html")).toHaveAttribute("data-copied-email", "mhaitana@gmail.com");
    const copiedButton = page.getByRole("button", { name: "Copied", exact: true });
    await expect(copiedButton).toBeFocused();
    await copiedButton.click();
    await expect(page.getByRole("status")).toHaveText("Email copied to clipboard.");
    await expect(page.getByRole("status")).toHaveCount(1);
    await expect(copiedButton).toBeFocused();
  });

  test("uses a fallback if clipboard permission is denied and restores the initiating focus", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText: async () => { throw new Error("Permission denied"); } },
      });
      document.execCommand = () => true;
    });
    await page.goto("/contact");
    await page.getByRole("button", { name: "Copy email", exact: true }).click();
    await expect(page.getByRole("status")).toHaveText("Email copied to clipboard.");
    await expect(page.getByRole("button", { name: "Copied", exact: true })).toBeFocused();
    await expect(page.locator("textarea")).toHaveCount(0);
  });

  test("offers a selectable address when both clipboard paths fail", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText: async () => { throw new Error("Permission denied"); } },
      });
      document.execCommand = () => false;
    });
    await page.goto("/contact");
    const copyButton = page.getByRole("button", { name: "Copy email", exact: true });
    await copyButton.click();
    await expect(page.getByRole("status")).toHaveText("Copy failed. Select the email below and copy it manually.");
    await expect(copyButton).toBeFocused();
    const manualAddress = page.getByRole("textbox", { name: "Email address to copy" });
    await expect(manualAddress).toHaveValue("mhaitana@gmail.com");
    await page.keyboard.press("Tab");
    await expect(manualAddress).toBeFocused();
    expect(await manualAddress.evaluate((field: HTMLInputElement) => [field.selectionStart, field.selectionEnd])).toEqual([0, "mhaitana@gmail.com".length]);
    await expect(page.locator("textarea")).toHaveCount(0);
  });
});

test.describe("Labs and Contact without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("shows every project and leaves the email link usable", async ({ page }) => {
    await page.goto("/labs");
    const cards = page.locator("#lab-projects article");
    await expect(cards).toHaveCount(5);
    for (const card of await cards.all()) await expect(card).toBeVisible();
    await expect(page.getByRole("button", { name: "All: 5 projects", exact: true })).toBeDisabled();
    await page.goto("/contact");
    await expect(page.getByRole("link", { name: "Send an email", exact: true })).toHaveAttribute("href", "mailto:mhaitana@gmail.com");
    await expect(page.getByRole("button", { name: "Copy email", exact: true })).toBeDisabled();
  });
});
