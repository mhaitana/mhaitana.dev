"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedReveal } from "@/components/animated-reveal";
import { TechnologyBadge } from "@/components/technology-badge";
import {
  labProjects,
  labFilters,
  labStatusMeta,
  type LabFilter,
} from "@/lib/labs";

export function LabsPipeline() {
  const [active, setActive] = React.useState<LabFilter>("all");

  const counts = React.useMemo(() => {
    const map: Record<LabFilter, number> = {
      all: labProjects.length,
      live: 0,
      "alpha / waitlist": 0,
      "in development": 0,
      brainstorm: 0,
    };
    for (const p of labProjects) map[p.status] += 1;
    return map;
  }, []);

  const filtered = React.useMemo(
    () =>
      active === "all"
        ? labProjects
        : labProjects.filter((p) => p.status === active),
    [active]
  );

  return (
    <div className="mt-10">
      {/* Filter toggle row */}
      <div
        role="group"
        aria-label="Filter pipeline by status"
        className="flex flex-wrap gap-2 border-b border-border pb-6"
      >
        {labFilters.map((filter) => {
          const isActive = active === filter.value;
          const count = counts[filter.value];
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActive(filter.value)}
              aria-pressed={isActive}
              aria-label={`${filter.label} (${count} project${count === 1 ? "" : "s"})`}
              className={cn(
                "flex min-h-11 items-center gap-2 border px-4 font-mono text-xs font-semibold uppercase tracking-wider transition-colors duration-200",
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-primary hover:bg-muted hover:text-foreground"
              )}
            >
              {filter.label}
              <span
                className={cn(
                  "text-[0.6rem]",
                  isActive ? "text-background/60" : "text-muted-foreground/70"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <AnimatedReveal>
          <div className="mt-6 border border-border bg-card p-6 text-center text-muted-foreground">
            No builds in this stage yet.
          </div>
        </AnimatedReveal>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {filtered.map((project, index) => {
            const meta = labStatusMeta[project.status];
            const StatusIcon = meta.icon;
            return (
              <AnimatedReveal key={project.id} delay={index * 0.05}>
                <article className="glass-card flex h-full flex-col rounded-sm p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                        {project.category}
                      </p>
                      <h3 className="mt-1 text-2xl font-bold tracking-tight">
                        {project.name}
                      </h3>
                    </div>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 border px-2 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-wider",
                        meta.chipClass
                      )}
                    >
                      <span className={cn("size-1.5", meta.dotClass)} aria-hidden="true" />
                      <StatusIcon className="size-3" aria-hidden="true" />
                      {meta.label}
                    </span>
                  </div>

                  <p className="mt-4 text-base font-semibold leading-snug text-foreground">
                    {project.pitch}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {project.problem}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <TechnologyBadge key={tech}>{tech}</TechnologyBadge>
                    ))}
                  </div>

                  <div className="mt-6 flex-1" />
                  <div className="mt-2">
                    <a
                      href="https://haitechlabs.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex min-h-11 items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-primary transition-colors hover:text-foreground"
                    >
                      View on haitechlabs.com
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </AnimatedReveal>
            );
          })}
        </div>
      )}
    </div>
  );
}