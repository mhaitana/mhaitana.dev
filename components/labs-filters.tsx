"use client";

import { useState, type ReactNode } from "react";
import type { LabFilter, LabStatus } from "@/lib/labs";
import { countLabProjects, filterLabProjects, labResultsMessage } from "@/lib/labs-filter";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

interface LabsFiltersProps {
  filters: readonly { value: LabFilter; label: string }[];
  projects: readonly { id: string; status: LabStatus; content: ReactNode }[];
}

export function LabsFilters({ filters, projects }: LabsFiltersProps) {
  const [active, setActive] = useState<LabFilter>("all");
  const hydrated = useHydrated();
  const counts = countLabProjects(projects);
  const filtered = filterLabProjects(projects, active);

  return (
    <div className="mt-8">
      <div role="group" aria-label="Filter projects by stage" className="flex flex-wrap gap-2 border-b border-border pb-5">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            disabled={!hydrated}
            onClick={() => setActive(filter.value)}
            aria-pressed={active === filter.value}
            aria-controls="lab-projects"
            aria-label={`${filter.label}: ${counts[filter.value]} project${counts[filter.value] === 1 ? "" : "s"}`}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 border px-3 text-sm font-semibold transition-colors disabled:cursor-default sm:px-4",
              active === filter.value
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
            )}
          >
            {filter.label}
            <span className="font-mono text-xs">{counts[filter.value]}</span>
          </button>
        ))}
      </div>
      <p role="status" aria-live="polite" aria-atomic="true" className="mt-5 text-sm text-muted-foreground">
        {labResultsMessage(filtered.length, projects.length, active)}
      </p>
      <noscript><p className="mt-2 text-sm text-muted-foreground">All projects are available below. Enable JavaScript to use the stage filters.</p></noscript>
      <div id="lab-projects" className="mt-5">
        {filtered.length === 0 ? (
          <div className="border border-border bg-card p-6">
            <p className="font-medium">No projects in this stage yet.</p>
            <button type="button" onClick={() => setActive("all")} className="mt-3 min-h-11 text-sm font-semibold text-primary underline underline-offset-4">Show all projects</button>
          </div>
        ) : (
          <ul className="grid gap-5 md:grid-cols-2">
            {filtered.map((project) => <li key={project.id} className="min-w-0">{project.content}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}
