/** Render the authoritative web résumé. Start a production server before running. */
import { chromium } from "@playwright/test";
import { resolve } from "node:path";

const baseURL = process.env.TEST_BASE_URL || "http://127.0.0.1:3100";
const destination = resolve("public/resume.pdf");
const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage({ viewport: { width: 900, height: 1100 } });
  const response = await page.goto(new URL("/resume", baseURL).href, { waitUntil: "networkidle" });
  if (!response?.ok()) throw new Error("The résumé page could not be loaded.");
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: "print", colorScheme: "light" });
  await page.pdf({ path: destination, format: "A4", preferCSSPageSize: true, printBackground: true, tagged: true, outline: true });
  console.log(`Updated ${destination} from ${baseURL}/resume`);
} finally {
  await browser.close();
}
