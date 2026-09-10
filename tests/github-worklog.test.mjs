import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { getSnapshotStatus, selectFeaturedRepos, summariseActivity, summariseContributions } from "../lib/github-worklog.ts";
import { readGitHubSnapshot } from "../lib/github-snapshot.ts";

const snapshot = JSON.parse(fs.readFileSync(new URL("../lib/github-data.json", import.meta.url), "utf8"));

test("snapshot freshness distinguishes old, missing and current data without inventing a sync date", () => {
  const now = new Date("2026-09-05T00:00:00Z");
  assert.equal(getSnapshotStatus("2026-09-04T00:00:00Z", now), "current");
  assert.equal(getSnapshotStatus("2026-07-11T11:53:04Z", now), "stale");
  assert.equal(getSnapshotStatus("", now), "unavailable");
  assert.equal(getSnapshotStatus("not-a-date", now), "unavailable");
});

test("selected work prefers curated original projects over a recently updated fork", () => {
  const sorted = selectFeaturedRepos([...snapshot.repos].reverse());
  assert.deepEqual(sorted.slice(0, 3).map((repo) => repo.name), ["agentlens", "agent-usage", "docker-llm-stack"]);
  assert.equal(sorted.some((repo) => repo.fork), false);
  assert.equal(selectFeaturedRepos([{ ...snapshot.repos[0], private: true }]).length, 0);
});

test("activity groups repeated public events by repository, type and day without claiming commit counts", () => {
  const base = snapshot.events[0];
  const groups = summariseActivity([
    { ...base, id: "1", created_at: "2026-07-11T08:00:00Z" },
    { ...base, id: "2", created_at: "2026-07-11T10:00:00Z" },
    { ...base, id: "3", created_at: "2026-07-10T10:00:00Z" },
    { ...base, id: "4", public: false, repo: { ...base.repo, name: "owner/private-project" } },
  ]);
  assert.equal(groups.length, 2);
  assert.equal(groups[0].count, 2);
  assert.equal(groups[0].date, "2026-07-11");
  assert.equal(groups[1].count, 1);
  assert.equal(JSON.stringify(groups).includes("private-project"), false);
});

test("monthly summary correctly separates year boundaries and counts active days", () => {
  const rows = summariseContributions({ totalContributions: 10, weeks: [{ contributionDays: [
    { date: "2025-12-31", contributionCount: 3, color: "" },
    { date: "2026-01-01", contributionCount: 7, color: "" },
    { date: "2026-01-02", contributionCount: 0, color: "" },
  ] }] });
  assert.deepEqual(rows, [
    { month: "2025-12", contributions: 3, activeDays: 1, recordedDays: 1 },
    { month: "2026-01", contributions: 7, activeDays: 1, recordedDays: 2 },
  ]);
  assert.deepEqual(summariseContributions({ totalContributions: 0, weeks: [] }), []);
});

test("missing, corrupt and malformed snapshots retain a useful profile and honest empty state", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "worklog-test-"));
  const file = path.join(directory, "snapshot.json");
  try {
    for (const content of [null, "{broken", "{}", JSON.stringify({ ...snapshot, repos: null })]) {
      if (content !== null) fs.writeFileSync(file, content);
      const data = readGitHubSnapshot(file, "mhaitana");
      assert.equal(data.profile.html_url, "https://github.com/mhaitana");
      assert.equal(data.fetched_at, "");
      assert.deepEqual(data.repos, []);
      assert.equal(getSnapshotStatus(data.fetched_at), "unavailable");
    }
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test("a saved snapshot stays available offline and strips explicitly private entries", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "worklog-test-"));
  const file = path.join(directory, "snapshot.json");
  try {
    fs.writeFileSync(file, JSON.stringify({ ...snapshot,
      repos: [...snapshot.repos, { ...snapshot.repos[0], id: 999, private: true, name: "private-name", full_name: "owner/private-name" }],
      events: [...snapshot.events, { ...snapshot.events[0], public: false, repo: { ...snapshot.events[0].repo, id: 999, name: "owner/private-name" } }],
    }));
    const data = readGitHubSnapshot(file, "mhaitana");
    assert.equal(data.fetched_at, "2026-07-11T11:53:04.313Z");
    assert.equal(data.repos.length, snapshot.repos.length);
    assert.equal(data.events.length, snapshot.events.length);
    assert.equal(JSON.stringify(data).includes("private-name"), false);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test("a successful empty sync is distinct from an unreadable snapshot", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "worklog-test-"));
  const file = path.join(directory, "snapshot.json");
  try {
    fs.writeFileSync(file, JSON.stringify({ ...snapshot, repos: [], events: [], languageStats: [], contributionCalendar: null }));
    const data = readGitHubSnapshot(file, "mhaitana");
    assert.equal(data.fetched_at, "2026-07-11T11:53:04.313Z");
    assert.deepEqual(data.repos, []);
    assert.deepEqual(data.events, []);
    assert.equal(data.contributionCalendar, null);
    assert.equal(getSnapshotStatus(data.fetched_at, new Date("2026-07-12")), "current");
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test("an explicitly private repository also suppresses contradictory public activity for that name", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "worklog-test-"));
  const file = path.join(directory, "snapshot.json");
  try {
    fs.writeFileSync(file, JSON.stringify({ ...snapshot,
      repos: [...snapshot.repos, { ...snapshot.repos[0], id: 999, private: true, name: "private-name", full_name: "owner/private-name" }],
      events: [...snapshot.events, { ...snapshot.events[0], id: "private-event", public: true, repo: { id: 999, name: "owner/private-name", url: "https://api.github.com/repos/owner/private-name" } }],
    }));
    const data = readGitHubSnapshot(file, "mhaitana");
    assert.equal(data.repos.length, snapshot.repos.length);
    assert.equal(data.events.length, snapshot.events.length);
    assert.equal(JSON.stringify(data).includes("private-name"), false);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test("a malformed optional calendar leaves the valid public projects available", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "worklog-test-"));
  const file = path.join(directory, "snapshot.json");
  try {
    fs.writeFileSync(file, JSON.stringify({ ...snapshot, contributionCalendar: { totalContributions: 10, weeks: [null] } }));
    const data = readGitHubSnapshot(file, "mhaitana");
    assert.equal(data.repos.length, snapshot.repos.length);
    assert.equal(data.fetched_at, snapshot.fetched_at);
    assert.equal(data.contributionCalendar, null);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
