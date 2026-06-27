import fs from "fs";
import path from "path";
import { type GitHubData, computeLanguageStats } from "./github-types";
export * from "./github-types";

export async function getGitHubData(): Promise<GitHubData> {
  const filePath = path.join(process.cwd(), "lib", "github-data.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw) as GitHubData;

  // Defensive: only ever expose public repositories in the displayed list.
  const publicRepos = data.repos.filter(
    (repo) => !repo.fork || repo.full_name.startsWith(`${data.username}/`)
  );

  // Backward compatibility: compute language stats if missing.
  const languageStats = data.languageStats ?? computeLanguageStats(publicRepos);

  return {
    ...data,
    repos: publicRepos,
    languageStats,
    contributionCalendar: data.contributionCalendar ?? null,
  };
}

export function formatGitHubDate(date: string): string {
  return new Date(date).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatRelativeTime(date: string): string {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export function describeEventType(type: string): string {
  switch (type) {
    case "PushEvent":
      return "Pushed commits";
    case "PullRequestEvent":
      return "Pull request";
    case "IssuesEvent":
      return "Issue";
    case "CreateEvent":
      return "Created";
    case "DeleteEvent":
      return "Deleted";
    case "ForkEvent":
      return "Forked";
    case "WatchEvent":
      return "Starred";
    case "ReleaseEvent":
      return "Release";
    case "PublicEvent":
      return "Made public";
    default:
      return type.replace("Event", "");
  }
}
