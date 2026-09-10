import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  workers: 1,
  retries: 0,
  timeout: 45_000,
  reporter: [["list"], ["html", { outputFolder: "artifacts/playwright-report", open: "never" }]],
  outputDir: "artifacts/test-results",
  use: { baseURL: process.env.TEST_BASE_URL || "http://127.0.0.1:3100", browserName: "chromium", channel: "chrome", trace: "retain-on-failure" },
});
