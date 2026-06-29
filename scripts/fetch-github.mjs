// Fetches GitHub data for the portfolio dashboard.
// Set GITHUB_TOKEN to include private contributions in language aggregates and the contribution calendar.
// Run: node scripts/fetch-github.mjs

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

try {
  process.loadEnvFile(path.join(__dirname, "..", ".env"));
} catch {
  // Ignore if .env is missing or node version doesn't support loadEnvFile
}

const OUT_PATH = path.join(__dirname, "..", "lib", "github-data.json");
const USERNAME = process.env.GITHUB_USERNAME || "mhaitana";

const token = process.env.GITHUB_TOKEN;
const isAuthenticated = Boolean(token);

const restHeaders = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "mhaitana-portfolio",
};
const graphqlHeaders = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "mhaitana-portfolio",
  "Content-Type": "application/json",
};

if (token) {
  restHeaders.Authorization = `Bearer ${token}`;
  graphqlHeaders.Authorization = `Bearer ${token}`;
}

async function restJson(url) {
  const res = await fetch(url, { headers: restHeaders });
  if (!res.ok) {
    throw new Error(`GitHub REST error: ${res.status} ${res.statusText} for ${url}`);
  }
  return res.json();
}

// fetchText: unused but kept for future manifest polling
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchText(url) {
  const res = await fetch(url, { headers: restHeaders });
  if (!res.ok) return null;
  return res.text();
}

async function fetchFileContent(owner, repo, filePath) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
  const res = await fetch(url, { headers: restHeaders });
  if (!res.ok) return null;
  const data = await res.json();
  if (data.content && data.encoding === "base64") {
    return Buffer.from(data.content, "base64").toString("utf-8");
  }
  if (typeof data.content === "string") {
    return data.content;
  }
  return null;
}

async function graphqlJson(query, variables = {}) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: graphqlHeaders,
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    throw new Error(`GitHub GraphQL error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  if (json.errors) {
    throw new Error(
      `GitHub GraphQL errors: ${json.errors.map((e) => e.message).join(", ")}`
    );
  }
  return json.data;
}

function sanitizeProfile(profile) {
  return {
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
  };
}

function sanitizeRepo(repo, languages = {}) {
  if (repo.private) return null;

  return {
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
  };
}

function sanitizeEvent(event) {
  return {
    id: event.id,
    type: event.type,
    public: event.public,
    created_at: event.created_at,
    actor: {
      login: event.actor?.login,
      avatar_url: event.actor?.avatar_url,
    },
    repo: {
      id: event.repo?.id,
      name: event.repo?.name,
      url: event.repo?.url,
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
  };
}

function aggregateLanguages(repoLanguagesList) {
  const totals = {};
  let sum = 0;

  for (const languages of repoLanguagesList) {
    for (const [language, bytes] of Object.entries(languages)) {
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

// ---------- Dependency / tooling extraction ----------

const CATEGORY_MAPPINGS = {
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

const ALIASES = {
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

function normaliseName(name) {
  let lower = name.toLowerCase().trim();
  // strip common prefixes and scopes
  lower = lower.replace(/^@[a-z0-9-]+\//, "");
  lower = lower.replace(/[-_.]/g, "-");
  return ALIASES[lower] || lower;
}

function getCategory(name) {
  const normalised = normaliseName(name);
  for (const [category, tools] of Object.entries(CATEGORY_MAPPINGS)) {
    if (tools.includes(normalised)) return category;
  }
  return null;
}

function addDetectedTool(aggregate, name, repoCount) {
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

function parsePackageJson(content) {
  const tools = [];
  try {
    const data = JSON.parse(content);
    const deps = { ...data.dependencies, ...data.devDependencies, ...data.peerDependencies };
    tools.push(...Object.keys(deps));
  } catch {
    // ignore parse errors
  }
  return tools;
}

function parsePyprojectToml(content) {
  const tools = [];
  const depRegex = /^(dependencies|dev-dependencies|optional-dependencies)\s*=\s*\[/gim;
  let match;
  while ((match = depRegex.exec(content)) !== null) {
    const start = match.index + match[0].length;
    let depth = 1;
    let end = start;
    while (end < content.length && depth > 0) {
      if (content[end] === "[") depth++;
      else if (content[end] === "]") depth--;
      end++;
    }
    const block = content.slice(start, end - 1);
    const lines = block.split("\n");
    for (const line of lines) {
      const dep = line.replace(/[#;].*$/, "").trim().replace(/^["']|["']$/g, "");
      if (!dep) continue;
      // match name from "name>=version" or "name==version"
      const name = dep.split(/[>=<!~^;\[\s]/)[0].trim();
      if (name) tools.push(name);
    }
  }
  return tools;
}

function parseRequirementsTxt(content) {
  const tools = [];
  for (const line of content.split("\n")) {
    const dep = line.replace(/#.*$/, "").trim();
    if (!dep || dep.startsWith("-")) continue;
    const name = dep.split(/[>=<!~^;\[\s]/)[0].trim();
    if (name) tools.push(name);
  }
  return tools;
}

function parseCargoToml(content) {
  const tools = [];
  const depSections = /\[(dependencies|dev-dependencies|build-dependencies)\]/gi;
  let match;
  while ((match = depSections.exec(content)) !== null) {
    const sectionStart = match.index + match[0].length;
    const nextSection = content.indexOf("[", sectionStart);
    const block = content.slice(
      sectionStart,
      nextSection === -1 ? undefined : nextSection
    );
    for (const line of block.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const name = trimmed.split(/\s*=\s*/)[0].trim().replace(/"/g, "");
      if (name) tools.push(name);
    }
  }
  return tools;
}

function parseGoMod(content) {
  const tools = [];
  const requireRegex = /^require\s+\(?\s*$/gm;
  let match;
  while ((match = requireRegex.exec(content)) !== null) {
    const start = match.index + match[0].length;
    const blockEnd = content.indexOf(")", start);
    const block = content.slice(start, blockEnd === -1 ? undefined : blockEnd);
    for (const line of block.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("//")) continue;
      const parts = trimmed.split(/\s+/);
      const modulePath = parts[0];
      if (!modulePath) continue;
      // take last segment of path as tool name
      const name = modulePath.split("/").pop();
      if (name) tools.push(name);
    }
  }
  return tools;
}

function parseDockerfile(content) {
  const tools = [];
  const fromRegex = /^FROM\s+([^\s\n]+)/gim;
  let match;
  while ((match = fromRegex.exec(content)) !== null) {
    const image = match[1].split(":")[0];
    const name = image.split("/").pop();
    if (name) tools.push(name);
  }
  return tools;
}

function parseDockerCompose(content) {
  const tools = [];
  const imageRegex = /image:\s*([^\s\n]+)/g;
  let match;
  while ((match = imageRegex.exec(content)) !== null) {
    const image = match[1].split(":")[0];
    const name = image.split("/").pop();
    if (name) tools.push(name);
  }
  return tools;
}

function parseWorkflows(contents) {
  const tools = [];
  for (const content of contents) {
    const usesRegex = /uses:\s*([^\s\n@]+)/g;
    let match;
    while ((match = usesRegex.exec(content)) !== null) {
      const action = match[1];
      // e.g. actions/checkout@v4 -> actions/checkout
      const name = action.split("@")[0];
      if (name) tools.push(name);
    }
  }
  return tools;
}

async function detectRepoTechnologies(owner, repo) {
  const tools = [];

  const packageJson = await fetchFileContent(owner, repo, "package.json");
  if (packageJson) tools.push(...parsePackageJson(packageJson));

  const pyproject = await fetchFileContent(owner, repo, "pyproject.toml");
  if (pyproject) tools.push(...parsePyprojectToml(pyproject));

  const requirements = await fetchFileContent(owner, repo, "requirements.txt");
  if (requirements) tools.push(...parseRequirementsTxt(requirements));

  const cargoToml = await fetchFileContent(owner, repo, "Cargo.toml");
  if (cargoToml) tools.push(...parseCargoToml(cargoToml));

  const goMod = await fetchFileContent(owner, repo, "go.mod");
  if (goMod) tools.push(...parseGoMod(goMod));

  const dockerfile = await fetchFileContent(owner, repo, "Dockerfile");
  if (dockerfile) tools.push(...parseDockerfile(dockerfile));

  const dockerCompose = await fetchFileContent(owner, repo, "docker-compose.yml");
  if (dockerCompose) tools.push(...parseDockerCompose(dockerCompose));

  // GitHub Actions workflows
  let workflowContents = [];
  try {
    const workflows = await restJson(
      `https://api.github.com/repos/${owner}/${repo}/contents/.github/workflows`
    );
    if (Array.isArray(workflows)) {
      const files = workflows.filter((f) => f.type === "file" && f.name.endsWith(".yml"));
      const texts = await Promise.all(
        files.map(async (f) => {
          const res = await fetch(f.download_url, { headers: restHeaders });
          return res.ok ? res.text() : "";
        })
      );
      workflowContents = texts.filter(Boolean);
    }
  } catch {
    // no workflows
  }
  if (workflowContents.length > 0) {
    tools.push(...parseWorkflows(workflowContents));
  }

  // Deduplicate and filter noise
  const seen = new Set();
  const unique = [];
  for (const tool of tools) {
    const normalised = normaliseName(tool);
    if (!normalised) continue;
    if (seen.has(normalised)) continue;
    seen.add(normalised);
    unique.push(normalised);
  }
  return unique;
}

function categoriseTechnologies(items) {
  const grouped = {};
  for (const item of items) {
    const category = item.category;
    grouped[category] = grouped[category] || [];
    grouped[category].push(item);
  }
  // Sort each category by count desc, then name
  for (const key of Object.keys(grouped)) {
    grouped[key].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }
  return grouped;
}

async function fetchAllReposForLanguages() {
  const url = isAuthenticated
    ? `https://api.github.com/user/repos?affiliation=owner&per_page=100&sort=updated`
    : `https://api.github.com/users/${USERNAME}/repos?type=owner&sort=updated&per_page=100`;

  let page = 1;
  const all = [];

  while (true) {
    const batch = await restJson(`${url}&page=${page}`);
    if (!Array.isArray(batch) || batch.length === 0) break;
    all.push(...batch);
    if (batch.length < 100) break;
    page++;
  }

  return all;
}

async function fetchContributionCalendar() {
  if (!isAuthenticated) return null;

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
  return data?.user?.contributionsCollection?.contributionCalendar ?? null;
}

async function main() {
  console.log(`Fetching GitHub data for ${USERNAME} (${isAuthenticated ? "authenticated" : "public only"})`);

  const profile = await restJson(`https://api.github.com/users/${USERNAME}`);

  // --- Repositories, language aggregation, and technology detection ---
  const allRepos = await fetchAllReposForLanguages();
  const languageList = [];
  const publicRepos = [];
  const detectedTools = [];

  for (const repo of allRepos) {
    const [languages, tech] = await Promise.all([
      repo.languages_url ? restJson(repo.languages_url) : Promise.resolve({}),
      !repo.private ? detectRepoTechnologies(USERNAME, repo.name) : Promise.resolve([]),
    ]);
    languageList.push(languages);

    if (!repo.private) {
      const sanitized = sanitizeRepo(repo, languages);
      if (sanitized) {
        sanitized.detectedTechnologies = tech;
        publicRepos.push(sanitized);
      }
    }

    // Aggregate tools across all accessible repos without revealing private names.
    for (const tool of tech) {
      addDetectedTool(detectedTools, tool, repo.private ? 1 : 0);
    }
  }

  // --- Public events ---
  const eventsRaw = await restJson(
    `https://api.github.com/users/${USERNAME}/events/public?per_page=30`
  );
  const events = eventsRaw.filter((e) => e.public).map(sanitizeEvent);

  // --- Contribution calendar ---
  const contributionCalendar = await fetchContributionCalendar();

  const sortedTools = detectedTools
    .filter((t) => t.category !== "Other" || t.repos > 0)
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  const output = {
    fetched_at: new Date().toISOString(),
    username: USERNAME,
    authenticated: isAuthenticated,
    profile: sanitizeProfile(profile),
    repos: publicRepos,
    events,
    languageStats: aggregateLanguages(languageList),
    detectedTechnologies: categoriseTechnologies(sortedTools),
    contributionCalendar,
  };

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(output, null, 2));
  console.log(`Wrote ${OUT_PATH}`);
  console.log(`Public repos displayed: ${publicRepos.length}`);
  console.log(`Repos used for language aggregate: ${allRepos.length}`);
  console.log(`Public events: ${events.length}`);
  console.log(`Detected technologies: ${sortedTools.length}`);
  console.log(
    `Contribution calendar: ${contributionCalendar ? `${contributionCalendar.totalContributions} contributions` : "unavailable without token"
    }`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
