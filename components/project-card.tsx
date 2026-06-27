import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { AnimatedReveal } from "./animated-reveal";
import { TechnologyBadge } from "./technology-badge";
import { Project } from "@/lib/data";
import { LinkButton } from "./link-button";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <AnimatedReveal delay={index * 0.05}>
      <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
        <div className="mb-5 aspect-video overflow-hidden rounded-xl border border-border bg-muted">
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50 text-xs font-medium text-muted-foreground">
            Project screenshot
          </div>
        </div>


        <div className="mb-4 flex flex-wrap gap-2">
          {project.category.map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {cat}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold text-foreground">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:underline focus:underline"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-sm text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tech) => (
            <TechnologyBadge key={tech}>{tech}</TechnologyBadge>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <LinkButton href={`/projects/${project.slug}`} size="sm">View project</LinkButton>
          {project.liveUrl && (
            <LinkButton href={project.liveUrl} variant="outline" size="sm" external className="gap-1.5">
              Live
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </LinkButton>
          )}
          {project.githubUrl && (
            <LinkButton href={project.githubUrl} variant="outline" size="sm" external className="gap-1.5">
              Code
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
            </LinkButton>
          )}
        </div>
      </article>
    </AnimatedReveal>
  );
}
