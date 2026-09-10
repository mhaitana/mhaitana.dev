import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Container } from "@/components/container";
import { PrintButton } from "@/components/print-button";
import { LinkButton } from "@/components/link-button";
import { getExperiences, profile, skillCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resume",
  description: "Matt Haitana's resume — senior software engineer based in Melbourne, Australia.",
  alternates: { canonical: "/resume" },
};

export const revalidate = 86400;

export default function ResumePage() {
  const experiences = getExperiences();
  return (
    <>
      <section className="no-print border-b border-border py-10 sm:py-12">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="eyebrow">Curriculum vitae</p>
            <p className="mt-3 text-4xl font-bold tracking-[-0.05em] sm:text-5xl">Résumé</p>
            <p className="mt-3 text-sm text-muted-foreground">Read online, print, or save a PDF.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <PrintButton />
            <LinkButton href="/resume.pdf" size="sm" className="gap-2" download="Matt_Haitana_Resume.pdf">
              <Download className="h-4 w-4" aria-hidden="true" />Download PDF
            </LinkButton>
          </div>
        </Container>
      </section>

      <section className="resume-section py-8 sm:py-12">
        <Container className="max-w-4xl">
          <article className="resume-document min-w-0 border border-border bg-card p-5 sm:p-10" aria-label="Matt Haitana résumé">
            <header className="resume-header border-b border-border pb-6">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{profile.name}</h1>
              <p className="mt-2 text-lg font-medium">{profile.role}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span>{profile.location}</span>
                <a href={`mailto:${profile.email}`} className="break-all hover:text-primary hover:underline">{profile.email}</a>
                <a href={profile.website} className="hover:text-primary hover:underline">mhaitana.dev</a>
                <a href={profile.github} className="break-all hover:text-primary hover:underline">github.com/mhaitana</a>
                <a href={profile.linkedin} className="break-all hover:text-primary hover:underline">linkedin.com/in/mhaitana</a>
              </div>
            </header>

            <section className="resume-profile mt-6" aria-labelledby="resume-profile-heading">
              <h2 id="resume-profile-heading" className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">Profile</h2>
              <p className="mt-3 max-w-[75ch] text-sm leading-relaxed text-muted-foreground">{profile.summary}</p>
            </section>

            <section className="resume-experience mt-8" aria-labelledby="resume-experience-heading">
              <h2 id="resume-experience-heading" className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">Experience</h2>
              <div className="mt-4 space-y-6">
                {experiences.map((experience) => (
                  <section key={experience.id} className="resume-role break-inside-avoid border-t border-border pt-4" aria-labelledby={`resume-${experience.id}`}>
                    <div className="resume-role-heading flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                      <h3 id={`resume-${experience.id}`} className="font-semibold leading-snug">{experience.title}</h3>
                      <span className="shrink-0 text-sm text-muted-foreground">{experience.period}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium">{experience.company} <span className="font-normal text-muted-foreground">· {experience.type}</span></p>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                      {experience.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}
                    </ul>
                  </section>
                ))}
              </div>
            </section>

            <section className="resume-skills mt-8 border-t border-border pt-5" aria-labelledby="resume-skills-heading">
              <h2 id="resume-skills-heading" className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">Skills</h2>
              <div className="mt-3 grid gap-4">
                {skillCategories.map((category) => (
                  <div key={category.name} className="break-inside-avoid">
                    <h3 className="text-sm font-semibold">{category.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{category.skills.map((skill) => skill.name).join(" · ")}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>
        </Container>
      </section>
    </>
  );
}
