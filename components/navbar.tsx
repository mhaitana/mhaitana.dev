"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Monitor, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Index", index: "00" },
  { href: "/about", label: "About", index: "01" },
  { href: "/github", label: "Worklog", index: "02" },
  { href: "/labs", label: "Labs", index: "03" },
  { href: "/contact", label: "Contact", index: "04" },
  { href: "/resume", label: "Résumé", index: "05" },
];

export function Navbar() {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const menuRef = React.useRef<HTMLDetailsElement>(null);

  React.useEffect(() => { setMounted(true); }, []);
  React.useEffect(() => { if (menuRef.current) menuRef.current.open = false; }, [pathname]);

  const nextTheme = theme === "system" ? "light" : theme === "light" ? "dark" : "system";
  const ThemeIcon = !mounted || theme === "system" ? Monitor : theme === "dark" ? Moon : Sun;
  const themeLabel = mounted ? `Theme: ${theme}. Switch to ${nextTheme} theme` : "Change colour theme";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-3 px-5 sm:px-8 lg:px-12" aria-label="Main navigation">
        <Link href="/" className="group flex min-h-11 shrink-0 items-center gap-3 text-foreground" aria-label="Matt Haitana — home">
          <span aria-hidden="true" className="flex size-9 items-center justify-center bg-foreground font-heading text-xs font-bold text-background group-hover:bg-primary group-hover:text-primary-foreground">MH</span>
          <span className="hidden font-mono text-[0.62rem] font-semibold uppercase leading-relaxed tracking-[0.08em] sm:block">Matt Haitana<br /><span className="text-muted-foreground">Senior Software Engineer</span></span>
        </Link>
        <div className="hidden items-center xl:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}
              className={cn("flex min-h-11 items-center gap-2 border-l border-border px-3 font-mono text-[0.68rem] font-semibold uppercase tracking-wider transition-colors", pathname === link.href ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
              <span aria-hidden="true" className="text-[0.6rem]">{link.index}</span>{link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <Link href="/contact" className="inline-flex min-h-11 items-center px-3 font-mono text-xs font-semibold uppercase text-primary xl:hidden">Contact</Link>
          <button type="button" onClick={() => setTheme(nextTheme)} aria-label={themeLabel} title={themeLabel} className="flex size-11 cursor-pointer items-center justify-center border-l border-border hover:bg-muted">
            <ThemeIcon className="size-4" aria-hidden="true" />
          </button>
          <details ref={menuRef} className="group/menu xl:hidden" onKeyDown={(event) => {
            if (event.key === "Escape" && menuRef.current?.open) {
              menuRef.current.open = false;
              menuRef.current.querySelector("summary")?.focus();
            }
          }}>
            <summary aria-label="Navigation menu" className="flex size-11 cursor-pointer list-none items-center justify-center hover:bg-muted [&::-webkit-details-marker]:hidden">
              <Menu className="size-5 group-open/menu:hidden" aria-hidden="true" />
              <X className="hidden size-5 group-open/menu:block" aria-hidden="true" />
            </summary>
            <div className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-t border-border bg-background px-5 py-3 sm:px-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => { if (menuRef.current) menuRef.current.open = false; }} aria-current={pathname === link.href ? "page" : undefined}
                  className={cn("flex min-h-12 items-center justify-between border-b border-border px-3 font-mono text-xs font-semibold uppercase tracking-wider", pathname === link.href ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                  {link.label}<span aria-hidden="true">{link.index}</span>
                </Link>
              ))}
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
