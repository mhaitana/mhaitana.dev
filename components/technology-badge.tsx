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
        "inline-flex items-center rounded-full border border-primary/10 bg-primary/5 px-2.5 py-0.5 text-xs font-semibold text-primary/80 transition-all duration-200 hover:bg-primary/10 hover:border-primary/20",
        className
      )}
    >
      {children}
    </span>
  );
}
