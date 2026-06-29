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
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="mesh-glow-container" aria-hidden="true">
          <div className="mesh-glow-1 animate-pulse" style={{ animationDuration: '6s' }} />
        </div>
        <Container className="relative z-10">
          <SectionHeading
            eyebrow="Contact"
            title="Let's work together"
          />
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactLinks.map((link, index) => (
              <AnimatedReveal key={link.label} delay={index * 0.05}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex flex-col items-center gap-4 rounded-2xl p-6 text-center glass-card"
                >
                  <span className="rounded-full bg-primary/5 border border-primary/10 p-3 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                    <link.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">{link.label}</p>
                    <p className="mt-1 font-bold text-foreground">{link.value}</p>
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
