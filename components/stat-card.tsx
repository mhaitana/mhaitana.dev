import { AnimatedReveal } from "./animated-reveal";

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <AnimatedReveal>
      <div className="glass-card rounded-2xl p-6 text-center">
        <p className="text-4xl font-extrabold tracking-tight text-gradient">{value}</p>
        <p className="mt-2 text-sm font-medium text-muted-foreground">{label}</p>
      </div>
    </AnimatedReveal>
  );
}
