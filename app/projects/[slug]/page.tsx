import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Container } from "@/components/container";
import { AnimatedReveal } from "@/components/animated-reveal";
import { TechnologyBadge } from "@/components/technology-badge";
import { LinkButton } from "@/components/link-button";
import { projects } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <section className="px-6 pt-24 pb-16 lg:px-8">
        <Container className="max-w-3xl">
          <AnimatedReveal>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to projects
            </Link>
          </AnimatedReveal>

          <AnimatedReveal delay={0.05}>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.category.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {cat}
                </span>
              ))}
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={0.1}>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {project.title}
            </h1>
          </AnimatedReveal>

          <AnimatedReveal delay={0.15}>
            <p className="mt-6 text-lg text-muted-foreground">{project.description}</p>
          </AnimatedReveal>

          <AnimatedReveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <LinkButton href={project.liveUrl} external className="gap-2">
                  Live demo
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </LinkButton>
              )}
              {project.githubUrl && (
                <LinkButton href={project.githubUrl} variant="outline" external className="gap-2">
                  View code
                  <Github className="h-4 w-4" aria-hidden="true" />
                </LinkButton>
              )}
            </div>
          </AnimatedReveal>
        </Container>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <Container className="max-w-3xl">
          <AnimatedReveal>
            <div className="space-y-8">
              {project.architecture && (
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-xl font-semibold">Architecture</h2>
                  <p className="mt-2 text-muted-foreground">{project.architecture}</p>
                </div>
              )}

              {project.challenges && project.challenges.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-xl font-semibold">Challenges</h2>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
                    {project.challenges.map((challenge) => (
                      <li key={challenge}>{challenge}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.outcomes && project.outcomes.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-xl font-semibold">Outcomes</h2>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
                    {project.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-xl font-semibold">Technologies</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <TechnologyBadge key={tech}>{tech}</TechnologyBadge>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedReveal>
        </Container>
      </section>
    </>
  );
}
