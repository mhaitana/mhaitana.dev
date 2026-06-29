import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Container } from "@/components/container";
import { PrintButton } from "@/components/print-button";
import { LinkButton } from "@/components/link-button";
import { experiences, skillCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resume",
  description: "Matt Haitana's resume — senior software engineer based in Melbourne, Australia.",
  alternates: {
    canonical: "/resume",
  },
};

export default function ResumePage() {
  return (
    <>
      <section className="no-print pt-24 pb-8">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Resume</h1>
            <p className="text-sm text-muted-foreground">
              Download or print a clean copy.
            </p>
          </div>
          <div className="flex gap-3">
            <PrintButton />
            <LinkButton
              href="/resume.pdf"
              size="sm"
              className="gap-2"
              download="Matt_Haitana_Resume.pdf"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download PDF
            </LinkButton>
          </div>
        </Container>
      </section>

      <section className="pb-24 print:pb-0">
        <Container className="max-w-3xl rounded-2xl border border-border bg-card p-5 sm:p-8 shadow-sm print:border-0 print:shadow-none print:p-0">
          <header className="border-b border-border pb-6">
            <h2 className="text-3xl font-bold tracking-tight">Matt Haitana</h2>
            <p className="mt-1 text-lg text-muted-foreground">Senior Software Engineer</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span>Melbourne, Australia</span>
              <span>mhaitana@gmail.com</span>
              <span>github.com/mhaitana</span>
              <span>linkedin.com/in/mhaitana</span>
            </div>
          </header>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Profile
            </h3>
            <p className="mt-2 text-muted-foreground">
              Senior software engineer with over a decade of experience designing and building high-performance web systems, APIs, native applications, and developer tooling. Proven expertise architecting multi-client GraphQL BFF servers, implementing composable design systems at scale, and optimizing multi-stage CI/CD pipelines deploying to containerized environments (AWS ECS). Deeply engaged in local-first AI system design, developer agent frameworks, and high-performance Rust/Python gateways.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Experience
            </h3>
            <div className="mt-4 space-y-6">
              {experiences.map((exp) => (
                <div key={exp.company + exp.period} className="break-inside-avoid">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                    <h4 className="font-semibold">{exp.company}</h4>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{exp.title}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {exp.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Skills
            </h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {skillCategories.map((category) => (
                <div key={category.name} className="break-inside-avoid">
                  <h4 className="text-sm font-semibold">{category.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {category.skills.map((s) => s.name).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
