import type { Metadata } from "next";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ExperienceCard } from "@/components/experience-card";

import { experiences } from "@/lib/data";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Matt Haitana's career timeline across CoStar Group, Domain, Real Time Agent, Future Golf, and the New Zealand Defence Force.",
};

export default function ExperiencePage() {
  return (
    <>
      <section className="px-6 pt-24 pb-16 lg:px-8">
        <Container>
          <SectionHeading
            eyebrow="Career"
            title="Experience"
            description="A timeline of roles, responsibilities, and measurable impact across product and platform teams."
          />
        </Container>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <Container>
          <div className="relative space-y-12 before:absolute before:top-3 before:bottom-3 before:left-[11px] before:w-px before:bg-border sm:before:left-[13px]">
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
