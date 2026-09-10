import { ExternalLink } from "lucide-react";
import { LabsFilters } from "@/components/labs-filters";
import { TechnologyBadge } from "@/components/technology-badge";
import { cn } from "@/lib/utils";
import { labProjects, labFilters, labStatusMeta } from "@/lib/labs";

/** Project content is rendered on the server; only the filter controls hydrate. */
export function LabsPipeline() {
  return (
    <LabsFilters
      filters={labFilters}
      projects={labProjects.map((project) => {
        const meta = labStatusMeta[project.status];
        const StatusIcon = meta.icon;

        return {
          id: project.id,
          status: project.status,
          content: (
            <article id={project.id} aria-labelledby={`${project.id}-title`} className="flex h-full scroll-mt-24 flex-col border border-border bg-card p-5 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
                  {project.category}
                </p>
                <span className={cn("inline-flex items-center gap-1.5 border px-2 py-1 font-mono text-[0.65rem] font-semibold", meta.chipClass)}>
                  <StatusIcon className="size-3.5" aria-hidden="true" />
                  {meta.label}
                </span>
              </div>
              <h3 id={`${project.id}-title`} className="mt-5 text-3xl font-bold tracking-[-0.04em]">{project.name}</h3>
              <dl className="mt-6 grid gap-5 text-sm leading-relaxed">
                <div>
                  <dt className="font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">Problem</dt>
                  <dd className="mt-1.5 text-muted-foreground">{project.problem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">{project.status === "live" ? "The product" : "What I’m building"}</dt>
                  <dd className="mt-1.5 font-medium text-foreground">{project.pitch}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">My role</dt>
                  <dd className="mt-1.5">{project.role}</dd>
                </div>
              </dl>
              <ul aria-label={`${project.name} technologies`} className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => <li key={tech}><TechnologyBadge>{tech}</TechnologyBadge></li>)}
              </ul>
              <div className="mt-auto pt-6">
                <div className="border-t border-border pt-4">
                  {project.destination ? (
                    <a href={project.destination.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">
                      {project.destination.label}<ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">Case study coming soon</p>
                  )}
                </div>
              </div>
            </article>
          ),
        };
      })}
    />
  );
}
