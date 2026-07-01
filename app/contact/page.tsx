import type { Metadata } from "next";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/container";
import { AnimatedReveal } from "@/components/animated-reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Matt Haitana for senior software engineering opportunities, consulting, or collaborations.",
  alternates: { canonical: "/contact" },
};

const contactLinks = [
  { label: "Email", href: "mailto:mhaitana@gmail.com", icon: Mail, value: "mhaitana@gmail.com", note: "Best for projects and opportunities" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mhaitana", icon: Linkedin, value: "/in/mhaitana", note: "Professional network" },
  { label: "GitHub", href: "https://github.com/mhaitana", icon: Github, value: "@mhaitana", note: "Code and public activity" },
];

export default function ContactPage() {
  return (
    <>
      <section className="page-header" data-index="04">
        <Container className="relative z-10">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-7 max-w-5xl text-6xl font-bold leading-[0.88] tracking-[-0.07em] sm:text-8xl lg:text-9xl">Let&apos;s make the complex clear.</h1>
          <div className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="size-2 bg-emerald-500" aria-hidden="true" /> Open to thoughtful conversations
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
            <AnimatedReveal>
              <div className="lg:sticky lg:top-28">
                <p className="text-2xl font-medium leading-snug tracking-[-0.03em]">Have a platform to untangle, a product to ship, or a good technical rabbit hole?</p>
                <p className="mt-5 leading-relaxed text-muted-foreground">Send a note with a little context. I’m especially interested in ambitious product engineering, developer platforms, local-first AI, and systems work.</p>
                <div className="mt-8 flex items-center gap-3 border-t border-border pt-5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  <MapPin className="size-4 text-primary" aria-hidden="true" /> Melbourne, Australia
                </div>
              </div>
            </AnimatedReveal>

            <div className="border-t border-border">
              {contactLinks.map((link, index) => (
                <AnimatedReveal key={link.label} delay={index * 0.05}>
                  <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} className="group grid min-h-36 gap-5 border-b border-border py-7 transition-colors hover:bg-card sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:px-5">
                    <span className="flex size-11 items-center justify-center border border-border text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"><link.icon className="size-5" aria-hidden="true" /></span>
                    <div>
                      <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">0{index + 1} / {link.label}</p>
                      <p className="mt-2 text-2xl font-bold tracking-[-0.035em] sm:text-3xl">{link.value}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{link.note}</p>
                    </div>
                    <ArrowUpRight className="size-6 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" aria-hidden="true" />
                  </a>
                </AnimatedReveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
