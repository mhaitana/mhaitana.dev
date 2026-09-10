import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && (
        <p className="eyebrow">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-4 text-[clamp(2rem,3.8vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.05em] text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
      )}
    </div>
  );
}
