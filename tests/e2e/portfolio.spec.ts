import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/about", "/github", "/labs", "/contact", "/resume"];

for (const theme of ["light", "dark"]) {
  for (const route of routes) {
    test(`${route} ${theme}: accessible, visible and responsive`, async ({ page }) => {
      test.slow(); // Eight viewport captures and two full accessibility scans.
      await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(route);
      await expect(page.locator("html")).toHaveClass(new RegExp(theme));
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.getByRole("main")).toHaveCount(1);
      for (const width of [320, 375, 430, 768, 1024, 1280, 1440, 1920]) {
        await page.setViewportSize({ width, height: 1000 });
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}px`).toBe(true);
        expect(await page.locator("main").evaluate((main) => [...main.querySelectorAll("h1,h2,h3,p,article")].filter((element) => {
          if (element.closest("details:not([open])") && !element.closest("summary")) return false;
          let node: Element | null = element;
          while (node && node !== main) {
            const style = getComputedStyle(node);
            if (style.opacity === "0") return true;
            node = node.parentElement;
          }
          return false;
        }).length), "Content hidden by opacity").toBe(0);
        if ([375, 768, 1280, 1440, 1920].includes(width)) {
          await page.screenshot({ path: `artifacts/ui-review/after-${route.slice(1) || "home"}-${width}-${theme}.png`, fullPage: true, animations: "disabled" });
        }
      }
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      expect(results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual([]);
      await page.setViewportSize({ width: 375, height: 900 });
      await page.getByRole("navigation", { name: "Main navigation" }).locator("summary").click();
      const mobileResults = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      expect(mobileResults.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
}

for (const route of routes) {
  test(`${route} works without JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 900 } });
    const page = await context.newPage();
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    await page.getByRole("navigation", { name: "Main navigation" }).locator("summary").click();
    await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Résumé" })).toBeVisible();
    expect(await page.locator("main [style]").evaluateAll((elements) => elements.filter((element) => getComputedStyle(element).opacity === "0").length)).toBe(0);
    if (route === "/labs") await expect(page.locator("main article")).toHaveCount(5);
    if (route === "/about") {
      const disclosure = page.locator("main details").first();
      await disclosure.locator("summary").click();
      await expect(disclosure).toHaveAttribute("open", "");
    }
    await context.close();
  });
}

test("header/footer routes, skip link, anchors and browser history", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  for (const route of routes.slice(1)) {
    await page.getByRole("navigation", { name: "Main navigation" }).locator(`a[href="${route}"]:visible`).click();
    await expect(page).toHaveURL(new RegExp(`${route}$`));
    await expect(page.getByRole("navigation", { name: "Main navigation" }).locator('[aria-current="page"]:visible')).toHaveAttribute("href", route);
  }
  await page.goBack(); await expect(page).toHaveURL(/\/contact$/);
  await page.goForward(); await expect(page).toHaveURL(/\/resume$/);
  for (const route of routes) {
    await page.getByRole("navigation", { name: "Footer navigation" }).locator(`a[href="${route}"]:visible`).click();
    await expect(page.locator("h1")).toBeVisible();
  }
  await page.getByRole("navigation", { name: "Footer navigation" }).getByRole("link", { name: "Experience", exact: true }).click();
  await expect(page).toHaveURL(/\/about#experience$/);
  const target = await page.locator("#experience").boundingBox();
  expect(target?.y).toBeGreaterThanOrEqual(70);
});

test("theme follows system initially and explicit preferences survive reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.getByRole("button", { name: /Theme: system/ }).click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/light/);
  await page.getByRole("button", { name: /Theme: light/ }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.getByRole("button", { name: /Theme: dark/ }).click();
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveClass(/light/);
});

test("mobile menu opens by keyboard and Escape restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");
  const menu = page.getByRole("navigation", { name: "Main navigation" }).locator("summary");
  await menu.focus(); await page.keyboard.press("Enter");
  await expect(menu.locator("..")).toHaveAttribute("open", "");
  await page.keyboard.press("Tab"); await page.keyboard.press("Escape");
  await expect(menu).toBeFocused(); await expect(menu.locator("..")).not.toHaveAttribute("open", "");
});

test("reduced motion and text-spacing reflow keep content available", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of routes) {
    await page.goto(route);
    await page.setViewportSize({ width: 320, height: 900 });
    await page.addStyleTag({ content: "* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p { margin-bottom: 2em !important; }" });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true);
    await expect(page.locator("h1")).toBeVisible();
  }
});

test("internal links and anchor targets resolve", async ({ page, request }) => {
  const links = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    for (const href of await page.locator('a[href^="/"]').evaluateAll((elements) => elements.map((e) => e.getAttribute("href")!))) links.add(href);
  }
  for (const href of links) {
    const [path, hash] = href.split("#");
    const response = await request.get(path);
    expect(response.ok(), href).toBe(true);
    if (hash) {
      await page.goto(path);
      await expect(page.locator(`[id="${hash}"]`), href).toHaveCount(1);
    }
  }
});

test("résumé print styles and PDF download", async ({ page, request }) => {
  await page.addInitScript(() => localStorage.setItem("theme", "dark"));
  await page.goto("/resume");
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.emulateMedia({ media: "print", colorScheme: "dark" });
  await expect(page.locator("header.sticky")).toBeHidden();
  await expect(page.locator("footer")).toBeHidden();
  await expect(page.locator("h1")).toBeVisible();
  expect(await page.locator("body").evaluate((body) => getComputedStyle(body).backgroundImage)).toBe("none");
  expect(await page.locator("html").evaluate((root) => getComputedStyle(root).colorScheme)).toBe("light");
  expect(await page.locator(".resume-document").evaluate((document) => getComputedStyle(document).backgroundColor)).toBe("rgb(255, 255, 255)");
  await page.pdf({ path: "artifacts/ui-review/resume-print.pdf", format: "A4", printBackground: true, preferCSSPageSize: true });
  const response = await request.get("/resume.pdf");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect((await response.body()).subarray(0, 4).toString()).toBe("%PDF");
});

test("forced colours keep controls and focus visible", async ({ page }) => {
  await page.emulateMedia({ forcedColors: "active" });
  await page.setViewportSize({ width: 320, height: 900 });
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    const theme = page.getByRole("button", { name: /Theme:/ });
    await theme.focus();
    expect(await theme.evaluate((button) => getComputedStyle(button).outlineStyle)).not.toBe("none");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
