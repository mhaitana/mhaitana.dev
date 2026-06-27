import type { Metadata } from "next";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { AnimatedReveal } from "@/components/animated-reveal";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Matt Haitana for senior software engineering opportunities, consulting, or collaborations.",
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
        <Container className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <AnimatedReveal>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-semibold">Send a message</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill out the form below and I will respond as soon as possible.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </AnimatedReveal>

          <div className="space-y-6">
            {contactLinks.map((link, index) => (
              <AnimatedReveal key={link.label} delay={index * 0.05}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="rounded-lg bg-muted p-2.5 text-primary">
                    <link.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{link.label}</p>
                    <p className="font-medium text-foreground">{link.value}</p>
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
