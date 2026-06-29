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
          className={`h-1.5 w-4 sm:w-6 rounded-full transition-all duration-300 ${
            i < level 
              ? "bg-primary shadow-sm shadow-primary/10" 
              : "bg-muted/80"
          }`}
        />
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="mesh-glow-container" aria-hidden="true">
          <div className="mesh-glow-1 animate-pulse" style={{ animationDuration: '8s' }} />
        </div>
        <Container className="relative z-10">
          <AnimatedReveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              About
            </p>
          </AnimatedReveal>
          <AnimatedReveal delay={0.05}>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="text-gradient">Engineering with purpose</span>
            </h1>
          </AnimatedReveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="space-y-12 min-w-0">
            <AnimatedReveal>
              <div className="max-w-2xl space-y-4">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  I am a senior software engineer based in Melbourne, Australia, with over a decade of experience building high-performance web systems, native applications, and developer tooling across real estate, defence, and technology sectors.
                </p>
                <p className="text-muted-foreground">
                  My engineering philosophy focuses on building robust backend-for-frontend (BFF) layers, high-throughput systems, and modular frontends. I have extensive experience designing type-safe GraphQL APIs, maintaining complex composable design systems, and optimizing multi-stage CI/CD pipelines deploying to containerized environments like AWS ECS.
                </p>
                <p className="text-muted-foreground">
                  Lately, I have been deeply engaged in local-first AI infrastructures—specifically building Rust and Python-based gateways, context compression engines, and Model Context Protocol (MCP) integrations. Outside of product engineering, my background includes simulation modeling for the New Zealand Defence Force and ongoing service as an Army reservist, which instills strong discipline, leadership, and mission-focus in all of my engineering projects.
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
                      className="glass-card rounded-xl p-4 text-sm font-semibold text-foreground shadow-sm hover:scale-[1.02]"
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
                  I am currently exploring local-first AI gateway proxies, advanced context-compression algorithms in Rust, and Model Context Protocol (MCP) server tooling. I also keep a strong interest in high-efficiency build pipelines, geospatial routing systems, and next-generation state synchronization in real-time interfaces.
                </p>
              </div>
            </AnimatedReveal>
          </div>

          <aside className="space-y-6">
            <AnimatedReveal>
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-lg font-bold text-gradient">Quick facts</h2>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Location</dt>
                    <dd className="mt-1 text-sm font-medium">Melbourne, Australia</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Experience</dt>
                    <dd className="mt-1 text-sm font-medium">10+ years</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Focus</dt>
                    <dd className="mt-1 text-sm font-medium">Systems engineering, GraphQL BFFs, Frontend platforms, composable design systems</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Currently</dt>
                    <dd className="mt-1 text-sm font-medium">Senior Software Engineer at CoStar Group</dd>
                  </div>
                </dl>
              </div>
            </AnimatedReveal>

            <AnimatedReveal delay={0.1}>
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-lg font-bold text-gradient">Core values</h2>
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

      <section id="skills" className="border-t border-border/40 bg-muted/20 py-24">
        <Container>
          <SectionHeading
            eyebrow="Toolkit"
            title="Skills & Expertise"
            description="Technologies, practices, and disciplines I use to build reliable products at scale."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {skillCategories.map((category, index) => (
              <AnimatedReveal key={category.name} delay={index * 0.05}>
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-gradient">{category.name}</h2>
                  <ul className="mt-5 space-y-4">
                    {category.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="flex items-center justify-between gap-4"
                      >
                        <span className="text-sm font-semibold">{skill.name}</span>
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

      <section id="experience" className="border-t border-border py-24">
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
