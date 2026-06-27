"use client";

import * as React from "react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { AnimatedReveal } from "@/components/animated-reveal";
import { projects, Project } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Web",
  "Mobile",
  "AI",
  "Open Source",
  "Backend",
  "Personal",
] as const;

type Category = (typeof categories)[number];

export default function ProjectsPage() {
  const [active, setActive] = React.useState<Category>("All");

  const filtered = React.useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => p.category.includes(active as Project["category"][number]));
  }, [active]);

  return (
    <>
      <section className="px-6 pt-24 pb-16 lg:px-8">
        <Container>
          <SectionHeading
            eyebrow="Portfolio"
            title="Projects"
            description="Selected work across real-time platforms, frontend architecture, and personal experiments."
          />
        </Container>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <Container>
          <AnimatedReveal>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActive(category)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                    active === category
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  aria-pressed={active === category}
                >
                  {category}
                </button>
              ))}
            </div>
          </AnimatedReveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
