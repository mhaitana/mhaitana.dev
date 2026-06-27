import { AnimatedReveal } from "./animated-reveal";

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <AnimatedReveal>
      <div className="rounded-xl border border-border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md">
        <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
        <p className="mt-1 text-sm text-muted-foreground">{label}</p>
      </div>
    </AnimatedReveal>
  );
}
