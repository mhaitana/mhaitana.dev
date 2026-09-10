import type { Metadata } from "next";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/container";
import { CopyEmail } from "@/components/copy-email";
import { LinkButton } from "@/components/link-button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Matt Haitana for senior software engineering opportunities, consulting, or collaborations.",
  alternates: { canonical: "/contact" },
};

const email = "mhaitana@gmail.com";
const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mhaitana", icon: Linkedin, value: "/in/mhaitana", note: "Professional network" },
  { label: "GitHub", href: "https://github.com/mhaitana", icon: Github, value: "@mhaitana", note: "Code and public activity" },
];

export default function ContactPage() {
  return (
    <>
      <section className="page-header" data-index="05">
        <Container className="relative z-10">
          <p className="eyebrow">Contact</p>
          <h1 className="page-title mt-6 max-w-5xl">Let&apos;s make the complex clear.</h1>
          <p className="mt-6 max-w-2xl text-xl font-medium leading-relaxed tracking-[-0.02em] text-muted-foreground">
            Have a platform to untangle or a product to ship? I’m open to conversations about senior engineering roles, consulting, and collaboration.
          </p>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
            <div className="min-w-0">
              <div className="border border-border bg-card p-5 sm:p-7">
                <p className="eyebrow">The best way to reach me</p>
                <h2 className="mt-4 break-words text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.045em]">
                  <a href={`mailto:${email}`} className="underline-offset-4 hover:underline">{email}</a>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Email is best for projects and opportunities.</p>
                <div className="mt-6 flex flex-wrap items-start gap-3">
                  <LinkButton href={`mailto:${email}`}><Mail aria-hidden="true" />Send an email</LinkButton>
                  <CopyEmail email={email} />
                </div>
              </div>

              <ul className="mt-6 border-t border-border" aria-label="Social profiles">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="group flex min-h-24 items-center gap-4 border-b border-border py-5 transition-colors hover:bg-card sm:px-3">
                      <link.icon className="size-5 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{link.label}<span className="ml-3 text-sm font-normal text-muted-foreground">{link.value}</span></p>
                        <p className="mt-1 text-sm text-muted-foreground">{link.note}</p>
                      </div>
                      <ArrowUpRight className="size-5 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="max-w-xl">
              <h2 className="text-2xl font-bold tracking-[-0.03em]">A little context is a good start.</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">Tell me what you’re working on and where I could help. My interests include product engineering, developer platforms, local-first AI, and systems work.</p>
              <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"><span className="size-2 bg-emerald-600 dark:bg-emerald-400" aria-hidden="true" />Open to thoughtful conversations</p>
              <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />Melbourne, Australia</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
