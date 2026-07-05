import type { Metadata } from "next";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { AnimatedReveal } from "@/components/animated-reveal";
import { LinkButton } from "@/components/link-button";
import { LabsPipeline } from "@/components/labs-pipeline";
import {
  labPillars,
  labStats,
  HAITECH_LABS_URL,
} from "@/lib/labs";

export const metadata: Metadata = {
  title: "Labs",
  description:
    "Haitech Labs — a one-person software studio building lean MVPs, internal tools, and micro-SaaS from thesis to production. Solo, self-funded, and pre-revenue.",
  alternates: {
    canonical: "/labs",
  },
};

export default function LabsPage() {
  return (
    <>
      <section className="page-header" data-index="04">
        <Container className="relative z-10">
          <AnimatedReveal>
            <p className="eyebrow">Haitech Labs</p>
          </AnimatedReveal>
          <AnimatedReveal delay={0.05}>
            <h1 className="mt-7 max-w-5xl text-6xl font-bold leading-[0.9] tracking-[-0.07em] sm:text-8xl lg:text-9xl">
              <span className="text-gradient">Build first.</span>
            </h1>
          </AnimatedReveal>
          <AnimatedReveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-xl font-medium leading-snug tracking-[-0.02em] text-muted-foreground sm:text-2xl">
              A one-person software studio. I turn software ideas into shipped
              products — lean MVPs, internal tools, and micro-SaaS, solo and
              self-funded from thesis to production.
            </p>
          </AnimatedReveal>
          <AnimatedReveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href={HAITECH_LABS_URL} external size="lg">
                Visit haitechlabs.com <ExternalLink aria-hidden="true" />
              </LinkButton>
              <LinkButton href="/contact" variant="outline" size="lg">
                Start a conversation <ArrowRight aria-hidden="true" />
              </LinkButton>
            </div>
          </AnimatedReveal>
        </Container>
      </section>

      {/* Stats strip */}
      <section className="border-b border-border bg-card/60">
        <Container className="grid grid-cols-2 gap-px bg-border sm:px-0 lg:grid-cols-4">
          {labStats.map((stat, index) => (
            <AnimatedReveal key={stat.label} delay={index * 0.04} className="bg-card">
              <div className="h-full p-6 sm:p-8">
                <p className="font-heading text-5xl font-bold tracking-[-0.07em] text-foreground sm:text-6xl">
                  {stat.value}
                </p>
                <p className="mt-4 max-w-40 font-mono text-[0.7rem] font-semibold uppercase leading-relaxed tracking-[0.12em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </AnimatedReveal>
          ))}
        </Container>
      </section>

      {/* Thesis */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="The thesis"
            title="A builder's model for software, not slide decks."
            description="Most ideas don't die from lack of funding — they die from lack of a shipped product and honest signal. I build first."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {labPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <AnimatedReveal key={pillar.title} delay={index * 0.05}>
                  <div className="glass-card h-full rounded-sm p-6">
                    <div className="inline-flex size-11 items-center justify-center border border-border bg-background text-primary">
                      <Icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {pillar.body}
                    </p>
                  </div>
                </AnimatedReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Pipeline */}
      <section
        id="pipeline"
        className="scroll-mt-24 border-t border-border bg-card/70 py-20 sm:py-28"
      >
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Pipeline"
              title="Five builds, shipping in public."
              description="Every project here exists because I wanted to use it. One is live, the rest are still in the workshop — filter by stage to see what's shipping."
            />
            <LinkButton href={HAITECH_LABS_URL} external variant="outline" className="shrink-0">
              Full studio <ExternalLink aria-hidden="true" />
            </LinkButton>
          </div>
          <LabsPipeline />
        </Container>
      </section>
    </>
  );
}