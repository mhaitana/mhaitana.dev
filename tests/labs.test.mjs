import assert from "node:assert/strict";
import test from "node:test";
import { labProjects, labFilters, labStatusMeta } from "../lib/labs.ts";
import { countLabProjects, filterLabProjects, labResultsMessage } from "../lib/labs-filter.ts";

test("every project has unique identity and enough sourced information to evaluate", () => {
  assert.equal(new Set(labProjects.map((project) => project.id)).size, labProjects.length);
  for (const project of labProjects) {
    for (const key of ["name", "pitch", "problem", "role", "category"]) {
      assert.ok(project[key].trim(), `${project.id} needs ${key}`);
    }
    assert.ok(project.stack.length > 0);
    assert.ok(labStatusMeta[project.status]);
    if (project.destination) {
      assert.equal(new URL(project.destination.href).protocol, "https:");
      assert.ok(project.destination.label.trim());
      assert.notEqual(project.destination.href.replace(/\/$/, ""), "https://haitechlabs.com");
    }
  }
});

test("each displayed filter count agrees with the actual selected projects", () => {
  const counts = countLabProjects(labProjects);
  assert.equal(counts.all, labProjects.length);
  for (const filter of labFilters) {
    const results = filterLabProjects(labProjects, filter.value);
    assert.equal(results.length, counts[filter.value]);
    if (filter.value !== "all") assert.ok(results.every((project) => project.status === filter.value));
  }
  assert.equal(Object.entries(counts).filter(([key]) => key !== "all").reduce((sum, [, count]) => sum + count, 0), labProjects.length);
});

test("filters support empty data and a stage without projects", () => {
  assert.deepEqual(filterLabProjects([], "all"), []);
  assert.deepEqual(filterLabProjects([{ status: "live" }], "in development"), []);
  assert.equal(countLabProjects([]).all, 0);
  assert.equal(labResultsMessage(0, 5, "in development"), "Showing 0 of 5 projects: in development.");
});

test("result announcements describe the current filter and handle a single project", () => {
  assert.equal(labResultsMessage(1, 1, "all"), "Showing all 1 project.");
  assert.equal(labResultsMessage(2, 5, "alpha / waitlist"), "Showing 2 of 5 projects: alpha / waitlist.");
});
