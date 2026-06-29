import { cn } from "@/lib/utils";

export function TechnologyBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-border bg-background px-2.5 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary",
        className
      )}
    >
      {children}
    </span>
  );
}
