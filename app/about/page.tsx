import type { Metadata } from "next";
import { Container } from "@/components/container";
import { AnimatedReveal } from "@/components/animated-reveal";
import { SectionHeading } from "@/components/section-heading";
import { ExperienceCard } from "@/components/experience-card";
import { skillCategories, experiences } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Matt Haitana's engineering journey, philosophy, technical skills, and career timeline.",
  alternates: {
    canonical: "/about",
  },
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

export default function AboutPage() {
  return (
    <>
      <section className="px-6 pt-24 pb-16 lg:px-8">
        <Container>
          <AnimatedReveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              About
            </p>
          </AnimatedReveal>
          <AnimatedReveal delay={0.05}>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Engineering with purpose
            </h1>
          </AnimatedReveal>
        </Container>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <Container className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="space-y-12">
            <AnimatedReveal>
              <div className="max-w-2xl space-y-4">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  I am a senior software engineer based in Melbourne, Australia, with more than a decade of experience building web products across real estate, defence, and technology sectors.
                </p>
                <p className="text-muted-foreground">
                  My work sits at the intersection of product thinking and frontend craft. I care deeply about performance, accessibility, and the long-term health of codebases. Whether I am shipping a real-time auction interface, refactoring a deployment pipeline, or mentoring a growing team, I aim for calm, deliberate engineering that compounds over time.
                </p>
                <p className="text-muted-foreground">
                  I joined the New Zealand Defence Force as a developer and simulation modeller before moving into commercial software. At Real Time Agent and later Domain, I spent five years shaping agent-facing platforms, eventually growing into a senior engineering role. I am now at CoStar Group, building premium experiences for Domain Skylight.
                </p>
              </div>
            </AnimatedReveal>

            <AnimatedReveal>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Engineering philosophy</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Ship small, learn fast",
                    "Accessibility is not optional",
                    "Clean code is kind code",
                    "Optimise for the team, not the hero",
                    "Measure outcomes, not output",
                    "Stability enables speed",
                  ].map((value) => (
                    <li
                      key={value}
                      className="rounded-xl border border-border bg-card p-4 text-sm font-medium text-foreground shadow-sm"
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedReveal>

            <AnimatedReveal>
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold tracking-tight">Current interests</h2>
                <p className="mt-4 text-muted-foreground">
                  I am currently exploring AI-augmented developer workflows, design systems at scale, and the craft of zero-clutter product interfaces. Outside of work, I serve as an Army reservist, which keeps my discipline, teamwork, and decision-making sharp.
                </p>
              </div>
            </AnimatedReveal>
          </div>

          <aside className="space-y-6">
            <AnimatedReveal>
              <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50 text-muted-foreground">
                  <span className="text-sm font-medium">Professional photo</span>
                </div>
              </div>
            </AnimatedReveal>

            <AnimatedReveal>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold">Quick facts</h2>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Location</dt>
                    <dd className="mt-1 text-sm">Melbourne, Australia</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Experience</dt>
                    <dd className="mt-1 text-sm">10+ years</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Focus</dt>
                    <dd className="mt-1 text-sm">Frontend platforms, real-time UI, deployment</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Currently</dt>
                    <dd className="mt-1 text-sm">Senior Software Engineer at CoStar Group</dd>
                  </div>
                </dl>
              </div>
            </AnimatedReveal>

            <AnimatedReveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold">Core values</h2>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li><strong className="text-foreground">Ownership:</strong> End-to-end accountability for outcomes.</li>
                  <li><strong className="text-foreground">Clarity:</strong> Simple solutions beat clever ones.</li>
                  <li><strong className="text-foreground">Growth:</strong> Invest in people and systems.</li>
                  <li><strong className="text-foreground">Integrity:</strong> Do the right work, the right way.</li>
                </ul>
              </div>
            </AnimatedReveal>
          </aside>
        </Container>
      </section>

      <section id="skills" className="border-t border-border bg-muted/30 px-6 py-24 lg:px-8">
        <Container>
          <SectionHeading
            eyebrow="Toolkit"
            title="Skills & Expertise"
            description="Technologies, practices, and disciplines I use to build reliable products at scale."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
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

      <section id="experience" className="border-t border-border px-6 py-24 lg:px-8">
        <Container>
          <SectionHeading
            eyebrow="Career"
            title="Experience"
            description="A timeline of roles, responsibilities, and measurable impact across product and platform teams."
          />
          <div className="mt-12 relative space-y-12 before:absolute before:top-3 before:bottom-3 before:left-[11px] before:w-px before:bg-border sm:before:left-[13px]">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.company + experience.period}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
