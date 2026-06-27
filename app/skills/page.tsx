import type { Metadata } from "next";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { AnimatedReveal } from "@/components/animated-reveal";
import { skillCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Matt Haitana's technical skills across frontend, backend, cloud, DevOps, architecture, and engineering practices.",
};

function Proficiency({ level }: { level: number }) {
  return (
    <div className="flex gap-1" aria-label={`Proficiency ${level} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-6 rounded-full ${
            i < level ? "bg-primary" : "bg-muted"
          }`}
        />
      ))}
    </div>
  );
}

export default function SkillsPage() {
  return (
    <>
      <section className="px-6 pt-24 pb-16 lg:px-8">
        <Container>
          <SectionHeading
            eyebrow="Toolkit"
            title="Skills & Expertise"
            description="Technologies, practices, and disciplines I use to build reliable products at scale."
          />
        </Container>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {skillCategories.map((category, index) => (
              <AnimatedReveal key={category.name} delay={index * 0.05}>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                  <ul className="mt-5 space-y-4">
                    {category.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="flex items-center justify-between gap-4"
                      >
                        <span className="text-sm font-medium">{skill.name}</span>
                        <Proficiency level={skill.proficiency} />
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
