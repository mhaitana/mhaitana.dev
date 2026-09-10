import assert from "node:assert/strict";
import test from "node:test";
import { formatExperienceDuration, formatExperiencePeriod } from "../lib/data.ts";

test("completed roles retain the published inclusive calendar-month convention", () => {
  assert.equal(formatExperienceDuration("2020-02", "2025-08"), "5 years 7 months");
  assert.equal(formatExperienceDuration("2018-08", "2020-02"), "1 year 7 months");
  assert.equal(formatExperienceDuration("2025-03", "2025-10"), "8 months");
  assert.equal(formatExperienceDuration("2015-11", "2018-07"), "2 years 9 months");
});

test("current roles advance with the date instead of a hardcoded duration", () => {
  assert.equal(formatExperienceDuration("2025-08", null, new Date("2026-09-05T00:00:00Z")), "1 year 2 months");
  assert.equal(formatExperienceDuration("2007-10", null, new Date("2026-09-05T00:00:00Z")), "19 years");
  assert.equal(formatExperienceDuration("2025-08", null, new Date("2026-10-01T00:00:00Z")), "1 year 3 months");
});

test("month and year boundaries format naturally", () => {
  assert.equal(formatExperienceDuration("2025-08", "2025-08"), "1 month");
  assert.equal(formatExperienceDuration("2025-08", "2026-07"), "1 year");
  assert.equal(formatExperienceDuration("2025-12", "2026-01"), "2 months");
  assert.equal(formatExperienceDuration("2027-01", null, new Date("2026-09-05T00:00:00Z")), "0 months");
});

test("periods derive from the same source dates", () => {
  assert.equal(formatExperiencePeriod("2025-08", null), "Aug 2025 – Present");
  assert.equal(formatExperiencePeriod("2020-02", "2025-08"), "Feb 2020 – Aug 2025");
  assert.throws(() => formatExperiencePeriod("2025-13", null), RangeError);
});
