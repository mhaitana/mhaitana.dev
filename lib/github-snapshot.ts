import type { GitHubData } from "./github-types";
import fs from "node:fs";

function emptySnapshot(username: string): GitHubData {
  return {
    fetched_at: "",
    username,
    authenticated: false,
    profile: {
      login: username,
      name: "Matt Haitana",
      avatar_url: "",
      html_url: `https://github.com/${username}`,
      company: null,
      blog: null,
      location: "Melbourne, Australia",
      bio: null,
      public_repos: 0,
      public_gists: 0,
      followers: 0,
      following: 0,
      created_at: "",
      updated_at: "",
    },
    repos: [],
    events: [],
    languageStats: [],
    contributionCalendar: null,
  };
}

/** Reads the last committed sync. Page requests never call GitHub or require a token. */
export function readGitHubSnapshot(filePath: string, username: string): GitHubData {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8")) as GitHubData;
    if (
      !data || typeof data.fetched_at !== "string" || !Number.isFinite(Date.parse(data.fetched_at)) ||
      typeof data.username !== "string" || typeof data.authenticated !== "boolean" ||
      !data.profile || typeof data.profile.login !== "string" || typeof data.profile.html_url !== "string" ||
      !Array.isArray(data.repos) || !Array.isArray(data.events) || !Array.isArray(data.languageStats)
    ) return emptySnapshot(username);

    // Old snapshots predate the explicit private:false field. The sync script has
    // always excluded private repositories; also reject any explicit private rows.
    const privateRepos = data.repos.filter((repo) => repo?.private);
    const privateNames = new Set(privateRepos.map((repo) => repo.full_name?.toLowerCase()));
    const privateIds = new Set(privateRepos.map((repo) => repo.id));
    data.repos = data.repos.filter((repo) => repo && !repo.private &&
      typeof repo.name === "string" && typeof repo.full_name === "string" &&
      !privateNames.has(repo.full_name.toLowerCase()) && !privateIds.has(repo.id) &&
      typeof repo.html_url === "string" && typeof repo.pushed_at === "string" &&
      (repo.description === null || typeof repo.description === "string") &&
      (repo.language === null || typeof repo.language === "string"));
    data.events = data.events.filter((event) => event && event.public === true &&
      typeof event.type === "string" && typeof event.created_at === "string" &&
      typeof event.repo?.name === "string" && !privateNames.has(event.repo.name.toLowerCase()) &&
      !privateIds.has(event.repo.id));
    data.languageStats = data.languageStats.filter((language) => language &&
      typeof language.name === "string" && Number.isFinite(language.percentage));
    data.contributionCalendar = data.contributionCalendar &&
      Number.isFinite(data.contributionCalendar.totalContributions) &&
      Array.isArray(data.contributionCalendar.weeks) &&
      data.contributionCalendar.weeks.every((week) => week && Array.isArray(week.contributionDays) &&
        week.contributionDays.every((day) => day && typeof day.date === "string" &&
          /^\d{4}-\d{2}-\d{2}$/.test(day.date) && Number.isFinite(Date.parse(day.date)) &&
          Number.isInteger(day.contributionCount) && day.contributionCount >= 0))
      ? data.contributionCalendar : null;
    data.detectedTechnologies = data.detectedTechnologies &&
      typeof data.detectedTechnologies === "object" &&
      Object.values(data.detectedTechnologies).every((items) => Array.isArray(items) &&
        items.every((item) => item && typeof item.name === "string" && Number.isFinite(item.count)))
      ? data.detectedTechnologies : {};
    return data;
  } catch {
    // Missing, unreadable or invalid data must not take down the page. The empty
    // fetched_at value distinguishes unavailability from a successful empty sync.
    return emptySnapshot(username);
  }
}
