import type { Metadata } from "next";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { AnimatedReveal } from "@/components/animated-reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Matt Haitana for senior software engineering opportunities, consulting, or collaborations.",
  alternates: {
    canonical: "/contact",
  },
};

const contactLinks = [
  {
    label: "GitHub",
    href: "https://github.com/mhaitana",
    icon: Github,
    value: "github.com/mhaitana",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mhaitana",
    icon: Linkedin,
    value: "linkedin.com/in/mhaitana",
  },
  {
    label: "Email",
    href: "mailto:mhaitana@gmail.com",
    icon: Mail,
    value: "mhaitana@gmail.com",
  },
  {
    label: "Location",
    href: "#",
    icon: MapPin,
    value: "Melbourne, Australia",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="px-6 pt-24 pb-16 lg:px-8">
        <Container>
          <SectionHeading
            eyebrow="Contact"
            title="Let's work together"
            description="I am open to senior engineering roles, consulting, and interesting collaborations."
          />
        </Container>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactLinks.map((link, index) => (
              <AnimatedReveal key={link.label} delay={index * 0.05}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md text-center"
                >
                  <span className="rounded-full bg-muted p-3 text-primary">
                    <link.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{link.label}</p>
                    <p className="mt-1 font-medium text-foreground">{link.value}</p>
                  </div>
                </a>
              </AnimatedReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
