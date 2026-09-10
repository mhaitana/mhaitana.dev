import type { LabFilter, LabStatus } from "./labs";

type StagedProject = { status: LabStatus };

export function countLabProjects(projects: readonly StagedProject[]): Record<LabFilter, number> {
  const counts: Record<LabFilter, number> = {
    all: projects.length,
    live: 0,
    "alpha / waitlist": 0,
    "in development": 0,
    brainstorm: 0,
  };
  for (const project of projects) counts[project.status] += 1;
  return counts;
}

export function filterLabProjects<T extends StagedProject>(projects: readonly T[], active: LabFilter): readonly T[] {
  return active === "all" ? projects : projects.filter((project) => project.status === active);
}

export function labResultsMessage(count: number, total: number, stage: string): string {
  return stage === "all"
    ? `Showing all ${total} project${total === 1 ? "" : "s"}.`
    : `Showing ${count} of ${total} projects: ${stage}.`;
}
