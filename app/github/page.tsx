import type { Metadata } from "next";
import { ArrowUpRight, Clock3, GitCommitHorizontal, Github } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { LinkButton } from "@/components/link-button";
import { TechnologyBadge } from "@/components/technology-badge";
import { GitHubContributionGraph } from "@/components/github-contribution-graph";
import { getGitHubData, formatGitHubDate, describeEventType, type GitHubRepo } from "@/lib/github";
import { getSnapshotStatus, repositoryContext, selectFeaturedRepos, summariseActivity, type ActivitySummary } from "@/lib/github-worklog";

export const metadata: Metadata = {
  title: "Worklog",
  description: "Selected public tools, local-first AI projects and a concise record of Matt Haitana's public engineering work.",
  alternates: { canonical: "/github" },
};

// Re-evaluate the saved-data freshness label periodically without calling GitHub.
export const revalidate = 21600;

function RepositoryCard({ repo, username }: { repo: GitHubRepo; username: string }) {
  const context = repositoryContext[repo.name];
  const status = repo.archived ? "Archived" : repo.disabled ? "Unavailable on GitHub" : "Public source";
  const ownership = repo.fork ? "Fork of an upstream project" :
    repo.full_name.startsWith(`${username}/`) ? "Repository owner" : "Public repository";

  return (
    <article className="flex min-w-0 flex-col border border-border bg-card p-5 sm:p-6">
      <p className="font-mono text-xs leading-relaxed text-muted-foreground">{context?.domain ?? (repo.fork ? "Open-source exploration" : "Public project")}</p>
      <h3 className="mt-4 break-words text-2xl font-bold tracking-tight">{repo.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {context?.description ?? (repo.fork ? "An upstream project explored through a public fork. See the source and its history on GitHub." : repo.description ?? "Explore the public source on GitHub.")}
      </p>
      <dl className="mt-6 space-y-2 border-t border-border pt-4 text-xs leading-relaxed">
        <div className="flex flex-wrap justify-between gap-x-3 gap-y-1"><dt className="text-muted-foreground">Role</dt><dd>{ownership}</dd></div>
        <div className="flex flex-wrap justify-between gap-x-3 gap-y-1"><dt className="text-muted-foreground">Status in snapshot</dt><dd>{status}</dd></div>
        {repo.language && <div className="flex justify-between gap-3"><dt className="text-muted-foreground">Primary language</dt><dd>{repo.language}</dd></div>}
        <div className="flex flex-wrap justify-between gap-x-3 gap-y-1"><dt className="text-muted-foreground">Last code push</dt><dd><time dateTime={repo.pushed_at}>{formatGitHubDate(repo.pushed_at)}</time></dd></div>
      </dl>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center justify-between gap-3 border-t border-border pt-3 text-sm font-semibold hover:text-primary">
        View repository<span className="sr-only">: {repo.name}</span><ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </article>
  );
}

function ActivityList({ groups }: { groups: ActivitySummary[] }) {
  return (
    <ol className="divide-y divide-border">
      {groups.map((group) => (
        <li key={group.id} className="flex gap-3 py-4 sm:gap-4">
          <GitCommitHorizontal className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <div className="min-w-0 flex-1 sm:flex sm:items-start sm:justify-between sm:gap-5">
            <div className="min-w-0">
              <a href={`https://github.com/${group.repo}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center gap-1.5 break-all text-sm font-semibold hover:text-primary hover:underline">
                {group.repo}<ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              </a>
              <p className="mt-1 text-sm text-muted-foreground">
                {group.type === "PushEvent" ? `${group.count} code push${group.count === 1 ? "" : "es"}` : `${describeEventType(group.type)}${group.count > 1 ? ` · ${group.count} events` : ""}`}
                {group.action && <span> · {group.action}</span>}
              </p>
            </div>
            <time dateTime={group.date} className="mt-2 block shrink-0 text-xs text-muted-foreground sm:mt-1">{formatGitHubDate(group.date)}</time>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default async function GitHubPage() {
  const data = await getGitHubData();
  const { repos, events, languageStats, detectedTechnologies, contributionCalendar, authenticated } = data;
  const status = getSnapshotStatus(data.fetched_at);
  const featured = selectFeaturedRepos(repos).slice(0, 3);
  const featuredIds = new Set(featured.map((repo) => repo.id));
  const remaining = repos.filter((repo) => !repo.private && !featuredIds.has(repo.id));
  const activity = summariseActivity(events);
  const topTechnologies = Object.values(detectedTechnologies ?? {}).flat().sort((a, b) => b.count - a.count).slice(0, 8);

  return (
    <>
      <section className="page-header" data-index="02">
        <Container className="relative z-10">
          <p className="eyebrow">02 / Public worklog</p>
          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-[clamp(2.75rem,7vw,6rem)] font-bold leading-[0.98] tracking-[-0.06em]">Tools, code &amp;<br />work in progress.</h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">Public work by Matt Haitana: local-first AI tools, developer tooling and the systems behind them.</p>
            </div>
            <LinkButton href={data.profile.html_url} variant="outline" external className="w-fit shrink-0 gap-2">
              <Github className="h-4 w-4" aria-hidden="true" />View GitHub<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </LinkButton>
          </div>
          <div className="mt-7 flex items-start gap-2.5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
            <Clock3 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p>
              {status === "unavailable" ? "The saved worklog is temporarily unavailable. Public projects are still available on GitHub." : <>
                Snapshot saved <time dateTime={data.fetched_at}>{formatGitHubDate(data.fetched_at)}</time>.
                {status === "stale" ? " This snapshot is over 30 days old; activity and repository status may have changed." : " Activity reflects this saved snapshot."}
                {" "}<a href={`https://github.com/${data.username}`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">See the latest on GitHub<ArrowUpRight className="ml-0.5 inline h-3 w-3" aria-hidden="true" /></a>
              </>}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading eyebrow="Selected source" title="Featured public projects" description="Original tools focused on making AI and everyday development more useful, observable and local." />
          {featured.length ? <div className="mt-7 grid gap-4 lg:grid-cols-3">{featured.map((repo) => <RepositoryCard key={repo.id} repo={repo} username={data.username} />)}</div> : (
            <div className="mt-7 border border-border bg-card p-6 text-sm leading-relaxed text-muted-foreground">{status === "unavailable" ? "Repository details could not be loaded from the saved worklog." : "No original public projects were included in this snapshot."} <a href={data.profile.html_url} className="font-semibold text-foreground underline underline-offset-4">Browse GitHub</a>.</div>
          )}
          {remaining.length > 0 && <details className="mt-6 border-t border-border pt-2">
            <summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold underline decoration-border underline-offset-4 hover:text-primary">More public repositories ({remaining.length})</summary>
            <div className="mt-4 grid gap-4 md:grid-cols-2">{remaining.map((repo) => <RepositoryCard key={repo.id} repo={repo} username={data.username} />)}</div>
          </details>}
        </Container>
      </section>

      <section className="border-t border-border py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <div className="min-w-0">
            <p className="eyebrow">Activity</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Recent public work</h2>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">Public events in the saved snapshot, grouped by project and day. Pushes are activity events, not a measure of engineering impact.</p>
            <div className="mt-5">
              {activity.length ? <ActivityList groups={activity.slice(0, 4)} /> : <p className="border border-border bg-card p-5 text-sm text-muted-foreground">No public activity was recorded in this snapshot.</p>}
              {activity.length > 4 && <details className="border-t border-border pt-2">
                <summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold underline decoration-border underline-offset-4 hover:text-primary">View earlier activity ({activity.length - 4} groups)</summary>
                <ActivityList groups={activity.slice(4)} />
              </details>}
            </div>
          </div>
          <div className="min-w-0">
            <p className="eyebrow">Supporting context</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Contribution history</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{authenticated ? "GitHub totals may include public and private contributions. Private project details are not shown." : "Contribution totals reflect the public data included in this snapshot."}</p>
            <div className="mt-6 border border-border bg-card p-4 sm:p-6">
              {contributionCalendar ? <GitHubContributionGraph calendar={contributionCalendar} /> : <p className="text-sm leading-relaxed text-muted-foreground">Contribution history was not included in this snapshot. <a href={data.profile.html_url} className="underline underline-offset-4 hover:text-foreground">View the GitHub profile</a> for current activity.</p>}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Language context</h2>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">{authenticated ? "Share of code bytes across accessible repositories, including private repositories." : "Share of code bytes across public repositories."} These proportions describe the code sampled, not skill level.</p>
              {languageStats.length ? <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm">{languageStats.slice(0, 6).map((language) => <li key={language.name}><span className="font-semibold">{language.name}</span><span className="ml-2 tabular-nums text-muted-foreground">{language.percentage}%</span></li>)}</ul> : <p className="mt-4 text-sm text-muted-foreground">No language data was included in this snapshot.</p>}
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Tools in public source</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Frameworks and tools detected in public repositories, including forks.</p>
              {topTechnologies.length ? <div className="mt-5 flex flex-wrap gap-2">{topTechnologies.map((tech) => <TechnologyBadge key={tech.normalisedName}>{tech.name}</TechnologyBadge>)}</div> : <p className="mt-4 text-sm text-muted-foreground">No tooling data was included in this snapshot.</p>}
            </div>
          </div>
          <p className="mt-10 max-w-3xl border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">Only public repository names and public activity appear here. Language and contribution totals may include private work without identifying individual projects. This page uses a saved snapshot, so GitHub downtime or rate limits do not interrupt browsing.</p>
        </Container>
      </section>
    </>
  );
}
