"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Index", index: "00" },
  { href: "/about", label: "About", index: "01" },
  { href: "/github", label: "Worklog", index: "02" },
  { href: "/contact", label: "Contact", index: "03" },
];

export function Navbar() {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12" aria-label="Main navigation">
        <Link href="/" className="group flex min-h-11 items-center gap-3 text-foreground">
          <span className="flex size-8 items-center justify-center bg-foreground font-heading text-xs font-bold text-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground">MH</span>
          <span className="hidden font-mono text-[0.68rem] font-semibold uppercase leading-tight tracking-[0.12em] sm:block">Matt Haitana<br /><span className="text-muted-foreground">Software Engineer</span></span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group flex min-h-11 items-center gap-2 border-l border-border px-4 font-mono text-xs font-semibold uppercase tracking-wider transition-colors duration-200",
                pathname === link.href
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              <span className="text-[0.6rem] opacity-60">{link.index}</span>{link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="hidden border-l border-border md:flex"
          >
            {mounted ? (
              resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Moon className="h-5 w-5" aria-hidden="true" />
              )
            ) : (
              <span className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background px-5 pb-5 md:hidden"
        >
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex min-h-12 items-center justify-between border-b border-border px-3 font-mono text-xs font-semibold uppercase tracking-wider transition-colors duration-200",
                  pathname === link.href
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}<span className="text-[0.65rem] opacity-60">{link.index}</span>
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="flex min-h-12 cursor-pointer items-center gap-2 px-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {mounted && resolvedTheme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" aria-hidden="true" /> Light mode
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" aria-hidden="true" /> Dark mode
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
