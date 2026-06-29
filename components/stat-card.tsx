import { AnimatedReveal } from "./animated-reveal";

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <AnimatedReveal>
      <div className="h-full border-l border-border p-6 sm:p-8">
        <p className="font-heading text-5xl font-bold tracking-[-0.07em] text-foreground sm:text-6xl">{value}</p>
        <p className="mt-4 max-w-40 font-mono text-[0.7rem] font-semibold uppercase leading-relaxed tracking-[0.12em] text-muted-foreground">{label}</p>
      </div>
    </AnimatedReveal>
  );
}
