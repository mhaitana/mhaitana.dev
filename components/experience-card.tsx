"use client";

import { useCallback, useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { TechnologyBadge } from "./technology-badge";
import type { Experience } from "@/lib/data";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  // Before hydration, the native summary exposes and controls its own state.
  const [expanded, setExpanded] = useState<boolean | undefined>(undefined);
  const initialiseDisclosure = useCallback((element: HTMLDetailsElement | null) => {
    if (element) setExpanded(element.open);
  }, []);
  const panelId = `experience-${experience.id}-details`;

  return (
    <article id={`experience-${experience.id}`} className="relative scroll-mt-24 pl-8 sm:pl-12">
      <span className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center border border-primary bg-background sm:h-7 sm:w-7" aria-hidden="true">
        <span className="h-1.5 w-1.5 bg-primary" />
      </span>

      <div className="border border-border bg-card p-5 sm:p-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <h3 className="text-xl font-semibold leading-snug tracking-tight">{experience.title}</h3>
            <p className="mt-1 text-sm font-medium">
              {experience.companyUrl ? (
                <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-1.5 text-primary hover:underline">
                  {experience.company}<ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </a>
              ) : experience.company}
            </p>
          </div>
          <div className="shrink-0 text-sm text-muted-foreground md:text-right">
            <p>{experience.period}</p>
            <p className="mt-1 text-xs">{experience.duration} · {experience.type}</p>
          </div>
        </div>
        {experience.location && <p className="mt-2 text-xs text-muted-foreground">{experience.location}</p>}
        <p className="mt-4 max-w-[70ch] text-sm leading-relaxed text-muted-foreground">{experience.summary}</p>

        <details ref={initialiseDisclosure} className="group mt-3" onToggle={(event) => setExpanded(event.currentTarget.open)}>
          <summary aria-expanded={expanded} aria-controls={panelId} className="flex min-h-11 w-fit cursor-pointer list-none items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-primary hover:text-foreground [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Show details</span>
            <span className="hidden group-open:inline">Hide details</span>
            <span className="sr-only"> for {experience.company}</span>
            <ChevronDown className="h-4 w-4 group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div id={panelId} className="pt-3">
            <ul className="max-w-[75ch] list-disc space-y-3 pl-4 text-sm leading-relaxed text-muted-foreground">
              {experience.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}
            </ul>
            {experience.technologies.length > 0 && (
              <ul aria-label="Technologies used" className="mt-5 flex flex-wrap gap-2">
                {experience.technologies.map((technology) => <li key={technology}><TechnologyBadge>{technology}</TechnologyBadge></li>)}
              </ul>
            )}
          </div>
        </details>
      </div>
    </article>
  );
}
