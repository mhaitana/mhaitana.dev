import type { ActivitySummary, ContributionCalendar, ContributionMonth, GitHubEvent, GitHubRepo } from "./github-types";

export type { ActivitySummary, ContributionMonth } from "./github-types";

// Editorial descriptions are grounded in the committed public repository metadata.
// An API timestamp alone does not establish a release or active maintenance.
export const repositoryContext: Record<string, { domain: string; description: string }> = {
  agentlens: {
    domain: "Local-first AI · Developer tools",
    description: "Privacy-first analytics and coaching for AI coding agents, with a local-first approach.",
  },
  "agent-usage": {
    domain: "Developer tools · Observability",
    description: "A local dashboard for coding-agent usage and cost, reading directly from the filesystem without a database or external requests.",
  },
  "docker-llm-stack": {
    domain: "AI infrastructure · Containers",
    description: "A hardware-aware local LLM stack combining Ollama, Open WebUI and PostgreSQL with model optimisation.",
  },
  "mhaitana.dev": {
    domain: "Frontend · Personal publishing",
    description: "The source for this portfolio: a theme-aware Next.js site with a public worklog and accessible career timeline.",
  },
};

const featuredOrder = ["agentlens", "agent-usage", "docker-llm-stack", "mhaitana.dev"];

export function getSnapshotStatus(date: string, now = new Date()): "current" | "stale" | "unavailable" {
  const fetched = Date.parse(date);
  if (!Number.isFinite(fetched)) return "unavailable";
  return now.getTime() - fetched > 30 * 24 * 60 * 60 * 1000 ? "stale" : "current";
}

export function selectFeaturedRepos(repos: GitHubRepo[]): GitHubRepo[] {
  const rank = (repo: GitHubRepo) => {
    const index = featuredOrder.indexOf(repo.name);
    return index === -1 ? featuredOrder.length : index;
  };

  return repos.filter((repo) => !repo.fork && !repo.private).sort((a, b) =>
    rank(a) - rank(b) || Date.parse(b.pushed_at) - Date.parse(a.pushed_at) || a.name.localeCompare(b.name)
  );
}

export function summariseActivity(events: GitHubEvent[]): ActivitySummary[] {
  const groups = new Map<string, ActivitySummary>();
  for (const event of events) {
    if (!event.public || !event.repo.name || !Number.isFinite(Date.parse(event.created_at))) continue;
    const date = event.created_at.slice(0, 10);
    const action = event.payload?.action;
    const id = `${date}:${event.repo.name}:${event.type}:${action ?? ""}`;
    const existing = groups.get(id);
    if (existing) {
      existing.count += 1;
      if (event.created_at > existing.latestAt) existing.latestAt = event.created_at;
    } else {
      groups.set(id, { id, type: event.type, repo: event.repo.name, date, latestAt: event.created_at, count: 1, action });
    }
  }
  return [...groups.values()].sort((a, b) => b.latestAt.localeCompare(a.latestAt));
}

export function summariseContributions(calendar: ContributionCalendar): ContributionMonth[] {
  const months = new Map<string, ContributionMonth>();
  for (const week of calendar.weeks) {
    for (const day of week.contributionDays) {
      const month = day.date.slice(0, 7);
      const row = months.get(month) ?? { month, contributions: 0, activeDays: 0, recordedDays: 0 };
      row.contributions += day.contributionCount;
      row.activeDays += day.contributionCount > 0 ? 1 : 0;
      row.recordedDays += 1;
      months.set(month, row);
    }
  }
  return [...months.values()].sort((a, b) => a.month.localeCompare(b.month));
}
