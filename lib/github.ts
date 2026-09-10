import { unstable_cache } from "next/cache";
import path from "node:path";
import { readGitHubSnapshot } from "./github-snapshot";
import type { GitHubData } from "./github-types";

export * from "./github-types";

const USERNAME = process.env.GITHUB_USERNAME || "mhaitana";

// The committed snapshot is refreshed only by npm run sync-github. Rendering
// stays independent of API credentials, GitHub availability and rate limits.
const getCachedGitHubData = unstable_cache(
  async () => readGitHubSnapshot(path.join(process.cwd(), "lib", "github-data.json"), USERNAME),
  ["github-snapshot", USERNAME],
  { revalidate: 21600, tags: ["github"] }
);

export async function getGitHubData(): Promise<GitHubData> {
  return getCachedGitHubData();
}

export function formatGitHubDate(date: string): string {
  if (!Number.isFinite(Date.parse(date))) return "Date unavailable";
  return new Date(date).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function describeEventType(type: string): string {
  switch (type) {
    case "PushEvent": return "Code push";
    case "PullRequestEvent": return "Pull request";
    case "IssuesEvent": return "Issue update";
    case "CreateEvent": return "Branch or tag created";
    case "DeleteEvent": return "Branch or tag deleted";
    case "ForkEvent": return "Repository forked";
    case "WatchEvent": return "Repository starred";
    case "ReleaseEvent": return "Release published";
    case "PublicEvent": return "Repository made public";
    default: return "Public activity";
  }
}
