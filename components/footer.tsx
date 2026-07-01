import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/about#experience", label: "Experience" },
  { href: "/about#skills", label: "Skills" },
  { href: "/github", label: "GitHub" },
  { href: "/labs", label: "Labs" },
  { href: "/contact", label: "Contact" },
  { href: "/resume", label: "Resume" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-background/55">Have a hard problem?</p>
            <Link href="/contact" className="group mt-5 inline-flex items-end gap-4 font-heading text-5xl font-bold leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              Let&apos;s build it
              <ArrowUpRight className="mb-1 size-8 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 sm:size-12" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="min-h-8 font-mono text-xs uppercase tracking-wider text-background/55 transition-colors hover:text-background"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 lg:col-start-2 lg:justify-end">
            <a
              href="https://github.com/mhaitana"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-11 items-center justify-center border border-background/20 text-background/65 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/mhaitana"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-11 items-center justify-center border border-background/20 text-background/65 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="mailto:mhaitana@gmail.com"
              className="flex size-11 items-center justify-center border border-background/20 text-background/65 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-background/15 pt-6 sm:flex-row">
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-background/45">
            © {currentYear} Matt Haitana. All rights reserved.
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-background/45">
            Melbourne, Australia · Available worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
