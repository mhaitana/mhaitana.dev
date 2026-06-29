import { unstable_cache } from "next/cache";
import fs from "fs";
import path from "path";
import {
  type GitHubData,
  type GitHubRepo,
  type GitHubEvent,
  type DetectedTechnology,
  type ContributionCalendar
} from "./github-types";

export * from "./github-types";

const USERNAME = process.env.GITHUB_USERNAME || "mhaitana";

const CATEGORY_MAPPINGS: Record<string, string[]> = {
  Frontend: [
    "react", "next", "nextjs", "vue", "svelte", "angular", "emberjs", "solid-js",
    "preact", "htmx", "jquery", "bootstrap", "tailwindcss", "tailwind", "sass",
    "less", "styled-components", "emotion", "framer-motion", "shadcn", "radix-ui",
    "webpack", "vite", "rollup", "parcel", "esbuild", "swc", "turbo", "turbopack",
    "react-dom", "react-router", "tanstack-query", "react-query", "redux", "zustand",
    "mobx", "recoil", "jotai", "valtio", "apollo-client", "urql", "relay",
  ],
  Backend: [
    "node", "nodejs", "express", "fastify", "koa", "hapi", "nest", "nestjs", "django",
    "flask", "fastapi", "tornado", "spring", "spring-boot", "rails", "laravel",
    "symfony", "dotnet", "aspnet", "actix", "axum", "rocket", "tokio", "hyper",
    "graphql", "apollo-server", "trpc", "prisma", "drizzle", "sequelize", "typeorm",
    "mikro-orm", "sqlalchemy", "alembic", "mongoose", "passport", "oauth",
  ],
  Testing: [
    "jest", "vitest", "mocha", "chai", "cypress", "playwright", "selenium",
    "testing-library", "pytest", "unittest", "xunit", "nunit", "junit", "rspec",
    "karma", "jasmine", "ava", "tap", "storybook", "chromatic",
  ],
  DevOps: [
    "docker", "docker-compose", "kubernetes", "k8s", "helm", "terraform", "pulumi",
    "ansible", "chef", "puppet", "github-actions", "gitlab-ci", "jenkins",
    "circleci", "travisci", "semaphore", "buildkite", "argo", "vault", "consul",
    "nomad", "vagrant", "packer", "prometheus", "grafana", "datadog", "newrelic",
    "sentry", "vercel", "netlify", "heroku", "aws", "azure", "gcp", "google-cloud",
    "cloudflare", "fly", "render", "railway",
  ],
  Databases: [
    "postgresql", "postgres", "mysql", "mariadb", "sqlite", "mongodb", "redis",
    "elasticsearch", "cassandra", "dynamodb", "firestore", "supabase", "firebase",
    "neo4j", "couchdb", "dgraph", "cockroachdb", "planetscale", "prisma", "drizzle",
    "typeorm", "sqlalchemy", "mongoose", "qdrant", "milvus", "weaviate", "chroma",
  ],
  AI: [
    "openai", "anthropic", "claude", "gpt", "langchain", "langgraph", "llamaindex",
    "huggingface", "transformers", "pytorch", "tensorflow", "jax", "keras", "onnx",
    "litellm", "tiktoken", "sentence-transformers", "fastembed", "ollama", "openwebui",
    "pydantic-ai", "instructor", "outlines", "vllm", "sglang", "whisper", "stable-diffusion",
    "crewai", "autogen", "semantic-kernel", "sklearn", "scikit-learn", "numpy", "pandas",
  ],
};

const ALIASES: Record<string, string> = {
  next: "nextjs",
  "react-dom": "react",
  "react-router-dom": "react-router",
  "@next/font": "nextjs",
  tailwind: "tailwindcss",
  node: "nodejs",
  nest: "nestjs",
  expressjs: "express",
  fastapi: "fastapi",
  postgres: "postgresql",
  mongodb: "mongodb",
  postgresql: "postgresql",
  "@playwright/test": "playwright",
  "@testing-library/react": "testing-library",
  "@testing-library/jest-dom": "testing-library",
  github: "github-actions",
};

interface RawGitHubRepo {
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
  languages_url?: string;
  private: boolean;
  topics?: string[];
  homepage: string | null;
}

interface RawGitHubEvent {
  id: string;
  type: string;
  public: boolean;
  created_at: string;
  actor?: {
    login: string;
    avatar_url: string;
  };
  repo?: {
    id: number;
    name: string;
    url: string;
  };
  payload?: {
    action?: string;
    ref?: string;
    ref_type?: string;
    pull_request?: {
      number: number;
      title: string;
      html_url: string;
      state: string;
    };
    commits?: {
      sha: string;
      message: string;
    }[];
  };
}

interface GraphqlResponse {
  user?: {
    contributionsCollection?: {
      contributionCalendar?: ContributionCalendar;
    };
  };
}

function normaliseName(name: string): string {
  let lower = name.toLowerCase().trim();
  lower = lower.replace(/^@[a-z0-9-]+\//, "");
  lower = lower.replace(/[-_.]/g, "-");
  return ALIASES[lower] || lower;
}

function getCategory(name: string): string | null {
  const normalised = normaliseName(name);
  for (const [category, tools] of Object.entries(CATEGORY_MAPPINGS)) {
    if (tools.includes(normalised)) return category;
  }
  return null;
}

function addDetectedTool(aggregate: DetectedTechnology[], name: string, repoCount: number) {
  if (!name) return;
  const normalised = normaliseName(name);
  if (!normalised) return;

  const existing = aggregate.find((t) => t.normalisedName === normalised);
  if (existing) {
    existing.count += 1;
    existing.repos = Math.max(existing.repos, repoCount);
  } else {
    aggregate.push({
      name: normalised
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      normalisedName: normalised,
      count: 1,
      repos: repoCount,
      category: getCategory(normalised) ?? "Other",
    });
  }
}

function parsePackageJson(content: string): string[] {
  const tools: string[] = [];
  try {
    const data = JSON.parse(content);
    const deps = { ...data.dependencies, ...data.devDependencies, ...data.peerDependencies };
    tools.push(...Object.keys(deps));
  } catch { }
  return tools;
}

function parseRequirementsTxt(content: string): string[] {
  const tools: string[] = [];
  for (const line of content.split("\n")) {
    const dep = line.replace(/#.*$/, "").trim();
    if (!dep || dep.startsWith("-")) continue;
    const name = dep.split(/[>=<!~^;\[\s]/)[0].trim();
    if (name) tools.push(name);
  }
  return tools;
}

function getFallbackData(): GitHubData {
  try {
    const filePath = path.join(process.cwd(), "lib", "github-data.json");
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(raw) as GitHubData;
    }
  } catch (e) {
    console.error("Failed to load fallback github-data.json:", e);
  }
  return {
    fetched_at: new Date().toISOString(),
    username: USERNAME,
    authenticated: false,
    profile: {
      login: USERNAME,
      name: "Matt Haitana",
      avatar_url: "https://github.com/identicons/mhaitana.png",
      html_url: `https://github.com/${USERNAME}`,
      company: null,
      blog: null,
      location: "Melbourne, Australia",
      bio: null,
      public_repos: 0,
      public_gists: 0,
      followers: 0,
      following: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    repos: [],
    events: [],
    languageStats: [],
    contributionCalendar: null,
  };
}

// Live fetch execution
async function fetchGitHubDataLive(): Promise<GitHubData> {
  const token = process.env.GITHUB_TOKEN;
  const isAuthenticated = Boolean(token);

  const restHeaders: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "mhaitana-portfolio",
  };

  const graphqlHeaders: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "mhaitana-portfolio",
    "Content-Type": "application/json",
  };

  if (token) {
    restHeaders.Authorization = `Bearer ${token}`;
    graphqlHeaders.Authorization = `Bearer ${token}`;
  }

  async function restJson(url: string) {
    const res = await fetch(url, { headers: restHeaders, next: { revalidate: 21600 } });
    if (!res.ok) {
      throw new Error(`GitHub REST error: ${res.status} ${res.statusText} for ${url}`);
    }
    return res.json();
  }

  async function fetchFileContent(owner: string, repo: string, filePath: string): Promise<string | null> {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const res = await fetch(url, { headers: restHeaders, next: { revalidate: 21600 } });
    if (!res.ok) return null;
    const data = await res.json() as { content?: string; encoding?: string };
    if (data.content && data.encoding === "base64") {
      return Buffer.from(data.content, "base64").toString("utf-8");
    }
    if (typeof data.content === "string") {
      return data.content;
    }
    return null;
  }

  async function graphqlJson(query: string, variables = {}): Promise<GraphqlResponse> {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: graphqlHeaders,
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 21600 },
    });
    if (!res.ok) {
      throw new Error(`GitHub GraphQL error: ${res.status} ${res.statusText}`);
    }
    const json = await res.json() as { data: GraphqlResponse; errors?: { message: string }[] };
    if (json.errors) {
      throw new Error(
        `GitHub GraphQL errors: ${json.errors.map((e) => e.message).join(", ")}`
      );
    }
    return json.data;
  }

  // 1. Fetch Profile
  const profile = await restJson(`https://api.github.com/users/${USERNAME}`) as {
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
  };

  // 2. Fetch Repositories
  const reposUrl = isAuthenticated
    ? `https://api.github.com/user/repos?affiliation=owner&per_page=100&sort=updated`
    : `https://api.github.com/users/${USERNAME}/repos?type=owner&sort=updated&per_page=100`;

  let page = 1;
  const allRepos: RawGitHubRepo[] = [];
  while (true) {
    const batch = await restJson(`${reposUrl}&page=${page}`) as RawGitHubRepo[];
    if (!Array.isArray(batch) || batch.length === 0) break;
    allRepos.push(...batch);
    if (batch.length < 100) break;
    page++;
  }

  const languageList: Record<string, number>[] = [];
  const publicRepos: GitHubRepo[] = [];
  const detectedTools: DetectedTechnology[] = [];

  // Parallelize language fetches and tech detection for each repo
  await Promise.all(
    allRepos.map(async (repo) => {
      const isPublic = !repo.private;
      const isTypeScriptOrJS = ["TypeScript", "JavaScript"].includes(repo.language || "");
      const isPython = repo.language === "Python";

      const [languages, tech] = await Promise.all([
        repo.languages_url ? restJson(repo.languages_url) as Promise<Record<string, number>> : Promise.resolve({}),
        isPublic && isTypeScriptOrJS
          ? fetchFileContent(USERNAME, repo.name, "package.json").then((c) => (c ? parsePackageJson(c) : []))
          : isPublic && isPython
            ? fetchFileContent(USERNAME, repo.name, "requirements.txt").then((c) => (c ? parseRequirementsTxt(c) : []))
            : Promise.resolve([]),
      ]);

      languageList.push(languages);

      if (isPublic) {
        publicRepos.push({
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          html_url: repo.html_url,
          description: repo.description,
          fork: repo.fork,
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          pushed_at: repo.pushed_at,
          size: repo.size,
          stargazers_count: repo.stargazers_count,
          watchers_count: repo.watchers_count,
          forks_count: repo.forks_count,
          open_issues_count: repo.open_issues_count,
          language: repo.language,
          languages,
          topics: repo.topics ?? [],
          homepage: repo.homepage,
        });
      }

      // Aggregate tools
      for (const tool of tech) {
        addDetectedTool(detectedTools, tool, repo.private ? 1 : 0);
      }
    })
  );

  // 3. Fetch Events
  const eventsRaw = await restJson(
    `https://api.github.com/users/${USERNAME}/events/public?per_page=30`
  ) as RawGitHubEvent[];
  const events: GitHubEvent[] = eventsRaw
    .filter((e) => e.public)
    .map((event) => ({
      id: event.id,
      type: event.type,
      public: event.public,
      created_at: event.created_at,
      actor: {
        login: event.actor?.login ?? "",
        avatar_url: event.actor?.avatar_url ?? "",
      },
      repo: {
        id: event.repo?.id ?? 0,
        name: event.repo?.name ?? "",
        url: event.repo?.url ?? "",
      },
      payload: {
        action: event.payload?.action,
        ref: event.payload?.ref,
        ref_type: event.payload?.ref_type,
        pull_request: event.payload?.pull_request
          ? {
            number: event.payload.pull_request.number,
            title: event.payload.pull_request.title,
            html_url: event.payload.pull_request.html_url,
            state: event.payload.pull_request.state,
          }
          : undefined,
        commits: event.payload?.commits
          ? event.payload.commits.slice(0, 3).map((c) => ({
            sha: c.sha,
            message: c.message,
          }))
          : undefined,
      },
    }));

  // 4. Fetch Contribution Calendar
  let contributionCalendar: ContributionCalendar | null = null;
  if (isAuthenticated) {
    const query = `
      query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                }
              }
            }
          }
        }
      }
    `;
    const data = await graphqlJson(query, { login: USERNAME });
    contributionCalendar = data?.user?.contributionsCollection?.contributionCalendar ?? null;
  }

  // Sort and categorise tools
  const sortedTools = detectedTools
    .filter((t) => t.category !== "Other" || t.repos > 0)
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  // Categorise
  const categorisedTech: Record<string, DetectedTechnology[]> = {};
  for (const item of sortedTools) {
    const category = item.category;
    categorisedTech[category] = categorisedTech[category] || [];
    categorisedTech[category].push(item);
  }
  for (const key of Object.keys(categorisedTech)) {
    categorisedTech[key].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }

  // Public repos displayed: defensive filter
  const cleanPublicRepos = publicRepos.filter(
    (repo) => !repo.fork || repo.full_name.startsWith(`${USERNAME}/`)
  );

  return {
    fetched_at: new Date().toISOString(),
    username: USERNAME,
    authenticated: isAuthenticated,
    profile: {
      login: profile.login,
      name: profile.name,
      avatar_url: profile.avatar_url,
      html_url: profile.html_url,
      company: profile.company,
      blog: profile.blog,
      location: profile.location,
      bio: profile.bio,
      public_repos: profile.public_repos,
      public_gists: profile.public_gists,
      followers: profile.followers,
      following: profile.following,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
    },
    repos: cleanPublicRepos,
    events,
    languageStats: aggregateLanguages(languageList),
    detectedTechnologies: categorisedTech,
    contributionCalendar,
  };
}

function aggregateLanguages(repoLanguagesList: Record<string, number>[]) {
  const totals: Record<string, number> = {};
  let sum = 0;

  for (const languages of repoLanguagesList) {
    for (const [language, bytes] of Object.entries(languages)) {
      const bytesNum = bytes;
      totals[language] = (totals[language] ?? 0) + bytesNum;
      sum += bytesNum;
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

// Cached wrapper (cached for 6 hours / 21600 seconds)
const getCachedGitHubData = unstable_cache(
  async () => {
    try {
      return await fetchGitHubDataLive();
    } catch (e) {
      console.error("Error fetching live GitHub data, falling back to static file:", e);
      return getFallbackData();
    }
  },
  ["github-data"],
  { revalidate: 21600, tags: ["github"] }
);

export async function getGitHubData(): Promise<GitHubData> {
  return getCachedGitHubData();
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
