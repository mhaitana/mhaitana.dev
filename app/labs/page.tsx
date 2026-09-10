import type { Metadata } from "next";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { LinkButton } from "@/components/link-button";
import { LabsPipeline } from "@/components/labs-pipeline";
import { labProjects, HAITECH_LABS_URL } from "@/lib/labs";
import { countLabProjects } from "@/lib/labs-filter";

export const metadata: Metadata = {
  title: "Labs",
  description: "Haitech Labs — Matt Haitana’s one-person software studio. Explore live products and work in progress across travel, community, marketplaces, and local-first AI.",
  alternates: { canonical: "/labs" },
};

export default function LabsPage() {
  const counts = countLabProjects(labProjects);

  return (
    <>
      <section className="page-header" data-index="04">
        <Container className="relative z-10">
          <p className="eyebrow">Haitech Labs / Independent work</p>
          <h1 className="page-title mt-6 max-w-5xl">Build first.</h1>
          <p className="mt-6 max-w-2xl text-xl font-medium leading-snug tracking-[-0.02em] text-muted-foreground sm:text-2xl">
            A one-person software studio. I design and build products around specific problems, from early ideas to production — solo and self-funded.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">Build something useful, learn from it, then decide what comes next.</p>
          <a href="#pipeline" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">Explore the projects <ArrowRight className="size-4" aria-hidden="true" /></a>
        </Container>
      </section>

      <section id="pipeline" className="section-space scroll-mt-24 border-b border-border">
        <Container>
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Project pipeline" title="From idea to something useful." />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {counts.live} live · {counts["alpha / waitlist"]} alpha / waitlist · {counts["in development"]} in development.
              <br />Project stages reflect the current studio pipeline.
            </p>
          </div>
          <LabsPipeline />
        </Container>
      </section>

      <section className="section-space">
        <Container className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-[-0.04em]">Interested in what I’m building?</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">Visit the studio or get in touch to talk about a project.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <LinkButton href="/contact">Start a conversation <ArrowRight aria-hidden="true" /></LinkButton>
            <LinkButton href={HAITECH_LABS_URL} external variant="outline">Visit the studio <ExternalLink aria-hidden="true" /></LinkButton>
          </div>
        </Container>
      </section>
    </>
  );
}
