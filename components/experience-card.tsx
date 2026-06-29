"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { AnimatedReveal } from "./animated-reveal";
import { TechnologyBadge } from "./technology-badge";
import { Experience } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <AnimatedReveal delay={index * 0.05}>
      <article className="relative pl-8 sm:pl-12">
        <span className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center border border-primary bg-background text-primary sm:h-7 sm:w-7">
          <span className="h-1.5 w-1.5 bg-primary" />
        </span>

        <div className="glass-card rounded-sm p-5 sm:p-7">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {experience.companyUrl ? (
                  <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    {experience.company}
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                  </a>
                ) : (
                  experience.company
                )}
              </h3>
              <p className="text-sm text-muted-foreground">
                {experience.title}
              </p>
            </div>
            <div className="text-left text-sm text-muted-foreground sm:text-right">
              <p>{experience.period}</p>
              <p className="text-xs">{experience.duration}</p>
            </div>
          </div>

          {experience.location && (
            <p className="mt-2 text-xs text-muted-foreground">{experience.location} · {experience.type}</p>
          )}

          <button
            onClick={() => setExpanded((e) => !e)}
            className="mt-5 flex min-h-11 cursor-pointer items-center gap-1 font-mono text-xs font-semibold uppercase tracking-wider text-primary transition-colors hover:text-foreground"
            aria-expanded={expanded}
            aria-controls={`exp-${index}`}
          >
            {expanded ? "Hide details" : "Show details"}
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
              aria-hidden="true"
            />
          </button>

          <div
            id={`exp-${index}`}
            className={cn(
              "overflow-hidden transition-all",
              expanded ? "mt-4 max-h-[40rem] opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
              {experience.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </div>

          {experience.technologies.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <TechnologyBadge key={tech}>{tech}</TechnologyBadge>
              ))}
            </div>
          )}
        </div>
      </article>
    </AnimatedReveal>
  );
}
