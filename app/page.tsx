import { Github, Linkedin, Mail, MapPin, ArrowRight, Download } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { AnimatedReveal } from "@/components/animated-reveal";
import { StatCard } from "@/components/stat-card";
import { LinkButton } from "@/components/link-button";
import { StructuredData } from "@/components/structured-data";
import { GitHubContributionGraph } from "@/components/github-contribution-graph";
import { experiences } from "@/lib/data";
import { getGitHubData } from "@/lib/github";

export default async function HomePage() {
  const { contributionCalendar, languageStats } = await getGitHubData();
  const totalYears = "10+";

  return (
    <>
      <StructuredData />
      <section className="relative overflow-hidden border-b border-border bg-background px-6 pt-32 pb-24 lg:px-8">
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <AnimatedReveal>
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Senior Software Engineer
              </p>
            </AnimatedReveal>

            <AnimatedReveal delay={0.05}>
              <h1 className="mt-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Matt Haitana
              </h1>
            </AnimatedReveal>

            <AnimatedReveal delay={0.1}>
              <p className="mt-6 text-xl leading-relaxed text-muted-foreground sm:text-2xl">
                I design and build fast, accessible web platforms that scale.
                Currently engineering premium real estate experiences at{" "}
                <strong className="text-foreground">CoStar Group</strong>.
              </p>
            </AnimatedReveal>

            <AnimatedReveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  Melbourne, Australia
                </span>
                <span className="hidden sm:inline">·</span>
                <span>Open to senior engineering roles</span>
              </div>
            </AnimatedReveal>

            <AnimatedReveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <LinkButton href="/contact" size="lg" className="gap-2">
                  Get in touch
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </LinkButton>
                <LinkButton href="/resume" variant="outline" size="lg" className="gap-2">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Resume
                </LinkButton>
              </div>
            </AnimatedReveal>

            <AnimatedReveal delay={0.25}>
              <div className="mt-12 flex items-center gap-4">
                <a
                  href="https://github.com/mhaitana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mhaitana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="mailto:mhaitana@gmail.com"
                  className="rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </AnimatedReveal>
          </div>
        </Container>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard value={totalYears} label="Years shipping software" />
            <StatCard value="6" label="Companies & organisations" />
            <StatCard value="100%" label="Accessibility target" />
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-muted/30 px-6 py-24 lg:px-8">
        <Container>
          <SectionHeading
            eyebrow="Experience"
            title="Where I have worked"
            description="From real-time property platforms to defence systems, a career focused on impact."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {experiences.slice(0, 4).map((exp) => (
              <AnimatedReveal key={exp.company}>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">{exp.company}</h3>
                  <p className="text-sm text-muted-foreground">{exp.title}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{exp.period}</p>
                </div>
              </AnimatedReveal>
            ))}
          </div>

          <div className="mt-10">
            <LinkButton href="/about#experience" variant="outline" className="gap-2">
              Full timeline
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </LinkButton>
          </div>
        </Container>
      </section>

      {contributionCalendar && (
        <section className="px-6 py-24 lg:px-8">
          <Container>
            <div className="flex items-end justify-between">
              <SectionHeading
                eyebrow="Open Source"
                title="GitHub Activity"
                description="A year of contributions, side projects, and experimentation."
              />
              <LinkButton href="/github" variant="outline" className="hidden gap-2 sm:inline-flex">
                View GitHub Profile
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </LinkButton>
            </div>
            
            <div className="mt-8 flex flex-col lg:flex-row lg:items-stretch gap-6 items-start">
              <AnimatedReveal className="w-full lg:w-fit max-w-full">
                <div className="h-full w-full overflow-x-auto rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-center">
                  <GitHubContributionGraph calendar={contributionCalendar} />
                </div>
              </AnimatedReveal>

              {languageStats && languageStats.length > 0 && (
                <AnimatedReveal delay={0.1} className="w-full lg:flex-1">
                  <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <h2 className="text-lg font-semibold">Top Languages</h2>
                    <div className="mt-5 space-y-4">
                      {languageStats.slice(0, 3).map((lang) => (
                        <div key={lang.name}>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{lang.name}</span>
                            <span className="text-muted-foreground">{lang.percentage}%</span>
                          </div>
                          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${lang.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedReveal>
              )}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
