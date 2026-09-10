import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ExperienceCard } from "@/components/experience-card";
import { skillCategories, getExperiences, profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "Matt Haitana's engineering approach, skills and career across product platforms, shared APIs and delivery infrastructure.",
  alternates: { canonical: "/about" },
};

// Refresh current-role durations without waiting for a new deployment.
export const revalidate = 86400;

export default function AboutPage() {
  const experiences = getExperiences();
  const currentRole = experiences.find((experience) => experience.id === "costar")!;

  return (
    <>
      <section className="page-header" data-index="01">
        <Container className="relative z-10">
          <p className="eyebrow">About / Approach & experience</p>
          <h1 className="page-title mt-6 max-w-5xl">Engineering with purpose.</h1>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.65fr_1fr] lg:gap-16">
            <div className="max-w-[65ch]">
              <h2 className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">{profile.lead}</h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                I’m a senior software engineer in Melbourne, with over a decade of experience across property technology and defence. At Domain, my work connected customer-facing products with shared GraphQL APIs, design systems and delivery infrastructure. Today, I build web and listing experiences at CoStar Group.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Outside that work, I’m exploring local-first AI gateways, context compression in Rust and Python, and Model Context Protocol tooling. Earlier simulation work for the New Zealand Defence Force, and ongoing reserve service, continue to shape how I lead and take responsibility for outcomes.
              </p>
            </div>
            <aside className="border-y border-border py-5 lg:border-y-0 lg:border-l lg:py-0 lg:pl-8" aria-label="At a glance">
              <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Based in</dt>
                  <dd className="mt-1 text-sm font-semibold">{profile.location}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Currently</dt>
                  <dd className="mt-1 text-sm font-semibold">{currentRole.title}<br />{currentRole.company}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Since 2015</dt>
                  <dd className="mt-1 text-sm font-semibold">Software, platforms and simulation</dd>
                </div>
              </dl>
              <Link href="/resume" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline">
                View résumé <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </aside>
          </div>

          <div className="mt-14 border-t border-border pt-8 sm:mt-16">
            <h2 className="eyebrow">How I work</h2>
            <div className="mt-6 grid gap-8 md:grid-cols-3">
              {[
                ["Build for the next team.", "Shared contracts, reusable components and clear ownership make systems easier to change together."],
                ["Put confidence into delivery.", "Automated checks and preview environments turn quality into a repeatable part of shipping."],
                ["Keep the outcome in view.", "Work closely with product and design, ship in small steps, and take responsibility beyond the code."],
              ].map(([title, description], index) => (
                <div key={title} className="border-l-2 border-primary pl-5">
                  <span className="font-mono text-xs text-muted-foreground" aria-hidden="true">0{index + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="skills" className="section-space scroll-mt-24 border-t border-border bg-card/80">
        <Container>
          <SectionHeading eyebrow="Toolkit" title="Skills in context" description="The tools I use most, where I’ve applied them, and what I’m exploring now." />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {skillCategories.map((category) => (
              <div key={category.name} className="min-w-0 border border-border bg-background p-5 sm:p-6">
                <h3 className="text-xl font-semibold tracking-tight">{category.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{category.context}</p>
                <ul className="mt-5 space-y-3 border-t border-border pt-5">
                  {category.skills.map((skill) => (
                    <li key={skill.name} className="text-sm font-medium">{skill.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="experience" className="section-space scroll-mt-24 border-t border-border">
        <Container>
          <SectionHeading eyebrow="Career" title="Experience" description="Product engineering, platform foundations and earlier work in defence. Open a role for delivery details." />
          <div className="relative mt-8 space-y-6 before:absolute before:bottom-3 before:left-[11px] before:top-3 before:w-px before:bg-border sm:before:left-[13px]">
            {experiences.map((experience, index) => (
              <ExperienceCard key={experience.id} experience={experience} index={index} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
