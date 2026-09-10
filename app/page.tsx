import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download, MapPin } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { LinkButton } from "@/components/link-button";
import { StructuredData } from "@/components/structured-data";
import { experiences, selectedImpact } from "@/lib/data";
import { labProjects, labStatusMeta } from "@/lib/labs";

const focusAreas = [
  { title: "Product platforms", body: "React interfaces, shared design systems and typed GraphQL APIs." },
  { title: "Reliable delivery", body: "Containerised services, automated checks and preview environments." },
  { title: "Local-first AI", body: "Exploring on-device models and practical developer tools." },
];

export const revalidate = 86400;

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <section className="border-b border-border">
        <Container className="py-10 sm:py-14 lg:py-16">
          <div className="mb-9 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <p className="eyebrow">Senior Software Engineer</p>
            <p className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground"><span className="size-2 bg-[var(--positive)]" aria-hidden="true" />Based in Melbourne · Building worldwide</p>
          </div>
          <div className="grid gap-9 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.8fr)] lg:items-end lg:gap-12">
            <h1 className="display-type" aria-label="Matt Haitana"><span className="block">MATT</span><span className="block text-primary">HAITANA</span></h1>
            <div className="border-l-2 border-primary pl-5 lg:pb-1">
              <p className="max-w-lg text-2xl font-medium leading-tight tracking-[-0.035em] sm:text-3xl">Complex systems.<br />Clear, useful products.</p>
              <p className="mt-4 max-w-[48ch] leading-relaxed text-muted-foreground">I build customer-facing platforms, the APIs behind them, and the systems that help teams ship. Currently a Senior Software Engineer at {experiences[0].company}.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <LinkButton href="/contact">Get in touch <ArrowRight aria-hidden="true" /></LinkButton>
                <LinkButton href="/resume" variant="outline"><Download aria-hidden="true" /> Résumé</LinkButton>
              </div>
            </div>
          </div>
          <div className="mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-2"><MapPin className="size-4 text-primary" aria-hidden="true" />Melbourne, Australia</p>
            <a href="#selected-work" className="inline-flex min-h-11 items-center gap-3 font-mono text-xs font-semibold uppercase tracking-wider hover:text-primary">Explore selected work <ArrowRight className="size-4 rotate-90" aria-hidden="true" /></a>
          </div>
        </Container>
      </section>

      <section id="selected-work" className="section-space border-b border-border bg-card">
        <Container>
          <div className="grid gap-5 lg:grid-cols-[1fr_0.65fr] lg:items-end">
            <SectionHeading eyebrow="01 / Selected impact" title="Built for real work." />
            <p className="max-w-[60ch] leading-relaxed text-muted-foreground">Selected engineering work at Domain. These are summaries of production responsibilities; the employer systems are private.</p>
          </div>
          <div className="mt-8 grid border-l border-t border-border lg:grid-cols-3">
            {selectedImpact.map((work, index) => (
              <article key={work.id} className="flex flex-col border-b border-r border-border p-5 sm:p-7">
                <p className="flex items-center justify-between gap-3 font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">Domain · Production<span className="text-primary" aria-hidden="true">0{index + 1}</span></p>
                <h3 className="mt-5 text-2xl font-bold leading-tight tracking-[-0.04em]">{work.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{work.problem}</p>
                <dl className="mt-5 space-y-4 text-sm leading-relaxed">
                  <div><dt className="font-semibold">My role</dt><dd className="mt-1 text-muted-foreground">{work.role}</dd></div>
                  <div><dt className="font-semibold">The system</dt><dd className="mt-1 text-muted-foreground">{work.system}</dd></div>
                </dl>
                <div className="mt-auto pt-6"><p className="border-t border-border pt-4 text-sm font-medium leading-relaxed">{work.outcome}</p></div>
              </article>
            ))}
          </div>
          <Link href="/about#experience-domain" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline">Read the career context <ArrowRight className="size-4" aria-hidden="true" /></Link>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <h2 className="eyebrow">02 / What I build</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3 md:gap-10">
            {focusAreas.map((area) => <div key={area.title} className="border-t border-border pt-5"><h3 className="text-xl font-bold tracking-tight">{area.title}</h3><p className="mt-2 max-w-[45ch] text-sm leading-relaxed text-muted-foreground">{area.body}</p></div>)}
          </div>
        </Container>
      </section>

      <section className="inverse-surface section-space">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading className="[&_h2]:text-background" eyebrow="03 / Selected experience" title="A decade of useful work." />
            <LinkButton href="/about#experience" variant="outline" className="border-background/40 bg-transparent text-background hover:bg-background hover:text-foreground">Full timeline <ArrowRight aria-hidden="true" /></LinkButton>
          </div>
          <div className="mt-8 border-t border-background/25">
            {experiences.filter((exp) => ["CoStar Group", "Domain", "Real Time Agent"].includes(exp.company)).map((exp) => (
              <div key={exp.company} className="grid gap-3 border-b border-background/25 py-6 md:grid-cols-[1fr_1.65fr] md:gap-8">
                <div><h3 className="text-xl font-bold tracking-tight">{exp.company}</h3><p className="mt-2 font-mono text-[0.65rem] uppercase tracking-wider text-background/75">{exp.period}</p></div>
                <div><p className="font-semibold">{exp.title}</p><p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-background/75">{exp.summary}</p></div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-space border-b border-border bg-card">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="04 / Building now" title="From idea to useful." description="Haitech Labs is my independent software studio. A selection from the current pipeline." />
            <LinkButton href="/labs" variant="outline">All projects <ArrowRight aria-hidden="true" /></LinkButton>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {labProjects.filter((project) => ["cruise-planner", "hai"].includes(project.id)).map((project) => (
              <article key={project.id} className="flex flex-col border border-border bg-background p-5 sm:p-7">
                <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">{project.category} · {labStatusMeta[project.status].label}</p>
                <h3 className="mt-4 text-2xl font-bold tracking-tight">{project.name}</h3>
                <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">{project.pitch}</p>
                <Link href={`/labs#${project.id}`} className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-semibold text-primary hover:underline">Explore {project.name} <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <p className="text-sm text-muted-foreground">Public tools, experiments and the work behind them.</p>
            <Link href="/github" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline">Explore the worklog <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </div>
        </Container>
      </section>
    </>
  );
}
