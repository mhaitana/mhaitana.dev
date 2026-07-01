import {
  ArrowDownRight,
  ArrowRight,
  Braces,
  Cpu,
  Download,
  Github,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { AnimatedReveal } from "@/components/animated-reveal";
import { StatCard } from "@/components/stat-card";
import { LinkButton } from "@/components/link-button";
import { StructuredData } from "@/components/structured-data";
import { GitHubContributionGraph } from "@/components/github-contribution-graph";
import { experiences } from "@/lib/data";
import { getGitHubData } from "@/lib/github";
import { labProjects, labStatusMeta, HAITECH_LABS_URL } from "@/lib/labs";

const focusAreas = [
  {
    index: "01",
    icon: Layers3,
    title: "Product platforms",
    body: "Composable frontends, design systems, and type-safe GraphQL layers built for teams—not just demos.",
    tags: ["React", "Next.js", "GraphQL"],
  },
  {
    index: "02",
    icon: Cpu,
    title: "Local-first AI",
    body: "Practical model gateways, context engines, and developer tools that keep latency, privacy, and cost in view.",
    tags: ["Rust", "Python", "MCP"],
  },
  {
    index: "03",
    icon: Braces,
    title: "Systems that ship",
    body: "Observable services and CI/CD pipelines designed to make reliable delivery the default behaviour.",
    tags: ["AWS", "Docker", "TypeScript"],
  },
];

export default async function HomePage() {
  const { contributionCalendar, languageStats } = await getGitHubData();

  return (
    <>
      <StructuredData />

      <section className="relative overflow-hidden border-b border-border">
        <Container className="relative py-16 sm:py-24 lg:py-28">
          <AnimatedReveal>
            <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
              <p className="eyebrow">Senior Software Engineer</p>
              <p className="flex items-center gap-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                <span className="size-2 bg-emerald-500" aria-hidden="true" />
                Building from Melbourne · AEST
              </p>
            </div>
          </AnimatedReveal>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.55fr)] lg:items-end">
            <div>
              <AnimatedReveal delay={0.04}>
                <h1 className="display-type">
                  <span className="block">MATT</span>
                  <span className="block text-primary">HAITANA</span>
                </h1>
              </AnimatedReveal>
            </div>

            <AnimatedReveal delay={0.1}>
              <div className="border-l-2 border-primary pl-6 lg:mb-1">
                <p className="text-xl font-medium leading-snug tracking-[-0.025em] sm:text-2xl">
                  I turn complex systems into clear, durable products.
                </p>
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  High-performance web platforms, APIs, local-first AI tools, and accessible interfaces built to scale with the people behind them.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <LinkButton href="/contact" size="lg">
                    Start a conversation <ArrowRight aria-hidden="true" />
                  </LinkButton>
                  <LinkButton href="/resume" variant="outline" size="lg">
                    <Download aria-hidden="true" /> Resume
                  </LinkButton>
                </div>
              </div>
            </AnimatedReveal>
          </div>

          <AnimatedReveal delay={0.15}>
            <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 text-primary" aria-hidden="true" /> Melbourne, Australia
              </div>
              <div className="flex items-center gap-2">
                {[
                  { href: "https://github.com/mhaitana", label: "GitHub", icon: Github },
                  { href: "https://www.linkedin.com/in/mhaitana", label: "LinkedIn", icon: Linkedin },
                  { href: "mailto:mhaitana@gmail.com", label: "Email", icon: Mail },
                ].map((item) => (
                  <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className="flex size-11 items-center justify-center border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground" aria-label={item.label}>
                    <item.icon className="size-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </AnimatedReveal>
        </Container>
      </section>

      <section className="border-b border-border bg-card/60">
        <Container className="grid p-0 sm:grid-cols-3 sm:px-8 lg:px-12">
          <StatCard value="10+" label="Years shipping production software" />
          <StatCard value="30+" label="Design-system packages delivered" />
          <StatCard value="80%+" label="Coverage gates established" />
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <SectionHeading eyebrow="What I build" title="Depth where it matters." description="A product engineer’s eye, backed by platform thinking and the operational discipline to carry work into production." />
              <ArrowDownRight className="mt-10 hidden size-12 text-primary lg:block" aria-hidden="true" />
            </div>
            <div className="border-t border-border">
              {focusAreas.map((area, index) => (
                <AnimatedReveal key={area.title} delay={index * 0.05}>
                  <article className="group grid gap-5 border-b border-border py-7 sm:grid-cols-[3rem_1fr_auto] sm:items-start sm:py-9">
                    <span className="font-mono text-xs font-bold text-primary">{area.index}</span>
                    <div>
                      <div className="flex items-center gap-3">
                        <area.icon className="size-5 text-primary" strokeWidth={1.7} aria-hidden="true" />
                        <h3 className="text-2xl font-bold tracking-[-0.04em] sm:text-3xl">{area.title}</h3>
                      </div>
                      <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{area.body}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:max-w-28 sm:justify-end">
                      {area.tags.map((tag) => <span key={tag} className="border border-border px-2 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground">{tag}</span>)}
                    </div>
                  </article>
                </AnimatedReveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-foreground py-20 text-background sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <SectionHeading className="[&_h2]:text-background [&_p]:text-background/55" eyebrow="Selected experience" title="A decade of useful work." description="Across property technology, real-time systems, product platforms, and defence." />
            <LinkButton href="/about#experience" variant="outline" className="border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground">Full timeline <ArrowRight aria-hidden="true" /></LinkButton>
          </div>
          <div className="mt-12 border-t border-background/20">
            {experiences.slice(0, 4).map((exp, index) => (
              <AnimatedReveal key={exp.company + exp.period} delay={index * 0.04}>
                <div className="grid gap-2 border-b border-background/20 py-6 sm:grid-cols-[3rem_1fr_1fr_auto] sm:items-center">
                  <span className="font-mono text-xs text-primary">0{index + 1}</span>
                  <h3 className="text-xl font-bold tracking-tight">{exp.company}</h3>
                  <p className="text-sm text-background/55">{exp.title}</p>
                  <p className="font-mono text-[0.65rem] uppercase tracking-wider text-background/45">{exp.period}</p>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </Container>
      </section>

      {contributionCalendar && (
        <section className="py-20 sm:py-28">
          <Container>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading eyebrow="Public worklog" title="Still making things." description="A live-ish trace of open-source contributions, experiments, and side projects." />
              <LinkButton href="/github" variant="outline">Explore worklog <ArrowRight aria-hidden="true" /></LinkButton>
            </div>
            <div className="mt-10 grid gap-px bg-border border border-border lg:grid-cols-[1fr_20rem]">
              <div className="min-w-0 overflow-x-auto bg-card p-5 sm:p-8">
                <GitHubContributionGraph calendar={contributionCalendar} />
              </div>
              <div className="bg-card p-6 sm:p-8">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-primary">Language mix</p>
                <div className="mt-6 space-y-5">
                  {languageStats.slice(0, 4).map((lang) => (
                    <div key={lang.name}>
                      <div className="flex justify-between text-sm"><span className="font-semibold">{lang.name}</span><span className="font-mono text-xs text-muted-foreground">{lang.percentage}%</span></div>
                      <div className="mt-2 h-1 bg-muted"><div className="h-full bg-primary" style={{ width: `${lang.percentage}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-border bg-card/60 py-20 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Haitech Labs"
              title="Build first. Ship weekly."
              description="An independent software venture studio — lean MVPs, internal tools, and micro-SaaS, from thesis to production."
            />
            <LinkButton href="/labs" variant="outline" className="shrink-0">
              Explore the pipeline <ArrowRight aria-hidden="true" />
            </LinkButton>
          </div>
          <div className="mt-10 border-t border-border">
            {labProjects.map((project, index) => {
              const meta = labStatusMeta[project.status];
              return (
                <AnimatedReveal key={project.id} delay={index * 0.04}>
                  <a
                    href={HAITECH_LABS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid gap-2 border-b border-border py-5 transition-colors hover:bg-muted/40 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6 sm:py-6"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`size-2 shrink-0 ${meta.dotClass}`} aria-hidden="true" />
                      <span className="text-lg font-bold tracking-tight">{project.name}</span>
                      <span className="hidden font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground sm:inline">{project.category}</span>
                    </div>
                    <span className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground sm:justify-end">
                      {meta.label}
                      <ArrowRight className="size-3.5 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </a>
                </AnimatedReveal>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
