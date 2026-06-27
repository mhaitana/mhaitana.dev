export interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  company: string | null;
  blog: string | null;
  location: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  languages: Record<string, number>;
  topics: string[];
  homepage: string | null;
  detectedTechnologies?: string[];
}

export interface LanguageStat {
  name: string;
  bytes: number;
  percentage: number;
}

export interface DetectedTechnology {
  name: string;
  normalisedName: string;
  count: number;
  repos: number;
  category: string;
}

export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface GitHubEventPayload {
  action?: string;
  ref?: string;
  ref_type?: string;
  pull_request?: {
    number: number;
    title: string;
    html_url: string;
    state: string;
  };
  commits?: { sha: string; message: string }[];
}

export interface GitHubEvent {
  id: string;
  type: string;
  public: boolean;
  created_at: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: GitHubEventPayload;
}

export interface GitHubData {
  fetched_at: string;
  username: string;
  authenticated: boolean;
  profile: GitHubProfile;
  repos: GitHubRepo[];
  events: GitHubEvent[];
  languageStats: LanguageStat[];
  detectedTechnologies?: Record<string, DetectedTechnology[]>;
  contributionCalendar: ContributionCalendar | null;
}

export function computeLanguageStats(repos: GitHubRepo[]): LanguageStat[] {
  const totals: Record<string, number> = {};
  let sum = 0;

  for (const repo of repos) {
    for (const [language, bytes] of Object.entries(repo.languages)) {
      totals[language] = (totals[language] ?? 0) + bytes;
      sum += bytes;
    }
  }

  return Object.entries(totals)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: sum > 0 ? Math.round((bytes / sum) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.bytes - a.bytes);
}

export function getContributionLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}
