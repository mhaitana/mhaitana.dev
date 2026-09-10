import assert from "node:assert/strict";
import test from "node:test";
import { experiences, getExperiences, selectedImpact, skillCategories } from "../lib/data.ts";

const now = new Date("2026-09-05T00:00:00Z");

test("every career role has unique, valid source dates and renderable evidence", () => {
  assert.equal(new Set(experiences.map((experience) => experience.id)).size, experiences.length);
  for (const experience of experiences) {
    assert.match(experience.startDate, /^\d{4}-(0[1-9]|1[0-2])$/);
    if (experience.endDate !== null) {
      assert.match(experience.endDate, /^\d{4}-(0[1-9]|1[0-2])$/);
      assert.ok(experience.endDate >= experience.startDate, experience.id);
    }
    assert.ok(experience.title && experience.company && experience.summary, experience.id);
    assert.ok(experience.achievements.length > 0, experience.id);
  }
});

test("selected impact points to existing roles and achievement evidence", () => {
  assert.equal(new Set(selectedImpact.map((impact) => impact.id)).size, selectedImpact.length);
  for (const impact of selectedImpact) {
    const role = experiences.find((experience) => experience.id === impact.experienceId);
    assert.ok(role, `Unknown role for ${impact.id}`);
    assert.ok(impact.achievementIndexes.length > 0);
    for (const index of impact.achievementIndexes) {
      assert.ok(Number.isInteger(index) && index >= 0 && index < role.achievements.length, impact.id);
    }
    for (const field of ["title", "problem", "role", "system", "outcome"]) assert.ok(impact[field].trim(), `${impact.id}.${field}`);
  }
});

test("career factory returns plain values and computes present roles per render", () => {
  const current = getExperiences(now);
  const later = getExperiences(new Date("2026-10-01T00:00:00Z"));
  assert.equal(current.find((role) => role.id === "costar").duration, "1 year 2 months");
  assert.equal(later.find((role) => role.id === "costar").duration, "1 year 3 months");
  assert.equal(current.find((role) => role.id === "domain").duration, later.find((role) => role.id === "domain").duration);
  for (const experience of current) {
    assert.equal(Object.getPrototypeOf(experience), Object.prototype);
    assert.ok(Object.values(Object.getOwnPropertyDescriptors(experience)).every((descriptor) => !descriptor.get && !descriptor.set));
  }
  assert.deepEqual(JSON.parse(JSON.stringify(current)), current);
});

test("skills have usage context instead of arbitrary scores", () => {
  for (const category of skillCategories) {
    assert.ok(category.name && category.context);
    assert.ok(category.skills.length > 0);
    assert.ok(category.skills.every((skill) => skill.name && !("proficiency" in skill)));
  }
});
