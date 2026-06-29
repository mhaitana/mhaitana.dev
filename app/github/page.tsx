import type { Metadata } from "next";
import Image from "next/image";
import {
  Github,
  MapPin,
  Building2,
  Link as LinkIcon,
  Star,
  GitFork,
  CircleDot,
  CalendarDays,
  ExternalLink,
  Clock,
  GitCommit,
  GitPullRequest,
  AlertCircle,
  Tag,
} from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { AnimatedReveal } from "@/components/animated-reveal";
import { TechnologyBadge } from "@/components/technology-badge";
import { LinkButton } from "@/components/link-button";
import { GitHubContributionGraph } from "@/components/github-contribution-graph";
import {
  getGitHubData,
  formatGitHubDate,
  formatRelativeTime,
  describeEventType,
  type GitHubEvent,
} from "@/lib/github";

export const metadata: Metadata = {
  title: "GitHub",
  description:
    "Matt Haitana's GitHub dashboard: public repositories, aggregated language stats, contribution graph, and recent public activity.",
  alternates: {
    canonical: "/github",
  },
};

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case "PushEvent":
      return <GitCommit className="h-4 w-4" aria-hidden="true" />;
    case "PullRequestEvent":
      return <GitPullRequest className="h-4 w-4" aria-hidden="true" />;
    case "IssuesEvent":
      return <AlertCircle className="h-4 w-4" aria-hidden="true" />;
    case "CreateEvent":
    case "DeleteEvent":
      return <Tag className="h-4 w-4" aria-hidden="true" />;
    case "ForkEvent":
      return <GitFork className="h-4 w-4" aria-hidden="true" />;
    case "WatchEvent":
      return <Star className="h-4 w-4" aria-hidden="true" />;
    default:
      return <GitCommit className="h-4 w-4" aria-hidden="true" />;
  }
}

function EventDescription({ event }: { event: GitHubEvent }) {
  const repoName = event.repo.name;
  const action = event.payload?.action;
  const pr = event.payload?.pull_request;
  const commits = event.payload?.commits;
  const ref = event.payload?.ref;

  if (event.type === "PullRequestEvent" && pr) {
    return (
      <span className="text-sm text-muted-foreground">
        {action === "opened" ? "Opened" : action === "closed" ? "Closed" : action} pull request{" "}
        <a
          href={pr.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground hover:underline"
        >
          #{pr.number}
        </a>{" "}
        in{" "}
        <a
          href={`https://github.com/${repoName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground hover:underline"
        >
          {repoName}
        </a>
      </span>
    );
  }

  if (event.type === "PushEvent" && commits) {
    return (
      <span className="text-sm text-muted-foreground">
        Pushed {commits.length} commit{commits.length === 1 ? "" : "s"} to{" "}
        <a
          href={`https://github.com/${repoName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground hover:underline"
        >
          {repoName}
        </a>
        {ref && (
          <>
            {" "}
            on{" "}
            <span className="font-medium text-foreground">
              {ref.replace("refs/heads/", "")}
            </span>
          </>
        )}
      </span>
    );
  }

  return (
    <span className="text-sm text-muted-foreground">
      {describeEventType(event.type)} in{" "}
      <a
        href={`https://github.com/${repoName}`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-foreground hover:underline"
      >
        {repoName}
      </a>
    </span>
  );
}

export default async function GitHubPage() {
  const data = await getGitHubData();
  const { profile, repos, events, languageStats, detectedTechnologies, contributionCalendar, authenticated } = data;
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

  const topTechnologies = Object.values(detectedTechnologies ?? {})
    .flat()
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <>
      <section className="page-header" data-index="02">
        <Container className="relative z-10">
          <AnimatedReveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden border border-border shadow-[6px_6px_0_var(--primary)]">
                <Image
                  src={profile.avatar_url}
                  alt={`${profile.name ?? profile.login} GitHub avatar`}
                  fill
                  className="object-cover"
                  sizes="96px"
                  unoptimized
                  priority
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="eyebrow mb-4">Public worklog</p>
                    <h1 className="text-5xl font-bold tracking-[-0.06em] sm:text-7xl">
                      {profile.name ?? profile.login}
                    </h1>
                    <p className="text-lg text-muted-foreground">@{profile.login}</p>
                  </div>
                  <LinkButton
                    href={profile.html_url}
                    variant="outline"
                    external
                    className="gap-2"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    View on GitHub
                  </LinkButton>
                </div>

                {profile.bio && (
                  <p className="mt-4 text-muted-foreground">{profile.bio}</p>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  {profile.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {profile.location}
                    </span>
                  )}
                  {profile.company && (
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="h-4 w-4" aria-hidden="true" />
                      {profile.company}
                    </span>
                  )}
                  {profile.blog && (
                    <span className="inline-flex items-center gap-1.5">
                      <LinkIcon className="h-4 w-4" aria-hidden="true" />
                      <a
                        href={
                          profile.blog.startsWith("http")
                            ? profile.blog
                            : `https://${profile.blog}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground hover:underline"
                      >
                        {profile.blog}
                      </a>
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    Joined {formatGitHubDate(profile.created_at)}
                  </span>
                </div>
              </div>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={0.1}>
            <div className="mt-12 grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4">
              <div className="bg-card p-5">
                <p className="text-sm font-semibold text-muted-foreground">Public repos</p>
                <p className="mt-2 text-3xl font-extrabold text-gradient">{profile.public_repos}</p>
              </div>
              <div className="bg-card p-5">
                <p className="text-sm font-semibold text-muted-foreground">Total stars</p>
                <p className="mt-2 text-3xl font-extrabold text-gradient">{totalStars}</p>
              </div>
              <div className="bg-card p-5">
                <p className="text-sm font-semibold text-muted-foreground">Total forks</p>
                <p className="mt-2 text-3xl font-extrabold text-gradient">{totalForks}</p>
              </div>
              <div className="bg-card p-5">
                <p className="text-sm font-semibold text-muted-foreground">Followers</p>
                <p className="mt-2 text-3xl font-extrabold text-gradient">{profile.followers}</p>
              </div>
            </div>
          </AnimatedReveal>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="space-y-12 min-w-0">
            {contributionCalendar && (
              <div>
                <SectionHeading
                  eyebrow="Contributions"
                  title="Contribution graph"
                  description="A year of GitHub activity, including both public and private contributions when authenticated."
                />
                <AnimatedReveal>
                  <div className="mt-8 overflow-x-auto rounded-sm p-6 glass-card">
                    <GitHubContributionGraph calendar={contributionCalendar} />
                  </div>
                </AnimatedReveal>
              </div>
            )}

            <div>
              <SectionHeading
                eyebrow="Repositories"
                title="Public repositories"
                description="Only public repositories are listed. Private repositories are excluded from this list."
              />

              <div className="mt-8 grid gap-6">
                {repos.length === 0 && (
                  <AnimatedReveal>
                    <div className="rounded-sm border border-border bg-card p-6 text-center text-muted-foreground">
                      No public repositories to display.
                    </div>
                  </AnimatedReveal>
                )}

                {repos.map((repo, index) => (
                  <AnimatedReveal key={repo.id} delay={index * 0.05}>
                    <article className="rounded-sm p-6 glass-card">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 hover:underline"
                          >
                            {repo.name}
                            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                          </a>
                        </h3>
                        {repo.fork && (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                            Fork
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-sm text-muted-foreground">
                        {repo.description ?? "No description provided."}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {repo.topics.slice(0, 6).map((topic) => (
                          <TechnologyBadge key={topic}>{topic}</TechnologyBadge>
                        ))}
                        {repo.topics.length === 0 && repo.language && (
                          <TechnologyBadge>{repo.language}</TechnologyBadge>
                        )}
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-4 w-4" aria-hidden="true" />
                          {repo.stargazers_count}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <GitFork className="h-4 w-4" aria-hidden="true" />
                          {repo.forks_count}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <CircleDot className="h-4 w-4" aria-hidden="true" />
                          {repo.open_issues_count} issues
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-4 w-4" aria-hidden="true" />
                          Updated {formatRelativeTime(repo.updated_at)}
                        </span>
                      </div>
                    </article>
                  </AnimatedReveal>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Activity"
                title="Recent public activity"
                description="Latest public events across repositories, including pushes and pull requests."
              />

              <div className="mt-8 space-y-4">
                {events.length === 0 && (
                  <AnimatedReveal>
                    <div className="rounded-sm border border-border bg-card p-6 text-center text-muted-foreground">
                      No recent public activity to display.
                    </div>
                  </AnimatedReveal>
                )}

                {events.slice(0, 10).map((event, index) => (
                  <AnimatedReveal key={event.id} delay={index * 0.03}>
                    <div className="flex items-start gap-4 rounded-sm p-5 glass-card">
                      <span className="rounded-lg bg-muted p-2 text-primary">
                        <ActivityIcon type={event.type} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">
                          {describeEventType(event.type)}
                        </p>
                        <div className="mt-1">
                          <EventDescription event={event} />
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {formatRelativeTime(event.created_at)}
                        </p>
                      </div>
                    </div>
                  </AnimatedReveal>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <AnimatedReveal>
              <div className="glass-card rounded-sm p-6">
                <h2 className="text-lg font-bold">Languages</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {authenticated
                    ? "Estimated from all accessible repositories, including private work."
                    : "Estimated from public repository code."}
                </p>

                {languageStats.length === 0 ? (
                  <p className="mt-4 text-sm text-muted-foreground">No language data available.</p>
                ) : (
                  <div className="mt-5 space-y-4">
                    {languageStats.slice(0, 8).map((lang) => (
                      <div key={lang.name}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold">{lang.name}</span>
                          <span className="text-muted-foreground">{lang.percentage}%</span>
                        </div>
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted/60">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${lang.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedReveal>

            {topTechnologies && topTechnologies.length > 0 && (
              <AnimatedReveal delay={0.05}>
                <div className="glass-card rounded-sm p-6">
                  <h2 className="text-lg font-bold">Technologies</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Frameworks, libraries, and databases detected across repositories.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {topTechnologies.map((tech) => (
                      <TechnologyBadge key={tech.name}>
                        {tech.name}
                        {tech.count > 1 && ` (${tech.count})`}
                      </TechnologyBadge>
                    ))}
                  </div>
                </div>
              </AnimatedReveal>
            )}

            <AnimatedReveal delay={0.1}>
              <div className="glass-card rounded-sm p-6">
                <h2 className="text-lg font-bold">Privacy note</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  This dashboard only lists public repositories. When a personal access token is supplied at build time, language statistics and the contribution graph can include private work as aggregated totals. Individual private repository names, gists, and organisation details are never displayed.
                </p>
              </div>
            </AnimatedReveal>
          </aside>
        </Container>
      </section>
    </>
  );
}
